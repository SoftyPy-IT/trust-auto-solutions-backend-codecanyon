import Stock from './Stock.model';
import { IStock } from './Stock.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Request } from 'express';
import fs from 'fs';

import {
  calculateDifferences,
  generateCSVFile,
  getProducts,
  parseCSV,
  uploadToCloudinary,
} from './stock.utils';
import { deleteAttachment } from '../../utils/cloudinary';

export const getAllStock = async (
  query: Record<string, unknown>,
): Promise<any> => {
  try {
    const StockSearchableFields = ['name'];

    const StockQuery = new QueryBuilder(
      Stock.find({}).populate([
        {
          path: 'brands',
          select: 'name image brand',
        },
        {
          path: 'categories',
          select: 'main_category image',
        },
      ]),
      query,
    )
      .search(StockSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();

    const meta = await StockQuery.countTotal();
    const stocks = await StockQuery.modelQuery;

    return { meta, stocks };
  } catch (error: any) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || 'Internal Server Error',
    );
  }
};

export const getStockById = async (id: string): Promise<IStock | null> => {
  try {
    const stock = await Stock.findOne({ _id: id }).populate([
      {
        path: 'brands',
        select: 'brand image',
      },
      {
        path: 'categories',
        select: 'main_category  image',
      },
    ]);

    if (!stock) {
      throw new AppError(httpStatus.NOT_FOUND, 'This Stock is not found');
    }

    if (stock.isFinalCalculation) {
      const totalDifference = stock.counts.reduce(
        (sum, count) => sum + count.difference,
        0,
      );
      const totalCost = stock.counts.reduce(
        (sum, count) => sum + count.cost,
        0,
      );
      stock.set('totalDifference', totalDifference, { strict: false });
      stock.set('totalCost', totalCost, { strict: false });
    }

    return stock;
  } catch (error: any) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || 'Internal Server Error',
    );
  }
};

export const createStock = async (req: Request) => {
  try {
    const products = await getProducts(req.body);

    // Check if products exist based on the criteria
    if (!products || products.length === 0) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'No products found based on the provided criteria',
      );
    }

    const filePath = await generateCSVFile(products);
    const { url, public_id } = await uploadToCloudinary(filePath);
    fs.unlinkSync(filePath);

    // Create the stock entry after confirming products exist
    const stockData = {
      ...req.body,
      initialStockCSV: { url, publicId: public_id },
    };
    const result = await Stock.create(stockData);

    return {
      success: true,
      message: 'Stock created successfully',
      data: result,
    };
  } catch (error: any) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || 'Internal Server Error',
    );
  }
};


export const updateStock = async (id: string, req: Request) => {
  try {
    const stockExist = await Stock.findById(id);
    if (!stockExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'This Stock does not exist');
    }

    if (stockExist.isFinalCalculation) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "You can't update a stock that has been finalized"
      );
    }

    const { file } = req;
    if (!file || file.mimetype !== 'text/csv') {
      throw new AppError(httpStatus.BAD_REQUEST, 'No file uploaded or file is not a CSV');
    }

    // Upload the CSV file to Cloudinary and get the URL
    const { url, public_id } = await uploadToCloudinary(file);

    // Update the Stock model with the final CSV details
    stockExist.finalStockCSV = { url, publicId: public_id };
    stockExist.note = req.body.note;
    stockExist.isFinalCalculation = true;

    // Parse the initial and final CSV data
    const initialData = await parseCSV(stockExist.initialStockCSV.url);
    const finalData = await parseCSV(url);

    // Calculate the differences between initial and final data
    const comparisonData = await calculateDifferences(initialData, finalData);

    // Update the counts in the stock model
    stockExist.counts = comparisonData?.map((item, index) => ({
      no: index + 1,
      description: item?.Description,
      expected: item?.Expected,
      counted: item?.Counted,
      difference: item?.Difference,
      cost: item?.Cost
    })) as any;

    // Save the updated stock model
    await stockExist.save();

    return stockExist.counts;
  } catch (error: any) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message || 'Internal Server Error');
  }
};


export const deleteStock = async (id: string): Promise<void | null> => {
  try {
    const StockExist = await Stock.findOne({ _id: id });
    if (!StockExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'This Stock is not found');
    }

    // delete the initaial and final CSV files from Cloudinary
    await deleteAttachment(StockExist.initialStockCSV.publicId);
    if (StockExist.isFinalCalculation) {
      await deleteAttachment(StockExist?.finalStockCSV?.publicId as string);
    }

    await Stock.findByIdAndDelete(id);

    return null;
  } catch (error: any) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || 'Internal Server Error',
    );
  }
};

export const StockService = {
  getAllStock,
  getStockById,
  createStock,
  updateStock,
  deleteStock,
};

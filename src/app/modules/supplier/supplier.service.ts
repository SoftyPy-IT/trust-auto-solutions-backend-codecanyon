/* eslint-disable @typescript-eslint/no-unused-vars */
import QueryBuilder from '../../builder/QueryBuilder';
import { ImageUpload } from '../../utils/ImageUpload';
import path from 'path';
import { Supplier } from './supplier.model';
import { SearchableFields } from './supplier.const';
import { TSupplier } from './supplier.interface';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';

const createSupplier = async (payload: any, file?: Express.Multer.File) => {
  try {
    if (file) {
      const imageName = file.filename;
      const imagePath = path.join(process.cwd(), 'uploads', file.filename);
      const folder = 'brand-images';

      const cloudinaryResult = await ImageUpload(imagePath, imageName, folder);

      payload.image = cloudinaryResult.secure_url;
    }
    if (payload.image && typeof payload.image !== 'string') {
      throw new Error('Invalid image URL format');
    }

    const newCategory = await Supplier.create(payload);
    return newCategory;
  } catch (error: any) {
    console.error('Error creating brand:', error.message);
    throw new Error(
      error.message || 'An unexpected error occurred while creating the brand',
    );
  }
};

const getAllSupplier = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(Supplier.find(), query)
    .search(SearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await categoryQuery.countTotal();
  const suppliers = await categoryQuery.modelQuery;

  return {
    meta,
    suppliers,
  };
};
const getSinigleSupplier = async (id: string) => {
  const result = await Supplier.findById(id);
  return result;
};
const updateSupplier = async (id: string, payload: Partial<TSupplier>) => {
  const result = await Supplier.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const permanenatlyDeleteSupplier = async (id: string) => {
  const existingSupplier = await Supplier.findById(id);
  if (!existingSupplier) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No supplier exist.');
  }
  const result = await Supplier.deleteOne({ _id: existingSupplier });
  return result;
};
const moveToRecycledbinSupplier = async (id: string) => {
  const existingSupplier = await Supplier.findById(id);
  if (!existingSupplier) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No supplier exist.');
  }

  const supplier = await Supplier.findByIdAndUpdate(
    existingSupplier._id,
    { isRecycled: true, recycledAt: new Date() },
    { new: true, runValidators: true },
  );

  if (!supplier) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No supplier available');
  }
  return supplier
};
const restoreFromRecycledSupplier = async (id: string) => {
  const existingSupplier = await Supplier.findById(id);
  if (!existingSupplier) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No supplier exist.');
  }

  const supplier = await Supplier.findByIdAndUpdate(
    existingSupplier._id,
    { isRecycled: false, recycledAt: new Date() },
    { new: true, runValidators: true },
  );

  if (!supplier) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No supplier available');
  }
  return supplier
};

export const supplierServices = {
  createSupplier,
  getAllSupplier,
  getSinigleSupplier,
  updateSupplier,
  moveToRecycledbinSupplier,
  restoreFromRecycledSupplier,
  permanenatlyDeleteSupplier,
};

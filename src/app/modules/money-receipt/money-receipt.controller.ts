/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MoneyReceiptServices } from './money-receipt.service';
import { RequestHandler } from 'express';

const createMoneyReceipt = catchAsync(async (req, res) => {
  const result = await MoneyReceiptServices.createMoneyReceiptDetails(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Money receipt created successful!',
    data: result,
  });
});

const getAllMoneyReceipts = catchAsync(async (req, res) => {
  const id = req.query.id as string;
  const limit = parseInt(req.query.limit as string);
  const page = parseInt(req.query.page as string);
  const isRecycled = req.query.isRecycled as string; 
  const searchTerm = req.query.searchTerm as string;

  const result = await MoneyReceiptServices.getAllMoneyReceiptsFromDB(
    id,
    limit,
    page,
    searchTerm,
    isRecycled
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Money receipts are retrieved successful',
    data: result,
  });
});

const getSingleMoneyReceipt = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await MoneyReceiptServices.getSingleMoneyReceiptDetails(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Money receipt retrieved successful!',
    data: result,
  });
});

const updateMoneyReceipt = catchAsync(async (req, res) => {
  const { id } = req.params;

  const moneyReceipt = await MoneyReceiptServices.updateMoneyReceiptDetails(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Money receipt update successful!',
    data: moneyReceipt,
  });
});


const generateMoneyPdf: RequestHandler = catchAsync(async (req, res) => {
  const { moneyReceiptId } = req.params;

  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://api.trustautosolution.com'
  try {
    const pdfBuffer = await MoneyReceiptServices.generateMoneyPdf(moneyReceiptId,imageUrl);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=money-receipt-${moneyReceiptId}.pdf`,
    );

    res.send(pdfBuffer);
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'An error occurred while generating the invoice.',
    });
  }
});

const deleteMoneyReceipt = catchAsync(async (req, res) => {
  const { id } = req.params;

  const moneyReceipt = await MoneyReceiptServices.deleteMoneyReceipt(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Money receipt deleted successful!',
    data: moneyReceipt,
  });
});
const permanantlyDeleteMoneyReceipt = catchAsync(async (req, res) => {
  const { id } = req.params;

  const moneyReceipt = await MoneyReceiptServices.permanantlyDeleteMoneyReceipt(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Money receipt permanantly deleted successful!',
    data: moneyReceipt,
  });
});
const movetoRecyledbinMoneyReceipt = catchAsync(async (req, res) => {
  const { id } = req.params;

  const moneyReceipt = await MoneyReceiptServices.movetoRecyledbinMoneyReceipt(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Money receipt Move to Recycled bin successful!',
    data: moneyReceipt,
  });
});
const restoreFromRecyledbinMoneyReceipt = catchAsync(async (req, res) => {
  const { id } = req.params;

  const moneyReceipt = await MoneyReceiptServices.restoreFromRecyledbinMoneyReceipt(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Money receipt restore successful!',
    data: moneyReceipt,
  });
});
const moveAllToRecycledBinMoneyReceipts = catchAsync(async (req, res) => {
  const result = await MoneyReceiptServices.moveAllToRecycledBin();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `${result.modifiedCount} money receipts moved to the recycle bin successfully.`,
    data: null,
  });
});
const restoreAllFromRecycledBinMoneyReceipts = catchAsync(async (req, res) => {
  const result = await MoneyReceiptServices.restoreAllFromRecycledBin();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `${result.modifiedCount} money receipts restored successfully.`,
    data: null,
  });
});

const getDueAllMoneyReceipts = catchAsync(async (req, res) => {
  const id = req.query.id as string;
  const limit = parseInt(req.query.limit as string);
  const page = parseInt(req.query.page as string);
  const isRecycled = req.query.isRecycled as string; 
  const searchTerm = req.query.searchTerm as string;

  const result = await MoneyReceiptServices.getDueAllMoneyReceipts(
    id,
    limit,
    page,
    searchTerm,
    isRecycled
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Due money receipts are retrieved successful',
    data: result,
  });
});

export const moneyReceiptController = {
  createMoneyReceipt,
  getAllMoneyReceipts,
  getSingleMoneyReceipt,
  updateMoneyReceipt,
  deleteMoneyReceipt,
  generateMoneyPdf,
  permanantlyDeleteMoneyReceipt,
  movetoRecyledbinMoneyReceipt,
  restoreFromRecyledbinMoneyReceipt,
  moveAllToRecycledBinMoneyReceipts,
  restoreAllFromRecycledBinMoneyReceipts,
  getDueAllMoneyReceipts
};

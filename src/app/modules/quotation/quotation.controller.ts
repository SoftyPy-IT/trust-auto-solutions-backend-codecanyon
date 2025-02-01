/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { QuotationServices } from './quotation.service';
import { RequestHandler } from 'express';

const createQuotation = catchAsync(async (req, res) => {
  const result = await QuotationServices.createQuotationDetails(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Quotation created successful!',
    data: result,
  });
});

const getAllQuotations = catchAsync(async (req, res) => {
  const id = req.query.id as string;
  const limit = parseInt(req.query.limit as string);
  const page = parseInt(req.query.page as string);
  const isRecycled = req.query.isRecycled as string;
  const searchTerm = req.query.searchTerm as string;
  const status = req.query.status as string | undefined;
  const result = await QuotationServices.getAllQuotationsFromDB(
    id,
    limit,
    page,
    searchTerm,
    isRecycled,
    status,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Quotations are retrieved successful',
    data: result,
  });
});
const getAllQuotationsForDashboard = catchAsync(async (req, res) => {
  const result = await QuotationServices.getAllQuotationsFromDBForDashboard();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Quotations are retrieved successful',
    data: result,
  });
});

const getSingleQuotation = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await QuotationServices.getSingleQuotationDetails(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Quotation retrieved successful!',
    data: result,
  });
});

const updateQuotation = catchAsync(async (req, res) => {
  const { id } = req.params;

  const quotation = await QuotationServices.updateQuotationIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Quotation update successful!',
    data: quotation,
  });
});

const removeQuotationFromUpdate = catchAsync(async (req, res) => {
  const { id } = req.query;

  const { index, quotation_name } = req.body;

  const invoice = await QuotationServices.removeQuotationFromUpdate(
    id as string,
    index,
    quotation_name,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Quotation removed successful!',
    data: invoice,
  });
});

const deleteQuotation = catchAsync(async (req, res) => {
  const { id } = req.params;

  const quotation = await QuotationServices.deleteQuotation(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Quotation deleted successful!',
    data: quotation,
  });
});

const generateQuotationPdf: RequestHandler = catchAsync(async (req, res) => {
  const { quotationId } = req.params;
  const imageUrl =
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||
    'https://api.trustautosolution.com/';

  try {
    const pdfBuffer = await QuotationServices.generateQuotationPdf(
      quotationId,
      imageUrl,
    );
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=quotation-${quotationId}.pdf`,
    );

    res.send(pdfBuffer);
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message:
        error.message || 'An error occurred while generating the invoice.',
    });
  }
});

const permanantlyDeleteQuotation = catchAsync(async (req, res) => {
  const { id } = req.params;

  const quotation = await QuotationServices.permanentlyDeleteQuotation(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Quotation permanantly deleted successful!',
    data: quotation,
  });
});
const moveToRecyclebinQuotation = catchAsync(async (req, res) => {
  const { id } = req.params;

  const quotation = await QuotationServices.moveToRecyclebinQuotation(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Quotation move to Recyled bin successful!',
    data: quotation,
  });
});
const restoreFromRecyclebinQuotation = catchAsync(async (req, res) => {
  const { id } = req.params;

  const quotation = await QuotationServices.restoreFromRecyclebinQuotation(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Quotation  restore successful!',
    data: quotation,
  });
});

const moveAllToRecycledBinMoneyReceipts = catchAsync(async (req, res) => {
  const result = await QuotationServices.moveAllToRecycledBin();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `${result.modifiedCount} quotaton moved to the recycle bin successfully.`,
    data: null,
  });
});
const restoreAllFromRecycledBinMoneyReceipts = catchAsync(async (req, res) => {
  const result = await QuotationServices.restoreAllFromRecycledBin();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `${result.modifiedCount} quotaion restored successfully.`,
    data: null,
  });
});
export const quotationController = {
  createQuotation,
  getAllQuotations,
  getAllQuotationsForDashboard,
  getSingleQuotation,
  updateQuotation,
  deleteQuotation,
  removeQuotationFromUpdate,
  generateQuotationPdf,
  restoreFromRecyclebinQuotation,
  permanantlyDeleteQuotation,
  moveToRecyclebinQuotation,
  restoreAllFromRecycledBinMoneyReceipts,
  moveAllToRecycledBinMoneyReceipts,
};

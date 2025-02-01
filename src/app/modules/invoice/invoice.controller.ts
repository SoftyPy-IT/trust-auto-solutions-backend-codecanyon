/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { InvoiceServices } from './invoice.service';
import { RequestHandler } from 'express';

const createInvoice = catchAsync(async (req, res) => {
  const result = await InvoiceServices.createInvoiceDetails(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Invoice created successful!',
    data: result,
  });
});
const getAllInvoices = catchAsync(async (req, res) => {
  const id = req.query.id as string;
  const limit = parseInt(req.query.limit as string);
  const page = parseInt(req.query.page as string);
  const searchTerm = req.query.searchTerm as string;
  const isRecycled = req.query.isRecycled as string; 
  const result = await InvoiceServices.getAllInvoicesFromDB(
    id,
    limit,
    page,
    searchTerm,
    isRecycled
  );

  const formattedInvoices = result.invoices.map((invoice) => ({
    ...invoice,
    moneyReceipts: invoice.moneyReceipts || [],  // Ensure it's included
    net_total: invoice.net_total
      ? invoice.net_total.toLocaleString('en-IN')
      : '0',
    due: invoice.due ? invoice.due.toLocaleString('en-IN') : '0',
    service_total: invoice.service_total
      ? invoice.service_total.toLocaleString('en-IN')
      : '0',
    total_amount: invoice.total_amount
      ? invoice.total_amount.toLocaleString('en-IN')
      : '0',
    parts_total: invoice.parts_total
      ? invoice.parts_total.toLocaleString('en-IN')
      : '0',
  }));
  
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Invoices retrieved successfully',
    data: {
      invoices: formattedInvoices,
      meta: result.meta,
    },
  });
});

const getSingleInvoice = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await InvoiceServices.getSingleInvoiceDetails(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Invoice retrieved successful!',
    data: result,
  });
});

const updateInvoice = catchAsync(async (req, res) => {
  const { id } = req.params;

  const invoice = await InvoiceServices.updateInvoiceIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Invoice update successful!',
    data: invoice,
  });
});
const removeInvoiceFromUpdate = catchAsync(async (req, res) => {
  const { id } = req.query;

  const { index, invoice_name } = req.body;

  const invoice = await InvoiceServices.removeInvoiceFromUpdate(
    id as string,
    index,
    invoice_name,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Invoice removed successful!',
    data: invoice,
  });
});

export const getInvoice: RequestHandler = catchAsync(async (req, res) => {
  const { invoiceId } = req.params;
  const imageUrl =
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||
    'https://api.trustautosolution.com/';

  try {
    const pdfBuffer = await InvoiceServices.generateInvoicePDF(
      invoiceId,
      imageUrl,
    );
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=invoice-${invoiceId}.pdf`,
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
const deleteInvoice = catchAsync(async (req, res) => {
  const { id } = req.params;

  const invoice = await InvoiceServices.deleteInvoice(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Invoice deleted successful!',
    data: invoice,
  });
});
const permanantlyDeleteInvoice = catchAsync(async (req, res) => {
  const { id } = req.params;

  const invoice = await InvoiceServices.permanantlyDeleteInvoice(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Invoice permanently deleted successful!',
    data: invoice,
  });
});
const moveToRecylebinInvoice = catchAsync(async (req, res) => {
  const { id } = req.params;

  const invoice = await InvoiceServices.moveToRecycledbinInvoice(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Invoice move to recycled bin successful!',
    data: invoice,
  });
});
const restoreFromRecylebinInvoice = catchAsync(async (req, res) => {
  const { id } = req.params;

  const invoice = await InvoiceServices.restoreFromRecycledbinInvoice(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Invoice restore successful!',
    data: invoice,
  });
});
const moveAllToRecycledBinMoneyReceipts = catchAsync(async (req, res) => {
  const result = await InvoiceServices.moveAllToRecycledBin();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `${result.modifiedCount} invoice moved to the recycle bin successfully.`,
    data: null,
  });
});
const restoreAllFromRecycledBinMoneyReceipts = catchAsync(async (req, res) => {
  const result = await InvoiceServices.restoreAllFromRecycledBin();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `${result.modifiedCount} invoice restored successfully.`,
    data: null,
  });
});
export const invoiceController = {
  createInvoice,
  getAllInvoices,
  getSingleInvoice,
  updateInvoice,
  deleteInvoice,
  removeInvoiceFromUpdate,
  getInvoice,
  restoreFromRecylebinInvoice,
  moveToRecylebinInvoice,
  permanantlyDeleteInvoice,
  restoreAllFromRecycledBinMoneyReceipts,
  moveAllToRecycledBinMoneyReceipts
};

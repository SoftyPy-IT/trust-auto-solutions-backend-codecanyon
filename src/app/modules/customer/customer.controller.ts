import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CustomerServices } from './customer.service';

const createCustomer = catchAsync(async (req, res) => {
  const customer = await CustomerServices.createCustomerDetails(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Customer created successful!',
    data: customer,
  });
});

const getAllCustomers = catchAsync(async (req, res) => {
  const limit = parseInt(req.query.limit as string);
  const page = parseInt(req.query.page as string);
  const isRecycled = req.query.isRecycled as string; 
  const searchTerm = req.query.searchTerm as string;

  const result = await CustomerServices.getAllCustomersFromDB(
    limit,
    page,
    searchTerm,
    isRecycled,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Customers retrieved successfully',
    data: result,
  });
});


const getSingleCustomerDetails = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CustomerServices.getSingleCustomerDetails(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Customer retrieved successful!',
    data: result,
  });
});

const updateCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;

  const service = await CustomerServices.updateCustomer(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Customer update successful!',
    data: service,
  });
});
const permanantlyDeleteCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;

  const service = await CustomerServices.permanantlyDeleteCustomer(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Customer permanantly deleted successful!',
    data: service,
  });
});
const deleteCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;

  const service = await CustomerServices.deleteCustomer(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Customer deleted successful!',
    data: service,
  });
});
const moveToRecycledCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;

  const service = await CustomerServices.moveToRecycledCustomer(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Customer move to recycled bin  successful!',
    data: service,
  });
});
const restoreFromRecycledCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;

  const service = await CustomerServices.restoreFromRecycledCustomer(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Customer restore successful!',
    data: service,
  });
});
const moveAllToRecycledBinMoneyReceipts = catchAsync(async (req, res) => {
  const result = await CustomerServices.moveAllToRecycledBin();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `${result.modifiedCount} customer moved to the recycle bin successfully.`,
    data: null,
  });
});
const restoreAllFromRecycledBinMoneyReceipts = catchAsync(async (req, res) => {
  const result = await CustomerServices.restoreAllFromRecycledBin();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `${result.modifiedCount} customer restored successfully.`,
    data: null,
  });
});
export const customerController = {
  createCustomer,
  getAllCustomers,
  getSingleCustomerDetails,
  deleteCustomer,
  updateCustomer,
  moveToRecycledCustomer,
  permanantlyDeleteCustomer,
  restoreFromRecycledCustomer,
  restoreAllFromRecycledBinMoneyReceipts,
  moveAllToRecycledBinMoneyReceipts
};

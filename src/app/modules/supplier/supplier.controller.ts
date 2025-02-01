import { NextFunction, Request, Response } from 'express';

import httpStatus from 'http-status';

import sendResponse from '../../utils/sendResponse';
import { supplierServices } from './supplier.service';


const createSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    const payload = req.body;
    if (payload.data) {
      Object.assign(payload, JSON.parse(payload.data));
      delete payload.data;
    }

    const result = await supplierServices.createSupplier(payload, file);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Supplier created successfully',
      data: result,
    });
  } catch (err: any) {
    console.error('Error in controller:', err.message);
    next(err);
  }
};

const getAllSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await supplierServices.getAllSupplier(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Supplier are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getSingleSupplier = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await supplierServices.getSinigleSupplier(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Supplier is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await supplierServices.updateSupplier(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Supplier update succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const permanenatlyDeleteSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await supplierServices.permanenatlyDeleteSupplier(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Supplier permanently deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const moveToRecycledbinSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await supplierServices.moveToRecycledbinSupplier(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Supplier move to recycled bin successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const restoreFromRecycledSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await supplierServices.restoreFromRecycledSupplier(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Supplier restore successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const supplierController = {
  getAllSupplier,
  getSingleSupplier,
  updateSupplier,
  createSupplier,
  permanenatlyDeleteSupplier,
  moveToRecycledbinSupplier,
  restoreFromRecycledSupplier
};

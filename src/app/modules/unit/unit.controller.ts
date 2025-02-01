import { NextFunction, Request, Response } from 'express';

import httpStatus from 'http-status';

import sendResponse from '../../utils/sendResponse';
import { unitServices } from './unit.service';

const createUnit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    const payload = req.body;
    if (payload.data) {
      Object.assign(payload, JSON.parse(payload.data));
      delete payload.data;
    }

    const result = await unitServices.createUnit(payload, file);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Unit created successfully',
      data: result,
    });
  } catch (err: any) {
    console.error('Error in controller:', err.message);
    next(err);
  }
};

const getAllUnit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await unitServices.getAllUnit(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Unit are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getSingleUnit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await unitServices.getSinigleUnit(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Unit is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteUnit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await unitServices.deleteUnit(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Unit deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateUnit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await unitServices.updateUnit(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Unit update succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const unitControllers = {
  getAllUnit,
  getSingleUnit,
  deleteUnit,
  updateUnit,
  createUnit,
};

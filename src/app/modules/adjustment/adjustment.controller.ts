import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { adjustmentServices } from './adjustment.service';

const createAdjustment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const file = req.file;
    const payload = req.body;
    if (payload.data) {
      Object.assign(payload, JSON.parse(payload.data));
      delete payload.data;
    }

    const result = await adjustmentServices.createAdjustment(payload, file);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Adjustment created successfully',
      data: result,
    });
  } catch (err: any) {
    console.error('Error in controller:', err.message);
    next(err);
  }
};

const getAllAdjustment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await adjustmentServices.getAllAdjustment(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Adjustment are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getSingleAdjustment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await adjustmentServices.getSinigleAdjustment(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Adjustment is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteAdjustment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await adjustmentServices.deleteAdjustment(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Adjustment deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateAdjustment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await adjustmentServices.updateAdjustment(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Adjustment update succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const adjustmentControllers = {
  getAllAdjustment,
  getSingleAdjustment,
  deleteAdjustment,
  updateAdjustment,
  createAdjustment,
};

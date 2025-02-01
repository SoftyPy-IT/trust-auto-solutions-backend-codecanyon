/* eslint-disable @typescript-eslint/no-unused-vars */
import QueryBuilder from '../../builder/QueryBuilder';
import { ImageUpload } from '../../utils/ImageUpload';
import path from 'path';
import { Adjustment } from './adjustment.model';
import { adjustmentSearch } from './adjustment.constant';
import { TAdjustment } from './adjustment.interface';
const createAdjustment = async (payload: any, file?: Express.Multer.File) => {
  try {


    if (file) {
      const imageName = file.filename;
      const imagePath = path.join(process.cwd(), 'uploads', file.filename);

      const folder = 'adjustment-images';
      const cloudinaryResult = await ImageUpload(imagePath, imageName, folder);

      payload.image = cloudinaryResult.secure_url;
    }

    if (payload.image && typeof payload.image !== 'string') {
      throw new Error('Invalid image URL format');
    }

    const newAdjustment = await Adjustment.create(payload);

    return newAdjustment;
  } catch (error: any) {
    console.error('Error creating adjustment:', error.message);
    throw new Error(
      error.message ||
        'An unexpected error occurred while creating the adjustment',
    );
  }
};
const getAllAdjustment = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(Adjustment.find(), query)
    .search(adjustmentSearch)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await categoryQuery.countTotal();
  const adjustments = await categoryQuery.modelQuery;

  return {
    meta,
    adjustments,
  };
};

const getSinigleAdjustment = async (id: string) => {
  const result = await Adjustment.findById(id);
  return result;
};
const updateAdjustment = async (id: string, payload: Partial<TAdjustment>) => {
  const result = await Adjustment.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteAdjustment = async (id: string) => {
  const result = await Adjustment.deleteOne({ _id: id });

  return result;
};

export const adjustmentServices = {
  createAdjustment,
  getAllAdjustment,
  getSinigleAdjustment,
  updateAdjustment,
  deleteAdjustment,
};

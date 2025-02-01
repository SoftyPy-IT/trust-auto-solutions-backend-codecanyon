/* eslint-disable @typescript-eslint/no-unused-vars */
import QueryBuilder from '../../builder/QueryBuilder';
import { ImageUpload } from '../../utils/ImageUpload';
import path from 'path';
import { Unit } from './unit.model';
import { unitSearch } from './unit.constant';
import { TUnit } from './unit.interface';
const createUnit = async (payload: any, file?: Express.Multer.File) => {
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

    const newCategory = await Unit.create(payload);
    return newCategory;
  } catch (error: any) {
    console.error('Error creating brand:', error.message);
    throw new Error(
      error.message || 'An unexpected error occurred while creating the brand',
    );
  }
};

const getAllUnit = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(Unit.find(), query)
    .search(unitSearch)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await categoryQuery.countTotal();
  const units = await categoryQuery.modelQuery;

  return {
    meta,
    units,
  };
};
const getSinigleUnit = async (id: string) => {
  const result = await Unit.findById(id);
  return result;
};
const updateUnit = async (id: string, payload: Partial<TUnit>) => {
  const result = await Unit.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};


const deleteUnit = async (id: string) => {
  const result = await Unit.deleteOne({ _id: id });

  return result;
};

export const unitServices = {
  createUnit,
  getAllUnit,
  getSinigleUnit,
  updateUnit,
  deleteUnit,
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import QueryBuilder from '../../builder/QueryBuilder';
import { ImageUpload } from '../../utils/ImageUpload';
import path from 'path';
import { Brand } from './brand.model';
import { TBrand } from './brand.interface';
import { brandSearch } from './brand.constant';
const createBrand = async (payload: any, file?: Express.Multer.File) => {
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

    const newCategory = await Brand.create(payload);
    return newCategory;
  } catch (error: any) {
    console.error('Error creating brand:', error.message);
    throw new Error(
      error.message || 'An unexpected error occurred while creating the brand',
    );
  }
};

const getAllBrand = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(Brand.find(), query)
    .search(brandSearch)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await categoryQuery.countTotal();
  const brands = await categoryQuery.modelQuery;

  return {
    meta,
    brands,
  };
};
const getSinigleBrand = async (id: string) => {
  const result = await Brand.findById(id);
  return result;
};
const updateBrand = async (id: string, payload: Partial<TBrand>) => {
  const result = await Brand.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBrand = async (id: string) => {
  const result = await Brand.deleteOne({ _id: id });

  return result;
};

export const brandServices = {
  createBrand,
  getAllBrand,
  getSinigleBrand,
  updateBrand,
  deleteBrand,
};

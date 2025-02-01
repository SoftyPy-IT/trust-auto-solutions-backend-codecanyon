import express from 'express';
import { supplierController } from './supplier.controller';
import validateRequest from '../../middlewares/validateRequest';
import { supplierValidation } from './supplier.validation';

const router = express.Router();

router
  .route('/')
  .post(
    validateRequest(supplierValidation.supplierValidationSchema),
    supplierController.createSupplier,
  )
  .get(supplierController.getAllSupplier);

router
  .route('/:id')
  .get(supplierController.getSingleSupplier)
  .put(supplierController.updateSupplier)
router
  .route('/recycle/:id')
  .patch(supplierController.moveToRecycledbinSupplier);
router
  .route('/restore/:id')
  .patch(supplierController.restoreFromRecycledSupplier);
router
  .route('/delete-permenantly/:id')
  .delete(supplierController.permanenatlyDeleteSupplier);

export const SupplierRoutes = router;

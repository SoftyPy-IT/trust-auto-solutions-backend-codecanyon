import { Router } from 'express';
import { StockController } from './Stock.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStockSchema } from './Stock.validation';
import { upload } from '../../utils/cloudinary';


const router = Router();

router.get('/', StockController.getAllStock);
router.get('/:id', StockController.getStockById);
router.post(
  '/',

  // validateRequest(createStockSchema),
  StockController.createStock
);
router.put('/:id', upload.single('file'), StockController.updateStock);
router.delete('/:id', StockController.deleteStock);

export const StockRoutes = router;

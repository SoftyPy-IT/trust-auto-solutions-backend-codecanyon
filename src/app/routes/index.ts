import { Router } from 'express';
import { CustomerRoutes } from '../modules/customer/customer.route';
import { CompanyRoutes } from '../modules/company/company.route';
import { ShowRoomRoutes } from '../modules/showRoom/showRoom.route';
import { VehicleRoutes } from '../modules/vehicle/vehicle.route';
import { JobCardRoutes } from '../modules/jobCard/job-card.route';
import { QuotationRoutes } from '../modules/quotation/quotation.route';
import { InvoiceRoutes } from '../modules/invoice/invoice.route';
import { SupplierRoutes } from '../modules/supplier/supplier.route';
import { EmployeeRoutes } from '../modules/employee/employee.route';
import { AttendanceRoutes } from '../modules/attendance/attendance.route';
import { SalaryRoutes } from '../modules/salary/salary.route';
import { ExpenseRoutes } from '../modules/expense/expense.route';
import { MoneyReceiptRoutes } from '../modules/money-receipt/money-receipt.route';
import { IncomeRoutes } from '../modules/income/income.route';
import { BillPayRoutes } from '../modules/bill-pay/bill-pay.route';
import { purchaseRoutes } from '../modules/purchase/purchase.route';
import { donationRoutes } from '../modules/donation/donation.route';
import { categoryRoutes } from '../modules/category/category.route';
import { brandRoutes } from '../modules/brand/brand.route';
import { unitRoutes } from '../modules/unit/unit.route';
import { adjustmentRoutes } from '../modules/adjustment/adjustment.route';
import { productRoutes } from '../modules/product/product.route';
import { productTypeRoutes } from '../modules/productType/productType.route';
import { barcodeRoutes } from '../modules/barcode/barcode.router';
import { StockRoutes } from '../modules/Stock/Stock.router';
import { metaroute } from '../modules/meta/meta.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/customers',
    route: CustomerRoutes,
  },
  {
    path: '/companies',
    route: CompanyRoutes,
  },
  {
    path: '/showrooms',
    route: ShowRoomRoutes,
  },
  {
    path: '/vehicles',
    route: VehicleRoutes,
  },
  {
    path: '/jobCards',
    route: JobCardRoutes,
  },
  {
    path: '/quotations',
    route: QuotationRoutes,
  },
  {
    path: '/invoices',
    route: InvoiceRoutes,
  },
  {
    path: '/suppliers',
    route: SupplierRoutes,
  },
  {
    path: '/employees',
    route: EmployeeRoutes,
  },
  {
    path: '/attendances',
    route: AttendanceRoutes,
  },
  {
    path: '/salary',
    route: SalaryRoutes,
  },
  {
    path: '/incomes',
    route: IncomeRoutes,
  },
  {
    path: '/expenses',
    route: ExpenseRoutes,
  },
  {
    path: '/money-receipts',
    route: MoneyReceiptRoutes,
  },
  {
    path: '/bill-pays',
    route: BillPayRoutes,
  },
  {
    path: '/purchases',
    route: purchaseRoutes,
  },
  {
    path: '/donation',
    route: donationRoutes,
  },
  {
    path: '/category',
    route: categoryRoutes,
  },
  {
    path: '/brand',
    route: brandRoutes,
  },
  {
    path: '/unit',
    route: unitRoutes,
  },
  {
    path: '/adjustment',
    route: adjustmentRoutes,
  },
  {
    path: '/products',
    route: productRoutes,
  },
  {
    path: '/product-type',
    route: productTypeRoutes,
  },
  {
    path: '/barcode',
    route: barcodeRoutes,
  },
  {
    path: '/stock',
    route: StockRoutes,
  },
  {
    path: '/meta',
    route: metaroute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

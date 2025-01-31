import {
  NgModule,
  Component
} from "@angular/core";
import {
  Routes,
  RouterModule
} from "@angular/router";
import {
  CommonModule
} from "@angular/common";

import {
  AppLayoutComponent
} from "./layout.component";
import { K4cOutletAdvanceOrderComponent } from './common/OutletManagement/k4c-outlet-advance-order/k4c-outlet-advance-order.component';
import { K4cPosBillOrderComponent } from './common/OutletManagement/k4c-pos-bill-order/k4c-pos-bill-order.component';
import { ReceiveDistributionChallanComponent } from './common/OutletManagement/receive-distribution-challan/receive-distribution-challan.component';
import { K4cOutletSaleBillComponent } from './common/OutletManagement/k4c-outlet-sale-bill/k4c-outlet-sale-bill.component';
import { K4cOutletRequistionComponent } from './common/OutletManagement/k4c-outlet-requistion/k4c-outlet-requistion.component';
import { OutletStockTransferComponent } from './common/OutletManagement/outlet-stock-transfer/outlet-stock-transfer.component';
import { OutletStockMovementComponent } from './common/OutletManagement/outlet-stock-movement/outlet-stock-movement.component';
import { OutletGroupReportComponent } from './common/OutletManagement/outlet-group-report/outlet-group-report.component';
import { StoreItemIndentComponent } from './common/OutletManagement/store-item-indent/store-item-indent.component';
import { K4cDayEndProcessComponent } from './common/OutletManagement/k4c-day-end-process/k4c-day-end-process.component';
import { OutletClosingStockWithBatchComponent } from './common/OutletManagement/outlet-closing-stock-with-batch/outlet-closing-stock-with-batch.component';
import { NonSaleableClosingStockComponent } from './common/OutletManagement/non-saleable-closing-stock/non-saleable-closing-stock.component';
import { SubledgerReportForFranchiseComponent } from "./common/FinancialManagement/Master/subledger-report-for-franchise/subledger-report-for-franchise.component";
import { K4cMasterCostCenterComponent } from './common/MaterialManagement/Master/k4c-master-cost-center/k4c-master-cost-center.component';
import { MasterUomComponent } from "./common/MaterialManagement/Master/master-uom/master-uom.component";
import { K4cCutoffComponent } from './common/MaterialManagement/Master/k4c-cutoff/k4c-cutoff.component';
import { K4cMasterBOMReciepeComponent } from './common/MaterialManagement/Production/k4c-master-bom-reciepe/k4c-master-bom-reciepe.component';
import { K4cMasterProductComponent } from './common/MaterialManagement/Master/k4c-master-product/k4c-master-product.component';
import { K4CDispatchToOutletComponent } from './common/MaterialManagement/Outward/Distribution Challan/k4-c-dispatch-to-outlet/k4-c-dispatch-to-outlet.component';
import { K4CDispatchOutletAdvOrderComponent } from './common/MaterialManagement/Outward/k4-c-dispatch-outlet-adv-order/k4-c-dispatch-outlet-adv-order.component';
import { K4cDispatchOutletStoreComponent } from './common/MaterialManagement/Outward/k4c-dispatch-outlet-store/k4c-dispatch-outlet-store.component';
import {StocktransferComponent} from "./common/MaterialManagement/Transaction/compacct.stocktransfer/compacct.stocktransfer.component";
import { K4cProductionVoucherNewComponent } from './common/MaterialManagement/Production/k4c-production-voucher-new/k4c-production-voucher-new.component';
import { SemiFinishedProductionVoucherComponent } from './common/MaterialManagement/Production/semi-finished-production-voucher/semi-finished-production-voucher.component';
import { K4cAllDiagnosisComponent } from './common/OutletManagement/k4c-all-diagnosis/k4c-all-diagnosis.component';
import { K4cSwiggyZomatoFileUploadComponent } from "./common/OutletManagement/k4c-swiggy-zomato-file-upload/k4c-swiggy-zomato-file-upload.component";
import { AdvanceOrderAdjustmentComponent } from './common/OutletManagement/advance-order-adjustment/advance-order-adjustment.component';
import { EInvoiceConfirmationFormComponent } from './common/OutletManagement/e-invoice-confirmation-form/e-invoice-confirmation-form.component';
import { K4CBillDateUpdateComponent } from "./common/OutletManagement/k4-c-bill-date-update/k4-c-bill-date-update.component";
import { BillEditFromAdminComponent } from './common/MaterialManagement/bill-edit-from-admin/bill-edit-from-admin.component';
import { OutletTxnBankDepositComponent } from './common/OutletManagement/outlet-txn-bank-deposit/outlet-txn-bank-deposit.component';
import { K4cConversionOfProductComponent } from './common/MaterialManagement/Outward/k4c-conversion-of-product/k4c-conversion-of-product.component';
import { CommonPurchaseBillGstComponent } from './common/FinancialManagement/Transaction/Purchase/common-purchase-bill-gst/common-purchase-bill-gst.component';
import { K4cCreditNoteBrowseComponent } from './common/MaterialManagement/k4c-credit-note-browse/k4c-credit-note-browse.component';
import { K4cFranchiseSaleBillComponent } from './common/MaterialManagement/k4c-franchise-sale-bill/k4c-franchise-sale-bill.component';
import { SaleBillNewComponent } from './common/FinancialManagement/Transaction/Sales/sale-bill-new/sale-bill-new.component';
import { JournalVoucherComponent } from "./common/FinancialManagement/Transaction/Voucher/journal-voucher/journal-voucher.component";
import { K4cVoucherComponent } from './common/FinancialManagement/Transaction/Voucher/k4c-voucher/k4c-voucher.component';
import { AccOpeningBalcManagementComponent } from "./common/OutletManagement/acc-opening-balc-management/acc-opening-balc-management.component";
import { ChangeBatchNumberComponent } from './common/MaterialManagement/Outward/change-batch-number/change-batch-number.component';
import { K4cPremixStockTransferComponent } from './common/MaterialManagement/Production/k4c-premix-stock-transfer/k4c-premix-stock-transfer.component';
import { K4cPremixInventoryComponent } from './common/MaterialManagement/Production/k4c-premix-inventory/k4c-premix-inventory.component';
import { K4cPremixItemClosingStockComponent } from './common/MaterialManagement/Production/k4c-premix-item-closing-stock/k4c-premix-item-closing-stock.component';
import { K4cProductionClosingStockComponent } from './common/MaterialManagement/Production/k4c-production-closing-stock/k4c-production-closing-stock.component';
import { CrateTransferDispatchToOutletComponent } from './common/MaterialManagement/Outward/crate-transfer-dispatch-to-outlet/crate-transfer-dispatch-to-outlet.component';
import { K4cRsnsClosingStockComponent } from './common/MaterialManagement/k4c-rsns-closing-stock/k4c-rsns-closing-stock.component';
import { K4cAdvOrderInternalStockTransferComponent } from './common/MaterialManagement/k4c-adv-order-internal-stock-transfer/k4c-adv-order-internal-stock-transfer.component';
import { K4cCrateInOuComponent } from './common/MaterialManagement/Outward/k4c-crate-in-ou/k4c-crate-in-ou.component';
import { K4cPurchasePlaningComponent } from './common/MaterialManagement/k4c-purchase-planing/k4c-purchase-planing.component';
import { K4cAcceptRawMaterialStockTransferComponent } from './common/MaterialManagement/k4c-accept-raw-material-stock-transfer/k4c-accept-raw-material-stock-transfer.component';
import { WastageComponent } from "./common/MaterialManagement/Outward/wastage/wastage.component";
import { StockTransferToStoreComponent } from './common/MaterialManagement/Outward/stock-transfer-to-store/stock-transfer-to-store.component';
import { K4cRawMaterialStockTransferComponent } from './common/MaterialManagement/k4c-raw-material-stock-transfer/k4c-raw-material-stock-transfer.component';
import { K4cRawMaterialIssueComponent } from './common/MaterialManagement/Production/k4c-raw-material-issue/k4c-raw-material-issue.component';
import { K4cRawMaterialIndentComponent } from './common/MaterialManagement/k4c-raw-material-indent/k4c-raw-material-indent.component';
import { K4cFactoryIndentAdvanceComponent } from './common/MaterialManagement/k4c-factory-indent-advance/k4c-factory-indent-advance.component';
import { K4cFactoryReturnComponent } from './common/OutletManagement/k4c-factory-return/k4c-factory-return.component';
import { K4cDepartmentWiseRequisitionComponent } from './common/MaterialManagement/k4c-department-wise-requisition/k4c-department-wise-requisition.component';
import { K4cFactoryRequisitionComponent } from './common/MaterialManagement/k4c-factory-requisition/k4c-factory-requisition.component';
import { K4cInternalStockTransferNewComponent } from './common/OutletManagement/k4c-internal-stock-transfer-new/k4c-internal-stock-transfer-new.component';
import { K4CStockDetailsComponent } from "./common/FinancialManagement/Master/k4-c-stock-details/k4-c-stock-details.component";
import { ClosingStockWithExpiryDateComponent } from './common/OutletManagement/closing-stock-with-expiry-date/closing-stock-with-expiry-date.component';
import { K4cStockAdjustmentStoreItemsComponent } from './common/MaterialManagement/Production/k4c-stock-adjustment-store-items/k4c-stock-adjustment-store-items.component';
import { UpdateExpiryComponent } from './common/OutletManagement/update-expiry/update-expiry.component';
import { ReceiveStockAdjustmentComponent } from './common/OutletManagement/receive-stock-adjustment/receive-stock-adjustment.component';
import { IssueStockAdjustmentComponent } from './common/OutletManagement/issue-stock-adjustment/issue-stock-adjustment.component';
import { K4cAdvanceProductionComponent } from "./common/MaterialManagement/Production/k4c-advance-production/k4c-advance-production.component";
import { OutletSaleBillWithoutBatchSelectComponent } from './common/OutletManagement/outlet-sale-bill-without-batch-select/outlet-sale-bill-without-batch-select.component';
import { OutletStockTransferAutoBatchComponent } from './common/OutletManagement/outlet-stock-transfer-auto-batch/outlet-stock-transfer-auto-batch.component';
const layoutRoutes: Routes = [{
  path: "",
  component: AppLayoutComponent,
  data: {
    title: "Dashboard"
  },
  children: [{
      path: "Business_Dashboard",
      loadChildren: () =>
        import("./dashBoard/compacct.dashboard.module").then(
          m => m.CompacctDashboardModule
        ),
      data: {
        title: "Business Dashboard"
      }
    },
    
    {
      path: "scheduler_operation",
      loadChildren: () =>
        import(
          "./common/CRM/Transaction/compacct.scheduler/compacct.scheduler.module"
        ).then(m => m.CompacctSchedulerModule),
      data: {
        title: "Appointment Scheduler"
      }
    },
    {
      path: 'K4C_Outlet_Advance_Order',
      component: K4cOutletAdvanceOrderComponent,
      data: {
        title: 'Advance Order'
      }
    },  {
      path: 'POS_BIll_Order',
      component: K4cPosBillOrderComponent,
      data: {
        title: 'POS Bill Order'
      }
    },{
      path: 'Accept_Receive_Distribution_Challan',
      component: ReceiveDistributionChallanComponent,
      data: {
        title: 'Browse Accept Challan'
      }
    },
    {
      path: 'K4C_Outlet_Sale_Bill',
      component: K4cOutletSaleBillComponent,
      data: {
        title: 'POS Bill'
      }
    },{
      path: 'K4C_Outlet_Requisition',
      component: K4cOutletRequistionComponent,
      data: {
        title: 'K4C_Outlet_Requisition'
      }
    },{
      path: 'K4C_Outlet_Stock_Transfer',
      component: OutletStockTransferComponent,
      data: {
        title: 'Outlet Stock Transfer'
      }
    },{
      path: 'Outlet_Stock_Movement',
      component: OutletStockMovementComponent,
      data: {
        title: 'Outlet Stock Movement'
      }
    },
    {
      path: 'Outlet_Group_Report',
      component: OutletGroupReportComponent,
      data: {
        title: 'Group Report'
      }
    },{
      path: 'Store_Item_Indent',
      component: StoreItemIndentComponent,
      data: {
        title: 'Store Item Indent'
      }
    }, {
      path: 'K4C_Day_End_Process',
      component: K4cDayEndProcessComponent,
      data: {
        title: 'Day End Process'
      }
    },
    {
      path: 'Outlet_Closing_Stock_With_Batch',
      component: OutletClosingStockWithBatchComponent,
      data: {
        title: 'Outlet Closing Stock With Batch'
      }
    },
    {
      path: 'Non_Saleable_Closing_Stock_Outlet',
      component: NonSaleableClosingStockComponent,
      data: {
        title: 'Non Saleable Closing Stock'
      }
    },{
      path: 'Subledger_Report_For_Franchise',
      component: SubledgerReportForFranchiseComponent,
      data: {
        title: 'Subledger Report For Franchise'
    }
    },{
      path: 'K4C_Master_Cost_Center',
      component: K4cMasterCostCenterComponent,
      data: {
        title: 'Master Cost Center'
      }
    },{
      path: 'Master_UOM',
      component: MasterUomComponent,
      data: {
        title: 'Master UOM'
      }
    },{
      path: 'K4C_Cutoff',
      component: K4cCutoffComponent,
      data: {
        title: 'Cutoff Time'
      }
    },
    {
      path: 'Master_BOM_Reciepe',
      component: K4cMasterBOMReciepeComponent,
      data: {
        title: 'Master BOM Reciepe'
      }
    },
    {
      path: 'K4C_Master_Product',
      component: K4cMasterProductComponent,
      data: {
        title: 'Master Product'
      }
    },
    {
      path: 'K4C_Dispatch_to_Outlet',
      component: K4CDispatchToOutletComponent,
      data: {
        title: 'Distribution Challan'
      }
    },
    {
      path: 'K4C_Dispatch_Outlet_Adv_Order',
      component: K4CDispatchOutletAdvOrderComponent,
      data: {
        title: 'Custom Order Distribution'
      }
    },
    {
      path: 'K4C_Dispatch_to_Outlet_Store',
      component: K4cDispatchOutletStoreComponent,
      data: {
        title: 'Dispatch to Outlet Store'
      }
    },{
      path: "INV_Txn_St_Trf_GST",
      component: StocktransferComponent,
      data: {
        title: "Stock Transfer"
      }
    },{
      path: 'Production_Voucher_New',
      component: K4cProductionVoucherNewComponent,
      data: {
        title: 'Production Voucher New'
      }
    },
    {
      path: 'K4C_Advance_Order_Production',
      component: K4cAdvanceProductionComponent,
      data: {
        title: 'Advance Order Production'
      }
    },  {
      path: 'Issue_Stock_Adjustment',
      component: IssueStockAdjustmentComponent,
      data: {
        title: 'Issue Stock Adjustment'
      }
    },{
      path: 'Receive_Stock_Adjustment',
      component: ReceiveStockAdjustmentComponent,
      data: {
        title: 'Receive Stock Adjustment'
      }
    },{
      path: 'Update_Expiry',
      component: UpdateExpiryComponent,
      data: {
        title: 'Updated Expiry'
      }
    },{
      path: 'Stock_Adjustment_for_Store_Items',
      component: K4cStockAdjustmentStoreItemsComponent,
      data: {
        title: 'Stock Adjustment For Store Items '
      }
    }, {
      path: 'Closing_Stock_With_Expiry_Date',
      component: ClosingStockWithExpiryDateComponent,
      data: {
        title: 'Closing Stock With Expiry'
      }
    },
    {
      path: 'K4C_Stock_Details',
      component: K4CStockDetailsComponent,
      data: {
        title: 'K4C Stock Details'
    }
        },
        {
          path: 'Internal_Stock_Transfer_New',
          component: K4cInternalStockTransferNewComponent,
          data: {
            title: 'Internal Stock Transfer New'
          }
        },{
          path: 'Factory_Requisition',
          component: K4cFactoryRequisitionComponent,
          data: {
            title: 'Factory Requisition'
          }
        },
        {
          path: 'Department_Wise_Requisition',
          component: K4cDepartmentWiseRequisitionComponent,
          data: {
            title: 'Department Wise Requisition'
          }
        },
        {
          path: 'K4C_Factory_Return',
          component: K4cFactoryReturnComponent,
          data: {
            title: 'k4C FACTORY RETURN'
          }
        }, {
          path: 'Factory_Indent_Advance_Order',
          component: K4cFactoryIndentAdvanceComponent,
          data: {
            title: 'Indent Adv Order'
          }
        }, {
          path: 'Raw_Material_Indent',
          component: K4cRawMaterialIndentComponent,
          data: {
            title: 'Raw Material Indent'
          }
        },{
          path: 'Raw_Material_Issue',
          component: K4cRawMaterialIssueComponent,
          data: {
            title: 'Raw Material Issue'
          }
        },
        {
          path: 'Raw_Material_Stock_Transfer',
          component: K4cRawMaterialStockTransferComponent,
          data: {
            title: 'Raw Material Stock Transfer'
          }
        },{
          path: 'Stock_Transfer_To_Store',
          component: StockTransferToStoreComponent,
          data: {
            title: 'Stock Transfer To Store'
          }
        },{
          path: 'Wastage',
          component: WastageComponent,
          data: {
            title: 'Wastage'
        }
        }, {
          path: 'Accept_Raw_Material_Stock_Transfer',
            component: K4cAcceptRawMaterialStockTransferComponent,
            data: {
              title: 'Accept Raw Material Stock Transfer'
        }
        },  {
          path: 'Purchase_Planing',
          component: K4cPurchasePlaningComponent,
          data: {
            title: 'Purchase Planing'
          }
        }, {
          path: 'BL_Txn_K4C_Crate_IN_OUT',
          component: K4cCrateInOuComponent,
          data: {
            title: 'BL Txn K4C Crate IN OUT'
          }
        }, {
          path: 'Adv_Order_Internal_Stock_Transfer',
          component: K4cAdvOrderInternalStockTransferComponent,
          data: {
            title: 'Advance Order Internal Stock Transfer'
          }
        },{
          path: 'Raw_SemiFinished_Nonsaleable_Closing_Stock',
          component: K4cRsnsClosingStockComponent,
          data: {
            title: 'Raw SemiFinished Nonsaleable Closing Stock '
          }
        },  {
          path: 'Crate_Transfer_Dispatch_To_Outlet',
          component: CrateTransferDispatchToOutletComponent,
          data: {
            title: 'Crate Transfer Dispatch To Outlet'
          }
        },{
          path: 'Production_Closing_Stock',
          component: K4cProductionClosingStockComponent,
          data: {
          title: 'Production Closing Stock'
          }
          },{
            path: 'Premix_Item_Closing_Stock',
              component: K4cPremixItemClosingStockComponent,
              data: {
                title: 'Premix Item Closing Stock'
          }
          },{
            path: 'Premix_Inventory',
              component: K4cPremixInventoryComponent,
              data: {
                title: 'Premix Production'
          }
          },{
            path: 'Premix_Stock_Transfer',
              component: K4cPremixStockTransferComponent,
              data: {
                title: 'Premix Stock Transfer'
          }
              }, {
                path: 'Change_Batch_Number',
                component: ChangeBatchNumberComponent,
                data: {
                  title: 'Change Batch Number'
                }
              },{
                path: 'Acc_Txn_Op_Balance_NEW',
                component: AccOpeningBalcManagementComponent,
                data: {
                  title: 'Account Opening Balance Mangement'
                }
              } , {
                path: 'K4C_Voucher',
                component: K4cVoucherComponent,
                data: {
                  title: 'Voucher'
                }
              },{
                path: 'Journal',
                component: JournalVoucherComponent,
                data: {
                  title: 'journal'
              
                }
                },{
                  path: 'Sale_Bill_Nnew',
                    component:SaleBillNewComponent,
                    data: {
                      title: 'Sale_Bill_New'
                }
                },{
                  path: 'Franchise_Sale_Bill',
                  component: K4cFranchiseSaleBillComponent,
                  data: {
                    title: 'Franchise Sale Bill'
                  }
                },
                {
                  path : 'Credit_Note',
                  component:K4cCreditNoteBrowseComponent,
                  data: {title: 'Credit Note'}
              }, {
                path: 'Common_Purchase_Bill_GST',
                  component: CommonPurchaseBillGstComponent,
                  data: {
                    title: 'Purchase Bill GST'
              }
              },{
                path: 'Conversion_of_Product',
                component: K4cConversionOfProductComponent,
                data: {
                  title: 'Conversion of Product'
              }
              },    {
                path: 'Outlet_Txn_Bank_Deposit',
                component: OutletTxnBankDepositComponent,
                data: {
                  title: 'Outlet Txn Bank Deposit'
                }
              },  {

                path: 'Bill_Edit_From_Admin',
                component: BillEditFromAdminComponent,
                data: {
                  title: 'Sale Bill'
                }
              },{
                path: 'K4C_Bill_Date_Update',
                  component: K4CBillDateUpdateComponent,
                  data: {
                    title: 'K4C Bill Date Update'
              }
              },{
                path: 'E_Invoice_Confirmation_Form',
                  component: EInvoiceConfirmationFormComponent,
                  data: {
                    title: 'E Invoice Confirmation Form'
              }
              },
              {
                path: 'Advance_Order_Adjustment',
                  component: AdvanceOrderAdjustmentComponent,
                  data: {
                    title: 'Advance Order Adjustment'
              }
              },  {
                path: 'swiggy_zomato_file_upload',
                component: K4cSwiggyZomatoFileUploadComponent,
                data: {
                    title: 'CSV UPLOAD'
                } 
              }, {
                path: 'K4C_All_Diagnosis',
                component: K4cAllDiagnosisComponent,
                data: {
                  title: 'K4C Diagnosis'
                }
              }, {
                path: 'Outlet_Stock_Movement',
                component: OutletStockMovementComponent,
                data: {
                  title: 'Outlet Stock Movement'
                }
              },
              {
                path : 'Semi_Finished_Production_Voucher',
                component:SemiFinishedProductionVoucherComponent,
                data: {
                  title: 'Production_Voucher (Semi Finished)'
                }
              },
              {
                path: 'Outlet_Sale_Bill_WithOut_batch_Select',
                component: OutletSaleBillWithoutBatchSelectComponent,
                data: {
                  title: 'Take Away (Auto Batch)'
                }
              },
              {
                path: 'Outlet_Stock_Transfer_Atuto_Batch',
                component: OutletStockTransferAutoBatchComponent,
                data: {
                  title: 'Outlet Stock Transfer(Auto Batch)'
                }
              }
    /*{


      /*{
           path: '404',
           loadChildren: () => import('src/app/admin/pageNotFound/pageNotFound.route.module').then(m => m.PageNotFoundModule)
          },
         {path: '**', redirectTo: '/404'}*/
  ]
}];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(layoutRoutes)],
  exports: [RouterModule]
})
export class LayoutRouteModule {}
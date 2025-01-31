import { NgModule, ErrorHandler } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, Validators, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppLayoutComponent } from "./layout.component";
import { LeftSidebarComponent } from "./shared/compacct.components/compacct.layout/leftsidebar.component";
import { HeaderComponent } from "./shared/compacct.components/compacct.layout/header.component";
import { FooterComponent } from "./shared/compacct.components/compacct.layout/footer.component";
import { RightsidebarComponent } from "./shared/compacct.components/compacct.layout/rightsidebar.component";
import { LayoutRouteModule } from "./layout.routing";

// DIRECTIVE
import { CompacctDigitonlyDirective } from "./shared/compacct.directives/compacct.digitonly.directive";
import { CompacctGooglePlacesDirective } from "./shared/compacct.directives/compacct.place.directive";

//  RESULE COMPONENTS
import { CompacctDaterangepickerComponent } from "./shared/compacct.components/compacct-daterangepicker/compacct-daterangepicker.component";
import { CompacctCostcenterComponent } from "./shared/compacct.components/compacct.forms/compacct.costcenter/compacct.costcenter.component";
import { CompacctVendorComponent } from "./shared/compacct.components/compacct.forms/compacct.vendor/compacct.vendor.component";
import { CompacctCustomerComponent } from "./shared/compacct.components/compacct.forms/compacct.customer/compacct.customer.component";
import { RoyaleTaskComponent } from "./shared/compacct.components/compacct-royale/royale-task/royale-task.component";
//  MODULE COMPONENTS
import { CompacctBnbLeadComponent } from "./common/CRM/Transaction/compacct.bnb.lead/compacct.bnb.lead.component";

import { StocktransferComponent } from "./common/MaterialManagement/Transaction/compacct.stocktransfer/compacct.stocktransfer.component";
// tslint:disable-next-line:max-line-length
import { CompacctPurchasebillGstComponent } from "./common/FinancialManagement/Transaction/Purchase/compacct.purchasebill-gst/compacct.purchasebill-gst.component";
// tslint:disable-next-line:max-line-length
import { CompacctDebitComponent } from "./common/FinancialManagement/Transaction/Purchase/compacct.purchasebill-gst/compacct.debit/compacct.debit.component";
// tslint:disable-next-line:max-line-length
import { CompacctBillQcComponent } from "./common/FinancialManagement/Transaction/Purchase/compacct.purchasebill-gst/compacct.bill.qc/compacct.bill.qc.component";

// tslint:disable-next-line:max-line-length
import { MasterCostCenterGodownComponent } from "./common/MaterialManagement/Master/master.cost-center-godown/master.cost-center-godown.component";

// PRIME COMPONENTS
import { TabViewModule } from "primeng/tabview";
import { TableModule } from "primeng/table";
import { MenuModule } from "primeng/menu";
import { MultiSelectModule } from "primeng/multiselect";
import { DropdownModule } from "primeng/dropdown";
import { ToastModule } from "primeng/toast";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { FileUploadModule } from "primeng/fileupload";
import { RadioButtonModule, InputMaskModule } from "primeng/primeng";
import { EditorModule } from "primeng/editor";
import { CalendarModule } from "primeng/calendar";
import { AccordionModule } from 'primeng/accordion';
import {ProgressBarModule} from 'primeng/progressbar';
import {FieldsetModule} from 'primeng/fieldset';
import {TreeModule} from 'primeng/tree';
import {SelectButtonModule} from 'primeng/selectbutton';
import {TooltipModule} from 'primeng/tooltip';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {SliderModule} from 'primeng/slider';
// SPINNER
import { NgxUiLoaderModule } from "ngx-ui-loader";
// SYN
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { PivotFieldListAllModule } from '@syncfusion/ej2-angular-pivotview';
import { PivotViewAllModule } from '@syncfusion/ej2-angular-pivotview';
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SelectionService } from '@syncfusion/ej2-angular-gantt';
// DateRange
import { DateRangePickerModule } from "@syncfusion/ej2-angular-calendars";
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
// DATE TIME

import { OwlDateTimeModule, OwlNativeDateTimeModule ,OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';


// Nepali Date
import { NpDatepickerModule } from 'angular-nepali-datepicker';
import { DateNepalConvertService } from "./shared/compacct.global/dateNepal.service";

// SERVICE
import { CookieService } from "ngx-cookie-service";
import { CompacctCommonApi } from "./shared/compacct.services/common.api.service";
import { CompacctHeader } from "./shared/compacct.services/common.header.service";
import { CompacctGetDistinctService } from "./shared/compacct.services/compacct-get-distinct.service";
import { DateTimeConvertService } from "./shared/compacct.global/dateTime.service";
import { CompacctGlobalUrlService } from "./shared/compacct.global/global.service.service";
import { MasterProductComponent } from "./common/MaterialManagement/Master/master.product/master.product.component";
import { SafeHtmlPipe } from "./shared/compacct.pipes/compacct.safeHtml/safe-html.pipe";
import { CompacctAccountJournal } from "./shared/compacct.services/compacct.mainstreamApi/cmpacct.account-journal";
import { SharedModule } from "./shared/compacct.shared.module";
import { CompacctBnbexportsComponent } from "./common/Export/compacct.bnbexports/compacct.bnbexports.component";
import { CompacctBnbLeadbydateComponent } from "./common/CRM/Transaction/compacct.bnb.leadbydate/compacct.bnb.leadbydate.component";
import { CompacctHearingThresholdChartComponent } from "./shared/compacct.components/compacct.hearing.threshold-chart/compacct.hearing.threshold-chart.component";
import { CompacctGrnComponent } from "./common/FinancialManagement/Transaction/Purchase/compacct.purchasebill-gst/compacct.grn/compacct.grn.component";
import { from } from "rxjs";


import { CompacctLedgerComponent } from './common/FinancialManagement/Master/compacct-ledger/compacct-ledger.component';
import { CompacctRoyaleLeadComponent } from './common/CRM/Transaction/compacct-royale-lead/compacct-royale-lead.component';
import { CompacctDocumentComponent } from './shared/compacct.components/compacct-document/compacct-document.component';

import { CompacctStockReportComponent } from './common/MaterialManagement/Report/compacct-stock-report/compacct-stock-report.component';

import { CompacctGlobalApiService } from "./shared/compacct.services/compacct.global.api.service";


import { K4cOutletRequistionComponent } from './common/OutletManagement/k4c-outlet-requistion/k4c-outlet-requistion.component';
import { K4cMasterCostCenterComponent } from './common/MaterialManagement/Master/k4c-master-cost-center/k4c-master-cost-center.component';
import { K4cMasterProductComponent } from './common/MaterialManagement/Master/k4c-master-product/k4c-master-product.component';
import { MasterUomComponent } from "./common/MaterialManagement/Master/master-uom/master-uom.component";
import { K4cOutletSaleBillComponent } from './common/OutletManagement/k4c-outlet-sale-bill/k4c-outlet-sale-bill.component';
import { K4CDispatchToOutletComponent } from './common/MaterialManagement/Outward/Distribution Challan/k4-c-dispatch-to-outlet/k4-c-dispatch-to-outlet.component';
import { K4cOutletAdvanceOrderComponent } from './common/OutletManagement/k4c-outlet-advance-order/k4c-outlet-advance-order.component';
import { K4cPosBillOrderComponent } from './common/OutletManagement/k4c-pos-bill-order/k4c-pos-bill-order.component';

import { K4cFactoryReturnComponent } from './common/OutletManagement/k4c-factory-return/k4c-factory-return.component';
import { K4cAdvanceProductionComponent } from "./common/MaterialManagement/Production/k4c-advance-production/k4c-advance-production.component";
import { K4CDispatchOutletAdvOrderComponent } from './common/MaterialManagement/Outward/k4-c-dispatch-outlet-adv-order/k4-c-dispatch-outlet-adv-order.component';

import { K4cCutoffComponent } from './common/MaterialManagement/Master/k4c-cutoff/k4c-cutoff.component';

import { K4cFactoryRequisitionComponent } from './common/MaterialManagement/k4c-factory-requisition/k4c-factory-requisition.component';
import { K4cDepartmentWiseRequisitionComponent } from './common/MaterialManagement/k4c-department-wise-requisition/k4c-department-wise-requisition.component';
import { ReceiveDistributionChallanComponent } from './common/OutletManagement/receive-distribution-challan/receive-distribution-challan.component';


import { OutletStockTransferComponent } from './common/OutletManagement/outlet-stock-transfer/outlet-stock-transfer.component';

import { OutletStockMovementComponent } from './common/OutletManagement/outlet-stock-movement/outlet-stock-movement.component';
import { K4cProductionVoucherNewComponent } from './common/MaterialManagement/Production/k4c-production-voucher-new/k4c-production-voucher-new.component';
import { K4cInternalStockTransferNewComponent } from './common/OutletManagement/k4c-internal-stock-transfer-new/k4c-internal-stock-transfer-new.component';

import { K4cMasterBOMReciepeComponent } from './common/MaterialManagement/Production/k4c-master-bom-reciepe/k4c-master-bom-reciepe.component';
import { IssueStockAdjustmentComponent } from './common/OutletManagement/issue-stock-adjustment/issue-stock-adjustment.component';
import { ReceiveStockAdjustmentComponent } from './common/OutletManagement/receive-stock-adjustment/receive-stock-adjustment.component';
import { StoreItemIndentComponent } from './common/OutletManagement/store-item-indent/store-item-indent.component';
import { OutletTxnBankDepositComponent } from './common/OutletManagement/outlet-txn-bank-deposit/outlet-txn-bank-deposit.component';
import { K4cFactoryIndentAdvanceComponent } from './common/MaterialManagement/k4c-factory-indent-advance/k4c-factory-indent-advance.component';
import { K4cRawMaterialIssueComponent } from './common/MaterialManagement/Production/k4c-raw-material-issue/k4c-raw-material-issue.component';
import { K4cRawMaterialIndentComponent } from './common/MaterialManagement/k4c-raw-material-indent/k4c-raw-material-indent.component';
import { K4cRawMaterialStockTransferComponent } from './common/MaterialManagement/k4c-raw-material-stock-transfer/k4c-raw-material-stock-transfer.component';
import { K4cDispatchOutletStoreComponent } from './common/MaterialManagement/Outward/k4c-dispatch-outlet-store/k4c-dispatch-outlet-store.component';
import { K4cPurchasePlaningComponent } from './common/MaterialManagement/k4c-purchase-planing/k4c-purchase-planing.component';
import { K4cDayEndProcessComponent } from './common/OutletManagement/k4c-day-end-process/k4c-day-end-process.component';

import { UpdateExpiryComponent } from './common/OutletManagement/update-expiry/update-expiry.component';
import { ClosingStockWithExpiryDateComponent } from './common/OutletManagement/closing-stock-with-expiry-date/closing-stock-with-expiry-date.component';


import { OutletClosingStockWithBatchComponent } from './common/OutletManagement/outlet-closing-stock-with-batch/outlet-closing-stock-with-batch.component';
import { K4cAdvOrderInternalStockTransferComponent } from './common/MaterialManagement/k4c-adv-order-internal-stock-transfer/k4c-adv-order-internal-stock-transfer.component';


import { CompacctRunningBillComponent } from "./common/CivilManagement/compacct.running-bill/compacct.running-bill.component";
import { CompacctCivildailyJobComponent } from "./common/CivilManagement/compacct.civildaily-job/compacct.civildaily-job.component";
import { CompacctTenderComponent } from "./common/TenderManagement/compacct.tender/compacct.tender.component";

import { K4cStockAdjustmentStoreItemsComponent } from './common/MaterialManagement/Production/k4c-stock-adjustment-store-items/k4c-stock-adjustment-store-items.component';


import { K4cRsnsClosingStockComponent } from './common/MaterialManagement/k4c-rsns-closing-stock/k4c-rsns-closing-stock.component';
import { K4cFranchiseSaleBillComponent } from './common/MaterialManagement/k4c-franchise-sale-bill/k4c-franchise-sale-bill.component';
import { CompacctTxnTaskComponent } from './common/TenderManagement/compacct-txn-task/compacct-txn-task.component';

import { BillEditFromAdminComponent } from './common/MaterialManagement/bill-edit-from-admin/bill-edit-from-admin.component';
// Chips
import {ChipsModule} from 'primeng/chips';


import { OutletGroupReportComponent } from './common/OutletManagement/outlet-group-report/outlet-group-report.component';

import { K4cCrateInOuComponent } from './common/MaterialManagement/Outward/k4c-crate-in-ou/k4c-crate-in-ou.component';

import { StockTransferToStoreComponent } from './common/MaterialManagement/Outward/stock-transfer-to-store/stock-transfer-to-store.component';

import { SemiFinishedProductionVoucherComponent } from './common/MaterialManagement/Production/semi-finished-production-voucher/semi-finished-production-voucher.component';
import { K4cCreditNoteBrowseComponent } from './common/MaterialManagement/k4c-credit-note-browse/k4c-credit-note-browse.component';

import { NonSaleableClosingStockComponent } from './common/OutletManagement/non-saleable-closing-stock/non-saleable-closing-stock.component';
import { AccOpeningBalcManagementComponent } from './common/OutletManagement/acc-opening-balc-management/acc-opening-balc-management.component';
import { CompacctDocumentVaultComponent } from "./shared/compacct.components/compacct.document.vault/compacct.document.vault.component";
import {SplitButtonModule} from 'primeng/splitbutton';




import { SortService, FilterService, ColumnMenuService  } from '@syncfusion/ej2-angular-gantt';


import { JournalVoucherComponent } from "./common/FinancialManagement/Transaction/Voucher/journal-voucher/journal-voucher.component";



import { CompacctgstandcustomdutyComponent } from './shared/compacct.components/compacct.forms/compacctgstandcustomduty/compacctgstandcustomduty.component';
import { CompacctProductDetailsComponent } from './shared/compacct.components/compacct.forms/compacct-product-details/compacct-product-details.component';
import { CompacctFinancialDetailsComponent } from "./shared/compacct.components/compacct.forms/compacct.financial-details/compacct.financial-details.component";


import { CompacctProjectComponent } from './shared/compacct.components/compacct.forms/compacct-project/compacct-project.component';
import { K4cConversionOfProductComponent } from './common/MaterialManagement/Outward/k4c-conversion-of-product/k4c-conversion-of-product.component';

import { WastageComponent } from "./common/MaterialManagement/Outward/wastage/wastage.component";

import { StockReportComponent } from './shared/compacct.components/stock-report/stock-report.component'



import { K4cProductionClosingStockComponent } from './common/MaterialManagement/Production/k4c-production-closing-stock/k4c-production-closing-stock.component';










import { SubledgerReportForFranchiseComponent } from "./common/FinancialManagement/Master/subledger-report-for-franchise/subledger-report-for-franchise.component";
import { K4CStockDetailsComponent } from './common/FinancialManagement/Master/k4-c-stock-details/k4-c-stock-details.component';




import { K4cPremixInventoryComponent } from './common/MaterialManagement/Production/k4c-premix-inventory/k4c-premix-inventory.component';
import { K4cPremixStockTransferComponent } from './common/MaterialManagement/Production/k4c-premix-stock-transfer/k4c-premix-stock-transfer.component';


import { K4CBillDateUpdateComponent } from "./common/OutletManagement/k4-c-bill-date-update/k4-c-bill-date-update.component";
import { UpdateConsultancyComponent } from './shared/compacct.components/compacct.forms/update-consultancy/update-consultancy.component';




import { EInvoiceConfirmationFormComponent } from './common/OutletManagement/e-invoice-confirmation-form/e-invoice-confirmation-form.component';



import { K4cPremixItemClosingStockComponent } from './common/MaterialManagement/Production/k4c-premix-item-closing-stock/k4c-premix-item-closing-stock.component';


import { SaleBillNewComponent } from './common/FinancialManagement/Transaction/Sales/sale-bill-new/sale-bill-new.component';





import { K4cSwiggyZomatoFileUploadComponent } from './common/OutletManagement/k4c-swiggy-zomato-file-upload/k4c-swiggy-zomato-file-upload.component';



import { CreateCookieComponent } from './common/UserManagement/Createt_Desktop_Cookies/create-cookie/create-cookie.component';



import { CommonPurchaseBillGstComponent } from './common/FinancialManagement/Transaction/Purchase/common-purchase-bill-gst/common-purchase-bill-gst.component';







import { K4cAcceptRawMaterialStockTransferComponent } from './common/MaterialManagement/k4c-accept-raw-material-stock-transfer/k4c-accept-raw-material-stock-transfer.component';


import {GMapModule} from 'primeng/gmap';
import { AgmCoreModule } from '@agm/core';


import { CommonStockTransferComponent } from './common/MICL/RawMaterial/common-stock-transfer/common-stock-transfer.component';



import { AdvanceOrderAdjustmentComponent } from './common/OutletManagement/advance-order-adjustment/advance-order-adjustment.component';


import { K4cVoucherComponent } from './common/FinancialManagement/Transaction/Voucher/k4c-voucher/k4c-voucher.component';
import { K4cAllDiagnosisComponent } from './common/OutletManagement/k4c-all-diagnosis/k4c-all-diagnosis.component';


import { CrateTransferDispatchToOutletComponent } from './common/MaterialManagement/Outward/crate-transfer-dispatch-to-outlet/crate-transfer-dispatch-to-outlet.component';
import { ChangeBatchNumberComponent } from './common/MaterialManagement/Outward/change-batch-number/change-batch-number.component';
import { OutletSaleBillWithoutBatchSelectComponent } from './common/OutletManagement/outlet-sale-bill-without-batch-select/outlet-sale-bill-without-batch-select.component';
import { OutletStockTransferAutoBatchComponent } from './common/OutletManagement/outlet-stock-transfer-auto-batch/outlet-stock-transfer-auto-batch.component';


@NgModule({
  declarations: [
    AppLayoutComponent,
    LeftSidebarComponent,
    HeaderComponent,
    FooterComponent,
    RightsidebarComponent,
    StocktransferComponent,
    CompacctDaterangepickerComponent,
    MasterProductComponent,
    SafeHtmlPipe,
    CompacctPurchasebillGstComponent,
    CompacctGrnComponent,
    CompacctDebitComponent,
    CompacctCostcenterComponent,
    CompacctVendorComponent,
    CompacctCustomerComponent,
    CompacctBillQcComponent,
    CompacctBnbLeadComponent,
    CompacctBnbexportsComponent,
    CompacctBnbLeadbydateComponent,
    CompacctHearingThresholdChartComponent,
    CompacctLedgerComponent,
    CompacctRoyaleLeadComponent,
    CompacctDocumentComponent,
    CompacctStockReportComponent,
    CompacctTenderComponent,
    CompacctCivildailyJobComponent,
    CompacctRunningBillComponent,
    CompacctTxnTaskComponent,
    CompacctDocumentVaultComponent,
    CompacctgstandcustomdutyComponent,
    CompacctProductDetailsComponent,
    CompacctFinancialDetailsComponent,
    CommonStockTransferComponent,
    K4cOutletRequistionComponent,
    OutletStockTransferComponent,
    OutletStockMovementComponent,
    OutletGroupReportComponent,
    StoreItemIndentComponent,
    K4cDayEndProcessComponent,
    OutletClosingStockWithBatchComponent,
    NonSaleableClosingStockComponent,
    SubledgerReportForFranchiseComponent,
    K4cMasterCostCenterComponent,
    MasterUomComponent,
    K4cCutoffComponent,
    K4cMasterBOMReciepeComponent,
    K4cMasterProductComponent,
    K4CDispatchToOutletComponent,
    K4CDispatchOutletAdvOrderComponent,
    K4cDispatchOutletStoreComponent,
    StocktransferComponent,
    K4cProductionVoucherNewComponent,
    K4cAdvanceProductionComponent,
    IssueStockAdjustmentComponent,
    ReceiveStockAdjustmentComponent,
    UpdateExpiryComponent,
    K4cStockAdjustmentStoreItemsComponent,
    ClosingStockWithExpiryDateComponent,
    K4CStockDetailsComponent,
    K4cInternalStockTransferNewComponent,
    K4cFactoryRequisitionComponent,
    K4cDepartmentWiseRequisitionComponent,
    K4cFactoryReturnComponent,
    K4cFactoryIndentAdvanceComponent,
    K4cRawMaterialIndentComponent,
    K4cRawMaterialIssueComponent,
    K4cRawMaterialStockTransferComponent,
    StockTransferToStoreComponent,
    WastageComponent,
    K4cAcceptRawMaterialStockTransferComponent,
    K4cPurchasePlaningComponent,
    K4cCrateInOuComponent,
    K4cAdvOrderInternalStockTransferComponent,
    K4cRsnsClosingStockComponent,
    CrateTransferDispatchToOutletComponent,
    K4cProductionClosingStockComponent,
    K4cPremixItemClosingStockComponent,
    K4cPremixInventoryComponent,
    K4cPremixStockTransferComponent,
    ChangeBatchNumberComponent,
    AccOpeningBalcManagementComponent,
    K4cVoucherComponent,
    JournalVoucherComponent,
    SaleBillNewComponent,
    K4cFranchiseSaleBillComponent,
    K4cCreditNoteBrowseComponent,
    CommonPurchaseBillGstComponent,
    K4cConversionOfProductComponent,
    OutletTxnBankDepositComponent,
    BillEditFromAdminComponent,
    K4CBillDateUpdateComponent,
    UpdateConsultancyComponent,
    EInvoiceConfirmationFormComponent,
    AdvanceOrderAdjustmentComponent,
    K4cSwiggyZomatoFileUploadComponent,
    K4cAllDiagnosisComponent,
    OutletStockMovementComponent,
    SemiFinishedProductionVoucherComponent,
    K4cOutletAdvanceOrderComponent,
    K4cPosBillOrderComponent,
    ReceiveDistributionChallanComponent,
    K4cOutletSaleBillComponent,
    RoyaleTaskComponent,
    MasterCostCenterGodownComponent,
    CompacctProjectComponent,
    StockReportComponent,
    CreateCookieComponent,
    OutletSaleBillWithoutBatchSelectComponent,
    OutletStockTransferAutoBatchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    LayoutRouteModule,
    DateRangePickerModule,
    DatePickerModule,
    TimePickerModule,
    TabViewModule,
    TableModule,
    MenuModule,
    HttpClientModule,
    DropdownModule,
    MultiSelectModule,
    ToastModule,
    CheckboxModule,
    AccordionModule,
    ProgressSpinnerModule,
    DialogModule,
    ButtonModule,
    EditorModule,
    TooltipModule,
    DateTimePickerModule,
    RadioButtonModule,
    InputMaskModule,
    FileUploadModule,
    ReactiveFormsModule,
    CalendarModule,
    NgxUiLoaderModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    GridAllModule,
    FieldsetModule,
    PivotViewAllModule,
    PivotFieldListAllModule,
    ProgressBarModule,
    TreeModule,
    SelectButtonModule,
    DataViewModule,
    PanelModule,
    OverlayPanelModule,
    GanttAllModule,
    ChipsModule,
    NpDatepickerModule,
    SplitButtonModule,
    SliderModule,
    GMapModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyDSloRmchjfZhHX2u-vXo1i9uGX7Qj7AV0'
    })
  
  ],
  exports: [],
  providers: [
    CompacctGlobalUrlService,
    CookieService,
    CompacctGlobalApiService,
    CompacctCommonApi,
    CompacctHeader,
    CompacctGetDistinctService,
    CompacctAccountJournal,
    DateTimeConvertService,
    DateNepalConvertService,
    SelectionService,
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'en-IN'},
    SortService,
    FilterService,
    ColumnMenuService
  ]
})
export class LayoutModule {}
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MessageService } from "primeng/api";
import {CompacctHeader} from "../../../shared/compacct.services/common.header.service"
import { HttpClient, HttpParams } from '@angular/common/http';
import { CompacctGlobalApiService } from '../../../shared/compacct.services/compacct.global.api.service';
import { DateTimeConvertService } from '../../../shared/compacct.global/dateTime.service';
import { CompacctCommonApi } from '../../../shared/compacct.services/common.api.service';
import { Dropdown } from "primeng/components/dropdown/dropdown";
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Console } from 'console';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { collectExternalReferences } from '@angular/compiler/src/output/output_ast';
import { map, catchError } from 'rxjs/operators';
declare var $:any;
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-e-invoice-confirmation-form',
  templateUrl: './e-invoice-confirmation-form.component.html',
  styleUrls: ['./e-invoice-confirmation-form.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class EInvoiceConfirmationFormComponent implements OnInit {
  items:any = [];
  Spinner = false;
  seachSpinner = false
  tabIndexToView = 0;
  buttonname = "Save";

  initDate:any = [];
  peninvoiceSpinner = false;
  ObjPenInvoice : PenInvoice = new PenInvoice ();
  PenInvoicelist:any = [];
  FailedinvoiceSpinner = false;
  ObjFailedInvoice : FailednInvoice = new FailednInvoice ();
  FailedInvoicelist:any = [];
  ShowJSON:any;
  FailedInvDetailsModal = false;
  PenINVconfirmcheckbox = false;
  failedINVconfirmcheckbox = false;
  PenInvflag = true;
  FailedInvflag = true;
  ObjSuccessInvoice : SuccessInvoice = new SuccessInvoice ();
  SuccessInvoicelist:any = [];
  SuccessInvoicelistHeader:any = [];
  successinvoiceSpinner = false;
  ObjCancelInvoice : CancelInvoice = new CancelInvoice ();
  CancelInvoicelist:any = [];
  cancelinvoiceSpinner = false;
  invoice_no:any = undefined;

  pencrnoteSpinner = false;
  ObjPenCrNote : PenCrNote = new PenCrNote ();
  PenCrNotelist:any = [];
  failedcrnoteSpinner = false;
  ObjfailedCrNote : FailedCrNote = new FailedCrNote ();
  FailedCrNotelist:any = [];
  FailedCrDetailsModal = false;
  PenCRNoteconfirmcheckbox = false;
  FailedCRNoteconfirmcheckbox = false;
  PenCrflag = true;
  failedcrflag = true;
  ObjSuccessCrNote : SuccessCrNote = new SuccessCrNote ();
  SuccessCrNotelist:any = [];
  successcrnoteSpinner = false;
  exportSpinner = false;
  databaseName: any;
  UpdateModel:boolean = false;
  VehicleModel: boolean = false;
  UpdateFormSubmitted: boolean = false;
  EWay_Bill_Date: Date = new Date();
  minDatebilldate:Date = new Date();
  E_Invoice_EwbValidTill: Date = new Date();
  minDatevalidtill:Date = new Date();
  Transport_Doc_Date: Date = new Date();
  Objupdatepop: updatepop = new updatepop();
  Doc_no: any = undefined;
  QREWayBill_No: any = undefined;
  QREWayBill_NoGent: any = undefined;
  UpdateEwayBillModel:boolean = false;
  ObjupdateEwayBillpop: updateEwayBillpop = new updateEwayBillpop();
  UpdateEwayFormSubmitted:boolean = false;
  LR_Date = new Date();
  Consignee_Pin: any;
  Cost_Cen_PIN: any;
  Pending_Doc_No: any;
  cancelinvoiceno: any;
  peninvSpinner:boolean = false;
  failedinvSpinner:boolean = false;
  pencrSpinner:boolean = false;
  failedcrSpinner:boolean = false;
  constructor(
    private Header: CompacctHeader,
    private route : ActivatedRoute,
    private router : Router,
    private $http : HttpClient,
    private GlobalAPI: CompacctGlobalApiService,
    private DateService: DateTimeConvertService,
    public $CompacctAPI: CompacctCommonApi,
    private compacctToast: MessageService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit() {
    $(".content-header").removeClass("collapse-pos");
    $(".content").removeClass("collapse-pos");
    this.items = ["PENDING INV", "FAILED / QUEUE INV", "SUCCESS INV", "CANCEL INV", "PENDING CR NOTES", "FAILED / QUEUE CR NOTES", "SUCCESS CR NOTES"];
    this.Header.pushHeader({
      Header: "E-Invoice Confirmation",
      Link: " E-Invoice Confirmation "
    });
    this.getDatabase();
    // this.getMaterialType();
  //   setInterval(() => {
  //     this.GetFailedInvoicelist();
  //     this.GetFailedCrNotelist();
  //  }, 60000);
  }
  TabClick(e){
    //console.log(e)
    this.tabIndexToView = e.index;
    this.items = ["PENDING INV", "FAILED / QUEUE INV", "SUCCESS INV", "CANCEL INV", "PENDING CR NOTES", "FAILED / QUEUE CR NOTES", "SUCCESS CR NOTES"];
    this.buttonname = "Save";
    this.peninvSpinner = false;
    this.failedinvSpinner = false;
    this.pencrSpinner = false;
    this.failedcrSpinner = false;
    // this.productaddSubmit =[];
    // this.clearData();
  }
  onConfirm(){}
  getDatabase(){
    this.$http
        .get("/Common/Get_Database_Name",
        {responseType: 'text'})
        .subscribe((data: any) => {
          this.databaseName = data;
          console.log("databaseName===",data)
        });
  }
  // PENDING INV
  PengetDateRange(dateRangeObj) {
    if (dateRangeObj.length) {
      this.ObjPenInvoice.start_date = dateRangeObj[0];
      this.ObjPenInvoice.end_date = dateRangeObj[1];
    }
  }
  GetPenInvoicelist() {
    this.PenInvoicelist = [];
    this.peninvoiceSpinner = true;
    this.seachSpinner = true;
    this.PenInvflag = true;
    this.PenINVconfirmcheckbox = false;
    const start = this.ObjPenInvoice.start_date
    ? this.DateService.dateConvert(new Date(this.ObjPenInvoice.start_date))
    : this.DateService.dateConvert(new Date());
  const end = this.ObjPenInvoice.end_date
    ? this.DateService.dateConvert(new Date(this.ObjPenInvoice.end_date))
    : this.DateService.dateConvert(new Date());
    if(start && end){
  const tempobj = {
    From_Date : start,
    To_Date : end,
  }
  const obj = {
    "SP_String": "SP_E_Invoice_For_Confirmation_Form",
    "Report_Name_String": "Browse Pending Franchise Sale Challan And B2B Bill",
    "Json_Param_String": JSON.stringify([tempobj])
  }
   this.GlobalAPI.getData(obj).subscribe((data:any)=>{
     this.PenInvoicelist = data;
     //console.log('Invoice list=====',this.PenInvoicelist)
     this.peninvoiceSpinner = false;
     this.seachSpinner = false;
   })
   }
  }
  CheckPenInvQueuelength() {
    var invquelength = this.PenInvoicelist.filter(el=> el.confirmation_Inv === true);
    if (invquelength.length <= 50) {
      this.CheckPenInvcheckbox();
      return false;
      }
      else {
        this.Spinner = false;
        this.ngxService.stop();
        this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "error",
              summary: "Warn Message",
              detail: "Can't Create More Than Fifty Queue."
            });
      }
  }
  CheckPenInvcheckbox() {
    var invquelength = this.PenInvoicelist.filter(el=> el.confirmation_Inv === true);
    if (invquelength.length) {
      this.PenInvflag = false;
      }
      else {
        this.PenInvflag = true;
        this.PenINVconfirmcheckbox = false;
      }
  }
  SavePenInvoice() {
    // this.peninvSpinner = false;
    // this.ngxService.start();
  if(this.PenInvoicelist.length){
    this.peninvSpinner = true;
    let updateData:any = [];
    this.PenInvoicelist.forEach(el=>{
      console.log("confirmation_Inv ====",el.confirmation_Inv)
      if (el.confirmation_Inv === true) {
        const updateObj = {
          Doc_No : el.Doc_No
        }
        updateData.push(updateObj)
        // console.log("updateData",updateData);
      }

    })
    if(updateData.length){
     if(updateData.length <= 50) {
      this.ApiCreateEInvoiceDirectPending(updateData)
     }
     else{
       this.peninvSpinner = false;
       this.ngxService.stop();
       this.compacctToast.clear();
           this.compacctToast.add({
             key: "compacct-toast",
             severity: "error",
             summary: "Warn Message",
             detail: "Can't Create More Than Fifty Queue."
           });
      }
    }
    else{
      this.peninvSpinner = false;
      this.ngxService.stop();
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message",
            detail: "Something Wrong"
          });
    }

  }
  else{
    this.peninvSpinner = false;
    this.ngxService.stop();
    this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Something Wrong"
        });
  }
  }
  async ApiCreateEInvoiceDirectPending(updateData:any){
    let reportnamepeninv = "";
      if (this.databaseName === "K4C") {
        // reportnamepeninv = "https://einvoicek4c.azurewebsites.net/api/Create_E_Invoice_Queue?code=vVB-eE8wZmI8idKsxBOPzJbZw3Lbp6h83qdMjyY7bVJfAzFusGDSRg==&CON=KLD20";
        reportnamepeninv = "https://einvoicecompacct.azurewebsites.net/api/Create_E_Invoice_Direct?code=T6mHYP2wncfBP2Aaaa566LYHgUsgqEYsPkv3ZVaHgX7qAzFuoqa5wQ==&CON=KLD20";
      }
      else if (this.databaseName === "MICL") {
        // reportnamepeninv = "https://einvoicek4c.azurewebsites.net/api/Create_E_Invoice_Queue?code=vVB-eE8wZmI8idKsxBOPzJbZw3Lbp6h83qdMjyY7bVJfAzFusGDSRg==&CON=XL01";
        reportnamepeninv = "https://einvoicecompacct.azurewebsites.net/api/Create_E_Invoice_Direct?code=T6mHYP2wncfBP2Aaaa566LYHgUsgqEYsPkv3ZVaHgX7qAzFuoqa5wQ==&CON=XL01";
      }
      else if (this.databaseName === "MICL_BHP") {
        reportnamepeninv = "https://einvoicecompacct.azurewebsites.net/api/Create_E_Invoice_Direct?code=T6mHYP2wncfBP2Aaaa566LYHgUsgqEYsPkv3ZVaHgX7qAzFuoqa5wQ==&CON=XL02";
      }
      else if (this.databaseName === "Diagraph") {
        // reportnamepeninv = "https://einvoicek4c.azurewebsites.net/api/Create_E_Invoice_Queue?code=vVB-eE8wZmI8idKsxBOPzJbZw3Lbp6h83qdMjyY7bVJfAzFusGDSRg==&CON=XLD01";
        reportnamepeninv = "https://einvoicecompacct.azurewebsites.net/api/Create_E_Invoice_Direct?code=T6mHYP2wncfBP2Aaaa566LYHgUsgqEYsPkv3ZVaHgX7qAzFuoqa5wQ==&CON=XLD01";
      }
      else if (this.databaseName === "BSHPL") {
        reportnamepeninv = "https://einvoicecompacct.azurewebsites.net/api/Create_E_Invoice_Direct?code=T6mHYP2wncfBP2Aaaa566LYHgUsgqEYsPkv3ZVaHgX7qAzFuoqa5wQ==&CON=BSP";
      }
      else {
        reportnamepeninv = "";
      }
    let afterSave:any[] = []
    for(let i = 0; i < updateData.length ; i++ ) {
      console.log(updateData[i])
      await this.$http.post(reportnamepeninv,[updateData[i]]).toPromise().then(data=>{
        console.log('data',data)
        afterSave.push(data)
       }).catch(e=>{
        afterSave.push(e)
       })
    }
    if(afterSave.length == updateData.length){
      this.GetPenInvoicelist();
      this.peninvSpinner = false;
      this.ngxService.stop();
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "success",
        summary: "Invoice ",
        detail: 'Invoice created successfully'
      });
    }
    else {
      this.peninvSpinner = false;
      this.ngxService.stop();
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Error ",
        detail: 'Something wrong'
      });
    }
  }

  
  ViewInvPopup(col) {
    //console.log("col",col)
    this.ShowJSON = undefined;
    if(col.E_Invoice_Responce_JSON) {
    var data = JSON.parse(col.E_Invoice_Responce_JSON);
    console.log("msg===",data)
    this.ShowJSON = data.results.errorMessage;
    this.FailedInvDetailsModal = true;
    }
  }
  ViewInvoice(obj) {
    if (obj) {
      let printlink = "";
      if (this.databaseName === "K4C") {
        printlink = "/Report/Crystal_Files/Finance/SaleBill/Sale_Bill_GST_K4C.aspx?Doc_No=" ;
      }
      else if (this.databaseName === "MICL" || this.databaseName === "MICL_Demo" || this.databaseName === "MICL_BHP") {
        printlink = `/Report/Print/MICL/sale_bill_print.html?Doc_No=` ;
      }
      else if (this.databaseName === "BSHPL" || this.databaseName === "Diagraph") {
        printlink = "/Report/Crystal_Files/Finance/SaleBill/Sale_Bill_GST_Print.aspx?Doc_No=" ;
      }
      else {
        printlink = "";
      }
      window.open(printlink + obj, 'mywindow', 'fullscreen=yes, scrollbars=auto,width=950,height=500'
  
      );
    }
  }
  PrintSaleBillNewK4c(DocNo) {
    if(DocNo) {
      window.open("/Report/Print/K4C/k4c_sale_bill.html"+"?Doc_No=" + DocNo, 'mywindow', 'fullscreen=yes, scrollbars=auto,width=950,height=500');
    }
   }
  cancleinv(doc){
    this.cancelinvoiceno = undefined;
    if (doc) {
      this.cancelinvoiceno = doc;
    this.compacctToast.clear();
      this.compacctToast.add({
       key: "cancelinv",
       sticky: true,
       closable: false,
       severity: "warn",
       summary: "Are you sure?",
       detail: "Confirm to proceed"
      });
    }
  }
  onConfirmcancelinv(){ // from pending tab
    if(this.cancelinvoiceno){
      this.ngxService.start();
      const TempObj = {
        Bill_No : this.cancelinvoiceno
      }
      const obj = {
        "SP_String": "SP_E_Invoice",
        "Report_Name_String": "Set_E_Invoice_Cancel",
        "Json_Param_String": JSON.stringify([TempObj])
      }
      this.GlobalAPI.getData(obj).subscribe((data:any)=>{
       // console.log("del Data===", data[0].Column1)
         if (data[0].Column1 === "done"){
           this.GetPenInvoicelist();
           this.ngxService.stop();
           this.compacctToast.clear();
           this.compacctToast.add({
             key: "compacct-toast",
             severity: "success",
             summary: "Invoice ",
             detail: "Cancel Successfully"
           });
         }
         else{
          this.ngxService.stop();
          this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "error",
              summary: "Warn Message",
              detail: "Something Wrong"
            });
        }
       })
    }
    else{
      this.ngxService.stop();
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message",
            detail: "Something Wrong"
          });
    }
  }

  // FAILED INV
  FailedgetDateRange(dateRangeObj) {
    if (dateRangeObj.length) {
      this.ObjFailedInvoice.start_date = dateRangeObj[0];
      this.ObjFailedInvoice.end_date = dateRangeObj[1];
    }
  }
  GetFailedInvoicelist() {
    this.FailedInvoicelist = [];
    this.peninvoiceSpinner = true;
    this.seachSpinner = true;
    this.FailedInvflag = true;
    this.failedINVconfirmcheckbox = false;
    const start = this.ObjFailedInvoice.start_date
    ? this.DateService.dateConvert(new Date(this.ObjFailedInvoice.start_date))
    : this.DateService.dateConvert(new Date());
  const end = this.ObjFailedInvoice.end_date
    ? this.DateService.dateConvert(new Date(this.ObjFailedInvoice.end_date))
    : this.DateService.dateConvert(new Date());
    if(start && end){
  const tempobj = {
    From_Date : start,
    To_Date : end,
  }
  const obj = {
    "SP_String": "SP_E_Invoice_For_Confirmation_Form",
    "Report_Name_String": "Browse Failed Franchise Sale Challan And B2B Bill",
    "Json_Param_String": JSON.stringify([tempobj])
  }
   this.GlobalAPI.getData(obj).subscribe((data:any)=>{
     this.FailedInvoicelist = data;
     console.log('Failed Invoice list=====',this.FailedInvoicelist)
     this.peninvoiceSpinner = false;
     this.seachSpinner = false;
   })
   }
  }
  CheckFailedInvQueuelength() {
    var invquelength = this.FailedInvoicelist.filter(el=> el.confirmation_Inv === true);
    if (invquelength.length <= 50) {
      this.CheckFailedInvcheckbox();
      return false;
      }
      else {
        this.Spinner = false;
        this.ngxService.stop();
        this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "error",
              summary: "Warn Message",
              detail: "Can't Create More Than Fifty Queue."
            });
      }
  }
  CheckFailedInvcheckbox() {
    var invquelength = this.FailedInvoicelist.filter(el=> el.confirmation_Inv === true);
    if (invquelength.length) {
      this.FailedInvflag = false;
      }
      else {
        this.FailedInvflag = true;
        this.failedINVconfirmcheckbox = false;
      }
  }
  SaveFailedInvoice() {
    // this.failedinvSpinner = false;
    // this.ngxService.start();
  if(this.FailedInvoicelist.length){
    this.failedinvSpinner = true;
    let updateData:any = [];
    this.FailedInvoicelist.forEach(async el=>{
      console.log("confirmation_Inv ====",el.confirmation_Inv)
      if (el.confirmation_Inv === true) {
        const updateObj = {
          Doc_No : el.Doc_No
        }
        updateData.push(updateObj)
      //  await this.ApiCreateEInvoiceDirect(updateObj).then((data:any)=>{
      //   if(data[0].status === "success"){
      //     this.GetFailedInvoicelist();
      //     this.Spinner = false;
      //     this.ngxService.stop();
      //     this.compacctToast.clear();
      //     this.compacctToast.add({
      //       key: "compacct-toast",
      //       severity: "success",
      //       summary: "Invoice "+updateObj.Doc_No,
      //       detail: data[0].msg
      //     });
      //     }
      //  }).catch((error:any)=>{
      //   console.error(error)
      //   this.Spinner = false;
      //   this.ngxService.stop();
      //   this.compacctToast.clear();
      //   this.compacctToast.add({
      //     key: "compacct-toast",
      //     severity: "error",
      //     summary: "Warn Message",
      //     detail: "Something Wrong"
      //   });
      //  })
     
      }
      
    })
    if(updateData.length) {
     if(updateData.length <= 50) {
      this.ApiCreateEInvoiceDirect(updateData)
     }
     else{
      this.failedinvSpinner = false;
      this.ngxService.stop();
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message",
            detail: "Can't Create More Than Fifty Queue."
          });
     }
    }
    else{
      this.failedinvSpinner = false;
      this.ngxService.stop();
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message",
            detail: "Something Wrong"
          });
    }
     
  }
  else{
    this.failedinvSpinner = false;
    this.ngxService.stop();
    this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Something Wrong"
        });
  }
  }
  async ApiCreateEInvoiceDirect(updateData:any){
    let reportnamefailedinv = "";
    if (this.databaseName === "K4C") {
      // reportnamefailedinv = "https://einvoicek4c.azurewebsites.net/api/Create_E_Invoice_Queue?code=vVB-eE8wZmI8idKsxBOPzJbZw3Lbp6h83qdMjyY7bVJfAzFusGDSRg==&CON=KLD20";
      reportnamefailedinv = "https://einvoicecompacct.azurewebsites.net/api/Create_E_Invoice_Direct?code=T6mHYP2wncfBP2Aaaa566LYHgUsgqEYsPkv3ZVaHgX7qAzFuoqa5wQ==&CON=KLD20";
    }
    else if (this.databaseName === "MICL") {
      // reportnamefailedinv = "https://einvoicek4c.azurewebsites.net/api/Create_E_Invoice_Queue?code=vVB-eE8wZmI8idKsxBOPzJbZw3Lbp6h83qdMjyY7bVJfAzFusGDSRg==&CON=XL01";
      reportnamefailedinv = "https://einvoicecompacct.azurewebsites.net/api/Create_E_Invoice_Direct?code=T6mHYP2wncfBP2Aaaa566LYHgUsgqEYsPkv3ZVaHgX7qAzFuoqa5wQ==&CON=XL01";
    }
    else if (this.databaseName === "MICL_BHP") {
      reportnamefailedinv = "https://einvoicecompacct.azurewebsites.net/api/Create_E_Invoice_Direct?code=T6mHYP2wncfBP2Aaaa566LYHgUsgqEYsPkv3ZVaHgX7qAzFuoqa5wQ==&CON=XL02";
    }
    else if (this.databaseName === "Diagraph") {
      // reportnamefailedinv = "https://einvoicek4c.azurewebsites.net/api/Create_E_Invoice_Queue?code=vVB-eE8wZmI8idKsxBOPzJbZw3Lbp6h83qdMjyY7bVJfAzFusGDSRg==&CON=XLD01";
      reportnamefailedinv = "https://einvoicecompacct.azurewebsites.net/api/Create_E_Invoice_Direct?code=T6mHYP2wncfBP2Aaaa566LYHgUsgqEYsPkv3ZVaHgX7qAzFuoqa5wQ==&CON=XLD01";
    }
    else if (this.databaseName === "BSHPL") {
      // reportnamefailedinv = "https://bshplcallcenteraz.azurewebsites.net/api/Create_E_Invoice_Queue?code=yf2xGtV6etP5Hj_u-RcbC1iEH6ryfONUXbsUrFGJhRESAzFulwDVDA==";
      reportnamefailedinv = "https://einvoicecompacct.azurewebsites.net/api/Create_E_Invoice_Direct?code=T6mHYP2wncfBP2Aaaa566LYHgUsgqEYsPkv3ZVaHgX7qAzFuoqa5wQ==&CON=BSP";

    }
    else {
      reportnamefailedinv = "";
    }
    let afterSave:any[] = []
    for(let i = 0; i < updateData.length ; i++ ) {
      console.log(updateData[i])
      await this.$http.post(reportnamefailedinv,[updateData[i]]).toPromise().then(data=>{
        console.log('data',data)
        afterSave.push(data)
       }).catch(e=>{
        afterSave.push(e)
       })
    }
    if(afterSave.length == updateData.length){
      this.GetFailedInvoicelist();
      this.failedinvSpinner = false;
      this.ngxService.stop();
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "success",
        summary: "Invoice ",
        detail: 'queue created successfully'
      });
    }
    else {
      this.failedinvSpinner = false;
      this.ngxService.stop();
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Error ",
        detail: 'Something wrong'
      });
    }
   
  }
  // SUCCESS INV
  SuccessgetDateRange(dateRangeObj) {
    if (dateRangeObj.length) {
      this.ObjSuccessInvoice.start_date = dateRangeObj[0];
      this.ObjSuccessInvoice.end_date = dateRangeObj[1];
    }
  }
  GetSuccessInvoicelist() {
    this.SuccessInvoicelist = [];
    this.SuccessInvoicelistHeader = [];
    this.successinvoiceSpinner = true;
    this.seachSpinner = true;
    const start = this.ObjSuccessInvoice.start_date
    ? this.DateService.dateConvert(new Date(this.ObjSuccessInvoice.start_date))
    : this.DateService.dateConvert(new Date());
  const end = this.ObjSuccessInvoice.end_date
    ? this.DateService.dateConvert(new Date(this.ObjSuccessInvoice.end_date))
    : this.DateService.dateConvert(new Date());
    if(start && end){
  const tempobj = {
    From_Date : start,
    To_Date : end,
  }
  const obj = {
    "SP_String": "SP_E_Invoice_For_Confirmation_Form",
    "Report_Name_String": "Browse Success Franchise Sale Challan And B2B Bill",
    "Json_Param_String": JSON.stringify([tempobj])
  }
   this.GlobalAPI.getData(obj).subscribe((data:any)=>{
     this.SuccessInvoicelist = data;
     this.SuccessInvoicelistHeader = data.length ? Object.keys(data[0]): []
     //console.log('Invoice list=====',this.SuccessInvoicelist)
     this.successinvoiceSpinner = false;
     this.seachSpinner = false;
   })
   }
  }
  PrintChallan(DocNo){
    if (DocNo) {
      const objtemp = {
        "SP_String": "SP_MICL_Sale_Bill",
        "Report_Name_String": "Sale_Challan_Print"
      }
      this.GlobalAPI.getData(objtemp).subscribe((data: any) => {
        var printlink = data[0].Column1;
        window.open(printlink + "?Doc_No=" + DocNo, 'mywindow', 'fullscreen=yes, scrollbars=auto,width=950,height=500');
      })
    }
  }
  PrintEwayBill(obj) {
    if (obj) {
      // window.open("/Report/Crystal_Files/Finance/SaleBill/Print_E_Way_Bill.aspx?Doc_No="+ obj, 'mywindow', 'fullscreen=yes, scrollbars=auto,width=950,height=500');
      const url = `/Report/Print/MICL/eway_bill_print.html?Doc_No=${obj}`;
        window.open(url,"Print",  'fullscreen=yes, scrollbars=auto,width=950,height=500');
    }
    
  }
  PrintGatepass(DocNo){
    if (DocNo) {
      const objtemp = {
        "SP_String": "SP_MICL_Sale_Bill",
        "Report_Name_String": "Gate_Pass_Print"
      }
      this.GlobalAPI.getData(objtemp).subscribe((data: any) => {
        var printlink = data[0].Column1;
        window.open(printlink + "?Doc_No=" + DocNo, 'mywindow', 'fullscreen=yes, scrollbars=auto,width=950,height=500');
      })
    }
  }
  Cancel(docno){
    this.invoice_no = undefined;
    if (docno) {
      this.invoice_no = docno;
    this.compacctToast.clear();
      this.compacctToast.add({
       key: "cancel",
       sticky: true,
       closable: false,
       severity: "warn",
       summary: "Are you sure?",
       detail: "Confirm to proceed"
      });
    }
  }
  onConfirmcancel(){
    if(this.invoice_no) {
      this.ngxService.start();
      let reportnamecancel = "";
      if (this.databaseName === "K4C") {
        // reportnamecancel = "https://einvoicek4c.azurewebsites.net/api/Cancel_E_Invoice?code=AhcFHzcgtELdbNxxpT8o3zZKMpzDbiOXUJ6KdFHo-O-iAzFugpemuA==&CON=KLD20&invoice_no=";
        reportnamecancel = "https://einvoicecompacct.azurewebsites.net/api/Cancel_E_Invoice?code=RO6d24bzuLcsnBQGxQWeim3xjl_Bal8vv93JRZbaieu3AzFuJSt7mg==&CON=KLD20&invoice_no=";
      }
      else if (this.databaseName === "MICL") {
        // reportnamecancel = "https://einvoicek4c.azurewebsites.net/api/Cancel_E_Invoice?code=AhcFHzcgtELdbNxxpT8o3zZKMpzDbiOXUJ6KdFHo-O-iAzFugpemuA==&CON=XL01&invoice_no=";
        reportnamecancel = "https://einvoicecompacct.azurewebsites.net/api/Cancel_E_Invoice?code=RO6d24bzuLcsnBQGxQWeim3xjl_Bal8vv93JRZbaieu3AzFuJSt7mg==&CON=XL01&invoice_no=";
      }
      else if (this.databaseName === "MICL_BHP") {
        reportnamecancel = "https://einvoicecompacct.azurewebsites.net/api/Cancel_E_Invoice?code=RO6d24bzuLcsnBQGxQWeim3xjl_Bal8vv93JRZbaieu3AzFuJSt7mg==&CON=XL02&invoice_no=";
      }
      else if (this.databaseName === "Diagraph") {
        // reportnamecancel = "https://einvoicek4c.azurewebsites.net/api/Cancel_E_Invoice?code=AhcFHzcgtELdbNxxpT8o3zZKMpzDbiOXUJ6KdFHo-O-iAzFugpemuA==&CON=XLD01&invoice_no=";
        reportnamecancel = "https://einvoicecompacct.azurewebsites.net/api/Cancel_E_Invoice?code=RO6d24bzuLcsnBQGxQWeim3xjl_Bal8vv93JRZbaieu3AzFuJSt7mg==&CON=XLD01&invoice_no=";
      }
      else if (this.databaseName === "BSHPL") {
        reportnamecancel = "https://einvoicek4c.azurewebsites.net/api/Cancel_E_Invoice?code=AhcFHzcgtELdbNxxpT8o3zZKMpzDbiOXUJ6KdFHo-O-iAzFugpemuA==&invoice_no=";
        
      }
      else {
        reportnamecancel = "";
      }
    this.$http.get(reportnamecancel+this.invoice_no)
   .subscribe((data:any)=>{
    console.log("cancel",data)
    // this.ngxService.stop();
    if(data[0].status === "success"){
      this.invoice_no = undefined;
      this.GetCancelInvoicelist();
      this.ngxService.stop();
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "success",
        summary: "Invoice ",
        detail: "Cancel Successfully"
      });
      }
      else{
        this.ngxService.stop();
        this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "error",
              summary: "Warn Message",
              detail: "Something Wrong"
            });
      }
   })
  }
  else{
    this.ngxService.stop();
    this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Something Wrong"
        });
  }
  }
  onReject(){
    this.compacctToast.clear("c");
    this.compacctToast.clear("cancel");
    this.compacctToast.clear("cancelinv");
  }
  // CANCEL INV
  CancelgetDateRange(dateRangeObj) {
    if (dateRangeObj.length) {
      this.ObjCancelInvoice.start_date = dateRangeObj[0];
      this.ObjCancelInvoice.end_date = dateRangeObj[1];
    }
  }
  GetCancelInvoicelist() {
    this.CancelInvoicelist = [];
    this.cancelinvoiceSpinner = true;
    this.seachSpinner = true;
    const start = this.ObjCancelInvoice.start_date
    ? this.DateService.dateConvert(new Date(this.ObjCancelInvoice.start_date))
    : this.DateService.dateConvert(new Date());
  const end = this.ObjCancelInvoice.end_date
    ? this.DateService.dateConvert(new Date(this.ObjCancelInvoice.end_date))
    : this.DateService.dateConvert(new Date());
    if(start && end){
  const tempobj = {
    From_Date : start,
    To_Date : end,
  }
  const obj = {
    "SP_String": "SP_E_Invoice_For_Confirmation_Form",
    "Report_Name_String": "Browse Cancelled Franchise Sale Challan And B2B Bill",
    "Json_Param_String": JSON.stringify([tempobj])
  }
   this.GlobalAPI.getData(obj).subscribe((data:any)=>{
     this.CancelInvoicelist = data;
     //console.log('Invoice list=====',this.SuccessInvoicelist)
     this.cancelinvoiceSpinner = false;
     this.seachSpinner = false;
   })
   }
  }

  // PENDING CREDIT NOTE
  getPenDateRangeCrNote(dateRangeObj) {
    if (dateRangeObj.length) {
      this.ObjPenCrNote.start_date = dateRangeObj[0];
      this.ObjPenCrNote.end_date = dateRangeObj[1];
    }
  }
  GetPenCrNotelist() {
    this.PenCrNotelist = [];
    this.pencrnoteSpinner = true;
    this.seachSpinner = true;
    this.PenCrflag = true;
    this.PenCRNoteconfirmcheckbox = false;
    const start = this.ObjPenCrNote.start_date
    ? this.DateService.dateConvert(new Date(this.ObjPenCrNote.start_date))
    : this.DateService.dateConvert(new Date());
  const end = this.ObjPenCrNote.end_date
    ? this.DateService.dateConvert(new Date(this.ObjPenCrNote.end_date))
    : this.DateService.dateConvert(new Date());
    if(start && end){
  const tempobj = {
    From_Date : start,
    To_Date : end,
  }
  const obj = {
    "SP_String": "SP_E_Invoice_For_Confirmation_Form",
    "Report_Name_String": "Browse Pending Credit Note",
    "Json_Param_String": JSON.stringify([tempobj])
  }
   this.GlobalAPI.getData(obj).subscribe((data:any)=>{
     this.PenCrNotelist = data;
     //console.log('CrNote list=====',this.PenCrNotelist)
     this.pencrnoteSpinner = false;
     this.seachSpinner = false;
   })
   }
  }
  CheckPenNoteQueuelength() {
    var quelength = this.PenCrNotelist.filter(el=> el.confirmation_Credit_Note === true);
    if (quelength.length <= 50) {
      this.CheckPenNotecheckbox();
      return false;
      }
      else {
        this.Spinner = false;
        this.ngxService.stop();
        this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "error",
              summary: "Warn Message",
              detail: "Can't Create More Than Fifty Queue."
            });
      }
  }
  CheckPenNotecheckbox() {
    var invquelength = this.PenCrNotelist.filter(el=> el.confirmation_Credit_Note === true);
    if (invquelength.length) {
      this.PenCrflag = false;
      }
      else {
        this.PenCrflag = true;
        this.PenCRNoteconfirmcheckbox = false;
      }
  }
  SavePenCrNote() {
    // this.ngxService.start();
  if(this.PenCrNotelist.length) {
    this.pencrSpinner = true;
    let updateData:any = [];
    this.PenCrNotelist.forEach(el=>{
      console.log("confirmation_Credit_Note ====",el.confirmation_Credit_Note)
      if (el.confirmation_Credit_Note === true) {
        const updateObj = {
          Doc_No : el.Note_No
        }
        updateData.push(updateObj)
        // console.log("updateData",updateData);
      }

    })
  //}
    if(updateData.length) {
     if(updateData.length <= 50) {
      this.ApiCreateCreditNoteDirectPending(updateData)
    }
    else{
      this.pencrSpinner = false;
      this.ngxService.stop();
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message",
            detail: "Can't Create More Than Fifty Queue."
          });
    }
  }
    else {
      this.pencrSpinner = false;
      this.ngxService.stop();
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message",
            detail: "Something Wrong"
          });
    }
  }
  else{
    this.pencrSpinner = false;
    this.ngxService.stop();
    this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Something Wrong"
        });
  }
  }
  async ApiCreateCreditNoteDirectPending(updateData:any){
    let reportnamepencrnote = "";
      if (this.databaseName === "K4C") {
        reportnamepencrnote = "https://einvoicecompacct.azurewebsites.net/api/Create_E_Credit_Note_Direct?code=xV1HqvDxeCr6h_wWVT-hBlI-6pKDgoLln0F2_heaOZsgAzFuc3M5Iw==&CON=KLD20";
      }
      else if (this.databaseName === "MICL") {
        reportnamepencrnote = "https://einvoicecompacct.azurewebsites.net/api/Create_E_Credit_Note_Direct?code=xV1HqvDxeCr6h_wWVT-hBlI-6pKDgoLln0F2_heaOZsgAzFuc3M5Iw==&CON=XL01";
      }
      else if (this.databaseName === "Diagraph") {
        reportnamepencrnote = "https://einvoicecompacct.azurewebsites.net/api/Create_E_Credit_Note_Direct?code=xV1HqvDxeCr6h_wWVT-hBlI-6pKDgoLln0F2_heaOZsgAzFuc3M5Iw==&CON=XLD01";
      }
      else if (this.databaseName === "BSHPL") {
       // reportnamepencrnote = "https://bshplcallcenteraz.azurewebsites.net/api/Create_E_Credit_Note_Queue?code=Mvkyst7OU0DTxMSZAgg7HNhW2FuwUgMypd1cu36SfC1JAzFucc6OIw==";
        // reportnamepencrnote = "https://einvoicecompacct.azurewebsites.net/api/Create_E_Invoice_Direct?code=T6mHYP2wncfBP2Aaaa566LYHgUsgqEYsPkv3ZVaHgX7qAzFuoqa5wQ==&CON=BSP"
        reportnamepencrnote = "https://einvoicecompacct.azurewebsites.net/api/Create_E_Credit_Note_Direct?code=xV1HqvDxeCr6h_wWVT-hBlI-6pKDgoLln0F2_heaOZsgAzFuc3M5Iw==&CON=BSP";
     
      }
      else {
        reportnamepencrnote = "";
      }
    let afterSave:any[] = []
    for(let i = 0; i < updateData.length ; i++ ) {
      console.log(updateData[i])
      await this.$http.post(reportnamepencrnote,[updateData[i]]).toPromise().then(data=>{
        console.log('data',data)
        afterSave.push(data)
       }).catch(e=>{
        afterSave.push(e)
       })
    }
    if(afterSave.length == updateData.length){
      this.GetPenCrNotelist();
      this.pencrSpinner = false;
      this.ngxService.stop();
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "success",
        summary: "Credit Note ",
        detail: 'Credit note created successfully'
      });
    }
    else {
      this.pencrSpinner = false;
      this.ngxService.stop();
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Error ",
        detail: 'Something wrong'
      });
    }
  }

  
  ViewCrPopup(col) {
    //console.log("col",col)
    this.ShowJSON = undefined;
    if(col.E_Invoice_Responce_JSON) {
    var data = JSON.parse(col.E_Invoice_Responce_JSON);
    console.log("msg===",data)
    this.ShowJSON = data.results.errorMessage;
    this.FailedCrDetailsModal = true;
    }
  }
  ViewCrNote(col) {
    if (col) {
      window.open("/Report/Crystal_Files/Finance/SaleBill/Credit_Note_K4C.aspx?Doc_No=" + col, 'mywindow', 'fullscreen=yes, scrollbars=auto,width=950,height=500'
  
      );
    }
  }

  // FAILED CREDIT NOTE
  getFailedDateRangeCrNote(dateRangeObj) {
    if (dateRangeObj.length) {
      this.ObjfailedCrNote.start_date = dateRangeObj[0];
      this.ObjfailedCrNote.end_date = dateRangeObj[1];
    }
  }
  GetFailedCrNotelist() {
    this.FailedCrNotelist = [];
    this.failedcrnoteSpinner = true;
    this.seachSpinner = true;
    this.failedcrflag = true;
    this.FailedCRNoteconfirmcheckbox = false;
    const start = this.ObjfailedCrNote.start_date
    ? this.DateService.dateConvert(new Date(this.ObjfailedCrNote.start_date))
    : this.DateService.dateConvert(new Date());
  const end = this.ObjfailedCrNote.end_date
    ? this.DateService.dateConvert(new Date(this.ObjfailedCrNote.end_date))
    : this.DateService.dateConvert(new Date());
    if(start && end){
  const tempobj = {
    From_Date : start,
    To_Date : end,
  }
  const obj = {
    "SP_String": "SP_E_Invoice_For_Confirmation_Form",
    "Report_Name_String": "Browse Failed Credit Note",
    "Json_Param_String": JSON.stringify([tempobj])
  }
   this.GlobalAPI.getData(obj).subscribe((data:any)=>{
     this.FailedCrNotelist = data;
     //console.log('FailedCrNote list=====',this.FailedCrNotelist)
     this.failedcrnoteSpinner = false;
     this.seachSpinner = false;
   })
   }
  }
  CheckFailedNoteQueuelength() {
    var quelength = this.FailedCrNotelist.filter(el=> el.confirmation_Credit_Note === true);
    if (quelength.length <= 50) {
      this.CheckFailedNotecheckbox();
      return false;
      }
      else {
        this.Spinner = false;
        this.ngxService.stop();
        this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "error",
              summary: "Warn Message",
              detail: "Can't Create More Than Fifty Queue."
            });
      }
  }
  CheckFailedNotecheckbox() {
    var invquelength = this.FailedCrNotelist.filter(el=> el.confirmation_Credit_Note === true);
    if (invquelength.length) {
      this.failedcrflag = false;
      }
      else {
        this.failedcrflag = true;
        this.FailedCRNoteconfirmcheckbox = false;
      }
  }
  SaveFailedCrNote() {
    // this.ngxService.start();
  if(this.FailedCrNotelist.length) {
    this.failedcrSpinner = true;
    let updateData:any = [];
    this.FailedCrNotelist.forEach(el=>{
      console.log("confirmation_Credit_Note ====",el.confirmation_Credit_Note)
      if (el.confirmation_Credit_Note === true) {
        const updateObj = {
          Doc_No : el.Note_No
        }
        updateData.push(updateObj)
        console.log("updateData",updateData);
      }

    })
  //}
    if(updateData.length) {
     if(updateData.length <= 50) {
      this.ApiCreateECreditNoteDirect(updateData)
     }
    else{
      this.failedcrSpinner = false;
      this.ngxService.stop();
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message",
            detail: "Can't Create More Than Fifty Queue."
          });
    }
  }
    else {
      this.failedcrSpinner = false;
      this.ngxService.stop();
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message",
            detail: "Something Wrong"
          });
    }
  }
  else{
    this.failedcrSpinner = false;
    this.ngxService.stop();
    this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Something Wrong"
        });
  }
  }
  async ApiCreateECreditNoteDirect(updateData:any){
    let reportnamefailedcrnote = "";
      if (this.databaseName === "K4C") {
        reportnamefailedcrnote = "https://einvoicecompacct.azurewebsites.net/api/Create_E_Credit_Note_Direct?code=xV1HqvDxeCr6h_wWVT-hBlI-6pKDgoLln0F2_heaOZsgAzFuc3M5Iw==&CON=KLD20";
      }
      else if (this.databaseName === "MICL") {
        reportnamefailedcrnote = "https://einvoicecompacct.azurewebsites.net/api/Create_E_Credit_Note_Direct?code=xV1HqvDxeCr6h_wWVT-hBlI-6pKDgoLln0F2_heaOZsgAzFuc3M5Iw==&CON=XL01";
      }
      else if (this.databaseName === "Diagraph") {
        reportnamefailedcrnote = "https://einvoicecompacct.azurewebsites.net/api/Create_E_Credit_Note_Direct?code=xV1HqvDxeCr6h_wWVT-hBlI-6pKDgoLln0F2_heaOZsgAzFuc3M5Iw==&CON=XLD01";
      }
      else if (this.databaseName === "BSHPL") {
        reportnamefailedcrnote = "https://einvoicecompacct.azurewebsites.net/api/Create_E_Credit_Note_Direct?code=xV1HqvDxeCr6h_wWVT-hBlI-6pKDgoLln0F2_heaOZsgAzFuc3M5Iw==&CON=BSP";
      }
      else {
        reportnamefailedcrnote = "";
      }
    let afterSave:any[] = []
    for(let i = 0; i < updateData.length ; i++ ) {
      console.log(updateData[i])
      await this.$http.post(reportnamefailedcrnote,[updateData[i]]).toPromise().then(data=>{
        console.log('data',data)
        afterSave.push(data)
       }).catch(e=>{
        afterSave.push(e)
       })
    }
    if(afterSave.length == updateData.length){
      this.GetFailedCrNotelist();
      this.failedcrSpinner = false;
      this.ngxService.stop();
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "success",
        summary: "Credit Note ",
        detail: 'queue created successfully'
      });
    }
    else {
      this.failedcrSpinner = false;
      this.ngxService.stop();
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Error ",
        detail: 'Something wrong'
      });
    }
   
  }
  //SUCCESS CREDIT NOTE
  getSuccessDateRangeCrNote(dateRangeObj) {
    if (dateRangeObj.length) {
      this.ObjSuccessCrNote.start_date = dateRangeObj[0];
      this.ObjSuccessCrNote.end_date = dateRangeObj[1];
    }
  }
  GetsuccessCrNotelist() {
    this.SuccessCrNotelist = [];
    this.successcrnoteSpinner = true;
    this.seachSpinner = true;
    const start = this.ObjSuccessCrNote.start_date
    ? this.DateService.dateConvert(new Date(this.ObjSuccessCrNote.start_date))
    : this.DateService.dateConvert(new Date());
  const end = this.ObjSuccessCrNote.end_date
    ? this.DateService.dateConvert(new Date(this.ObjSuccessCrNote.end_date))
    : this.DateService.dateConvert(new Date());
    if(start && end){
  const tempobj = {
    From_Date : start,
    To_Date : end,
  }
  const obj = {
    "SP_String": "SP_E_Invoice_For_Confirmation_Form",
    "Report_Name_String": "Browse Success Credit Note",
    "Json_Param_String": JSON.stringify([tempobj])
  }
   this.GlobalAPI.getData(obj).subscribe((data:any)=>{
     this.SuccessCrNotelist = data;
     //console.log('CrNote list=====',this.SuccessCrNotelist)
     this.successcrnoteSpinner = false;
     this.seachSpinner = false;
   })
   }
  }

  DownloadEINV(obj) {
    if (obj) {
        window.open(obj, '_self');
      
    }
  }
  exportoexcel(Arr,fileName): void {
    this.exportSpinner = true;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(Arr);
    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    XLSX.writeFile(workbook, fileName+'.xlsx');
    this.exportSpinner = false;
  }
  getQR(QREWayBill_Noo: any) {
    this.QREWayBill_NoGent = undefined;
    if (QREWayBill_Noo.length === 12) {
      this.$http.get('https://einvoicek4c.azurewebsites.net/api/GenerateQR?code=MP3_fIETBk_459dKs_I3fN4Kz9nVklM4j4XuuHWiTyX5AzFuhkELSQ==&qrname=' + QREWayBill_Noo)
        .subscribe((data: any) => {
          this.QREWayBill_NoGent = data[0].qrLink;
     //console.log(data)
   })  
    } 
  }

  UpdateEbill(doc: any) {
    this.Doc_no = undefined;
    this.QREWayBill_No = undefined;
    if (doc.Doc_No) {
      this.Doc_no = doc.Doc_No
      const obj = {
    "SP_String": "SP_E_Invoice_For_Confirmation_Form",
    "Report_Name_String": "Get_Data_For_Update_Eway_Bill_Manually",
    "Json_Param_String": JSON.stringify([{Doc_No:this.Doc_no}])
        }
      this.GlobalAPI.getData(obj).subscribe((data:any)=>{
        this.Objupdatepop = data[0];
        this.EWay_Bill_Date = new Date(data[0].Invoice_Date);
        this.minDatebilldate = new Date(data[0].Invoice_Date);
        
        var invdate:any = new Date(data[0].Invoice_Date);
        this.E_Invoice_EwbValidTill = new Date(invdate);
        this.E_Invoice_EwbValidTill.setDate(new Date(this.E_Invoice_EwbValidTill).getDate() + 2);
        this.minDatevalidtill = new Date(data[0].Invoice_Date);

        this.Transport_Doc_Date = new Date(data[0].Transporter_Doc_Date)
        this.QREWayBill_No = data[0].E_Invoice_EwbNo
        this.getQR(this.QREWayBill_No)
        setTimeout(() => {
          this.UpdateModel = true
        }, 300);    
      })
    }
  }
  // ChangeVehicle(doc_no: any) {
  //    this.VehicleModel = true
  // }
  UpdateEbiilPOP(valid: any) {
    this.UpdateFormSubmitted = true;
    if (valid && this.Objupdatepop.E_Invoice_EwbNo.length === 12) {
      const SaveOjb = {
            Doc_No :this.Doc_no,
            Transporter_ID: this.Objupdatepop.Transporter_ID,
            Transporter: this.Objupdatepop.Transporter,
            LR_No: this.Objupdatepop.Trasporter_Doc_No,
            LR_Date:this.DateService.dateConvert(this.Transport_Doc_Date),
            Vehicle_No: this.Objupdatepop.Vehicle_No,
            Transportation_Distance: this.Objupdatepop.Transportation_Distance,
            E_Invoice_EwbNo: this.Objupdatepop.E_Invoice_EwbNo,
            E_Invoice_EwbDt: this.DateService.dateTimeConvert(this.EWay_Bill_Date),
            E_Invoice_Ewb_QR_Link: this.QREWayBill_NoGent,
            E_Invoice_EwbValidTill: this.DateService.dateTimeConvert(this.E_Invoice_EwbValidTill),
      }
       const obj = {
        "SP_String": "SP_E_Invoice_For_Confirmation_Form",
        "Report_Name_String": "Update_Eway_Bill_Manually",
        "Json_Param_String": JSON.stringify([SaveOjb])
      }
      this.GlobalAPI.postData(obj).subscribe((data: any) => {
        if (data[0].Column1) {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary:"E-way Bill",
            detail: "Succesfully Update" ,
          });
          this.Objupdatepop = new updatepop();
          this.UpdateFormSubmitted = false;
          this.QREWayBill_NoGent = undefined;
          this.Doc_no = undefined;
          this.UpdateModel = false;
          this.GetSuccessInvoicelist();
        }
      }) 
      }   
  }
  
  UpdateEwaybillPOP(doc){
    this.Consignee_Pin = undefined;
    this.Cost_Cen_PIN = undefined;
    this.Pending_Doc_No = undefined;
    if (doc.Doc_No) {
      this.Pending_Doc_No = doc.Doc_No;
      const obj = {
    "SP_String": "SP_E_Invoice_For_Confirmation_Form",
    "Report_Name_String": "Get_Data_For_Update_Eway_Bill_Manually",
    "Json_Param_String": JSON.stringify([{Doc_No:this.Pending_Doc_No}])
        }
      this.GlobalAPI.getData(obj).subscribe((data:any)=>{
        this.ObjupdateEwayBillpop = data[0];
        this.ObjupdateEwayBillpop.LR_No = data[0].Transporter_Doc;
        this.ObjupdateEwayBillpop.LR_No = data[0].Trasporter_Doc_No;
        this.LR_Date = data[0].Transporter_Doc_Date ? new Date(data[0].Transporter_Doc_Date) : new Date(data[0].Invoice_Date);
        this.Consignee_Pin = data[0].Consignee_Pin;
        this.Cost_Cen_PIN = data[0].Cost_Cen_PIN;
        setTimeout(() => {
          this.UpdateEwayBillModel = true
        }, 300);    
      })
    }
  }
  // CALCULATE DISTANCE
  CalculateDistance(){
    if (this.Consignee_Pin && this.Cost_Cen_PIN) {
      this.ngxService.start();
      // this.$http.get("https://azdistancecalc.azurewebsites.net/api/Distance?code=OTrdwwzB0Q8uzU1BIhgflRcUMM60Q1uRSS22Wx0-99QwAzFuk-uwmw==&fromPincode="+this.Cost_Cen_PIN+"&toPincode="+this.Consignee_Pin)
      this.$http.get("https://einvoicecompacct.azurewebsites.net/api/Get_Distance?code=uVJjIusLgOThNqFJk6dMRU0XRg1ft0BrxPOIlYoeSy5eAzFuZUnSGA==&fromPincode="+this.Cost_Cen_PIN+"&toPincode="+this.Consignee_Pin)
     .subscribe((data:any)=>{
      console.log("data",data)
      this.ObjupdateEwayBillpop.Transportation_Distance = Math.ceil(Number(Number(data[0].distance).toFixed(2)));
      this.ngxService.stop();
      // console.log("Transportation_Distance",this.ObjPurChaseBill.Transportation_Distance)
     })
    }
  }
  UpdateSaveEwaybillPOP(valid: any) {
    this.UpdateEwayFormSubmitted = true;
    if (valid) {
      const SaveOjb = {
        Doc_No : this.Pending_Doc_No,
        Transporter_ID: this.ObjupdateEwayBillpop.Transporter_ID,
        Transporter: this.ObjupdateEwayBillpop.Transporter,
        LR_No: this.ObjupdateEwayBillpop.LR_No,
        LR_Date:this.DateService.dateConvert(this.LR_Date),
        Vehicle_No: this.ObjupdateEwayBillpop.Vehicle_No,
        Transportation_Distance: this.ObjupdateEwayBillpop.Transportation_Distance
  }
       const obj = {
        "SP_String": "SP_E_Invoice_For_Confirmation_Form",
        "Report_Name_String": "Update_Eway_Bill_Manually",
        "Json_Param_String": JSON.stringify([SaveOjb])
      }
      this.GlobalAPI.postData(obj).subscribe((data: any) => {
        if (data[0].Column1) {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary:"E-way Bill",
            detail: "Succesfully Update" ,
          });
          this.ObjupdateEwayBillpop = new updateEwayBillpop();
          this.UpdateEwayFormSubmitted = false;
          this.Pending_Doc_No = undefined;
          this.UpdateEwayBillModel = false;
          this.GetPenInvoicelist();
        }
      }) 
      }   
  }
  keyDownHandler(event) {
    if (event.code === 'Space') {
        event.preventDefault();
    }
}
}
class PenInvoice {
  start_date : Date;
  end_date : Date;
}
class FailednInvoice {
  start_date : Date;
  end_date : Date;
}
class SuccessInvoice {
  start_date : Date;
  end_date : Date;
}
class CancelInvoice {
  start_date : Date;
  end_date : Date;
}
class PenCrNote {
  start_date : Date;
  end_date : Date;
}
class FailedCrNote {
  start_date : Date;
  end_date : Date;
}
class SuccessCrNote {
  start_date : Date;
  end_date : Date;
}
class updatepop{
  Doc_No: any;								
  E_Invoice_Ewb_QR_Link: any;	
  E_Invoice_EwbNo:any;
  Transporter_ID:any;
  Vehicle_No:any;
  Transportation_Distance: any;
  Trasporter_Doc_No: any;
  Transporter: any;
}
class updateEwayBillpop{
  Doc_No: any;								
  Transporter_ID: any;	
  Transporter:any;
  Transportation_Distance:any;
  LR_No:any;
  LR_Date:any;
  Vehicle_No:any;
}
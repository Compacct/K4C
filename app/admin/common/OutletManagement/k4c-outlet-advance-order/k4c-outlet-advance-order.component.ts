import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MessageService } from "primeng/api";
import {CompacctHeader} from "../../../shared/compacct.services/common.header.service"
import { HttpClient, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { CompacctGlobalApiService } from '../../../shared/compacct.services/compacct.global.api.service';
import { DateTimeConvertService } from '../../../shared/compacct.global/dateTime.service';
import { DatePickerComponent, DateTimePickerModule, TimePickerComponent } from "@syncfusion/ej2-angular-calendars";
import { CompacctCommonApi } from '../../../shared/compacct.services/common.api.service';
import { Dropdown } from "primeng/components/dropdown/dropdown";
import { time } from 'console';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { valHooks } from 'jquery';
import { compareElementParent } from '@syncfusion/ej2-base';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { FileUpload } from "primeng/primeng";
declare var $:any;
@Component({
  selector: 'app-k4c-outlet-advance-order',
  templateUrl: './k4c-outlet-advance-order.component.html',
  styleUrls: ['./k4c-outlet-advance-order.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.Emulated
})
export class K4cOutletAdvanceOrderComponent implements OnInit {
  items:any = [];
  Spinner = false;
  mobSpinner = false;
  tabIndexToView = 0;
  buttonname = "Save & Print Bill";
  searchObj : search = new search();
  seachSpinner = false;
  seachSpinner1 = false;
  Searchlist:any = [];
  MobileSubmitFormSubmitted = false;
  Searchbymobilelist:any = [];
  Search_By = "Delivery Date";
  dateList: any;
  myDate: Date;
  returnedID:any = [];
  selectitem:any = [];
  ObjaddbillForm : addbillForm  = new addbillForm();
  productSubmit:any = [];

  Objcustomerdetail : customerdetail = new customerdetail();
  GSTvalidFlag = false;

  ObjcashForm : cashForm  = new cashForm();
  delloclist: any;
  addbillFormSubmitted = false;
  creditlist: any;
  walletlist: any;
  Total: any;
  Round_Off: any;
  Amount_Payable: any;
  FlavourList:any = [];
  Amount: any;
  withoutdisamt:any;
  taxb4disamt:any;
  Dis_Amount: any;
  Gross_Amount: any;
  SGST_Amount: any;
  CGST_Amount: any;
  GST_Tax_Per_Amt: any;
  Totaltaxable: any;
  SavePrintFormSubmitted = false;
  delivery_Date = new Date();
  editList: any;
  Cancel_Order: any;
  //DocNO = undefined;
 // Delivey_Time = new Date();

  // FOR MAKE PAYMENT
  MakePaymentModal = false;
  Amt_Payable: any;

  ObjHomeDelivery : HomeDelivery = new HomeDelivery();
  HomeDeliverypopup = false;
  CustomerDetailsFormSubmitted = false;
  @ViewChild("Del_Date2" ,{static : false}) Del_Date2 : DatePickerComponent;
  @ViewChild("Del_time" ,{static : false}) Del_timepic : TimePickerComponent;
  @ViewChild("Product2" ,{static : false}) Product2: Dropdown;
  @ViewChild("location", { static: false}) locationInput: ElementRef;
  AdvOrderfieldlist: any;
  Finishinglist: any;
  Shapelist: any;
  Tierlist: any;
  Baselist: any;
  public QueryStringObj : any;
  CustomerDisabledFlag = false;
  Hold_Order_Flag = false;

  minTime: Date;
  maxTime: Date;
  Additional_Payment : number;
  FromCostCentId: any;
  Fromgodown_id: any;
  checkSave = true;
  // TimeValue: Date = new Date('10:00 AM');
  RefundPopup = false;
  Adv_Order_No: any;
  ObjRefundcashForm : RefundcashForm  = new RefundcashForm();
  RAmount_Payable: any;
  Cancle_Remarks : string;
  cancleFormSubmitted = false;
  Can_Remarks = false;
  BackupproductSubmit:any = [];
  ProductType = undefined;

  PDFViewFlag = false;
  PDFFlag = false;
  ProductPDFFile:any = {};
  ProductPDFLink = undefined;
  @ViewChild("fileInput", { static: false }) fileInput: FileUpload;
  PhotoUploadPopup = false;
  photoforproductList:any = [];
  adornumber = undefined;
  Uploadbutton = "Upload"
  uploadbuttondisabled = false;

  CostcentState : any;

  UpdatePayModeModal = false;
  UpdatePayModeList:any = [];
  ObjUpdatePayMode : UpdatePayMode =  new  UpdatePayMode();
  Ord_No = undefined;

  BrandList:any = [];
  Brand_ID:any;
  minDelDate: Date;

  rp_username: any;
  rp_appkey: any;
  rp_device_Id: any;
  txnidAsRefNumber: any;
  RequestId:any;
  confirmtxnflag:boolean = true;
  transactionStatus: any;
  tid: any;
  txndisabled:boolean = false;
  LedgerNameforupi: any;
  txnbuttondisabled:boolean = false;
  txndisabledupi:boolean = false;
  confirmtxnflagupi:boolean = false;
  txnbuttondisabledupi:boolean = false;
  txnidAsRefNumberupi: any;
  RequestIdupi: any;
  transactionStatusupi: any;
  tidupi: any;
  lockdate:any;

  constructor(
    private Header: CompacctHeader,
    private $http : HttpClient,
    private route : ActivatedRoute,
    private router : Router,
    private GlobalAPI: CompacctGlobalApiService,
    private DateService: DateTimeConvertService,
    public $CompacctAPI: CompacctCommonApi,
    private compacctToast: MessageService,
    private ngxService: NgxUiLoaderService
  ) {
    this.route.queryParamMap.subscribe((val:any) => {
      this.CustomerDisabledFlag = false;
      if(val.params) {
        this.QueryStringObj = val.params;
        if(this.QueryStringObj.Foot_Fall_ID) {
          this.CustomerDisabledFlag = true;
          this.tabIndexToView = 1;
          this.UpdateCustomerDetails(this.QueryStringObj);

        }
        if(this.QueryStringObj.Browse_Flag) {
          this.CustomerDisabledFlag = false;
        }
        if(this.QueryStringObj.Edit){
          this.CustomerDisabledFlag = true;
          this.Edit(this.QueryStringObj);
        }
        if(this.QueryStringObj.Edit_Adv_Order){
          this.CustomerDisabledFlag = true;
          this.EditFromBrowse(this.QueryStringObj);
        }
      }
     } );
    this.Header.pushHeader({
      Header: "Customized Order",
      Link: " Outlet -> Customized Order"
    });
  }

  ngOnInit() {
    $(".content-header").removeClass("collapse-pos");
    $(".content").removeClass("collapse-pos");
    this.items = ["BROWSE", "CREATE"];
    this.Header.pushHeader({
      Header: "Customized Order",
      Link: " Outlet -> Customized Order"
    });
     this.getorderdate();
     this.getLockDate();
     this.getcostcenid();
     this.getgodownid();
     this.getdellocation();
     this.getselectitem();
     this.getcredittoaccount();
     this.getwalletamount();
     this.getAdvOrderfield();
     this.GetBrand();
     
     //Delivery Date
   //this.DateService.dateConvert(new Date (this.delivery_Date));
   if(this.buttonname != "Update"){
   this.delivery_Date.setDate(new Date(this.delivery_Date).getDate() + 1);
   }
   this.minTime = this.setHours(new Date(), "10:00am");
   this.maxTime = this.setHours(new Date(), "06:00pm");
   //this.DateService.dateTimeConvert(new Date(this.Delivey_Time));
  }
  setHours(dt, h):any {
    const s:any = /(\d+):(\d+)(.+)/.exec(h);
    dt.setHours(s[3] === "pm" ?
      12 + parseInt(s[1], 10) :
      parseInt(s[1], 10));
    dt.setMinutes(parseInt(s[2],10));
    return dt;
  }
  UpdateCustomerDetails(data){

    this.Objcustomerdetail.Foot_Fall_ID = data.Foot_Fall_ID;
   this.Objcustomerdetail.Costomer_Mobile = data.Mobile_No;
   this.Objcustomerdetail.Customer_Name = undefined;
   this.Objcustomerdetail.Customer_DOB = undefined;
   this.Objcustomerdetail.Customer_Anni = undefined;
   this.Objcustomerdetail.Cost_Cen_ID = undefined;
   this.Objcustomerdetail.Customer_GST = undefined;
   this.Objcustomerdetail.Bill_Remarks = undefined;
   console.log(this.Objcustomerdetail.Costomer_Mobile);
   if(this.Objcustomerdetail.Costomer_Mobile) {
     const obj = {
       "SP_String": "SP_Controller_Master",
       "Report_Name_String": "GET_OUTLET_CUSTOMER_DETAILS",
       "Json_Param_String" : JSON.stringify([{'Costomer_Mobile' : this.Objcustomerdetail.Costomer_Mobile}])
     }
     this.GlobalAPI
         .getData(obj)
         .subscribe((data: any) => {
          console.log(data);
          const ReturnObj = data.length ? data[0] : {};
          if(ReturnObj.Foot_Fall_ID) {
           this.Objcustomerdetail.Foot_Fall_ID = ReturnObj.Foot_Fall_ID;
           this.Objcustomerdetail.Customer_Name = ReturnObj.Contact_Name;
           this.Objcustomerdetail.Cost_Cen_ID = ReturnObj.Cost_Cen_ID;
           this.Objcustomerdetail.Customer_DOB = ReturnObj.DOB ? this.DateService.dateConvert(ReturnObj.DOB) : undefined;
           this.Objcustomerdetail.Customer_Anni = ReturnObj.DOA ? this.DateService.dateConvert(ReturnObj.DOA) : undefined;
          //  this.Objcustomerdetail.Customer_DOB = ReturnObj.DOB;
          //  this.Objcustomerdetail.Customer_Anni = ReturnObj.DOA;
           this.Objcustomerdetail.Bill_Remarks = ReturnObj.Remarks;
           this.Objcustomerdetail.Customer_GST = ReturnObj.GST_No;
           this.Del_Date2.focusIn();
           this.Del_Date2.show();
          } else {
           this.Objcustomerdetail.Foot_Fall_ID = 0;
          }
     });
   }
 }
  TabClick(e){
    //console.log(e)
    this.tabIndexToView = e.index;
    this.items = ["BROWSE", "CREATE"];
    this.buttonname = "Save & Print Bill";
    this.productSubmit =[];
    this.clearData();
    this.clearlistamount();
    this.cleartotalamount();
    //this.searchObj.Outlet = this.returnedID.length === 1 ? this.returnedID[0].Cost_Cen_ID : undefined;
  }
  checkGSTvalid(g){
    this.GSTvalidFlag = false;
    if(g) {
      let regTest = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/.test(g)
      if(regTest){
        let a = 65,b = 55, c =36;
        let p;
        return Array['from'](g).reduce((i:any,j:any,k:any,g:any)=>{
           p =(p=(j.charCodeAt(0)<a?parseInt(j):j.charCodeAt(0)-b)*(k%2+1))>c?1+(p-c):p;
           return k<14?i+p:j==((c=(c-(i%c)))<10?c:String.fromCharCode(c+b));
        },0);
      }
      this.GSTvalidFlag = !regTest;
    }

  }
  getDateRange(dateRangeObj) {
    if (dateRangeObj.length) {
      this.searchObj.start_date = dateRangeObj[0];
      this.searchObj.end_date = dateRangeObj[1];
    }
  }

  Showdata(){
    this.seachSpinner = true;
    this.Searchlist = [];
    //console.log("Search_By",this.Search_By)
    const start = this.searchObj.start_date
      ? this.DateService.dateConvert(new Date(this.searchObj.start_date))
      : this.DateService.dateConvert(new Date());
    const end = this.searchObj.end_date
      ? this.DateService.dateConvert(new Date(this.searchObj.end_date))
      : this.DateService.dateConvert(new Date());
    const tempobj = {
      From_Date : start,
      To_Date : end,
      User_Id : this.$CompacctAPI.CompacctCookies.User_ID,
      Menu_Ref_Id : this.$CompacctAPI.CompacctCookies.Menu_Ref_ID,
      //Cost_Cent_ID : this.$CompacctAPI.CompacctCookies.Cost_Cen_ID,
      Cost_Cent_ID : this.ObjaddbillForm.BrowserDeliveryto ? this.ObjaddbillForm.BrowserDeliveryto : 0,
      Search_By : this.Search_By
    }

    const obj = {
      "SP_String": "SP_Controller_Master",
      "Report_Name_String": "Browse Outlet Transaction Advance Order",
      "Json_Param_String": JSON.stringify([tempobj])
     }
     this.GlobalAPI.getData(obj).subscribe((data:any)=>{
       this.Searchlist = data;
       //console.log('searchlist=====',this.Searchlist)
       //this.seachSpinner = false;
       this.seachSpinner = false;
     })
  }
  getTotalValue(key){
    let Amtval = 0;
    this.Searchlist.forEach((item)=>{
      Amtval += Number(item[key]);
    });

    return Amtval ? Amtval : '-';
  }

  Showdatabymobile(valid){
    this.Searchlist = [];
    this.MobileSubmitFormSubmitted = true;
    this.mobSpinner = true;
    if(valid){
    const tempobj = {
      User_Id : this.$CompacctAPI.CompacctCookies.User_ID,
      Menu_Ref_Id : this.$CompacctAPI.CompacctCookies.Menu_Ref_ID,
      Costomer_Mobile : this.Objcustomerdetail.Costomer_Mobile
    }
    const obj = {
      "SP_String": "SP_Controller_Master",
      "Report_Name_String": "Browse Outlet Transaction Advance Order Using Mobile No",
      "Json_Param_String": JSON.stringify([tempobj])
     }
     this.GlobalAPI.getData(obj).subscribe((data:any)=>{
       this.Searchlist = data;
       //console.log('Searchbymobilelist=====',this.Searchlist)
       //this.seachSpinner = false;
       this.MobileSubmitFormSubmitted = false;
       this.mobSpinner = false;
     })
    }
    else {
      this.mobSpinner = false;
    }
  }

  //CANCLE BROWSE ROW
  Cancle(row){
    //console.log(this.Objcustomerdetail.Adv_Order_No)
    this.Cancle_Remarks = "";
    this.cancleFormSubmitted = false;
    this.Objcustomerdetail.Adv_Order_No = undefined ;
    if(row.Adv_Order_No){
      if(this.checkLockDate(row.Order_Date)){
      this.checkSave = true;
      this.Can_Remarks = true;
    this.Objcustomerdetail.Adv_Order_No = row.Adv_Order_No;
    this.compacctToast.clear();
    this.compacctToast.add({
      key: "c",
      sticky: true,
      severity: "warn",
      summary: "Are you sure?",
      detail: "Confirm to proceed"
      });
      }
    }
   }
   onConfirm(valid) {
    this.Can_Remarks = true;
    this.cancleFormSubmitted = true;
    const Tempobj = {
      Doc_No : this.Objcustomerdetail.Adv_Order_No,
      Order_Cancel_Remarks : this.Cancle_Remarks
    }
    if (valid) {
    const obj = {
      "SP_String": "SP_Controller_Master",
      "Report_Name_String": "Cancle Advance Order",
      "Json_Param_String": JSON.stringify([Tempobj])
    }
    this.GlobalAPI.getData(obj).subscribe((data:any)=>{
      var msg = data[0].Column1;
      //console.log(data);
      //if(data[0].Column1 === "Cancel Successfully") {
        if(data[0].Column1) {
        this.Showdata();
        this.Showdatabymobile(true);
        this.cancleFormSubmitted = false;
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "success",
          summary: "Adv_Order_No : " + this.Objcustomerdetail.Adv_Order_No,
          detail:  msg
        });

      } else{
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Error Occured "
        });
      }
    })
  }
  }

  onReject() {
    this.compacctToast.clear("c");
  }
  //onKeydownMain(event,nextElemID): void {
  // GLOBAL KEY EVENT
  onKeydownMain(event,nextElemID): void {
  if (event.key === "Enter" && nextElemID){
      if (nextElemID === 'enter'){
          console.log('Table Data last enter')
          const elem  = document.getElementById('row-Add');
          elem.click();
      } else if (nextElemID === 'Delivey_Time') {
          // this.Del_Date2.applyFocus()
          // this.Del_Date2.containerViewChild.nativeElement.click();
          console.log('Product Focus Done');
      } else {
        const elem  = document.getElementById(nextElemID);
        elem.focus();
      }
      event.preventDefault();
      }

   // focus if not null
   }
  enableButton(event) {
    if (event.key === "Enter" && this.delivery_Date) {

      this.Del_timepic.focusIn();
      this.Del_timepic.show();
    }
    event.preventDefault();
    }
  DeliveryChange(event){
    console.log(event)
    if (event.event.code === "Enter"){
      this.Del_timepic.focusIn();
      this.Del_timepic.show();
    }
  }
  DeliveryTimeChange(event){
    console.log(this.Objcustomerdetail.Del_Date_Time)
    if (event.event.code === "Enter"){
      const elem  = document.getElementById('delLocation');
          elem.click();
    }
  }

getorderdate(){
  this.minDelDate = new Date();
     const obj = {
      "SP_String": "SP_Controller_Master",
      "Report_Name_String": "Get - Outlet Order Date",
      //"Json_Param_String": JSON.stringify([{Doc_Type : "Sale_Bill"}])

    }
    this.GlobalAPI.getData(obj).subscribe((data:any)=>{
      this.dateList = data;
    //console.log("this.dateList  ===",this.dateList);
   this.myDate =  new Date(data[0].Outlet_Order_Date);
   this.minDelDate = new Date(data[0].Outlet_Order_Date);
    // on save use this
   // this.ObjRequistion.Req_Date = this.DateService.dateTimeConvert(new Date(this.myDate));

  })
}

getcostcenid(){
  const obj = {
    "SP_String": "SP_Controller_Master",
    "Report_Name_String": "Get - Cost Center Name All",
    "Json_Param_String": JSON.stringify([{User_ID:this.$CompacctAPI.CompacctCookies.User_ID}])
    //"Json_Param_String": JSON.stringify([{User_ID : 61}])
   }
  this.GlobalAPI.getData(obj).subscribe((data:any)=>{
   this.returnedID = data;
   this.FromCostCentId = data[0].Cost_Cen_ID ? data[0].Cost_Cen_ID : 0;
   this.CostcentState = data[0].State;
   console.log('this.CostcentState',this.CostcentState)
   this.ObjaddbillForm.selectitem = this.$CompacctAPI.CompacctCookies.Cost_Cen_ID;
  //  this.ObjaddbillForm.selectitem = this.returnedID.length === 1 ? this.returnedID[0].Cost_Cen_ID : undefined;
   if(this.$CompacctAPI.CompacctCookies.User_Type == 'U'){
   this.ObjaddbillForm.BrowserDeliveryto = this.$CompacctAPI.CompacctCookies.Cost_Cen_ID;
   } else {
    this.ObjaddbillForm.BrowserDeliveryto = this.$CompacctAPI.CompacctCookies.Cost_Cen_ID;
   }
   //console.log("this.ObjaddbillForm.BroeItem",this.ObjaddbillForm.BroeItem);
   this.getselectitem();
  //console.log("this.returnedID======",this.returnedID);

  });
  // const obj = {
  //   "SP_String": "SP_Controller_Master",
  //   "Report_Name_String": "Get Sale Requisition Outlet",
  //   "Json_Param_String": JSON.stringify([{User_ID:this.$CompacctAPI.CompacctCookies.User_ID}])
  //   //"Json_Param_String": JSON.stringify([{User_ID : 61}])
  //  }
  // this.GlobalAPI.getData(obj).subscribe((data:any)=>{
  //  this.returnedID = data;
  //  this.FromCostCentId = data[0].Cost_Cen_ID ? data[0].Cost_Cen_ID : 0;
  //  //this.ObjaddbillForm.selectitem = this.$CompacctAPI.CompacctCookies.Cost_Cen_ID;
  //  this.ObjaddbillForm.selectitem = this.returnedID.length === 1 ? this.returnedID[0].Cost_Cen_ID : undefined;
  // //  if(this.$CompacctAPI.CompacctCookies.User_Type == 'U'){
  // this.ObjaddbillForm.BrowserDeliveryto = this.returnedID.length === 1 ? this.returnedID[0].Cost_Cen_ID : undefined;
  // //  }
  //  //console.log("this.ObjaddbillForm.BroeItem",this.ObjaddbillForm.BroeItem);
  //  this.getselectitem();
  //  //console.log("this.returnedID======",this.returnedID); 


  // });
}
GetcostcenterDetails(){
  this.rp_username = undefined;
  this.rp_appkey = undefined;
  this.rp_device_Id = undefined;
if(this.ObjaddbillForm.selectitem) {
  const ccdetails = this.returnedID.filter(ele=> Number(ele.Cost_Cen_ID) === Number(this.ObjaddbillForm.selectitem))
  this.rp_username = ccdetails.length ? ccdetails[0].rp_username : undefined;
  this.rp_appkey = ccdetails.length ? ccdetails[0].rp_appkey : undefined;
  this.rp_device_Id = ccdetails.length ? ccdetails[0].rp_device_Id : undefined;
}
 }
getgodownid(){
  const TempObj = {
    Cost_Cen_ID : this.$CompacctAPI.CompacctCookies.Cost_Cen_ID,
   }
  const obj = {
    "SP_String": "SP_Controller_Master",
    "Report_Name_String": "Get - Godown For Sale Bill",
    "Json_Param_String": JSON.stringify([TempObj])
   }
  this.GlobalAPI.getData(obj).subscribe((data:any)=>{
   this.Fromgodown_id = data[0].godown_id ? data[0].godown_id : 0;
   //console.log('godownid ==', data)

  });
}

getdellocation(){
  const obj = {
    "SP_String": "SP_Controller_Master",
    "Report_Name_String": "Get - Outlet Name",
   }
  this.GlobalAPI.getData(obj).subscribe((data:any)=>{
   this.delloclist = data;
   this.Objcustomerdetail.Del_Cost_Cent_ID = this.$CompacctAPI.CompacctCookies.Cost_Cen_ID ;
   //console.log("this.delloclist======",this.delloclist);


  });
}

getselectitem(){
  this.GetcostcenterDetails();
   //if(this.ObjaddbillForm.Cost_Cen_ID){
    this.Objcustomerdetail.Doc_Date = this.DateService.dateConvert(new Date(this.myDate));
    //console.log("this.ObjaddbillForm.Doc_Date ===",this.ObjaddbillForm.Doc_Date)
    const TempObj = {
      User_ID:this.$CompacctAPI.CompacctCookies.User_ID,
      Cost_Cen_ID : this.$CompacctAPI.CompacctCookies.Cost_Cen_ID,
      Doc_Type : "ORDER",
      //Doc_Date : this.Objcustomerdetail.Doc_Date,
      Product_Type_ID : 0
     }
     const obj = {
      "SP_String": "SP_Controller_Master",
      "Report_Name_String" : "Get Sale Requisition Product",
     "Json_Param_String": JSON.stringify([TempObj])

    }
    this.GlobalAPI.getData(obj).subscribe((data:any)=>{
      if(data.length) {
        data.forEach(element => {
          element['label'] = element.Product_Description,
          element['value'] = element.Product_ID
        });
        this.selectitem = data;

      } else {
        this.selectitem = [];

      }
      //console.log("this.selectitem======",this.selectitem);


    });



}

getAdvOrderfield(){
  this.FlavourList =[];
  this.Finishinglist=[];
  this.Shapelist =[];
  this.Tierlist=[];
  this.Baselist=[];

  const obj = {
    "SP_String": "SP_Controller_Master",
    "Report_Name_String": "Get - Advance Order Field",
   }
   this.GlobalAPI.getData(obj).subscribe((data:any)=>{
     this.AdvOrderfieldlist = data;
     //console.log('Adv orer field list=====',this.AdvOrderfieldlist)
     this.AdvOrderfieldlist.forEach((ele,i) => {
        const ObjFla = this.AdvOrderfieldlist.filter((elem) => elem.Field_Head === "Flavour ")[i];
        const ObjFin = this.AdvOrderfieldlist.filter((elem) => elem.Field_Head === "Finishing")[i];
        const ObjShape = this.AdvOrderfieldlist.filter((elem) => elem.Field_Head === "Shape")[i];
        const ObjTier = this.AdvOrderfieldlist.filter((elem) => elem.Field_Head === "Tier")[i];
        const ObjBase = this.AdvOrderfieldlist.filter((elem) => elem.Field_Head === "Base")[i];
        if(ObjFla){
          this.FlavourList.push(ObjFla);
         }
        if(ObjFin){
          this.Finishinglist.push(ObjFin);
         }
        if(ObjShape){
          this.Shapelist.push(ObjShape);
         }
        if(ObjTier){
          this.Tierlist.push(ObjTier);
         }
        if(ObjBase){
          this.Baselist.push(ObjBase);
         }
     });

   })
}

getcredittoaccount(){
  const obj = {
    "SP_String": "SP_Controller_Master",
    "Report_Name_String": "Get - Data for Credit to Account",
   }
   this.GlobalAPI.getData(obj).subscribe((data:any)=>{
     this.creditlist = data;
     //console.log('credit=====',this.creditlist)
   })
}

getwalletamount(){
  const obj = {
    "SP_String": "SP_Controller_Master",
    "Report_Name_String": "Get - Data for Card to Amount",
   }
   this.GlobalAPI.getData(obj).subscribe((data:any)=>{
     this.walletlist = data;
     //console.log('card=====',this.cardlist)
   })
}
// g-MAp
getAddressOnChange(e) {
  this.ObjHomeDelivery.Delivery_Near_By = undefined;
  if (e) {
    this.ObjHomeDelivery.Delivery_Near_By = e;
  }
}
ProductChange() {
  this.ObjaddbillForm.Product_Description = undefined;
  this.ObjaddbillForm.Sale_rate =  undefined;
  this.ObjaddbillForm.GST_Tax_Per =  undefined;
  this.ObjaddbillForm.Product_Type_ID = undefined;
  this.ProductType = undefined;
if(this.ObjaddbillForm.Product_ID) {
  const ctrl = this;
  const productObj = $.grep(ctrl.selectitem,function(item) {return item.Product_ID == ctrl.ObjaddbillForm.Product_ID})[0];
  //console.log(productObj);
  //this.rate = productObj.Sale_rate;
  this.ObjaddbillForm.Product_Description = productObj.Product_Description;
  //this.ObjaddbillForm.Stock_Qty = productObj.Stock_Qty;
  this.ObjaddbillForm.Sale_rate =  productObj.Sale_rate;
  this.ObjaddbillForm.GST_Tax_Per =  productObj.GST_Tax_Per;
  this.ObjaddbillForm.Product_Type_ID = productObj.Product_Type_ID;
  this.ProductType = productObj.Product_Type;
}
}
tConv24(time24) {
  let ts = time24;
  let H = +ts.substr(0, 2);
  let h:any = (H % 12) || 12;
  h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
  let ampm = H <= 12 ? "am" : "pm";
  ts = h + ts.substr(2, 3) + ampm;
  return ts;
};
// CALCULATION
add(valid) {
  this.addbillFormSubmitted = true;
  if(valid) {

  //console.log("this.ObjaddbillForm===",this.ObjaddbillForm)

//   var Amount;
//   if (!this.ObjaddbillForm.Weight_in_Pound && !this.ObjaddbillForm.Acompanish){
//     Amount = Number(this.ObjaddbillForm.Stock_Qty * this.ObjaddbillForm.Net_Price);
//   }
//  else if ( this.ObjaddbillForm.Weight_in_Pound && this.ObjaddbillForm.Acompanish) {
//    Amount = Number(this.ObjaddbillForm.Stock_Qty * this.ObjaddbillForm.Net_Price * this.ObjaddbillForm.Weight_in_Pound) + Number(this.ObjaddbillForm.Acompanish);
//  } else if (!this.ObjaddbillForm.Acompanish){
//    Amount = Number(this.ObjaddbillForm.Stock_Qty * this.ObjaddbillForm.Net_Price * this.ObjaddbillForm.Weight_in_Pound);
//  } else if (!this.ObjaddbillForm.Weight_in_Pound){
//    Amount = Number(this.ObjaddbillForm.Stock_Qty * this.ObjaddbillForm.Net_Price) + Number(this.ObjaddbillForm.Acompanish);
//  }
  var amount;
    amount = Number(Number(this.ObjaddbillForm.Stock_Qty) * Number(this.ObjaddbillForm.Sale_rate));
    var totalAmt;
    if(Number(this.ObjaddbillForm.Weight_in_Pound) != 0){
    totalAmt = Number(Number(this.ObjaddbillForm.Stock_Qty) * Number(this.ObjaddbillForm.Sale_rate) * Number(this.ObjaddbillForm.Weight_in_Pound)) + Number(this.ObjaddbillForm.Acompanish);
    } else {
    totalAmt = Number(Number(this.ObjaddbillForm.Stock_Qty) * Number(this.ObjaddbillForm.Sale_rate)) + Number(this.ObjaddbillForm.Acompanish);
    }
    var Amtbeforetax = (Number(totalAmt * 100) / (Number(this.ObjaddbillForm.GST_Tax_Per) + 100));
    var qtyweightAmt;
    if(Number(this.ObjaddbillForm.Weight_in_Pound) != 0){
      qtyweightAmt = Number(this.ObjaddbillForm.Stock_Qty) * Number(this.ObjaddbillForm.Weight_in_Pound);
    } else {
      qtyweightAmt = Number(this.ObjaddbillForm.Stock_Qty);
    }
//  console.log("amount ==", Amount)
  var rate =((Number(Number(this.ObjaddbillForm.Sale_rate) * 100)) / (Number(this.ObjaddbillForm.GST_Tax_Per) + 100)).toFixed(2);
  var Accoplish_Amt = ((Number(this.ObjaddbillForm.Acompanish * 100)) / (Number(this.ObjaddbillForm.GST_Tax_Per) + 100)).toFixed(2);
  //var Amt = Number((rate * qtyweightAmt) + Number(this.ObjaddbillForm.Acompanish));
  var Amount = Number((Number(rate) * Number(qtyweightAmt)) + Number(Accoplish_Amt));
  // var Dis_Amount = (Number(Number(totalAmt) * Number(this.ObjaddbillForm.Max_Discount) / 100)).toFixed(2);
  var Dis_Amount = (Number(Number(Amtbeforetax) * Number(this.ObjaddbillForm.Max_Discount) / 100)).toFixed(2);
  // var SGST_Per = Number(this.ObjaddbillForm.GST_Tax_Per / 2);
  // //var Gross_Amount = Number(Amount - Dis_Amount) ;
  // var SGST_Amount = Number((totalAmt - (rate * qtyweightAmt) - Accoplish_Amt) / 2) ;
  // var CGST_Per = Number(this.ObjaddbillForm.GST_Tax_Per / 2);
  // var CGST_Amount = Number((totalAmt - (rate * qtyweightAmt) - Accoplish_Amt) / 2) ;
  // var taxable = Number(this.ObjaddbillForm.Weight_in_Pound) != 0 ? Number((Number(rate) * Number(this.ObjaddbillForm.Stock_Qty) * Number(this.ObjaddbillForm.Weight_in_Pound)) + Number(Accoplish_Amt)) : Number((Number(rate) * Number(this.ObjaddbillForm.Stock_Qty)) + Number(Accoplish_Amt)) ;

  var SGST_Per;
  var SGST_Amount;
  var CGST_Per;
  var CGST_Amount;
  var GST_Tax_Per;
  var GST_Tax_Per_Amt;
  var Net_Amount;
  var IGST_Per = Number(this.ObjaddbillForm.GST_Tax_Per);
  if ( this.$CompacctAPI.CompacctCookies.Cost_Cen_ID =='89' || this.$CompacctAPI.CompacctCookies.Cost_Cen_ID =='90' ) {
    // //console.log('taxable',taxable)
    // var aftertaxable:any = Number(taxable).toFixed(2);
    // //console.log('1staftertaxable',aftertaxable)
    // let afterdecval = Number(aftertaxable).toString().split('.')[1]
    // //console.log('afterdecval',afterdecval)
    // const oddOrEven = Number(afterdecval) % 2 === 0 ? 'even' : 'odd'
    // //console.log('oddOrEven',oddOrEven)
    // if (oddOrEven == 'odd') {
    //   aftertaxable = (Number(aftertaxable) + Number(0.01)).toFixed(2)
    //   //console.log("2ndaftertaxable",aftertaxable)
    // } else {
    //   aftertaxable = Number(aftertaxable)
    //   //console.log("3rdaftertaxable",aftertaxable)
    // }
  if (this.QueryStringObj.Sub_Ledger_State == this.CostcentState) {
     SGST_Per = Number(Number(this.ObjaddbillForm.GST_Tax_Per) / 2);
     SGST_Amount = (Number(Number(Amtbeforetax) * Number(SGST_Per)) / 100).toFixed(2);
    //  SGST_Amount = (Number((Number(totalAmt) - (Number(rate) * Number(qtyweightAmt)) - Number(Accoplish_Amt)) / 2)).toFixed(2) ;
     //SGST_Amount = (Number(Number(totalAmt) * Number(SGST_Per)) / Number(Number(this.ObjaddbillForm.GST_Tax_Per) + 100)).toFixed(2);
     CGST_Per = Number(Number(this.ObjaddbillForm.GST_Tax_Per) / 2);
     CGST_Amount = (Number(Number(Amtbeforetax) * Number(CGST_Per)) / 100).toFixed(2);
    //  CGST_Amount = (Number((Number(totalAmt) - (Number(rate) * Number(qtyweightAmt)) - Number(Accoplish_Amt)) / 2)).toFixed(2) ;
    //  CGST_Amount = (Number(Number(totalAmt) * Number(CGST_Per)) / Number(Number(this.ObjaddbillForm.GST_Tax_Per) + 100)).toFixed(2);
     GST_Tax_Per = 0;
     GST_Tax_Per_Amt = 0 ;
    //  Net_Amount = Number((Number(aftertaxable) - Number(Dis_Amount)) + Number(SGST_Amount) + Number(CGST_Amount)).toFixed(2);
     Net_Amount = Number(Number(taxable) + Number(SGST_Amount) + Number(CGST_Amount)).toFixed(2);
  } 
  else {
     SGST_Per = 0 ;
     SGST_Amount = 0 ;
     CGST_Per = 0 ;
     CGST_Amount = 0 ;
     GST_Tax_Per = Number(this.ObjaddbillForm.GST_Tax_Per);
     GST_Tax_Per_Amt = (Number(Number(Amtbeforetax) * Number(GST_Tax_Per)) / 100).toFixed(2);
    //  GST_Tax_Per_Amt = Number((Number(totalAmt) * Number(GST_Tax_Per)) / Number(Number(this.ObjaddbillForm.GST_Tax_Per) + 100)).toFixed(2);
    //  GST_Tax_Per_Amt = (Number((Number(totalAmt) - (Number(rate) * Number(qtyweightAmt)) - Number(Accoplish_Amt)))).toFixed(2) ;
    //  Net_Amount = (Number(Number(aftertaxable) - Number(Dis_Amount)) + Number(GST_Tax_Per_Amt)).toFixed(2);
     Net_Amount = Number(Number(taxable) + Number(SGST_Amount) + Number(CGST_Amount)).toFixed(2);
  
  }
  }
  else {
    SGST_Per = Number(this.ObjaddbillForm.GST_Tax_Per / 2);
    SGST_Amount = (Number(Number(Amtbeforetax) * Number(SGST_Per)) / 100).toFixed(2);
    //SGST_Amount = (Number((Number(totalAmt) - (Number(rate) * Number(qtyweightAmt)) - Number(Accoplish_Amt)) / 2)).toFixed(2) ;
    // SGST_Amount = (Number(Number(totalAmt) * Number(SGST_Per)) / Number(Number(this.ObjaddbillForm.GST_Tax_Per) + 100)).toFixed(2);
    CGST_Per = Number(this.ObjaddbillForm.GST_Tax_Per / 2);
    CGST_Amount = (Number(Number(Amtbeforetax) * Number(CGST_Per)) / 100).toFixed(2);
    // CGST_Amount = (Number((Number(totalAmt) - (Number(rate) * Number(qtyweightAmt)) - Number(Accoplish_Amt)) / 2)).toFixed(2) ;
    // CGST_Amount = (Number(Number(totalAmt) * Number(CGST_Per)) / Number(Number(this.ObjaddbillForm.GST_Tax_Per) + 100)).toFixed(2);
    GST_Tax_Per = 0;
    GST_Tax_Per_Amt = 0 ;
    var taxable = Number(Number(Amtbeforetax) - Number(Dis_Amount));//(Number(SGST_Amount) + Number(CGST_Amount)));

    // //console.log('taxable',taxable)
    // var aftertaxable:any = Number(taxable).toFixed(2);
    // //console.log('1staftertaxable',aftertaxable)
    // let afterdecval = Number(aftertaxable).toString().split('.')[1]
    // //console.log('afterdecval',afterdecval)
    // const oddOrEven = Number(afterdecval) % 2 === 0 ? 'even' : 'odd'
    // //console.log('oddOrEven',oddOrEven)
    // if (oddOrEven == 'odd') {
    //   aftertaxable = (Number(aftertaxable) + Number(0.01)).toFixed(2)
    //   //console.log("2ndaftertaxable",aftertaxable)
    // } else {
    //   aftertaxable = Number(aftertaxable)
    //   //console.log("3rdaftertaxable",aftertaxable)
    // }

    Net_Amount = Number(Number(taxable) + Number(SGST_Amount) + Number(CGST_Amount)).toFixed(2);
  }
  //this.ObjaddbillForm.Gross_Amt = Gross_Amount;
  //var GST_Tax_Per_Amt = 0;

  var flavourValue = this.FlavourList.find(flavour => flavour.Txn_ID == this.ObjaddbillForm.Flavour);// added for flavour message
  var finishingValue = this.Finishinglist.find(finishing => finishing.Txn_ID == this.ObjaddbillForm.Finishing);
  var shapeValue = this.Shapelist.find(shape => shape.Txn_ID == this.ObjaddbillForm.Shape);
  var tierValue = this.Tierlist.find(tier => tier.Txn_ID == this.ObjaddbillForm.Tier);
  var baseValue = this.Baselist.find(base => base.Txn_ID == this.ObjaddbillForm.Base);
  //new add
  var productObj = {
    Product_ID : this.ObjaddbillForm.Product_ID,
    Product_Description : this.ObjaddbillForm.Product_Description,
    Product_Type_ID : this.ObjaddbillForm.Product_Type_ID,
    product_type : this.ProductType,
    //Modifier : this.ObjaddbillForm.Modifier,
    Modifier1 : this.ObjaddbillForm.Modifier1,
    Modifier2 : this.ObjaddbillForm.Modifier2,
    Modifier3 : this.ObjaddbillForm.Modifier3,
    Modifier4 : this.ObjaddbillForm.Modifier4,
    Modifier5 : this.ObjaddbillForm.Modifier5,
    Flavour : flavourValue != undefined ? flavourValue.Field_Value : null, // added for flavour message
    Finishing : finishingValue != undefined ? finishingValue.Field_Value : null,
    Shape : shapeValue != undefined ? shapeValue.Field_Value : null,
    Tier : tierValue != undefined ? tierValue.Field_Value : null,
    Base : baseValue != undefined ? baseValue.Field_Value : null,
    Boxes : this.ObjaddbillForm.Boxes,
    Changes_on_Cake : this.ObjaddbillForm.Changes_on_Cake,
    // Weight_in_Pound : this.ObjaddbillForm.Weight_in_Pound,
    // Acompanish : this.ObjaddbillForm.Acompanish,
    Order_Taken_By : this.ObjaddbillForm.Order_Taken_By,
    Delivery_Charge : this.ObjaddbillForm.Delivery_Charge ? this.ObjaddbillForm.Delivery_Charge : 0,

    //Net_Price : Number(rate).toFixed(2),
    Net_Price : Number(this.ObjaddbillForm.Sale_rate).toFixed(2),
    Stock_Qty :  Number(this.ObjaddbillForm.Stock_Qty),
    Weight_in_Pound : this.ObjaddbillForm.Weight_in_Pound,
    // Acompanish : Number(Accoplish_Amt).toFixed(2),
    Acompanish : Number(this.ObjaddbillForm.Acompanish).toFixed(2),
    Amount :Number(totalAmt).toFixed(2),
    Amount_berore_Tax : Number(Amtbeforetax).toFixed(2),
    // Taxable : Number(taxable).toFixed(2),
    Taxable : Number(Amtbeforetax).toFixed(2),
    Max_Discount : Number(this.ObjaddbillForm.Max_Discount),
    Dis_Amount : Number(Dis_Amount).toFixed(2),
    Gross_Amount : Number(Amtbeforetax).toFixed(2),
    // Gross_Amount : Number(Number(Amount) - Number(Dis_Amount)).toFixed(2),
    SGST_Per : Number(GST_Tax_Per_Amt) ? 0 : Number(SGST_Per).toFixed(2),
    SGST_Amount : Number(SGST_Amount).toFixed(2),
    CGST_Per : Number(GST_Tax_Per_Amt) ? 0 : Number(CGST_Per).toFixed(2),
    CGST_Amount : Number(CGST_Amount).toFixed(2),
    GST_Tax_Per : Number(SGST_Amount) && Number(CGST_Amount) ? 0 : Number(GST_Tax_Per).toFixed(2),
    GST_Tax_Per_Amt : Number(GST_Tax_Per_Amt).toFixed(2),
    GST_Tax_Per_forcalcu : Number(IGST_Per).toFixed(2),
    Net_Amount : this.ObjaddbillForm.Delivery_Charge ? (Number(Net_Amount) + Number(this.ObjaddbillForm.Delivery_Charge)).toFixed(2) : Number(Net_Amount).toFixed(2)
  };
    this.productSubmit.push(productObj);
    //this.BackupproductSubmit.push(productObj);

    console.log(productObj);

//   var sameProdTypeFlag = false;
//   this.productSubmit.forEach(item => {
//     //console.log('enter select');
//     //console.log(item.Product_ID);
//     //console.log(this.ObjaddbillForm.Product_ID);
//     //console.log(item.Product_ID == this.ObjaddbillForm.Product_ID);
//     if(item.Product_ID == this.ObjaddbillForm.Product_ID && item.Modifier == this.ObjaddbillForm.Modifier1) {
//       //console.log('select item true');
//       item.Delivery_Charge = Number(item.Delivery_Charge) + Number( productObj.Delivery_Charge);
//       item.Stock_Qty = Number(item.Stock_Qty) + Number( productObj.Stock_Qty);
//       item.Weight_in_Pound = Number(item.Weight_in_Pound) + Number( productObj.Weight_in_Pound);
//       item.Max_Discount = Number(item.Max_Discount) + Number(productObj.Max_Discount);
//       item.Amount = Number(item.Amount) + Number(productObj.Amount);
//       item.Gross_Amount = Number(item.Gross_Amount) + Number(productObj.Gross_Amount);
//       item.Dis_Amount = Number(item.Dis_Amount) + Number(productObj.Dis_Amount);
//       item.SGST_Amount = (Number(item.SGST_Amount) + Number(productObj.SGST_Amount)).toFixed(2);
//       item.CGST_Amount = (Number(item.CGST_Amount) + Number(productObj.CGST_Amount)).toFixed(2);
//       item.Net_Amount = (Number(item.Net_Amount) + Number(productObj.Net_Amount)).toFixed(2);

//       sameProdTypeFlag = true;
//     }
//     // count = count + Number(item.Net_Amount);
//   });

//   if(sameProdTypeFlag == false) {
//     this.productSubmit.push(productObj);
//   } 

//  console.log("this.productSubmit",this.productSubmit); 

  const selectedCostCenter = this.ObjaddbillForm.selectitem;
  this.ObjaddbillForm = new addbillForm();
  this.ObjaddbillForm.selectitem = selectedCostCenter;
  // this.getselectitem();
  this.addbillFormSubmitted = false;
  this.CalculateTotalAmt();
  this.listofamount();
  if(this.ProductType != "PACKAGING") {
     this.CalculateDiscount();
     if (this.ObjcashForm.Coupon_Per ) { 
       this.couponperchange();
     }
  }
  this.Product2.applyFocus()
  this.Product2.containerViewChild.nativeElement.click();
  }
}

delete(index) {
  this.productSubmit.splice(index,1)
  this.CalculateTotalAmt();
  this.listofamount();
  if(this.ProductType != "PACKAGING") {
     this.CalculateDiscount();
     if (this.ObjcashForm.Coupon_Per ) { 
      this.couponperchange();
    }
  }
 }

CalculateTotalAmt() {
  this.Total = undefined;
  let count = 0;
  this.productSubmit.forEach(item => {
    count = count + Number(item.Net_Amount);
  });
  this.Total = (count).toFixed(2);
  // PAYABLE Math.round(this.Total)
  this.Round_Off = (Number(this.Total) - Math.round(this.Total)).toFixed(2)
  //this.Round_Off = (Math.round(this.Total) - Number(this.Total)).toFixed(2);
  this.Amount_Payable = Math.round(this.Total);
  //console.log(this.Round_Off)
  this.AmountChange();
}
cleartotalamount(){
  this.Total = [];
  this.Round_Off = [];
  this.Amount_Payable = [];

}

listofamount(){
  this.Amount = undefined;
  let count = 0;
  this.Dis_Amount = undefined;
  let count1 = 0;
  this.Gross_Amount = undefined;
  let count2 = 0;
  this.SGST_Amount = undefined;
  let count3 = 0;
  this.CGST_Amount = undefined;
  let count4 = 0;
  this.GST_Tax_Per_Amt = undefined;
  let count5 = 0;
  this.Totaltaxable = undefined;
  let count6 = 0;
  this.withoutdisamt = undefined;
  let count7 = 0;
  this.taxb4disamt = undefined;
  let count8 = 0;

  this.productSubmit.forEach(item => {
    count = count + Number(item.Amount);
    //count6 = count6 + Number(item.Taxable);
    if (item.product_type != "PACKAGING") {
         count7 = count7 + Number(item.Amount);
         count8 = count8 + Number(item.Amount_berore_Tax);
    }
    count1 = count1 + Number(item.Dis_Amount);
    //count2 = count2 + Number(item.Gross_Amount);
    //count2 = count2 + Number(item.Taxable - item.Dis_Amount);
    count3 = count3 + Number(item.SGST_Amount);
    count4 = count4 + Number(item.CGST_Amount);
    count5 = count5 + Number(item.GST_Tax_Per_Amt);
    count6 = count6 + Number(item.Taxable);
  });
  this.Amount = (count).toFixed(2);
  this.withoutdisamt = (count7).toFixed(2);
  this.taxb4disamt = (count8).toFixed(2);
  this.Dis_Amount = (count1).toFixed(2);
  this.Totaltaxable = (count6).toFixed(2);
  this.Gross_Amount = (count8).toFixed(2);
  //this.Gross_Amount = (count2).toFixed(2);
  // this.Gross_Amount = (Number(this.Totaltaxable) - Number(this.Dis_Amount)).toFixed(2);
  this.SGST_Amount = (count3).toFixed(2);
  this.CGST_Amount = (count4).toFixed(2);
  this.GST_Tax_Per_Amt = (count5).toFixed(2);
  //console.log(this.Gross_Amount);
}
clearlistamount(){
  this.Amount = [];
  this.withoutdisamt = [];
  this.taxb4disamt = [];
  this.Dis_Amount = [];
  this.Gross_Amount = [];
  this.SGST_Amount = [];
  this.CGST_Amount = [];
  this.GST_Tax_Per_Amt = [];
  this.Totaltaxable = [];
}

AmountChange(){
  //console.log("called");
  var coupon_per = this.ObjcashForm.Coupon_Per ? this.ObjcashForm.Coupon_Per : 0;
  var credit_amount = this.ObjcashForm.Credit_To_Amount ? this.ObjcashForm.Credit_To_Amount : 0;
  var wallet_amount = this.ObjcashForm.Wallet_Amount ? this.ObjcashForm.Wallet_Amount : 0;
  var cash_amount = this.ObjcashForm.Cash_Amount ? this.ObjcashForm.Cash_Amount : 0 ;
  var card_amount = this.ObjcashForm.Card_Amount ? this.ObjcashForm.Card_Amount : 0;
  var AdditionalPayment = this.Additional_Payment ? this.Additional_Payment : 0;
  //this.Additional_Payment = 0;
  // if(this.Additional_Payment){
    // if (this.ObjcashForm.Coupon_Per || Number(this.ObjcashForm.Coupon_Per) === 0) {
    //   this.ObjcashForm.Credit_To_Amount = Number(this.Amount_Payable * coupon_per) / 100;
    //  // this.ObjcashForm.Total_Paid = Number(this.ObjcashForm.Credit_To_Amount) + Number(wallet_amount) + Number(cash_amount) + Number(card_amount);
    //  // this.ObjcashForm.Net_Due = Number(this.ObjcashForm.Total_Paid) - Number(this.Amount_Payable) ;
    // } else {
   this.ObjcashForm.Total_Paid = Number(wallet_amount) + Number(cash_amount) + Number(card_amount) + Number(AdditionalPayment);
    //}
  // } else {
  //this.ObjcashForm.Total_Paid = Number(credit_amount) + Number(wallet_amount) + Number(cash_amount) + Number(card_amount);
  //}
  var lefttotal = Number(wallet_amount) + Number(card_amount);
  // if((Number(this.Amount_Payable) > lefttotal) && cash_amount) {
  //   const d = (Number(this.Amount_Payable) - Number(lefttotal)).toFixed(2);
  //   if(cash_amount > Number(d)) {
  //     this.ObjcashForm.Refund_Amount = (Number(cash_amount) - Number(d)).toFixed(2);
  //   }
  // }
   this.ObjcashForm.Net_Due = (Number(this.Amount_Payable) - Number(this.ObjcashForm.Total_Paid)).toFixed(2);

   if(Number(lefttotal) > Number(this.Amount_Payable)) {
    this.ngxService.stop();
    this.compacctToast.clear();
    this.compacctToast.add({
      key: "compacct-toast",
      severity: "error",
      summary: "Warn Message",
      detail: "Collected Amount is more than amount payable "
  });
  return false;
  }

}
couponperchange(){
  var credit_amount = this.ObjcashForm.Credit_To_Amount ? this.ObjcashForm.Credit_To_Amount : 0;
  var wallet_amount = this.ObjcashForm.Wallet_Amount ? this.ObjcashForm.Wallet_Amount : 0;
  var cash_amount = this.ObjcashForm.Cash_Amount ? this.ObjcashForm.Cash_Amount : 0 ;
  var card_amount = this.ObjcashForm.Card_Amount ? this.ObjcashForm.Card_Amount : 0;
  if ( this.ObjcashForm.Coupon_Per ) { 
    credit_amount = Number(this.taxb4disamt) * Number(this.ObjcashForm.Coupon_Per ) / 100;
    this.ObjcashForm.Credit_To_Amount = Number((credit_amount)).toFixed(2);
    console.log('this.ObjcashForm.Credit_To_Amount ==', this.ObjcashForm.Credit_To_Amount)
    this.ObjcashForm.Total_Paid = (Number(wallet_amount) + Number(cash_amount) + Number(card_amount)).toFixed(2);
    this.CalculateDiscount();
  } 
  else if (!this.ObjcashForm.Coupon_Per) {
    this.ObjcashForm.Credit_To_Amount = 0;
    //this.ObjcashForm.Total_Paid = null;
    this.ObjcashForm.Total_Paid = (Number(wallet_amount) + Number(cash_amount) + Number(card_amount)).toFixed(2);
    //this.ObjcashForm.Total_Paid = (Number(this.ObjcashForm.Credit_To_Amount) + Number(wallet_amount) + Number(cash_amount) + Number(card_amount)).toFixed(2);
   this.CalculateDiscount();
   }
}
CalculateDiscount(){
  if (this.ObjcashForm.Credit_To_Amount){
    console.log("discount amt",this.ObjcashForm.Credit_To_Amount)
    var damt;
    var netamount;
    let countnum = 0;
    this.productSubmit.forEach(el=>{ 
      if(el.product_type != "PACKAGING") {
      damt = Number((Number(el.Amount_berore_Tax) / Number(this.taxb4disamt)) * Number(this.ObjcashForm.Credit_To_Amount));
      el.Dis_Amount = Number(damt).toFixed(2);
      var da = Number(el.Dis_Amount);
      // var grossamt = Number(Number(el.Taxable) - Number(el.Dis_Amount));
      //var amt = (Number(el.Amount) - Number(da)).toFixed(2);
      var sgstperamt = (Number(((Number(el.Amount_berore_Tax) - Number(da)) * Number(el.SGST_Per)) / 100)).toFixed(2);
      var cgstperamt = (Number(((Number(el.Amount_berore_Tax) - Number(da)) * Number(el.CGST_Per)) / 100)).toFixed(2);
      var igstperamt = (Number(((Number(el.Amount_berore_Tax) - Number(da)) * Number(el.GST_Tax_Per)) / 100)).toFixed(2);
      // var sgstperamt = (Number(((Number(el.Taxable) - Number(da)) * Number(el.SGST_Per)) / 100)).toFixed(2);
      // var cgstperamt = (Number(((Number(el.Taxable) - Number(da)) * Number(el.CGST_Per)) / Number(100))).toFixed(2);
      //var sub = Number((el.Taxable - el.Dis_Amount)).toFixed(2);
      // netamount = Number((Number(el.Taxable) - Number(da)) + Number(sgstperamt) + Number(cgstperamt));
      // var sgstperamt = Number((Number(amt) * Number(el.SGST_Per)) / Number(Number(el.GST_Tax_Per_forcalcu) + 100)).toFixed(2);
      // var cgstperamt = Number((Number(amt) * Number(el.CGST_Per)) / Number(Number(el.GST_Tax_Per_forcalcu) + 100)).toFixed(2);
      // var igstperamt = Number((Number(amt) * Number(el.GST_Tax_Per)) / Number(Number(el.GST_Tax_Per_forcalcu) + 100)).toFixed(2);
      var totalgstamt = Number(igstperamt) ? (Number(sgstperamt) + Number(cgstperamt) + Number(igstperamt)).toFixed(2) : (Number(sgstperamt) + Number(cgstperamt)).toFixed(2);
      var taxamount = Number(Number(el.Amount_berore_Tax) - Number(da)).toFixed(2);
      netamount = Number(Number(taxamount) + Number(totalgstamt)).toFixed(2);
      //this.Dis_Amount = undefined;

      // el.Gross_Amount = Number(grossamt).toFixed(2);
      el.SGST_Amount = Number(sgstperamt).toFixed(2);
      el.CGST_Amount = Number(cgstperamt).toFixed(2);
      el.Taxable = Number(taxamount).toFixed(2);
      el.Net_Amount = el.Delivery_Charge ? (Number(netamount) + Number(el.Delivery_Charge)).toFixed(2) : Number(netamount).toFixed(2);
      }
     countnum = countnum + Number(el.Dis_Amount);
    })
    this.Dis_Amount = (countnum).toFixed(2);
    this.CalculateTotalAmt();
    this.listofamount();
    this.checkdiscountamt();
   } else {
    this.productSubmit.forEach(el=>{
      el.Dis_Amount = 0 ;
      // el.Gross_Amount = Number(Number(el.Amount_berore_Tax) - Number(el.Dis_Amount)).toFixed(2);
      el.SGST_Amount = Number((Number(el.Amount_berore_Tax) * Number(el.SGST_Per)) / 100).toFixed(2); 
      el.CGST_Amount = Number((Number(el.Amount_berore_Tax) * Number(el.CGST_Per)) / 100).toFixed(2);
      el.GST_Tax_Per_Amt = Number((Number(el.Amount_berore_Tax) * Number(el.GST_Tax_Per)) / 100).toFixed(2);
      // el.SGST_Amount = Number((Number(el.Taxable) * Number(el.SGST_Per)) / 100).toFixed(2); 
      // el.CGST_Amount = Number((Number(el.Taxable) * Number(el.CGST_Per)) / 100).toFixed(2);
      // el.SGST_Amount = Number((Number(el.Amount) * Number(el.SGST_Per)) / Number(Number(el.GST_Tax_Per_forcalcu) + 100)).toFixed(2); 
      // el.CGST_Amount = Number((Number(el.Amount) * Number(el.CGST_Per)) / Number(Number(el.GST_Tax_Per_forcalcu) + 100)).toFixed(2);
      // el.GST_Tax_Per_Amt = Number((Number(el.Amount) * Number(el.GST_Tax_Per)) / Number(Number(el.GST_Tax_Per_forcalcu) + 100)).toFixed(2);
      var totalgstamt = Number(el.GST_Tax_Per_Amt) ? (Number(el.SGST_Amount) + Number(el.CGST_Amount) + Number(el.GST_Tax_Per_Amt)).toFixed(2) : (Number(el.SGST_Amount) + Number(el.CGST_Amount)).toFixed(2);
      el.Taxable = Number(Number(el.Amount_berore_Tax) - Number(el.Dis_Amount)).toFixed(2); //- Number(totalgstamt)).toFixed(2);
      el.Net_Amount = Number(el.Delivery_Charge) ? (Number(el.Delivery_Charge) + Number(el.Taxable) + Number(totalgstamt)).toFixed(2) :
                      (Number(el.Taxable) + Number(totalgstamt)).toFixed(2);
      
      // var netamount2;
      // if (Number(el.GST_Tax_Per_Amt)) {
      //   netamount2 = (Number(el.Taxable) + Number(el.GST_Tax_Per_Amt)).toFixed(2);
      // }
      // else {
      //   netamount2 = (Number(el.Taxable) + Number(el.SGST_Amount) + Number(el.CGST_Amount)).toFixed(2);
      // }
      // el.Net_Amount = Number(el.Delivery_Charge) ? (Number(netamount2) + Number(el.Delivery_Charge)).toFixed(2) : (Number(netamount2)).toFixed(2);
     })
     //console.log("this.discount productSubmit",this.productSubmit);
     this.CalculateTotalAmt();
     this.listofamount();
     this.checkdiscountamt();
   }
}
// Check Discount Amount equal to total discount
checkdiscountamt(){
  this.productSubmit.forEach(el => {
  if(el.product_type != "PACKAGING") {
  if (Number(this.ObjcashForm.Credit_To_Amount) != Number(this.Dis_Amount) && Number(this.ObjcashForm.Credit_To_Amount) > Number(this.Dis_Amount)) {
    var leftval = (Number(this.ObjcashForm.Credit_To_Amount) - Number(this.Dis_Amount)).toFixed(2);
    el.Dis_Amount = (Number(el.Dis_Amount) + Number(leftval)).toFixed(2);

    var sgstamt = Number(((Number(el.Amount_berore_Tax) - Number(el.Dis_Amount)) * Number(el.SGST_Per)) / 100);
    // var sgstamt = Number((Number(el.Amount) * Number(el.SGST_Per)) / Number(Number(el.GST_Tax_Per_forcalcu) + 100)).toFixed(2); 
    el.SGST_Amount = Number(sgstamt).toFixed(2);

    var cgstamt = Number(((Number(el.Amount_berore_Tax) - Number(el.Dis_Amount)) * Number(el.CGST_Per)) / 100);
    // var cgstamt = Number((Number(el.Amount) * Number(el.CGST_Per)) / Number(Number(el.GST_Tax_Per_forcalcu) + 100)).toFixed(2);
    el.CGST_Amount = Number(cgstamt).toFixed(2);

    var igstamt = Number(((Number(el.Amount_berore_Tax) - Number(el.Dis_Amount)) * Number(el.GST_Tax_Per)) / 100);
    // var igstamt = Number((Number(el.Amount) * Number(el.GST_Tax_Per)) / Number(Number(el.GST_Tax_Per_forcalcu) + 100)).toFixed(2);
    el.GST_Tax_Per_Amt = Number(igstamt).toFixed(2);

    var togstamt = Number(el.GST_Tax_Per_Amt) ? (Number(el.SGST_Amount) + Number(el.CGST_Amount) + Number(el.GST_Tax_Per_Amt)).toFixed(2) : (Number(el.SGST_Amount) + Number(el.CGST_Amount)).toFixed(2);
    el.Taxable = Number(Number(el.Amount_berore_Tax) - Number(el.Dis_Amount)).toFixed(2);

    var netamt = Number(Number(el.Taxable) + Number(togstamt)).toFixed(2);
    el.Net_Amount = Number(el.Delivery_Charge) ? (Number(netamt) + Number(el.Delivery_Charge)).toFixed(2) : Number(netamt).toFixed(2);
    console.log('leftval',leftval)
    console.log('Dis_Amount',el.Dis_Amount)
    this.listofamount();
  }
  if (Number(this.ObjcashForm.Credit_To_Amount) != Number(this.Dis_Amount) && Number(this.ObjcashForm.Credit_To_Amount) < Number(this.Dis_Amount)) {
    var leftval = (Number(this.Dis_Amount) - Number(this.ObjcashForm.Credit_To_Amount)).toFixed(2);
    el.Dis_Amount = (Number(el.Dis_Amount) - Number(leftval)).toFixed(2);

    var sgstamt = Number(((Number(el.Amount_berore_Tax) - Number(el.Dis_Amount)) * Number(el.SGST_Per)) / 100);
    // var sgstamt = Number((Number(el.Amount) * Number(el.SGST_Per)) / Number(Number(el.GST_Tax_Per_forcalcu) + 100)).toFixed(2);
    el.SGST_Amount = Number(sgstamt).toFixed(2);;

    var cgstamt = Number(((Number(el.Amount_berore_Tax) - Number(el.Dis_Amount)) * Number(el.CGST_Per)) / 100);
    // var cgstamt = Number((Number(el.Amount) * Number(el.CGST_Per)) / Number(Number(el.GST_Tax_Per_forcalcu) + 100)).toFixed(2);
    el.CGST_Amountel.CGST_Amount = Number(cgstamt).toFixed(2);

    var igstamt = Number(((Number(el.Amount_berore_Tax) - Number(el.Dis_Amount)) * Number(el.GST_Tax_Per)) / 100);
    // var igstamt = Number((Number(el.Amount) * Number(el.GST_Tax_Per)) / Number(Number(el.GST_Tax_Per_forcalcu) + 100)).toFixed(2);
    el.GST_Tax_Per_Amt = Number(igstamt).toFixed(2);

    var togstamt = Number(el.GST_Tax_Per_Amt) ? (Number(el.SGST_Amount) + Number(el.CGST_Amount) + Number(el.GST_Tax_Per_Amt)).toFixed(2) : (Number(el.SGST_Amount) + Number(el.CGST_Amount)).toFixed(2);
    el.Taxable = Number((Number(el.Amount) - Number(el.Dis_Amount)) - Number(togstamt)).toFixed(2);

    var netamt = Number(Number(el.Taxable)  + Number(togstamt)).toFixed(2);
    el.Net_Amount = el.Delivery_Charge ? (Number(netamt) + Number(el.Delivery_Charge)).toFixed(2) : Number(netamt).toFixed(2);
    console.log('leftval',leftval)
    console.log('Dis_Amount',el.Dis_Amount)
    this.listofamount();
  }
  }
  })
}

// Check Transaction Details
// For CARD
getdataforrequestdetails(){
  this.txnidAsRefNumber = undefined;
  const objsend = {
    Txn_Type : "A",
    Txn_amount: this.ObjcashForm.Card_Amount,
    rp_payment_type: "CARD"
  }
  const obj = {
    "SP_String": "SP_rp_txn",
    "Report_Name_String": "rp_gen_request",
    "Json_Param_String": JSON.stringify([objsend])
  }
  this.GlobalAPI.getData(obj).subscribe((data:any)=>{
    console.log(data)
    if(data[0].Column1){
      this.txnidAsRefNumber = data[0].Column1;
      this.RequestPayment();
    }
    else {
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: "Something wrong."
      });
    }
    
  })
}
RequestPayment(){
  this.RequestId = undefined;
  const obj = {
    username: this.rp_username,
    appKey: this.rp_appkey,
    amount: this.ObjcashForm.Card_Amount,
    customerMobileNumber: this.Objcustomerdetail.Costomer_Mobile,
    externalRefNumber: this.txnidAsRefNumber,
    pushTo: {
        deviceId: this.rp_device_Id
    },
    mode: "CARD"
}
console.log("sendobj===",obj)
  this.$http.post('https://k4crzpayment.azurewebsites.net/api/rz_request?code=4klJypmsNXuEg925xXsUBY4jQZEn6CPR1W5vKU-GrHfUAzFufZc9kA==',obj)
        .subscribe((data: any) => {
     console.log('getdata===',data)
     this.RequestId = data.p2pRequestId
     if(this.RequestId){
     this.confirmtxnflag = this.RequestId ? false : true;
     this.txnbuttondisabled = this.RequestId ? true : false;
     const senddata = {
      Txn_ID : this.txnidAsRefNumber,
      rp_req_id : this.RequestId,
      rp_status : 'PENDING',
      tid : 'NA'
     }
     this.Updaterequestdetails(senddata);
    }
    else {
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: data.realCode
      });
    }
   })  
}
CheckTransaction(){
  this.transactionStatus = undefined;
  this.tid = undefined;
  const obj = {
    username: this.rp_username,
    appKey: this.rp_appkey,
    origP2pRequestId: this.RequestId
}
console.log("sendobj===",obj)
  this.$http.post('https://k4crzpayment.azurewebsites.net/api/get_status?code=x4u-RtD7ZkaZC1SZjgalnnrpPOesMg34WSqliOedceA1AzFuVH2DEQ==',obj)
        .subscribe((data: any) => {
     console.log('getdata===',data)
     this.transactionStatus = data.realCode;
     this.tid = data.tid;

     if(this.transactionStatus === "P2P_DEVICE_CANCELED"){
      this.txnbuttondisabled = false;
      const senddata = {
        Txn_ID : this.txnidAsRefNumber,
        rp_status : 'CANCELED', 
        rp_req_id : 'NA',
        tid : 'NA'
      }
      this.Updaterequestdetails(senddata);
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: "Transaction Cancelled."
      });
    }
    else if(this.transactionStatus === "P2P_DEVICE_TXN_DONE"){
      const senddata = {
        Txn_ID : this.txnidAsRefNumber,
        rp_status : 'DONE', 
        rp_req_id : this.RequestId,
        tid : this.tid
      }
      this.ObjcashForm.Card_Amount = data.amount;
      this.txndisabled = true;
      this.AmountChange();
      this.Updaterequestdetails(senddata);
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "success",
        summary: "Success Message",
        detail: "Transaction Successful."
      });
    }
    else if(this.transactionStatus === "P2P_DEVICE_RECEIVED"){
      this.txnbuttondisabled = true;
      const senddata = {
        Txn_ID : this.txnidAsRefNumber,
        rp_status : 'PENDING',
        rp_req_id : this.RequestId,
        tid : 'NA'
      }
      this.Updaterequestdetails(senddata);
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: "Transaction Pending."
      });
    }
    else {
      this.txnbuttondisabled = false;
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: this.transactionStatus
      });
    }
     
   })  
}
Updaterequestdetails(dataobj){
  const obj = {
    "SP_String": "SP_rp_txn",
    "Report_Name_String": "rp_update_req_return",
    "Json_Param_String": JSON.stringify([dataobj])
  }
  this.GlobalAPI.getData(obj).subscribe((data:any)=>{
    console.log(data)
  })
}
// For UPI
getledgername(){
  this.LedgerNameforupi = undefined;
  this.txndisabledupi = false;
  if(this.ObjcashForm.Wallet_Ac_ID){
  const ledgername = this.walletlist.filter(el=> Number(el.Txn_ID) === Number(this.ObjcashForm.Wallet_Ac_ID));
    this.LedgerNameforupi = ledgername.length ? ledgername[0].Ledger_Name : undefined;
  }
}
getdataforrequestdetailsupi(){
  this.txnidAsRefNumberupi = undefined;
  const objsend = {
    Txn_Type : "A",
    Txn_amount: this.ObjcashForm.Wallet_Amount,
    rp_payment_type: "UPI"
  }
  const obj = {
    "SP_String": "SP_rp_txn",
    "Report_Name_String": "rp_gen_request",
    "Json_Param_String": JSON.stringify([objsend])
  }
  this.GlobalAPI.getData(obj).subscribe((data:any)=>{
    console.log(data)
    if(data[0].Column1){
      this.txnidAsRefNumberupi = data[0].Column1;
      this.RequestPaymentupi();
    }
    else {
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: "Something wrong."
      });
    }
    
  })
}
RequestPaymentupi(){
  this.RequestIdupi = undefined;
  const obj = {
    username: this.rp_username,
    appKey: this.rp_appkey,
    amount: this.ObjcashForm.Wallet_Amount,
    customerMobileNumber: this.Objcustomerdetail.Costomer_Mobile,
    externalRefNumber: this.txnidAsRefNumberupi,
    pushTo: {
        deviceId: this.rp_device_Id
    },
    mode: "UPI"
}
console.log("sendobj===",obj)
  this.$http.post('https://k4crzpayment.azurewebsites.net/api/rz_request?code=4klJypmsNXuEg925xXsUBY4jQZEn6CPR1W5vKU-GrHfUAzFufZc9kA==',obj)
        .subscribe((data: any) => {
     console.log('getdata===',data)
     this.RequestIdupi = data.p2pRequestId
     if(this.RequestIdupi){
      this.confirmtxnflagupi = this.RequestIdupi ? false : true;
      this.txnbuttondisabledupi = this.RequestIdupi ? true : false;
     const senddata = {
      Txn_ID : this.txnidAsRefNumberupi,
      rp_req_id : this.RequestIdupi,
      rp_status : 'PENDING',
      tid : 'NA'
     }
     this.Updaterequestdetailsupi(senddata);
    }
    else {
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: data.realCode
      });
    }
   })  
}
CheckTransactionupi(){
  this.transactionStatusupi = undefined;
  this.tidupi = undefined;
  const obj = {
    username: this.rp_username,
    appKey: this.rp_appkey,
    origP2pRequestId: this.RequestIdupi
}
console.log("sendobj===",obj)
  this.$http.post('https://k4crzpayment.azurewebsites.net/api/get_status?code=x4u-RtD7ZkaZC1SZjgalnnrpPOesMg34WSqliOedceA1AzFuVH2DEQ==',obj)
        .subscribe((data: any) => {
     console.log('getdata===',data)
     this.transactionStatusupi = data.realCode;
     this.tidupi = data.tid;
     
     if(this.transactionStatusupi === "P2P_DEVICE_CANCELED"){
      this.txnbuttondisabledupi = false;
      const senddata = {
        Txn_ID : this.txnidAsRefNumberupi,
        rp_status : 'CANCELED', 
        rp_req_id : 'NA',
        tid : 'NA'
      }
      this.Updaterequestdetailsupi(senddata);
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: "Transaction Cancelled."
      });
    }
    else if(this.transactionStatusupi === "P2P_DEVICE_TXN_DONE"){
      const senddata = {
        Txn_ID : this.txnidAsRefNumberupi,
        rp_status : 'DONE', 
        rp_req_id : this.RequestIdupi,
        tid : this.tidupi
      }
      this.ObjcashForm.Wallet_Amount = data.amount;
      this.txndisabledupi = true;
      this.AmountChange();
      this.Updaterequestdetailsupi(senddata);
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "success",
        summary: "Success Message",
        detail: "Transaction Successful."
      });
    }
    else if(this.transactionStatusupi === "P2P_DEVICE_RECEIVED"){
      this.txnbuttondisabledupi = true;
      const senddata = {
        Txn_ID : this.txnidAsRefNumberupi,
        rp_status : 'PENDING',
        rp_req_id : this.RequestIdupi,
        tid : 'NA'
      }
      this.Updaterequestdetailsupi(senddata);
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: "Transaction Pending."
      });
    }
    else {
      this.txnbuttondisabledupi = false;
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: this.transactionStatusupi
      });
    }
     
   })  
}
Updaterequestdetailsupi(dataobj){
  const obj = {
    "SP_String": "SP_rp_txn",
    "Report_Name_String": "rp_update_req_return",
    "Json_Param_String": JSON.stringify([dataobj])
  }
  this.GlobalAPI.getData(obj).subscribe((data:any)=>{
    console.log(data)
  })
}
Updaterequestdetailsaftersave(billno){
  let arr:any = [];
  let senddata:any = {};
  let senddataupi:any = {};
  if((this.RequestId) && (this.transactionStatus === "P2P_DEVICE_TXN_DONE")){
   senddata = {
    Txn_ID : this.txnidAsRefNumber,
    rp_status : 'DONE', 
    rp_req_id : this.RequestId,
    tid : this.tid,
    Bill_No : billno
  }
  arr.push(senddata)
  }
  if((this.RequestIdupi) && (this.transactionStatusupi === "P2P_DEVICE_TXN_DONE")){
   senddataupi = {
    Txn_ID : this.txnidAsRefNumberupi,
    rp_status : 'DONE', 
    rp_req_id : this.RequestIdupi,
    tid : this.tidupi,
    Bill_No : billno
  }
  arr.push(senddataupi)
  }
  console.log('rp_update_bill_no==',JSON.stringify(arr))
  const obj = {
    "SP_String": "SP_rp_txn",
    "Report_Name_String": "rp_update_bill_no",
    "Json_Param_String": JSON.stringify(arr)
  }
  this.GlobalAPI.getData(obj).subscribe((data:any)=>{
    console.log(data)
  })
}

// DAY END CHECK
saveCheck(){
  if(this.checkLockDate(this.DateService.dateConvert(new Date(this.myDate)))) {
  if(this.FromCostCentId && this.Fromgodown_id){
    this.Spinner = true;
    this.ngxService.start();
   const TempObj = {
     Cost_Cen_ID : this.FromCostCentId,
     Godown_Id : this.Fromgodown_id
  }
   const obj = {
     "SP_String": "SP_Controller_Master",
     "Report_Name_String": "Check_Day_End",
     "Json_Param_String": JSON.stringify([TempObj])
   }
   this.GlobalAPI.getData(obj).subscribe((data:any)=>{
     if(data[0].Status === "Allow"){
       this.saveprintandUpdate();
     }
     else if(data[0].Status === "Disallow"){    // Disallow
      this.checkSave = false;
      this.Spinner = false;
      this.ngxService.stop();
       this.compacctToast.clear();
       this.compacctToast.add({
         key: "c",
         sticky: true,
         severity: "error",
         summary: data[0].Message,
         detail: "Confirm to proceed"
       });
       this.productSubmit = [];
       this.clearlistamount();
       this.cleartotalamount();
       this.clearData();
     }
   })
  } else {
    this.Spinner = false;
  }
  }

}
// CREATE AND UPDATE
saveprintandUpdate(){
  this.SavePrintFormSubmitted = true;
  if(this.GSTvalidFlag){
    this.Spinner = false;
    this.ngxService.stop();
    this.compacctToast.clear();
    this.compacctToast.add({
      key: "compacct-toast",
      severity: "error",
      summary: "Warn Message",
      detail: "GST No. is not valid."
    });
    return false;
  }
  if(this.ObjcashForm.Net_Due < 0){
    this.Spinner = false;
    this.ngxService.stop();
    this.compacctToast.clear();
    this.compacctToast.add({
      key: "compacct-toast",
      severity: "error",
      summary: "Warn Message",
      detail: "Error in collected amount."
    });
    return false;
  }
  if(this.buttonname != "Hold Order"){
  if((this.ObjcashForm.Wallet_Ac_ID == undefined && this.ObjcashForm.Wallet_Amount) ||
     (!this.ObjcashForm.Wallet_Amount && this.ObjcashForm.Wallet_Ac_ID )){
      this.Spinner = false;
      this.ngxService.stop();
    this.compacctToast.clear();
    this.compacctToast.add({
      key: "compacct-toast",
      severity: "error",
      summary: "Warn Message",
      detail: "Error in wallet Amount"
    });
    return false;
  }
  if((this.ObjcashForm.Credit_To_Ac_ID == undefined && this.ObjcashForm.Credit_To_Amount) ||
     (!this.ObjcashForm.Credit_To_Amount && this.ObjcashForm.Credit_To_Ac_ID )){
      this.Spinner = false;
      this.ngxService.stop();
    this.compacctToast.clear();
    this.compacctToast.add({
      key: "compacct-toast",
      severity: "error",
      summary: "Warn Message",
      detail: "Error in Credit to Account"
    });
    return false;
  }
  if(this.ObjcashForm.Coupon_Per && !this.Objcustomerdetail.Bill_Remarks){
    this.Spinner = false;
    this.ngxService.stop();
    this.compacctToast.clear();
    this.compacctToast.add({
    key: "compacct-toast",
    severity: "error",
    summary: "Warn Message",
    detail: "Enter Remarks"
  });
  return false;
  }
   if( this.ObjcashForm.Credit_To_Amount && Number(this.Dis_Amount) == 0 ){
     this.Spinner = false;
     this.ngxService.stop();
    this.compacctToast.clear();
    this.compacctToast.add({
     key: "compacct-toast",
     severity: "error",
     summary: "Warn Message",
     detail: "Discount amount is zero"
    });
   return false;
   }
   if( Number(this.Total) < 0 ){
     this.Spinner = false;
     this.ngxService.stop();
   this.compacctToast.clear();
   this.compacctToast.add({
     key: "compacct-toast",
     severity: "error",
     summary: "Warn Message",
     detail: "Net Amount is less than zero"
   });
   return false;
   }
  }
  // if(this.ObjcashForm.Total_Paid - this.ObjcashForm.Refund_Amount == this.Net_Payable){

    const obj = {
      "SP_String": "SP_Controller_Master",
      "Report_Name_String" : "Add Edit Outlet Transaction Advance Order",
      "Json_Param_String": this.getDataForSaveEdit()

    }
    this.GlobalAPI.postData(obj).subscribe((data:any)=>{
      //console.log(data);
      var tempID = data[0].Column1;
      this.Objcustomerdetail.Adv_Order_No = data[0].Column1;
      this.adornumber = data[0].Column1;
      if(data[0].Column1){
      //this.geteditlist(data[0].Column1);
      if((this.RequestId && this.transactionStatus === "P2P_DEVICE_TXN_DONE") || (this.RequestIdupi && this.transactionStatusupi === "P2P_DEVICE_TXN_DONE")) {
      this.Updaterequestdetailsaftersave(data[0].Column1);
      }
       this.getPhotoprolist(true);
        this.compacctToast.clear();
        const mgs = this.buttonname === 'Save & Print Bill' ? "Created" : "Updated";
        this.compacctToast.add({
         key: "compacct-toast",
         severity: "success",
         summary: "Advance_Order_ID  " + tempID,
         detail: "Succesfully " + mgs
       });
       //this.Spinner = false;
       //this.ngxService.stop();
      //this.PhotoUploadPopup = true;
    //  if(this.buttonname !== "Update"){
    //    this.getPhotoprolist();
    //    this.SaveNPrintBill();
    //    this.clearData();
    //    this.productSubmit =[];
    //    this.clearlistamount();
    //    this.cleartotalamount();
    //    this.router.navigate(['./POS_BIll_Order']);
    //   } else {
    //    this.SaveNPrintBill();
    //    this.clearData();
    //    this.productSubmit =[];
    //    this.clearlistamount();
    //    this.cleartotalamount();
    //    this.tabIndexToView = 0;
    //    this.router.navigate(['./K4C_Outlet_Advance_Order']);
    //    this.getcostcenid();
    //    this.Showdata();
    //    this.Showdatabymobile(true);
    //   }
      
      } else{
        this.Spinner = false;
        this.ngxService.stop();
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Error Occured "
        });
      }
      this.ObjcashForm.Wallet_Ac_ID = undefined;
      this.ObjcashForm.Credit_To_Ac_ID = undefined;
    })

  }
  getPhotoprolist(orderno){
    this.photoforproductList = [];
    //this.DocNO = Adv_Order_No;
      const Tempobj = {
        Doc_No : this.adornumber ? this.adornumber : orderno.Adv_Order_No
      }
      const obj = {
        "SP_String": "SP_Controller_Master",
        "Report_Name_String": "Get Advance Order Data For Edit",
        "Json_Param_String": JSON.stringify([Tempobj])
      }
      this.GlobalAPI.getData(obj).subscribe((data:any)=>{
       console.log(data);
       data.forEach((a,i)=>{
        data[i].PDFViewFlag = data[i].Order_Image ? true : false;
        data[i].ProductPDFLink = data[i].Order_Image ? data[i].Order_Image : undefined;
         data[i].PDFFile= {};
         data[i].uploadbuttondisabled= false;
         data[i].uploadSpinner = false;
       })
       this.photoforproductList = data;
       this.PhotoUploadPopup = true;
       this.Brand_ID = undefined;
      //  this.clearData();
      //  this.productSubmit =[];
      //  this.clearlistamount();
      //  this.cleartotalamount();
      //  this.router.navigate(['./POS_BIll_Order']);
       
})
}
  
getDataForSaveEdit(){
  if(this.ObjcashForm.Wallet_Ac_ID){
      this.walletlist.forEach(el => {
        if(Number(this.ObjcashForm.Wallet_Ac_ID) === Number(el.Txn_ID)){
          this.ObjcashForm.Wallet_Ac = el.Ledger_Name
        }
      });
  }
  if(this.ObjcashForm.Credit_To_Ac_ID){
    this.creditlist.forEach(el => {
      if(Number(this.ObjcashForm.Credit_To_Ac_ID) === Number(el.Txn_ID)){
        this.ObjcashForm.Credit_To_Ac = el.Ledger_Name
      }
    });
}
this.ObjcashForm.Wallet_Ac_ID = this.ObjcashForm.Wallet_Ac_ID ? this.ObjcashForm.Wallet_Ac_ID : 0 ;
this.ObjcashForm.Wallet_Ac = this.ObjcashForm.Wallet_Ac ? this.ObjcashForm.Wallet_Ac : "NA" ;
this.ObjcashForm.Credit_To_Ac_ID = this.ObjcashForm.Credit_To_Ac_ID ? this.ObjcashForm.Credit_To_Ac_ID : 0 ;
this.ObjcashForm.Credit_To_Ac = this.ObjcashForm.Credit_To_Ac ? this.ObjcashForm.Credit_To_Ac : "NA" ;
    this.ObjcashForm.Credit_To_Amount = this.ObjcashForm.Credit_To_Amount ? this.ObjcashForm.Credit_To_Amount : 0;
    this.ObjcashForm.Wallet_Amount = this.ObjcashForm.Wallet_Amount ? this.ObjcashForm.Wallet_Amount : 0;
    this.ObjcashForm.Cash_Amount = this.ObjcashForm.Cash_Amount ? this.ObjcashForm.Cash_Amount : 0;
    this.ObjcashForm.Card_Amount = this.ObjcashForm.Card_Amount ? this.ObjcashForm.Card_Amount : 0;

if((this.ObjHomeDelivery.Delivery_Mobile_No == undefined || this.ObjHomeDelivery.Delivery_Mobile_No == "") &&
  (this.ObjHomeDelivery.Delivery_Alt_Mobile_No == undefined || this.ObjHomeDelivery.Delivery_Alt_Mobile_No == "") &&
  (this.ObjHomeDelivery.Delivery_Name == undefined || this.ObjHomeDelivery.Delivery_Name == "") &&
  (this.ObjHomeDelivery.Delivery_Address == undefined || this.ObjHomeDelivery.Delivery_Address == "") &&
  (this.ObjHomeDelivery.Delivery_Near_By == undefined || this.ObjHomeDelivery.Delivery_Near_By == "") &&
  (this.ObjHomeDelivery.Delivery_Pin_Code == undefined || this.ObjHomeDelivery.Delivery_Pin_Code == "")){
    this.ObjHomeDelivery.Delivery_Type = "PICKUP";
  }else{
    this.ObjHomeDelivery.Delivery_Type = "DELIVERY"
  }
  //console.log("this.ObjcashForm.Card_Ac",this.productSubmit);

  if(this.productSubmit.length) {
    let tempArr:any =[];
    const Deltime = new Date(this.Objcustomerdetail.Del_Date_Time);
     var hr = Deltime.getHours();
     let min:any = Deltime.getMinutes();
         min = min < 10 ? '0'+min : min;
         this.Objcustomerdetail.Del_Date_Time = hr+ ":" +min
     console.log("time ==" , this.Objcustomerdetail.Del_Date_Time)
    this.productSubmit.forEach(item => {
      if (Number(item.Amount_berore_Tax) && Number(item.Amount_berore_Tax) != 0) {
      const obj = {
          Product_ID : item.Product_ID,
          Product_Description : item.Product_Description,
          Product_Type_ID : item.Product_Type_ID,
          Product_Modifier : item.Modifier1,
          Product_Modifier_1 : item.Modifier2,
          Product_Modifier_2 : item.Modifier3,
          Product_Modifier_3 : item.Modifier4,
          Product_Modifier_4 : item.Modifier5,
          Flavour : item.Flavour,
          Finishing : item.Finishing,
          Shape : item.Shape,
          Tier : item.Tier,
          Base : item.Base,
          Boxes : item.Boxes,
          Changes_on_Cake : item.Changes_on_Cake,
          Weight_in_Pound : item.Weight_in_Pound,
          Acompanish : item.Acompanish,
          Taxable : item.Amount_berore_Tax,
          Order_Taken_By : item.Order_Taken_By,
          Rate : item.Net_Price,
          Delivery_Charge : item.Delivery_Charge,
          Qty : item.Stock_Qty,
          Amount : item.Amount,
          Discount_Per : item.Max_Discount,
          Discount_Amt : item.Dis_Amount,
          // Gross_Amt : item.Gross_Amount,
          Gross_Amt : item.Amount_berore_Tax,
          SGST_Per : item.SGST_Per,
          SGST_Amt : item.SGST_Amount,
          CGST_Per : item.CGST_Per,
          CGST_Amt : item.CGST_Amount,
          IGST_Per : item.GST_Tax_Per,
          IGST_Amt : item.GST_Tax_Per_Amt,
          Net_Amount : item.Net_Amount
      }

    const TempObj = {
      Brand_ID : this.Brand_ID,
      Created_By : this.$CompacctAPI.CompacctCookies.User_ID,
      Foot_Fall_ID : this.Objcustomerdetail.Foot_Fall_ID,
      Order_Date : this.DateService.dateConvert(new Date(this.myDate)),
      //Doc_No : "A",
      Doc_No : this.Objcustomerdetail.Adv_Order_No ?  this.Objcustomerdetail.Adv_Order_No : "A",
      Cost_Cent_ID : this.$CompacctAPI.CompacctCookies.Cost_Cen_ID,
    // Del_Cost_Cent_ID : this.Objcustomerdetail.Del_Location,
      Del_Date : this.DateService.dateConvert(new Date (this.delivery_Date)),
      //Del_Date_Time	: this.DateService.dateTimeConvert(new Date(this.Objcustomerdetail.Del_Date_Time)),
      Del_Date_Time : this.Objcustomerdetail.Del_Date_Time,
      Rounded_Off : this.Round_Off,
      Amount_Payable : this.Amount_Payable,
      Hold_Order : this.Hold_Order_Flag ? "Y" : "N",
      Sub_Ledger_ID : this.QueryStringObj.Sub_Ledger_ID ? this.QueryStringObj.Sub_Ledger_ID : 0 ,
      Fin_Year_ID : Number(this.$CompacctAPI.CompacctCookies.Fin_Year_ID)
    }
    tempArr.push({...obj,...TempObj,...this.Objcustomerdetail,...this.ObjcashForm,...this.ObjHomeDelivery})
  
      } else {
        setTimeout(()=>{
        this.Spinner = false;
        this.ngxService.stop();
      this.compacctToast.clear();
      this.compacctToast.add({
         key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: "Error in Taxable amount"
      });
      },600)
  }
  });
  console.log(tempArr)
  return JSON.stringify(tempArr);
  }

}
SaveNPrintBill() {
  if (this.Hold_Order_Flag == false){
  if (this.Objcustomerdetail.Adv_Order_No) {
    window.open("/Report/Crystal_Files/K4C/K4C_Advance_Order_Print.aspx?DocNo=" + this.Objcustomerdetail.Adv_Order_No, 'mywindow', 'fullscreen=yes, scrollbars=auto,width=950,height=500'
 );
  }
  }
  //console.log('Doc_No ==', this.Objcustomerdetail.Adv_Order_No)
}

// EDIT ORDER
EditFromBrowse(Erow){
  //this.DocNO = undefined;
    //console.log("Edit",eROW);
    this.clearData();
    this.minDelDate = new Date();
    if(Erow.Adv_Order_No){
    this.Objcustomerdetail.Adv_Order_No = Erow.Adv_Order_No;
   // console.log('advance order id ==',eROW.Adv_Order_No)
    this.tabIndexToView = 1;
    this.items = ["BROWSE", "UPDATE"];
    this.buttonname = "Update";
    //console.log("this.EditDoc_No ", this.Objcustomerdetail.Adv_Order_No);
    this.geteditlist(this.Objcustomerdetail.Adv_Order_No);
    }

  }
Edit(eROW){
  //this.DocNO = undefined;
    //console.log("Edit",eROW);
    this.clearData();
    this.minDelDate = new Date();
    if(eROW.Adv_Order_No){
    this.Objcustomerdetail.Adv_Order_No = eROW.Adv_Order_No;
   // console.log('advance order id ==',eROW.Adv_Order_No)
    this.tabIndexToView = 1;
    // this.items = ["BROWSE", "UPDATE"];
    // this.buttonname = "Update";
    //console.log("this.EditDoc_No ", this.Objcustomerdetail.Adv_Order_No);
    this.geteditlist(this.Objcustomerdetail.Adv_Order_No);
    }

  }
geteditlist(Adv_Order_No){
    //this.DocNO = Adv_Order_No;
    // window.location.reload();
      const Tempobj = {
        Doc_No : this.Objcustomerdetail.Adv_Order_No
      }
      const obj = {
        "SP_String": "SP_Controller_Master",
        "Report_Name_String": "Get Advance Order Data For Edit",
        "Json_Param_String": JSON.stringify([Tempobj])
      }
      this.GlobalAPI.getData(obj).subscribe((data:any)=>{
       console.log(data);
       this.editList = data;
       this.myDate = new Date(data[0].Order_Date);
       this.minDelDate = new Date(data[0].Order_Date);
       this.Objcustomerdetail.Costomer_Mobile = data[0].Costomer_Mobile;
       this.Objcustomerdetail.Customer_Name= data[0].Customer_Name;
      //  this.Objcustomerdetail.Customer_DOB = data[0].Customer_DOB;
      //  this.Objcustomerdetail.Customer_Anni= data[0].Customer_Anni;
       this.Objcustomerdetail.Customer_DOB = data[0].Customer_DOB ? this.DateService.dateConvert(data[0].Customer_DOB) : undefined;
       this.Objcustomerdetail.Customer_Anni= data[0].Customer_Anni ? this.DateService.dateConvert(data[0].Customer_Anni) : undefined;
       this.Objcustomerdetail.Customer_GST = data[0].Customer_GST;
       this.Objcustomerdetail.Bill_Remarks = data[0].Bill_Remarks;
       //this.Objcustomerdetail.Del_Date_Time = this.DateService.dateTimeConvert(new Date(data[0].Del_Date_Time));
       //this.Objcustomerdetail.Del_Date_Time = new Date (data[0].Del_Date_Time);
       this.Objcustomerdetail.Del_Cost_Cent_ID = data[0].Del_Cost_Cent_ID;
       //this.Objcustomerdetail.Adv_Order_No = data[0].Adv_Order_No;
       console.log("e time==", data[0].Del_Date_Time)
       if(data[0].Del_Date_Time){
         const format = this.tConv24(data[0].Del_Date_Time);
        this.Objcustomerdetail.Del_Date_Time =this.setHours(new Date(), format);
       }
       console.log("edit time ===", this.Objcustomerdetail.Del_Date_Time)

    data.forEach(element => {
    const  productObj = {
        Product_ID : element.Product_ID,
        Product_Description : element.Product_Description,
        Modifier : element.Product_Modifier,
        Weight_in_Pound : element.Weight_in_Pound,
        Acompanish : element.Acompanish,
        Flavour : element.Flavour,
        Finishing : element.Finishing,
        Shape : element.Shape,
        Tier : element.Tier,
        Base : element.Base,
        Boxes : element.Boxes,
        Changes_on_Cake : element.Changes_on_Cake,
        Order_Taken_By : element.Order_Taken_By,
        Net_Price : Number(element.Rate),
        Delivery_Charge : Number(element.Delivery_Charge),
        Stock_Qty :  Number(element.Qty),
        Amount :Number(element.Amount).toFixed(2),
        Amount_berore_Tax : Number(element.Taxable).toFixed(2),
        Max_Discount : Number(element.Discount_Per),
        Dis_Amount : Number(element.Discount_Amt).toFixed(2),
        Taxable : Number(Number(element.Taxable) - Number(element.Discount_Amt)).toFixed(2),
        Gross_Amount : Number(element.Gross_Amt).toFixed(2),
        SGST_Per : Number(element.SGST_Per).toFixed(2),
        SGST_Amount : Number(element.SGST_Amt).toFixed(2),
        CGST_Per : Number(element.CGST_Per).toFixed(2),
        CGST_Amount : Number(element.CGST_Amt).toFixed(2),
        GST_Tax_Per : Number(element.IGST_Per),
        GST_Tax_Per_Amt : element.IGST_Amt,
        Net_Amount : Number(element.Net_Amount).toFixed(2)
      };

      this.productSubmit.push(productObj);
    });
    this.ObjcashForm.Credit_To_Ac_ID = data[0].Credit_To_Ac_ID ? data[0].Credit_To_Ac_ID : undefined;
    this.ObjcashForm.Credit_To_Ac = data[0].Credit_To_Ac ? data[0].Credit_To_Ac : undefined;
    this.ObjcashForm.Credit_To_Amount = data[0].Credit_To_Amount ? data[0].Credit_To_Amount : "";
    this.ObjcashForm.Wallet_Ac_ID = data[0].Wallet_Ac_ID ? data[0].Wallet_Ac_ID : undefined;
    this.ObjcashForm.Wallet_Ac = data[0].Wallet_Ac ? data[0].Wallet_Ac : undefined;
    this.ObjcashForm.Wallet_Amount = data[0].Wallet_Amount ? data[0].Wallet_Amount : "";
    this.ObjcashForm.Cash_Amount = data[0].Cash_Amount ? data[0].Cash_Amount : "";
    this.ObjcashForm.Card_Amount = data[0].Card_Amount ? data[0].Card_Amount : "";
    this.Additional_Payment = data[0].Additional_Payment ? data[0].Additional_Payment : 0;
    this.ObjcashForm.Total_Paid = data[0].Total_Paid;
   // this.ObjcashForm.Net_Due = data[0].Net_Due;

    this.Objcustomerdetail.Foot_Fall_ID = data[0].Foot_Fall_ID;
    this.Objcustomerdetail.Cost_Cen_ID = data[0].Cost_Cen_ID;
    //this.ObjaddbillForm.Doc_Date = data[0].Order_Date;
    this.Objcustomerdetail.Adv_Order_No = data[0].Adv_Order_No;

    // this.myDate = data[0].Order_Date;
    this.delivery_Date = new Date(data[0].Del_Date);
    this.Total = data[0].Net_Amount;
    this.Amount_Payable = data[0].Amount_Payable;
    this.Round_Off = data[0].Rounded_Off;
    this.CalculateTotalAmt();
    this.listofamount();
   console.log("this.editList  ===",data);
 //this.myDate =  new Date(data[0].Column1);
  // on save use this
 // this.ObjRequistion.Req_Date = this.DateService.dateTimeConvert(new Date(this.myDate));
    this.ObjHomeDelivery.Delivery_Type = data[0].Delivery_Type;
    this.ObjHomeDelivery.Delivery_Mobile_No = data[0].Delivery_Mobile_No;
    this.ObjHomeDelivery.Delivery_Alt_Mobile_No = data[0].Delivery_Alt_Mobile_No;
    this.ObjHomeDelivery.Delivery_Name = data[0].Delivery_Name;
    this.ObjHomeDelivery.Delivery_Address = data[0].Delivery_Address;
    this.ObjHomeDelivery.Delivery_Near_By = data[0].Delivery_Near_By;
    this.ObjHomeDelivery.Delivery_Pin_Code = data[0].Delivery_Pin_Code;

})
}
//BROWSE BILL
PrintOrder(obj) {
  if (obj.Adv_Order_No) {
    window.open("/Report/Crystal_Files/K4C/K4C_Advance_Order_Print.aspx?DocNo=" + obj.Adv_Order_No, 'mywindow', 'fullscreen=yes, scrollbars=auto,width=950,height=500'

    );
  }
}

// FOR MAKE PAYMENT POPUP
MakePayment(orderno){
  if(orderno.Adv_Order_No){
  this.Objcustomerdetail.Adv_Order_No = orderno.Adv_Order_No;
  //console.log('Adv_Order_No====',this.Objcustomerdetail.Adv_Order_No)
 this.MakePaymentModal = true;
  }
  //console.log(orderno)
  this.Amount_Payable = orderno.Net_Due;
}
// DAY END CHECK FOR ADD PAYMENT
AddPamentsaveCheck(){
  if(this.FromCostCentId && this.Fromgodown_id){
   const TempObj = {
     Cost_Cen_ID : this.FromCostCentId,
     Godown_Id : this.Fromgodown_id
  }
   const obj = {
     "SP_String": "SP_Controller_Master",
     "Report_Name_String": "Check_Day_End",
     "Json_Param_String": JSON.stringify([TempObj])
   }
   this.GlobalAPI.getData(obj).subscribe((data:any)=>{
     if(data[0].Status === "Allow"){
       this.AddPayment();
     }
     else if(data[0].Status === "Disallow"){    // Disallow
      this.CloseMPaymentModal();
      this.checkSave = false;
       this.compacctToast.clear();
       this.compacctToast.add({
         key: "c",
         sticky: true,
         severity: "error",
         summary: data[0].Message,
         detail: "Confirm to proceed"
       });
       //this.productSubmit = [];
       this.clearData();
     }
   })
 }

}
AddPayment(){
  if(this.ObjcashForm.Net_Due < 0){
    this.compacctToast.clear();
    this.compacctToast.add({
      key: "compacct-toast",
      severity: "error",
      summary: "Warn Message",
      detail: "Error in collected amount."
    });
    return false;
  }
  if((this.ObjcashForm.Wallet_Ac_ID == undefined && this.ObjcashForm.Wallet_Amount) ||
     (!this.ObjcashForm.Wallet_Amount && this.ObjcashForm.Wallet_Ac_ID )){
    this.compacctToast.clear();
    this.compacctToast.add({
      key: "compacct-toast",
      severity: "error",
      summary: "Warn Message",
      detail: "Error in wallet Amount"
    });
    return false;
  }
  if((this.ObjcashForm.Credit_To_Ac_ID == undefined && this.ObjcashForm.Credit_To_Amount) ||
     (!this.ObjcashForm.Credit_To_Amount && this.ObjcashForm.Credit_To_Ac_ID )){
    this.compacctToast.clear();
    this.compacctToast.add({
      key: "compacct-toast",
      severity: "error",
      summary: "Warn Message",
      detail: "Error in Credit to Account"
    });
    return false;
  }
  const obj = {
    "SP_String": "SP_Controller_Master",
    "Report_Name_String" : "Save Outlet Adv Order Payment",
    "Json_Param_String": this.getdataforAddPayment()

  }
  this.GlobalAPI.postData(obj).subscribe((data:any)=>{
    //console.log(data);
    var tempID = data[0].Column1;
    if(data[0].Column1){
      this.compacctToast.clear();
      this.compacctToast.add({
       key: "compacct-toast",
       severity: "success",
       summary: "Advance_Order_ID  " + tempID,
       detail: "Succesfully Add"
     });
     this.MakePaymentModal = false;
     this.Showdata();
     this.Showdatabymobile(true);
     this.clearData();
     this.clearlistamount();
     this.cleartotalamount();
    } else{
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: "Error Occured "
      });
    }
  })
}
getdataforAddPayment(){
  if(this.ObjcashForm.Wallet_Ac_ID){
    this.walletlist.forEach(el => {
      if(Number(this.ObjcashForm.Wallet_Ac_ID) === Number(el.Txn_ID)){
        this.ObjcashForm.Wallet_Ac = el.Ledger_Name
      }
    });
}
if(this.ObjcashForm.Credit_To_Ac_ID){
  this.creditlist.forEach(el => {
    if(Number(this.ObjcashForm.Credit_To_Ac_ID) === Number(el.Txn_ID)){
      this.ObjcashForm.Credit_To_Ac = el.Ledger_Name
    }
  });
}
this.ObjcashForm.Wallet_Ac_ID = this.ObjcashForm.Wallet_Ac_ID ? this.ObjcashForm.Wallet_Ac_ID : 0 ;
this.ObjcashForm.Wallet_Ac = this.ObjcashForm.Wallet_Ac ? this.ObjcashForm.Wallet_Ac : "NA" ;
this.ObjcashForm.Credit_To_Ac_ID = this.ObjcashForm.Credit_To_Ac_ID ? this.ObjcashForm.Credit_To_Ac_ID : 0 ;
this.ObjcashForm.Credit_To_Ac = this.ObjcashForm.Credit_To_Ac ? this.ObjcashForm.Credit_To_Ac : "NA" ;
this.ObjcashForm.Credit_To_Amount = this.ObjcashForm.Credit_To_Amount ? this.ObjcashForm.Credit_To_Amount : 0;
this.ObjcashForm.Wallet_Amount = this.ObjcashForm.Wallet_Amount ? this.ObjcashForm.Wallet_Amount : 0;
this.ObjcashForm.Cash_Amount = this.ObjcashForm.Cash_Amount ? this.ObjcashForm.Cash_Amount : 0;
this.ObjcashForm.Card_Amount = this.ObjcashForm.Card_Amount ? this.ObjcashForm.Card_Amount : 0;

let temparr:any = []
const TempObj = {
  Payment_Ref_No : "a",
  Doc_No : this.Objcustomerdetail.Adv_Order_No,
  Payment_Date : this.DateService.dateConvert(new Date(this.myDate)),
  Cost_Cent_ID : this.$CompacctAPI.CompacctCookies.Cost_Cen_ID,
  //Created_On : this.Objcustomerdetail.Del_Date_Time,
  Created_By : this.$CompacctAPI.CompacctCookies.User_ID,
  // Credit_To_Ac_ID : this.ObjcashForm.Credit_To_Ac_ID,
  // Credit_To_Ac : this.ObjcashForm.Credit_To_Ac,
  // Credit_To_Amount : this.ObjcashForm.Credit_To_Amount,
  // Cash_Amount : this.ObjcashForm.Cash_Amount,
  // Card_Ac_ID : this.ObjcashForm.Card_Ac_ID,
  // Card_Ac : this.ObjcashForm.Card_Ac,
  // Card_Amount : this.ObjcashForm.Card_Amount,
  // Total_Paid : this.ObjcashForm.Total_Paid,
  // Net_Due : this.ObjcashForm.Net_Due,
  Fin_Year_ID : Number(this.$CompacctAPI.CompacctCookies.Fin_Year_ID)
}
 temparr.push({...TempObj,...this.ObjcashForm})
 //console.log(temparr)
 return JSON.stringify(temparr);
}
CloseMPaymentModal(){
  this.MakePaymentModal = false;
  this.Amount_Payable = [];
  this.ObjcashForm = new cashForm();
}

// FOR HOME DELIVERY POPUP
ShowHomeDeliverypopup(){
  //this.locationInput.nativeElement.value = '';
  this.HomeDeliverypopup = true;
  this.ObjHomeDelivery.Delivery_Mobile_No = this.Objcustomerdetail.Costomer_Mobile;
  this.ObjHomeDelivery.Delivery_Name = this.Objcustomerdetail.Customer_Name;
   //console.log('Mobile No===', this.ObjHomeDelivery.Delivery_Mobile_No);
   //console.log('Name ====', this.ObjHomeDelivery.Delivery_Name);
}
DeliveryDetailSubmit(){
  this.HomeDeliverypopup = false;
}

HoldBill(){
  //this.buttonname = this.Hold_Order_Flag ? "Hold Order" : 'Save & Print Bill';
  if(this.QueryStringObj.Edit_Adv_Order){
    this.buttonname = this.Hold_Order_Flag ? "Hold Order" : 'Update';
  } else {
    this.buttonname = this.Hold_Order_Flag ? "Hold Order" : 'Save & Print Bill';
  }

}
getLockDate(){
  const obj = {
   "SP_String": "sp_Comm_Controller",
   "Report_Name_String": "Get_LockDate",
   //"Json_Param_String": JSON.stringify([{Doc_Type : "Sale_Bill"}])

 }
 this.GlobalAPI.getData(obj).subscribe((data:any)=>{
//   console.log('LockDate===',data);
  this.lockdate = data[0].dated;

})
}
checkLockDate(docdate){
  if(this.lockdate && docdate){
    if(new Date(docdate) > new Date(this.lockdate)){
      return true;
    } else {
      var msg = this.tabIndexToView === 0 ? "edit or delete" : "create";
      this.Spinner = false;
      this.compacctToast.clear();
      this.compacctToast.add({
       key: "compacct-toast",
       severity: "error",
       summary: "Warn Message",
       detail: "Can't "+ msg+" this document. Transaction locked till "+ this.DateService.dateConvert(new Date (this.lockdate))
    });
      return false;
    }
  } else {
    this.Spinner = false;
    this.compacctToast.clear();
    this.compacctToast.add({
     key: "compacct-toast",
     severity: "error",
     summary: "Warn Message",
     detail: "Date not found."
    });
    return false;
  }
}
RedirectTo (obj){
  const navigationExtras: NavigationExtras = {
    queryParams: obj,
  };
  this.router.navigate([obj.Redirect_To], navigationExtras);
}
CreateBill(col,val){
  if (val === 'advordertosalebill') {
    const TempObj = {
      Redirect_To : './K4C_Outlet_Sale_Bill',
      Adv_Order_No : col.Adv_Order_No,
      Del_Cost_Cent_ID : col.Del_Cost_Cent_ID,
      Edit_from_Border : true
    }
    this.RedirectTo(TempObj);
  }
  if (val === 'editorder') {
    if(this.checkLockDate(col.Order_Date)){
    const TempObj = {
      Redirect_To : './K4C_Outlet_Advance_Order',
      Adv_Order_No : col.Adv_Order_No,
      Edit_Adv_Order : true
    }
    this.RedirectTo(TempObj);
    }
  }
}
PrintBill(obj) {
  if (obj.Bill_No) {
    window.open("/Report/Crystal_Files/K4C/K4C_Bill_Print.aspx?DocNo=" + obj.Bill_No, 'mywindow', 'fullscreen=yes, scrollbars=auto,width=950,height=500'

    );
  }
}

// PHOTO UPLOAD
FetchPDFFile(event,i) {
  this.photoforproductList[i].PDFViewFlag = true;
  this.photoforproductList[i].PDFFile={};
  if (event) {
    this.photoforproductList[i].PDFViewFlag = false;
    this.photoforproductList[i].PDFFile= event.files[0];
  }
}
async upload(i){
  if (this.photoforproductList[i].Txn_ID && this.photoforproductList[i].Adv_Order_No && this.photoforproductList[i].PDFFile['size']) {
    this.photoforproductList[i].uploadbuttondisabled= true;
    this.photoforproductList[i].uploadSpinner = true;
  const formData: FormData = new FormData();
      formData.append("aFile", this.photoforproductList[i].PDFFile)
      formData.append("Txn_ID", this.photoforproductList[i].Txn_ID);
      formData.append("Adv_Order_NO", this.photoforproductList[i].Adv_Order_No);
  let response = await fetch('/K4C_Outlet_Advance_Order/Upload_Doc',{ 
                method: 'POST',
                body: formData // This is your file object
              });
  let responseText = await response.text();
  //const mgs = this.buttonname === 'Save & Print Bill' ? "Created" : "Updated";
    this.Spinner = false;
        this.compacctToast.clear();
        this.compacctToast.add({
         key: "compacct-toast",
         severity: "success",
         summary: "  " ,
         detail: "Succesfully Uploaded " 
    });
    //this.Uploadbutton = "Uploaded";
    this.photoforproductList[i].uploadbuttondisabled= true;
    this.photoforproductList[i].uploadSpinner = false;
    //this.uploadbuttondisabled = true;
  }
  else 
    if(!this.ProductPDFFile['size']) {
      this.Spinner = false;
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Validation",
        detail: "No Docs Selected"
      });
      //this.Uploadbutton = "Upload";
      this.uploadbuttondisabled = false;
  }
     
};
// FetchPDFFile(event) {
//   this.PDFViewFlag = true;
//   this.PDFFile={};
//   if (event) {
//     this.PDFViewFlag = false;
//     this.PDFFile= event.files[0];
//   }
// }
// async upload(){
 
//   console.log("file",this.PDFFile);
  
//   const formData: FormData = new FormData();
//   formData.append("pan", this.PDFFile);
//   const requestHeaders: HeadersInit = new Headers();
//   requestHeaders.set('x-functions-key', 'CdiqMVWYkfRuKLdqeVe3CSFYjHCzWM2A5/OVeIplauq5vnePb4voyA==');
//   let response = await fetch('https://urbanmoney.azurewebsites.net/api/PAN_Update?lead_id=1353&doc_type_id=1&doc_ID=BDBPA5086P',{ 
//    method: 'POST',
//    headers:  requestHeaders,
//    body: formData // This is your file object
//  });
//  let responseText = await response.text();
//  console.log("responseText",responseText);
 
//  }
ClosePicuploadpopup(){
  this.PhotoUploadPopup = false;
  this.photoforproductList = [];
  this.Spinner = false;
  this.ngxService.stop();
  this.SaveNPrintBill();
  this.clearData();
  this.productSubmit =[];
  this.clearlistamount();
  this.cleartotalamount();
  this.router.navigate(['./POS_BIll_Order']);
}

clearData(){
  this.ObjaddbillForm = new addbillForm();
  this.ObjcashForm = new cashForm();
  this.Objcustomerdetail = new customerdetail();
  this.ObjaddbillForm.selectitem = this.returnedID.length === 1 ? this.returnedID[0].Cost_Cen_ID : undefined;
  this.ObjaddbillForm.BrowserDeliveryto = this.returnedID.length === 1 ? this.returnedID[0].Cost_Cen_ID : undefined;

  this.addbillFormSubmitted = false;
  this.SavePrintFormSubmitted = false;
  this.seachSpinner = false;
  this.Spinner = false;
  this.getorderdate();
  //this.delivery_Date;
  this.delivery_Date = new Date();
  if(this.buttonname != "Update"){
  this.delivery_Date.setDate(this.delivery_Date.getDate() + 1);
  }
  //console.log('Delivery Date ===' , this.delivery_Date)
  this.Objcustomerdetail.Del_Cost_Cent_ID ='32';
  this.Hold_Order_Flag = false;
  //this.DocNO = undefined;
}

// REFUND
Refund(advono){
  this.ObjRefundcashForm = new RefundcashForm();
  if (advono.Adv_Order_No) {
    this.Adv_Order_No = advono.Adv_Order_No;
    this.RAmount_Payable = advono.Total_Paid - advono.Refund_Amt;
    this.RefundPopup = true;
  }

}
getdataforRefundSave(){
  if(this.ObjRefundcashForm.Wallet_Ac_ID){
    this.walletlist.forEach(el => {
      if(Number(this.ObjRefundcashForm.Wallet_Ac_ID) === Number(el.Txn_ID)){
        this.ObjRefundcashForm.Wallet_Ac = el.Ledger_Name
      }
    });
}
this.ObjRefundcashForm.Wallet_Ac_ID = this.ObjRefundcashForm.Wallet_Ac_ID ? this.ObjRefundcashForm.Wallet_Ac_ID : 0 ;
this.ObjRefundcashForm.Wallet_Ac = this.ObjRefundcashForm.Wallet_Ac ? this.ObjRefundcashForm.Wallet_Ac : "NA" ;
this.ObjRefundcashForm.Wallet_Amount = this.ObjRefundcashForm.Wallet_Amount ? this.ObjRefundcashForm.Wallet_Amount : 0;
this.ObjRefundcashForm.Cash_Amount = this.ObjRefundcashForm.Cash_Amount ? this.ObjRefundcashForm.Cash_Amount : 0;

let temparr:any = []
const TempObj = {
  Doc_No : this.Adv_Order_No,
  Cost_Cent_ID : this.$CompacctAPI.CompacctCookies.Cost_Cen_ID,
  //Created_On : this.Objcustomerdetail.Del_Date_Time,
  Created_By : this.$CompacctAPI.CompacctCookies.User_ID,
  Fin_Year_ID : Number(this.$CompacctAPI.CompacctCookies.Fin_Year_ID)
}
 temparr.push({...TempObj,...this.ObjRefundcashForm})
 //console.log(temparr)
 return JSON.stringify(temparr);
}
RefundSave(){
  if((this.ObjRefundcashForm.Cash_Amount > this.RAmount_Payable) ||
     (this.ObjRefundcashForm.Wallet_Amount > this.RAmount_Payable)){
    this.compacctToast.clear();
    this.compacctToast.add({
      key: "compacct-toast",
      severity: "error",
      summary: "Warn Message",
      detail: "Refund amount is more than amount received"
    });
    return false;
  }
  const obj = {
    "SP_String": "SP_Controller_Master",
    "Report_Name_String": "Save Outlet Adv Order Refund Payment",
    "Json_Param_String": this.getdataforRefundSave()
   }
   this.GlobalAPI.postData(obj).subscribe((data:any)=>{
    //console.log(data);
    var tempID = data[0].Column1;
    this.Adv_Order_No = data[0].Column1;
    if(data[0].Column1){
      this.compacctToast.clear();
     // const mgs = this.buttonname === 'Save & Print Bill' ? "Created" : "updated";
      this.compacctToast.add({
       key: "compacct-toast",
       severity: "success",
       summary: " " + tempID,
       //detail: "Succesfully done" 
     });
     this.RefundPopup = false;
     this.Showdata();
     this.Showdatabymobile(true);
     this.ObjRefundcashForm = new RefundcashForm();
    } else{

      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: "Error Occured "
      });
    }
  })
}

// UPDATE PAYMENT MODE
UpdatePaymentMode(ordno){
  this.UpdatePayModeList = [];
  if(ordno.Adv_Order_No) {
  const obj = {
    "SP_String": "SP_Add_ON",
    "Report_Name_String": "Get_Advance_Order_Payment_Details",
    "Json_Param_String": JSON.stringify([{Doc_No : ordno.Adv_Order_No}])
   }
   this.GlobalAPI.getData(obj).subscribe((data:any)=>{
    //console.log(data);
    this.UpdatePayModeList = data;
    this.ObjUpdatePayMode.Amount_Payable = data[0].Amount_Payable ? data[0].Amount_Payable : undefined;
    this.ObjUpdatePayMode.Credit_To_Ac_ID = data[0].Credit_To_Ac_ID ? data[0].Credit_To_Ac_ID : undefined;
    this.ObjUpdatePayMode.Credit_To_Ac = data[0].Credit_To_Ac ? data[0].Credit_To_Ac : undefined;
    this.ObjUpdatePayMode.Credit_To_Amount = data[0].Credit_To_Amount ? data[0].Credit_To_Amount : undefined;
    this.ObjUpdatePayMode.Wallet_Ac_ID = data[0].Wallet_Ac_ID ? data[0].Wallet_Ac_ID : undefined;
    this.ObjUpdatePayMode.Wallet_Ac = data[0].Wallet_Ac ? data[0].Wallet_Ac : undefined;
    this.ObjUpdatePayMode.Wallet_Amount = data[0].Wallet_Amount ? data[0].Wallet_Amount : undefined;
    this.ObjUpdatePayMode.Cash_Amount = data[0].Cash_Amount ? data[0].Cash_Amount : undefined;
    this.ObjUpdatePayMode.Card_Amount = data[0].Card_Amount ? data[0].Card_Amount : undefined;
    this.ObjUpdatePayMode.Total_Paid = data[0].Total_Paid ? data[0].Total_Paid : undefined;
    this.ObjUpdatePayMode.Net_Due = data[0].Net_Due ? data[0].Net_Due : undefined;
    this.ObjUpdatePayMode.Doc_No = data[0].Adv_Order_No;
    this.ObjUpdatePayMode.Order_Date = this.DateService.dateConvert(new Date(data[0].Order_Date));
    this.ObjUpdatePayMode.Cost_Cent_ID = data[0].Cost_Cent_ID;
    this.ObjUpdatePayMode.Del_Cost_Cent_ID = data[0].Del_Cost_Cent_ID;
    this.ObjUpdatePayMode.Del_Date = this.DateService.dateConvert(new Date(data[0].Del_Date));
    this.ObjUpdatePayMode.Del_Date_Time = this.DateService.dateTimeConvert(new Date(data[0].Del_Date_Time));
    this.ObjUpdatePayMode.Foot_Fall_ID = data[0].Foot_Fall_ID;
    this.ObjUpdatePayMode.Costomer_Mobile = data[0].Costomer_Mobile;
    this.ObjUpdatePayMode.Customer_Name = data[0].Customer_Name;
    this.ObjUpdatePayMode.Customer_DOB = this.DateService.dateConvert(new Date(data[0].Customer_DOB));
    this.ObjUpdatePayMode.Customer_Anni = this.DateService.dateConvert(new Date(data[0].Customer_Anni));
    this.ObjUpdatePayMode.Customer_GST = data[0].Customer_GST;
    this.ObjUpdatePayMode.Net_Payable = data[0].Net_Payable;
    this.UpdatePayModeModal = true;
  })
  }
}
UpdatePMode(){
  if((this.ObjUpdatePayMode.Cash_Amount > this.ObjUpdatePayMode.Total_Paid) ||
     (this.ObjUpdatePayMode.Wallet_Amount > this.ObjUpdatePayMode.Total_Paid) ||
     (this.ObjUpdatePayMode.Card_Amount > this.ObjUpdatePayMode.Total_Paid)){
    this.compacctToast.clear();
    this.compacctToast.add({
      key: "compacct-toast",
      severity: "error",
      summary: "Warn Message",
      detail: "Amount can't be more than Total Paid"
    });
    return false;
  }
  if((this.ObjUpdatePayMode.Wallet_Ac_ID == undefined && this.ObjUpdatePayMode.Wallet_Amount) ||
     (!this.ObjUpdatePayMode.Wallet_Amount && this.ObjUpdatePayMode.Wallet_Ac_ID )){
      this.Spinner = false;
      this.ngxService.stop();
    this.compacctToast.clear();
    this.compacctToast.add({
      key: "compacct-toast",
      severity: "error",
      summary: "Warn Message",
      detail: "Error in wallet Amount"
    });
    return false;
  }
  if((!this.ObjUpdatePayMode.Cash_Amount) && (!this.ObjUpdatePayMode.Wallet_Amount) && (!this.ObjUpdatePayMode.Card_Amount)){
      this.Spinner = false;
      this.ngxService.stop();
    this.compacctToast.clear();
    this.compacctToast.add({
      key: "compacct-toast",
      severity: "error",
      summary: "Warn Message",
      detail: "Enter Amount"
    });
    return false;
  }
  this.ObjUpdatePayMode.Cash_Amount = this.ObjUpdatePayMode.Cash_Amount ? Number(this.ObjUpdatePayMode.Cash_Amount) : 0;
  this.ObjUpdatePayMode.Wallet_Ac_ID = this.ObjUpdatePayMode.Wallet_Ac_ID ? Number(this.ObjUpdatePayMode.Wallet_Ac_ID) : 0;
  this.ObjUpdatePayMode.Wallet_Amount = this.ObjUpdatePayMode.Wallet_Amount ? Number(this.ObjUpdatePayMode.Wallet_Amount) : 0;
  this.ObjUpdatePayMode.Card_Amount = this.ObjUpdatePayMode.Card_Amount ? Number(this.ObjUpdatePayMode.Card_Amount) : 0;
  this.ObjUpdatePayMode.Credit_To_Ac_ID = this.ObjUpdatePayMode.Credit_To_Ac_ID ? Number(this.ObjUpdatePayMode.Credit_To_Ac_ID) : 0;
  this.ObjUpdatePayMode.Credit_To_Amount = this.ObjUpdatePayMode.Credit_To_Amount ? Number(this.ObjUpdatePayMode.Credit_To_Amount) : 0;
  this.ObjUpdatePayMode.Fin_Year_ID = Number(this.$CompacctAPI.CompacctCookies.Fin_Year_ID);

  const obj = {
    "SP_String": "SP_Add_ON",
    "Report_Name_String": "Update_Advance_Order_Payment_Details",
    "Json_Param_String": JSON.stringify([this.ObjUpdatePayMode])
   }
   this.GlobalAPI.postData(obj).subscribe((data:any)=>{
    //console.log(data);
    var tempID = data[0].Column1;
    // this.Adv_Order_No = data[0].Column1;
    if(data[0].Column1){
      this.compacctToast.clear();
     // const mgs = this.buttonname === 'Save & Print Bill' ? "Created" : "updated";
      this.compacctToast.add({
       key: "compacct-toast",
       severity: "success",
       summary: " " + tempID,
       detail: "Succesfully Updated" 
     });
     this.UpdatePayModeModal = false;
     this.Showdata();
     this.Showdatabymobile(true);
     this.ObjUpdatePayMode = new UpdatePayMode();
    } else{

      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: "Error Occured "
      });
    }
  })
}
DelMulPayments(obj){
    //console.log(this.Objcustomerdetail.Adv_Order_No)
    this.Ord_No = undefined;
    if(obj.Adv_Order_No){
      this.checkSave = true;
      this.Can_Remarks = false;
    this.Ord_No = obj.Adv_Order_No;
    this.compacctToast.clear();
    this.compacctToast.add({
      key: "c",
      sticky: true,
      severity: "warn",
      summary: "Are you sure?",
      detail: "Confirm to proceed"
      });
    }
}
onConfirm2(){
  this.Can_Remarks = false;
    const Tempobj = {
      Doc_No : this.Ord_No
    }
    const obj = {
      "SP_String": "SP_Add_ON",
      "Report_Name_String": "Delete_Multiple_Payment",
      "Json_Param_String": JSON.stringify([Tempobj])
    }
    this.GlobalAPI.getData(obj).subscribe((data:any)=>{
      // var msg = data[0].Column1;
      //console.log(data);
      //if(data[0].Column1 === "Cancel Successfully") {
        if(data[0].Column1) {
        this.Showdata();
        this.Showdatabymobile(true);
        this.cancleFormSubmitted = false;
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "success",
          summary: "Adv_Order_No : " + this.Ord_No,
          detail:  "Successfully Deleted"
        });
        this.Ord_No = undefined;

      } else{
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Error Occured "
        });
      }
    })
}
myFunction() {
  var doc:any = document.getElementById("myDropdown");
  doc.classList.toggle("show");
}
GetBrand(){
  this.BrandList = [];
  const obj = {
    "SP_String": "SP_Issue_Stock_Adjustment",
    "Report_Name_String": "Get - Brand"
  }
  this.GlobalAPI.getData(obj).subscribe((data:any)=>{
    this.BrandList = data;
  })
}
GetProduct(){
  this.selectitem = [];
  this.ObjaddbillForm.Product_ID = '';
  const TempObj = {
    Brand_ID : this.Brand_ID,
    Product_Type_ID : 0
   }
   const obj = {
    "SP_String": "SP_Controller_Master",
    "Report_Name_String": "Product For Adv Order For User A",
   "Json_Param_String": JSON.stringify([TempObj])

  }
  this.GlobalAPI.getData(obj).subscribe((data:any)=>{
    if(data.length) {
      data.forEach(element => {
        element['label'] = element.Product_Description,
        element['value'] = element.Product_ID
      });
      this.selectitem = data;

    } else {
      this.selectitem = [];

    }
    console.log("select Product======",this.selectitem);


  });
}


}
 class search{
  start_date : string;
  end_date : string;
  //Outlet : string;
 }

 class addbillForm{
  selectitem : string;
  Product_ID : string;
  Product_Type_ID : string;
  BrowserDeliveryto : any;
  //User_ID : any;
  Doc_Type : any;
  /*Billno : string;
  selectitem : string;
  Qty : string;
 */
 // Modifier : string;
  Modifier1 : string;
  Modifier2 : string;
  Modifier3 : string;
  Modifier4 : string;
  Modifier5 : string;
  Product_Description : string;
  Sale_rate : number;
  //Net_Price : number;
  Stock_Qty : number;
  Amount : number;
  Max_Discount : number = 0;
  Dis_Amount : number;
  Gross_Amt : number;
  SGST_Per : number;
  SGST_Amount  : number;
  CGST_Per : number;
  CGST_Amount : number;
  Net_Amount : number;
  GST_Tax_Per : number;
  GST_Tax_Per_Amt : number = 0;
  /* constructor(){
    this.Max_Discount = 0;
  } */
  Flavour : string;
  Finishing : string;
  Shape : string;
  Tier : string;
  Base : string;
  Boxes : string;
  Changes_on_Cake : string;
  Weight_in_Pound : number;
  Acompanish : number;
  Order_Taken_By : string;
  Delivery_Charge : number;
}
class cashForm{
  Coupon_Per : number;
  Credit_To_Ac_ID : any;
  Credit_To_Ac : string;
  Credit_To_Amount: any;
  Wallet_Ac_ID : any;
  Wallet_Ac : string;
  Wallet_Amount : number;
  Cash_Amount: number;
  Card_Amount: number;
  Total_Paid : any;
  Net_Due : any;
  // Refund_Amount : number = 0;
}
class customerdetail{
  Costomer_Mobile : number;
  Customer_Name : string;
  Customer_DOB : string;
  Customer_Anni : string;
  Customer_GST : string;
  Bill_Remarks : string;
  // Delivery_Date : string;
  Del_Date_Time : any;
  Del_Cost_Cent_ID : string;
  Foot_Fall_ID = 0;
  Cost_Cen_ID : number;
  Doc_Date : string;
  //Doc_No = "A" ;
  Adv_Order_No : any;
  //Advance = "NA" ;
  Cuppon_No : string;
  Cuppon_OTP : string;
}
class HomeDelivery{
  Delivery_Type : string;
  Delivery_Mobile_No : any;
  Delivery_Alt_Mobile_No : any;
  Delivery_Name : any;
  Delivery_Address: any;
  Delivery_Near_By : any;
  Delivery_Pin_Code : any;
  //Delivery_Alt_Mobile_No:any;
}
class RefundcashForm{
  Wallet_Ac_ID : any;
  Wallet_Ac : string;
  Wallet_Amount : number;
  Cash_Amount: number;
  // Refund_Amount : number = 0;
}
class UpdatePayMode{
  Doc_No : any;
  Amount_Payable : any;
  Credit_To_Ac_ID : any;
  Credit_To_Ac : string;
  Credit_To_Amount: any;
  Wallet_Ac_ID : any;
  Wallet_Ac : string;
  Wallet_Amount : number;
  Cash_Amount: number;
  Card_Amount: number;
  Total_Paid : any;
  Net_Due : any;
  Order_Date : any;
  Cost_Cent_ID : number;
  Del_Cost_Cent_ID : number;
  Del_Date : any;
  Del_Date_Time : any;
  Foot_Fall_ID : number;
  Costomer_Mobile : any;
  Customer_Name : string;
  Customer_DOB : any;
  Customer_Anni : any;
  Customer_GST : string;
  Net_Payable : number;
  Fin_Year_ID : number;
}


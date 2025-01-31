import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, wtfEndTimeRange } from '@angular/core';
import { MessageService } from "primeng/api";
import {CompacctHeader} from "../../../shared/compacct.services/common.header.service"
import { HttpClient, HttpParams } from '@angular/common/http';
import { CompacctGlobalApiService } from '../../../shared/compacct.services/compacct.global.api.service';
import { DateTimeConvertService } from '../../../shared/compacct.global/dateTime.service';
import { CompacctCommonApi } from '../../../shared/compacct.services/common.api.service';
import { Dropdown } from "primeng/components/dropdown/dropdown";
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { NgxUiLoaderService } from "ngx-ui-loader";
declare var $:any;

@Component({
  selector: 'app-bill-edit-from-admin',
  templateUrl: './bill-edit-from-admin.component.html',
  styleUrls: ['./bill-edit-from-admin.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class BillEditFromAdminComponent implements OnInit {
  items:any = [];
  tabIndexToView = 0;
  searchObj : search = new search();
  seachSpinner = false;
  Searchedlist:any = [];

  addbillFormSubmitted = false;
  ObjaddbillForm : addbillForm  = new addbillForm();
  url = window["config"];
  billdate:any = [];
  //Billno = false;
  selectitem:any = [];
  selectitemView:any = [];
  EditDoc_No = undefined;
  dateList: any;
  myDate: Date;
  returnedID:any = [];
  buttonname = "Update";
  Spinner = false;
  addbillForm:any = [];
  tempArr:any = [];
  data:any = [];
  productSubmit:any = [];
  Dis_Amount : any;
  Total:any;
  withoutdisamt:any;
  taxb4disamt:any;
  Amount:any;
  Gross_Amount:any;
  SGST_Amount:any;
  CGST_Amount:any;
  @ViewChild("Product2" ,{static : false}) Product2: Dropdown;
  // @ViewChild("ItemField" ,{static : false}) myItemField: ElementRef;
  Objcustomerdetail : customerdetail = new customerdetail();
  Round_Off: any;
  Amount_Payable: any;
  Net_Payable: any;
  Adv: any;
  //Discount: any;
  ObjcashForm : cashForm  = new cashForm();
  creditlist: any;
  walletlist: any;
  GST_Tax_Per_Amt: any;
  //Total_Paid : number;
  //Refund_Amount: number;
  SavePrintFormSubmitted = false;
  GSTvalidFlag = false;
  editList: any;
  public sub: Observable<string>;
  public QueryStringObj : any;
  CustomerDisabledFlag = false;
  Hold_Bill_Flag = false;
  AdvOderDetailList: any;
  godown_id: any;
  Batch_NO:any = [];
  Adv_Order_No: any;
  IsAdvance = false;
  ProductTypeFilterList:any = [];
  ProductTypeFilterSelected:any;
  FromCostCentId: any;
  checkSave = true;
  BackupWallet : number = 0;
  CanRemarksPoppup = false;
  Cancle_Remarks : string;
  cancleFormSubmitted = false;
  Can_Remarks = false;
  couponflag = false;
  Del_Cost_Cent_ID : any;
  rowCostcenter: any;
  // Browsetab = true;
  Browsetab = false;
  Browseroutlet: any;
  CGST_Ledger_Id: any;
  SGST_Ledger_Id: any;
  IGST_Ledger_Id: any;
  ProductType = undefined;
  isservice = undefined;
  TotalTaxable: any;
  CustumerName = undefined;
  walletdisabled = false;
  creditdisabled = false;
  FranchiseBill: any;
  Online_Order_Date:any;
  Online_Order_No: any;
  canbilldate: any;
  BillDate: any;
  Created_By: any;

  From_Date: Date = new Date();
  To_Date: Date = new Date();
  CostCenterList:any = [];
  Cost_Cen_ID: any;
  GridList:any = [];
  GridListHeader:any = [];
  GetDataList: any = [];
  lockdate:any;

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
  ) {
    // this.route.queryParamMap.subscribe((val:any) => {
    //   this.CustomerDisabledFlag = false;
    //   if(val.params) {
    //     this.QueryStringObj = val.params;
    //     // if(this.QueryStringObj.Browse_Flag) {
    //     //   this.CustomerDisabledFlag = false;
    //     // }
    //     // if(this.QueryStringObj.Edit){
    //     //   this.CustomerDisabledFlag = true;
    //     //   this.Edit(this.QueryStringObj);
    //     // }
    //     if(this.QueryStringObj.Edit_Bill){
          
    //       this.editmaster(this.QueryStringObj);
    //     }
    //   }
    //  } );
    // this.Header.pushHeader({
    //   Header: "Sale Bill",
    //   Link: " Sale Bill"
    // });
   }

  ngOnInit() {
    $(".content-header").removeClass("collapse-pos");
    $(".content").removeClass("collapse-pos");
    this.items = ["BROWSE","UPDATE","DIAGNOSIS"];
    this.Header.pushHeader({
      Header: "Sale Bill",
      Link: "Sale Bill"
    });
    //this.getselectitem();
    this.GetProductTypeFilterList();
    this.getbilldate();
    this.getcostcenid();
    this.getgodownid();
    //this.getadvorderdetails();
    this.getwalletamount();
    this.getcredittoaccount();
    //console.log(this.QueryStringObj);
    this.GetCostCenter();
    this.getLockDate();
  }
  TabClick(e){
    //console.log(e)
    this.tabIndexToView = e.index;
    this.items = ["BROWSE","UPDATE","DIAGNOSIS"];
    this.productSubmit =[];
    this.clearData();
    this.clearlistamount();
    this.cleartotalamount();
    this.selectitem = [];
    this.selectitemView = [];
    //this.searchObj.Outlet = this.returnedID.length === 1 ? this.returnedID[0].Cost_Cen_ID : undefined;
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
     //this.ObjaddbillForm.selectitem = this.$CompacctAPI.CompacctCookies.Cost_Cen_ID;
    // this.ObjaddbillForm.selectitem = this.returnedID.length === 1 ? this.returnedID[0].Cost_Cen_ID : undefined;
     //if(this.$CompacctAPI.CompacctCookies.User_Type == 'U'){
     this.ObjaddbillForm.selectitem = this.$CompacctAPI.CompacctCookies.Cost_Cen_ID;
     this.Browseroutlet = this.$CompacctAPI.CompacctCookies.Cost_Cen_ID;
     //} else {
     // this.ObjaddbillForm.Browseroutlet = this.$CompacctAPI.CompacctCookies.Cost_Cen_ID;
     //}
     //console.log("this.ObjaddbillForm.BroeItem",this.ObjaddbillForm.BroeItem);
  
    //  this.ObjaddbillForm.Advance = this.QueryStringObj.Order_No ? this.QueryStringObj.Order_No : '';
    //  this.ObjaddbillForm.Order_Date = this.QueryStringObj.Order_Date;
    //  this.ObjaddbillForm.Ledger_Name = this.QueryStringObj.Ledger_Name ? this.QueryStringObj.Ledger_Name : '';
    //  this.getselectitem();
    //console.log("this.returnedID======",this.returnedID);
  
    console.log('ngonit --2');
  
    });
  }
  // FRANCISE BILL
autoaFranchiseBill() {
  //this.ExpiredProductFLag = false;
 if(this.ObjaddbillForm.selectitem) {
   const ctrl = this;
   const autofrnchiseObj = $.grep(ctrl.returnedID,function(item: any) {return item.Cost_Cen_ID == ctrl.ObjaddbillForm.selectitem})[0];
   console.log(autofrnchiseObj);
   this.FranchiseBill = autofrnchiseObj.Franchise;
   console.log("this.FranchiseBill ==", this.FranchiseBill)
   
  }
  }
  // BROWSE START
  getConfirmDateRange(dateRangeObj) {
    if (dateRangeObj.length) {
      this.searchObj.start_date = dateRangeObj[0];
      this.searchObj.end_date = dateRangeObj[1];
    }
  }
  GetSearchedlist(){
    this.seachSpinner = true;
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
      //Cost_Cen_ID : this.Browseroutlet
      Cost_Cen_ID : this.Browseroutlet ? this.Browseroutlet : 0
    }
    const obj = {
      "SP_String": "SP_Controller_Master",
      "Report_Name_String": "Get Outlet Bill Details",
      "Json_Param_String": JSON.stringify([tempobj])
     }
     this.GlobalAPI.getData(obj).subscribe((data:any)=>{
       this.Searchedlist = data;
       //console.log('searchlist=====',this.Searchedlist)
       this.seachSpinner = false;
     })
  }
  getTotalValue(key){
    let Amtval = 0;
    this.Searchedlist.forEach((item)=>{
      Amtval += Number(item[key]);
    });

    return Amtval ? Amtval.toFixed(2) : '-';
  }
  editmaster(eROW){
    //console.log("editmaster",eROW);
      this.clearData();
      this.canbilldate = "";
      this.rowCostcenter = "";
      this.Created_By = undefined;
      if(eROW.Bill_No){
      if(this.checkLockDate(eROW.Bill_Date)){
        this.ngxService.start();
      this.Objcustomerdetail.Bill_No = eROW.Bill_No;
      this.canbilldate = new Date(eROW.Bill_Date);
      this.rowCostcenter = eROW.Cost_Cent_ID;
      this.ObjaddbillForm.selectitem = this.rowCostcenter;
      this.autoaFranchiseBill();
      this.CustumerName = eROW.Customer_Name;
      //this.Browsetab = false;
      this.items = ["BROWSE","UPDATE","DIAGNOSIS"];
      this.buttonname = "Update";
       //console.log("this.EditDoc_No ", this.Objcustomerdetail.Bill_No );
      this.GetProductTypeFilterList();
      this.getselectitem();
      if (this.CustumerName == "SWIGGY" || this.CustumerName == "ZOMATO") {
        this.getonlinewalletlist();
      } else {
        this.getwalletamount();
      }
      this.geteditmaster(this.Objcustomerdetail.Bill_No);
      //this.getadvorderdetails(this.Objcustomerdetail.Bill_No);
      }
      }
  }
    geteditmaster(Bill_No){
      //console.log("Doc_No",Bill_No);
      const obj = {
        "SP_String": "SP_Controller_Master",
        "Report_Name_String": "Get Outlet Bill Details For Edit",
        "Json_Param_String": JSON.stringify([{Doc_No : this.Objcustomerdetail.Bill_No}])
    
      }
      this.GlobalAPI.getData(obj).subscribe((data:any)=>{
        this.editList = data;
        this.ObjaddbillForm.Advance = data[0].Online_Order_No ? data[0].Online_Order_No : data[0].Adv_Order_No;
        this.Online_Order_No = data[0].Online_Order_No;
        this.Online_Order_Date = data[0].Online_Order_Date ? new Date(data[0].Online_Order_Date) : null;
        this.Objcustomerdetail.Costomer_Mobile = data[0].Costomer_Mobile;
        this.Objcustomerdetail.Customer_Name= data[0].Customer_Name;
        // this.Objcustomerdetail.Customer_DOB = data[0].Customer_DOB;
        // this.Objcustomerdetail.Customer_Anni= data[0].Customer_Anni;
        this.Objcustomerdetail.Customer_DOB = data[0].Customer_DOB ? this.DateService.dateConvert(data[0].Customer_DOB) : undefined;
        this.Objcustomerdetail.Customer_Anni= data[0].Customer_Anni ? this.DateService.dateConvert(data[0].Customer_Anni) : undefined;
        this.Objcustomerdetail.Customer_GST = data[0].Customer_GST;
        this.Objcustomerdetail.Bill_Remarks = data[0].Bill_Remarks;
        this.Objcustomerdetail.Cuppon_No = data[0].Cuppon_No;
        this.Objcustomerdetail.Cuppon_OTP = data[0].Cuppon_OTP;
        this.Created_By = data[0].Created_By;
    
        data.forEach(element => {
        const  productObj = {
            Product_ID : element.Product_ID,
            Product_Description : element.Product_Description,
            Modifier : element.Product_Modifier,
            product_type : element.Product_Type,
            is_service : element.Is_Service,
            Net_Price : Number(element.Rate),
            Delivery_Charge : Number(element.Delivery_Charge),
            Batch_No : element.Batch_No,
            Stock_Qty :  Number(element.Qty),
            Amount : Number(element.Amount).toFixed(2),
            Amount_berore_Tax : Number(element.Taxable).toFixed(2),
            Max_Discount : Number(element.Discount_Per),
            Dis_Amount : Number(element.Discount_Amt).toFixed(2),
            Taxable : Number(Number(element.Taxable) - Number(element.Discount_Amt)).toFixed(2),
            Gross_Amount : Number(element.Taxable).toFixed(2),
            SGST_Per : Number(element.SGST_Per).toFixed(2),
            SGST_Amount : Number(element.SGST_Amt).toFixed(2),
            CGST_Per : Number(element.CGST_Per).toFixed(2),
            CGST_Amount : Number(element.CGST_Amt).toFixed(2),
            GST_Tax_Per : Number(element.IGST_Per),
            GST_Tax_Per_forcalcu : Number(element.IGST_Per),
            GST_Tax_Per_Amt : element.IGST_Amt,
            Net_Amount : Number(element.Net_Amount).toFixed(2),
            Taxable_Amount : Number(element.Taxable),
            CGST_Output_Ledger_ID : Number(element.CGST_Output_Ledger_ID),
            SGST_Output_Ledger_ID : Number(element.SGST_Output_Ledger_ID),
            IGST_Output_Ledger_ID : Number(element.IGST_Output_Ledger_ID),
          };
    
          this.productSubmit.push(productObj);
        });
        //this.QueryStringObj && this.QueryStringObj.Txn_ID
        // if(data[0].Txn_ID){
        //   this.getwalletamount();
        //   // this.ObjcashForm.Wallet_Ac_ID = data[0].Wallet_Ac_ID ? data[0].Wallet_Ac_ID : undefined;
        //   // this.ObjcashForm.Wallet_Ac = data[0].Wallet_Ac ? data[0].Wallet_Ac : undefined;
        //   this.ObjcashForm.Wallet_Amount = data[0].Wallet_Amount ? data[0].Wallet_Amount : "";
        //   this.ObjcashForm.Credit_To_Ac_ID = data[0].Credit_To_Ac_ID ? data[0].Credit_To_Ac_ID : undefined;
        //   this.ObjcashForm.Credit_To_Ac = data[0].Credit_To_Ac ? data[0].Credit_To_Ac : undefined;
        //   this.ObjcashForm.Credit_To_Amount = data[0].Credit_To_Amount ? data[0].Credit_To_Amount : "";
        // } else {
          if (data[0].Credit_To_Ac_ID) {
            this.ObjcashForm.Credit_To_Ac_ID = data[0].Credit_To_Ac_ID;
            this.ObjcashForm.Credit_To_Ac = data[0].Credit_To_Ac;
            this.ObjcashForm.Credit_To_Amount = data[0].Credit_To_Amount;
            this.creditdisabled = false;
          } else {
            this.ObjcashForm.Credit_To_Ac_ID = undefined;
            this.ObjcashForm.Credit_To_Ac = undefined;
            this.ObjcashForm.Credit_To_Amount = "";
            this.creditdisabled = false;
          }
        // this.ObjcashForm.Credit_To_Ac_ID = data[0].Credit_To_Ac_ID ? data[0].Credit_To_Ac_ID : undefined;
        // this.ObjcashForm.Credit_To_Ac = data[0].Credit_To_Ac ? data[0].Credit_To_Ac : undefined;
        // this.ObjcashForm.Credit_To_Amount = data[0].Credit_To_Amount ? data[0].Credit_To_Amount : "";
        if (data[0].Wallet_Ac_ID) {
          this.ObjcashForm.Wallet_Ac_ID = data[0].Wallet_Ac_ID;
          this.ObjcashForm.Wallet_Ac = data[0].Wallet_Ac;
          this.ObjcashForm.Wallet_Amount = data[0].Wallet_Amount;
          // if (this.CustumerName == "SWIGGY" || this.CustumerName == "ZOMATO") {
          this.walletdisabled = false;
          // } else {
            // this.walletdisabled = true;
          // }
        } else {
          this.ObjcashForm.Wallet_Ac_ID = undefined;
          this.ObjcashForm.Wallet_Ac = undefined;
          this.ObjcashForm.Wallet_Amount = "";
          this.walletdisabled = false;
        }
        // this.ObjcashForm.Wallet_Ac_ID = data[0].Wallet_Ac_ID ? data[0].Wallet_Ac_ID : undefined;
        // this.ObjcashForm.Wallet_Ac = data[0].Wallet_Ac ? data[0].Wallet_Ac : undefined;
        // this.ObjcashForm.Wallet_Amount = data[0].Wallet_Amount ? data[0].Wallet_Amount : "";
        this.ObjcashForm.Cash_Amount = data[0].Cash_Amount ? data[0].Cash_Amount : "";
        this.ObjcashForm.Card_Amount = data[0].Card_Amount ? data[0].Card_Amount : "";
        this.ObjcashForm.Total_Paid = data[0].Total_Paid;
        this.ObjcashForm.Refund_Amount = data[0].Refund_Amount;
        this.ObjcashForm.Due_Amount = data[0].Due_Amount;
    
        this.Objcustomerdetail.Foot_Fall_ID = data[0].Foot_Fall_ID;
        this.Objcustomerdetail.Cost_Cen_ID = data[0].Cost_Cen_ID;
        //this.ObjaddbillForm.Doc_Date = data[0].Order_Date;
        this.Objcustomerdetail.Bill_No = data[0].Bill_No;
        this.myDate = data[0].Bill_Date;
        this.Total = data[0].Net_Amount;
        this.Amount_Payable = data[0].Amount_Payable;
        this.Adv = data[0].Advance;
        this.Round_Off = data[0].Rounded_Off;
    
        this.CalculateTotalAmt();
        this.listofamount();
        setTimeout(()=>{
        this.tabIndexToView = 1;
        this.ngxService.stop();
        },800)
      //console.log("this.editList  ===",data);
     //this.myDate =  new Date(data[0].Column1);
      // on save use this
     // this.ObjRequistion.Req_Date = this.DateService.dateTimeConvert(new Date(this.myDate));
    
    })
    }
    
  PrintBill(obj) {
    if (obj.Bill_No) {
      window.open("/Report/Crystal_Files/K4C/K4C_Bill_Print.aspx?DocNo=" + obj.Bill_No, 'mywindow', 'fullscreen=yes, scrollbars=auto,width=950,height=500'
    
      );
    }
  }
  onReject(){}
  // BROWSE END
  // CREATE START
  getbilldate(){
    const obj = {
     "SP_String": "SP_Controller_Master",
     "Report_Name_String": "Get - Outlet Bill Date",
     //"Json_Param_String": JSON.stringify([{Doc_Type : "Sale_Bill"}])

   }
   this.GlobalAPI.getData(obj).subscribe((data:any)=>{
     this.dateList = data;
   //console.log("this.dateList  ===",this.dateList);
  this.myDate =  new Date(data[0].Outlet_Bill_Date);
  this.BillDate = new Date(data[0].Outlet_Bill_Date);
   // on save use this
  // this.ObjRequistion.Req_Date = this.DateService.dateTimeConvert(new Date(this.myDate));

 })
}
getLockDate(){
  const obj = {
   "SP_String": "sp_Comm_Controller",
   "Report_Name_String": "Get_LockDate",
   //"Json_Param_String": JSON.stringify([{Doc_Type : "Sale_Bill"}])

 }
 this.GlobalAPI.getData(obj).subscribe((data:any)=>{
  // console.log('LockDate===',data);
  this.lockdate = data[0].dated;

})
}
checkLockDate(docdate){
  if(this.lockdate && docdate){
    if(new Date(docdate) > new Date(this.lockdate)){
      return true;
    } else {
      this.Spinner = false;
      this.ngxService.stop();
      this.compacctToast.clear();
      this.compacctToast.add({
       key: "compacct-toast",
       severity: "error",
       summary: "Warn Message",
       detail: "Can't edit or delete this document. Transaction locked till "+ this.DateService.dateConvert(new Date (this.lockdate))
    });
      return false;
    }
  } else {
    this.Spinner = false;
    this.ngxService.stop();
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
  // GLOBAL KEY EVENT
  onKeydownMain(event,nextElemID): void {
    if (event.key === "Enter" && nextElemID){
        if (nextElemID === 'enter'){
            console.log('Table Data last enter')
            const elem  = document.getElementById('row-Add');
            elem.click();
        } else if (nextElemID === 'Qty') {
            this.Product2.applyFocus()
            this.Product2.containerViewChild.nativeElement.click();
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
      if (event.key === "Enter" && this.ObjaddbillForm.Product_ID) {
        const elem  = document.getElementById('Qty');
        elem.focus();
      }
      event.preventDefault();
  }
  chipclick(ev) {
        console.log(ev);
          this.Batch_NO =[];
          this.ObjaddbillForm.Product_Description = undefined;
          this.ObjaddbillForm.Product_ID = undefined;
          this.ObjaddbillForm.Net_Price =  undefined;
          this.ObjaddbillForm.GST_Tax_Per =  undefined;
          const val = ev.value;
        if(val !== 0) {
          let LeadArr = this.selectitem.filter(function (e) {
            return (Number(val) === Number(e['Product_Type_ID']))
          });
          this.selectitemView = LeadArr.length ? LeadArr : [];
        } else {
          this.selectitemView = this.selectitem;
        }
        console.log(this.selectitemView)
    
  }
  GetProductTypeFilterList(){
    this.ProductTypeFilterSelected = undefined;
    const tempobj = {
      Cost_Cent_ID : this.rowCostcenter
    }
    const obj = {
      "SP_String": "SP_Controller_Master",
      "Report_Name_String": "GET Product Type",
      "Json_Param_String": JSON.stringify([tempobj])
     }
     this.GlobalAPI.getData(obj).subscribe((data:any)=>{
       data.forEach(el=>{
         el['label'] = el.Product_Type;
         el['value'] = el.Product_Type_ID;
       });
       const obj2 = {
        Product_Type : 'ALL',
        Product_Type_ID : 0,
        label:'ALL',
        value: 0
       }
       this.ProductTypeFilterList = data;
       this.ProductTypeFilterList.push(obj2);
       this.ProductTypeFilterSelected=0;
      // console.log('searchlist=====',this.ProductTypeFilterList)
     })
  }
  getselectitem(){
    //if(this.ObjaddbillForm.Cost_Cen_ID){
     this.Objcustomerdetail.Doc_Date = this.DateService.dateConvert(new Date(this.myDate));
     //console.log("this.ObjaddbillForm.Doc_Date ===",this.ObjaddbillForm.Doc_Date)
     // const TempObj = {
     //   User_ID:this.$CompacctAPI.CompacctCookies.User_ID,
     //   Cost_Cen_ID : this.$CompacctAPI.CompacctCookies.Cost_Cen_ID,
     //   Doc_Type : "Sale_Bill",
     //   Doc_Date : this.Objcustomerdetail.Doc_Date
     //  }
     const TempObj = {
      User_ID:this.$CompacctAPI.CompacctCookies.User_ID,
      Cost_Cen_ID :  this.rowCostcenter,
      Doc_Type : "ORDER Edit From Admin",
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
           element['value'] = element.Product_ID,
           element['Product_Type_ID'] = element.Product_Type_ID
         });
         this.selectitem = data;
         this.selectitemView = data;
 
         this.Product2.applyFocus()
         this.Product2.containerViewChild.nativeElement.click();
       } else {
         this.selectitem = [];
         this.selectitemView = [];
 
       }
     // console.log("this.selectitem======",this.selectitem);
 
 
     });
 
 
 
 }
 ProductChange() {
  this.Batch_NO =[];
  this.ObjaddbillForm.Product_Description =undefined;
  this.ObjaddbillForm.Sale_rate =  undefined;
  this.ObjaddbillForm.GST_Tax_Per =  undefined;
if(this.ObjaddbillForm.Product_ID) {
  const ctrl = this;
  //this.getBatchNo();
  const productObj = $.grep(ctrl.selectitem,function(item) {return item.Product_ID == ctrl.ObjaddbillForm.Product_ID})[0];
  console.log(productObj);
  //this.rate = productObj.Sale_rate;
  this.ObjaddbillForm.Product_Description = productObj.Product_Description;
  //this.ObjaddbillForm.Stock_Qty = productObj.Stock_Qty;
  if (this.CustumerName == "SWIGGY" || this.CustumerName == "ZOMATO") {
    this.ObjaddbillForm.Sale_rate =  productObj.Sale_rate_Online;
  } else {
  this.ObjaddbillForm.Sale_rate =  productObj.Sale_rate;
  }
  //this.ObjaddbillForm.Sale_rate_Online = productObj.Sale_rate_Online;
  this.ObjaddbillForm.GST_Tax_Per =  productObj.GST_Tax_Per;
  this.CGST_Ledger_Id = productObj.CGST_Output_Ledger_ID;
  this.SGST_Ledger_Id = productObj.SGST_Output_Ledger_ID;
  this.IGST_Ledger_Id = productObj.IGST_Output_Ledger_ID;
  this.ProductType = productObj.Product_Type;
  this.isservice = productObj.Is_Service;
}
}
// INSERT STOCK
InsertStock(){
  this.ngxService.start();
  const sendonj = {
    Cost_Cen_ID : this.rowCostcenter
  }
  const obj = {
    "SP_String": "SP_For_POS_Current_Stock",
    "Report_Name_String": "Insert_Stock",
    "Json_Param_String": JSON.stringify([sendonj])

  }
  this.GlobalAPI.getData(obj).subscribe((data:any)=>{
    if (data[0].Column1 === "Done") {
      this.getselectitem();
      this.ngxService.stop();
      this.canbilldate = "";
      this.rowCostcenter = "";
    } else {
      this.ngxService.stop();
      this.canbilldate = "";
      this.rowCostcenter = "";
    }
  })
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
   this.godown_id = data[0].godown_id ? data[0].godown_id : 0;
   //console.log('godownid ==', data)

  });
}
getBatchNo(){
 // console.log(this.godown_id)
 // console.log(this.ObjaddbillForm.Product_ID)
  const TempObj = {
    Cost_Cen_ID : this.$CompacctAPI.CompacctCookies.Cost_Cen_ID,
    Godown_Id : this.godown_id,
    Product_ID : this.ObjaddbillForm.Product_ID,
    //Cost_Cen_ID : 2,
    //Godown_Id : 4,
    //Product_ID : 3383
   }
  const obj = {
    "SP_String": "SP_Controller_Master",
    "Report_Name_String": "Get_Product_Wise_Batch",
    "Json_Param_String": JSON.stringify([TempObj])
   }
  this.GlobalAPI.getData(obj).subscribe((data:any)=>{
   this.Batch_NO = data.length ? data : [];
   this.ObjaddbillForm.Batch_No = this.Batch_NO.length ? this.Batch_NO[0].Batch_NO : undefined;
  // console.log('Batch No ==', data)

  });
}
getcredittoaccount(){
  this.creditlist = [];
  // if(this.QueryStringObj && this.QueryStringObj.Txn_ID) {
  //   const obj = {
  //     "SP_String": "SP_Controller_Master",
  //     "Report_Name_String": "Get - Online Ledger"
  //    }
  //    this.GlobalAPI.getData(obj).subscribe((data:any)=>{
  //      this.creditlist = data;
  //      this.creditlist = this.creditlist.filter(item => item.Txn_ID.toString() === this.QueryStringObj.Txn_ID.toString());
  //      this.ObjcashForm.Credit_To_Ac_ID = this.QueryStringObj.Txn_ID;
  //      console.log('credit ==', this.creditlist)
  //    })

  // } else {
    const obj = {
      "SP_String": "SP_Controller_Master",
      "Report_Name_String": "Get - Data for Credit to Account",
     }
     this.GlobalAPI.getData(obj).subscribe((data:any)=>{
       this.creditlist = data;
     })
  //}
}

getwalletamount(){
  this.walletlist = [];
  // if(this.QueryStringObj && this.QueryStringObj.Txn_ID) {
  //   const obj = {
  //     "SP_String": "SP_Controller_Master",
  //     "Report_Name_String": "Get - Online Ledger"
  //    }
  //    this.GlobalAPI.getData(obj).subscribe((data:any)=>{
  //      this.walletlist = data;
  //      this.walletlist = this.walletlist.filter(item => item.Txn_ID.toString() === this.QueryStringObj.Txn_ID.toString());
  //      this.ObjcashForm.Wallet_Ac_ID = this.QueryStringObj.Txn_ID;
  //      console.log('wallet ==', this.walletlist)
  //    })
  // } else {
    const obj = {
      "SP_String": "SP_Controller_Master",
      "Report_Name_String": "Get - Data for Card to Amount",
    }
    this.GlobalAPI.getData(obj).subscribe((data:any)=>{
      this.walletlist = data;
    //  if(this.QueryStringObj.Txn_ID) {
    //   this.cardlist = this.cardlist.filter(item => item.Txn_ID.toString() === this.QueryStringObj.Txn_ID.toString());
    //  }
     //console.log('card=====',this.cardlist)
   })
  //}
}
getonlinewalletlist(){
  const obj = {
        "SP_String": "SP_Controller_Master",
        "Report_Name_String": "Get - Online Ledger"
       }
       this.GlobalAPI.getData(obj).subscribe((data:any)=>{
         this.walletlist = data;
        //  this.walletlist = this.walletlist.filter(item => item.Txn_ID.toString() === this.QueryStringObj.Txn_ID.toString());
        //  this.ObjcashForm.Wallet_Ac_ID = this.QueryStringObj.Txn_ID;
         console.log('wallet ==', this.walletlist)
       })
}
// CALCULATION
add(valid) {
  //console.log(this.ObjaddbillForm.Product_ID)
  this.addbillFormSubmitted = true;
  if(valid) {
    var SGST_Amount;
    var CGST_Amount;
    var totalgst;
   //console.log("call");
  //console.log("this.ObjaddbillForm===",this.ObjaddbillForm)
  var Amount = Number(this.ObjaddbillForm.Stock_Qty * this.ObjaddbillForm.Sale_rate);
  var Amtbeforetax = (Number(Amount * 100) / (Number(this.ObjaddbillForm.GST_Tax_Per) + 100));
  var rate =((Number(Number(this.ObjaddbillForm.Sale_rate) * 100)) / (Number(this.ObjaddbillForm.GST_Tax_Per) + 100)).toFixed(2);
  // var tax = Number(Number(rate) * Number(this.ObjaddbillForm.Stock_Qty));
  var Dis_Amount = Number(Number(rate) * Number(this.ObjaddbillForm.Max_Discount) / 100);
  // var Gross_Amount = Number(Number(rate) - Number(Dis_Amount)) ;
  //var SGST_Amount = Number((Amount - rate) / 2) ; 
  var SGST_Per = Number(Number(this.ObjaddbillForm.GST_Tax_Per) / 2);
  SGST_Amount = Number((Number(Amtbeforetax) * Number(SGST_Per)) / 100).toFixed(2);
  var CGST_Per = Number(Number(this.ObjaddbillForm.GST_Tax_Per) / 2);
  CGST_Amount = Number((Number(Amtbeforetax) * Number(CGST_Per)) / 100).toFixed(2);
  //var CGST_Amount = Number((Amount - rate) / 2) ;
  var IGST_Per = Number(this.ObjaddbillForm.GST_Tax_Per);
  var IGST_Amount = Number(this.ObjaddbillForm.GST_Tax_Per_Amt) ;
  totalgst = Number(IGST_Amount) ? (Number(SGST_Amount) + Number(CGST_Amount) + Number(IGST_Amount)).toFixed(2) : (Number(SGST_Amount) + Number(CGST_Amount)).toFixed(2);
  var tax = Number(Number(Amtbeforetax) - Number(Dis_Amount));

//  // console.log('taxable',tax)
//   var aftertaxable:any = Number(tax).toFixed(2);
//  // console.log('aftertaxable',aftertaxable)
//   let afterdecval = aftertaxable.toString().split('.')[1]
//  // console.log('afterdecval',afterdecval)
//   const oddOrEven = Number(afterdecval) % 2 === 0 ? 'even' : 'odd'
//  // console.log('oddOrEven',oddOrEven)
//   if (oddOrEven == 'odd') {
//     aftertaxable = (Number(aftertaxable) + Number(0.01)).toFixed(2)
//   //  console.log("aftertaxable",aftertaxable)
//   } else {
//     aftertaxable = Number(aftertaxable)
//   //  console.log("aftertaxable",aftertaxable)
//   }
  var ntamt = Number(tax) + Number(totalgst);
  //this.ObjaddbillForm.Gross_Amt = Gross_Amount;
  //var GST_Tax_Per_Amt = 0;
  //new add
  var productObj = {
    Product_ID : this.ObjaddbillForm.Product_ID,
    Product_Description : this.ObjaddbillForm.Product_Description,
    Modifier : this.ObjaddbillForm.Modifier,
    product_type : this.ProductType,
    is_service : this.isservice,
    // Modifier1 : this.ObjaddbillForm.Modifier1,
    // Modifier2 : this.ObjaddbillForm.Modifier2,
    // Modifier3 : this.ObjaddbillForm.Modifier3,
    // Modifier4 : this.ObjaddbillForm.Modifier4,
    // Modifier5 : this.ObjaddbillForm.Modifier5,
   // Net_Price : Number(rate).toFixed(2),
    Net_Price : Number(this.ObjaddbillForm.Sale_rate),
    Delivery_Charge : 0,
    Stock_Qty :  Number(this.ObjaddbillForm.Stock_Qty),
    Batch_No : "NA",
    //Amount :Number(rate).toFixed(2),
    Amount : Number(Amount).toFixed(2),
    Amount_berore_Tax : Number(Amtbeforetax).toFixed(2),
    Max_Discount : Number(this.ObjaddbillForm.Max_Discount),
    Dis_Amount : Number(Dis_Amount).toFixed(2),
    Taxable : Number(tax).toFixed(2),
    Gross_Amount : Number(Amtbeforetax).toFixed(2),
   // Gross_Amount : Number(Gross_Amount).toFixed(2),
    // Gross_Amount : Number(Number(tax) - Number(Dis_Amount)).toFixed(2),
    SGST_Per : Number(IGST_Amount) ? 0 : Number(SGST_Per).toFixed(2),
    SGST_Amount : Number(SGST_Amount).toFixed(2),
    CGST_Per : Number(IGST_Amount) ? 0 : Number(CGST_Per).toFixed(2),
    CGST_Amount : Number(CGST_Amount).toFixed(2),
    GST_Tax_Per : Number(SGST_Amount) && Number(CGST_Amount) ? 0 : Number(IGST_Per).toFixed(2),
    //GST_Tax_Per_Amt : this.ObjaddbillForm.GST_Tax_Per_Amt,
    GST_Tax_Per_Amt :  Number(IGST_Amount).toFixed(2),
    GST_Tax_Per_forcalcu : Number(IGST_Per).toFixed(2),
    //Net_Amount : Number(Gross_Amount + SGST_Amount + CGST_Amount).toFixed(2)
    Net_Amount : Number(ntamt).toFixed(2),
    Taxable_Amount : Number(Amtbeforetax).toFixed(3),
    CGST_Output_Ledger_ID : this.CGST_Ledger_Id,
    SGST_Output_Ledger_ID : this.SGST_Ledger_Id,
    IGST_Output_Ledger_ID : this.IGST_Ledger_Id
  };
  this.productSubmit.push(productObj);

  // var sameProdTypeFlag = false;
  // this.productSubmit.forEach(item => {
  //   //console.log('enter select');
  //   //console.log(item.Product_ID);
  //   //console.log(this.ObjaddbillForm.Product_ID);
  //   //console.log(item.Product_ID == this.ObjaddbillForm.Product_ID);
  //   if(item.Product_ID == this.ObjaddbillForm.Product_ID && item.Modifier == this.ObjaddbillForm.Modifier) {
  //     //console.log('select item true');
  //     item.Stock_Qty = Number(item.Stock_Qty) + Number( productObj.Stock_Qty);
  //     item.Max_Discount = Number(item.Max_Discount) + Number(productObj.Max_Discount);
  //     item.Amount = Number(item.Amount) + Number(productObj.Amount);
  //     item.Gross_Amount = Number(item.Gross_Amount) + Number(productObj.Gross_Amount);
  //     item.Dis_Amount = Number(item.Dis_Amount) + Number(productObj.Dis_Amount);
  //     item.SGST_Amount = (Number(item.SGST_Amount) + Number(productObj.SGST_Amount)).toFixed(2);
  //     item.CGST_Amount = (Number(item.CGST_Amount) + Number(productObj.CGST_Amount)).toFixed(2);
  //     item.Net_Amount = (Number(item.Net_Amount) + Number(productObj.Net_Amount)).toFixed(2);

  //     sameProdTypeFlag = true;
  //   }
  //   // count = count + Number(item.Net_Amount);
  // });

  // if(this.sameProdTypeFlag == false) {
  //  this.productSubmit.push(productObj);
  // }

 // console.log("this.productSubmit",this.productSubmit);
  this.Batch_NO = [];
  const selectedCostCenter = this.ObjaddbillForm.selectitem;
  const tempBackup = this.ObjaddbillForm;
  this.ObjaddbillForm = new addbillForm();
  this.ObjaddbillForm.selectitem = selectedCostCenter;
  this.ObjaddbillForm.Advance = tempBackup.Advance ? tempBackup.Advance : '';
  this.ObjaddbillForm.Order_Date = tempBackup.Order_Date;
  this.ObjaddbillForm.Ledger_Name = tempBackup.Ledger_Name ? tempBackup.Ledger_Name : '';
  this.getselectitem();
  this.addbillFormSubmitted = false;
  this.CalculateTotalAmt();
  this.listofamount();
  // if(this.ProductType != "PACKAGING") {
  //   if (this.isservice != true) {
  //    this.CalculateDiscount();
  //   }
  // }
  if(this.ObjcashForm.Credit_To_Amount) {
    if(this.ProductType != "PACKAGING") {
      if (this.isservice != true) {
       this.CalculateDiscount();
       if (this.ObjcashForm.Coupon_Per ) { 
        this.couponperchange();
      }
      }
    }
    }
  this.ProductType = undefined;
  this.isservice = undefined;
  //this.clearData();

  // this.Product2.applyFocus()
  // this.Product2.containerViewChild.nativeElement.click();
  }
}
GetSelectedBatchqty () {
  const sameproductwithbatch = this.productSubmit.filter(item=> item.Batch_No === this.ObjaddbillForm.Batch_No && item.Product_ID === this.ObjaddbillForm.Product_ID );
  if(sameproductwithbatch.length) {
    this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Product with same batch no. detected."
        });
    return false;
  }
  const baychqtyarr = this.Batch_NO.filter(item=> item.Batch_NO === this.ObjaddbillForm.Batch_No);
    if(baychqtyarr.length) {
      if(this.ObjaddbillForm.Stock_Qty <=  baychqtyarr[0].Qty) {
        return true;
      } else {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Quantity can't be more than in batch available quantity "
        });
        return false;
      }
    } else {
      return true;
    }
  }
  delete(index) {
    this.productSubmit.splice(index,1)
    this.CalculateTotalAmt();
    this.listofamount();
    // if(this.ProductType != "PACKAGING") {
    //   if (this.isservice != true) {
    //    this.CalculateDiscount();
    //   }
    // }
    if(this.ObjcashForm.Credit_To_Amount) {
      if(this.ProductType != "PACKAGING") {
        if (this.isservice != true) {
         this.CalculateDiscount();
         if (this.ObjcashForm.Coupon_Per ) { 
          this.couponperchange();
        }
        }
      }
      }
    // this.ObjcashForm.Coupon_Per = 0;
  
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
    //this.Adv = this.IsAdvance ? this.Adv : 0;
    this.Adv = this.Adv ? this.Adv : 0;
    this.Net_Payable = Number((this.Amount_Payable) - Number(this.Adv)).toFixed(2);
    //var creditamt = 0;
    //if(this.QueryStringObj && this.QueryStringObj.Txn_ID){
      if(this.CustumerName == "SWIGGY" || this.CustumerName == "ZOMATO"){
      //this.ObjcashForm.Credit_To_Amount = creditamt;
      this.ObjcashForm.Wallet_Amount = this.Net_Payable;
      this.ObjcashForm.Total_Paid = this.Net_Payable;
      this.ObjcashForm.Refund_Amount = this.ObjcashForm.Total_Paid - this.Net_Payable;
      this.ObjcashForm.Due_Amount = Number(this.ObjcashForm.Total_Paid) - Number(this.ObjcashForm.Refund_Amount) - Number(this.Net_Payable);
    }
    //console.log(this.Round_Off)
    this.AmountChange();
  }
  cleartotalamount(){
    this.Total = [];
    this.Round_Off = [];
    this.Amount_Payable = [];
    this.Adv = 0;
    this.Net_Payable = [];
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
    this.TotalTaxable = undefined;
    let count6 = 0;
    this.withoutdisamt = undefined;
    let count7 = 0;
    this.taxb4disamt = undefined;
    let count8 = 0;
  
    this.productSubmit.forEach(item => {
      count = count + Number(item.Amount);
      if (item.product_type != "PACKAGING") {
        if (item.is_service != true) {
           count7 = count7 + Number(item.Amount);
           count8 = count8 + Number(item.Amount_berore_Tax);
        }
      }
      count1 = count1 + Number(item.Dis_Amount);
      //count2 = count2 + Number(item.Gross_Amount);
      // count2 = count2 + Number(item.Taxable - item.Dis_Amount)
      count3 = count3 + Number(item.SGST_Amount);
      count4 = count4 + Number(item.CGST_Amount);
      count5 = count5 + Number(item.GST_Tax_Per_Amt);
      count6 = count6 + Number(item.Taxable);
    });
    this.Amount = (count).toFixed(2);
    this.withoutdisamt = (count7).toFixed(2);
    this.taxb4disamt = (count8).toFixed(2);
    this.Dis_Amount = (count1).toFixed(2);
    this.TotalTaxable = (count6).toFixed(3);
    this.Gross_Amount = (count8).toFixed(2);
    //this.Gross_Amount = (Number(this.TotalTaxable) - Number(this.Dis_Amount)).toFixed(2);
    // this.Gross_Amount = (count2).toFixed(2);
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
    this.TotalTaxable = [];
  }
  
  AmountChange(){
    //console.log("called");
    //var coupon_per = this.ObjcashForm.Coupon_Per ? this.ObjcashForm.Coupon_Per : 0;
    var credit_amount = this.ObjcashForm.Credit_To_Amount ? this.ObjcashForm.Credit_To_Amount : 0;
    var wallet_amount = this.ObjcashForm.Wallet_Amount ? this.ObjcashForm.Wallet_Amount : 0;
    var cash_amount = this.ObjcashForm.Cash_Amount ? this.ObjcashForm.Cash_Amount : 0 ;
    var card_amount = this.ObjcashForm.Card_Amount ? this.ObjcashForm.Card_Amount : 0;
  
    //if (this.ObjcashForm.Coupon_Per ) { 
      // credit_amount = Number(this.Net_Payable) * Number(this.ObjcashForm.Coupon_Per ) / 100;
      // this.ObjcashForm.Credit_To_Amount = (credit_amount).toFixed(2);
      // this.ObjcashForm.Total_Paid = (Number(this.ObjcashForm.Credit_To_Amount) + Number(wallet_amount) + Number(cash_amount) + Number(card_amount)).toFixed(2);
    //} else //if (!this.ObjcashForm.Coupon_Per) {
      //this.ObjcashForm.Credit_To_Amount = null;
      //this.ObjcashForm.Total_Paid = null;
      this.ObjcashForm.Total_Paid = (Number(wallet_amount) + Number(cash_amount) + Number(card_amount)).toFixed(2);
    //}
     if(Number(this.Net_Payable) < this.ObjcashForm.Total_Paid){
       this.ObjcashForm.Refund_Amount = (Number(this.ObjcashForm.Total_Paid) - Number(this.Net_Payable)).toFixed(2);
     }
     else {
      this.ObjcashForm.Refund_Amount = 0 ;
     }
    // if(Number(this.ObjcashForm.Total_Paid) < Number(this.Net_Payable)){
    // this.ObjcashForm.Due_Amount = Number(this.Net_Payable) - Number(this.ObjcashForm.Total_Paid) - Number(this.ObjcashForm.Refund_Amount);
    // }
    // else {
      this.ObjcashForm.Due_Amount = (Number(this.ObjcashForm.Total_Paid) - Number(this.ObjcashForm.Refund_Amount) - Number(this.Net_Payable)).toFixed(2);
    //}
  }
  couponperchange(){
    var credit_amount = this.ObjcashForm.Credit_To_Amount ? this.ObjcashForm.Credit_To_Amount : 0;
    var wallet_amount = this.ObjcashForm.Wallet_Amount ? this.ObjcashForm.Wallet_Amount : 0;
    var cash_amount = this.ObjcashForm.Cash_Amount ? this.ObjcashForm.Cash_Amount : 0 ;
    var card_amount = this.ObjcashForm.Card_Amount ? this.ObjcashForm.Card_Amount : 0;
    if (this.ObjcashForm.Coupon_Per ) { 
      //credit_amount = Number(this.Net_Payable) * Number(this.ObjcashForm.Coupon_Per ) / 100;
      credit_amount = Number(this.taxb4disamt) * Number(this.ObjcashForm.Coupon_Per ) / 100;
      this.ObjcashForm.Credit_To_Amount = Number(credit_amount).toFixed(2);
      this.ObjcashForm.Total_Paid = (Number(wallet_amount) + Number(cash_amount) + Number(card_amount)).toFixed(2);
      this.CalculateDiscount();
    } else if (!this.ObjcashForm.Coupon_Per) {
      this.ObjcashForm.Credit_To_Amount = 0;
      //this.ObjcashForm.Total_Paid = null;
      this.ObjcashForm.Total_Paid = (Number(wallet_amount) + Number(cash_amount) + Number(card_amount)).toFixed(2);
      this.CalculateDiscount();
     }
  }
  CalculateDiscount(){
    if (this.ObjcashForm.Credit_To_Amount){
      this.ObjcashForm.Credit_To_Amount = Number(this.ObjcashForm.Credit_To_Amount);
      console.log("discount amt",this.ObjcashForm.Credit_To_Amount)
      var damt;
      var netamount;
      let countnum = 0;
      this.productSubmit.forEach(el=>{ 
        // var taxableamt = el.Net_Price * el.Stock_Qty;
        // el.Taxable = Number(taxableamt);
        this.listofamount();
        if(el.product_type != "PACKAGING") {
        if (el.is_service != true) {
        //damt = Number((el.Taxable / this.TotalTaxable) * this.ObjcashForm.Credit_To_Amount);
        damt = Number((Number(el.Amount_berore_Tax) / Number(this.taxb4disamt)) * Number(this.ObjcashForm.Credit_To_Amount));
        el.Dis_Amount = Number(damt).toFixed(2);
        var da = el.Dis_Amount;
        //var grossamt = Number(Number(el.Amount_berore_Tax) - Number(el.Dis_Amount));
        //var amt = (Number(el.Amount) - Number(da)).toFixed(2);
        var sgstperamt = (Number(((Number(el.Amount_berore_Tax) - Number(da)) * Number(el.SGST_Per)) / 100)).toFixed(2);
        var cgstperamt = (Number(((Number(el.Amount_berore_Tax) - Number(da)) * Number(el.CGST_Per)) / 100)).toFixed(2);
        var igstperamt = (Number(((Number(el.Amount_berore_Tax) - Number(da)) * Number(el.GST_Tax_Per)) / 100)).toFixed(2);
        //var sub = Number((el.Taxable - el.Dis_Amount)).toFixed(2);
        // netamount = Number((Number(el.Taxable) - Number(da)) + Number(sgstperamt) + Number(cgstperamt));
        // var sgstperamt = Number((Number(amt) * Number(el.SGST_Per)) / Number(Number(el.GST_Tax_Per_forcalcu) + 100)).toFixed(2);
        // var cgstperamt = Number((Number(amt) * Number(el.CGST_Per)) / Number(Number(el.GST_Tax_Per_forcalcu) + 100)).toFixed(2);
        // var igstperamt = Number((Number(amt) * Number(el.GST_Tax_Per)) / Number(Number(el.GST_Tax_Per_forcalcu) + 100)).toFixed(2);
        var totalgstamt = Number(igstperamt) ? (Number(sgstperamt) + Number(cgstperamt) + Number(igstperamt)).toFixed(2) : (Number(sgstperamt) + Number(cgstperamt)).toFixed(2);
        var taxamount = Number(Number(el.Amount_berore_Tax) - Number(da)).toFixed(2);
        netamount = Number(Number(taxamount) + Number(totalgstamt)).toFixed(2);
        //this.Dis_Amount = undefined;
  
      //  el.Gross_Amount = Number(grossamt).toFixed(2);
       el.SGST_Amount = Number(sgstperamt).toFixed(2);
       el.CGST_Amount = Number(cgstperamt).toFixed(2);
       el.Taxable = Number(taxamount).toFixed(2);
      // el.Net_Amount = Number(netamount).toFixed(2);
       el.Net_Amount = Number(el.Delivery_Charge) ? (Number(netamount) + Number(el.Delivery_Charge)).toFixed(2) : Number(netamount).toFixed(2);
       countnum = countnum + Number(el.Dis_Amount);
      }
      }
      })
      this.Dis_Amount = (countnum).toFixed(2);
      this.CalculateTotalAmt();
      this.listofamount();
      this.checkdiscountamt();
     } else {
      this.productSubmit.forEach(el=>{
        //var netamount2 = el.Taxable + el.SGST_Amount + el.CGST_Amount;
        // var taxableamt = el.Net_Price * el.Stock_Qty;
        // el.Taxable = Number(taxableamt);
        el.Dis_Amount = 0 ;
        // el.Gross_Amount = Number(Number(el.Amount_berore_Tax) - Number(el.Dis_Amount)).toFixed(2);
        el.SGST_Amount = Number((Number(el.Amount_berore_Tax) * Number(el.SGST_Per)) / 100).toFixed(2); 
        el.CGST_Amount = Number((Number(el.Amount_berore_Tax) * Number(el.CGST_Per)) / 100).toFixed(2);
        el.GST_Tax_Per_Amt = Number((Number(el.Amount_berore_Tax) * Number(el.GST_Tax_Per)) / 100).toFixed(2);
        // el.SGST_Amount = Number((Number(el.Amount) * Number(el.SGST_Per)) / Number(Number(el.GST_Tax_Per_forcalcu) + 100)).toFixed(2); 
        // el.CGST_Amount = Number((Number(el.Amount) * Number(el.CGST_Per)) / Number(Number(el.GST_Tax_Per_forcalcu) + 100)).toFixed(2);
        // el.GST_Tax_Per_Amt = Number((Number(el.Amount) * Number(el.GST_Tax_Per)) / Number(Number(el.GST_Tax_Per_forcalcu) + 100)).toFixed(2);
        var totalgstamt = Number(el.GST_Tax_Per_Amt) ? (Number(el.SGST_Amount) + Number(el.CGST_Amount) + Number(el.GST_Tax_Per_Amt)).toFixed(2) : (Number(el.SGST_Amount) + Number(el.CGST_Amount)).toFixed(2);
        el.Taxable = Number(Number(el.Amount_berore_Tax) - Number(el.Dis_Amount)).toFixed(2); //- Number(totalgstamt)).toFixed(2);
        //  el.Net_Amount = (Number(el.Taxable) + Number(el.SGST_Amount) + Number(el.CGST_Amount)).toFixed(2);
        el.Net_Amount = Number(el.Delivery_Charge) ? (Number(el.Delivery_Charge) + Number(el.Taxable) + Number(totalgstamt)).toFixed(2) :
                      (Number(el.Taxable) + Number(totalgstamt)).toFixed(2);
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
      if (el.is_service != true) {
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
          el.Taxable = Number(Number(el.Amount_berore_Tax) - Number(el.Dis_Amount)).toFixed(2); // - Number(togstamt)).toFixed(2);
      
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
          el.SGST_Amount = Number(sgstamt).toFixed(2);;
      
          var cgstamt = Number(((Number(el.Amount_berore_Tax) - Number(el.Dis_Amount)) * Number(el.CGST_Per)) / 100);
          el.CGST_Amount = Number(cgstamt).toFixed(2);

          var igstamt = Number(((Number(el.Amount_berore_Tax) - Number(el.Dis_Amount)) * Number(el.GST_Tax_Per)) / 100);
          el.GST_Tax_Per_Amt = Number(igstamt).toFixed(2);

          var togstamt = Number(el.GST_Tax_Per_Amt) ? (Number(el.SGST_Amount) + Number(el.CGST_Amount) + Number(el.GST_Tax_Per_Amt)).toFixed(2) : (Number(el.SGST_Amount) + Number(el.CGST_Amount)).toFixed(2);
          el.Taxable = Number((Number(el.Amount) - Number(el.Dis_Amount)) - Number(togstamt)).toFixed(2);
      
          var netamt = Number(Number(el.Taxable) + Number(togstamt)).toFixed(2);
          el.Net_Amount = Number(el.Delivery_Charge) ? (Number(netamt) + Number(el.Delivery_Charge)).toFixed(2) : Number(netamt).toFixed(2);
          console.log('leftval',leftval)
          console.log('Dis_Amount',el.Dis_Amount)
          this.listofamount();
        }
      }
    }
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
    //console.log("this.ObjcashForm.Card_Ac",this.productSubmit);
    if(this.productSubmit.length) {
      let tempArr:any =[]
      this.productSubmit.forEach(item => {
        if (Number(item.Amount_berore_Tax) && Number(item.Amount_berore_Tax) != 0) {
          this.Objcustomerdetail.Doc_Date = this.DateService.dateConvert(new Date(this.myDate))
        const obj = {
            Product_ID : item.Product_ID,
            Product_Description : item.Product_Description,
            Product_Modifier : item.Modifier,
            Product_Type : item.product_type,
            Is_Service : item.is_service,
            Rate : item.Net_Price,
            Delivery_Charge : item.Delivery_Charge,
            Batch_No : item.Batch_No,
            Qty : item.Stock_Qty,
            Taxable : item.Amount_berore_Tax,
            Amount : item.Amount,
            Discount_Per : item.Max_Discount,
            Discount_Amt : item.Dis_Amount,
            Gross_Amt : item.Amount_berore_Tax,
            SGST_Per : item.SGST_Per,
            SGST_Amt : item.SGST_Amount,
            CGST_Per : item.CGST_Per,
            CGST_Amt : item.CGST_Amount,
            IGST_Per : item.GST_Tax_Per,
            IGST_Amt : item.GST_Tax_Per_Amt,
            Net_Amount : item.Net_Amount,
            Taxable_Amount : item.Amount_berore_Tax,
            CGST_OUTPUT_LEDGER_ID : item.CGST_Output_Ledger_ID,
            SGST_OUTPUT_LEDGER_ID : item.SGST_Output_Ledger_ID,
            IGST_OUTPUT_LEDGER_ID : item.IGST_Output_Ledger_ID,
        }
  
      const TempObj = {
        Created_By : this.Created_By ? this.Created_By : this.$CompacctAPI.CompacctCookies.User_ID,
        Foot_Fall_ID : this.Objcustomerdetail.Foot_Fall_ID,
        Bill_Date : this.DateService.dateConvert(new Date(this.myDate)),
        //Doc_No : this.ObjaddbillForm.Doc_No,
        Doc_No : this.Objcustomerdetail.Bill_No ?  this.Objcustomerdetail.Bill_No : "A",
        Cost_Cent_ID : this.rowCostcenter,
        //Adv_Order_No : this.ObjaddbillForm.Advance,
        Rounded_Off : this.Round_Off,
        Amount_Payable : this.Amount_Payable,
        Advance : this.Adv,
        Net_Payable : this.Net_Payable,
        Hold_Bill  : this.Hold_Bill_Flag ? "Y" : "N",
        Order_Txn_ID : 0,
        Adv_Order_No : this.Online_Order_No ? "" : this.ObjaddbillForm.Advance ,
        Online_Order_No : this.Online_Order_No ? this.Online_Order_No : null,
        Online_Order_Date : this.Online_Order_Date ? this.DateService.dateConvert(new Date(this.Online_Order_Date)) : null,

        Total_CGST_Amt : this.CGST_Amount,
        Total_SGST_Amt : this.SGST_Amount,
        Total_IGST_Amt : this.GST_Tax_Per_Amt,
        Bill_Gross_Amt : this.TotalTaxable,
        Total_Taxable : this.TotalTaxable,
        Bill_No : this.Objcustomerdetail.Bill_No,
        Doc_Number : "A",
        // Doc_Date : this.DateService.dateConvert(new Date(this.myDate)),
        User_ID : this.Created_By ? this.Created_By : this.$CompacctAPI.CompacctCookies.User_ID,
        Fin_Year_ID : Number(this.$CompacctAPI.CompacctCookies.Fin_Year_ID),
  
      }
      tempArr.push({...obj,...TempObj,...this.Objcustomerdetail,...this.ObjcashForm})
    } else {
            this.Spinner = false;
          this.ngxService.stop();
        this.compacctToast.clear();
        this.compacctToast.add({
           key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Error in Taxable amount"
        });
    }
    });
   // console.log("save bill =" , tempArr)
    return JSON.stringify(tempArr);
    }
  
  }
  // save(){
  //   this.productSubmit.forEach(item => {
  //     if (Number(item.Taxable) && Number(item.Taxable) != 0) {
  //       this.saveprintAndUpdate();
  //     } else {
  //       this.Spinner = false;
  //     this.ngxService.stop();
  //   this.compacctToast.clear();
  //   this.compacctToast.add({
  //      key: "compacct-toast",
  //     severity: "error",
  //     summary: "Warn Message",
  //     detail: "Error in Taxable amount"
  //   });
  //     }
      
  //   })
  // }
  saveprintAndUpdate(){
    this.SavePrintFormSubmitted = true;
    this.ngxService.start();
    if(this.checkLockDate(this.DateService.dateConvert(new Date(this.myDate)))) {
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
    if(this.buttonname != "Hold Bill"){
    if(this.ObjcashForm.Total_Paid - this.ObjcashForm.Refund_Amount != this.Net_Payable){
      this.Spinner = false;
      this.ngxService.stop();
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: "Collected Amount is not equal to net payable "
    });
    return false;
  }
  
    if((!this.ObjcashForm.Wallet_Ac_ID && this.ObjcashForm.Wallet_Amount) ||
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
    if((!this.ObjcashForm.Credit_To_Ac_ID && this.ObjcashForm.Credit_To_Amount) ||
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
    // this.productSubmit.forEach(item => {
    //   if (Number(item.Taxable) && Number(item.Taxable) != 0) {
     const obj = {
      "SP_String": "SP_Controller_Master",
      "Report_Name_String" : "Add Outlet Transaction Sale Bill",
     "Json_Param_String": this.getDataForSaveEdit()
  
    }
    this.GlobalAPI.postData(obj).subscribe((data:any)=>{
      //console.log(data);
      var tempID = data[0].Column1;
      this.Objcustomerdetail.Bill_No = data[0].Column1;
      if(data[0].Column1){
        if (this.FranchiseBill != "Y") {
          this.SaveFranSaleBill();
          //this.SaveNPrintBill();
        } else {
          this.compacctToast.clear();
        const mgs = this.buttonname === 'Save & Print Bill' ? "Created" : "updated";
        this.compacctToast.add({
         key: "compacct-toast",
         severity: "success",
         summary: "Sale_Bill_ID  " + tempID,
         detail: "Succesfully " + mgs
       });
       this.productSubmit =[];
       this.clearlistamount();
       this.cleartotalamount();
      // this.SaveNPrintBill();
       this.clearData();
       this.tabIndexToView = 0;
       this.GetSearchedlist();
       this.GetGridData();
      // this.router.navigate(['./POS_BIll_Order']);
        }
        var billdate = new Date(this.BillDate);
        var cacelcilldate = new Date(this.canbilldate);
        if(billdate.toISOString() === cacelcilldate.toISOString()){
          this.InsertStock();
      }
      //   this.compacctToast.clear();
      //   const mgs = this.buttonname === 'Save & Print Bill' ? "Created" : "updated";
      //   this.compacctToast.add({
      //    key: "compacct-toast",
      //    severity: "success",
      //    summary: "Sale_Bill_ID  " + tempID,
      //    detail: "Succesfully " + mgs
      //  });
      //  this.tabIndexToView = 0;
      //  this.GetSearchedlist();
  
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
  //   })
  // } else{
  //   this.Spinner = false;
  //   this.ngxService.stop();
  //   this.compacctToast.clear();
  //   this.compacctToast.add({
  //     key: "compacct-toast",
  //     severity: "error",
  //     summary: "Warn Message",
  //     detail: "Error in Taxable amount "
  //   });
  // }
}) 
  // } else{
  //   this.compacctToast.clear();
  //   this.compacctToast.add({
  //     key: "compacct-toast",
  //     severity: "error",
  //     summary: "Warn Message",
  //     detail: "Collected Amount is not equal to net payable "
  //   });
  // }
    // this.clearData();
    // this.productSubmit =[];
    // this.clearlistamount();
    // this.cleartotalamount();
  }
  }
  SaveFranSaleBill(){
    let reportname = "";
    if (this.CustumerName == "SWIGGY" || this.CustumerName == "ZOMATO") {
      reportname = "Save_Swiggy_Zomato_POS_Sale_Bill"
    } 
    else {
      reportname = "Save_POS_Sale_Bill"
    }
    // this.productSubmit.forEach(item => {
    //   if (Number(item.Taxable) && Number(item.Taxable) != 0) {
        
    const obj = {
      "SP_String" : "SP_POS_Sale_Bill",
      "Report_Name_String" : reportname,
      "Json_Param_String" : this.getDataForSaveEdit()
  
    }
    this.GlobalAPI.postData(obj).subscribe((data:any)=>{
      //console.log(data);
      var tempID = data[0].Column1;
      console.log("After Save",tempID);
     // this.Objproduction.Doc_No = data[0].Column1;
      if(data[0].Column1){
       // this.ngxService.stop();
        this.compacctToast.clear();
        const mgs = this.buttonname === 'Save & Print Bill' ? "Created" : "updated";
        this.compacctToast.add({
             key: "compacct-toast",
             severity: "success",
             summary: "Sale_Bill_ID  " + tempID,
             detail: "Succesfully " + mgs
           });
       this.tabIndexToView = 0;
       this.GetSearchedlist();
       this.GetGridData();
       this.productSubmit =[];
       this.clearlistamount();
       this.cleartotalamount();
       //this.saveprintAndUpdate();
       this.clearData();
       //this.router.navigate(['./POS_BIll_Order']);
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
  //   })
  // } else{
  //   this.Spinner = false;
  //   this.ngxService.stop();
  //   this.compacctToast.clear();
  //   this.compacctToast.add({
  //     key: "compacct-toast",
  //     severity: "error",
  //     summary: "Warn Message",
  //     detail: "Error in Taxable amount "
  //   });
  // }
  })
  }
  SaleBillPrint(obj) {
    //console.log("billno ===", true)
    if (obj.Bill_No) {
      window.open("/Report/Crystal_Files/Finance/SaleBill/Sale_Bill_GST_K4C.aspx?Doc_No=" + obj.Bill_No, 'mywindow', 'fullscreen=yes, scrollbars=auto,width=950,height=500'
  
      );
    }
  }
  
  clearData(){
    this.ObjaddbillForm = new addbillForm();
    this.ObjcashForm = new cashForm();
    this.Objcustomerdetail = new customerdetail();
    this.ObjaddbillForm.selectitem = this.rowCostcenter;
   // this.Browseroutlet = this.$CompacctAPI.CompacctCookies.Cost_Cen_ID;
    //if(this.$CompacctAPI.CompacctCookies.User_Type == 'U'){
    //  this.ObjaddbillForm.Browseroutlet = this.returnedID.length === 1 ? this.returnedID[0].Cost_Cen_ID : undefined;
    //  }
    this.addbillFormSubmitted = false;
    this.SavePrintFormSubmitted = false;
    this.seachSpinner = false;
    this.Spinner = false;
    this.ngxService.stop();
    this.getbilldate();
    this.Hold_Bill_Flag = false;
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
  // CREATE END
  RedirectTo (obj){
    const navigationExtras: NavigationExtras = {
      queryParams: obj,
    };
    this.router.navigate([obj.Redirect_To], navigationExtras);
  }
  //K4C DIAGNOSIS
  getDateRangediagnosis(dateRangeObj: any) {
    if (dateRangeObj.length) {
      this.From_Date = dateRangeObj[0];
      this.To_Date = dateRangeObj[1];
    }
  }
  GetCostCenter() {
    const obj = {
      "SP_String": "SP_Controller_Master",
      "Report_Name_String": "Get - Cost Center Name All",
      "Json_Param_String": JSON.stringify([{User_ID:this.$CompacctAPI.CompacctCookies.User_ID}])
    }
    this.GlobalAPI.postData(obj).subscribe((data: any) => {
      // console.log('report Names', data);
      this.CostCenterList = data;
    });
  }

  GetGridData(){
    this.GridList = [];
    this.GridListHeader = [];
    this.seachSpinner = true;
    const start = this.From_Date
    ? this.DateService.dateConvert(new Date(this.From_Date))
    : this.DateService.dateConvert(new Date());
    const end = this.To_Date
    ? this.DateService.dateConvert(new Date(this.To_Date))
    : this.DateService.dateConvert(new Date());
    const senddata = {
      From_Date : start,
      To_Date : end,
      Cost_Cen_ID : this.Cost_Cen_ID ? this.Cost_Cen_ID : 0
    }
    const obj = {
      "SP_String": "SP_Add_ON",
      "Report_Name_String": "Get_K4C_Diagnosis_POS_Bill",
      "Json_Param_String": JSON.stringify([senddata])
    }
    this.GlobalAPI.getData(obj).subscribe((data:any)=>{
      this.GridList = data;
      this.GridListHeader = data.length ? Object.keys(data[0]): []
      this.seachSpinner = false;
      //  console.log("GridList ===",this.GridList);
    })
  } 
  editdiagnosismaster(eROW){
    //console.log("editmaster",eROW);
      this.clearData();
      this.canbilldate = "";
      this.rowCostcenter = "";
      this.Created_By = undefined;
      if(eROW.Bill_No){
      if(this.checkLockDate(eROW.Bill_Date)){
        this.ngxService.start();
      this.Objcustomerdetail.Bill_No = eROW.Bill_No;
      this.canbilldate = new Date(eROW.Bill_Date);
      // this.rowCostcenter = eROW.Cost_Cent_ID;
      // this.ObjaddbillForm.selectitem = this.rowCostcenter;
      // this.autoaFranchiseBill();
      // this.CustumerName = eROW.Customer_Name;
      //this.Browsetab = false;
      this.items = ["BROWSE","UPDATE","DIAGNOSIS"];
      this.buttonname = "Update";
       //console.log("this.EditDoc_No ", this.Objcustomerdetail.Bill_No );
      // this.GetProductTypeFilterList();
      // this.getselectitem();
      // if (this.CustumerName == "SWIGGY" || this.CustumerName == "ZOMATO") {
      //   this.getonlinewalletlist();
      // } else {
      //   this.getwalletamount();
      // }
      this.geteditdiagnosismaster(this.Objcustomerdetail.Bill_No);
      //this.getadvorderdetails(this.Objcustomerdetail.Bill_No);
      }
      }
  }
  geteditdiagnosismaster(Bill_No){
    //console.log("Doc_No",Bill_No);
    const obj = {
      "SP_String": "SP_Controller_Master",
      "Report_Name_String": "Get Outlet Bill Details For Edit",
      "Json_Param_String": JSON.stringify([{Doc_No : this.Objcustomerdetail.Bill_No}])
  
    }
    this.GlobalAPI.getData(obj).subscribe((data:any)=>{
      this.editList = data;
      this.rowCostcenter = data[0].Cost_Cent_ID;
      this.ObjaddbillForm.selectitem = data[0].Cost_Cent_ID;
      this.autoaFranchiseBill();
      this.GetProductTypeFilterList();
      this.getselectitem();
      this.CustumerName = data[0].Wallet_Ac;
      if(this.CustumerName === "SWIGGY" || this.CustumerName === "ZOMATO") {
        this.getonlinewalletlist();
      } else {
        this.getwalletamount();
      }
      this.ObjaddbillForm.Advance = data[0].Online_Order_No ? data[0].Online_Order_No : data[0].Adv_Order_No;
      this.Online_Order_No = data[0].Online_Order_No;
      this.Online_Order_Date = data[0].Online_Order_Date ? new Date(data[0].Online_Order_Date) : null;
      this.Objcustomerdetail.Costomer_Mobile = data[0].Costomer_Mobile;
      this.Objcustomerdetail.Customer_Name= data[0].Customer_Name;
      // this.Objcustomerdetail.Customer_DOB = data[0].Customer_DOB;
      // this.Objcustomerdetail.Customer_Anni= data[0].Customer_Anni;
      this.Objcustomerdetail.Customer_DOB = data[0].Customer_DOB ? this.DateService.dateConvert(data[0].Customer_DOB) : undefined;
      this.Objcustomerdetail.Customer_Anni= data[0].Customer_Anni ? this.DateService.dateConvert(data[0].Customer_Anni) : undefined;
      this.Objcustomerdetail.Customer_GST = data[0].Customer_GST;
      this.Objcustomerdetail.Bill_Remarks = data[0].Bill_Remarks;
      this.Objcustomerdetail.Cuppon_No = data[0].Cuppon_No;
      this.Objcustomerdetail.Cuppon_OTP = data[0].Cuppon_OTP;
      this.Created_By = data[0].Created_By;
  
      data.forEach(element => {
      const  productObj = {
          Product_ID : element.Product_ID,
          Product_Description : element.Product_Description,
          Modifier : element.Product_Modifier,
          product_type : element.Product_Type,
          is_service : element.Is_Service,
          Net_Price : Number(element.Rate),
          Delivery_Charge : Number(element.Delivery_Charge),
          Batch_No : element.Batch_No,
          Stock_Qty :  Number(element.Qty),
          Amount : Number(element.Amount).toFixed(2),
          Amount_berore_Tax : Number(element.Taxable).toFixed(2),
          Max_Discount : Number(element.Discount_Per),
          Dis_Amount : Number(element.Discount_Amt).toFixed(2),
          Taxable : Number(Number(element.Taxable) - Number(element.Discount_Amt)).toFixed(2),
          Gross_Amount : Number(element.Taxable).toFixed(2),
          SGST_Per : Number(element.SGST_Per).toFixed(2),
          SGST_Amount : Number(element.SGST_Amt).toFixed(2),
          CGST_Per : Number(element.CGST_Per).toFixed(2),
          CGST_Amount : Number(element.CGST_Amt).toFixed(2),
          GST_Tax_Per : Number(element.IGST_Per),
          GST_Tax_Per_forcalcu : Number(element.IGST_Per),
          GST_Tax_Per_Amt : element.IGST_Amt,
          Net_Amount : Number(element.Net_Amount).toFixed(2),
          Taxable_Amount : Number(element.Taxable),
          CGST_Output_Ledger_ID : Number(element.CGST_Output_Ledger_ID),
          SGST_Output_Ledger_ID : Number(element.SGST_Output_Ledger_ID),
          IGST_Output_Ledger_ID : Number(element.IGST_Output_Ledger_ID),
        };
  
        this.productSubmit.push(productObj);
      });
      //this.QueryStringObj && this.QueryStringObj.Txn_ID
      // if(data[0].Txn_ID){
      //   this.getwalletamount();
      //   // this.ObjcashForm.Wallet_Ac_ID = data[0].Wallet_Ac_ID ? data[0].Wallet_Ac_ID : undefined;
      //   // this.ObjcashForm.Wallet_Ac = data[0].Wallet_Ac ? data[0].Wallet_Ac : undefined;
      //   this.ObjcashForm.Wallet_Amount = data[0].Wallet_Amount ? data[0].Wallet_Amount : "";
      //   this.ObjcashForm.Credit_To_Ac_ID = data[0].Credit_To_Ac_ID ? data[0].Credit_To_Ac_ID : undefined;
      //   this.ObjcashForm.Credit_To_Ac = data[0].Credit_To_Ac ? data[0].Credit_To_Ac : undefined;
      //   this.ObjcashForm.Credit_To_Amount = data[0].Credit_To_Amount ? data[0].Credit_To_Amount : "";
      // } else {
        if (data[0].Credit_To_Ac_ID) {
          this.ObjcashForm.Credit_To_Ac_ID = data[0].Credit_To_Ac_ID;
          this.ObjcashForm.Credit_To_Ac = data[0].Credit_To_Ac;
          this.ObjcashForm.Credit_To_Amount = data[0].Credit_To_Amount;
          this.creditdisabled = false;
        } else {
          this.ObjcashForm.Credit_To_Ac_ID = undefined;
          this.ObjcashForm.Credit_To_Ac = undefined;
          this.ObjcashForm.Credit_To_Amount = "";
          this.creditdisabled = false;
        }
      // this.ObjcashForm.Credit_To_Ac_ID = data[0].Credit_To_Ac_ID ? data[0].Credit_To_Ac_ID : undefined;
      // this.ObjcashForm.Credit_To_Ac = data[0].Credit_To_Ac ? data[0].Credit_To_Ac : undefined;
      // this.ObjcashForm.Credit_To_Amount = data[0].Credit_To_Amount ? data[0].Credit_To_Amount : "";
      if (data[0].Wallet_Ac_ID) {
        this.ObjcashForm.Wallet_Ac_ID = data[0].Wallet_Ac_ID;
        this.ObjcashForm.Wallet_Ac = data[0].Wallet_Ac;
        this.ObjcashForm.Wallet_Amount = data[0].Wallet_Amount;
        // if (this.CustumerName == "SWIGGY" || this.CustumerName == "ZOMATO") {
        this.walletdisabled = false;
        // } else {
          // this.walletdisabled = true;
        // }
      } else {
        this.ObjcashForm.Wallet_Ac_ID = undefined;
        this.ObjcashForm.Wallet_Ac = undefined;
        this.ObjcashForm.Wallet_Amount = "";
        this.walletdisabled = false;
      }
      // this.ObjcashForm.Wallet_Ac_ID = data[0].Wallet_Ac_ID ? data[0].Wallet_Ac_ID : undefined;
      // this.ObjcashForm.Wallet_Ac = data[0].Wallet_Ac ? data[0].Wallet_Ac : undefined;
      // this.ObjcashForm.Wallet_Amount = data[0].Wallet_Amount ? data[0].Wallet_Amount : "";
      this.ObjcashForm.Cash_Amount = data[0].Cash_Amount ? data[0].Cash_Amount : "";
      this.ObjcashForm.Card_Amount = data[0].Card_Amount ? data[0].Card_Amount : "";
      this.ObjcashForm.Total_Paid = data[0].Total_Paid;
      this.ObjcashForm.Refund_Amount = data[0].Refund_Amount;
      this.ObjcashForm.Due_Amount = data[0].Due_Amount;
  
      this.Objcustomerdetail.Foot_Fall_ID = data[0].Foot_Fall_ID;
      this.Objcustomerdetail.Cost_Cen_ID = data[0].Cost_Cen_ID;
      //this.ObjaddbillForm.Doc_Date = data[0].Order_Date;
      this.Objcustomerdetail.Bill_No = data[0].Bill_No;
      this.myDate = data[0].Bill_Date;
      this.Total = data[0].Net_Amount;
      this.Amount_Payable = data[0].Amount_Payable;
      this.Adv = data[0].Advance;
      this.Round_Off = data[0].Rounded_Off;
  
      this.CalculateTotalAmt();
      this.listofamount();
      setTimeout(()=>{
      this.tabIndexToView = 1;
      this.ngxService.stop();
      },800)
    //console.log("this.editList  ===",data);
   //this.myDate =  new Date(data[0].Column1);
    // on save use this
   // this.ObjRequistion.Req_Date = this.DateService.dateTimeConvert(new Date(this.myDate));
  
  })
  }
  // EditBill(col,val){
  //   // if (val === 'advordertosalebill') {
  //   //   const TempObj = {
  //   //     Redirect_To : './K4C_Outlet_Sale_Bill',
  //   //     Adv_Order_No : col.Adv_Order_No,
  //   //     Del_Cost_Cent_ID : col.Del_Cost_Cent_ID,
  //   //     Edit_from_Border : true
  //   //   }
  //   //   this.RedirectTo(TempObj);
  //   // }
  //   if (val === 'editbill') {
  //     const TempObj = {
  //       Redirect_To : './Bill_Edit_From_Admin',
  //       Bill_No : col.Bill_No,
  //       Edit_Bill : true
  //     }
  //     this.RedirectTo(TempObj);
  //   }
  // }
  


}
class search{
  start_date : string;
  end_date : string;
  Outlet : string;
 }

 class addbillForm{
  Advance : any ;
  selectitem : string;
  Product_ID : string;
  Browseroutlet : any;
  //User_ID : any;
  Doc_Type : any;
  /*Billno : string;
  selectitem : string;
  Qty : string;
 */
  Modifier : string;
  // Modifier1 : string;
  // Modifier2 : string;
  // Modifier3 : string;
  // Modifier4 : string;
  // Modifier5 : string;
  Product_Description : string;
  Net_Price : number;
  Sale_rate: number;
  Batch_No : any;
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
  Order_Date : Date;
  Ledger_Name : string;
}
class cashForm{
  Coupon_Per : number;
  Credit_To_Ac_ID : any;
  Credit_To_Ac : string;
  Credit_To_Amount : any;
  Wallet_Ac_ID : any;
  Wallet_Ac : string;
  Wallet_Amount : any;
  Cash_Amount : number;
  Card_Amount : number;
  Total_Paid : any;
  Refund_Amount : any;
  Due_Amount : any;
}
class customerdetail{
  Costomer_Mobile : number;
  Customer_Name : string;
  Customer_DOB : string;
  Customer_Anni : string;
  Customer_GST : string;
  Bill_Remarks : string;
  Foot_Fall_ID = 0;
  Cost_Cen_ID : number;
  Doc_Date : string;
  //Doc_No = "A" ;
  Bill_No : any;
  Cuppon_No : string;
  Cuppon_OTP : string;

}

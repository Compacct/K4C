import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { MessageService } from "primeng/api";
import { Console } from 'console';
import { CompacctGlobalUrlService } from '../../../../../shared/compacct.global/global.service.service';
import { CompacctHeader } from '../../../../../shared/compacct.services/common.header.service';
import { CompacctGlobalApiService } from '../../../../../shared/compacct.services/compacct.global.api.service';
import { CompacctCommonApi } from '../../../../../shared/compacct.services/common.api.service';
import { DateTimeConvertService } from '../../../../../shared/compacct.global/dateTime.service';
import { ActivatedRoute } from '@angular/router';
import { identity } from 'rxjs';
import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-journal-voucher',
  templateUrl: './journal-voucher.component.html',
  styleUrls: ['./journal-voucher.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class JournalVoucherComponent implements OnInit {
  items:any = [];
  menuList:any = [];
  tabIndexToView = 0;
  buttonname = "Create";
  seachSpinner = false;
  objjournal:journalTopper = new journalTopper();
  objjournalloweer:journalTopper = new journalTopper();
  objsearch:search = new search();
  journalFormSubmitted = false;
  voucherdata = new Date();
  costCentList:any = [];
  costHeadList:any = [];
  NEFTDate = new Date();
  journallowerFormSubmitted = false;
  Spinner = false;
  lowerList:any = [];
  LedgerList:any = [];
  SubLedgerList:any = [];
  LedgerdataList:any = [];
  SubLedgerDataList:any = [];
  SubLedgerDataListlow:any = [];
  SubLedgerListlow:any = [];
  JournalSearchFormSubmit = false;
  initDate:any = [];
  VoucherTypeList:any = [];
  AlljournalData:any = [];
  totalDR:number = 0;
  totalCR:number= 0;
  RefDocDate = new Date();
  VoucherNo = undefined;
  costHeadDataList:any = [];
  projectDataList:any = [];
  DynamicHeader:any = [];
  VoucherTypeID = undefined;
  lockdate:any;

  constructor(
    private $http: HttpClient,
    private urlService: CompacctGlobalUrlService,
    private Header: CompacctHeader,
    private GlobalAPI: CompacctGlobalApiService,
    private DateService: DateTimeConvertService,
    private $CompacctAPI: CompacctCommonApi,
    private compacctToast: MessageService,
    private route: ActivatedRoute,
    private ngxService: NgxUiLoaderService
  ) {
    this.route.queryParams.subscribe(params => {
      console.log("params",params.Voucher_Type_ID);
      this.VoucherTypeID = params.Voucher_Type_ID
      
     })
   }

  ngOnInit() {
    this.items = ["BROWSE", "CREATE"];
    this.menuList = [
      { label: "Edit", icon: "pi pi-fw pi-user-edit" },
      { label: "Delete", icon: "fa fa-fw fa-trash" }
    ];
    this.Header.pushHeader({
      Header: "Journal Voucher",
      Link: "Financial Management --> Transaction -> Journal"
    });
    this.Getledger();
    this.getCostCenter();
    this.getVoucherType();
    this.GetCostHead();
    this.getProject();
    this.getLockDate();
  }
  TabClick(e) {
    this.tabIndexToView = e.index;
    this.items = ["BROWSE", "CREATE"];
    this.buttonname = "Create";
    this.clearData();
  }
  clearData(){
    this.ngxService.stop();
    this.journallowerFormSubmitted = false;
    this.journalFormSubmitted = false;
    this.objjournal = new journalTopper()
    this.getTotalDRCR();
    this.lowerList = [];
    this.RefDocDate = new Date();
    this.voucherdata = new Date();
    this.buttonname = "Create";
    this.seachSpinner = false;
    this.objjournal = new journalTopper();
    this.journalFormSubmitted = false;
    this.VoucherNo = undefined;
    this.objjournal.Cost_Cen_ID_Trn = this.$CompacctAPI.CompacctCookies.Cost_Cen_ID;
    this.objsearch.Cost_Cen_ID = this.$CompacctAPI.CompacctCookies.Cost_Cen_ID;
    this.totalDR = undefined;
    this.totalCR = undefined;
    this.initDate = [new Date(),new Date()];
    this.getCostCenter();
    this.AlljournalData = [];
    this.objsearch.Voucher_Type_ID = undefined
    this.Spinner = false;
  }
  getLockDate(){
    const obj = {
     "SP_String": "sp_Comm_Controller",
     "Report_Name_String": "Get_LockDate"
  
   }
   this.GlobalAPI.getData(obj).subscribe((data:any)=>{
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
         detail: "Can't "+msg+" this document. Transaction locked till "+ this.DateService.dateConvert(new Date (this.lockdate))
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
 
  lowerAdd(valid){
    this.journallowerFormSubmitted = true;
    console.log("valid",valid);
   if(valid){
     let sl = 1
    let LedgerFilter = this.LedgerdataList.filter((el) => el.Ledger_ID == Number(this.objjournalloweer.Ledger_ID));
    let LedgersubFilter = this.SubLedgerDataListlow.filter((el) => el.Sub_Ledger_ID == Number(this.objjournalloweer.Sub_Ledger_ID));
    let costCernterFilter = this.costHeadDataList.filter((el)=>el.Cost_Head_ID === Number(this.objjournalloweer.Cost_Head_ID))
    console.log("this.objjournalloweer.ITC_Eligibility",this.objjournalloweer.ITC_Eligibility);
    this.lowerList.push({
     Slno: this.lowerList.length + 1,
     Ledger_Name : LedgerFilter[0].Ledger_Name,
     Ledger_ID: this.objjournalloweer.Ledger_ID,
     Sub_Ledger_ID : this.objjournalloweer.Sub_Ledger_ID,
     Cost_Head_Name : costCernterFilter.length ? costCernterFilter[0].Cost_Head_Name : "",
     Cost_Head_ID : this.objjournalloweer.Cost_Head_ID,
     Sub_Ledger_Name : LedgersubFilter.length ? LedgersubFilter[0].Sub_Ledger_Name : "",
     Ref_Doc_No : this.objjournalloweer.Ref_Doc_No,
     Ref_Doc_Date : this.objjournalloweer.Ref_Doc_No ?  this.DateService.dateConvert(new Date(this.RefDocDate)) : "01/Jan/1900",
     HSN_NO : this.objjournalloweer.HSN_NO,
     GST_Per : Number(this.objjournalloweer.GST_Per),
     ITC_Eligibility : this.objjournalloweer.ITC_Eligibility ? this.objjournalloweer.ITC_Eligibility : "",
     DR_Amt : this.objjournalloweer.DrCrdata === "DR" ? Number(Number(this.objjournalloweer.Amount).toFixed(2)) : 0,
     CR_Amt : this.objjournalloweer.DrCrdata === "CR" ? Number(Number(this.objjournalloweer.Amount).toFixed(2)) : 0,
     Fin_Year_ID : this.$CompacctAPI.CompacctCookies.Fin_Year_ID,
     Is_Topper: "N"
      })
      console.log("lowerList",this.lowerList)
    this.journallowerFormSubmitted = false;
    this.objjournalloweer = new journalTopper()
    this.getTotalDRCR();
   }

  }
  Getledger() {
    this.LedgerList = [];
    const obj = {
      "SP_String": "sp_Comm_Controller",
      "Report_Name_String": "Get_Master_Accounting_Ledger_Dropdown",   
      
    }
    this.GlobalAPI.getData(obj).subscribe((data:any)=>{
      // console.log(data);
      this.LedgerdataList = data ;
      console.log("LedgerList",this.LedgerdataList);
        this.LedgerdataList.forEach(el => {
          this.LedgerList.push({
            label: el.Ledger_Name,
            value: el.Ledger_ID
          });
         
        });
        
    })
 
  }
 getsubLedgertop(id,subID?){
  if(id){
    this.SubLedgerList = [];
    const obj = {
      "SP_String": "sp_Comm_Controller",
      "Report_Name_String": "Get_Accounting_Sub_Ledger_Dropdown",
      "Json_Param_String": JSON.stringify([{Ledger_ID : id}])      
    }
    this.GlobalAPI.getData(obj).subscribe((data:any)=>{
      // console.log(data);
      this.SubLedgerDataList = data;
     
      console.log("SubLedgerList",this.SubLedgerDataList);
      this.SubLedgerDataList.forEach(el => {
        this.SubLedgerList.push({
            label: el.Sub_Ledger_Name,
            value: el.Sub_Ledger_ID
          });
         
        });
        if(subID){
          this.objjournal.Sub_Ledger_ID = undefined;
          setTimeout(()=>{
            this.objjournal.Sub_Ledger_ID = Number(subID);
            console.log("fun sub",this.objjournal.Sub_Ledger_ID);
          },900)
        }
        
      
    })
    
  }
 
 }
 getsubLedger(id){
  if(id){
    this.SubLedgerListlow = [];
    const obj = {
      "SP_String": "sp_Comm_Controller",
      "Report_Name_String": "Get_Accounting_Sub_Ledger_Dropdown",
      "Json_Param_String": JSON.stringify([{Ledger_ID : id}])      
    }
    this.GlobalAPI.getData(obj).subscribe((data:any)=>{
      // console.log(data);
      this.SubLedgerDataListlow = data;
     
      console.log("SubLedgerDataListlow",this.SubLedgerDataListlow);
      this.SubLedgerDataListlow.forEach(el => {
        this.SubLedgerListlow.push({
            label: el.Sub_Ledger_Name,
            value: el.Sub_Ledger_ID
          });
         
        });
       
    })
  }
 
 }
 getCostCenter(){
  const obj = {
    "SP_String": "sp_Comm_Controller",
    "Report_Name_String": "Get_Master_Cost_Center_Dropdown",
  }
  this.GlobalAPI.getData(obj).subscribe((data:any)=>{
    // console.log(data);
    this.costHeadList = data;
    this.objsearch.Cost_Cen_ID = this.$CompacctAPI.CompacctCookies.Cost_Cen_ID
    console.log("costHeadList",this.costHeadList);
   })
 }
 DeleteProduct(index) {
  this.lowerList.splice(index,1);
  this.getTotalDRCR();
}
getDateRange(dateRangeObj) {
  if (dateRangeObj.length) {
    console.log("dateRangeObj",dateRangeObj);
    this.objsearch.Start_date = dateRangeObj[0];
    this.objsearch.End_date = dateRangeObj[1];
  }
}
ShowSearchData(valid){
  this.JournalSearchFormSubmit = true;
  if(valid){
   this.objsearch.Start_date = this.objsearch.Start_date
    ? this.DateService.dateConvert(new Date(this.objsearch.Start_date))
    : this.DateService.dateConvert(new Date());
    this.objsearch.End_date = this.objsearch.End_date
    ? this.DateService.dateConvert(new Date(this.objsearch.End_date))
    : this.DateService.dateConvert(new Date());
    let saveData = {
      Voucher_Type_ID: Number(this.objsearch.Voucher_Type_ID),
      Cost_Cen_ID: this.objsearch.Cost_Cen_ID,
      Satrt_date: this.objsearch.Start_date,
      End_date: this.objsearch.End_date
    }
    const obj = {
      "SP_String": "Sp_Acc_Journal",
      "Report_Name_String": "BL_Txn_Acc_Journal_Browse",
      "Json_Param_String" : JSON.stringify([saveData])
    }
    this.GlobalAPI.getData(obj).subscribe((data:any)=>{
     console.log("all Data",data);
     this.AlljournalData = data;
      if(this.AlljournalData.length){
        this.DynamicHeader = Object.keys(data[0]);
      }
     })
  }
}
getTotalDRCR(){
  this.totalDR = 0;
  this.totalCR = 0;
  if(this.objjournal.DrCrdata === "DR" && this.objjournal.Amount){
    this.totalDR = Number(Number((this.objjournal.Amount)).toFixed(2));
   }
   else if(this.objjournal.DrCrdata === "CR" && this.objjournal.Amount){
    this.totalCR = Number(Number((this.objjournal.Amount)).toFixed(2));
   }
   else {
     console.log("objjournal.DrCrdata Not Found",this.objjournal.DrCrdata);
   }
 this.lowerList.forEach(el=>{
  this.totalDR += Number(Number(el.DR_Amt).toFixed(2));
  this.totalCR += Number(Number(el.CR_Amt).toFixed(2));
 })

 
}
getVoucherType(){
  this.VoucherTypeList = [];
  const obj = {
    "SP_String": "sp_Comm_Controller",
    "Report_Name_String": "Get_Master_Accouting_Journal_Type_Dropdown",
  }
  this.GlobalAPI.getData(obj).subscribe((data:any)=>{
    // console.log(data);
    data.forEach(el=>{
      if(el.Voucher_Type_ID === 4){
       this.VoucherTypeList.push({
        Voucher_Type_ID : el.Voucher_Type_ID,
        Voucher_Type : el.Voucher_Type

       })
      }
    })
    
   
   })
}
saveJournal(valid){
 console.log("save Valid",valid);
 this.journalFormSubmitted = true;
 if(valid){
  if(this.checkLockDate(this.DateService.dateConvert(new Date(this.voucherdata)))) {
   let savedata = {};
   this.Spinner = true;
   let msg = "";
   let report = "";
    if(this.VoucherNo){
      msg = "Update";
      report = "BL_Txn_Acc_Journal_Update"
      savedata = {
        User_ID: Number(this.$CompacctAPI.CompacctCookies.User_ID),
        Voucher_No : this.VoucherNo,
        Voucher_Type_ID	: Number(this.VoucherTypeID),
				Voucher_Date: this.DateService.dateConvert(new Date(this.voucherdata)), 
				Ledger_ID	: this.objjournal.Ledger_ID,
				Sub_Ledger_ID	: this.objjournal.Sub_Ledger_ID,
				Cost_Cen_ID	: this.$CompacctAPI.CompacctCookies.Cost_Cen_ID,
				Cost_Cen_ID_Trn	: this.objjournal.Cost_Cen_ID_Trn,
				Cost_Head_ID: this.objjournal.Cost_Head_ID,
				DR_Amt: this.objjournal.DrCrdata === "DR" ? Number(Number(this.objjournal.Amount).toFixed(2)) : 0,
				CR_Amt: this.objjournal.DrCrdata === "CR" ? Number(Number(this.objjournal.Amount).toFixed(2)) : 0,
				Naration: this.objjournal.Naration,
				Project_ID: this.objjournal.Project_ID,
				Is_Topper	: "Y",
        L_element : this.lowerList,
        Fin_Year_ID : this.$CompacctAPI.CompacctCookies.Fin_Year_ID
        
      }
    }
    else {
      msg = "Create";
      report = "BL_Txn_Acc_Journal_Create";
      savedata = {
        User_ID: Number(this.$CompacctAPI.CompacctCookies.User_ID),
        Voucher_Type_ID	: Number(this.VoucherTypeID),
				Voucher_Date: this.DateService.dateConvert(new Date(this.voucherdata)), 
				Ledger_ID	: this.objjournal.Ledger_ID,
				Sub_Ledger_ID	: this.objjournal.Sub_Ledger_ID,
				Cost_Cen_ID	: this.$CompacctAPI.CompacctCookies.Cost_Cen_ID,
				Cost_Cen_ID_Trn	: this.objjournal.Cost_Cen_ID_Trn,
				Cost_Head_ID: this.objjournal.Cost_Head_ID,
				DR_Amt: this.objjournal.DrCrdata === "DR" ? Number(this.objjournal.Amount) : 0,
				CR_Amt: this.objjournal.DrCrdata === "CR" ? Number(this.objjournal.Amount) : 0,
				Naration: this.objjournal.Naration,
				Project_ID: this.objjournal.Project_ID,
				Is_Topper	: "Y",
        L_element : this.lowerList,
        Fin_Year_ID : this.$CompacctAPI.CompacctCookies.Fin_Year_ID
        
      }
      console.log("save Data", JSON.stringify(savedata));

    }
    const obj = {
      "SP_String": "Sp_Acc_Journal",
      "Report_Name_String": report,
      "Json_Param_String" : JSON.stringify(savedata)
    }
    this.GlobalAPI.getData(obj).subscribe((data:any)=>{
     if(data[0].Column1 === "Done"){
      if(this.VoucherNo){
        this.tabIndexToView = 0;
        this.items = ["BROWSE", "CREATE"];
        this.buttonname = "Create";
        this.ShowSearchData(true)
        this.Spinner = false;
      }
      else {
        this.Spinner = false;
        this.initDate = [new Date(),new Date()];
      }
      this.getCostCenter();
      this.AlljournalData = [];
      this.objsearch.Voucher_Type_ID = undefined
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "success",
        summary: "Journal",
        detail: "Succesfully "+msg
      });
      this.totalDR = undefined;
      this.totalCR = undefined;
      this.clearData();
     }
     else {
      this.Spinner = false;
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Error",
        detail: "Something wrong"
      });
     }
    })
  }
 }
}
GetCostHead(){
  const obj = {
    "SP_String": "sp_Comm_Controller",
    "Report_Name_String": "Get_Master_Accounting_Cost_Head_Dropdown",
  }
  this.GlobalAPI.getData(obj).subscribe((data:any)=>{
    // console.log(data);
    this.costHeadDataList = data ;
    console.log("costHeadDataList",this.costHeadDataList);
   })
}
getProject(){
  const obj = {
    "SP_String": "sp_Comm_Controller",
    "Report_Name_String": "Get_Master_Project_Detail_Dropdown",
   }
   this.GlobalAPI.getData(obj).subscribe((data:any)=>{
     console.log("Project Data ==>",data);
     this.projectDataList = data;
   })
}
EditJournal(col){
  if(col.Voucher_No){
    if(this.checkLockDate(col.Dated)){
    this.VoucherNo = undefined;
    this.VoucherNo = col.Voucher_No;
    this.objjournal = new journalTopper();
    this.lowerList = [];
    this.SubLedgerList = [];
    this.totalDR = 0;
    this.totalCR= 0;
    this.journallowerFormSubmitted = false;
    this.objjournalloweer = new journalTopper();
    this.journalFormSubmitted = false;
    this.tabIndexToView = 1;
    this.items = ["BROWSE", "UPDATE"];
    this.buttonname = "Update";
    this.GetEditMasterUom(col.Voucher_No)
    }
  }
}
GetEditMasterUom(V_NO){
  this.ngxService.start();
  const obj = {
    "SP_String": "Sp_Acc_Journal",
    "Report_Name_String":"BL_Txn_Acc_Journal_Get",
    "Json_Param_String": JSON.stringify([{Voucher_No : V_NO}]) 
   }
   this.GlobalAPI.getData(obj).subscribe((res:any)=>{
    if(res.length || res[0].T_element != null){
     let data = JSON.parse(res[0].T_element);
     console.log("Edit Data",data);
     this.objjournal = data[0];
     this.lowerList = data[0].L_element;
      this.getsubLedgertop(data[0].Ledger_ID,data[0].Sub_Ledger_ID);
      this.voucherdata = new Date(data[0].Voucher_Date)
     if(data[0].DR_Amt){
      this.objjournal.Amount = Number((data[0].DR_Amt).toFixed(2))
      this.objjournal.DrCrdata = "DR";
      this.getTotalDRCR()
      this.ngxService.stop();
    }
    else if (data[0].CR_Amt){
      this.objjournal.Amount = Number((data[0].CR_Amt).toFixed(2))
      this.objjournal.DrCrdata = "CR";
      this.getTotalDRCR()
      this.ngxService.stop();
    }
    else {
      console.error("Amount Not Found");
      this.ngxService.stop();
    }
    this.ngxService.stop();
  }
  else {
    this.ngxService.stop();
  }
   })
}
DeleteJournal(col){
  console.log("Col",col);
 if(col.Voucher_No){
  if(this.checkLockDate(col.Dated)){
   this.VoucherNo = undefined;
   this.VoucherNo = col.Voucher_No;
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
onReject() {
  this.compacctToast.clear("c");
}
onConfirm(){
  if(this.VoucherNo){
    const obj = {
      "SP_String": "Sp_Acc_Journal",
      "Report_Name_String":"BL_Txn_Acc_Journal_Delete",
      "Json_Param_String": JSON.stringify([{Voucher_No : this.VoucherNo,User_ID : this.$CompacctAPI.CompacctCookies.User_ID}]) 
      }
     this.GlobalAPI.getData(obj).subscribe((data:any)=>{
      console.log("data ==",data[0].Column1);
      if (data[0].Column1 === "Done"){
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "success",
          summary: "Jouranl Delete Succesfully",
          detail: "Succesfully Delete"
        });
        }
        this.ShowSearchData(true);
       });
  }


}
getDate(date){
return date != "01/Jan/1900" ? date : ""
}
validcheck(){
  return this.SubLedgerList.length ? true : false
}
validchecklow(){
  return this.SubLedgerListlow.length ? true : false
}
getToFix(number){
 if(number){
  return Number(Number(number).toFixed(2))
 }
}
}
class journalTopper{
        User_ID:any;
        Voucher_No:any
	      Voucher_Type_ID:any;
				Voucher_Date:any;
				Ledger_ID:any;
				Sub_Ledger_ID:any;
				Cost_Cen_ID:any;
				Cost_Cen_ID_Trn:any;
				Cost_Head_ID:any;
				DR_Amt:any;
				CR_Amt:any;
				Naration:any;
				Project_ID:any;
        Ref_Doc_No:any;
				Ref_Doc_Date:any;
				HSN_NO:any;
				GST_Per	:any;
				ITC_Eligibility	:any;
        DrCrdata = "DR"
        Amount:any
}
class journal{
  Ledger_ID:number;
  Sub_Ledger_ID:number;
  Cost_Cen_ID:any;
  Amount:any;
  DrCrdata:any = "DR";
}
class search{
  Voucher_Type_ID:any
  Cost_Cen_ID	:any
  Start_date:any
  End_date:any
}
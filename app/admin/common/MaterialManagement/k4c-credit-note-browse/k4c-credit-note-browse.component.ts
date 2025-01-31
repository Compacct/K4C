import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { MessageService } from "primeng/api";
import { CompacctCommonApi } from "../../../shared/compacct.services/common.api.service";
import { CompacctHeader } from "../../../shared/compacct.services/common.header.service";
import { CompacctGlobalApiService } from "../../../shared/compacct.services/compacct.global.api.service";
import { DateTimeConvertService } from "../../../shared/compacct.global/dateTime.service"
import { ActivatedRoute, Router } from "@angular/router";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-k4c-credit-note-browse',
  templateUrl: './k4c-credit-note-browse.component.html',
  styleUrls: ['./k4c-credit-note-browse.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class K4cCreditNoteBrowseComponent implements OnInit {
  FranchiseList:any = [];
  ObjBrowse : Browse = new Browse ();
  Searchedlist:any = [];
  BrowseFranchise : any;
  seachSpinner = false;
  Doc_No:any = undefined;
  franshisedisable = false;
  Cancle_Remarks : any;
  remarksFormSubmitted = false;
  Excellist:any = [];
  lockdate:any;

  constructor(
    private Header: CompacctHeader,
    private router : Router,
    private route : ActivatedRoute,
    private $http : HttpClient,
    private GlobalAPI: CompacctGlobalApiService,
    private DateService: DateTimeConvertService,
    public $CompacctAPI: CompacctCommonApi,
    private compacctToast: MessageService,
  ) { }

  ngOnInit() {
    this.Header.pushHeader({
      Header: " Credit Note ", 
      Link: " Credit Note "
    });
     this.GetFranchiseList();
     this.getLockDate();
    // this.GetProductType();
    // this.minDate = new Date(this.todayDate.getDate());
    // this.maxDate = new Date(this.todayDate.getDate());
  //})
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
  GetFranchiseList(){
    // const tempObj = {
    //   Cost_Cen_ID : this.$CompacctAPI.CompacctCookies.Cost_Cen_ID,
    //   //Material_Type : this.MaterialType_Flag
    // }
    const obj = {
      "SP_String": "SP_Franchise_Sale_Bill",
      "Report_Name_String": "Get Franchise",
      //"Json_Param_String": JSON.stringify([tempObj])
    }
    this.GlobalAPI.getData(obj).subscribe((data:any)=>{
      this.FranchiseList = data;
      const ctrl = this;
     const Obj = $.grep(ctrl.FranchiseList,function(item:any) {return item.Cost_Cen_ID == ctrl.$CompacctAPI.CompacctCookies.Cost_Cen_ID})[0];
        if(this.$CompacctAPI.CompacctCookies.User_Type != 'A' && Obj.Cost_Cen_ID == this.$CompacctAPI.CompacctCookies.Cost_Cen_ID){
          this.BrowseFranchise = Obj.Sub_Ledger_ID;
        this.franshisedisable = true;
        } else {
         this.BrowseFranchise = undefined;
         this.franshisedisable = false;
        }
      console.log("this.FranchiseList ===", this.FranchiseList)
      // this.FranchiseList.forEach(item => {
      //   item.Cost_Cen_ID = this.ObjfranchiseSalebill.Cost_Cen_ID
      // });
     })
  }
  getBrowseDateRange(dateRangeObj) {
    if (dateRangeObj.length) {
      this.ObjBrowse.start_date = dateRangeObj[0];
      this.ObjBrowse.end_date = dateRangeObj[1];
    }
  }
  GetSearchedList(){
    this.Searchedlist = [];
    this.seachSpinner = true;
  const start = this.ObjBrowse.start_date
  ? this.DateService.dateConvert(new Date(this.ObjBrowse.start_date))
  : this.DateService.dateConvert(new Date());
const end = this.ObjBrowse.end_date
  ? this.DateService.dateConvert(new Date(this.ObjBrowse.end_date))
  : this.DateService.dateConvert(new Date());

const tempobj = {
  From_Date : start,
  To_Date : end,
  Sub_Ledger_ID : this.BrowseFranchise ? this.BrowseFranchise : 0
}
const obj = {
  "SP_String": "SP_Franchise_Sale_Bill",
  "Report_Name_String": "Browse Credit Note",
  "Json_Param_String": JSON.stringify([tempobj])
}
 this.GlobalAPI.getData(obj).subscribe((data:any)=>{
   this.Searchedlist = data;
   console.log('Search list=====',this.Searchedlist)
   this.seachSpinner = false;
   this.GetExcelList();
 })
  }
  GetExcelList(){
    this.Excellist = [];
  const start = this.ObjBrowse.start_date
  ? this.DateService.dateConvert(new Date(this.ObjBrowse.start_date))
  : this.DateService.dateConvert(new Date());
const end = this.ObjBrowse.end_date
  ? this.DateService.dateConvert(new Date(this.ObjBrowse.end_date))
  : this.DateService.dateConvert(new Date());

const tempobj = {
  From_Date : start,
  To_Date : end,
  Sub_Ledger_ID : this.BrowseFranchise ? this.BrowseFranchise : 0
}
const obj = {
  "SP_String": "SP_Franchise_Sale_Bill",
  "Report_Name_String": "Export Credit Note",
  "Json_Param_String": JSON.stringify([tempobj])
}
 this.GlobalAPI.getData(obj).subscribe((data:any)=>{
   this.Excellist = data;
   console.log('Excel list=====',this.Excellist)
 })
  }
  exportoexcel(Arr,fileName): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(Arr);
    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    XLSX.writeFile(workbook, fileName+'.xlsx');
  }
  Delete(col){
    this.Cancle_Remarks = undefined;
    this.remarksFormSubmitted = false;
    this.Doc_No = undefined;
  if(col.Doc_No){
    if(this.checkLockDate(col.Doc_Date)){
    this.Doc_No = col.Doc_No;
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
  onConfirm(valid){
    //this.Can_Remarks = true;
    this.remarksFormSubmitted = true;
   // if(this.Doc_No){
      const Tempdata = {
        Doc_No : this.Doc_No,
        User_ID : this.$CompacctAPI.CompacctCookies.User_ID,
        Remarks : this.Cancle_Remarks
      }
      if (valid) {
      const objj = {
        "SP_String": "SP_Franchise_Sale_Bill",
        "Report_Name_String": "Delete Credit Note",
        "Json_Param_String": JSON.stringify([Tempdata])
      }
      this.GlobalAPI.getData(objj).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          //this.onReject();
          this.remarksFormSubmitted = false;
          this.GetSearchedList();
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "Doc No.: " + this.Doc_No.toString(),
            detail: "Succesfully Deleted"
          });
          // this.clearData();
    }
    else {
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
  PrintBill(obj) {
    if (obj.Doc_No) {
      window.open("/Report/Crystal_Files/Finance/SaleBill/Credit_Note_K4C.aspx?Doc_No=" + obj.Doc_No, 'mywindow', 'fullscreen=yes, scrollbars=auto,width=950,height=500'
  
      );
    }
  }
  DownloadEINV(obj) {
    if (obj) {
      window.open(obj, '_self');
    }
  }
  // clearData(){
  //   this.items = ["BROWSE", "CREATE"];
  //   this.buttonname = "Save";
  //   this.franchiseSalebillFormSubmitted = false;
  //   this.ObjfranchiseSalebill.Franchise = undefined;
  //   this.ObjfranchiseSalebill.Remarks = undefined;
  //   this.ChallanList = [];
  //   this.BackupChallanList = [];
  //   this.SelectedChallan = [];
  //   this.ChallanFilter = [];
  //   this.ProductList = [];
  //   this.franshisedisable = false;
  //   //this.DocNo = undefined;
  //   //this.editDataList = [];
  //   //this.productListFilter = [];

  // }
  // Refresh(){
  //   this.items = ["BROWSE", "CREATE"];
  //   this.buttonname = "Save";
  //   this.franshisedisable = false;
  //   this.franchiseSalebillFormSubmitted = false;
  //   this.ObjfranchiseSalebill.Franchise = undefined;
  //   this.ObjfranchiseSalebill.Remarks = undefined;
  //   this.ChallanList = [];
  //   this.BackupChallanList = [];
  //   this.SelectedChallan = [];
  //   this.ChallanFilter = [];
  //   this.ProductList = [];
  // }

}
class Browse {
  start_date : Date ;
  end_date : Date;
}

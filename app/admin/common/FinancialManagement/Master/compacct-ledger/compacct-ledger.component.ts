import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { stringify } from 'querystring';
import { HttpClient } from '@angular/common/http';
import { CompacctHeader } from '../../../../shared/compacct.services/common.header.service';
import { MessageService } from 'primeng/api';

import * as XLSX from 'xlsx';
@Component({
  selector: 'app-compacct-ledger',
  templateUrl: './compacct-ledger.component.html',
  styleUrls: ['./compacct-ledger.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class CompacctLedgerComponent implements OnInit {
  saveSpinner = false;
  items = [];
  cols = [];
  menuList = [];
  buttonname = "Create";
  urlService = window["config"];
  tabIndexToView = 0;
  LedgerFormSubmitted = false;
  ValidGroupFlag = false;

  LedgerLists = [];
  AccountingGroupsLists = [];
  BankTynLists = [];

  SelectedBankTrn =  [];
  subledgerVal = false;
  pmVal = false;
  ObjLedger = new Ledger();
  LedgerID:any;
  constructor(  private $http: HttpClient,
    private Header: CompacctHeader,
    private compacctToast: MessageService) { }

  ngOnInit() {
    this.cols = [
      { field: "Ledger_Name", header: "Ledger Name" },
      { field: "Accounting_Group_Name", header: "Accounting Group Name" },
    ];
    this.menuList = [
      { label: "Edit", icon: "pi pi-fw pi-user-edit" },
      { label: "Delete", icon: "fa fa-fw fa-trash" }
    ];
    this.items = ["BROWSE", "CREATE"];

    this.Header.pushHeader({
      Header: "Accounting Ledger",
      Link: " Financial Management -> Master -> Accounting Ledger"
    });
    this.GetAllLedgerLists();
    this.GetAccountingGroups();
    this.GetBankTyn();
  }


  GetAllLedgerLists() {
    this.$http.get('/Master_Accounting_Ledger_V2/GetAllData').subscribe((data: any) => {
      this.LedgerLists = data ? JSON.parse(data) : [];
    });
 }
  GetAccountingGroups() {
    this.$http.get('/Master_Accounting_Ledger_V2/Get_Accounting_Group').subscribe((data: any) => {
      const NativeAccountingGroupList = data ? JSON.parse(data) : [];
      NativeAccountingGroupList.forEach(el => {
          this.AccountingGroupsLists.push({
            label: el.Accounting_Group_Name ,
            value: el.Accounting_Group_ID
          });
        });
    });
 }
  GetBankTyn () {
  this.$http.get('/Master_Accounting_Ledger_V2/Get_Transaction_Type').subscribe((data: any) => {
    if (data) {
      const bankList = data ? JSON.parse(data) : [];
      bankList.forEach(el => {
        this.BankTynLists.push({
          label: el.Txn_Type_Name,
          value: el.Bank_Txn_Type_ID
        });
      });
    } else {
      this.BankTynLists = [];
    }
  });
 }


// CHANGE
TabClick(e) {
  this.tabIndexToView = e.index;
  this.items = ["BROWSE", "CREATE"];
  this.buttonname = "Create";
  this.ClearData();
}
AccountingGrpChange(groupID){
  this.ValidGroupFlag = false;
  this.ObjLedger.Ledger_Short_Name = undefined;
  if(groupID) {
    console.log(groupID)
   // const tempObj = $.g
   this.ValidGroupFlag = groupID === 14 || groupID === 3 || groupID === 2 ? true : false;
   this.ObjLedger.Ledger_Short_Name = undefined;
  }
}
LedgerNameChange(name) {
  this.ObjLedger.Ledger_Short_Name = undefined;
  if(name){
    this.ObjLedger.Ledger_Short_Name = this.ValidGroupFlag  ? name : undefined;
  }
}
EditLeger(obj){
  if(obj.Ledger_ID){
    this.ClearData();
    const sName = obj.Ledger_Short_Name ? obj.Ledger_Short_Name : undefined;
    this.ObjLedger = obj;
    this.AccountingGrpChange(obj.Accounting_Group_ID);
    this.SelectedBankTrn =  obj.Bank_Txn_Type_ID ? JSON.parse("[" + obj.Bank_Txn_Type_ID + "]") : [];
    this.ObjLedger.Ledger_Short_Name =  sName;
    this.subledgerVal = obj.Sub_Ledger ? true:false;
    this.pmVal = obj.Use_In_PM === 'Y' ? true:false;
    this.items = ["BROWSE", "UPDATE"];
    this.buttonname = "Update";
    this.tabIndexToView = 1;

  }
}
//  SAVE & UPDATE & CLEAR
SaveLedger(valid) {
  this.LedgerFormSubmitted = true;
  console.log(this.ObjLedger);
  if (valid) {
    let bnktrnflag =  true;
    if(this.ValidGroupFlag){
      bnktrnflag = this.SelectedBankTrn.length ? true : false;
    }
    if(bnktrnflag){
      // this.saveSpinner = true;
      console.log(this.SelectedBankTrn);
      this.ObjLedger.Bank_Txn_Type_ID = this.SelectedBankTrn.toString();
      const subledger = this.subledgerVal ? 1 : 0;
      this.ObjLedger.Sub_Ledger = this.ValidGroupFlag ? 0 : subledger;
      this.ObjLedger.Use_In_PM = this.pmVal ? 'Y' : 'N';
      const url = this.ObjLedger.Ledger_ID
        ? '/Master_Accounting_Ledger_V2/Update_Matser_Accounting_Ledger_Ajax'
        : '/Master_Accounting_Ledger_V2/Create_Matser_Accounting_Ledger_Ajax';

      this.$http.post(url, this.ObjLedger).subscribe((data: any) => {
        if (data.success === true) {
          console.group("Compacct V2");
          console.log("%c Ledger Sucess:", "color:green;", data.Doc_No);
          console.log(url);
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: data.Doc_No,
              detail: this.ObjLedger.Ledger_ID
                ? "Succesfully Updated"
                : "Succesfully Created"
            });
            this.GetAllLedgerLists();
            this.ClearData();
        } else {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message",
            detail: "Error Occured "
          });
        }
        this.saveSpinner = false;
      });

    }else{
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: "Please Choose Bank Trn Type "
      });
    }

  }
}
ClearData() {
  this.SelectedBankTrn =  [];
  this.subledgerVal = false;
  this.pmVal = false;
  this.ObjLedger = new Ledger();

  this.saveSpinner = false;
  this.LedgerFormSubmitted = false;
  this.ValidGroupFlag = false;
}

// EXPORT TO EXCEL
exportexcel(Arr,fileName): void { 
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(Arr);
  const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
  XLSX.writeFile(workbook, fileName+'.xlsx');
}

// DELETE
onConfirm() {
  if (this.LedgerID) {
    this.$http
      .post('/Master_Accounting_Ledger_V2/Delete', { id: this.LedgerID })
      .subscribe((data: any) => {
        if (data.success === true) {
          this.GetAllLedgerLists();
          this.onReject();
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: this.LedgerID,
            detail: "Succesfully Deleted"
          });
        }
      });
  }
}
onReject() {
  this.compacctToast.clear("c");
}
DeleteLedger(obj) {
  this.LedgerID = undefined;
  if (obj.Ledger_ID) {
    this.LedgerID = obj.Ledger_ID;
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
class Ledger  {
  Ledger_ID= 0;
  Accounting_Group_ID: string;
  Ledger_Name: string;
  Ledger_Short_Name: string;
  Bank_Txn_Type_ID:string;
  Sub_Ledger: number;
  Use_In_PM:string;
}

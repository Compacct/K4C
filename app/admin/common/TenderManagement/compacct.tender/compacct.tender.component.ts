import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { MessageService } from "primeng/api";
import { CompacctCommonApi } from '../../../shared/compacct.services/common.api.service';
import { CompacctHeader } from '../../../shared/compacct.services/common.header.service';
import { DateTimeConvertService } from "../../../shared/compacct.global/dateTime.service";
import {CompacctGetDistinctService } from "../../../shared/compacct.services/compacct-get-distinct.service"
import * as moment from "moment";
declare var $:any;
import * as XLSX from 'xlsx';
import { FileUpload } from "primeng/primeng";
import { CompacctGlobalApiService } from '../../../shared/compacct.services/compacct.global.api.service';
import { ActivatedRoute } from '@angular/router';
import { Console } from 'console';

@Component({
  selector: 'app-compacct.tender',
  templateUrl: './compacct.tender.component.html',
  styleUrls: ['./compacct.tender.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class CompacctTenderComponent implements OnInit {
  tabIndexToView = 0;
  tabIndexToView2 = 0;
  items2 =['General Information','EMD / Tender Fee','Document','Task'];
  items = ["BROWSE", "CREATE" ,"BID OPENING"];
  url = window["config"];
  persons: [];
  buttonname = "Create";
  Spinner = false;
  SpinnerAg = false;
  ViewFlag = false;
  TenderSearchForm = false;
  TenderFormSubmitted = false;
  TenderList = [];
  BackupTenderList = [];
  TenderOpenDate = new Date();
  TenderEndDate =  new Date();;
  TenderPublishDate = new Date();
  TenderSearchDate = new Date();
  TFeeAmount = undefined;
  TFeeAmountupdate = undefined;
  TenderAmount = undefined;
  PeriodOfWork = undefined;
  EMDAmount = undefined;
  updateEMDAmount = undefined
  ObjTender = new Tender();
  ObjtenerFee = new tenerFee();
  ObjTask = new Task();
  ObjSearch = new Search();
  TenderOrganization = undefined;
  OrgSubmitted = false;
  OrganizationModal = false;
  catSubmitted = false;
  TenderCategoryName = undefined;
  CategoryModal = false;
  PerformanceFormSubmitted = false;
  TenderTypeName = undefined;
  TypeModal = false;
  TypeSubmitted = false;

  FormOfContract = undefined;
  ContactModal = false;
  ContractSubmitted = false;
  PerformanceSecurityAmount = undefined;
  UpdatePerformanceSecurityAmount = undefined;
  TenderPaymentMode = undefined;
  PaymentModal = false;
  PaymentSubmitted = false;
  

  EMDSubmitted = false;
  EMDModal = false;
  
  TenderFeeSubmitted = false;
  PerformanceSecuritySubmitted = false;
  TenderFeeModal = false;
  PerformanceSecurityModel = false;
  EMDDepositDate = new Date();
  EMDUpdateDepositDate = new Date();
  EMDUpdateDeposit = new Date();
  EMDBGDate = new Date();
  EMDBGExpDate = new Date();
  EMDMatureDate = new Date();
  EMDNEFTDate = new Date();
  FDAmount = undefined;
  FDMaturityAmount =undefined;
  ObjEMD = new EMD(); PerformanceSecurity
  ObjPerformanceSecurity= new PerformanceSecurity();
  TenderId = undefined;

  FeeDepositDate = new Date();
  FeeTransactionDate = new Date();
  ObjFee = new Fee();

  SubmissionSubmitted = false;
  SubmissionModal = false;
  SubmissionDate = new Date();;
  ObjSubmission = new Submission();

  tenderOrgList = [];
  tenderCategoryList = [];
  TypeList = [];
  ContractList = [];
  PaymentList = [];
  informList = [];
  IntimationList = [];
  IntimationSelect = [];
  CountryCodeList =[];
  FootfalID = undefined;
  DocumentList = [];
  TaskList = [];
  @ViewChild("location", { static: false }) locationInput: ElementRef;
  // BID OPENING TAB
  BidTenderList:any = {};
  BidOpeningFlag = false;
  BidOpeningFormSubmitted = false;
  BidOpeningListFormSubmitted = false;
  BidOpenListViewByRateFlag = false;
  BidOpenListViewByLotteryFlag = true;
  BidOpenListView =[];
  BidOpenListViewByRate = [];
  BidOpenListViewByLottery: Array<RankBidOpeningList> = [];

  ISDAmount = undefined;
  ISDMaturityAmount = undefined;
  ISDReleaseDate = new Date();
  ISDDepositDate = new Date();
  ISDBGDate = new Date();
  ISDBGExpDate = new Date();
  ISDMatureDate = new Date();
  ISDNEFTDate = new Date();
  ISDFDAmount = undefined;
  ISDFDMaturityAmount =undefined;
  APSDAmount = undefined;
  APSDMaturityAmount = undefined;
  APSDReleaseDate = new Date();
  APSDDepositDate = new Date();
  APSDBGDate = new Date();
  APSDBGExpDate = new Date();
  APSDMatureDate = new Date();
  APSDNEFTDate = new Date();
  APSDFDAmount = undefined;
  APSDFDMaturityAmount =undefined;
  AgreementValue = undefined;
  CommencementDate = new Date();
  CompletionDate = new Date();
  PeriodOfCompletion = undefined;
  EstimatedRate = undefined;
  tenderValue = undefined;
  EstimateAllData = [];

  ObjBidOpening = new BidOpening();
  ObjBidOpeningList = new BidOpeningList(); 
  ObjAgreement = new Agreement();
  AuthoritySubmitted = false;
  AuthorityName = undefined;
  AuthorityModal = false;
  BidderModal = false;
  BidderName = undefined;
  BidderSubmitted = false;
  CircleSubmitted = false;
  CircleName = undefined;
  CircleModal = false;
  DivisionSubmitted = false;
  DivisionName = undefined;
  DivisionModal = false;
  ReasonSubmitted = false;
  ReasonName = undefined;
  ReasonModal = false;
  FinalcialYearSubmitted = false;
  FinalcialYearName = undefined;
  FinalcialYearModal = false;

  TenderDetails:any = {};
  BidderList = [];
  AuthorityList = [];
  DivisionList = [];
  CircleList = [];
  ReasonList =[];
  ReasonSelect = [];
  FinancialYearList = [];

  PDFFlag = false;
  PDFViewFlag = false;
  ProductPDFLink = undefined;
  BOQPDFFile:any = {};
  BOQdataString:any = [];
  BOQExcelList = [];
  ExcelModalFlag = false;
  BidEditFlag = false;
  BoqDocFormSubmitted = false;
  BOQExcelTotal = undefined;
  BOQExcelLess = undefined;
  BOQExcelGrandTotal = undefined;
  BOQExcelLessTotal = undefined;
  BOQExcelQuote = undefined;

  TenderIssueDate = new Date();
  TenderExpiryDate = new Date();
  TenderIssueDateupdate = new Date();
  TenderExpiryDateupdate = new Date();
  EMDIssueDate = new Date();
  EMDExpiryDate = new Date();
  PerformanceIssueDate = new Date();
  PerformanceExpiryDate = new Date();
  PerformanceIssueDateUpdate = new Date();
  PerformanceExpiryDateUpdate = new Date();
  // Estimate
  EstimateModalFlag = false;
  EstimateInfoSubmitted = false;
  ObjEstimate:any = {};
  EstimateGroupList = [];
  EstimateSubGroupList = [];
  EstimateGroupProductList = [];
  AddedEstimateProductList = [];
  ShowAddedEstimateProductList = [];

  EstimateGrpSubmitted = false;
  EstimateGrpName = undefined;
  EstimateGrpModal = false;

  EstimateSubGrpSubmitted = false;
EstimateSubGrpName = undefined;
EstimateSubGrpModal = false;
rowGroupMetadata: any;
rowGroupMetadata2: any;

CreateLightBoxSubmitted = false;
TenderCallingDiv = undefined;
TenderExecutionDiv = undefined;
TenderType = undefined;
TenderCategory = undefined;
TenderPaymentMode1 = undefined;
TenderCallingDivList = [];
TenderExecutionDivList = [];
TenderInfoEnqList = [];

DTAutorityList = [];
DTCallingDivList = [];
DTCategoryList = [];
DTStateList = [];
DTLocationList = [];

SelectedDTAutority = [];
SelectedDTCallingDiv = [];
SelectedDTCategory = [];
SelectedDTState = [];
SelectedDTLocation = [];
TenderDocID = undefined;
StateList = [];

AgreementSubmitted = false;
tenderDocId = undefined;


  InformationSubmitted = false;
  InformationName = undefined;
  InformationModal = false;
  @ViewChild("fileInput", { static: false }) fileInput: FileUpload;
  constructor( private $http: HttpClient,
    private commonApi: CompacctCommonApi,
    private Header: CompacctHeader,
    private route : ActivatedRoute,
    private DateService: DateTimeConvertService,
    private GlobalAPI: CompacctGlobalApiService,
    private compacctToast: MessageService,
    private GetDistinctItems :CompacctGetDistinctService) { 
      this.route.queryParamMap.subscribe((val:any) => {
        console.log(val)
        if(val.params.from) {
          this.tabIndexToView = 1;
        }
      });
    }

  ngOnInit() {
    this.Header.pushHeader({
      Header: "Tender",
      Link: " Tender Management -> Master -> Tender"
    });
    console.log('tt')
    this.GerCode();
    this.GetTenderOrgList();
    this.GetTenderCategoryList();
    this.GetInformList();
    this.GetIntimationList();
    this.GetTypeList();
    this.GetContractList();
    this.GetPaymentList();
    this.GetBidderList();
    this.GetAuthorityList();
    this.GetReasonList();
    this.GetFinancialYearList();

    this.GetEstimateGroup();
    this.GetTenderCallingDiv();
    this.GetTenderInfoEnqSRC();
    this.GetTenderExecutionDiv();
    this.GetProduct();
    this.GetStateList();
  }

   // INIT DATA
   GetStateList() {
    this.$http
    .get("/Common/Get_State_List")
    .subscribe((data: any) => {
      this.StateList = data.length ? data : [];
    });
   }
   GetTenderOrgList() {
    this.$http
      .get("/BL_CRM_Txn_Enq_Tender/Get_Tender_Organization_Json")
      .subscribe((data: any) => {
        this.tenderOrgList = data ? JSON.parse(data) : [];
      });
  }
  GetTenderCategoryList() {
    this.$http.get("/BL_CRM_Txn_Enq_Tender/Get_Tender_Category_Json").subscribe((data: any) => {
      this.tenderCategoryList = data ? JSON.parse(data) : [];
    });
  }
  GetInformList() {
    this.$http
      .get("/Hearing_CRM_Lead/Get_Enq_Source")
      .subscribe((data: any) => {
        this.informList = data.length ? data : [];
      });
  }
  GetIntimationList() {
    this.IntimationList = [];
      this.$http
        .get(this.url.apiGetUserLists)
        .subscribe((data: any) => {
          const List = data ? data : [];
          List.forEach(el => {
            this.IntimationList.push({
              label: el.Name,
              value: el.User_ID
            });
          });
        });
  }
  GetTypeList() {
    this.$http
      .get("/BL_CRM_Txn_Enq_Tender/Get_Tender_Type_Json")
      .subscribe((data: any) => {
        this.TypeList = data ? JSON.parse(data) : [];
      });
  }
  GetContractList() {
    this.$http
      .get("/BL_CRM_Txn_Enq_Tender/Get_Tender_Form_Of_Contract_Json")
      .subscribe((data: any) => {
        this.ContractList = data ? JSON.parse(data) : [];
      });
  }
  GetPaymentList() {
    this.$http
      .get("/BL_CRM_Txn_Enq_Tender/Get_Tender_Payment_Type_Json")
      .subscribe((data: any) => {
        this.PaymentList = data ? JSON.parse(data) : [];
      });
  }
  GerCode() {
    this.$http
      .get("/Scripts/Common/CountryCodes.json")
      .subscribe((data: any) => {
        this.CountryCodeList = data ? data : [];
        this.ObjTender.dial_code = '+91';
      });
  }

  // CHANGE
  getDateRange(dateRangeObj) {
    if (dateRangeObj.length) {
      this.ObjSearch.From_Date = dateRangeObj[0];
      this.ObjSearch.To_Date = dateRangeObj[1];
    }
  }
  getAddressOnChange(e) {
     this.ObjTender.Location = undefined;
    if (e) {
       this.ObjTender.Location = e;
    }
  }
  GetTenderOpenDate(date) {
    if (date) {
      this.ObjTender.Tender_Opening_Date =  this.DateService.dateTimeConvert(new Date(date));
    }
  }
  GetTenderEndDate(date) {
    if (date) {
      this.ObjTender.Tender_Closing_Date = this.DateService.dateTimeConvert(new Date(date));
    }
  }
  GetTenderPublishDate(date) {
    if (date) {
      this.ObjTender.Tender_Publish_Date = this.DateService.dateTimeConvert(new Date(date));
    }
  }
  GetSubmissionDate(date){
    if (date) {
      this.ObjSubmission.Tender_Submission_Date = this.DateService.dateTimeConvert(new Date(date));
    }
  }
  GetTenderSearchDate(date) {
    if (date) {
      this.ObjSearch.Tender_Closing_Date = this.DateService.dateConvert(
        moment(date, "YYYY-MM-DD")["_d"]
      );
    }
  }
  TenderAmountChange(e){
    this.ObjTender.Tender_Amount = undefined;
    this.ObjTender.EMD_Amount = undefined;
    this.ObjEMD.EMD_Amount = undefined;
    if(e) {
   const x= e.toString();
   const number = Number(e);
   const onePercen = (number * 0.01).toFixed();
   this.TenderEMDChange(onePercen);
  const k =  number.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      style: 'currency',
      currency: 'INR'
  });
  this.ObjTender.Tender_Amount = Number(e);
  this.TenderAmount = k;
 }
  }
  TenderFeeChange(e){
    console.log(e);
    this.ObjTender.T_Fee_Amount = undefined;
    if(e) {
      const x= e.toString();
      const number = Number(e);
     const k =  number.toLocaleString('en-IN', {
         maximumFractionDigits: 2,
         style: 'currency',
         currency: 'INR'
     });
     this.ObjTender.T_Fee_Amount = Number(e);
     this.TFeeAmount = k;
    }
  }
  TenderFeeUpdateChange(e){
    console.log(e);
    this.ObjTender.T_Fee_Amount = undefined;
    if(e) {
      const x= e.toString();
      const number = Number(e);
     const k =  number.toLocaleString('en-IN', {
         maximumFractionDigits: 2,
         style: 'currency',
         currency: 'INR'
     });
     this.ObjTender.T_Fee_Amount = Number(e);
     this.TFeeAmountupdate = k;
    }
  }
  TenderEMDChange(e){
    console.log(e);
    this.ObjTender.EMD_Amount = undefined;
    this.ObjEMD.EMD_Amount = undefined;
    if(e) {
      const x= e.toString();
      const number = Number(e);
     const k =  number.toLocaleString('en-IN', {
         maximumFractionDigits: 2,
         style: 'currency',
         currency: 'INR'
     });
     this.ObjTender.EMD_Amount = Number(e);
     this.ObjEMD.EMD_Amount = Number(e);
     this.EMDAmount = k;
     this.updateEMDAmount = k;
    }
  }
  // TenderUpdateEMDChange(e){
  //   console.log(e);
  //   this.ObjTender.EMD_Amount = undefined;
  //   this.ObjEMD.EMD_Amount = undefined;
  //   if(e) {
  //     const x= e.toString();
  //     const number = Number(e);
  //    const k =  number.toLocaleString('en-IN', {
  //        maximumFractionDigits: 2,
  //        style: 'currency',
  //        currency: 'INR'
  //    });
  //    this.ObjTender.EMD_Amount = Number(e);
  //    this.ObjEMD.EMD_Amount = Number(e);
  //    this.EMDAmount = k;
  //    this.updateEMDAmount = k;
  //   }
  // }
  PerformanceSecurityChange(e){
    console.log(e);
    this.ObjTender.APSD_Amount = undefined;
    this.ObjPerformanceSecurity.APSD_Amount = undefined;
    if(e) {
      const x= e.toString();
      const number = Number(e);
     const k =  number.toLocaleString('en-IN', {
         maximumFractionDigits: 2,
         style: 'currency',
         currency: 'INR'
     });
     this.ObjTender.APSD_Amount = Number(e);
     this.ObjPerformanceSecurity.APSD_Amount = Number(e);
     this.PerformanceSecurityAmount = k;
     this.UpdatePerformanceSecurityAmount = k;
    }
  }
  TenderFDChange(e){
    console.log(e);
    this.ObjEMD.EMD_FD_Amount = undefined;
    if(e) {
      const x= e.toString();
      const number = Number(e);
     const k =  number.toLocaleString('en-IN', {
         maximumFractionDigits: 2,
         style: 'currency',
         currency: 'INR'
     });
     this.ObjEMD.EMD_FD_Amount = Number(e);
     this.FDAmount = k;
    }
  }
  TenderPeriodOfWorkChange(e){
    this.ObjTender.Period_Of_Work = undefined;
    if(e) {
      const k = Number(e) === 1 ? 'Day' : 'Days';
     this.ObjTender.Period_Of_Work = e;
     this.PeriodOfWork  = e+' '+ k;
    }
  }
  TenderFDMaturityChange(e){
    console.log(e);
    this.ObjEMD.EMD_FD_Mature_Amount = undefined;
    if(e) {
      const x= e.toString();
      const number = Number(e);
     const k =  number.toLocaleString('en-IN', {
         maximumFractionDigits: 2,
         style: 'currency',
         currency: 'INR'
     });
     this.ObjEMD.EMD_FD_Mature_Amount = Number(e);
     this.FDMaturityAmount = k;
    }
  }
  TenderAmountView(e){
    if(e) {
      const x= e.toString();
      const number = Number(e);
     const k =  number.toLocaleString('en-IN', {
         maximumFractionDigits: 2,
         style: 'currency',
         currency: 'INR'
     });
     return  k;
    }
  }

  // ACTION FUNCTIONS
  GetEMDDepositDate (date) {
    if (date) {
      this.ObjEMD.EMD_Amount_Deposit_Date = this.DateService.dateConvert(
        moment(date, "YYYY-MM-DD")["_d"]
      );
    }
  }
  GetEMDBGDate (date) {
    if (date) {
      this.ObjEMD.EMD_BG_Creation_Date= this.DateService.dateConvert(
        moment(date, "YYYY-MM-DD")["_d"]
      );
    }
  }
  GetEMDBGExptDate (date) {
    if (date) {
      this.ObjEMD.EMD_BG_Exp_Date = this.DateService.dateConvert(
        moment(date, "YYYY-MM-DD")["_d"]
      );
    }
  }
  GetEMDMatureDateDate (date) {
    if (date) {
      this.ObjEMD.EMD_FD_Mature_Date = this.DateService.dateConvert(
        moment(date, "YYYY-MM-DD")["_d"]
      );
    }
  }
  GetEMDNEFTDate (date) {
    if (date) {
      this.ObjEMD.EMD_NEFT_Txn_Date = this.DateService.dateConvert(
        moment(date, "YYYY-MM-DD")["_d"]
      );
    }
  }
  GetFeeDepositDate (date) {
    if (date) {
      this.ObjFee.T_Fee_Amount_Deposit_Date = this.DateService.dateConvert(
        moment(date, "YYYY-MM-DD")["_d"]
      );
    }
  }
  GetFeeTransactionDate (date) {
    if (date) {
      this.ObjFee.T_Fee_NEFT_Txn_Date = this.DateService.dateConvert(
        moment(date, "YYYY-MM-DD")["_d"]
      );
    }
  }

  // View
  View(obj) {
    this.clearData();
    console.log("view Obj",obj);
    this.DocumentList =[];
    this.TaskList = [];
    this.ObjTask = new Task();
    this.ObjFee = new Fee();
    this.ObjEMD = new EMD();
    if(obj.Tender_Doc_ID){
      this.ViewFlag = true;
      this.ObjTender = obj;
      console.log("ObjTender",this.ObjTender);
      this.ObjAgreement.Tender_Doc_ID = obj.Tender_Doc_ID;
      this.TenderAmountChange(obj.Tender_Amount);
      this.TenderFeeChange(obj.T_Fee_Amount);
      this.TenderEMDChange(obj.EMD_Amount);
      this.PerformanceSecurityChange(obj.APSD_Amount);
      this.TenderPeriodOfWorkChange(obj.Period_Of_Work);
      this.GetTask(obj.Tender_Doc_ID,false);
      this.GetDocument(obj.Tender_Doc_ID);
      this.viewBooth(obj.Tender_Doc_ID)
    }
  }
  CloseViewModal(){
    this.clearData();
    this.DocumentList =[];
    this.ObjTask = new Task();
    this.ObjFee = new Fee();
    this.ObjEMD = new EMD();

  }
  viewBooth(TenderDocID) {
    if(TenderDocID) {
      const obj = new HttpParams()
      .set("Tender_Doc_ID",TenderDocID);
    this.$http
      .get("/BL_CRM_Txn_Enq_Tender/Get_EMD_Tender_Json", { params: obj })
      .subscribe((data: any) => {
        const obj = data ? JSON.parse(data)[0] : {};
        console.log("obj",obj);
        this.ObjFee = obj;
        this.ObjEMD = obj;
      });
    }
  }
  GetDocument(foofFall) {
    if(foofFall) {
      const params = new HttpParams().set("Tender_Doc_ID", foofFall);
      this.$http
        .get("/BL_CRM_Txn_Enq_Tender/Get_Tender_Document_Json", { params })
        .subscribe((data: any) => {
          this.DocumentList = data ? JSON.parse(data) : [];
          this.ViewFlag = true;
        });

    }
  }
  GetTask(foofFall ,flag) {
    if(foofFall){
      const obj = new HttpParams().set("Tender_Doc_ID", foofFall);
      this.$http
        .get("/BL_CRM_Txn_Enq_Task/Get_My_Task_Retrieve_FootFall", { params: obj })
        .subscribe((data: any) => {
          this.TaskList = data ? JSON.parse(data) : [];
          if(flag) {
            this.IntimationSelect = [];
            for(let k=0;k < this.TaskList.length;k++){
              this.IntimationSelect.push(this.TaskList[k].Tagged_To_User_ID);

            }
          }
        });
    }
  }

  getTaggedByID(ID) {
    let taggedname = undefined;

    for(let k = 0;k < this.IntimationList.length;k++) {
      if(this.IntimationList[k].value === ID) {
        taggedname = this.IntimationList[k].label;
      }
    }
    return taggedname;
  }
  GetOrgName(id) {
   const name = $.grep(this.tenderOrgList ,function(obj) {return obj.Tender_Org_ID === id})[0].Tender_Organization;
    return name ? name : '-';
  }
  GetCatName(id) {
    const name = $.grep(this.tenderCategoryList ,function(obj) {return obj.Tender_Category_ID === id})[0].Tender_Category_Name;
    return name ? name : '-';
  }
  GetInformName(id) {
    const name = $.grep(this.informList ,function(obj) {return obj.Enq_Source_ID === id})[0].Enq_Source_Name;
    return name ? name : '-';
  }
  GetTypeName(id) {
    const name = $.grep(this.TypeList ,function(obj) {return obj.Tender_Type_ID === id})[0].Tender_Type_Name;
    return name ? name : '-';
  }
  GetContaractName(id) {
    console.log("GetContaractName call ContractList",this.ContractList);
    const name = $.grep(this.ContractList ,function(obj) {return obj.Form_Of_Contract_ID === id})[0].Form_Of_Contract;
    return name ? name : '-';
  }
  GetPaymentName(id) {
    const name = $.grep(this.PaymentList ,function(obj) {return obj.Tender_Payment_Mode_ID === id})[0].Tender_Payment_Mode;
    return name ? name : '-';
  }

  // CREATE
 ToggleOrganization(){
  this.TenderOrganization = undefined;
  this.OrgSubmitted = false;
  this.OrganizationModal = true;
  this.Spinner = false;
 }
 ToggleCategory(){
  this.catSubmitted = false;
  this.TenderCategoryName = undefined;
  this.CategoryModal = true;
  this.Spinner = false;
 }
 ToggleType(){
  this.TenderTypeName = undefined;
  this.TypeSubmitted = false;
  this.TypeModal = true;
  this.Spinner = false;
 }
 ToggleContact(){
  this.ContractSubmitted = false;
  this.FormOfContract = undefined;
  this.ContactModal = true;
  this.Spinner = false;
 }
 TogglePayment(){
  this.PaymentSubmitted = false;
  this.TenderPaymentMode = undefined;
  this.PaymentModal = true;
  this.Spinner = false;
 }
 CreateOrganization(valid){
  this.OrgSubmitted = true;
  if(valid) {
      this.Spinner = true;
      const UrlAddress = "/BL_CRM_Txn_Enq_Tender/Create_Tender_Organization";
      const obj = { Tender_Organization: this.TenderOrganization };
      this.$http.post(UrlAddress, obj).subscribe((data: any) => {
        console.log(data)
      if (data.success) {
        this.Spinner = false;
        // if (this.ObjTender.Tender_Doc_ID) {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "",
            detail: "Succesfully Organization Created"
          });
        // } else {
        //   this.compacctToast.clear();
        //   this.compacctToast.add({
        //     key: "compacct-toast",
        //     severity: "success",
        //     summary: "",
        //     detail: "Organization Already Exits"
        //   });
        // }
        this.GetTenderOrgList();
        this.TenderOrganization = undefined;
        this.OrgSubmitted = false;
        this.OrganizationModal = false;
        this.Spinner = false;
      } else {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Error Occured "
        });
      }
      });
  }
 }
 CreateCategory(valid){
  this.catSubmitted = true;
   if(valid) {
      this.Spinner = true;
      const UrlAddress = "/BL_CRM_Txn_Enq_Tender/Create_Tender_Category";
      const obj = { Tender_Category_Name: this.TenderCategoryName };
      this.$http.post(UrlAddress, obj).subscribe((data: any) => {
        console.log(data)
      if (data.success) {
        // if (this.ObjTender.Tender_Doc_ID) {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "",
            detail: "Succesfully Category Created"
          });
        // } else {
        //   this.compacctToast.clear();
        //   this.compacctToast.add({
        //     key: "compacct-toast",
        //     severity: "success",
        //     summary: "",
        //     detail: "Category Already Exits"
        //   });
        // }
        this.GetTenderCategoryList();
        this.catSubmitted = false;
        this.TenderCategoryName = undefined;
        this.CategoryModal = false;
        this.Spinner = false;
      } else {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Error Occured "
        });
      }
      });
    }
 }
 CreateType(valid){
  this.TypeSubmitted = true;
  if(valid) {
      this.Spinner = true;
      const UrlAddress = "/BL_CRM_Txn_Enq_Tender/Create_Tender_Type";
      const obj = {  Tender_Type_Name: this.TenderTypeName };
      this.$http.post(UrlAddress, obj).subscribe((data: any) => {
        console.log(data)
      if (data.success) {
        this.Spinner = false;
        // if (this.ObjTender.Tender_Doc_ID) {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "",
            detail: "Succesfully Tender Type Created"
          });
        // } else {
        //   this.compacctToast.clear();
        //   this.compacctToast.add({
        //     key: "compacct-toast",
        //     severity: "success",
        //     summary: "",
        //     detail: "Organization Already Exits"
        //   });
        // }
        this.GetTypeList();
        this.TenderTypeName = undefined;
        this.TypeSubmitted = false;
        this.TypeModal = false;
        this.Spinner = false;
      } else {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Error Occured "
        });
      }
      });
  }
 }
 CreateContact(valid){
  this.ContractSubmitted = true;
   if(valid) {
      this.Spinner = true;
      const UrlAddress = "/BL_CRM_Txn_Enq_Tender/Create_Tender_Form_Of_Contract";
      const obj = { Form_Of_Contract : this.FormOfContract  };
      this.$http.post(UrlAddress, obj).subscribe((data: any) => {
        console.log(data)
      if (data.success) {
        this.Spinner = false;
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "",
            detail: "Succesfully Form of Contact Created"
          });
        // } else {
        //   this.compacctToast.clear();
        //   this.compacctToast.add({
        //     key: "compacct-toast",
        //     severity: "success",
        //     summary: "",
        //     detail: "Contact Already Exits"
        //   });
        // }
        this.GetContractList();
        this.ContractSubmitted = false;
        this.FormOfContract = undefined;
        this.ContactModal = false;
        this.Spinner = false;
      } else {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Error Occured "
        });
      }
      });
    }
 }
 CreatePayment(valid){
  this.PaymentSubmitted = true;
   if(valid) {
      this.Spinner = true;
      const UrlAddress = "/BL_CRM_Txn_Enq_Tender/Create_Tender_Payment_Type";
      const obj = { Tender_Payment_Mode: this.TenderPaymentMode };
      this.$http.post(UrlAddress, obj).subscribe((data: any) => {
        console.log(data)
      if (data.success) {
        this.Spinner = false;
        // if (this.ObjTender.Tender_Doc_ID) {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "",
            detail: "Succesfully Payment Type Created"
          });
        // } else {
        //   this.compacctToast.clear();
        //   this.compacctToast.add({
        //     key: "compacct-toast",
        //     severity: "success",
        //     summary: "",
        //     detail: "Payment Type Already Exits"
        //   });
        //}
        this.GetPaymentList();
        this.PaymentSubmitted = false;
        this.TenderPaymentMode = undefined;
        this.PaymentModal = false;
        this.Spinner = false;
      } else {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Error Occured "
        });
      }
      });
    }
 }

 // data
 FecthTask(footfallID) {
   let arr = [];
   for(let i=0; i < this.IntimationSelect.length;i++){
     this.ObjTask.Tender_Doc_ID = Number(footfallID);
     this.ObjTask.Tagged_To_User_ID = this.IntimationSelect[i];
     this.ObjTask.Created_By =  this.commonApi.CompacctCookies.User_ID;
     this.ObjTask.Last_Updated_On =  this.DateService.dateConvert(new Date());
     this.ObjTask.Created_On =  this.DateService.dateConvert(new Date());
     const tt = moment(new Date(this.ObjTender.Tender_Opening_Date)).subtract( 1,'days')['_d'];
     this.ObjTask.Due_On = this.DateService.dateConvert(tt);
     this.ObjTask.Task_Subject = 'Review Tender ('+this.ObjTender.Tender_Name+' - '+this.GetOrgName(this.ObjTender.Tender_Org_ID)+' - '+this.ObjTender.Tender_Amount+')';
     arr.push(this.ObjTask);
     this.ObjTask = new Task();
   }
   console.log(arr)
   this.SaveTask(JSON.stringify(arr));
 }
 FetchEMDdata() {
  const today = this.DateService.dateConvert(new Date());
  this.ObjEMD.EMD_Amount_Deposit_Date =   this.ObjEMD.EMD_Amount_Deposit_Date  ?   this.ObjEMD.EMD_Amount_Deposit_Date : today;
   if(this.ObjEMD.EMD_Amount_Deposit_Type === 'BG') {
    this.ObjEMD.EMD_BG_Creation_Date =   this.EMDBGDate  ?  this.DateService.dateConvert(new Date(this.EMDBGDate)) : today;
    this.ObjEMD.EMD_BG_Exp_Date =   this.EMDBGExpDate  ?   this.DateService.dateConvert(new Date(this.EMDBGExpDate)) : today;
    this.ObjEMD.EMD_FD_Mature_Date = '';
    this.ObjEMD.EMD_NEFT_Txn_Date = '';
    this.ObjEMD.EMD_NEFT_TXN_No = '';
    this.ObjEMD.EMD_FD_Mature_Amount = 0;
    this.ObjEMD.EMD_FD_Amount = 0;
   }
    if (this.ObjEMD.EMD_Amount_Deposit_Type === 'FD') {
    this.ObjEMD.EMD_FD_Mature_Date =   this.EMDMatureDate ?  this.DateService.dateConvert(new Date(this.EMDMatureDate)) : today;
    this.ObjEMD.EMD_BG_Creation_Date = '';
    this.ObjEMD.EMD_BG_Exp_Date = '';
    this.ObjEMD.EMD_NEFT_Txn_Date = '';
    this.ObjEMD.EMD_NEFT_TXN_No = '';
   }
    if ((this.ObjEMD.EMD_Amount_Deposit_Type ==='NEFT' || this.ObjEMD.EMD_Amount_Deposit_Type ==='RTGS')) {
    this.ObjEMD.EMD_NEFT_Txn_Date =   this.EMDNEFTDate  ?    this.DateService.dateConvert(new Date(this.EMDNEFTDate)) : today;
    this.ObjEMD.EMD_BG_Creation_Date = '';
    this.ObjEMD.EMD_BG_Exp_Date = '';
    this.ObjEMD.EMD_FD_Mature_Date = '';
    this.ObjEMD.EMD_FD_Mature_Amount = 0;
    this.ObjEMD.EMD_FD_Amount = 0;
   }
 }

 // Search
 changeSearchType() {
  this.ObjSearch.From_Date = undefined;
  this.ObjSearch.To_Date = undefined;
  this.ObjSearch.Search_Text = undefined;
 }
 SearchTender(valid) {
  this.TenderSearchForm = true;
  this.TenderList = [];
  this.TenderId = undefined;
  this.BackupTenderList = []
  this.DTAutorityList = [];
  this.DTCallingDivList = [];
  this.DTCategoryList = [];
  this.DTStateList = [];
  this.DTLocationList = [];
  if (valid) {
    this.Spinner = true;
    const obj = new HttpParams()
    .set("Search_Type", this.ObjSearch.Search_Type)
    .set("From_Date", this.ObjSearch.From_Date ?  this.DateService.dateConvert(new Date(this.ObjSearch.From_Date)) : this.DateService.dateConvert(new Date()))
    .set("To_Date", this.ObjSearch.To_Date ?  this.DateService.dateConvert(new Date(this.ObjSearch.To_Date)) : this.DateService.dateConvert(new Date()))
    .set("Search_Text",this.ObjSearch.Search_Text ? this.ObjSearch.Search_Text : undefined);
    this.$http
      .get("/BL_CRM_Txn_Enq_Tender/Get_All_Tender_Browse", { params: obj })
      .subscribe((res: any) => {
        const data = res ? JSON.parse(res) : [];
        console.log("data",data);
        console.log("data length",data.length);
        if(data.length){
          this.TenderList = data.length ? data : [];
        // this.BidTenderList = data.length ? data[0] : [];
        // this.TenderAmountChange(this.BidTenderList.Tender_Amount);
        this.BackupTenderList = data.length ? data : [];
        const distARR = this.GetDistinctItems.GetMultipleDistinct(this.BackupTenderList,['Tender_Organization','Tender_Calling_Div_Name','Tender_Category_Name','State','Location']);
        console.log("Filter Data",distARR);
        this.DTAutorityList = distARR[0];
        this.DTCallingDivList = distARR[1];
        this.DTCategoryList = distARR[2];
        this.DTStateList = distARR[3];
        this.DTLocationList = distARR[4];
        this.TenderSearchForm = false;
        console.log("TenderList",this.TenderList);
        }
        this.Spinner = false;
      });
  }
  }
  FilterDist() {
    let DTAutority = [];
    let DTCallingDiv = [];
    let DTCategory = [];
    let DTState = [];
    let DTLocation = [];
    let searchFields = [];
    

    if (this.SelectedDTAutority.length) {
      searchFields.push('Tender_Organization');
      DTAutority = this.SelectedDTAutority;
    }
    if (this.SelectedDTCallingDiv.length) {
      searchFields.push('Tender_Calling_Div_Name');
      DTCallingDiv = this.SelectedDTCallingDiv;
    }
    if (this.SelectedDTCategory.length) {
      searchFields.push('Tender_Category_Name');
      DTCategory = this.SelectedDTCategory;
    }
    if (this.SelectedDTState.length) {
      searchFields.push('State');
      DTState = this.SelectedDTState;
    }
    if (this.SelectedDTLocation.length) {
      searchFields.push('Location');
      DTLocation = this.SelectedDTLocation;
    }
    this.TenderList = [];
    if (searchFields.length) {
      let LeadArr = this.BackupTenderList.filter(function (e) {
        return ((DTAutority.length ? DTAutority.includes(e['Tender_Organization']) : true) &&
        (DTCallingDiv.length ? DTCallingDiv.includes(e['Tender_Calling_Div_Name']) : true) &&
        (DTCategory.length ? DTCategory.includes(e['Tender_Category_Name']) : true) &&
        (DTState.length ? DTState.includes(e['State']) : true) &&
        (DTLocation.length ? DTLocation.includes(e['Location']) : true)
        )
      });
      this.TenderList = LeadArr.length ? LeadArr : [];
    } else {
      this.TenderList = this.BackupTenderList;
    }
  }
// Save
  SaveTenderMaster(valid) {
    console.log("ObjTender.PSD_Acc_Voucher_No",this.ObjTender.PSD_Acc_Voucher_No);
  this.TenderFormSubmitted = true;
  console.log("valid",valid);
  if (valid) {
  this.Spinner = true;
  this.ObjTender.Tender_Opening_Date = this.ObjTender.Tender_Opening_Date ? this.ObjTender.Tender_Opening_Date : this.DateService.dateTimeConvert(new Date(this.TenderOpenDate));
  this.ObjTender.Tender_Closing_Date = '01/01/1900'
  this.ObjTender.Tender_Publish_Date = this.ObjTender.Tender_Publish_Date ? this.ObjTender.Tender_Publish_Date : this.DateService.dateTimeConvert(new Date(this.TenderPublishDate));

  this.ObjTender.T_Fee_Date_of_Issue = this.ObjTender.T_Fee_Date_of_Issue ? this.ObjTender.T_Fee_Date_of_Issue : this.DateService.dateConvert(new Date(this.TenderIssueDate));
  this.ObjTender.T_Fee_Date_of_Expiry = this.ObjTender.T_Fee_Date_of_Expiry ? this.ObjTender.T_Fee_Date_of_Expiry : this.DateService.dateConvert(new Date(this.TenderExpiryDate));
  this.ObjTender.EMD_Date_of_Issue = this.ObjTender.EMD_Date_of_Issue ? this.ObjTender.EMD_Date_of_Issue : this.DateService.dateConvert(new Date(this.EMDIssueDate));
  this.ObjTender.EMD_Date_of_Expiry = this.ObjTender.EMD_Date_of_Expiry ? this.ObjTender.EMD_Date_of_Expiry : this.DateService.dateConvert(new Date(this.EMDExpiryDate));
  this.ObjTender.PSD_Date_of_Issue = this.ObjTender.PSD_Date_of_Issue ? this.ObjTender.PSD_Date_of_Issue : this.DateService.dateConvert(new Date(this.PerformanceIssueDate));
  this.ObjTender.PSD_Date_of_Expiry = this.ObjTender.PSD_Date_of_Expiry ? this.ObjTender.PSD_Date_of_Expiry : this.DateService.dateConvert(new Date(this.PerformanceExpiryDate));
  
  this.ObjTender.T_Fee_Date_of_Issue = this.ObjTender.T_Fee_Payment_Mode ? this.ObjTender.T_Fee_Date_of_Issue : '01/01/1900'
  this.ObjTender.T_Fee_Date_of_Expiry = this.ObjTender.T_Fee_Payment_Mode ? this.ObjTender.T_Fee_Date_of_Expiry : '01/01/1900'
  this.ObjTender.PSD_Date_of_Issue = this.ObjTender.PSD_Payment_Mode ? this.ObjTender.PSD_Date_of_Issue : '01/01/1900'
  this.ObjTender.PSD_Date_of_Expiry = this.ObjTender.PSD_Payment_Mode ? this.ObjTender.PSD_Date_of_Expiry : '01/01/1900'
  
  this.ObjTender.Posted_On = this.DateService.dateTimeConvert(new Date());
  this.ObjTender.User_ID =  this.commonApi.CompacctCookies.User_ID;
  this.ObjTender.Cost_Cen_ID =  this.commonApi.CompacctCookies.Cost_Cen_ID;
  this.ObjTender.Tender_Doc_ID =  this.ObjTender.Tender_Doc_ID ? this.ObjTender.Tender_Doc_ID : 0;
  console.log("Tender data",this.ObjTender);
  const UrlAddress = "/BL_CRM_Txn_Enq_Tender/Insert_Enq_Tender";
  const obj = { Enq_Tender_String: JSON.stringify([this.ObjTender]) };
  this.$http.post(UrlAddress, obj).subscribe((data: any) => {
    if (data.success) {
      this.FootfalID = data.Tender_Doc_ID;
      // this.FecthTask(data.Tender_Doc_ID);
      this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "success",
          summary: "Tender Doc ID  :" +  this.FootfalID,
          detail: "Tender for "+this.ObjTender.Tender_Name+" of " + this.GetOrgName(this.ObjTender.Tender_Org_ID)+" Saved Successfully"
        });
        this.Spinner = false;
        this.TenderFormSubmitted = false;
      console.group("Compacct V2");
      console.log("%c  Tender Sucess:", "color:green;");
      console.log("/BL_CRM_Txn_Enq_Tender/Insert_Enq_Tender");
      this.clearData();
    } else {
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: "Error Occured "
      });
    }
  });
  } else {
    // if(!this.IntimationSelect.length){
    //   this.compacctToast.clear();
    //     this.compacctToast.add({
    //       key: "compacct-toast",
    //       severity: "error",
    //       summary: "Warn Message",
    //       detail: "No Intimation Found, Please Choose a Intimation "
    //     });
    // }
  }
  }
  SaveTask(obj){
    this.$http
    .post("/BL_CRM_Txn_Enq_Task/Insert_Enq_Task", { Enq_Task_String: obj })
    .subscribe((data: any) => {
      if (data.success === true) {
       // this.SendEmail(this.FootfalID);
       const foot =  this.FootfalID;
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "success",
          summary: "Lead ID  :" +  this.FootfalID,
          detail: "Tender for "+this.ObjTender.Tender_Name+" of " + this.GetOrgName(this.ObjTender.Tender_Org_ID)+" Saved Successfully"
        });
         // this.clearData();
          this.FootfalID = foot;
          this.ObjTender.Tender_Doc_ID = foot;
          this.Spinner = false;
          this.buttonname = "Update";
        console.group("Compacct V2");
        console.log("%c  Task Sucess:", "color:green;");
        console.log("/BL_CRM_Txn_Enq_Task/Insert_Enq_Task");
      } else {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Error Occured "
        });
      }
    });
  }

  SaveEMD(valid){
    this.EMDSubmitted = true;
    console.log(this.EMDBGExpDate)
    if (valid) {
      const today = this.DateService.dateConvert(new Date());
      this.ObjEMD.EMD_Date_of_Expiry =   this.EMDUpdateDepositDate  ?   this.DateService.dateConvert(new Date(this.EMDUpdateDepositDate)) : today;
      this.ObjEMD.EMD_Date_of_Issue =   this.EMDUpdateDeposit  ?   this.DateService.dateConvert(new Date(this.EMDUpdateDeposit)) : today;
      this.FetchEMDdata();
      console.log( this.ObjEMD)
     this.Spinner = true;
      const UrlAddress = "/BL_CRM_Txn_Enq_Tender/Update_EMD_Tender";
      this.$http.post(UrlAddress, this.ObjEMD).subscribe((data: any) => {
        if (data.success) {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "Tender ID  :" +  this.ObjEMD.Tender_Doc_ID,
            detail: "Succesfully EMD Updated"
          });
          this.SearchTender(true);
          this.EMDSubmitted = false;
          this.ObjEMD = new EMD();
          this.EMDModal = false;
          this.Spinner = false;
          console.group("Compacct V2");
          console.log("%c  EMD Sucess:", "color:green;");
          console.log("/BL_CRM_Txn_Enq_Tender/Update_EMD");
        } else {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message",
            detail: "Error Occured "
          });
        }
      });
    }
  }
  SaveFee(valid){
    this.TenderFeeSubmitted = true;
    console.log("valid",valid);
    if (valid) {
      this.Spinner = true;
      const today = this.DateService.dateConvert(new Date());
      this.ObjtenerFee.T_Fee_Date_of_Expiry =   this.TenderExpiryDateupdate  ?  this.DateService.dateConvert( new Date(this.TenderExpiryDateupdate) ) : today;
      this.ObjtenerFee.T_Fee_Date_of_Issue =   this.TenderIssueDateupdate  ?   this.DateService.dateConvert(  new Date(this.TenderIssueDateupdate) ) : today;
      // this.Obj 
      console.log( this.ObjtenerFee)
      const UrlAddress = "/BL_CRM_Txn_Enq_Tender/Update_Tender_Fee_New";
      this.$http.post(UrlAddress, this.ObjtenerFee).subscribe((data: any) => {
        if (data.success) {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "Tender ID  :" +  this.ObjtenerFee.Tender_Doc_ID,
            detail: "Succesfully Tender Fee Updated"
          });
          this.SearchTender(true);
          this.TenderFeeSubmitted = false;
          this.ObjtenerFee = new tenerFee();
          this.TenderFeeModal = false;
          this.Spinner = false;
          console.group("Compacct V2");
          console.log("%c  Tender Free Sucess:", "color:green;");
          console.log("/BL_CRM_Txn_Enq_Tender/Update_Tender_Fee");
        } else {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message",
            detail: "Error Occured "
          });
        }
      });
    }
  }
  SavePerformanceSecurity(valid){
    this.PerformanceFormSubmitted = true;
    console.log("valid",valid);
    if (valid) {
      this.Spinner = true;
      const today = this.DateService.dateConvert(new Date());
      this.ObjPerformanceSecurity.PSD_Date_of_Expiry =   this.PerformanceExpiryDateUpdate  ?  this.DateService.dateConvert( new Date(this.PerformanceExpiryDateUpdate) ) : today;
      this.ObjPerformanceSecurity.PSD_Date_of_Issue =   this.PerformanceIssueDateUpdate  ?   this.DateService.dateConvert(  new Date(this.PerformanceIssueDateUpdate) ) : today;
      // this.Obj 
      console.log( this.ObjPerformanceSecurity)
      const UrlAddress = "/BL_CRM_Txn_Enq_Tender/Update_Performance_Security";
      this.$http.post(UrlAddress, this.ObjPerformanceSecurity).subscribe((data: any) => {
        if (data.success) {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "Tender ID  :" +  this.ObjPerformanceSecurity.Tender_Doc_ID,
            detail: "Succesfully Tender Fee Updated"
          });
          this.SearchTender(true);
          this.PerformanceFormSubmitted = false;
          this.ObjPerformanceSecurity = new PerformanceSecurity();
          this.PerformanceSecurityModel = false;
          this.Spinner = false;
          console.group("Compacct V2");
          console.log("%c  Tender Free Sucess:", "color:green;");
          console.log("/BL_CRM_Txn_Enq_Tender/Update_Tender_Fee");
        } else {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message",
            detail: "Error Occured "
          });
        }
      });
    }
  }
  SaveSubmissionDate(valid) {
    this.SubmissionSubmitted = false;
    if(valid) {
      this.Spinner = true;
      this.ObjSubmission.Tender_Submission_Date = this.DateService.dateTimeConvert(new Date(this.SubmissionDate))
      this.$http
        .post("BL_CRM_Txn_Enq_Tender/Update_Submission_Date",this.ObjSubmission)
        .subscribe((data: any) => {
          if (data.success === true) {
              this.compacctToast.clear();
              this.compacctToast.add({
                key: "compacct-toast",
                severity: "success",
                summary: "Succesfully Submission Date Updated"
              });
              this.SearchTender(true);
              this.SubmissionSubmitted = false;
              this.SubmissionModal = false;
              this.SubmissionDate = new Date();
              this.Spinner = false;
              this.ObjSubmission = new Submission();
            console.group("Compacct V2");
            console.log("%c  Submission Date Updated:", "color:green;");
            console.log("BL_CRM_Txn_Enq_Tender/Update_Submission_Date");
          } else {
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "error",
              summary: "Warn Message",
              detail: "Error Occured "
            });
          }
        });
    }
  }

  // Edit & UPDATES
  EditTender(obj) {
    this.clearData();
    if (obj.Tender_Doc_ID) {
    this.tabIndexToView = 1;
    this.items = ["BROWSE", "UPDATE"];
    this.buttonname = "Update";
    this.ObjTender = obj;
    this.locationInput.nativeElement.value = obj.Location ? obj.Location : '';
    this.TenderAmountChange(obj.Tender_Amount);
    this.TenderFeeChange(obj.T_Fee_Amount);
    this.TenderEMDChange(obj.EMD_Amount);
    this.TenderPeriodOfWorkChange(obj.Period_Of_Work);
    this.FootfalID = obj.Tender_Doc_ID;
    this.GetTask(this.FootfalID , true);
    this.TenderPublishDate = new Date(obj.Tender_Publish_Date);
    this.ObjTender.Tender_Publish_Date =  this.DateService.dateTimeConvert(new Date(obj.Tender_Publish_Date));
    this.TenderEndDate =  new Date(obj.Tender_Closing_Date);
    // this.ObjTender.Tender_Closing_Date =  this.DateService.dateTimeConvert(new Date(obj.Tender_Closing_Date));
    this.TenderOpenDate = new Date(obj.Tender_Opening_Date);
    this.ObjTender.Tender_Opening_Date =  this.DateService.dateTimeConvert(new Date(obj.Tender_Opening_Date));
    //this.GetEditMasterTender(obj);
    }
  }
  GetEditMasterTender(obj) {
  }
  UpdateEMD(obj) {
    this.EMDSubmitted = false;
    this.ObjEMD = new EMD();
    this.EMDModal = false;
    this.EMDDepositDate = new Date();
    this.EMDBGDate = new Date();
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    this.EMDBGExpDate = new Date(date);
    this.EMDMatureDate = new Date();
    this.EMDNEFTDate = new Date();
    this.EMDAmount = undefined;
    this.updateEMDAmount = undefined;
    this.FDAmount = undefined;
    this.FDMaturityAmount =undefined;
    this.Spinner = false;
    if(obj.Tender_Doc_ID) {
      this.GetUpdatedEMD(obj.Tender_Doc_ID);
      this.ObjEMD.Tender_Doc_ID = obj.Tender_Doc_ID;
    }
  }
  UpdateTenderFee(obj) {
    this.TenderFeeSubmitted = false;
    this.ObjFee = new Fee();
    this.FeeDepositDate = new Date();
    this.FeeTransactionDate = new Date();
    this.Spinner = false;
    if(obj.Tender_Doc_ID) {
      this.ObjtenerFee.Tender_Doc_ID = obj.Tender_Doc_ID;
      this.GetUpdatedFee(obj.Tender_Doc_ID);
    }
  }
  UpdatePerformanceSecurity(obj) {
    this.PerformanceFormSubmitted = false;
    this.ObjFee = new Fee();
    this.FeeDepositDate = new Date();
    this.FeeTransactionDate = new Date();
    this.PerformanceSecurityAmount = undefined;
    this.UpdatePerformanceSecurityAmount = undefined;
    this.Spinner = false;
    if(obj.Tender_Doc_ID) {
      this.ObjPerformanceSecurity.Tender_Doc_ID = obj.Tender_Doc_ID;
      this.GetUpdatedPerformanceSecurity(obj.Tender_Doc_ID);
    }
  }
  UpdateSubmissionDate(obj){
    this.SubmissionSubmitted = false;
    this.SubmissionModal = false;
    this.SubmissionDate =  new Date();
    this.ObjSubmission = new Submission();
    this.Spinner = false;
    if(obj.Tender_Doc_ID){
      this.ObjSubmission.Tender_Doc_ID =obj.Tender_Doc_ID;
      if(obj.Tender_Submission_Date) {
       // this.SubmissionDate = moment(new Date(obj.Tender_Submission_Date))format("YYYY-MM-DDTHH:mm");
       this.SubmissionDate =  new Date(obj.Tender_Submission_Date);
        this.ObjSubmission.Tender_Submission_Date =  this.DateService.dateTimeConvert(new Date(obj.Tender_Submission_Date));
      }
      this.SubmissionModal = true;
    }
  }

  GetUpdatedEMD(TenderDocID) {
    if(TenderDocID) {
      const obj = new HttpParams()
      .set("Tender_Doc_ID",TenderDocID);
    this.$http
      .get("/BL_CRM_Txn_Enq_Tender/Get_EMD_Tender_Json", { params: obj })
      .subscribe((data: any) => {
        
        const obj = data ? JSON.parse(data)[0] : {};
        console.log("EMD UPdate Data",obj);
        this.ObjEMD = obj;
        console.log("ObjEMD",this.ObjEMD);
        
        //   this.TenderEMDChange(obj.EMD_Amount);
        // if (obj.EMD_Amount_Deposit_Type) {
        //   this.ObjEMD.EMD_Amount_Deposit_Type = obj.EMD_Amount_Deposit_Type;
        //   this.EMDDepositDate = new Date(obj.EMD_Amount_Deposit_Date);
        //   this.ObjEMD.EMD_Amount_Deposit_Date = this.DateService.dateConvert(obj.EMD_Amount_Deposit_Date);
        //   if(this.ObjEMD.EMD_Amount_Deposit_Type === 'BG') {
        //    this.ObjEMD.EMD_BG_Creation_Date = this.DateService.dateConvert(obj.EMD_BG_Creation_Date);
        //    this.EMDBGDate = new Date(obj.EMD_BG_Creation_Date);
        //    this.ObjEMD.EMD_BG_Exp_Date =   this.DateService.dateConvert(obj.EMD_BG_Exp_Date);
        //    this.EMDBGExpDate = new Date(obj.EMD_BG_Exp_Date);
        //   } else if (this.ObjEMD.EMD_Amount_Deposit_Type === 'FD') {
        //    this.ObjEMD.EMD_FD_Mature_Date =   this.DateService.dateConvert(obj.EMD_FD_Mature_Date);
        //    this.EMDMatureDate = new Date(obj.EMD_FD_Mature_Date);
        //    this.TenderFDMaturityChange(obj.EMD_FD_Mature_Amount);
        //    this.TenderFDChange(obj.EMD_FD_Amount);
        //   }else if ((this.ObjEMD.EMD_Amount_Deposit_Type ==='NEFT' || this.ObjEMD.EMD_Amount_Deposit_Type ==='RTGS')) {
        //    this.ObjEMD.EMD_NEFT_Txn_Date =   this.DateService.dateConvert(obj.EMD_NEFT_Txn_Date);
        //    this.EMDNEFTDate = new Date(obj.EMD_NEFT_Txn_Date);
        //    this.ObjEMD.EMD_NEFT_TXN_No = obj.EMD_NEFT_TXN_No;
        //   }
        // }
        this.EMDUpdateDepositDate = new Date(obj.EMD_Date_of_Expiry);
        this.EMDUpdateDeposit = new Date(obj.EMD_Date_of_Issue);
        this.TenderEMDChange(obj.EMD_Amount)
       this.EMDModal = true;
      });
    }
  }
  GetUpdatedFee(Tender_Doc_ID) {
    if(Tender_Doc_ID) {
      const obj = new HttpParams()
      .set("Tender_Doc_ID",Tender_Doc_ID);
    this.$http
      .get("/BL_CRM_Txn_Enq_Tender/Get_EMD_Tender_Json", { params: obj })
      .subscribe((data: any) => {
        const obj = data ? JSON.parse(data)[0] : {};
        console.log("tenerFeeList",obj);
         if (obj) {
            this.ObjtenerFee = obj;
            this.TenderIssueDateupdate = new Date(obj.T_Fee_Date_of_Issue);
            this.TenderExpiryDateupdate = new Date(obj.T_Fee_Date_of_Expiry);
            this.ObjFee.T_Fee_Amount_Deposit_Date = this.DateService.dateConvert(obj.T_Fee_Amount_Deposit_Date);
            this.ObjFee.T_Fee_NEFT_Txn_Date = this.DateService.dateConvert(obj.T_Fee_NEFT_Txn_Date);
            this.TenderFeeUpdateChange(obj.T_Fee_Amount);
          }
        
        
        this.TenderFeeModal = true;
      });
    }
  }
  GetUpdatedPerformanceSecurity(Tender_Doc_ID) {
    if(Tender_Doc_ID) {
      const obj = new HttpParams()
      .set("Tender_Doc_ID",Tender_Doc_ID);
    this.$http
      .get("/BL_CRM_Txn_Enq_Tender/Get_EMD_Tender_Json", { params: obj })
      .subscribe((data: any) => {
        const obj = data ? JSON.parse(data)[0] : {};
        console.log("PerformanceSecurity",obj);
        if(obj){
          this.ObjPerformanceSecurity = obj
            this.PerformanceIssueDateUpdate = new Date(obj.PSD_Date_of_Issue);
            this.PerformanceExpiryDateUpdate = new Date(obj.PSD_Date_of_Expiry);
            this.ObjFee.T_Fee_Amount_Deposit_Date = this.DateService.dateConvert(obj.T_Fee_Amount_Deposit_Date);
            this.ObjFee.T_Fee_NEFT_Txn_Date = this.DateService.dateConvert(obj.T_Fee_NEFT_Txn_Date);
          this.PerformanceSecurityChange(obj.APSD_Amount);
        }
        
        this.PerformanceSecurityModel = true;
      });
    }
  }
  // Delete
  onConfirm() {
    if ( this.TenderId) {
      this.$http
        .post("/BL_CRM_Txn_Enq_Tender/Delete_Tender", { Tender_Doc_ID:  this.TenderId })
        .subscribe((data: any) => {
          if (data.success === true) {
            this.onReject();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "LEAD ID: " + this.TenderId,
              detail: "Succesfully Deleted"
            });
            this.SearchTender(true);
          }
        });
    }
  }
  onReject() {
    this.compacctToast.clear("c");
  }
  DeleteTender(obj) {
    this.TenderId = undefined;
    if (obj.Tender_Doc_ID) {
      this.TenderId = obj.Tender_Doc_ID;
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
  // Clear & Tab
  TabClick(e) {
    this.tabIndexToView = e.index;
    this.items = ["BROWSE", "CREATE" ,"BID OPENING"];
    this.buttonname = "Create";
    this.clearData();
  }
  clearData() {
    this.Spinner = false;
    this.TenderSearchForm = false;
    this.TenderFormSubmitted = false;
    this.ObjTender = new Tender();
     this.TenderOpenDate = new Date();
    this.TenderEndDate =  new Date();
    this.TenderPublishDate = new Date();
    this.ViewFlag = false;
    this.FootfalID = undefined;
    this.IntimationSelect = [];
    this.TFeeAmount = undefined;
    this.TFeeAmountupdate = undefined;
    this.TenderAmount = undefined;
    this.EMDAmount = undefined;
    this.updateEMDAmount = undefined;
    this.UpdatePerformanceSecurityAmount = undefined;
    this.PerformanceSecurityAmount = undefined;
    this.PeriodOfWork = undefined;
    this.locationInput.nativeElement.value = '';
    this.TenderId = undefined;
    this.AgreementSubmitted = false;

  }
  GetFlagFromDocument(e) {
    console.log(e);
    this.clearData();
    this.items = ["BROWSE", "CREATE"];
    this.buttonname = "Create";
  }
  onNavigate(site){
    window.open('//'+site, "_blank");
  }

  CheckIfTenderIDExist(){
    if(this.ObjTender.Tender_ID) {
      const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
      // const params = new HttpParams().set("Tender_ID", this.ObjTender.Tender_ID);
      this.$http
        .get("/BL_CRM_Txn_Enq_Tender/Check_Tender_ID_Exist?Tender_ID="+this.ObjTender.Tender_ID , {headers: headers, responseType: 'text'})
        .subscribe((data: any) => {
          console.log(data);
          if(data === 'True') {
            this.ObjTender.Tender_ID = undefined;
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "error",
              life: 5000,
              summary: "Tender ID Error Message",
              detail: "Tender ID Already Exist."
            });
          }
        });
    }
  }
  CheckIfTenderRefNoExist(){
    if( this.ObjTender.Tender_Ref_No) {
      const params = new HttpParams().set("Tender_Ref_No", this.ObjTender.Tender_Ref_No);
      this.$http
        .get("/BL_CRM_Txn_Enq_Tender/Check_Tender_Ref_No_Exist", { params })
        .subscribe((data: any) => {
          console.log(data);
        });
    }
  }
  CheckIfTenderNameExist(){
    if(this.ObjTender.Tender_Name) {
      const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
      const params = new HttpParams().set("Tender_Name", this.ObjTender.Tender_Name);
    this.$http
      .get("/BL_CRM_Txn_Enq_Tender/Check_Tender_Name_Exist?Tender_Name="+ this.ObjTender.Tender_Name, {headers: headers, responseType: 'text'})
      .subscribe((data: any) => {
        if(data === 'True') {
          this.ObjTender.Tender_Name = undefined;
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            life: 5000,
            summary: "Tender Name Error Message",
            detail: "Work Title Already Exist."
          });
        }
      });
    }
  }
  // COMMON FOCUS
  onFocusInEvent(field,Amt){
    if(Amt){
      if(field === 'TenderAmount') {
        this.TenderAmount = Amt.split("₹").join("").split(",").join("");
      }
      if(field === 'PerformanceSecurityAmount') {
        this.PerformanceSecurityAmount = Amt.split("₹").join("").split(",").join("");
        this.UpdatePerformanceSecurityAmount = Amt.split("₹").join("").split(",").join("");
      }
      if(field === 'TFeeAmount') {
        this.TFeeAmount = Amt.split("₹").join("").split(",").join("");
      }
      if(field === 'TFeeAmountupdate') {
        this.TFeeAmountupdate = Amt.split("₹").join("").split(",").join("");
      }
      if(field === 'EMDAmount') {
        this.EMDAmount = Amt.split("₹").join("").split(",").join("");
        this.updateEMDAmount = Amt.split("₹").join("").split(",").join("");
      }
      if(field === 'FDAmount') {
        this.FDAmount = Amt.split("₹").join("").split(",").join("");
      }
      if(field === 'FDMaturityAmount') {
        this.FDMaturityAmount = Amt.split("₹").join("").split(",").join("");
      }
      if(field === 'ISDAmount') {
        this.ISDAmount = Amt.split("₹").join("").split(",").join("");
      }
      if(field === 'APSDAmount') {
        this.APSDAmount = Amt.split("₹").join("").split(",").join("");
      }
      if(field === 'ISDFDAmount') {
        this.ISDFDAmount = Amt.split("₹").join("").split(",").join("");
      }
      if(field === 'AgreementValue') {
        this.AgreementValue = Amt.split("₹").join("").split(",").join("");
      }
      if(field === 'ISDFDMaturityAmount') {
        this.ISDFDMaturityAmount = Amt.split("₹").join("").split(",").join("");
      }
      if(field === 'APSDFDAmount') {
        this.APSDFDAmount = Amt.split("₹").join("").split(",").join("");
      }
      if(field === 'APSDFDMaturityAmount') {
        this.APSDFDMaturityAmount = Amt.split("₹").join("").split(",").join("");
      }
      if(field === 'ISDMaturityAmount') {
        this.ISDMaturityAmount = Amt.split("₹").join("").split(",").join("");
      }
      if(field === 'APSDMaturityAmount') {
        this.APSDMaturityAmount = Amt.split("₹").join("").split(",").join("");
      }
    }
  }
  onFocusOutEvent(field,Amt){
    //this.PerformanceSecurityChange(obj.PSD_Amount);
    if(Amt){
      const filterAmt = Amt.split("₹").join("").split(",").join("");
      if(field === 'TenderAmount') {
        this.TenderAmountChange(filterAmt);
      }
      if(field === 'PerformanceSecurityAmount') {
        this.PerformanceSecurityChange(filterAmt)
      }
      if(field === 'TFeeAmount') {
        this.TenderFeeChange(filterAmt);
      }
      if(field === 'TFeeAmountupdate') {
        this.TenderFeeUpdateChange(filterAmt);
      }
      if(field === 'EMDAmount') {
        this.TenderEMDChange(filterAmt);
      }
      if(field === 'FDAmount') {
        this.TenderFDChange(filterAmt);
      }
      if(field === 'FDMaturityAmount') {
        this.TenderFDMaturityChange(filterAmt);
      }
      if(field === 'ISDAmount') {
        this.ISDAmountChange(filterAmt);
      }
      if(field === 'APSDAmount') {
          this.APSDAmountChange(filterAmt);
      }
      if(field === 'ISDFDAmount') {
          this.ISDFDAmountChange(filterAmt);
      }
      if(field === 'AgreementValue') {
          this.AgreementValueAmountChange(filterAmt);
      }
      if(field === 'ISDFDMaturityAmount') {
          this.ISDFDMaturityAmountChange(filterAmt);
      }
      if(field === 'APSDFDAmount') {
          this.APSDFDAmountChange(filterAmt);
      }
      if(field === 'APSDFDMaturityAmount') {
          this.APSDFDMaturityAmountChange(filterAmt);
      }
      if(field === 'ISDMaturityAmount') {
        this.ISDMaturityAmountChange(filterAmt);
      }
      if(field === 'APSDMaturityAmount') {
        this.APSDMaturityAmountChange(filterAmt);
      }
    }
  }

// BID OPEN
GetBidderList() {
  this.$http
    .get("/BL_CRM_Txn_Enq_Tender/Get_Bidder_Json")
    .subscribe((data: any) => {
      this.BidderList = data ? JSON.parse(data) : [];
    });
}
GetAuthorityList() {
  this.$http
    .get("/BL_CRM_Txn_Enq_Tender/Get_Tender_Inviting_Authority_Json")
    .subscribe((data: any) => {
      this.AuthorityList = data ? JSON.parse(data) : [];
    });
}
GetReasonList() {
  this.$http
    .get("/BL_CRM_Txn_Enq_Tender/Get_Not_Awarding_Reason_Json")
    .subscribe((data: any) => {
      const List = data ? JSON.parse(data) : [];
      List.forEach(el => {
        this.ReasonList.push({
          label: el.Reason,
          value: el.Reason
        });
      });

    });
}
GetFinancialYearList() {
  this.$http
    .get("/BL_CRM_Txn_Enq_Tender/Get_Tender_Fin_Year_Name_Json")
    .subscribe((data: any) => {
      this.FinancialYearList = data ? JSON.parse(data) : [];
    });
}
GetIFBidExist(TenderDocID) {
  if (this.PDFFlag) {
    this.fileInput.clear();
    this.BOQdataString =  [];
  }
  if(TenderDocID) {
    const params = new HttpParams().set("Tender_Doc_ID", TenderDocID);
    this.$http
      .get("/BL_CRM_Txn_Enq_Tender/Get_Tender_Bidding_Common_Json", { params })
      .subscribe((data: any) => {
       const TempArr = data ? JSON.parse(data) : [];
       console.log("all data TempArr",TempArr);
       if(TempArr[0].Tender_Doc_ID) {
         this.BidEditFlag = true;
         const obj = TempArr[0];
          this.ObjBidOpening = obj;
          this.BidOpenListView = obj;
          if(this.ObjBidOpening['BOQ_File_Name']) {
            this.GetBOQExcelList(TenderDocID);
          } else {
            this.BOQExcelList = [];
          }
          this.GetBidOpenList(TenderDocID);
          this.GetRankBidOpenList(TenderDocID);
          if(obj.Financial_Bid_Status === 'AWARDING THE TENDER') {
          this.ISDAmountChange(obj.ISD_Amount);
          this.APSDAmountChange(obj.APSD_Amount);
          this.ISDMaturityAmountChange(obj.ISD_Maturity_Amount);
          this.APSDMaturityAmountChange(obj.APSD_Maturity_Amount);
          this.GetDivision(obj.Circle)
          if(obj.ISD_FD_Amount){
            this.ISDFDAmountChange(obj.ISD_FD_Amount);
          }
          if(obj.ISD_FD_Mature_Amount){
            this.ISDFDMaturityAmountChange(obj.ISD_FD_Mature_Amount);
          }
          if(obj.APSD_FD_Amount){
            this.APSDFDAmountChange(obj.APSD_FD_Amount);
          }
          if(obj.APSD_FD_Mature_Amount){
            this.APSDFDMaturityAmountChange(obj.APSD_FD_Mature_Amount);
          }
          this.AgreementValueAmountChange(obj.Agreement_Value);
          this.ISDReleaseDate = new Date(obj.ISD_Release_Date);
          this.APSDReleaseDate = new Date(obj.APSD_Release_Date);
          this.ISDDepositDate = new Date(obj.ISD_Deposit_date);
          this.ISDBGDate = obj.ISD_BG_Creation_Date ?  new Date(obj.ISD_BG_Creation_Date) : new Date();
          this.ISDBGExpDate =  obj.ISD_BG_Exp_Date ?  new Date(obj.ISD_BG_Exp_Date) : new Date();
          this.ISDMatureDate =  obj.ISD_FD_Mature_Date ?  new Date(obj.ISD_FD_Mature_Date) : new Date();
          this.ISDNEFTDate =  obj.ISD_NEFT_Txn_Date ?  new Date(obj.ISD_NEFT_Txn_Date) : new Date();
          this.APSDDepositDate = new Date(obj.APSD_Deposit_date);
          this.APSDBGDate =  obj.APSD_BG_Creation_Date ?  new Date(obj.APSD_BG_Creation_Date) : new Date();
          this.APSDBGExpDate =  obj.APSD_BG_Exp_Date ?  new Date(obj.APSD_BG_Exp_Date) : new Date();
          this.APSDMatureDate =  obj.APSD_FD_Mature_Date ?  new Date(obj.APSD_FD_Mature_Date) : new Date();
          this.APSDNEFTDate =  obj.APSD_NEFT_Txn_Date ?  new Date(obj.APSD_NEFT_Txn_Date) : new Date();
          this.CommencementDate = new Date(obj.Date_of_Commencement);
          this.CompletionDate = new Date(obj.Date_of_Completion);
          this.PeriodOfCompletion = obj.Periods_of_Completion;
          }
          if(obj.Financial_Bid_Status === 'NOT- AWARDING THE TENDER') {
            const arrTemp =  this.ObjBidOpening.Not_Awarding_Reason ?  this.ObjBidOpening.Not_Awarding_Reason.split(",") : [];
            this.ReasonSelect = arrTemp;
          }

       } else {
        this.BidEditFlag = false;
       }
      });

  }
}
getFileName(url) {
  if(url) {
    const name = url.match(/.*\/(.*)$/)[1];
    return name;
  }
}
GetBidOpenList(TenderDocID) {
  if(TenderDocID) {
    const params = new HttpParams().set("Tender_Doc_ID", TenderDocID);
    this.$http
      .get("/BL_CRM_Txn_Enq_Tender/Get_Tender_Bidding_First_Table_Json", { params })
      .subscribe((data: any) => {
        const Arr = data ? JSON.parse(data) : [];
        this.BidOpenListView = Arr;
        // this.BidOpenListView.forEach(el=>{
        //   this.BidOpenListView['Quoted_Rate'] = el.Rate
        // })
        for(let i = 0; i<this.BidOpenListView.length; i++){
          if(!this.BidOpenListView[i]['Quoted_Percentage']){
            this.BidOpenListView[i]['Quoted_Rate'] = this.BidOpenListView[i]['Rate']
          }
         
        }
        console.log("Get BidOpenListView",this.BidOpenListView);
      });
  }
}
GetRankBidOpenList(TenderDocID) {
  this.BidOpenListViewByRate = [];
  this.BidOpenListViewByLottery = [];
  this.BidOpenListViewByRateFlag = false;
  this.BidOpenListViewByLotteryFlag = false;
  if(TenderDocID) {
    const params = new HttpParams().set("Tender_Doc_ID", TenderDocID);
    this.$http
      .get("/BL_CRM_Txn_Enq_Tender/Get_Tender_Bidding_Rank_Json", { params })
      .subscribe((data: any) => {
        const Arr = data ? JSON.parse(data) : [];
        for(let i = 0; i<Arr.length; i++){
          if(!Arr[i]['Quoted_Percentage']){
            Arr[i]['Quoted_Rate'] = Arr[i]['Rate']
          }
         
        }
        console.log("Get BidOpenListViewByRate",Arr);
        if(this.ObjBidOpening.Rank_Type === 'Normal'){
          this.BidOpenListViewByRate = Arr;
          this.BidOpenListViewByRateFlag = true;
        }else {
          this.BidOpenListViewByLottery = [];
          this.BidOpenListViewByLotteryFlag = true;
          this.RetriveRankBidding(Arr);
        }
      });
  }
}
GetBOQExcelList(footfallId) {
  this.BOQExcelList = [];
  if(footfallId) {
    const params = new HttpParams().set("Tender_Doc_ID", footfallId);
    this.$http
      .get("/BL_CRM_Txn_Enq_Tender/Get_Bidding_BOQ_Json", { params })
      .subscribe((data: any) => {
        this.BOQExcelList = data ? JSON.parse(data) : [];
        console.log(this.BOQExcelList)

      });
  }
}
clearBid() {
  this.ISDAmount = undefined;
  this.ISDDepositDate = new Date();
  this.ISDBGDate = new Date();
  this.ISDBGExpDate = new Date();
  this.ISDMatureDate = new Date();
  this.ISDNEFTDate = new Date();
  this.ISDFDAmount = undefined;
  this.ISDFDMaturityAmount =undefined;
  this.APSDAmount = undefined;
  this.APSDDepositDate = new Date();
  this.APSDBGDate = new Date();
  this.APSDBGExpDate = new Date();
  this.APSDMatureDate = new Date();
  this.APSDNEFTDate = new Date();
  this.APSDFDAmount = undefined;
  this.APSDFDMaturityAmount =undefined;
  this.CommencementDate = new Date();
  this.CompletionDate = new Date();
  this.PeriodOfCompletion = undefined;
  this.EstimatedRate = undefined;
  this.BidOpeningFormSubmitted = false;
  this.AgreementValue = undefined;
  this.BoqDocFormSubmitted = false;
  this.BidOpeningFlag = true;
  this.BidOpenListViewByRateFlag = false;
  this.BidOpenListViewByLotteryFlag = false;
  this.BidOpenListView = [];
  this.BidOpenListView =[];
  this.BidOpenListViewByLottery = [];
  this.DivisionList = [];
  this.CircleList = [];
  this.ReasonSelect = [];
  this.ObjBidOpening.Tender_Doc_ID =  undefined;
  this.ObjBidOpening = new BidOpening();
  this.AgreementSubmitted = false;
  this.SpinnerAg = false;
  this.ReasonSelect = undefined;
}
ViewBidOpening(obj) {
  this.TenderDetails = undefined;
  this.ObjAgreement = new Agreement();
  this.clearBid();
  this.BidEditFlag = false;
  if(obj.Tender_Doc_ID){
    this.BidTenderValue(obj.Tender_Doc_ID);
    this.ObjAgreement.Tender_Doc_ID = obj.Tender_Doc_ID
    this.ObjBidOpening.Tender_Doc_ID = obj.Tender_Doc_ID;
    this.ObjBidOpeningList.Tender_Doc_ID = obj.Tender_Doc_ID;
     this.GetCircle(obj.Tender_Org_ID);
    this.TenderDetails = obj;
    this.EstimatedRateChange(obj.Tender_Amount);
    this.GetIFBidExist(obj.Tender_Doc_ID);
     const ctrl = this;
    setTimeout(() => {
      ctrl.tabIndexToView = 2;
    }, 200);
  }

}

BidTenderValue(TenderDocID){
  if(TenderDocID){
    const obj = new HttpParams()
    .set("Tender_Doc_ID",TenderDocID);
  this.$http
    .get("/BL_CRM_Txn_Enq_Tender/Get_All_Tender_Individual_Browse", { params: obj })
    .subscribe((data: any) => {
      const obj = data ? JSON.parse(data)[0] : {};
      console.log("tenerFeeList",obj);
       if (obj) {
          this.BidTenderList = obj;
          this.TenderAmountChange(obj.Tender_Amount);
       }
    });
  }
  
}

RefreshTenderData() {
  if (this.ObjBidOpening.Tender_Doc_ID) {
    const params = new HttpParams().set("Tender_Doc_ID", this.ObjBidOpening.Tender_Doc_ID);
    this.$http
      .get("/BL_CRM_Txn_Enq_Tender/Get_Tender_Amount_For_Refresh", { params })
      .subscribe((data: any) => {
        const obj =  data ? JSON.parse(data)[0] : undefined;
        if(obj.Tender_Amount){
          this.TenderDetails['Tender_Amount'] = obj.Tender_Name;
          this.EstimatedRateChange(obj.Tender_Amount);
          if (this.BidOpenListView.length) {
            for(let i = 0; i < this.BidOpenListView.length; i++) {
              this.BidOpenListView[i].Tender_Value = obj.Tender_Amount;
              const n = String(this.BidOpenListView[i].Quoted_Percentage).includes("-");
              const percentage = n ? String(this.BidOpenListView[i].Quoted_Percentage).replace("-", "") : this.BidOpenListView[i].Quoted_Percentage;
              const PercentageVal = (( Number(percentage) / 100) * Number(this.BidOpenListView[i].Tender_Value));
              const Rate = n ?  Number(this.BidOpenListView[i].Tender_Value) - PercentageVal :  Number(this.BidOpenListView[i].Tender_Value) + PercentageVal;
             // const EstimatedRate = this.BidOpenListView[i].Tender_Value;
              this.BidOpenListView[i].Rate = Rate;
              this.BidOpenListView[i].Rate_In_Words = this.convertNumberToWords(Rate);
              this.BidOpenListView[i].Less_Excess = (n && !(Number(percentage) === 0)) ? 'Less' : Number(this.BidOpenListView[i].Quoted_Percentage) ? 'Excess' : 'Scheduled Rate';

            }
          }
          if (this.BidOpenListViewByRate.length) {
            for(let i = 0; i < this.BidOpenListViewByRate.length; i++) {
              this.BidOpenListViewByRate[i].Tender_Value = obj.Tender_Amount;
              const n = String(this.BidOpenListViewByRate[i].Quoted_Percentage).includes("-");
              const percentage = n ? String(this.BidOpenListViewByRate[i].Quoted_Percentage).replace("-", "") : this.BidOpenListViewByRate[i].Quoted_Percentage;
              const PercentageVal = (( Number(percentage) / 100) * Number(this.BidOpenListViewByRate[i].Tender_Value));
              const Rate = n ?  Number(this.BidOpenListViewByRate[i].Tender_Value) - PercentageVal :  Number(this.BidOpenListViewByRate[i].Tender_Value) + PercentageVal;
              //const EstimatedRate = this.BidOpenListViewByRate[i].Tender_Value;
              this.BidOpenListViewByRate[i].Rate = Rate;
              this.BidOpenListViewByRate[i].Rate_In_Words = this.convertNumberToWords(Rate);
              this.BidOpenListViewByRate[i].Less_Excess = (n && !(Number(percentage) === 0)) ? 'Less' : Number(this.BidOpenListViewByRate[i].Quoted_Percentage) ? 'Excess' : 'Scheduled Rate';

            }
          //  this.RankBiddingCompanies();
          }
          if (this.BidOpenListViewByLottery.length) {
            for(let i = 0; i < this.BidOpenListViewByLottery.length; i++) {
              this.BidOpenListViewByLottery[i].Tender_Value = obj.Tender_Amount;
              const n = String(this.BidOpenListViewByLottery[i].Quoted_Percentage).includes("-");
              const percentage = n ? String(this.BidOpenListViewByLottery[i].Quoted_Percentage).replace("-", "") : this.BidOpenListViewByLottery[i].Quoted_Percentage;
              const PercentageVal = (( Number(percentage) / 100) * Number(this.BidOpenListViewByLottery[i].Tender_Value));
              const Rate = n ?  Number(this.BidOpenListViewByLottery[i].Tender_Value) - PercentageVal :  Number(this.BidOpenListViewByLottery[i].Tender_Value) + PercentageVal;
             // const EstimatedRate = this.BidOpenListViewByLottery[i].Tender_Value;
              this.BidOpenListViewByLottery[i].Rate = Rate;
              this.BidOpenListViewByLottery[i].Rate_In_Words = this.convertNumberToWords(Rate);
              this.BidOpenListViewByLottery[i].Less_Excess = (n && !(Number(percentage) === 0)) ? 'Less' : Number(this.BidOpenListViewByLottery[i].Quoted_Percentage) ? 'Excess' : 'Scheduled Rate';

            }
           // this.RankBiddingCompanies();
          }
          if(this.BidOpenListView.length && (this.BidOpenListViewByRate.length || this.BidOpenListViewByLottery.length)) {
           // this.UpdateStatus()
          }
          this.TenderDetails['Tender_Org_ID'] = obj.Tender_Org_ID;
          this.GetCircle(obj.Tender_Org_ID);
          this.TenderDetails['Tender_Name'] = obj.Tender_Name;
          this.TenderDetails['Tender_ID'] = obj.Tender_ID;
        }
      });

  }
}
EstimatedRateChange(e){
  console.log(e);
  this.ObjBidOpeningList.Tender_Value = undefined;
  if(e) {
    const x= e.toString();
    const number = Number(e);
   const k =  number.toLocaleString('en-IN', {
       maximumFractionDigits: 2,
       style: 'currency',
       currency: 'INR'
   });
   this.ObjBidOpeningList.Tender_Value = Number(e);
   this.EstimatedRate = k;
  }
}
ISDAmountChange(e){
  console.log(e);
  this.ObjBidOpening.ISD_Amount = undefined;
  if(e) {
    const x= e.toString();
    const number = Number(e);
   const k =  number.toLocaleString('en-IN', {
       maximumFractionDigits: 2,
       style: 'currency',
       currency: 'INR'
   });
   this.ObjBidOpening.ISD_Amount = Number(e);
   this.ISDAmount = k;
  }
}
ISDMaturityAmountChange(e){
  console.log(e);
  this.ObjBidOpening.ISD_Maturity_Amount = undefined;
  if(e) {
    const x= e.toString();
    const number = Number(e);
   const k =  number.toLocaleString('en-IN', {
       maximumFractionDigits: 2,
       style: 'currency',
       currency: 'INR'
   });
   this.ObjBidOpening.ISD_Maturity_Amount = Number(e);
   this.ISDMaturityAmount = k;
  }
}
APSDAmountChange(e){
  console.log(e);
  console.log(this.EMDBGDate)
  this.ObjBidOpening.APSD_Amount = undefined;
  if(e) {
    const x= e.toString();
    const number = Number(e);
   const k =  number.toLocaleString('en-IN', {
       maximumFractionDigits: 2,
       style: 'currency',
       currency: 'INR'
   });
   this.ObjBidOpening.APSD_Amount = Number(e);
   this.APSDAmount = k;
  }
}
APSDMaturityAmountChange(e){
  console.log(e);
  this.ObjBidOpening.APSD_Maturity_Amount = undefined;
  if(e) {
    const x= e.toString();
    const number = Number(e);
   const k =  number.toLocaleString('en-IN', {
       maximumFractionDigits: 2,
       style: 'currency',
       currency: 'INR'
   });
   this.ObjBidOpening.APSD_Maturity_Amount = Number(e);
   this.APSDMaturityAmount = k;
  }
}
ISDFDAmountChange(e){
  console.log(e);
  this.ObjBidOpening.ISD_FD_Amount = undefined;
  if(e) {
    const x= e.toString();
    const number = Number(e);
   const k =  number.toLocaleString('en-IN', {
       maximumFractionDigits: 2,
       style: 'currency',
       currency: 'INR'
   });
   this.ObjBidOpening.ISD_FD_Amount = Number(e);
   this.ISDFDAmount = k;
  }
}

AgreementValueAmountChange(e){
  console.log(e);
  this.ObjBidOpening.Agreement_Value = undefined;
  if(e) {
    const x= e.toString();
    const number = Number(Number(e).toFixed());
   const k =  number.toLocaleString('en-IN', {
       maximumFractionDigits: 2,
       style: 'currency',
       currency: 'INR'
   });
   this.ObjBidOpening.Agreement_Value = Number(e);
   this.AgreementValue = k;
  }
}
ISDFDMaturityAmountChange(e){
  console.log(e);
  this.ObjBidOpening.ISD_FD_Mature_Amount = undefined;
  if(e) {
    const x= e.toString();
    const number = Number(e);
   const k =  number.toLocaleString('en-IN', {
       maximumFractionDigits: 2,
       style: 'currency',
       currency: 'INR'
   });
   this.ObjBidOpening.ISD_FD_Mature_Amount = Number(e);
   this.ISDFDMaturityAmount = k;
  }
}
APSDFDAmountChange(e){
  console.log(e);
  this.ObjBidOpening.APSD_FD_Amount = undefined;
  if(e) {
    const x= e.toString();
    const number = Number(e);
   const k =  number.toLocaleString('en-IN', {
       maximumFractionDigits: 2,
       style: 'currency',
       currency: 'INR'
   });
   this.ObjBidOpening.APSD_FD_Amount = Number(e);
   this.APSDFDAmount = k;
  }
}
APSDFDMaturityAmountChange(e){
  console.log(e);
  this.ObjBidOpening.APSD_FD_Mature_Amount = undefined;
  if(e) {
    const x= e.toString();
    const number = Number(e);
   const k =  number.toLocaleString('en-IN', {
       maximumFractionDigits: 2,
       style: 'currency',
       currency: 'INR'
   });
   this.ObjBidOpening.APSD_FD_Mature_Amount = Number(e);
   this.APSDFDMaturityAmount = k;
  }
}
BidAmountView(e){
  if(e) {
    const x= e.toString();
    const number = Number(e);
   const k =  number.toLocaleString('en-IN', {
       maximumFractionDigits: 2,
       style: 'currency',
       currency: 'INR'
   });
   return  k;
  }
}
GetDetailsTender(obj) {
  if(obj.Tender_Doc_ID) {
    const obj1 = new HttpParams()
    .set("Tender_Doc_ID",obj.Tender_Doc_ID);
  this.$http
    .get("/BL_CRM_Txn_Enq_Tender/Get_EMD_Tender_Json", { params: obj1 })
    .subscribe((data: any) => {
      console.log(data);
      const obj2 = data ? JSON.parse(data)[0] : {};
      this.TenderDetails = obj.Tender_Doc_ID;
      this.tabIndexToView = 2;
    });
  }
}
AddBidOpen() {
  this.BidOpeningListFormSubmitted = true;
  const bid = this.ObjBidOpeningList.Bidder_Name;
  const exitsFlag =this.ObjBidOpeningList.Bidder_Name ? $.grep(this.BidOpenListView,function(val){ return val.Bidder_Name === bid}) : [];
  if(!exitsFlag.length && this.tenderValue && this.ObjBidOpeningList.Bidder_Name){
    if(this.ObjBidOpeningList.Quoted_Percentage){
     const n = this.ObjBidOpeningList.Quoted_Percentage.includes("-");
    const percentage = n ? this.ObjBidOpeningList.Quoted_Percentage.replace("-", "") : this.ObjBidOpeningList.Quoted_Percentage;
    const PercentageVal = (( Number(percentage) / 100) * Number(this.tenderValue));
    const Rate = n ?  Number(this.tenderValue) - PercentageVal :  Number(this.tenderValue) + PercentageVal;
    const EstimatedRate = this.tenderValue;
    const footfall = this.ObjBidOpening.Tender_Doc_ID;
    this.ObjBidOpeningList.Quoted_Percentage = (Number(percentage) === 0) ? '0' : this.ObjBidOpeningList.Quoted_Percentage;
    this.ObjBidOpeningList.Tender_Doc_ID = footfall;
    this.ObjBidOpeningList.Rate = Rate;
    this.ObjBidOpeningList.Rate_In_Words = this.convertNumberToWords(Rate);
    // this.ObjBidOpeningList.Less_Excess = (n && !(Number(percentage) === 0)) ? 'Less' : Number(this.ObjBidOpeningList.Quoted_Percentage) ? 'Excess' : 'Scheduled Rate';
    this.ObjBidOpeningList.Sl_No = Number(this.BidOpenListView.length) + 1;
    this.ObjBidOpeningList.Tender_Value = this.tenderValue;
    this.BidOpenListView.push(this.ObjBidOpeningList);
    this.BidOpeningListFormSubmitted = false;
    this.ObjBidOpeningList = new BidOpeningList();
    this.tenderValue = undefined
    this.ObjBidOpeningList.Tender_Value = this.tenderValue;
    this.ObjBidOpeningList.Tender_Doc_ID = footfall;
    }
    else {
      const Rate = Number(this.ObjBidOpeningList.Quoted_Rate)
      this.ObjBidOpeningList.Rate = Rate;
      this.ObjBidOpeningList.Rate_In_Words = this.convertNumberToWords(Rate);
      // this.ObjBidOpeningList.Less_Excess = (n && !(Number(percentage) === 0)) ? 'Less' : Number(this.ObjBidOpeningList.Quoted_Percentage) ? 'Excess' : 'Scheduled Rate';
      this.ObjBidOpeningList.Sl_No = Number(this.BidOpenListView.length) + 1;
      this.ObjBidOpeningList.Tender_Value = this.tenderValue;
      this.BidOpenListView.push(this.ObjBidOpeningList);
      this.BidOpeningListFormSubmitted = false;
      this.ObjBidOpeningList = new BidOpeningList();
      this.tenderValue = undefined
      this.ObjBidOpeningList.Tender_Value = this.tenderValue;
      
      
    }
    console.log("ObjBidOpeningList",this.BidOpenListView);
  }
  if (exitsFlag.length) {
    this.compacctToast.clear();
    this.compacctToast.add({
      key: "compacct-toast",
      severity: "error",
      summary: "Warn Message",
      detail: "Bidder already exists."
    });
  }
}
DeleteBidOpenList(index){
  this.BidOpenListView.splice(index, 1);
  for(let i = 0; i < this.BidOpenListView.length; i++) {
    this.BidOpenListView[i].Sl_No = i + 1;
  }
  this.RankBiddingCompanies();
}
convertNumberToWords(amount) {
  var words = new Array();
  words[0] = '';
  words[1] = 'One';
  words[2] = 'Two';
  words[3] = 'Three';
  words[4] = 'Four';
  words[5] = 'Five';
  words[6] = 'Six';
  words[7] = 'Seven';
  words[8] = 'Eight';
  words[9] = 'Nine';
  words[10] = 'Ten';
  words[11] = 'Eleven';
  words[12] = 'Twelve';
  words[13] = 'Thirteen';
  words[14] = 'Fourteen';
  words[15] = 'Fifteen';
  words[16] = 'Sixteen';
  words[17] = 'Seventeen';
  words[18] = 'Eighteen';
  words[19] = 'Nineteen';
  words[20] = 'Twenty';
  words[30] = 'Thirty';
  words[40] = 'Forty';
  words[50] = 'Fifty';
  words[60] = 'Sixty';
  words[70] = 'Seventy';
  words[80] = 'Eighty';
  words[90] = 'Ninety';
  amount = amount.toString();
  var atemp = amount.split(".");
  var number = atemp[0].split(",").join("");
  var n_length = number.length;
  var words_string = "";
  if (n_length <= 9) {
      let n_array:any = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
      var received_n_array = new Array();
      for (var i = 0; i < n_length; i++) {
          received_n_array[i] = number.substr(i, 1);
      }
      for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
          n_array[i] = received_n_array[j];
      }
      for (var i = 0, j = 1; i < 9; i++, j++) {
          if (i == 0 || i == 2 || i == 4 || i == 7) {
              if (n_array[i] == 1) {
                  n_array[j] = 10 + Number(n_array[j]);
                  n_array[i] = 0;
              }
          }
      }
      let value:any = "";
      for (var i = 0; i < 9; i++) {
          if (i == 0 || i == 2 || i == 4 || i == 7) {
              value = n_array[i] * 10;
          } else {
              value = n_array[i];
          }
          if (value != 0) {
              words_string += words[value] + " ";
          }
          if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
              words_string += "Crores ";
          }
          if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
              words_string += "Lakhs ";
          }
          if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
              words_string += "Thousand ";
          }
          if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
              words_string += "Hundred and ";
          } else if (i == 6 && value != 0) {
              words_string += "Hundred ";
          }
      }
      words_string = words_string.split("  ").join(" ");
  }
  return words_string;
}
trackByfn = (index) => index;
RetriveRankBidding(RankArr) {
  const valueArr = RankArr.map(function(item){ return item.Rate });
  const arr =  [...RankArr];
  for(let i = 0; i < arr.length; i++) {
    let k = 0 ;
    for(let r = 0; r < valueArr.length; r++){
      if(arr[i].Rate === valueArr[r]) {
        k++;
      }
    }
    if (k === 1) {
      arr[i].Lottery_Flag = 'FIXED';
    }
    if (k > 1) {
      arr[i].Lottery_Flag = 'DUPLICATE';
      arr[i].Temp_Bidder_Array = [];
      const arrTemp = $.grep(arr,function(val){return val.Rate === arr[i].Rate});
      arr[i].Temp_Bidder_Array = [...arrTemp];
    }
    this.BidOpenListViewByLottery.push(arr[i]);
  }
  console.log( "BidOpenListViewByLottery",this.BidOpenListViewByLottery)
}
RankBiddingCompanies() {
  let found = false;
  this.BidOpenListViewByRateFlag = false;
  this.BidOpenListViewByLotteryFlag = false;
  this.BidOpenListViewByLottery = [];
  this.BidOpenListViewByRate  = [];
   console.log("BidOpenListView",this.BidOpenListView);
  for(let i = 0; i < this.BidOpenListView.length; i++) {
      if (this.BidOpenListView[i].Rate) {
        if(this.BidOpenListView[i].Rate === this.BidOpenListView[0].Rate) {
          found = false;
        } else {
          found = true;
          break;
        }
      } else{
        found = false;
      }
  }
  const valueArr = this.BidOpenListView.map(function(item){ return item.Rate });

  const isDuplicate = valueArr.some(function(item, idx){
      return valueArr.indexOf(item) !== idx
  });
  if (found && !isDuplicate) {
    const arr =  [...this.BidOpenListView];
    arr.sort(function(a, b){
      return parseFloat(a.Rate) - parseFloat(b.Rate);
    });
    this.BidOpenListViewByRate = arr;
    for(let i = 0; i < this.BidOpenListViewByRate.length; i++) {
      const rank = 'L' + (i+1);
      this.BidOpenListViewByRate[i].Rank =  rank;
      this.BidOpenListViewByRate[i].Rank =  rank;
  }
    this.BidOpenListViewByRateFlag = true;

  } else {
    this.BidOpenListViewByRateFlag = false;
    const Unique = [];
    const Duplicate = [];
    const arr =  [...this.BidOpenListView];
    arr.sort(function(a, b){
      return parseFloat(a.Rate) - parseFloat(b.Rate);
    });
    for(let i = 0; i < arr.length; i++) {
      let k = 0 ;
      const rank = 'L' + (i+1);
      const objTemp = new RankBidOpeningList ();
      objTemp.Tender_Doc_ID =  this.TenderDetails.Tender_Doc_ID;
      objTemp.Tender_Doc_ID =  this.TenderDetails.Tender_Doc_ID;
      for(let r = 0; r < valueArr.length; r++){
        if(arr[i].Rate === valueArr[r]) {
          k++;
        }
      }
      if (k === 1) {
        objTemp.Lottery_Flag = 'FIXED';
        objTemp.Sl_No = arr[i].Sl_No;
        objTemp.Tender_Value = arr[i].Tender_Value;
        objTemp.Bidder_Name = arr[i].Bidder_Name;
        objTemp.Quoted_Percentage = arr[i].Quoted_Percentage;
        objTemp.Quoted_Rate = arr[i].Quoted_Rate;
        objTemp.Rate = arr[i].Rate;
        objTemp.Rate_In_Words = this.convertNumberToWords(arr[i].Rate);
      }
      if (k > 1) {
        objTemp.Lottery_Flag = 'DUPLICATE';
        objTemp.Temp_Bidder_Array = [];
        const arrTemp = $.grep(arr,function(val){return val.Rate === arr[i].Rate});
        objTemp.Temp_Bidder_Array = [...arrTemp];

      }
      objTemp.Rank = rank;
      this.BidOpenListViewByLottery.push(objTemp);
    }
  this.BidOpenListViewByLotteryFlag = true;
  }
  console.log("BidOpenListViewByLottery",this.BidOpenListViewByLottery);
}
checkBidderSelectLottery(bidderName) {
  const arr = [...this.BidOpenListViewByLottery]
  const exitsFlag = bidderName ? $.grep(arr,function(val){ return val.Bidder_Name === bidderName}) : [];
  return exitsFlag.length > 1 ? true : false;
}
DeleteRankBidOpenList(index){
  this.BidOpenListViewByRate.splice(index, 1);
 // this.RankBiddingCompanies();
}
LotteryBidderNameChange(i,obj) {
      this.BidOpenListViewByLottery[i].Tender_Value = undefined;
      this.BidOpenListViewByLottery[i].Quoted_Percentage = undefined;
      this.BidOpenListViewByLottery[i].Rate = undefined;
      this.BidOpenListViewByLottery[i].Quoted_Rate = undefined;
      this.BidOpenListViewByLottery[i].Rate_In_Words = undefined;
  if(obj.Bidder_Name) {
    const arr =  [...this.BidOpenListView];
    const bidObj = $.grep(arr,function(elem){ return elem.Bidder_Name === obj.Bidder_Name})[0];
    const flag = this.checkBidderSelectLottery(obj.Bidder_Name)
    if(!flag) {
      this.BidOpenListViewByLottery[i].Tender_Value = bidObj.Tender_Value;
      this.BidOpenListViewByLottery[i].Quoted_Percentage = bidObj.Quoted_Percentage;
      this.BidOpenListViewByLottery[i].Quoted_Rate = bidObj.Quoted_Rate;
      this.BidOpenListViewByLottery[i].Tender_Doc_ID = bidObj.Tender_Doc_ID;
      this.BidOpenListViewByLottery[i].Rate = bidObj.Rate;
      this.BidOpenListViewByLottery[i].Rate_In_Words = this.convertNumberToWords(bidObj.Rate);
    } else {
      this.BidOpenListViewByLottery[i].Tender_Value = undefined;
      this.BidOpenListViewByLottery[i].Quoted_Percentage = undefined;
      this.BidOpenListViewByLottery[i].Rate = undefined;
      this.BidOpenListViewByLottery[i].Quoted_Rate = bidObj.Quoted_Rate;
      this.BidOpenListViewByLottery[i].Tender_Doc_ID = bidObj.Tender_Doc_ID;
      this.BidOpenListViewByLottery[i].Rate_In_Words = undefined;
      this.BidOpenListViewByLottery[i].Temp_Bidder_Array = [];
      const arrTemp = $.grep(arr,function(val){return val.Rate === bidObj.Rate});
      this.BidOpenListViewByLottery[i].Temp_Bidder_Array = [...arrTemp];
    }

}


}

StatusChange(data){
  if(data === 'AWARDING THE TENDER') {
    this.ObjAgreement.Date_of_Commencement = this.DateService.dateConvert(moment(new Date(), "YYYY-MM-DD")["_d"]);
    this.ObjAgreement.Date_of_Completion = this.DateService.dateConvert(moment(new Date(), "YYYY-MM-DD")["_d"]);
    this.ReasonSelect = undefined;
  }
  else if (data === 'NOT- AWARDING THE TENDER'){
    this.ObjAgreement = new Agreement();
    this.AgreementSubmitted = false;
  }
}
UpdateStatus() {
  const check = this.BidOpenListViewByLottery.length ? this.BidOpenListViewByLottery : this.BidOpenListViewByRate;
  const flag = $.grep(check,function(elem){ return elem.Rank === 'L1' && elem.Bidder_Name === 'ORIENT CONSTRUCTIONS PVT. LTD.'});
  this.ObjBidOpening.Agreement_Value = undefined;
  this.AgreementValue = undefined;
  if(flag.length) {
    this.ObjBidOpening.Financial_Bid_Status = 'AWARDING THE TENDER';
    this.AgreementValueAmountChange(flag[0].Rate);
    this.ObjBidOpening.Date_of_Commencement = this.DateService.dateConvert(moment(new Date(), "YYYY-MM-DD")["_d"]);
    this.ObjBidOpening.Date_of_Completion = this.DateService.dateConvert(moment(new Date(), "YYYY-MM-DD")["_d"]);
  } else {
    this.ObjBidOpening.Financial_Bid_Status = 'NOT- AWARDING THE TENDER';
  }
}
monthDiff(a, b) {
  a.setHours(0,0,0,0);
  b.setHours(0,0,0,0);
  let date1 = moment(new Date(b));
  let date2 = moment(new Date(a));
  let years = date1.diff(date2, 'year');
  date2.add(years, 'years');

  let months = date1.diff(date2, 'months');
  date2.add(months, 'months');

  let days = date1.diff(date2, 'days');
  date2.add(days, 'days');
  if(years) {
    const j = 12 * years;
    months = months + j;
  }

  let message = months + " months "
  message += days + " days " ;
  return message
}
// GetCommencementDate (date) {
//   this.PeriodOfCompletion = undefined;
//     this.ObjAgreement.Date_of_Commencement = undefined;
//     if (date) {
//       this.ObjAgreement.Date_of_Commencement = this.DateService.dateConvert(moment(date, "YYYY-MM-DD")["_d"]);
//       if(this.ObjAgreement.Date_of_Commencement){
//         this.PeriodOfCompletion = this.monthDiff(new Date(date),new Date(this.ObjAgreement.Date_of_Commencement));
//         this.ObjAgreement.Date_of_Commencement = this.PeriodOfCompletion;
//       }
//     }
// }
// GetCompletionDate (date) {
//   this.PeriodOfCompletion = undefined;
//   this.ObjAgreement.Date_of_Completion = undefined;
//   if (date) {
//     this.ObjAgreement.Date_of_Completion = this.DateService.dateConvert(moment(date, "YYYY-MM-DD")["_d"]);
//     if(this.ObjAgreement.Date_of_Completion){
//       this.PeriodOfCompletion = this.monthDiff(new Date(this.ObjAgreement.Date_of_Completion),new Date(date));
//       this.ObjAgreement.Date_of_Completion = this.PeriodOfCompletion;
//     }
//   }
// }
TenderPeriodOfCompletionChange(data) {
  if(data){
    this.ObjBidOpening.Periods_of_Completion =  data;
  }
}
GetISDDepositDate(date){
  if (date) {
    this.ObjBidOpening.ISD_Deposit_date = this.DateService.dateConvert(moment(date, "YYYY-MM-DD")["_d"]);
  }
}
GetAPSDDepositDate(date){
  if (date) {
    this.ObjBidOpening.APSD_Deposit_date = this.DateService.dateConvert(moment(date, "YYYY-MM-DD")["_d"]);
  }
}
GetISDReleaseDate (date) {
  if (date) {
    this.ObjBidOpening.ISD_Release_Date = this.DateService.dateConvert(
      moment(date, "YYYY-MM-DD")["_d"]
    );
  }
}
GetAPSDReleaseDate (date) {
  if (date) {
    this.ObjBidOpening.APSD_Release_Date = this.DateService.dateConvert(
      moment(date, "YYYY-MM-DD")["_d"]
    );
  }
}
GetCircle(orgID) {
  this.CircleList = [];
  if(orgID) {
    const params = new HttpParams().set("Tender_Org_ID", orgID);
    this.$http
      .get("/BL_CRM_Txn_Enq_Tender/Get_Tender_Circle_Json", { params })
      .subscribe((data: any) => {
        this.CircleList = data ? JSON.parse(data) : [];
      });

  }
}
GetDivision(circle) {
  this.DivisionList = [];
  const circleID = $.grep(this.CircleList,function(arr){ return arr.Circle === circle})[0].Tender_Circle_ID;
  if(circleID && this.TenderDetails['Tender_Org_ID']) {
    const params = new HttpParams().set("Tender_Circle_ID", circleID);
    this.$http
      .get("/BL_CRM_Txn_Enq_Tender/Get_Tender_Division_Json", { params })
      .subscribe((data: any) => {
        this.DivisionList = data ? JSON.parse(data) : [];
        if(this.ObjBidOpening.Division) {
          this.ObjBidOpening.Division = this.ObjBidOpening.Division;
        }
      });

  }
}
ToggleAuthority(){
  this.AuthoritySubmitted = false;
  this.AuthorityName = undefined;
  this.AuthorityModal = true;
  this.Spinner = false;
 }
CreateAuthority(valid){
this.AuthoritySubmitted = true;
if(valid) {
    this.Spinner = true;
    const UrlAddress = "/BL_CRM_Txn_Enq_Tender/Create_Tender_Inviting_Authority";
    const obj = {  Tender_Inviting_Authority: this.AuthorityName };
    this.$http.post(UrlAddress, obj).subscribe((data: any) => {
      console.log(data)
    if (data.success) {
      this.Spinner = false;
      // if (this.ObjTender.Tender_Doc_ID) {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "success",
          summary: "",
          detail: "Succesfully Authority Created"
        });
      // } else {
      //   this.compacctToast.clear();
      //   this.compacctToast.add({
      //     key: "compacct-toast",
      //     severity: "success",
      //     summary: "",
      //     detail: "Organization Already Exits"
      //   });
      // }
      this.GetAuthorityList();
      this.AuthoritySubmitted = false;
      this.AuthorityName = undefined;
      this.AuthorityModal = false;
      this.Spinner = false;
    } else {
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: "Error Occured "
      });
    }
    });
}
}
ToggleBidder(){
  this.BidderSubmitted = false;
  this.BidderName = undefined;
  this.BidderModal = true;
  this.Spinner = false;
 }
CreateBidder(valid){
this.BidderSubmitted = true;
if(valid) {
    this.Spinner = true;
    const UrlAddress = "/BL_CRM_Txn_Enq_Tender/Create_Bidder";
    const obj = {  Bidder_Name: this.BidderName };
    this.$http.post(UrlAddress, obj).subscribe((data: any) => {
      console.log(data)
    if (data.success) {
      this.Spinner = false;
      // if (this.ObjTender.Tender_Doc_ID) {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "success",
          summary: "",
          detail: "Succesfully Bidder Created"
        });
      // } else {
      //   this.compacctToast.clear();
      //   this.compacctToast.add({
      //     key: "compacct-toast",
      //     severity: "success",
      //     summary: "",
      //     detail: "Organization Already Exits"
      //   });
      // }
      this.GetBidderList();
      this.BidderSubmitted = false;
      this.BidderName = undefined;
      this.BidderModal = false;
      this.Spinner = false;
    } else {
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: "Error Occured "
      });
    }
    });
}
}
ToggleCircle(){
  this.CircleSubmitted = false;
  this.CircleName = undefined;
  this.CircleModal = true;
  this.Spinner = false;
 }
CreateCircle(valid){
this.CircleSubmitted = true;
if(valid) {
    this.Spinner = true;
    const UrlAddress = "/BL_CRM_Txn_Enq_Tender/Create_Tender_Circle";
    const obj = {
      Circle : this.CircleName,
      Tender_Org_ID : this.TenderDetails['Tender_Org_ID']
     };
    this.$http.post(UrlAddress, obj).subscribe((data: any) => {
      console.log(data)
    if (data.success) {
      this.Spinner = false;
      // if (this.ObjTender.Tender_Doc_ID) {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "success",
          summary: "",
          detail: "Succesfully Circle Created"
        });
      // } else {
      //   this.compacctToast.clear();
      //   this.compacctToast.add({
      //     key: "compacct-toast",
      //     severity: "success",
      //     summary: "",
      //     detail: "Organization Already Exits"
      //   });
      // }
      this.GetCircle(this.TenderDetails['Tender_Org_ID']);
      this.CircleSubmitted = false;
      this.CircleName = undefined;
      this.CircleModal = false;
      this.Spinner = false;
    } else {
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: "Error Occured "
      });
    }
    });
}
}
ToggleDivision(){
  this.DivisionSubmitted = false;
  this.DivisionName = undefined;
  this.DivisionModal = true;
  this.Spinner = false;
 }
 ToggleInformation(){
  this.InformationSubmitted = false;
  this.InformationName = undefined;
  this.InformationModal = true;
  this.Spinner = false;
 }
 CreateInformation(valid){
  this.InformationSubmitted = true;
  if(valid) {
      this.Spinner = true;
     const UrlAddress = "BL_CRM_Txn_Enq_Tender/Create_Tender_Enq_Source";
      const obj = {
        Enq_Source_Name: this.InformationName,
        };
      this.$http.post(UrlAddress, obj).subscribe((data: any) => {
        console.log(data)
      if (data.success) {
          this.Spinner = false;
        // if (this.ObjTender.Tender_Doc_ID) {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "",
            detail: "Succesfully Information Created"
          });
        // } else {
        //   this.compacctToast.clear();
        //   this.compacctToast.add({
        //     key: "compacct-toast",
        //     severity: "success",
        //     summary: "",
        //     detail: "Organization Already Exits"
        //   });
        // }
        this.GetTenderInfoEnqSRC();
        this.InformationSubmitted = false;
        this.InformationName = undefined;
        this.InformationModal = false;
      } else {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Error Occured "
        });
      }
      });
  }
  }
CreateDivision(valid){
this.DivisionSubmitted = true;
if(valid) {
    this.Spinner = true;
    const circle = this.ObjBidOpening.Circle;
    const circleID = $.grep(this.CircleList,function(arr){ return arr.Circle === circle})[0].Tender_Circle_ID;
    const UrlAddress = "/BL_CRM_Txn_Enq_Tender/Create_Tender_Division";
    const obj = {
      Division: this.DivisionName,
      Tender_Circle_ID: circleID
     };
    this.$http.post(UrlAddress, obj).subscribe((data: any) => {
      console.log(data)
    if (data.success) {
        this.Spinner = false;
      // if (this.ObjTender.Tender_Doc_ID) {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "success",
          summary: "",
          detail: "Succesfully Division Created"
        });
      // } else {
      //   this.compacctToast.clear();
      //   this.compacctToast.add({
      //     key: "compacct-toast",
      //     severity: "success",
      //     summary: "",
      //     detail: "Organization Already Exits"
      //   });
      // }
      this.GetDivision(this.ObjBidOpening.Circle);
      this.DivisionSubmitted = false;
      this.DivisionName = undefined;
      this.DivisionModal = false;
    } else {
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: "Error Occured "
      });
    }
    });
}
}
ToggleReason(){
  this.ReasonSubmitted = false;
  this.ReasonName = undefined;
  this.ReasonModal = true;
  this.Spinner = false;
 }
CreateReason(valid){
this.ReasonSubmitted = true;
if(valid) {
    this.Spinner = true;
    const UrlAddress = "/BL_CRM_Txn_Enq_Tender/Create_Not_Awarding_Reason";
    const obj = {
      Reason : this.ReasonName
     };
    this.$http.post(UrlAddress, obj).subscribe((data: any) => {
      console.log(data)
    if (data.success) {
      this.Spinner = false;
      // if (this.ObjTender.Tender_Doc_ID) {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "success",
          summary: "",
          detail: "Succesfully Reason Created"
        });
      // } else {
      //   this.compacctToast.clear();
      //   this.compacctToast.add({
      //     key: "compacct-toast",
      //     severity: "success",
      //     summary: "",
      //     detail: "Organization Already Exits"
      //   });
      // }
      this.GetReasonList();
      this.ReasonSubmitted = false;
      this.ReasonName = undefined;
      this.ReasonModal = false;
      this.Spinner = false;
    } else {
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: "Error Occured "
      });
    }
    });
}
}
ToggleFinalcialYear(){
  this.FinalcialYearSubmitted = false;
  this.FinalcialYearName = undefined;
  this.FinalcialYearModal = true;
  this.Spinner = false;
 }
CreateFinalcialYear(valid){
this.FinalcialYearSubmitted = true;
if(valid) {
    this.Spinner = true;
    const UrlAddress = "/BL_CRM_Txn_Enq_Tender/Create_Tender_Fin_Year_Name";
    const obj = {
      Fin_Year_Name : this.FinalcialYearName
     };
    this.$http.post(UrlAddress, obj).subscribe((data: any) => {
      console.log(data)
    if (data.success) {
      this.Spinner = false;
      // if (this.ObjTender.Tender_Doc_ID) {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "success",
          summary: "",
          detail: "Succesfully Finalcial Year Created"
        });
      // } else {
      //   this.compacctToast.clear();
      //   this.compacctToast.add({
      //     key: "compacct-toast",
      //     severity: "success",
      //     summary: "",
      //     detail: "Organization Already Exits"
      //   });
      // }
      this.GetFinancialYearList();
      this.FinalcialYearSubmitted = false;
      this.FinalcialYearName = undefined;
      this.FinalcialYearModal = false;
      this.Spinner = false;
    } else {
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: "Error Occured "
      });
    }
    });
}
}
GetFlagFromDocumentBid(e) {
  console.log(e);
}
ViewExcel() {
  this.BOQExcelTotal = undefined;
  this.BOQExcelLess = undefined;
  this.BOQExcelLessTotal = undefined;
  this.BOQExcelGrandTotal = undefined;
  this.BOQExcelQuote = undefined;
  if(this.BOQExcelList.length) {
    this.ExcelModalFlag = !this.ExcelModalFlag;
    this.getQuote()
  }
}
getQuote() {
  if(this.ObjBidOpening.Tender_Doc_ID) {
    this.$http
    .get("/BL_CRM_Txn_Enq_Tender/Get_BOQ_Quoted_Percentage_Excel?Tender_Doc_ID="+this.ObjBidOpening.Tender_Doc_ID)
      .subscribe((data: any) => {
       console.log(data)
       const per = data ? JSON.parse(data)[0].Quoted_Percentage_Excel: 0;
       this.BOQExcelQuote = per ? per.toString() : undefined;
       this.getTotalExcelData();

      });
  }
}
saveQuote(){
  if(this.BOQExcelQuote) {
    const UrlAddress = "/BL_CRM_Txn_Enq_Tender/Update_BOQ_Quoted_Percentage_Excel";
    const obj = {
       Tender_Doc_ID:this.ObjBidOpening.Tender_Doc_ID,
       Quoted_Percentage_Excel : this.BOQExcelQuote
     };
    this.$http.post(UrlAddress, obj).subscribe((data: any) => {
      if (data.success) {
        console.group("Compacct V2");
        console.log("%c  Bid Quoted_Percentage Sucess:", "color:green;");
        console.log("/BL_CRM_Txn_Enq_Tender/Update_BOQ_Quoted_Percentage_Excel");
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "success",
          summary: "",
          detail: "Succesfully BOQ Quoted Percentage Updated"
        });
      } else {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Error Occured "
        });
      }
    });
  }else{
    this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Fill Up Quoted Percentage "
        });
  }

}
PrintExcel() {
  const printContents = document.getElementById('boqExelID').innerHTML
  const WindowObject = window.open('','PrintWindow','width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes'
  );
  const htmlData = `<html><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> <body style='padding: 1em;'>${printContents}</body></html>`;

  WindowObject.document.writeln(htmlData);
  WindowObject.document.close();
  WindowObject.focus();
  setTimeout(() => {
    WindowObject.print();
  }, 0.5);
}
getTotalExcelData() {
  let qunt = 0;
  let percentage1 = undefined;
  let lexxEcess = undefined;
  if(!this.BOQExcelQuote){
    if(this.BidOpenListViewByLottery.length) {
      const objTemp = $.grep(this.BidOpenListViewByLottery,function(obj){ return obj.Bidder_Name === 'ORIENT CONSTRUCTIONS PVT. LTD.'})[0];
      percentage1 = objTemp.Quoted_Percentage.toString();
      lexxEcess = objTemp.Less_Excess;
    }
    if(this.BidOpenListViewByRate.length) {
      const objTemp = $.grep(this.BidOpenListViewByRate,function(obj){ return obj.Bidder_Name === 'ORIENT CONSTRUCTIONS PVT. LTD.'})[0];
      percentage1 = objTemp.Quoted_Percentage.toString();
      lexxEcess = objTemp.Less_Excess;
    }
  } else {
    percentage1 = this.BOQExcelQuote;
    lexxEcess = (this.BOQExcelQuote.includes("-") && !(Number(percentage1) === 0)) ? 'Less' : Number(this.BOQExcelQuote) ? 'Excess' : 'Scheduled Rate'
  }

  const n = percentage1.includes("-");
  const percentage = n ? percentage1.replace("-", "") : percentage1;

  for(let i =0; i < this.BOQExcelList.length;i++){
    if(this.BOQExcelList[i].Amount) {
      qunt += Number(this.BOQExcelList[i].Amount);
    }
  }
  const e = qunt.toFixed();
  const PercentageVal = (( Number(percentage) / 100) * Number(e));
  const Rate = n ?  Number(e) - PercentageVal :  Number(e) + PercentageVal;
  const f = PercentageVal.toFixed();
  const g = Rate.toFixed();
  if(e) {
    const x= e.toString();
    const number = Number(e);
    const k =  number.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'INR'
    });
    this.BOQExcelTotal =  k;
  }
  if(f) {
    const x= f.toString();
    const number = Number(f);
    const k =  number.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'INR'
    });
    this.BOQExcelLessTotal = k;
  }
  if(g) {
    const x= e.toString();
    const number = Number(g);
    const k =  number.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'INR'
    });
    this.BOQExcelGrandTotal = k;
  }

  this.BOQExcelQuote = percentage1;
  this.BOQExcelLess = lexxEcess;
}

simpleStringify (arr){
  let ff= [];
  for(let i = 0; i < arr.length; i++) {
    let simpleObject = {};
    for (let prop in arr[i] ){
        if (!arr[i].hasOwnProperty(prop)){
            continue;
        }
        if (typeof(arr[i][prop]) === 'object'){
            continue;
        }
        if (typeof(arr[i][prop]) === 'function'){
            continue;
        }
        simpleObject[prop] = arr[i][prop];
    }
    ff.push(simpleObject)
  }
  return JSON.stringify(ff); // returns cleaned up JSON
}
FetchBiddata() {
  if(this.ObjBidOpening.Financial_Bid_Status === 'AWARDING THE TENDER') {
    this.ObjBidOpening.Not_Awarding_Reason = undefined;
    const today = this.DateService.dateConvert(new Date());
    this.ObjBidOpening.ISD_Deposit_date =   this.ObjBidOpening.ISD_Deposit_date  ?   this.ObjBidOpening.ISD_Deposit_date : today;
    this.ObjBidOpening.APSD_Deposit_date =   this.ObjBidOpening.APSD_Deposit_date  ?   this.ObjBidOpening.APSD_Deposit_date : today;
    if(this.ObjBidOpening.ISD_Deposit_Type === 'BG') {
      this.ObjBidOpening.ISD_BG_Creation_Date =   this.ISDBGDate  ?  this.DateService.dateConvert(new Date(this.ISDBGDate)) : today;
      this.ObjBidOpening.ISD_BG_Exp_Date =   this.ISDBGExpDate  ?   this.DateService.dateConvert(new Date(this.ISDBGExpDate)) : today;
      this.ObjBidOpening.ISD_FD_Mature_Date = '';
      this.ObjBidOpening.ISD_NEFT_Txn_Date = '';
      this.ObjBidOpening.ISD_NEFT_TXN_No = '';
      this.ObjBidOpening.ISD_FD_Mature_Amount = 0;
      this.ObjBidOpening.ISD_FD_Amount = 0;
    }
      if (this.ObjBidOpening.ISD_Deposit_Type === 'FD') {
      this.ObjBidOpening.ISD_FD_Mature_Date =   this.ISDMatureDate ?  this.DateService.dateConvert(new Date(this.ISDMatureDate)) : today;
      this.ObjBidOpening.ISD_BG_Creation_Date = '';
      this.ObjBidOpening.ISD_BG_Exp_Date = '';
      this.ObjBidOpening.ISD_NEFT_Txn_Date = '';
      this.ObjBidOpening.ISD_NEFT_TXN_No = '';
    }
      if ((this.ObjBidOpening.ISD_Deposit_Type ==='NEFT' || this.ObjBidOpening.ISD_Deposit_Type ==='RTGS')) {
      this.ObjBidOpening.ISD_NEFT_Txn_Date =   this.ISDNEFTDate  ?    this.DateService.dateConvert(new Date(this.ISDNEFTDate)) : today;
      this.ObjBidOpening.ISD_BG_Creation_Date = '';
      this.ObjBidOpening.ISD_BG_Exp_Date = '';
      this.ObjBidOpening.ISD_FD_Mature_Date = '';
      this.ObjBidOpening.ISD_FD_Mature_Amount = 0;
      this.ObjBidOpening.ISD_FD_Amount = 0;
    }
    if(this.ObjBidOpening.APSD_Deposit_Type === 'BG') {
      this.ObjBidOpening.APSD_BG_Creation_Date =   this.APSDBGDate  ?  this.DateService.dateConvert(new Date(this.APSDBGDate)) : today;
      this.ObjBidOpening.APSD_BG_Exp_Date =   this.APSDBGExpDate  ?   this.DateService.dateConvert(new Date(this.APSDBGExpDate)) : today;
      this.ObjBidOpening.APSD_FD_Mature_Date = '';
      this.ObjBidOpening.APSD_NEFT_Txn_Date = '';
      this.ObjBidOpening.APSD_NEFT_TXN_No = '';
      this.ObjBidOpening.APSD_FD_Mature_Amount = 0;
      this.ObjBidOpening.APSD_FD_Amount = 0;
    }
      if (this.ObjBidOpening.APSD_Deposit_Type === 'FD') {
      this.ObjBidOpening.APSD_FD_Mature_Date =   this.APSDMatureDate ?  this.DateService.dateConvert(new Date(this.APSDMatureDate)) : today;
      this.ObjBidOpening.APSD_BG_Creation_Date = '';
      this.ObjBidOpening.APSD_BG_Exp_Date = '';
      this.ObjBidOpening.APSD_NEFT_Txn_Date = '';
      this.ObjBidOpening.APSD_NEFT_TXN_No = '';
    }
      if ((this.ObjBidOpening.APSD_Deposit_Type ==='NEFT' || this.ObjBidOpening.APSD_Deposit_Type ==='RTGS')) {
      this.ObjBidOpening.APSD_NEFT_Txn_Date =   this.APSDNEFTDate  ?    this.DateService.dateConvert(new Date(this.APSDNEFTDate)) : today;
      this.ObjBidOpening.APSD_BG_Creation_Date = '';
      this.ObjBidOpening.APSD_BG_Exp_Date = '';
      this.ObjBidOpening.APSD_FD_Mature_Date = '';
      this.ObjBidOpening.APSD_FD_Mature_Amount = 0;
      this.ObjBidOpening.APSD_FD_Amount = 0;
    }
  }
  if(this.ObjBidOpening.Financial_Bid_Status === 'NOT- AWARDING THE TENDER') {
    this.ObjBidOpening.ISD_Deposit_date = '';
    this.ObjBidOpening.APSD_Deposit_date = '';
    this.ObjBidOpening.APSD_BG_Creation_Date =  '';
    this.ObjBidOpening.APSD_BG_Exp_Date = '';
    this.ObjBidOpening.APSD_FD_Mature_Date = '';
    this.ObjBidOpening.APSD_NEFT_Txn_Date = '';
    this.ObjBidOpening.APSD_NEFT_TXN_No = '';
    this.ObjBidOpening.APSD_FD_Mature_Amount = 0;
    this.ObjBidOpening.APSD_FD_Amount = 0;
    this.ObjBidOpening.ISD_BG_Creation_Date = '';
    this.ObjBidOpening.ISD_BG_Exp_Date =  '';
    this.ObjBidOpening.ISD_FD_Mature_Date = '';
    this.ObjBidOpening.ISD_NEFT_Txn_Date = '';
    this.ObjBidOpening.ISD_NEFT_TXN_No = '';
    this.ObjBidOpening.ISD_FD_Mature_Amount = 0;
    this.ObjBidOpening.ISD_FD_Amount = 0;
    this.ObjBidOpening.Circle = undefined;
    this.ObjBidOpening.Division = undefined;
    this.ObjBidOpening.Agreement_Number = undefined;
    this.ObjBidOpening.Periods_of_Completion = undefined;
    this.ObjBidOpening.Date_of_Completion = undefined;
    this.ObjBidOpening.Date_of_Commencement = undefined;
    this.ObjBidOpening.ISD_Release_Date = undefined;
    this.ObjBidOpening.APSD_Release_Date = undefined;
    this.ObjBidOpening.Agreement_Value = undefined;
    this.ObjBidOpening.ISD_Amount = undefined;
    this.ObjBidOpening.APSD_Amount = undefined;
    this.ObjBidOpening.ISD_Bank = undefined;
    this.ObjBidOpening.ISD_Deposit_Type = undefined;
    this.ObjBidOpening.ISD_Deposit_Number = undefined;
    this.ObjBidOpening.APSD_Bank = undefined;
    this.ObjBidOpening.APSD_Deposit_Type = undefined;
    this.ObjBidOpening.APSD_Deposit_Number = undefined;
    this.ObjBidOpening.ISD_Maturity_Amount = undefined;
    this.ObjBidOpening.APSD_Maturity_Amount = undefined;
    this.ObjBidOpening.Not_Awarding_Reason = this.ReasonSelect.toString();

   }

}
FetchBOQData(BOQurl) {
  const obj = {
    Project_ID : 0  ,
    Tender_Doc_ID : this.ObjBidOpening.Tender_Doc_ID ,
    Cost_Cen_ID : this.commonApi.CompacctCookies.Cost_Cen_ID,
    Project_Name : this.TenderDetails['Tender_Name']	,
    Bid_Identification_No: this.TenderDetails['Tender_ID'] ,
    Is_Visiable: 'Y',
    Tender_Inviting_Authority : this.ObjBidOpening.Tender_Inviting_Authority ,
    Tender_Organization : this.GetOrgName(this.TenderDetails['Tender_Org_ID']) ,
    Circle  : this.ObjBidOpening.Circle ,
    Division: this.ObjBidOpening.Division ,
    BOQ_File_Name : BOQurl ,
    Agreement_Number: this.ObjBidOpening.Agreement_Number ,
    Agreement_Value : this.ObjBidOpening.Agreement_Value ,
    Date_of_Commencement: this.ObjBidOpening.Date_of_Commencement ,
    Date_of_Completion: this.ObjBidOpening.Date_of_Completion,
    Project_Short_Name: this.ObjBidOpening.Project_Short_Name
  }
  const arrTemp1 = [];
  if (this.BOQdataString.length) {
    const firstkey = Object.keys(this.BOQdataString[0])[0];
    for(let h =0; h < this.BOQdataString.length;h++) {
      if(h !== 0 && this.BOQdataString[h][firstkey]) {
      const obj1 ={
        Project_ID : 0,
        BOQ_Type: 'Original',
        Sl_No: this.BOQdataString[h][firstkey],
        Description_of_work:this.BOQdataString[h].__EMPTY,
        Item_Code: this.BOQdataString[h].__EMPTY_1,
        Qty:  this.BOQdataString[h].__EMPTY_2,
        Unit: this.BOQdataString[h].__EMPTY_3 ,
        Tender_Value:Number((Math.round(this.BOQdataString[h].__EMPTY_4 * 100) / 100).toFixed(2)),
        Amount : Number((Math.round(this.BOQdataString[h].__EMPTY_5 * 100) / 100).toFixed(2))
      }
      arrTemp1.push(obj1)
    }
    }
  }
  console.log(arrTemp1);
  const WholeData =   {
    Enq_Project_Master_String : JSON.stringify([obj]),
    Enq_BOQ_Excel_String :  JSON.stringify(arrTemp1)
  }
  console.log(WholeData);
  return WholeData;
}

SaveBidOpening(valid) {
  this.BidOpeningFormSubmitted = true;
  const resonFlag = (this.ObjBidOpening.Financial_Bid_Status === 'NOT- AWARDING THE TENDER' &&  this.ReasonSelect.length ) ? true : (this.ObjBidOpening.Financial_Bid_Status === 'AWARDING THE TENDER') ?  true : false;
  if (valid && this.BidOpenListView.length && resonFlag && (this.BidOpenListViewByRate.length || this.BidOpenListViewByLottery.length)) {
    this.Spinner = true;
    this.ObjBidOpening.Rank_Type =  this.BidOpenListViewByRate.length ? 'Normal' : 'Lottery';
    this.FetchBiddata();
    console.log("save data",this.ObjBidOpening);
    const UrlAddress = "/BL_CRM_Txn_Enq_Tender/Update_Enq_Tender_Bidding";
    const obj = { Enq_Bidding_String: JSON.stringify([this.ObjBidOpening]) };
    this.$http.post(UrlAddress, obj).subscribe((data: any) => {
      if (data.success) {
        console.group("Compacct V2");
        console.log("%c  Bid Sucess:", "color:green;");
        console.log("/BL_CRM_Txn_Enq_Tender/Update_Enq_Tender_Bidding");
        this.SaveBidList();
      } else {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Error Occured "
        });
      }
    });
    } else {
        if(!this.BidOpenListView.length) {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message",
            detail: "No List Found"
          });
        }
        const arr = this.BidOpenListViewByRate.length ? this.BidOpenListViewByRate : this.BidOpenListViewByLottery;
        if(!arr.length) {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message",
            detail: "No Rank or Lottery Bid Found"
          });
        }
        if(!resonFlag){
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message",
            detail: "No Reason Found"
          });
        }
    }
}
SaveBidList() {
  
  let Tempsavedata = []
  this.BidOpenListView.forEach(el=>{
    Tempsavedata.push({
      Bidder_Name: el.Bidder_Name,
      Tender_Value: el.Tender_Value,
      Quoted_Percentage: el.Quoted_Percentage,
      Rate: el.Rate,
      Rate_In_Words: el.Rate_In_Words,
      Sl_No: el.Sl_No,
      Tender_Doc_ID: el.Tender_Doc_ID,
    })
  })
  console.log("BidOpenListView",Tempsavedata);
  const UrlAddress = "/BL_CRM_Txn_Enq_Tender/Insert_BL_CRM_Txn_Enq_Bidding_Table";
    const obj = { Enq_Bidding_table_String: JSON.stringify(Tempsavedata) };
    this.$http.post(UrlAddress, obj).subscribe((data: any) => {
      if (data.success) {
        console.group("Compacct V2");
        console.log("%c  Bid List Sucess:", "color:green;");
        console.log("/BL_CRM_Txn_Enq_Tender/Insert_BL_CRM_Txn_Enq_Bidding_Table");
        this.SaveRankBidList();
      } else {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Error Occured "
        });
      }
    });
}
SaveRankBidList(){
  const arr = this.BidOpenListViewByRate.length ? this.BidOpenListViewByRate : this.BidOpenListViewByLottery;
  let tempSaveData = [];
  arr.forEach(ele => {
    tempSaveData.push({
      Bidder_Name: ele.Bidder_Name,
      Tender_Value: ele.Tender_Value,
      Quoted_Percentage: ele.Quoted_Percentage,
      Less_Excess : "0",
      Rank: ele.Rank,
      Rate: ele.Rate,
      Rate_In_Words: ele.Rate_In_Words,
      Sl_No: ele.Sl_No,
      Tender_Doc_ID : ele.Tender_Doc_ID
    })
  });
  console.log("Ranklist",tempSaveData);
  const UrlAddress = "/BL_CRM_Txn_Enq_Tender/Insert_BL_CRM_Txn_Enq_Bidding_Rank";
    const obj = { Enq_Bidding_Rank_String: this.simpleStringify(tempSaveData) };
    this.$http.post(UrlAddress, obj).subscribe((data: any) => {
      if (data.success) {
        console.group("Compacct V2");
        console.log("%c  Rank Bid List Sucess:", "color:green;");
        console.log("/BL_CRM_Txn_Enq_Tender/Insert_BL_CRM_Txn_Enq_Bidding_Rank");
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "success",
          summary: "Lead ID  : " +  this.ObjBidOpening.Tender_Doc_ID,
          detail: "Succesfully Bid Updated"
        });
        this.clearBid();
        this.tabIndexToView = 0;
        this.BidOpeningFlag = false;
        this.Spinner = false;
      } else {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Error Occured "
        });
      }
    });
}
SaveBOQ(valid) {
  this.BoqDocFormSubmitted = true;
  if (this.PDFFlag && valid) {
    this.Spinner = true;
    const endpoint = "/BL_CRM_Txn_Enq_Tender/Upload_BOQ_Document?Tender_Doc_ID=" + this.ObjBidOpening.Tender_Doc_ID;
    const formData: FormData = new FormData();
    formData.append("aFile", this.BOQPDFFile);
    this.$http.post(endpoint, formData).subscribe((data:any) => {
      console.log(data);
      if(data.success) {
        const BOQurl = data.URL;
       const projectData =  this.FetchBOQData(BOQurl);
       this.SaveProject(projectData);
      }
    });
  } else {

  }

}
SaveProject(projectData){
  const UrlAddress = "/BL_CRM_Txn_Enq_Tender/Insert_BL_CRM_Enq_Master_Project";
  this.$http.post(UrlAddress, projectData).subscribe((data: any) => {
    if (data.success) {
      console.group("Compacct V2");
      console.log("%c  Project Sucess:", "color:green;");
      console.log("/BL_CRM_Txn_Enq_Tender/Insert_BL_CRM_Enq_Master_Project");
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "success",
        summary: "Lead ID  : " +  this.ObjBidOpening.Tender_Doc_ID,
        detail: "Succesfully BOQ Updated"
      });
      this.GetBOQExcelList(this.ObjBidOpening.Tender_Doc_ID)
      this.Spinner = false;
      this.BoqDocFormSubmitted = false;
    } else {
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: "Error Occured "
      });
    }
  });
}

onboqExcel(){
  this.compacctToast.clear();
}
onFileChange(ev) {
  this.PDFFlag = false;
  this.BOQPDFFile = {};
  let workBook = null;
  let jsonData = null;
  const reader = new FileReader();
  const file = ev.files[0];

  reader.onload = (event) => {
    const data = reader.result;
    workBook = XLSX.read(data, { type: 'binary' });
    jsonData = workBook.SheetNames.reduce((initial, name) => {
      const sheet = workBook.Sheets[name];
      initial[name] = XLSX.utils.sheet_to_json(sheet);
      return initial;
    }, {});
    this.BOQdataString = jsonData.BOQ;
    const firstkey = Object.keys(this.BOQdataString[0])[0];
    const columCheck =
     this.BOQdataString[0][firstkey] === "SL NO." && this.BOQdataString[0].__EMPTY === "DESCRIPTION OF ITEMS"  &&
     this.BOQdataString[0].__EMPTY_1 === "ITEM CODE" && this.BOQdataString[0].__EMPTY_2 === "QNTY./NOS." &&
     this.BOQdataString[0].__EMPTY_3 === "UNIT" && this.BOQdataString[0].__EMPTY_4 === "ESTIMATED RATE" &&
     this.BOQdataString[0].__EMPTY_5 === "AMOUNT" ? true:false;
     if(columCheck){
        if (file && this.BOQdataString.length) {
        this.BOQPDFFile = file;
        this.PDFFlag = true;
        } else {
          this.PDFFlag = false;
        }
      }else{
        this.PDFFlag = false;
        this.compacctToast.clear();
        const errorMgs = `<table class="table table-bordered table-striped"><thead><tr><td>Choosed File Format</td><td>System Format</td><td>Match Flag</td><tr></thead><tr><tbody><tr><td>` + this.BOQdataString[0][firstkey] +`</td>
        <td>SL NO.</td>
        <td class='text-center'>`+this.compare(this.BOQdataString[0][firstkey],"SL NO.")+ `</td> <tr>
        <td>`+ this.BOQdataString[0].__EMPTY +`</td>
        <td>DESCRIPTION OF ITEMS</td>
        <td class='text-center'>` +this.compare(this.BOQdataString[0].__EMPTY,"DESCRIPTION OF ITEMS")+`</td></tr><tr>
        <td>` + this.BOQdataString[0].__EMPTY_1 +`</td>
        <td>ITEM CODE</td>
        <td class='text-center'>` +this.compare(this.BOQdataString[0].__EMPTY_1,"ITEM CODE")+`</td></tr><tr>
        <td>`+ this.BOQdataString[0].__EMPTY_2 +`</td>
        <td>QNTY./NOS.</td>
        <td class='text-center'>` +this.compare(this.BOQdataString[0].__EMPTY_2,"QNTY./NOS.")+`</td></tr><tr>
        <td>`+ this.BOQdataString[0].__EMPTY_3 +`</td>
        <td>UNIT</td>
        <td class='text-center'>` +this.compare(this.BOQdataString[0].__EMPTY_3,"UNIT")+`</td></tr><tr>
        <td>`+ this.BOQdataString[0].__EMPTY_4 +`</td>
        <td>ESTIMATED RATE</td>
        <td class='text-center'>` +this.compare(this.BOQdataString[0].__EMPTY_4,"ESTIMATED RATE")+`</td></tr><tr>
        <td>`+ this.BOQdataString[0].__EMPTY_5 +`</td>
        <td>AMOUNT</td>
        <td class='text-center'>` +this.compare(this.BOQdataString[0].__EMPTY_5,"AMOUNT")+`</td></tr><tr></tbody></table>`
        // + = "SL NO." `+this.compare(this.BOQdataString[0][firstkey],"SL NO.")+` </div>
        // <div>` + this.BOQdataString[0].__EMPTY +` = "DESCRIPTION OF WORK" `+this.compare(this.BOQdataString[0].__EMPTY,"DESCRIPTION OF WORK")+` </div>
        // <div>` + this.BOQdataString[0].__EMPTY_1 +` = "ITEM CODE" `+this.compare(this.BOQdataString[0].__EMPTY_1,"ITEM CODE")+` </div>
        // <div>` + this.BOQdataString[0].__EMPTY_2 +` = "QNTY./NOS." `+this.compare(this.BOQdataString[0].__EMPTY_2,"QNTY./NOS.")+` </div>
        // <div>` + this.BOQdataString[0].__EMPTY_3 +` = "UNIT" `+this.compare(this.BOQdataString[0].__EMPTY_3,"UNIT")+` </div>
        // <div>` + this.BOQdataString[0].__EMPTY_4 +` = "ESTIMATED RATE" `+this.compare(this.BOQdataString[0].__EMPTY_4,"ESTIMATED RATE")+` </div>
        // <div>` + this.BOQdataString[0].__EMPTY_5 +` = "AMOUNT IN RS." `+this.compare(this.BOQdataString[0].__EMPTY_5,"AMOUNT IN RS.")+` </div>`

        this.fileInput.clear();
        this.compacctToast.add({
          key: "boqExcel",
          sticky: true,
          severity: "warn",
          summary: "Coloum Name Invalid",
          detail: errorMgs
        });
      }
  }
  reader.readAsBinaryString(file);
}
FetchPDFFile(event) {
  this.PDFFlag = false;
  this.BOQPDFFile = {};
  if (event) {
    this.BOQPDFFile = event.files[0];
    this.PDFFlag = true;
  }
}
compare(a,b) {
  const returnCode = a === b ? '<i class="fa fa-fw fa-check" style="color:#34A835" aria-hidden="true"></i>' : '<i class="fa fa-fw fa-times"  style="color:#f03a17" aria-hidden="true"></i>';
  return returnCode;
}
BOQUploader(fileData) {
  // const endpoint = "/Master_Product_V2/Upload_Doc";
  // const formData: FormData = new FormData();
  // formData.append("aFile", fileData);
  // this.$http.post(endpoint, formData).subscribe(data => {
  //   console.log(data);
  // });
}


// ESTIMATE
ToggleEstimateGrp(){
  this.EstimateGrpSubmitted = false;
  this.EstimateGrpName = undefined;
  this.EstimateGrpModal = true;
  this.Spinner = false;
 }
 CreateEstimateGrp(valid){
  this.EstimateGrpSubmitted = true;
  if(valid) {
    this.Spinner = true;
    const temp = {
      Budget_Group_Name : this.EstimateGrpName      
    }
    const obj = {
      "SP_String": "SP_Tender_Management_All",
      "Report_Name_String": "Budget_Group_Create",
      "Json_Param_String" : JSON.stringify([temp]) 
    }
    this.GlobalAPI
        .postData(obj)
        .subscribe((data: any) => {
          console.log(data)
      if (data[0].Column1) {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "",
            detail: "Succesfully Budget Group Created"
          });
        this.GetEstimateGroup();
        this.EstimateGrpSubmitted = false;
        this.EstimateGrpName = undefined;
        this.EstimateGrpModal = false;
        this.EstimateSubGroupList = [];
        this.Spinner = false;
      } else {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Error Occured "
        });
      }
      });
  }
 }
 ToggleEstimateSubGrp(){
  this.EstimateSubGrpSubmitted = false;
  this.EstimateSubGrpName = undefined;
  this.EstimateSubGrpModal = true;
  this.Spinner = false;
   if(this.ObjEstimate.Budget_Group_ID) {
    this.EstimateSubGrpModal = true;
   }
 }
 CreateEstimateSubGrp(valid){
  this.EstimateSubGrpSubmitted = true;
  if(valid) {
    this.Spinner = true;
    const temp = {
      Budget_Group_ID : this.ObjEstimate.Budget_Group_ID,
      Budget_Sub_Group_Name : this.EstimateSubGrpName
    }
    const obj = {
      "SP_String": "SP_Tender_Management_All",
      "Report_Name_String": "Budget_Sub_Group_Create",
      "Json_Param_String" : JSON.stringify([temp]) 
    }
    this.GlobalAPI
        .getData(obj)
        .subscribe((data: any) => {
          console.log(data)
      if (data[0].Column1) {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "",
            detail: "Succesfully Budget Group Created"
          });
        this.EstimateGroupChange(this.ObjEstimate.Budget_Group_ID);
        this.EstimateSubGrpSubmitted = false;
        this.EstimateSubGrpName = undefined;
        this.EstimateSubGrpModal = false;
        this.Spinner = false;
      } else {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Error Occured "
        });
      }
      });
  }
 }

GetProduct(){
  const obj = {
    "SP_String": "SP_Tender_Management_All",
    "Report_Name_String": "Get_Product_Name",
  }
  this.GlobalAPI
      .getData(obj)
      .subscribe((data: any) => {
        console.log(data)
        data.forEach(el => {
            el['label'] = el.Product_Description;
            el['value'] = el.Product_ID;
        });
        this.EstimateGroupProductList = data;
  });
}
GetEstimateGroup(){
    const obj = {
      "SP_String": "SP_Tender_Management_All",
      "Report_Name_String": "Get_Budget_Group_Name",
    }
    this.GlobalAPI
        .getData(obj)
        .subscribe((data: any) => {
          console.log(data)
          data.forEach(el => {
              el['label'] = el.Budget_Group_Name;
              el['value'] = el.Budget_Group_ID;
          });
          this.EstimateGroupList = data;
    });
}
EstimateGroupChange(id){
  this.EstimateSubGroupList = [];
  this.ObjEstimate.Budget_Group_Name = undefined;
  this.ObjEstimate.Budget_Sub_Group_ID = undefined;
  this.ObjEstimate.Budget_Sub_Group_Name = undefined;
  if(id) {
    this.ObjEstimate.Budget_Group_Name = this.EstimateGroupList.filter(ob => ob.Budget_Group_ID.toString() === id.toString())[0].Budget_Group_Name;
    const obj = {
      "SP_String": "SP_Tender_Management_All",
      "Report_Name_String": "Get_Budget_Sub_Group_Name",
      "Json_Param_String" : JSON.stringify([{'Budget_Group_ID': id }])
    }
    this.GlobalAPI
        .getData(obj)
        .subscribe((data: any) => {
          console.log(data)
          data.forEach(el => {
            el['label'] = el.Budget_Sub_Group_Name;
            el['value'] = el.Budget_Sub_Group_ID;
        });
          this.EstimateSubGroupList = data;
    });
  }
  
}
EstimateSubGroupChange(id){
  this.ObjEstimate.Budget_Sub_Group_Name = undefined;
  if(id) {
    this.ObjEstimate.Budget_Sub_Group_Name = this.EstimateSubGroupList.filter(ob => ob.Budget_Sub_Group_ID.toString() === id.toString())[0].Budget_Sub_Group_Name;
    
  }
}
EstimateGroupProductChange(id) {
  this.ObjEstimate.Product_Description = undefined;
  this.ObjEstimate.UOM = undefined;
  if(id) {
    const arr = this.EstimateGroupProductList.filter(ob => ob.Product_ID.toString() === id.toString());
    this.ObjEstimate.Product_Description = arr[0].Product_Description;
    this.ObjEstimate.UOM =arr[0].UOM;
  }
}
OpenEstimate(obj){
  this.EstimateAllData = [];
  this.EstimateInfoSubmitted = false;
  this.TenderDocID = undefined;
  if(obj.Tender_Doc_ID) {
    this.ObjEstimate = {};
    this.TenderDocID = obj.Tender_Doc_ID;
    this.EstimateModalFlag = true;
    this.GetestimateAllData( );
  }
}
CalculateEstimateAmount() {
  this.ObjEstimate.Amount = undefined;
  if(this.ObjEstimate.Qty && this.ObjEstimate.Rate) {
    this.ObjEstimate.Amount = (Number(this.ObjEstimate.Rate) * Number(this.ObjEstimate.Qty)).toFixed(2);
  }
}
Cleardata3() {  
  this.ObjEstimate.Product_ID = undefined;
  this.ObjEstimate.Product_Description = undefined;
  this.ObjEstimate.UOM = undefined;
}
AddEstimate(valid){
  this.EstimateInfoSubmitted = true;
  if(valid) {
      this.ShowAddedEstimateProductList = [];
    const extimateObj = {...this.ObjEstimate};
    extimateObj.items = [];
    this.ObjEstimate = {};
 

    this.AddedEstimateProductList.push(extimateObj);    
    this.AddedEstimateProductList.sort(function(a, b){
        return parseFloat(a.Budget_Group_ID) - parseFloat(b.Budget_Group_ID);
      });
    this.EstimateInfoSubmitted = false;
    this.ShowAddedEstimateProductList = this.getNestedChildren(this.AddedEstimateProductList);
    console.log(this.ShowAddedEstimateProductList)
    
  }

}
getNestedChildren(arr) {
  var out = []
  var WholeArr = [];
  for (var i = 0; i < arr.length; i++) {
    var count = 0;
    var out2 = []
      if(out.indexOf(arr[i]['Budget_Group_ID']) === -1) {
        out.push(arr[i]['Budget_Group_ID']);
        const ParentDub =  arr.filter(obj => obj.Budget_Group_ID == arr[i].Budget_Group_ID);
        let childParent = [];
        if(ParentDub.length) {
           for (var k = 0; k < ParentDub.length; k++) {
            var count = 0;
              if(out2.indexOf(ParentDub[k]['Budget_Sub_Group_ID']) === -1) {
                out2.push(ParentDub[k]['Budget_Sub_Group_ID']);
                const childDub =  ParentDub.filter(obj => obj.Budget_Group_ID == arr[i].Budget_Group_ID && obj.Budget_Sub_Group_ID == ParentDub[k].Budget_Sub_Group_ID);
                childParent.push({ 
                  'Sl_No' :(out.length).toString() +'.'+ (out2.length).toString() ,
                  'Child_Parent_ID' : ParentDub[k]['Budget_Sub_Group_ID'],
                  'Child_Parent_Name' :ParentDub[k]['Budget_Sub_Group_Name'],
                  'Total_Sub_Group_Amt' : this.TotalByProperty(childDub,'Amount'),
                  'items' : childDub
                })
              }
            }
        } else {
          const childDub =  ParentDub.filter(obj => obj.Budget_Group_ID == arr[i].Budget_Group_ID && obj.Budget_Sub_Group_ID == arr[i].Budget_Sub_Group_ID);
          childParent.push({ 
          'Sl_No' : (out.length).toString() +'.1' ,
          'Child_Parent_ID' : arr[i]['Budget_Sub_Group_ID'],
          'Child_Parent_Name' : arr[i]['Budget_Sub_Group_Name'],
          'Total_Sub_Group_Amt' : this.TotalByProperty(childDub,'Amount'),          
          'items' : childDub
        })
        }
        
        const RootObj = { 
          'Sl_No' : (out.length).toString() ,
          'Root_Parent_ID' : arr[i]['Budget_Group_ID'],
          'Root_Parent_Name' : arr[i]['Budget_Group_Name'],
          'No_of_Child' : ParentDub.length,
          'Total_Group_Amt' : this.TotalByProperty(ParentDub,'Amount'), 
          'Total_Amt' : this.TotalByProperty(arr,'Amount'), 
          'items' : childParent
        }
        WholeArr.push(RootObj);
      } else {

      }
  }
  return WholeArr
}
TotalByProperty(items, prop){
  return items.reduce( function(a, b){
      return Number(a) + Number(b[prop]);
  }, 0);
};
updateRowGroupMetaData() {
  this.rowGroupMetadata = {};
  if (this.AddedEstimateProductList) {
      for (let i = 0; i < this.AddedEstimateProductList.length; i++) {
          let rowData = this.AddedEstimateProductList[i];
          let Budget_Group_ID = rowData.Budget_Group_ID;
          if (i == 0) {
              this.rowGroupMetadata[Budget_Group_ID] = { index: 0, size: 1 };
          }
          else {
              let previousRowData = this.AddedEstimateProductList[i - 1];
              let previousRowGroup = previousRowData.Budget_Group_ID;
              if (Budget_Group_ID === previousRowGroup)
                  this.rowGroupMetadata[Budget_Group_ID].size++;
              else
                  this.rowGroupMetadata[Budget_Group_ID] = { index: i, size: 1 };
          }
      }
  }
  console.log(this.rowGroupMetadata)
}
GetEstimateByGroup(){
  let arr = [];
  if(this.AddedEstimateProductList.length) {
    const MatchedGroupArr = this.AddedEstimateProductList.filter(ob => ob.Budget_Group_ID.toString() === this.ObjEstimate.Budget_Group_ID.toString());
    if(MatchedGroupArr.length) {

    } else {
    this.AddedEstimateProductList.push(this.ObjEstimate);
    this.ObjEstimate = {};
    this.EstimateInfoSubmitted = false;
  }
}
}
SaveEsitimate(){
  if(this.ShowAddedEstimateProductList.length) {
   // this.ObjEstimate.Appo_Date = this.DateService.dateConvert(new Date(this.ResceduleAppoDate));
   const tempArr = this.FetchEstimateObj();
    console.log(tempArr);
    
    const obj = {
      "SP_String":"SP_Tender_Management_All",
      "Report_Name_String": "Tender_Estimation_Create",
      "Json_Param_String" : JSON.stringify(tempArr)
    }
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    this.GlobalAPI
        .postData(obj)
        .subscribe((data: any) => { 
          console.log(data);
    if (data[0].Column1) {
      this.SearchTender(true);
      this.EstimateInfoSubmitted = false;
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "success",
        summary: 'Estimate Management ' ,
        detail: "Succesfully Save."
      });
      this.ObjEstimate = {};
      this.TenderDocID = undefined;
      this.EstimateModalFlag = false;
    } else {
      
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "error",
        detail: data[0].Remarks
      });
    }
  })
  }
  if(!this.ShowAddedEstimateProductList.length) {    
    this.EstimateInfoSubmitted = true;
  }
}
FetchEstimateObj () {
  let tempArr = [];
  for (var i = 0; i < this.ShowAddedEstimateProductList.length; i++) {
    const temp = this.ShowAddedEstimateProductList[i];
    if(temp.items.length){
      for (var k = 0; k < temp.items.length; k++) {
        const temp2 = temp.items[k];
        let slno = temp2.Sl_No;
        if(temp2.items.length){
          for (var h = 0; h < temp2.items.length; h++) {
            const e =  temp2.items[h];  
            if(e && e.Budget_Group_ID){
              const tempObj = {
                Sl_No	: slno,
                Budget_Group_ID: e.Budget_Group_ID,
                Budget_Sub_Group_ID: e.Budget_Sub_Group_ID,
                Product_ID: e.Product_ID,
                Product_Description	: e.Product_Description,
                Esimate_Qty:e.Qty,
                Estimate_UOM:e.UOM,
                Estimate_Rate:e.Rate,	
                Estimate_Amt:e.Amount,
                Tender_Doc_ID : this.TenderDocID
              }
              tempArr.push(tempObj);
            }     
          
          }
      }
    }
    
  }
}
return tempArr;
}
// NEW 
RedirectVoucherAcc() {  
  window.open("/ACC_Txn_Acc_Journal?Voucher_Type_ID=2");
}
GetTenderCallingDiv() {
  this.$http
    .get("/BL_CRM_Txn_Enq_Tender/Get_Tender_Calling_Div_Json")
    .subscribe((data: any) => {
      this.TenderCallingDivList = data ? JSON.parse(data) : [];
    });
}
GetTenderInfoEnqSRC() {
  this.$http
    .get("/BL_CRM_Txn_Enq_Tender/Get_Tender_Enq_Source_Json")
    .subscribe((data: any) => {
      this.TenderInfoEnqList = data ? JSON.parse(data) : [];
      console.log("TenderInfoEnqList",this.TenderInfoEnqList);
    });
}
GetTenderExecutionDiv() {
  this.$http
    .get("/BL_CRM_Txn_Enq_Tender/Get_Tender_Execution_Div_Json")
    .subscribe((data: any) => {
      this.TenderExecutionDivList = data ? JSON.parse(data) : [];
    });
}

LightBoxSave(val,field) {
  console.log(val)
  if(this[val]) {
    const obj = {};obj[field] = this[val];
    let UrlAddress;
    let refreshFunction;
    if(field === 'Tender_Calling_Div_Name') {
      UrlAddress = '/BL_CRM_Txn_Enq_Tender/Create_Tender_Calling_Div'
      refreshFunction = 'GetTenderCallingDiv';
    }
    if(field === 'Tender_Execution_Div_Name') {
      UrlAddress = '/BL_CRM_Txn_Enq_Tender/Create_Tender_Execution_Div'
      refreshFunction = 'GetTenderExecutionDiv';
    }
    if(field === 'Tender_Type_Name') {
      UrlAddress = '/BL_CRM_Txn_Enq_Tender/Create_Tender_Type'
      refreshFunction = 'GetTypeList';
    }
    if(field === 'Tender_Category_Name') {
      UrlAddress = '/BL_CRM_Txn_Enq_Tender/Create_Tender_Category'
      refreshFunction = 'GetTenderCategoryList';
    }
    if(field === 'Tender_Payment_Mode') {
      UrlAddress = '/BL_CRM_Txn_Enq_Tender/Create_Tender_Payment_Type'
      refreshFunction = 'GetPaymentList';
    }
    if(field === 'Enq_Source_Name') {
      UrlAddress = '/BL_CRM_Txn_Enq_Tender/Create_Tender_Enq_Source'
      refreshFunction = 'GetTenderCallingDiv';
    }
    this.Spinner = true;
    this.$http.post(UrlAddress, obj).subscribe((data: any) => {
      console.log(data)
    if (data.success) {
        this.Spinner = false;
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "success",
          summary: "",
          detail: "Succesfully "+field+" Created"
        });
      this[refreshFunction]();
      this.CreateLightBoxSubmitted = false;
      this[val] = undefined;
    } else {
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: "Error Occured "
      });
    }
    });

  }
}
addEstimate(){
  window.open("/Tender_Estimate?Tender_Doc_ID="+this.TenderDocID,"_blank")
}
edit(col){
  window.open("/Tender_Estimate?Tender_Doc_ID="+this.TenderDocID + "&Project_ID="+ col.Project_ID + "&Site_ID=" +col.Site_ID,"_blank")
}
GetestimateAllData(){
  const obj = {
    "SP_String":"SP_Tender_Management_All",
    "Report_Name_String": "Browse_Tender_Estimation",
   "Json_Param_String" : JSON.stringify({Tender_Doc_ID : this.TenderDocID})
  }
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  this.GlobalAPI
      .postData(obj)
      .subscribe((data: any) => { 
       this.EstimateAllData = data ? data : [];
       console.log("EstimateAllData",this.EstimateAllData);
      })
}
inputBoxClr(n){
 if(!n || Number(n) === 0){
  this.ObjBidOpeningList.Quoted_Rate = undefined;
 }
 else {
   this.ObjBidOpeningList.Quoted_Percentage = undefined;
 }
}
totalAmt(){
  let Amtval = 0;
  this.EstimateAllData.forEach(item=>{
    Amtval += Number(item.Estimate_Amt);
  });

  return Amtval ? Amtval : '-';
}
checkSubmission(date){
 return date ? new Date(date) : "-";
}
saveAgreement(valid){
 
  this.AgreementSubmitted = true;
  console.log("valid",valid);
 if(valid){
   this.SpinnerAg = true;
  this.ObjAgreement.Date_of_Commencement = this.ObjAgreement.Date_of_Commencement ? this.ObjAgreement.Date_of_Commencement : this.DateService.dateTimeConvert(new Date(this.CommencementDate));
  this.ObjAgreement.Date_of_Completion = this.ObjAgreement.Date_of_Completion ? this.ObjAgreement.Date_of_Completion : this.DateService.dateTimeConvert(new Date(this.CompletionDate));
  const UrlAddress = "/BL_CRM_Txn_Enq_Tender/Update_Enq_Tender_Bidding_Agreement";
    const obj = { Enq_Bidding_Agreement_String: JSON.stringify([this.ObjAgreement]) };
    this.$http.post(UrlAddress, obj).subscribe((data: any) => {
      if (data.success) {
        this.compacctToast.clear();
        this.compacctToast.add({
        key: "compacct-toast",
        severity: "success",
        summary: 'Estimate Management ' ,
        detail: "Succesfully Save."
      });
       this.SpinnerAg = false;
      } else {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Error Occured "
        });
        this.SpinnerAg = false;
      }
    })
 }
}
PaymentChangeclr(){
  if(this.ObjTender.T_Fee_Payment_Mode === undefined || this.ObjTender.T_Fee_Payment_Mode === null){
    this.ObjTender.T_Fee_Transaction_Ref_No = undefined;
    this.TFeeAmount = undefined;
    this.ObjTender.T_Fee_Payable_To = undefined;
    this.ObjTender.T_Fee_Payable_At = undefined;
    this.ObjTender.T_Fee_exm_Allowed = undefined;
    this.TenderIssueDate =new Date();
    this.TenderExpiryDate = new Date();
    }
}
PSDPaymentChangeclr(){
  if(this.ObjTender.PSD_Payment_Mode === undefined || this.ObjTender.PSD_Payment_Mode === null){
    this.ObjTender.PSD_Acc_Voucher_No = undefined;
    this.PerformanceSecurityAmount = undefined;
    this.ObjTender.PSD_Payable_To = undefined;
    this.ObjTender.PSD_Payable_At = undefined;
    this.ObjTender.PSD__Fees_Exemption_Allowed = undefined;
    this.PerformanceIssueDate =new Date();
    this.PerformanceExpiryDate = new Date();
  }
}
}
class Tender{
  Tender_Doc_ID = 0;
   Tender_ID:string;
  Cost_Cen_ID:string;
  User_ID:string;
  Posted_On:string;
  Enq_Source_ID:number;
  Tender_Org_ID	:string;
  Tender_Category_ID:string;
  Tender_Amount	:number;
  Tender_Name:string;
  Elegibility = '';
  Tender_Opening_Date:string;
  Tender_Closing_Date:string;
  Corrigendum	 = '';
  Remarks	:string;
  Lead_Status = 'Tender Created';
  EMD_Amount:number;
  T_Fee_Amount:number;
  Enq_Source_Detail:string;
  Tender_Ref_No:string;
  Tender_Type_ID: string;
  Form_Of_Contract_ID	 = '0';
  Location:string;
  Pin_Code:string;
  Tender_Payment_Mode_ID	 = '0';
  Tender_Publish_Date:string;
  Period_Of_Work:string;
  EMD_Through_BG_SD	 = '';
  EMD_fee_Type	 = '';
  EMD_Persentage	 = '';
  EMD_Payable_To:any = 0;
  EMD_Payable_At:string;
  T_Fee_Payable_At:string;
  T_Fee_Payable_To:string;
  T_Fee_exm_Allowed :string;
  dial_code = '+91';
  Enq_Source_Mobile	 = ''
  APSD_Amount:number;
  
  Tender_Calling_Div_ID  :string;            
  Tender_Execution_Div_ID :string;                  
  State :string;        
  T_Fee_Payment_Mode:string;       
  T_Fee_Transaction_Ref_No:string; 
  EMD_Payment_Mode:string; 
  EMD_Transaction_Ref_No:string; 
  EMD_Fees_Exemption_Allowed:string; 
  PSD_Payment_Mode:string; 
  PSD_Acc_Voucher_No:string;    
  PSD_Payable_To	 :string;   
  PSD_Payable_At	:string;  
  PSD__Fees_Exemption_Allowed	:string;
  Tender_Publishing_Info_From:string;

  EMD_Date_of_Issue	:string;
  EMD_Date_of_Expiry	:string;
  T_Fee_Date_of_Issue	:string;
  T_Fee_Date_of_Expiry	:string;
  PSD_Date_of_Issue		:string;
  PSD_Date_of_Expiry	:string;
  
}
class Task{
  Task_ID= 0;
  Priority = 'Normal';
  Task_Status_ID	= 1;
  Task_Subject:string;
  Due_On:string;
  Tagged_To_User_ID:string;
  Linked_To= 'Lead'
  Tender_Doc_ID:number;
  Sub_Ledger_ID =0;
  Last_Updated_On:string;
  Created_By:string;
  Created_On:string;
}
class Search{
  From_Date:string;
  To_Date:string;
  Date_Type:string;
  Tender_Closing_Date:string;
  Tender_Org_ID: string;
  Search_Type:string;
  Search_Text:string;
}

class EMD{
  Tender_Doc_ID: string;
   EMD_Amount:number;
  EMD_Amount_Deposit_Date:string;
  EMD_Amount_Deposit_Type:string;
  EMD_BG_Creation_Date= '';
  EMD_BG_Exp_Date= '';
  EMD_FD_Amount:number;
  EMD_FD_Mature_Amount:number;
  EMD_FD_Mature_Date= '';
  EMD_NEFT_Txn_Date= '';
  EMD_NEFT_TXN_No= '';

  T_Fee_exm_Allowed :string;
  EMD_Date_of_Issue	:string;
  EMD_Date_of_Expiry	:string;
  EMD_Payment_Mode:string; 
  EMD_Transaction_Ref_No:string; 
  EMD_Fees_Exemption_Allowed:string;
  EMD_Through_BG_SD	 = '';
  EMD_fee_Type	 = '';
  EMD_Persentage	 = '';
  EMD_Payable_To:string;
  EMD_Payable_At:string;
}
class tenerFee {
  Tender_Doc_ID = 0;
   Tender_ID:string;
  Cost_Cen_ID:string;
  User_ID:string;
  Posted_On:string;
  Enq_Source_ID:number;
  Tender_Org_ID	:string;
  Tender_Category_ID:string;
  Tender_Amount	:number;
  Tender_Name:string;
  Elegibility = '';
  Tender_Opening_Date:string;
  Tender_Closing_Date:string;
  Corrigendum	 = '';
  Remarks	:string;
  Lead_Status = 'Tender Created';
  EMD_Amount:number;
  T_Fee_Amount:number;

  Enq_Source_Detail:string;
  Tender_Ref_No:string;
  Tender_Type_ID: string;
  Form_Of_Contract_ID	 = '0';
  Location:string;
  Pin_Code:string;
  Tender_Payment_Mode_ID	 = '0';
  Tender_Publish_Date:string;
  Period_Of_Work:string;
  EMD_Through_BG_SD	 = '';
  EMD_fee_Type	 = '';
  EMD_Persentage	 = '';
  EMD_Payable_To:string;
  EMD_Payable_At:string;
  T_Fee_Payable_At:string;
  T_Fee_Payable_To:string;
  T_Fee_exm_Allowed :string;
  dial_code = '+91';
  Enq_Source_Mobile	 = ''

  Tender_Calling_Div_ID  :string;            
  Tender_Execution_Div_ID :string;                  
  State :string;        
  T_Fee_Payment_Mode:string;       
  T_Fee_Transaction_Ref_No:string; 
  EMD_Payment_Mode:string; 
  EMD_Transaction_Ref_No:string; 
  EMD_Fees_Exemption_Allowed:string; 
  PSD_Payment_Mode:string; 
  PSD_Acc_Voucher_No:string;    
  PSD_Payable_To	 :string;   
  PSD_Payable_At	:string;  
  PSD__Fees_Exemption_Allowed	:string;
  Tender_Publishing_Info_From:string;

  EMD_Date_of_Issue	:string;
  EMD_Date_of_Expiry	:string;
  T_Fee_Date_of_Issue	:string;
  T_Fee_Date_of_Expiry	:string;
  PSD_Date_of_Issue		:string;
  PSD_Date_of_Expiry	:string;
}
class PerformanceSecurity {
  Tender_Doc_ID = 0;
   Tender_ID:string;
  Cost_Cen_ID:string;
  User_ID:string;
  Posted_On:string;
  Enq_Source_ID:number;
  Tender_Org_ID	:string;
  Tender_Category_ID:string;
  Tender_Amount	:number;
  Tender_Name:string;
  Elegibility = '';
  Tender_Opening_Date:string;
  Tender_Closing_Date:string;
  Corrigendum	 = '';
  Remarks	:string;
  Lead_Status = 'Tender Created';
  EMD_Amount:number;
  T_Fee_Amount:number;
  APSD_Amount:number;
  Enq_Source_Detail:string;
  Tender_Ref_No:string;
  Tender_Type_ID: string;
  Form_Of_Contract_ID	 = '0';
  Location:string;
  Pin_Code:string;
  Tender_Payment_Mode_ID	 = '0';
  Tender_Publish_Date:string;
  Period_Of_Work:string;
  EMD_Through_BG_SD	 = '';
  EMD_fee_Type	 = '';
  EMD_Persentage	 = '';
  EMD_Payable_To:string;
  EMD_Payable_At:string;
  T_Fee_Payable_At:string;
  T_Fee_Payable_To:string;
  T_Fee_exm_Allowed :string;
  dial_code = '+91';
  Enq_Source_Mobile	 = ''
  
  Tender_Calling_Div_ID  :string;            
  Tender_Execution_Div_ID :string;                  
  State :string;        
  T_Fee_Payment_Mode:string;       
  T_Fee_Transaction_Ref_No:string; 
  EMD_Payment_Mode:string; 
  EMD_Transaction_Ref_No:string; 
  EMD_Fees_Exemption_Allowed:string; 
  PSD_Payment_Mode:string; 
  PSD_Acc_Voucher_No:string;    
  PSD_Payable_To	 :string;   
  PSD_Payable_At	:string;  
  PSD__Fees_Exemption_Allowed	:string;
  Tender_Publishing_Info_From:string;

  EMD_Date_of_Issue	:string;
  EMD_Date_of_Expiry	:string;
  T_Fee_Date_of_Issue	:string;
  T_Fee_Date_of_Expiry	:string;
  PSD_Date_of_Issue		:string;
  PSD_Date_of_Expiry	:string;
  PSD_Amount :any;

}
class Fee{
  Tender_Doc_ID:string;
  T_Fee_Amount_Deposit_Date:string;
  T_Fee_NEFT_Txn_Date:string;
  T_Fee_NEFT_TXN_No:string;
}
class Submission{
  Tender_Doc_ID:string;
  Tender_Submission_Date:string;
}
class BidOpening{
    Tender_Doc_ID:string;
    Tender_Inviting_Authority:string;
    Financial_Bid_Status:string;
    Fin_Year_Name:string;
    ISD_Amount:number;
    ISD_Maturity_Amount:number;
    ISD_Bank:string;
    ISD_Deposit_date:string;
    ISD_Release_Date: string;
    ISD_Deposit_Type:string;
    ISD_Deposit_Number:string;
    ISD_Through_BG_FD:string;
    ISD_BG_Creation_Date:string;
    ISD_BG_Exp_Date:string;
    ISD_FD_Amount:number;
    ISD_FD_Mature_Amount:number;
    ISD_FD_Mature_Date:string;
    ISD_NEFT_Txn_Date:string;
    ISD_NEFT_TXN_No:string;
    APSD_Amount:number;
    APSD_Maturity_Amount:number;
    APSD_Bank:string;
    APSD_Deposit_date:string;
    APSD_Release_Date: string;
    APSD_Deposit_Type:string;
    APSD_Deposit_Number:string;
    APSD_Through_BG_FD:string;
    APSD_BG_Creation_Date:string;
    APSD_BG_Exp_Date:string;
    APSD_FD_Amount:number;
    APSD_FD_Mature_Amount:number;
    APSD_FD_Mature_Date:string;
    APSD_NEFT_Txn_Date:string;
    APSD_NEFT_TXN_No:string;
    Agreement_Number:string;
    Agreement_Value:any;
    Date_of_Commencement:string;
    Date_of_Completion:string;
    Periods_of_Completion:string;
    Circle:string;
    Division:string;
    Not_Awarding_Reason:string;
    Disqualify:string;
    EOT_Applied:string;
    Rank_Type: string;
    BOQ_File_Name:string;
    Project_Short_Name:string;
    Agreement_value : string;
   
 }
class BidOpeningList {
      Schedule_ID:string;
      Sl_No	:number;
      Bidder_Name:string;
      Tender_Value:number;
      Quoted_Percentage:string;
      Quoted_Rate:number;
      Less_Excess:string;
      Rate:number;
      Rate_In_Words:string;
      Tender_Doc_ID:string;
      
}
class RankBidOpeningList {
  Rank_ID:string;
  Rank:string;
  Sl_No	:number;
  Bidder_Name:string;
  Tender_Value:number;
  Quoted_Percentage:string;
  Less_Excess:string;
  Rate:number;
  Rate_In_Words:string;
  Tender_Doc_ID:string;
  Lottery_Flag:string;
  Quoted_Rate:string;
  Temp_Bidder_Array:any = [];
  
}
class Agreement{
  Tender_Doc_ID : number;
  Agreement_Number :any;
  Agreement_Value :any;
  Date_of_Commencement :any;
  Date_of_Completion :any;
  Circle :any
}
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CompacctCommonApi } from '../../../shared/compacct.services/common.api.service';
import { CompacctHeader } from '../../../shared/compacct.services/common.header.service';
import { MessageService } from "primeng/api";
import * as moment from "moment";
import { DateTimeConvertService } from '../../../shared/compacct.global/dateTime.service';
declare var $:any;

@Component({
  selector: 'app-compacct-civildaily-job',
  templateUrl: './compacct.civildaily-job.component.html',
  styleUrls: ['./compacct.civildaily-job.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class CompacctCivildailyJobComponent implements OnInit {
  tabIndexToView = 0;
  url = window["config"];
  persons: [];
  buttonname = "Create";
  Spinner = false;
  items = [];

  ProjectList = [];
  RoadList = [];

  BOQData = [];
  ItemList = [];
  TripByList = [];
  DeductPerList = [];
  SelectedItemCode:any;

  ObjSearch = new Search();
  SerachFormSubmitted = false;
  TripTempArr:any = [];
  TripTempArrFromDetails:any =[];
  TripModal = false;

  JobDate = new Date();
  YESTERDAY = new Date(Date.now() - 864e5);
  TODAY = new Date();
  ObjJobData = new JobData();
  DailyJobFormFormSubmitted = false;
  TripByFormSubmitted = false;
  expandedRows: {} = {};
  DetailList = [];
  DetailList2 = [];
  DetailList3 = [];
  tempArr = [];
  tempArr2 = [];
  tempArr3 = [];
  TripBySubmitted = false
TripByName = undefined;
TripByModal = false;

CreateModalFlag = false;
rowGroupMetadata: any;


TypeBrideList = [];
BridgeItemData =[];
BridgeItemList = [];
BridgeItemSelect = [];
BridgeDetailList = [];
LooseQtyList =[];
TypeSubmitted = false;
TypeName = undefined;
TypeModal = false;
LooseQntySubmitted = false;
LooseQntyName = undefined;
LooseQntyModal = false;
StructureTypeModal = false;
StructureFormSubmitted = false;
StructureTypeModal2 = false;
StructureFormSubmitted2 = false;
StructureNameSubmitted = false;
StructureNameList =[];
StructureName = undefined;
StructureNameModal = false;
PartySubmitted = false;
PartyName = undefined;
PartyModal = false;
ReceivedFromSubmitted = false;
ReceivedFromName = undefined;
ReceivedFromModal = false;
StructureTypeDetailList =[];
StructureTypeDetailList2 = [];
PartyList =[];
ReceivedFromList = [];
DistinctStructure = [];
DistinctStructure2 = [];
DistinctStructure3 = [];
DistinctItemCode = [];
DistinctItemCode2 = [];
DistinctItemCode3 = [];
DistinctSubItemCode3 = [];
DistinctSubItemCode2 = [];
DistinctSubItemCode = [];
ChainageValidMgs = '';
DiaList = [];
StructureDetailsObj: any = {};
concreteStructureObj: any = {};
StructureDetailsModalFlag = false;
waitLoader = false;
ProjectID = undefined;

  constructor(
    private $http: HttpClient,
    private commonApi: CompacctCommonApi,
    private Header: CompacctHeader,
    private compacctToast: MessageService,
    private DateService: DateTimeConvertService
  ) {
    this.DiaList = [
      {dia : '8' , co_eff : '0.395'},
      {dia : '10' , co_eff : '0.617'},
      {dia : '12' , co_eff : '0.889'},
      {dia : '16' , co_eff : '1.580'},
      {dia : '20' , co_eff : '2.469'},
      {dia : '25' , co_eff : '3.858'},
      {dia : '28' , co_eff : '4.840'},
      {dia : '32' , co_eff : '6.321'},
      {dia : '34' , co_eff : '7.136'},
      {dia : '36' , co_eff : '8.000'},
      {dia : '40' , co_eff : '9.877'},
      {dia : '45' , co_eff : '12.500'},
      {dia : '50' , co_eff : '15.432'},
      {dia : '56' , co_eff : '19.358'},
      {dia : '60' , co_eff : '22.222'},
      {dia : '63' , co_eff : '24.500'},
      {dia : '63.500' , co_eff : '24.890'},
      {dia : '65' , co_eff : '26.080'},
      {dia : '70' , co_eff : '30.247'}
    ]
   }

  ngOnInit() {
     this.items = ["BROWSE", "CREATE"];
     this.Header.pushHeader({
      Header: "Daily Progress Report (Civil)",
      Link: " Civil -> Daily Progress Report (Civil)"
    });

    this.GetRoad();
    this.GetBridgeType();
    this.GetDeductPerList();
    this.GetParty();
    this.ObjJobData.Date = this.DateService.dateConvert(
      moment(this.JobDate, "YYYY-MM-DD")["_d"]
    );

  }
  // BROWSE
  GetRoad() {
    this.$http
    .get("/BL_Txn_Civil_Daily_Job/Get_Project_Short_Name_Json")
      .subscribe((data: any) => {
        const roadData = data ? JSON.parse(data) : [];
        roadData.forEach(el => {
          this.RoadList.push({
            label: el.Project_Short_Name,
            value: el.Project_Short_Name
          });
        });
      });
  }
  GetLooseQty(type) {
    if(type) {
      this.$http
      .get("/BL_Txn_Civil_Daily_Job/Get_Loose_Qty_Per_Trip?Loose_Type="+type)
        .subscribe((data: any) => {
          this.LooseQtyList = data.length ? data : [];
        });
    }

  }
  GetBridgeType() {
    this.$http
    .get("/BL_Txn_Civil_Daily_Job/Get_Structured_Type_Json")
      .subscribe((data: any) => {
        this.TypeBrideList = data ? JSON.parse(data) : [];

      });
  }
  GetStructureTypeDetail() {
    if(this.ProjectID){
      this.$http
    .get("/BL_Txn_Civil_Daily_Job/Get_Structured_Details?Project_ID="+this.ProjectID)
      .subscribe((data: any) => {
        this.StructureTypeDetailList = data.length ? data : [];

      });
    }

  }
  GetStructureTypeDetail2() {
    if(this.ProjectID){
      this.$http
      .get("/BL_Txn_Civil_Daily_Job/Get_Structured_Details_Concrete?Project_ID="+this.ProjectID)
        .subscribe((data: any) => {
          this.StructureTypeDetailList2 = data.length ? data : [];

        });
    }

  }
  GetStructureName(type) {
    if(type) {
      this.$http
      .get("/BL_Txn_Civil_Daily_Job/Get_Structured_Name_Json?Work_Type="+type)
        .subscribe((data: any) => {
          this.StructureNameList = data ? JSON.parse(data) : [];
        });
    }
  }
  GetParty(){
    this.$http
    .get("/BL_Txn_Civil_Daily_Job/Get_Party_Json")
      .subscribe((data: any) => {
        this.PartyList = data ? JSON.parse(data) : [];

      });
  }
  GetReceivedFrom(type) {
    if(type) {
      this.$http
      .get("/BL_Txn_Civil_Daily_Job/Get_Received_From_Json?Type_of_Work="+type)
        .subscribe((data: any) => {
          this.ReceivedFromList = data ? JSON.parse(data) : [];

        });
    }
  }
  GetDeductPerList() {
    for(let k=0;k < 100;k++){
      const val = k+1;
      this.DeductPerList.push(val);
    }
    this.ObjJobData.Deduct_Percentage = 30;
  }
  Search(valid){
    this.SerachFormSubmitted = true;
    if (valid) {
      this.Spinner = true;
      const obj = new HttpParams()
      .set("Project_Short_Name", this.ObjSearch.Project_Short_Name)
      .set("Agreement_Number", this.ObjSearch.Agreement_Number ?  this.ObjSearch.Agreement_Number : '')
      this.$http
        .get("/BL_Txn_Civil_Daily_Job/Get_Entry_Daily_Job_Browse_Json", { params: obj })
        .subscribe((data: any) => {
          this.ProjectList = data.length ? JSON.parse(data) : [];
          this.Spinner = false;
          this.SerachFormSubmitted = false;
        });
    }
  }

  // CREATE
  EntryJob(obj) {
    this.CreateModalFlag = false;
    this.tempArr = [];
    this.DetailList = [];
    this.DistinctItemCode = [];
    this.ProjectID = undefined;
    if(obj.Project_ID) {
      this.ProjectID = obj.Project_ID;
      this.GetBOQData(obj.Project_ID);
      this.CreateModalFlag = true;
      const name  = this.ObjSearch.Project_Short_Name;
      this.items[1] = "CREATE DPR FOR "+name.toUpperCase();
      this.ObjJobData.calculation_type = 'Addition';
      this.ChangeType();
      this.GetStructureTypeDetail();
      this.GetStructureTypeDetail2();
      const crl = this;
      setTimeout(function(){
        crl.tabIndexToView = 1;
      })
    }
  }
  GetBOQData(id) {
    this.ItemList = [];
    if(id) {
    this.$http
    .get("/BL_Txn_Civil_Daily_Job/Get_Item_Code_Json?Project_ID="+ id)
      .subscribe((data: any) => {
        this.BOQData = data ? JSON.parse(data) : [];
        this.BOQData.forEach(el => {
          this.ItemList.push({
            label:  el.Sl_No +' ' +el.Item_Code,
            value: el.Item_Code
          });
        });
      });
    }
  }
  clearOnChange() {

  }
  ChangeTypeOfWork(type) {
    this.DetailList = [];
    this.DetailList2 = [];
    this.DetailList3 = [];
    this.DistinctItemCode = [];
    this.DistinctItemCode2 = [];
    this.DistinctSubItemCode2 = [];
    this.DistinctItemCode3 = [];
    this.DistinctSubItemCode3 = [];
    this.DistinctStructure = [];
    this.DistinctStructure2 = [];
    this.DistinctStructure3 = [];
    this.tempArr = [];
    this.tempArr2 = [];
    this.tempArr3 = [];
    this.ObjJobData.Structure_Details = undefined;
    this.ChangeStructureDetails(this.ObjJobData.Structure_Details);
    if(type){
      this.GetTripByList(type);
      this.GetLooseQty(type);
      this.GetReceivedFrom(type);
      this.GetStructureName(type);
    }
  }
  ChangeType() {
    this.ObjJobData.Material_Unit = 'CFT';
    if(this.ObjJobData.calculation_type === 'Addition') {
      this.ObjJobData.Chanage_At_KM = undefined;
      this.ObjJobData.Chanage_At_M = undefined;

    }
    if(this.ObjJobData.calculation_type === 'Deduction') {
      this.ObjJobData.No_Of_Trip = undefined;
      this.ObjJobData.Loose_Qty_Per_Trip = undefined;
      this.ObjJobData.Trip_By = undefined;
      this.ObjJobData.Vehicle_No = undefined;

      this.ObjJobData.Chanage_From_KM = undefined;
      this.ObjJobData.Chanage_From_M = undefined;

      this.ObjJobData.Chanage_To_KM = undefined;
      this.ObjJobData.Chanage_To_M = undefined;
      // this.TripTempArr = [];
    }
  }
  ChecItemCode ():string {
    if(this.ObjJobData.Item_Code) {
      let flag;
      const itemCodetoLower = this.ObjJobData.Item_Code.toUpperCase();
      switch(itemCodetoLower) {
        case 'HYSD BAR':
          flag = 'BAR';
          break;
        case 'REMOVING HP':
          flag = 'HP';
          break;
        case 'HP':
          flag = 'HP';
          break;
        case 'HPC':
          flag = 'HP';
          break;
        case 'WEEP HOLE':
          flag = 'HP';
          break;
        case '300MM HP':
          flag = 'HP';
          break;
        case '600MM HP':
          flag = 'HP';
          break;
        case '750MM HP':
          flag = 'HP';
          break;
        case '900MM HP':
          flag = 'HP';
          break;
        case '1000MM HP':
          flag = 'HP';
          break;
        case '1200MM HP':
          flag = 'HP';
          break;
        case '1500MM HP':
          flag = 'HP';
          break;
        case '1800MM HP':
          flag = 'HP';
          break;
        case '2000MM HP':
          flag = 'HP';
          break;


        default:
          flag = '';
      }
return flag;

    }
  }
  ChangeStructureDetails(StructureID){
    this.ObjJobData.Party = undefined;
    this.ObjJobData.structure_at_km = undefined;
    this.ObjJobData.structure_at_meter = undefined;
    this.ObjJobData.Structured_Type = undefined;
    this.ObjJobData.Structured_Breadth = undefined;
    this.ObjJobData.Structured_Height = undefined;
    this.ObjJobData.Structured_Length = undefined;
    this.ObjJobData.structure_at_km = undefined;
    this.ObjJobData.No_of_Span =  undefined;
    this.ObjJobData.Chainage_From_km = undefined;
    this.ObjJobData.Chainage_From_meter = undefined;
    this.ObjJobData.Chainage_To_km = undefined;
    this.ObjJobData.Chainage_To_meter = undefined;
    this.ObjJobData.Structure_Name = undefined;
    this.ObjJobData.Structure_Side = undefined;
    this.concreteStructureObj ={};
    if(StructureID) {
      if(this.ObjJobData.Type_of_Work ==='Bridges and Culverts Works') {
        const obj = $.grep(this.StructureTypeDetailList,function(obj){ return obj.Structure_ID === StructureID})[0];
        this.ObjJobData.structure_at_km = obj.structure_at_km;
        this.ObjJobData.structure_at_meter = obj.structure_at_meter;
        this.ObjJobData.Structured_Type = obj.Structured_Type;
        this.ObjJobData.Structured_Breadth = obj.Structured_Breadth;
        this.ObjJobData.Structured_Height = obj.Structured_Height;
        this.ObjJobData.Structured_Length = obj.Structured_Length;
        this.ObjJobData.structure_at_km = obj.structure_at_km;
        this.ObjJobData.No_of_Span =  obj.No_of_Span;
        this.ObjJobData.Party = obj.Party;
        if((this.ObjJobData.UNIT === 'No.' || this.ObjJobData.UNIT === 'Nos.')){
          this.ObjJobData.Chanage_At_KM = this.ObjJobData.structure_at_km ? this.ObjJobData.structure_at_km : undefined;
          this.check3DigitChanage(this.ObjJobData.structure_at_meter,'Chanage_At_M');
        }
      }
      if(this.ObjJobData.Type_of_Work ==='Road Works (Concrete)') {
        const obj = $.grep(this.StructureTypeDetailList2,function(ob){ return ob.Concrete_Structure_ID === StructureID})[0];
        this.ObjJobData.Structure_Name = obj.Structure_Name;
        this.concreteStructureObj = obj;
        this.ObjJobData.Party = obj.Party;
        this.ObjJobData.Chainage_From_km  = obj.Chainage_From_km;
        this.ObjJobData.Chainage_From_meter  = obj.Chainage_From_meter;
        this.ObjJobData.Chainage_To_km  = obj.Chainage_To_km;
        this.ObjJobData.Chainage_To_meter = obj.Chainage_To_meter;
        this.ObjJobData.Structure_Side = obj.Structure_Side;
        this.ObjJobData.Side = obj.Structure_Side;
      }

    }
  }
  ChangeParty(){

  }
  GetTripByList(type) {
    if(type) {
      this.$http
      .get("/BL_CRM_Txn_Enq_Tender/Get_Tender_BOQ_Trip_By_Json?Type="+type)
      .subscribe((data: any) => {
        this.TripByList = data ? JSON.parse(data) : [];
      });
    }
  }
  GetJobDate (date) {
    if (date) {
      this.ObjJobData.Date = this.DateService.dateConvert(
        moment(date, "YYYY-MM-DD")["_d"]
      );
    }
  }
  ItemCodeChange(obj) {
    this.ObjJobData.Item_Code = undefined;
    this.ObjJobData.UNIT = undefined;
    this.ObjJobData.BOQ_Txn_ID = undefined;
    this.ObjJobData.Sl_No = undefined;
    this.ObjJobData.Deduct_Percentage = undefined;
    this.ObjJobData.No_Of_Trip = undefined;
    this.ObjJobData.Vehicle_No = undefined;
    this.ObjJobData.Loose_Qty_Per_Trip = undefined;
    this.ObjJobData.Trip_By = undefined;

    this.ObjJobData.Chanage_From_KM = undefined;
    this.ObjJobData.Chanage_From_M = undefined;

    this.ObjJobData.Chanage_To_KM = undefined;
    this.ObjJobData.Chanage_To_M = undefined;
    this.TripTempArr = [];
    this.ObjJobData.Chanage_At_KM = undefined;
    this.ObjJobData.Chanage_At_M = undefined;
    this.ObjJobData.Chanage_At_KM = undefined;
    this.ObjJobData.Chanage_At_M = undefined;
   this.ObjJobData.Total_Length= undefined;
   this.ObjJobData.Side= undefined;
   this.ObjJobData.Width= undefined;
   this.ObjJobData.Hight_Thikness= undefined;
   this.ObjJobData.QNTY= undefined;
   this.ObjJobData.UNIT= undefined;
   this.ObjJobData.Trip_Arr = [];
   this.ObjJobData.Remarks= undefined;
   this.ObjJobData.Loose_Qnty= undefined;
  this.ObjJobData.Deduct_Percentage= undefined;
  this.ObjJobData.Total_Loose_Qnty_All= undefined;

  this.ObjJobData.bridge_item_length= undefined;
  this.ObjJobData.Bridge_Item_Breath = undefined;
  this.ObjJobData.Bridge_Item_Height= undefined;
  this.ObjJobData.Bridge_Item_Total_Qty= undefined;
  this.ObjJobData.Bridge_Item_Unit= undefined;
  this.ObjJobData.Bridge_Item_Remarks= undefined;
  this.ObjJobData.bridge_item= undefined;

  this.ObjJobData.Dia= undefined;
  this.ObjJobData.Length_per_Each_Bar= undefined;
  this.ObjJobData.Total_Length_Rmt= undefined;
  this.ObjJobData.Co_efficient= undefined;
  this.ObjJobData.Size_Weep_Hole= undefined;
  this.ObjJobData.Length_per_piece= undefined;
  this.ObjJobData.Number= undefined;
  this.BridgeItemSelect = undefined;
  this.ObjJobData.bridge_item = undefined;
    this.ObjJobData.Bridge_Item_Unit = undefined;
    this.ObjJobData.bridge_item_Sl_No = undefined;
    if(obj) {
      this.waitLoader = true;
      this.ObjJobData.Item_Code = obj;
      this.ObjJobData.Deduct_Percentage = obj === 'BORROWPIT EARTH' ? 30 : undefined;
      const temObj = $.grep(this.BOQData,function(arr){ return arr.Item_Code === obj})[0];
      this.ObjJobData.UNIT = temObj.Unit;
      this.TripTempArr = temObj.Unit === 'Cum' ? this.getTripByItemCode(obj) : [];
      this.ObjJobData.BOQ_Txn_ID = temObj.BOQ_Txn_ID;
      this.ObjJobData.Sl_No = temObj.Sl_No;
       this.ObjJobData.calculation_type = 'Addition';
       this.ObjJobData.Material_Unit = 'CFT';
      if(this.ObjJobData.Type_of_Work) {
        this.BridgeItemData = [];
        this.BridgeItemList = [];
        this.getBridgeItems(this.ObjJobData.BOQ_Txn_ID);
        this.ObjJobData.Side=this.ObjJobData.Type_of_Work ==='Bridges and Culverts Works' ? 'Both Side': undefined;
      }
      if(this.ObjJobData.UNIT === 'No.' || this.ObjJobData.UNIT === 'Nos.' ){
        this.ObjJobData.Chanage_At_KM = this.ObjJobData.structure_at_km ? this.ObjJobData.structure_at_km : undefined;
        this.ObjJobData.Chanage_At_M = this.ObjJobData.structure_at_meter ? this.ObjJobData.structure_at_meter : undefined;
      }
      if(this.ObjJobData.Type_of_Work ==='Road Works (Concrete)' && this.ObjJobData.Structure_Details) {
        const structID = this.ObjJobData.Structure_Details;
        const obj1 = $.grep(this.StructureTypeDetailList2,function(obj){ return obj.Concrete_Structure_ID === structID})[0];
        this.ObjJobData.Side = obj1.Structure_Side;
      }
      this.ObjJobData.Dia = this.ObjJobData.Item_Code.toUpperCase() === 'WEEP HOLE' ? '4' : undefined;
      this.ChecItemCode();
    }
  }
  getBridgeItems(boqID){
    if(boqID) {
      this.$http
    .get("/BL_Txn_Civil_Daily_Job/Get_Bridge_Culvart_Sub_Code_Json?BOQ_Txn_ID="+boqID)
      .subscribe((data: any) => {
        this.BridgeItemData = JSON.parse(data);
        if(this.BridgeItemData.length) {
          this.BridgeItemData.forEach(el => {
            this.BridgeItemList.push({
              label: el.Sl_No +' ' +el.Item_Code,
              value: el.Item_Code
            });
          });
        }
        this.waitLoader = false;
      });
    }
  }
  BridgeItemCodeChange(obj) {
    this.ObjJobData.bridge_item = undefined;
    this.ObjJobData.Bridge_Item_Unit = undefined;
    this.ObjJobData.bridge_item_Sl_No = undefined;
    if(obj) {
      this.ObjJobData.bridge_item = obj;
      const temObj = $.grep(this.BridgeItemData,function(arr){ return arr.Item_Code === obj})[0];
      this.ObjJobData.Bridge_Item_Unit = temObj.Unit;
      this.ObjJobData.bridge_item_Sl_No = temObj.Sl_No;
      if(!this.ObjJobData.UNIT) {
        this.ObjJobData.UNIT = temObj.Unit;
        this.TripTempArr = temObj.Unit === 'Cum' ? this.getTripByItemCode(this.ObjJobData.Item_Code) : [];
      }
    }
  }
  CalculateTotalLooseQty (){
    this.ObjJobData.Total_Loose_Qty = undefined;
    if(this.ObjJobData.Loose_Qty_Per_Trip && this.ObjJobData.No_Of_Trip){
      const val = Number(this.ObjJobData.No_Of_Trip) * Number(this.ObjJobData.Loose_Qty_Per_Trip);
      this.ObjJobData.Total_Loose_Qty = typeof(val) === "number" ? val.toFixed(3) : Number(val).toFixed(3);
    }
  }
  getFlooredFixed(v, d) {
    return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
  }
  addZeroes(numr) {
    const num = typeof(numr) === "number" ? numr.toString() : numr;
    const dec = num.split('.')[1]
    const len = dec && dec.length > 3 ? dec.length : 3
    return Number(num).toFixed(len)
  }
  insertDecimal(num) {
    return Number((num / 100).toFixed(3));
 }
  GetTotalLength() {
    const checkValid = this.checkValidChainage();
    if(checkValid) {
      if(this.ObjJobData.Item_Code !== 'BORROWPIT EARTH' || (this.ObjJobData.UNIT !== 'Cum' && this.ObjJobData.UNIT !== 'Sqm')) {
      this.ObjJobData.Total_Length =  undefined;
      if((this.ObjJobData.Chanage_From_KM && this.ObjJobData.Chanage_From_M) && (this.ObjJobData.Chanage_To_KM && this.ObjJobData.Chanage_To_M) && (this.ObjJobData.UNIT === 'Cum' || this.ObjJobData.UNIT === 'Sqm')){
        const regExp = /^0[0-9].*$/
        const FromM = regExp.test(this.ObjJobData.Chanage_From_M) ? this.ObjJobData.Chanage_From_M : Number(this.ObjJobData.Chanage_From_M)
        const tOM = regExp.test(this.ObjJobData.Chanage_To_M) ? this.ObjJobData.Chanage_To_M : Number(this.ObjJobData.Chanage_To_M)
        const ChanageFromTotal = this.ObjJobData.Chanage_From_KM +"."+ FromM;
        const ChanageToTotal =   this.ObjJobData.Chanage_To_KM  +"."+ tOM;
        const val =((Number(ChanageToTotal)-Number(ChanageFromTotal)) * 1000).toFixed(3);
        const addVal = this.addZeroes(val)
        this.ObjJobData.Total_Length = this.numberWithCommas(val);
        this.GetQnty();
      }
      }
    }
  }
  checkValidChainage(){
    let flag = false;
    this.ChainageValidMgs = '';
    if((this.ObjJobData.Chanage_From_M || this.ObjJobData.Chanage_From_KM) && (this.ObjJobData.Chanage_To_KM || this.ObjJobData.Chanage_To_M)) {
      const Chanage_From = Number(this.ObjJobData.Chanage_From_KM) + '.' + this.ObjJobData.Chanage_From_M;
      const  Chanage_To = Number(this.ObjJobData.Chanage_To_KM) + '.' + this.ObjJobData.Chanage_To_M;
      if((Number(Chanage_From) > Number(Chanage_To)) || (Number(Chanage_From) === Number(Chanage_To)) ) {
        flag = false;
        this.ChainageValidMgs = 'Chainage To Must Be Greater Than Chainage From.';
      } else {
        flag = true;
      }
      if(flag) {
        flag = this.checkStructureChanage();
      }
      if(!flag) {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          life: 5000,
          summary: "Chainage Error Message",
          detail: this.ChainageValidMgs
        });
      }
    }

    return flag;
  }
  checkStructureChanage(){
    let flag = true;
    const Chanage_From = Number(this.ObjJobData.Chanage_From_KM) + '.' + this.ObjJobData.Chanage_From_M;
    const  Chanage_To = Number(this.ObjJobData.Chanage_To_KM) + '.' + this.ObjJobData.Chanage_To_M;
    if((this.ObjJobData.Chainage_From_km || this.ObjJobData.Chainage_From_meter) && (this.ObjJobData.Chainage_To_km || this.ObjJobData.Chainage_To_meter)) {
      const Chanage_From1 = Number(this.ObjJobData.Chainage_From_km) + '.' + this.ObjJobData.Chainage_From_meter;
      const  Chanage_To1 = Number(this.ObjJobData.Chainage_To_km) + '.' + this.ObjJobData.Chainage_To_meter;
      const Chanage_From2 = Number(this.ObjJobData.Chanage_From_KM) + '.' + this.ObjJobData.Chanage_From_M;
      const  Chanage_To2 = Number(this.ObjJobData.Chanage_To_KM) + '.' + this.ObjJobData.Chanage_To_M;
      const checkFrom = this.isBetween(Number(Chanage_From2),Number(Chanage_From1),Number(Chanage_To1),'Tovalid');
      const checkTo = this.isBetween(Number(Chanage_To2),Number(Chanage_From1),Number(Chanage_To1),'Fromvalid');
      if(!checkFrom || !checkTo) {
        console.log('found between');
        const Tostr =  'Chainage To : ' + Chanage_To2 + ' of Side ' + this.ObjJobData.Side + ' is Greater / Lesser Than Structure Chainage To.';
        const Fromstr =  'Chainage From : '+ Chanage_From2 + ' of Side ' + this.ObjJobData.Side + ' is Greater / Lesser Than Structure Chainage From.';
        const Allstr =  'Chainage From : '+ Chanage_From2 + ' | Chainage To : ' + Chanage_To2 +' of Side ' + this.ObjJobData.Side + ' is not Between Structure Chainage To & Chainage From.';
        this.ChainageValidMgs = !checkFrom && !checkTo ? Allstr : !checkFrom ? Fromstr : !checkTo ? Tostr: '';
        flag = false;
      } else {
        const checkMax = Number(Chanage_From) < Number(Chanage_From2);
        const checkMaxTo = checkMax ? Number(Chanage_To2) > Number(Chanage_From2) : false;
        if(checkMaxTo) {
          console.log('found between')
          const Tostr =  'Chainage To : ' + Chanage_To2 + ' of Side ' + this.ObjJobData.Side + ' is Greater / Lesser Than Structure Chainage To.';
        const Fromstr =  'Chainage From : '+ Chanage_From2 + ' of Side ' + this.ObjJobData.Side + ' is Greater / Lesser Than Structure Chainage From.';
        const Allstr =  'Chainage From : '+ Chanage_From2 + ' | Chainage To : ' + Chanage_To2 +' of Side ' + this.ObjJobData.Side + ' is not Between Structure Chainage To & Chainage From.';
        this.ChainageValidMgs = checkFrom && checkTo ? Allstr : checkFrom ? Fromstr : checkTo ? Tostr: '';
          flag = false;
        } else{
          flag =  true;
        }
        }
    }
    return flag;
  }
  GetBridgeTotalQtny() {
    this.ObjJobData.QNTY =  undefined;
    if(this.ObjJobData.Bridge_Item_Breath && this.ObjJobData.bridge_item_length && this.ObjJobData.Number){
      if(this.ObjJobData.UNIT === 'Cum' && this.ObjJobData.Bridge_Item_Height) {
        const addVal = Number(this.ObjJobData.Number) * Number(this.ObjJobData.Bridge_Item_Height) * Number(this.ObjJobData.Bridge_Item_Breath) * Number(this.ObjJobData.bridge_item_length)
        const FlterVal = this.ObjJobData.calculation_type === 'Deduction' ? '-' + addVal.toFixed(3) : addVal.toFixed(3)
        this.ObjJobData.QNTY = this.numberWithCommas(FlterVal);
      }
      if(this.ObjJobData.UNIT !== 'Cum') {
        const addVal = Number(this.ObjJobData.Number) *  Number(this.ObjJobData.Bridge_Item_Breath) * Number(this.ObjJobData.bridge_item_length)
        const FlterVal = this.ObjJobData.calculation_type === 'Deduction' ? '-' + addVal.toFixed(3) : addVal.toFixed(3)
        this.ObjJobData.QNTY = this.numberWithCommas(FlterVal);
      }
    }

  }
  GetQnty() {
    if(this.ObjJobData.Item_Code !== 'BORROWPIT EARTH') {
      this.ObjJobData.QNTY =  undefined;
      if(this.ObjJobData.Total_Length && this.ObjJobData.Width  && (this.ObjJobData.UNIT === 'Cum' || this.ObjJobData.UNIT === 'Sqm') ){
       if(this.ObjJobData.UNIT === 'Sqm' ) {
       const height = this.ObjJobData.Hight_Thikness ? Number(this.ObjJobData.Hight_Thikness.replace(/,/g, '')) : 0;
      // const totalLenth =   1000 * Number(this.ObjJobData.Total_Length);
      const totalLenth =   Number(this.ObjJobData.Total_Length.replace(/,/g, ''));
      let val;
      if(this.ObjJobData.Type_of_Work ==='Road Works (Concrete)') {
        val = height === 0 ? (Number(this.ObjJobData.Number) * totalLenth * Number(this.ObjJobData.Width.replace(/,/g, ''))) :((totalLenth * height) * Number(this.ObjJobData.Width.replace(/,/g, '')))
      } else {
        val = height === 0 ? (totalLenth * Number(this.ObjJobData.Width.replace(/,/g, ''))) :((totalLenth * height) * Number(this.ObjJobData.Width.replace(/,/g, '')))
      }

        // const val = (( totalLenth* 1000) * Number(height) * Number(this.ObjJobData.Width)).toFixed(3);

        const FlterVal =  val.toFixed(3);
        this.ObjJobData.QNTY =  this.ObjJobData.calculation_type === 'Deduction' ? '-'+ this.numberWithCommas(FlterVal) : this.numberWithCommas(FlterVal);
       }
       if(this.ObjJobData.UNIT === 'Cum' && this.ObjJobData.Hight_Thikness) {
        const height = this.ObjJobData.Hight_Thikness ? Number(this.ObjJobData.Hight_Thikness.replace(/,/g, '')) : 0;
       // const totalLenth =   1000 * Number(this.ObjJobData.Total_Length);
       const totalLenth =   Number(this.ObjJobData.Total_Length.replace(/,/g, ''));
       let val;
       if(this.ObjJobData.Type_of_Work ==='Road Works (Concrete)') {
        val= height === 0 ? (Number(this.ObjJobData.Number) * totalLenth * Number(this.ObjJobData.Width.replace(/,/g, ''))) :((Number(this.ObjJobData.Number) * totalLenth * height) * Number(this.ObjJobData.Width.replace(/,/g, '')));
       } else{
        val= height === 0 ? (totalLenth * Number(this.ObjJobData.Width.replace(/,/g, ''))) :((totalLenth * height) * Number(this.ObjJobData.Width.replace(/,/g, '')));
       }
       // const val = (( totalLenth* 1000) * Number(height) * Number(this.ObjJobData.Width)).toFixed(3);

         const FlterVal =  val.toFixed(3);
         this.ObjJobData.QNTY =  this.ObjJobData.calculation_type === 'Deduction' ? '-'+ this.numberWithCommas(FlterVal) : this.numberWithCommas(FlterVal);
       }
    }
  }
  }
  GetTotalLooseQnty () {
    this.ObjJobData.Total_Loose_Qnty_All = undefined;
    this.ObjJobData.QNTY = undefined;
    if(this.ObjJobData.Deduct_Percentage && this.ObjJobData.Loose_Qnty){
      const  valueInString = this.ObjJobData.Loose_Qnty.replace(/,/g, '');
      const num = Number(valueInString);
      const Percentage = Number('.'+this.ObjJobData.Deduct_Percentage);
      const val = num - (num * Percentage);
      this.ObjJobData.Total_Loose_Qnty_All = val.toFixed(3);
      this.ObjJobData.QNTY = this.numberWithCommas(val.toFixed(3));
    }
  }
  numberWithCommas(x) {
    x=x.toString();
    let afterPoint = '';
    if(x.indexOf('.') > 0){
      afterPoint = x.substring(x.indexOf('.'),x.length);
    }
    x = Math.floor(x);
    x=x.toString();
    let lastThree = x.substring(x.length-3);
    const otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != ''){
      lastThree = ',' + lastThree;
    }
    const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
    return res
  }
  check3DigitChanage(val:any , fieldName) {
    const checkValid = this.checkValidChainage();
    if(val.length) {

      if(val.length === 1) {
        this.ObjJobData[fieldName] =  '00'+val;;

      }
      if(val.length === 2) {
        this.ObjJobData[fieldName] = '0'+val;

      }
      if(val.length === 3) {
        this.ObjJobData[fieldName] = val;

      }
      if(this.ObjJobData[fieldName].length <= 3  && checkValid) {
        if((this.ObjJobData.Type_of_Work === 'Road Works' || this.ObjJobData.Type_of_Work ==='Road Works (Concrete)')) {
          this.GetTotalLength();
        }
      }

    }
  }
  check3DigitChanage2(val:any , fieldName) {
    if(val.length) {

      if(val.length === 1) {
        this.ObjJobData[fieldName] =  '00'+val;;

      }
      if(val.length === 2) {
        this.ObjJobData[fieldName] = '0'+val;

      }
      if(val.length === 3) {
        this.ObjJobData[fieldName] = val;

      }
      this.checkStructValid();
    }
  }
  checkStructValid() {
    if((this.ObjJobData.Chainage_From_km || this.ObjJobData.Chainage_From_meter) && (this.ObjJobData.Chainage_To_km || this.ObjJobData.Chainage_To_meter)) {
      const Chanage_From = Number(this.ObjJobData.Chainage_From_km) + '.' + this.ObjJobData.Chainage_From_meter;
      const  Chanage_To = Number(this.ObjJobData.Chainage_To_km) + '.' + this.ObjJobData.Chainage_To_meter;
      if(Number(Chanage_From) > Number(Chanage_To)  || (Number(Chanage_From) === Number(Chanage_To))) {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          life: 8000,
          summary: "Chainage Error Message",
          detail: 'Chainage To Must Be Greater Than Chainage From.'
        });
      }
    }
  }
  check3DigitLooseQty(val:any) {
    this.ObjJobData.No_Of_Trip = typeof(val) === "number" ? val.toFixed(2) : Number(val).toFixed(2);
    this.CalculateTotalLooseQty();
  }
  check3DigitTotalLooseQty(val) {
    this.LooseQntyName =  typeof(val) === "number" ? val.toFixed(3) : Number(val).toFixed(3);
  }
  check3DigitWidth(val:any) {
    const val1 = typeof(val) === "number" ? val.toFixed(3) : Number(val).toFixed(3);
    this.ObjJobData.Width = this.numberWithCommas(val1);
    this.GetQnty();
  }
  check3DigitHeight(val:any) {
    const val1 = typeof(val) === "number" ? val.toFixed(3) : Number(val).toFixed(3);
    this.ObjJobData.Hight_Thikness = this.numberWithCommas(val1);
    this.GetQnty();
  }
  check3Digit(val:any,field) {
    if(field === 'QNTY'){
      const val1 = typeof(val) === "number" ? val.toFixed(2) : Number(val).toFixed(2);
      this.ObjJobData[field] = this.numberWithCommas(val1);
    }else{
      this.ObjJobData[field] = typeof(val) === "number" ? val.toFixed(3) : Number(val).toFixed(3);

    }
  }
  check3DigitBridge(val:any,field) {
    this.ObjJobData[field] = typeof(val) === "number" ? val.toFixed(3) : Number(val).toFixed(3);
    this.GetBridgeTotalQtny();
  }
  check3DigitBridgeNumber(val:any) {
    const string = val.toString().includes(".");
    this.ObjJobData.Number = string ? Number(val).toFixed(2) : val;
    if(this.ObjJobData.Type_of_Work ==='Road Works (Concrete)') {
      this.GetQnty();
    } else{
      this.GetBridgeTotalQtny();

    }
  }

  check3DigitLengthPerRmt(val:any) {
    this.ObjJobData.Length_per_Each_Bar = typeof(val) === "number" ? val.toFixed(3) : Number(val).toFixed(3);
    this.CalculateTotalLengthRmt();
  }
  check3DigitNumber(val:any) {
    const string = val.toString().includes(".");
    this.ObjJobData.Number = string ? Number(val).toFixed(2) : val;
    if(this.ObjJobData.Type_of_Work ==='Road Works (Concrete)') {
      this.GetQnty();
     } else{
      this.CalculateTotalLengthRmt();
     }
  }
  check3DigitNumber2(val:any) {
    const string = val.toString().includes(".");
    this.ObjJobData.Number = string ? Number(val).toFixed(2) : val;

    this.calculateHpLength();
  }
  check3DigitTotalLengthRmt(val:any) {
    this.ObjJobData.Total_Length_Rmt = typeof(val) === "number" ? val.toFixed(3) : Number(val).toFixed(3);
    this.CalculateCoefficientQty();
  }
  CalculateTotalLengthRmt() {
    this.ObjJobData.Total_Length_Rmt =  undefined;
    if(this.ObjJobData.Length_per_Each_Bar && this.ObjJobData.Number) {
      const val =  Number(this.ObjJobData.Number) * Number(this.ObjJobData.Length_per_Each_Bar);
      this.ObjJobData.Total_Length_Rmt = typeof(val) === "number" ? val.toFixed(3) : Number(val).toFixed(3);
      this.CalculateCoefficientQty();
    }
  }
  FetchCoefficient(dia) {
    this.ObjJobData.Co_efficient = undefined;
    if (dia) {
      const data = $.grep(this.DiaList,function(obj){ return obj.dia === dia});
      this.ObjJobData.Co_efficient = data.length ? data[0].co_eff : undefined;
      this.CalculateCoefficientQty();
    }
  }
  CalculateCoefficientQty(){
    this.ObjJobData.QNTY =  undefined;
    if(this.ObjJobData.Total_Length_Rmt && this.ObjJobData.Co_efficient) {
      const val = ( (Number(this.ObjJobData.Total_Length_Rmt) * Number(this.ObjJobData.Co_efficient)) / 100 );
      this.ObjJobData.QNTY = typeof(val) === "number" ? val.toFixed(3) : Number(val).toFixed(3);
    }
  }
  calculateHpLength(){
    this.ObjJobData.Total_Length =  undefined;
    if(this.ObjJobData.Length_per_piece && this.ObjJobData.Number) {
      const totallengthper = this.ObjJobData.Length_per_piece.replace(' Mtr.','');
      const val =  Number(this.ObjJobData.Number) * Number(totallengthper);
      this.ObjJobData.Total_Length = typeof(val) === "number" ? val.toFixed(3) : Number(val).toFixed(3);
    }
  }

  AddTrip() {
    this.TripByFormSubmitted = false;
    if(this.ObjJobData.Trip_By && this.ObjJobData.No_Of_Trip && this.ObjJobData.Loose_Qty_Per_Trip && this.ObjJobData.Material_Unit) {
      this.TripTempArr.push({
        'Trip_By' : this.ObjJobData.Trip_By,
        'No_Of_Trip' : this.ObjJobData.No_Of_Trip,
        'Loose_Qty_Per_Trip' : this.ObjJobData.Loose_Qty_Per_Trip,
        'Material_Unit' : this.ObjJobData.Material_Unit,
        'Total_Loose_Qty' : this.ObjJobData.Total_Loose_Qty,
        'Received_From' : this.ObjJobData.Received_From,
        'Vehicle_No': this.ObjJobData.Vehicle_No
      });
      this.TripTempArr.sort(function(a, b){
        return a.Trip_By === b.Trip_By ? 0 : +(a.Trip_By > b.Trip_By) || -1;
      });
      this.ObjJobData.Trip_By = undefined;
      this.ObjJobData.No_Of_Trip = undefined;
      this.ObjJobData.Loose_Qty_Per_Trip = undefined;
      this.ObjJobData.Total_Loose_Qty = undefined;
      this.ObjJobData.Received_From = undefined;
      this.ObjJobData.Vehicle_No = undefined;
      this.ObjJobData.Material_Unit = 'CFT';
      if(this.ObjJobData.UNIT === 'Cum') {
        const qnty = this.getAllQtyTrip();
        this.ObjJobData.Loose_Qnty = qnty.toString();
        if( this.ObjJobData.Item_Code === 'BORROWPIT EARTH'){
          this.GetTotalLooseQnty();
        }
      }
    } else {
      this.TripByFormSubmitted = true;
    }
  }

  getAllQtyTrip() {
    let qunty:any = 0;
    for(let i = 0; i < this.TripTempArr.length; i++) {
      if (this.TripTempArr[i].Material_Unit === 'CFT') {
        const val = Number(this.TripTempArr[i].No_Of_Trip) * Number(this.TripTempArr[i].Loose_Qty_Per_Trip) * 0.0283;
        const addVal = typeof(val) === "number" ? val.toFixed(3) : Number(val).toFixed(3);
        qunty += Number(addVal);
      } else {
        qunty += Number(this.TripTempArr[i].Total_Loose_Qty);
      }
    }
    const decimalCheck = qunty % 1;
    if (decimalCheck > 0) {
      const k = qunty.toString()
      const n = k.lastIndexOf('.');
      const result = k.substring(n + 1);
      const round = Number(Math.round(qunty)).toFixed(3);
      qunty = (Number(result) >= 995 && Number(result) <= 999 ) ? Number(round).toFixed(3) : qunty.toFixed(3);
    }
    const valQnty =  typeof(qunty) === "number" ? qunty.toFixed(3) : Number(qunty).toFixed(3);
    return this.numberWithCommas(valQnty);
  }
  getAllTempQtyTrip() {
    let qunty:any = 0;
    for(let i = 0; i < this.TripTempArrFromDetails.length; i++) {
      if (this.TripTempArrFromDetails[i].Material_Unit === 'CFT') {
        const val = Number(this.TripTempArrFromDetails[i].No_Of_Trip) * Number(this.TripTempArrFromDetails[i].Loose_Qty_Per_Trip) * 0.0283;
        const addVal = typeof(val) === "number" ? val.toFixed(3) : Number(val).toFixed(3);
        qunty += Number(addVal);
      } else {
        qunty += Number(this.TripTempArrFromDetails[i].Total_Loose_Qty);
      }
    }
    const decimalCheck = qunty % 1;
    if (decimalCheck > 0) {
      const k = qunty.toString()
      const n = k.lastIndexOf('.');
      const result = k.substring(n + 1);
      const round = Number(Math.round(qunty)).toFixed(3);
      qunty = (Number(result) >= 995 && Number(result) <= 999 ) ? Number(round).toFixed(3) : qunty.toFixed(3);
    }
    const valQnty =  typeof(qunty) === "number" ? qunty.toFixed(3) : Number(qunty).toFixed(3);
    return this.numberWithCommas(valQnty);
  }
  firstInGroupTrip(str: any){
    return this.TripTempArr.filter(s => s.Trip_By == str.Trip_By).indexOf(str) == 0;
  }
  DeleteTrip(index){
    this.TripTempArr.splice(index, 1);
    this.getAllQtyTrip();
    if( this.ObjJobData.Item_Code === 'BORROWPIT EARTH' && this.ObjJobData.UNIT === 'Cum') {
      const qnty = this.getAllQtyTrip();
      this.ObjJobData.Loose_Qnty = qnty.toString();
      this.GetTotalLooseQnty();
    }
  }

  firstInGroup(str: any){
    return this.DetailList.filter(s => s.Item_Code == str.Item_Code).indexOf(str) == 0;
  }
  GetTotalQnt(obj ,bridge?) {
    let arrTemp = [];
    if(bridge) {
      arrTemp = $.grep(this.DetailList,function(val){return val.bridge_item === obj});
    } else {
      arrTemp = $.grep(this.DetailList,function(val){return val.Item_Code === obj});
    }
    let qunty = 0;
    if((this.ObjJobData.Type_of_Work === 'Bridges and Culverts Works'|| this.ObjJobData.Type_of_Work === 'Road Works (Concrete)')) {
      for(let i = 0; i < arrTemp.length; i++) {
        if(arrTemp[i].QNTY) {
          qunty += Number(arrTemp[i].QNTY.replace(/,/g, ''));
        }
      }
    }
    if(this.ObjJobData.Type_of_Work === 'Road Works') {
      for(let i = 0; i < arrTemp.length; i++) {
        if(arrTemp[i].QNTY) {
        qunty += Number(arrTemp[i].QNTY.replace(/,/g, ''));
        }
      }
    }
    const valQnty =  typeof(qunty) === "number" ? qunty.toFixed(3) : Number(qunty).toFixed(3);
    return this.numberWithCommas(valQnty);
  }
  GetSubTotalQnt(obj) {
    const arrTemp = $.grep(this.DetailList,function(val){return val.bridge_item === obj});
    let qunty = 0;
    if((this.ObjJobData.Type_of_Work === 'Bridges and Culverts Works'|| this.ObjJobData.Type_of_Work === 'Road Works (Concrete)')) {
      for(let i = 0; i < arrTemp.length; i++) {
        if(arrTemp[i].QNTY) {
          qunty += Number(arrTemp[i].QNTY.replace(/,/g, ''));
        }
      }
    }
    if(this.ObjJobData.Type_of_Work === 'Road Works') {
      for(let i = 0; i < arrTemp.length; i++) {
        if(arrTemp[i].QNTY) {
          qunty += Number(arrTemp[i].QNTY.replace(/,/g, ''));
        }
      }
    }
    const valQnty =  typeof(qunty) === "number" ? qunty.toFixed(3) : Number(qunty).toFixed(3);
    return this.numberWithCommas(valQnty);
  }
  GetTotalQntBridge(obj ,struct ,bridge?) {
    let arrTemp = [];
    if(bridge) {
      arrTemp = $.grep(this.DetailList,function(val){return val.bridge_item === obj && val.Structure_Details === struct});
    } else {
      arrTemp = $.grep(this.DetailList,function(val){return val.Item_Code === obj && val.Structure_Details === struct});
    }
    let qunty = 0;
    if((this.ObjJobData.Type_of_Work === 'Bridges and Culverts Works'|| this.ObjJobData.Type_of_Work === 'Road Works (Concrete)')) {
      for(let i = 0; i < arrTemp.length; i++) {
        if(arrTemp[i].QNTY) {
          qunty += Number(arrTemp[i].QNTY.replace(/,/g, ''));
        }
      }
    }
    if(this.ObjJobData.Type_of_Work === 'Road Works') {
      for(let i = 0; i < arrTemp.length; i++) {
        if(arrTemp[i].QNTY) {
        qunty += Number(arrTemp[i].QNTY.replace(/,/g, ''));
        }
      }
    }
    const valQnty =  typeof(qunty) === "number" ? qunty.toFixed(3) : Number(qunty).toFixed(3);
    return this.numberWithCommas(valQnty);
  }
  GetTotalQntBridgeUnit(obj ,struct ,bridge?){
    let arrTemp = [];
    if(bridge) {
      arrTemp = $.grep(this.DetailList,function(val){return val.bridge_item === obj && val.Structure_Details === struct});
    } else {
      arrTemp = $.grep(this.DetailList,function(val){return val.Item_Code === obj && val.Structure_Details === struct});
    }
    const unit = arrTemp.length ? arrTemp[0].UNIT : '';
    return unit;
  }

  AddDetailList(valid) {
    this.DailyJobFormFormSubmitted = true;
    this.ObjJobData.Trip_Arr = [];
    const validFlag = this.ObjJobData.Type_of_Work === 'Bridges and Culverts Works' ? true : this.GridValidationCheck();
    if(valid && validFlag) {
      this.ObjJobData.Date =  this.ObjJobData.Date ?  this.ObjJobData.Date : this.DateService.dateConvert(new Date());
      if(this.ObjJobData.calculation_type === 'Addition' && (this.ObjJobData.Type_of_Work === 'Road Works'|| this.ObjJobData.Type_of_Work === 'Road Works (Concrete)')) {
        this.ObjJobData.Chanage_At =  undefined;
        this.ObjJobData.Chanage_At_KM = undefined;
        this.ObjJobData.Chanage_At_M = undefined;
        this.ObjJobData.structure_at = undefined;
        this.ObjJobData.Trip_Arr = this.TripTempArr;
        this.ObjJobData.Chanage_From = Number(this.ObjJobData.Chanage_From_KM) + '.' + this.ObjJobData.Chanage_From_M;
        this.ObjJobData.Chanage_To = Number(this.ObjJobData.Chanage_To_KM) + '.' + this.ObjJobData.Chanage_To_M;
      }
      if(this.ObjJobData.calculation_type === 'Deduction' && (this.ObjJobData.Type_of_Work === 'Road Works'|| this.ObjJobData.Type_of_Work === 'Road Works (Concrete)')) {
        this.ObjJobData.Trip_Arr =  [];
        this.ObjJobData.Chanage_From =  undefined;
        this.ObjJobData.Chanage_To =  undefined;
        this.ObjJobData.Chanage_From_KM = undefined;
        this.ObjJobData.Chanage_From_M = undefined;
        this.ObjJobData.Chanage_To_KM = undefined;
        this.ObjJobData.Chanage_To_M = undefined;
        this.ObjJobData.structure_at = undefined;
        this.ObjJobData.Chanage_At = Number(this.ObjJobData.Chanage_At_KM) + '.' + this.ObjJobData.Chanage_At_M;
      }
      if(this.ObjJobData.Type_of_Work === 'Bridges and Culverts Works'){
        this.ObjJobData.structure_at = Number(this.ObjJobData.structure_at_km) + '.' + this.ObjJobData.structure_at_meter;
      }
      this.ObjJobData.Grid_Index =  Math.floor(100000 + Math.random() * 900000);



      let processed = [];
      let processed2 = [];
      let processed3 = [];
      const ItemFlag = this.ChecItemCode();

      if((this.ObjJobData.Type_of_Work === 'Bridges and Culverts Works'|| this.ObjJobData.Type_of_Work === 'Road Works (Concrete)') && ItemFlag === 'HP') {
        this.DistinctItemCode2 = [];
        this.DistinctSubItemCode2 = [];
        this.tempArr2.push(this.ObjJobData);
        for(let i = 0; i < this.tempArr2.length; i++){
          if(this.tempArr2[i].Item_Code === this.ObjJobData.Item_Code) {
            this.tempArr2[i].Trip_Arr = this.TripTempArr;
          }
        }

        this.tempArr2.sort(function(a, b) {
          if (a.Item_Code < b.Item_Code) return -1;
          if (a.Item_Code > b.Item_Code) return 1;
          if (a.Item_Code == b.Item_Code) {
              if(a.order > b.order) return -1; else return 1;
          }
        });
        this.DetailList2 = this.tempArr2;
        for(let i = 0; i < this.DetailList2.length; i++) {
          let k = 0 ;
          let objTemp:any = {}
          for(let r = 0; r < this.tempArr2.length; r++){
            if(this.DetailList2[i].Item_Code === this.tempArr2[r].Item_Code) {
              k++;
            }
          }

          if (k > 1) {
            objTemp = this.tempArr2[i];
            this.DetailList2[i].Group = 'Y';
            this.DetailList2[i].Temp_Group_Array = k;
            // const arrTemp = $.grep(this.DetailList,function(val){return val.Item_Code === this.DetailList[i].Item_Code});
            // this.DetailList[i].Temp_Group_Array = [...arrTemp];

          }
        }
        const thisRef = this;
        this.DetailList2.forEach(function(car) {
          thisRef.expandedRows[car.Item_Code] = 1;
        });
        this.DistinctStructure2 = [];
        for(let i = 0; i < this.DetailList2.length; i++) {
          let struc;
          if(this.ObjJobData.Type_of_Work === 'Bridges and Culverts Works') {
            struc = this.DetailList2[i].structure_at_km +'/'+this.DetailList2[i].structure_at_meter+' Km. - '+ this.DetailList2[i].Structured_Type;
          }else {
            struc = this.DetailList2[i].Structure_Name +' - '+this.DetailList2[i].Chainage_From_km +'/'+ this.DetailList2[i].Chainage_From_meter +' to '+this.DetailList2[i].Chainage_To_km +'/'+ this.DetailList2[i].Chainage_To_meter+' Km.';
          }
          if (processed3.indexOf(struc)<0) {
            processed3.push(struc);
            this.DistinctStructure2.push({
              structure:struc,
              Sl_No:this.DetailList2[i].Structure_Details,
              ToggleFlag: false,
              Sub_Item_Flag : false,
              Sub_dist_Item: [],
              Sub_Item_List : []
            });
          }

        }

        for(let i = 0; i < this.DistinctStructure2.length; i++) {
          const StructureDetails = this.DistinctStructure2[i].Sl_No;
          const tempArr1 = $.grep(this.DetailList2,function(obj) { return obj.Structure_Details === StructureDetails});
          if(tempArr1.length) {
            processed = [];
            for(let k = 0; k < tempArr1.length; k++) {
              if (processed.indexOf(tempArr1[k].Item_Code)<0) {
                processed.push(tempArr1[k].Item_Code);
                this.DistinctStructure2[i].Sub_Item_Flag = true;
                this.DistinctStructure2[i].Sub_Item_List.push({
                  Item_Code:tempArr1[k].Item_Code,
                  Sl_No:tempArr1[k].Structure_Details,
                  Item_Code_Sl_No:tempArr1[k].Sl_No,
                  ToggleFlag: true,
                  Sub_Item_Flag : false,
                  Sub_Item_List : []
                });
                this.DistinctStructure2[i].Sub_Item_List.sort((a, b) => (Number(a.Item_Code_Sl_No) > Number(b.Item_Code_Sl_No)) ? 1 : -1);
              }

            }
          }
        }
        for(let i = 0; i < this.DistinctStructure2.length; i++) {
          for(let k = 0; k < this.DistinctStructure2[i].Sub_Item_List.length; k++) {
            const StructureDetails =  this.DistinctStructure2[i].Sub_Item_List[k].Sl_No;
            const ItemCode =  this.DistinctStructure2[i].Sub_Item_List[k].Item_Code;
            const tempArr1 = $.grep(this.DetailList2,function(obj) { return obj.Structure_Details === StructureDetails && obj.Item_Code === ItemCode });
            if(tempArr1.length) {
              processed2 = [];
              for(let p = 0; p < tempArr1.length; p++) {
                if (tempArr1[p].bridge_item ) {
                  if(processed2.indexOf(tempArr1[p].bridge_item)<0) {
                    processed2.push(tempArr1[p].bridge_item);
                    this.DistinctStructure2[i].Sub_Item_List[k].Sub_Item_Flag = true;
                    this.DistinctStructure2[i].Sub_Item_List[k].Sub_Item_List.push({
                      bridge_item:tempArr1[p].bridge_item,
                      Sl_No:tempArr1[p].bridge_item_Sl_No,
                      ToggleFlag2: true,
                    });
                    this.DistinctStructure2[i].Sub_Item_List[k].Sub_Item_List.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);
                  }
                }
              }
            }

          }
        }
        // for(let i = 0; i < this.DetailList2.length; i++) {
        //   const struc = this.DetailList2[i].structure_at_km +'/'+this.DetailList2[i].structure_at_meter;
        //   if (processed3.indexOf(struc)<0) {
        //     processed3.push(struc);
        //     this.DistinctStructure2.push({
        //       structure:struc+' Km. - '+ this.DetailList2[i].Structured_Type,
        //       Sl_No:this.DetailList2[i].Structure_Details,
        //       ToggleFlag: true,
        //       Sub_Item : false,
        //       Sub_Item_List : []
        //     });


        //   }
        // }
        // for(let i = 0; i < this.DetailList2.length; i++) {
        //     if (this.DetailList2[i].Structure_Details ===  this.ObjJobData.Structure_Details ) {
        //       if (processed.indexOf(this.DetailList2[i].Item_Code)<0) {
        //         processed.push(this.DetailList2[i].Item_Code);
        //         this.DistinctItemCode2.push({
        //           Item_Code:this.DetailList2[i].Item_Code,
        //           Sl_No:this.DetailList2[i].Sl_No,
        //           ToggleFlag: true,
        //           Sub_Item_Flag : false,
        //           Sub_Item_List : []
        //         });


        //       }
        //     }
        // }
        // for(let i = 0; i < this.DetailList2.length; i++) {
        //   for(let k = 0; k < this.DistinctItemCode2.length; k++) {
        //     if (this.DetailList2[i].Item_Code ===  this.DistinctItemCode2[k].Item_Code && this.DetailList2[i].bridge_item ) {
        //       if(processed2.indexOf(this.DetailList2[i].bridge_item)<0) {
        //         processed2.push(this.DetailList2[i].bridge_item);
        //         this.DistinctItemCode2[k].Sub_Item_Flag = true;
        //         this.DistinctItemCode2[k].Sub_Item_List.push({
        //           bridge_item:this.DetailList2[i].bridge_item,
        //           Sl_No:this.DetailList2[i].bridge_item_Sl_No,
        //           ToggleFlag2: true,
        //         });
        //         this.DistinctItemCode2[k].Sub_Item_List.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);
        //       }
        //     }
        //   }
        // }

        this.DistinctStructure2.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);
        this.DistinctItemCode2.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);
      } else if ((this.ObjJobData.Type_of_Work === 'Bridges and Culverts Works'|| this.ObjJobData.Type_of_Work === 'Road Works (Concrete)') && ItemFlag === 'BAR') {
        this.DistinctItemCode3 = [];
        this.DistinctSubItemCode3 = [];
        this.tempArr3.push(this.ObjJobData);
        for(let i = 0; i < this.tempArr3.length; i++){
          if(this.tempArr3[i].Item_Code === this.ObjJobData.Item_Code) {
            this.tempArr3[i].Trip_Arr = this.TripTempArr;
          }
        }

        this.tempArr3.sort(function(a, b) {
          if (a.Item_Code < b.Item_Code) return -1;
          if (a.Item_Code > b.Item_Code) return 1;
          if (a.Item_Code == b.Item_Code) {
              if(a.order > b.order) return -1; else return 1;
          }
        });
        this.DetailList3 = this.tempArr3;
        for(let i = 0; i < this.DetailList3.length; i++) {
          let k = 0 ;
          let objTemp:any = {}
          for(let r = 0; r < this.tempArr3.length; r++){
            if(this.DetailList3[i].Item_Code === this.tempArr3[r].Item_Code) {
              k++;
            }
          }

          if (k > 1) {
            objTemp = this.tempArr3[i];
            this.DetailList3[i].Group = 'Y';
            this.DetailList3[i].Temp_Group_Array = k;
            // const arrTemp = $.grep(this.DetailList,function(val){return val.Item_Code === this.DetailList[i].Item_Code});
            // this.DetailList[i].Temp_Group_Array = [...arrTemp];

          }
        }
        const thisRef = this;
        this.DetailList3.forEach(function(car) {
          thisRef.expandedRows[car.Item_Code] = 1;
        });
        this.DistinctStructure3 = [];
        for(let i = 0; i < this.DetailList3.length; i++) {
          let struc;
          if(this.ObjJobData.Type_of_Work === 'Bridges and Culverts Works') {
            struc = this.DetailList3[i].structure_at_km +'/'+this.DetailList3[i].structure_at_meter+' Km. - '+ this.DetailList3[i].Structured_Type;
          }else {
            struc = this.DetailList3[i].Structure_Name +' - '+this.DetailList3[i].Chainage_From_km +'/'+ this.DetailList3[i].Chainage_From_meter +' to '+this.DetailList3[i].Chainage_To_km +'/'+ this.DetailList3[i].Chainage_To_meter+' Km.';
          }
          if (processed3.indexOf(struc)<0) {
            processed3.push(struc);
            this.DistinctStructure3.push({
              structure:struc,
              Sl_No:this.DetailList3[i].Structure_Details,
              ToggleFlag: false,
              Sub_Item_Flag : false,
              Sub_dist_Item: [],
              Sub_Item_List : []
            });
          }

        }

        for(let i = 0; i < this.DistinctStructure3.length; i++) {
          const StructureDetails = this.DistinctStructure3[i].Sl_No;
          const tempArr1 = $.grep(this.DetailList3,function(obj) { return obj.Structure_Details === StructureDetails});
          if(tempArr1.length) {
            processed = [];
            for(let k = 0; k < tempArr1.length; k++) {
              if (processed.indexOf(tempArr1[k].Item_Code)<0) {
                processed.push(tempArr1[k].Item_Code);
                this.DistinctStructure3[i].Sub_Item_Flag = true;
                this.DistinctStructure3[i].Sub_Item_List.push({
                  Item_Code:tempArr1[k].Item_Code,
                  Sl_No:tempArr1[k].Structure_Details,
                  Item_Code_Sl_No:tempArr1[k].Sl_No,
                  ToggleFlag: true,
                  Sub_Item_Flag : false,
                  Sub_Item_List : []
                });
                this.DistinctStructure3[i].Sub_Item_List.sort((a, b) => (Number(a.Item_Code_Sl_No) > Number(b.Item_Code_Sl_No)) ? 1 : -1);
              }

            }
          }
        }
        for(let i = 0; i < this.DistinctStructure3.length; i++) {
          for(let k = 0; k < this.DistinctStructure3[i].Sub_Item_List.length; k++) {
            const StructureDetails =  this.DistinctStructure3[i].Sub_Item_List[k].Sl_No;
            const ItemCode =  this.DistinctStructure3[i].Sub_Item_List[k].Item_Code;
            const tempArr1 = $.grep(this.DetailList3,function(obj) { return obj.Structure_Details === StructureDetails && obj.Item_Code === ItemCode });
            if(tempArr1.length) {
              processed2 = [];
              for(let p = 0; p < tempArr1.length; p++) {
                if (tempArr1[p].bridge_item ) {
                  if(processed2.indexOf(tempArr1[p].bridge_item)<0) {
                    processed2.push(tempArr1[p].bridge_item);
                    this.DistinctStructure3[i].Sub_Item_List[k].Sub_Item_Flag = true;
                    this.DistinctStructure3[i].Sub_Item_List[k].Sub_Item_List.push({
                      bridge_item:tempArr1[p].bridge_item,
                      Sl_No:tempArr1[p].bridge_item_Sl_No,
                      ToggleFlag2: true,
                    });
                    this.DistinctStructure3[i].Sub_Item_List[k].Sub_Item_List.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);
                  }
                }
              }
            }

          }
        }
        // for(let i = 0; i < this.DetailList3.length; i++) {
        //   const struc = this.DetailList3[i].structure_at_km +'/'+this.DetailList3[i].structure_at_meter;
        //   if (processed3.indexOf(struc)<0) {
        //     processed3.push(struc);
        //     this.DistinctStructure3.push({
        //       structure:struc+' Km. - '+ this.DetailList3[i].Structured_Type,
        //       Sl_No:this.DetailList3[i].Structure_Details,
        //       ToggleFlag: true,
        //       Sub_Item : false,
        //       Sub_Item_List : []
        //     });


        //   }
        // }
        // for(let i = 0; i < this.DetailList3.length; i++) {
        //     if (this.DetailList3[i].Structure_Details ===   this.ObjJobData.Structure_Details ) {
        //       if (processed.indexOf(this.DetailList3[i].Item_Code)<0) {
        //         processed.push(this.DetailList3[i].Item_Code);
        //         this.DistinctItemCode3.push({
        //           Item_Code:this.DetailList3[i].Item_Code,
        //           Sl_No:this.DetailList3[i].Sl_No,
        //           ToggleFlag: true,
        //           Sub_Item_Flag : false,
        //           Sub_Item_List : []
        //         });


        //       }
        //   }
        // }
        // for(let i = 0; i < this.DetailList3.length; i++) {
        //   for(let k = 0; k < this.DistinctItemCode3.length; k++) {
        //     if (this.DetailList3[i].Item_Code ===  this.DistinctItemCode3[k].Item_Code && this.DetailList3[i].bridge_item ) {
        //       if(processed2.indexOf(this.DetailList3[i].bridge_item)<0) {
        //         processed2.push(this.DetailList3[i].bridge_item);
        //         this.DistinctItemCode3[k].Sub_Item_Flag = true;
        //         this.DistinctItemCode3[k].Sub_Item_List.push({
        //           bridge_item:this.DetailList3[i].bridge_item,
        //           Sl_No:this.DetailList3[i].bridge_item_Sl_No,
        //           ToggleFlag2: true,
        //         });
        //         this.DistinctItemCode3[k].Sub_Item_List.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);
        //       }
        //     }
        //   }
        // }


      this.DistinctStructure3.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);
      this.DistinctItemCode3.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);
      } else {
        this.tempArr.push(this.ObjJobData);
        for(let i = 0; i < this.tempArr.length; i++){
          if(this.tempArr[i].Item_Code === this.ObjJobData.Item_Code) {
            this.tempArr[i].Trip_Arr = this.TripTempArr;
          }
        }

        this.tempArr.sort(function(a, b) {
          if (a.Item_Code < b.Item_Code) return -1;
          if (a.Item_Code > b.Item_Code) return 1;
          if (a.Item_Code == b.Item_Code) {
              if(a.order > b.order) return -1; else return 1;
          }
        });
        this.DetailList = this.tempArr;
        for(let i = 0; i < this.DetailList.length; i++) {
          let k = 0 ;
          let objTemp:any = {}
          for(let r = 0; r < this.tempArr.length; r++){
            if(this.DetailList[i].Item_Code === this.tempArr[r].Item_Code) {
              k++;
            }
          }

          if (k > 1) {
            objTemp = this.tempArr[i];
            this.DetailList[i].Group = 'Y';
            this.DetailList[i].Temp_Group_Array = k;
            // const arrTemp = $.grep(this.DetailList,function(val){return val.Item_Code === this.DetailList[i].Item_Code});
            // this.DetailList[i].Temp_Group_Array = [...arrTemp];

          }
        }
        const thisRef = this;
        this.DetailList.forEach(function(car) {
          thisRef.expandedRows[car.Item_Code] = 1;
        });
        this.DistinctItemCode = [];
        this.DistinctSubItemCode = [];
        if((this.ObjJobData.Type_of_Work === 'Bridges and Culverts Works' || this.ObjJobData.Type_of_Work === 'Road Works (Concrete)')){
          this.DistinctStructure = [];
          for(let i = 0; i < this.DetailList.length; i++) {
            let struc;
            if(this.ObjJobData.Type_of_Work === 'Bridges and Culverts Works') {
              struc = this.DetailList[i].structure_at_km +'/'+this.DetailList[i].structure_at_meter+' Km. - '+ this.DetailList[i].Structured_Type;
            }else {
              struc = this.DetailList[i].Structure_Name +' - '+this.DetailList[i].Chainage_From_km +'/'+ this.DetailList[i].Chainage_From_meter +' to '+this.DetailList[i].Chainage_To_km +'/'+ this.DetailList[i].Chainage_To_meter+' Km.';
            }
            if (processed3.indexOf(struc)<0) {
              processed3.push(struc);
              this.DistinctStructure.push({
                structure:struc,
                Sl_No:this.DetailList[i].Structure_Details,
                ToggleFlag: false,
                Sub_Item_Flag : false,
                Sub_dist_Item: [],
                Sub_Item_List : []
              });
            }
            // if (this.DetailList[i].Structure_Details ===   this.ObjJobData.Structure_Details ) {
            //   if (processed.indexOf(this.DetailList[i].Item_Code)<0) {
            //     processed.push(this.DetailList[i].Item_Code);
            //     for(let p = 0; p < this.DistinctStructure.length; p++) {
            //       if(this.DistinctStructure[p].Sl_No === this.ObjJobData.Structure_Details){
            //         this.DistinctStructure[p].Sub_dist_Item.push({
            //           Item_Code:this.DetailList[i].Item_Code,
            //           Sl_No:this.DetailList[i].Structure_Details,
            //           ToggleFlag: true,
            //           Sub_Item_Flag : false,
            //           Sub_Item_List : []
            //         })
            //       }
            //     }
            //   }
            // }
          }

          for(let i = 0; i < this.DistinctStructure.length; i++) {
            const StructureDetails = this.DistinctStructure[i].Sl_No;
            const tempArr1 = $.grep(this.DetailList,function(obj) { return obj.Structure_Details === StructureDetails});
            if(tempArr1.length) {
              processed = [];
              for(let k = 0; k < tempArr1.length; k++) {
                if (processed.indexOf(tempArr1[k].Item_Code)<0) {
                  processed.push(tempArr1[k].Item_Code);
                  this.DistinctStructure[i].Sub_Item_Flag = true;
                  this.DistinctStructure[i].Sub_Item_List.push({
                    Item_Code:tempArr1[k].Item_Code,
                    Sl_No:tempArr1[k].Structure_Details,
                    Item_Code_Sl_No:tempArr1[k].Sl_No,
                    ToggleFlag: true,
                    Sub_Item_Flag : false,
                    Sub_Item_List : []
                  });
                  this.DistinctStructure[i].Sub_Item_List.sort((a, b) => (Number(a.Item_Code_Sl_No) > Number(b.Item_Code_Sl_No)) ? 1 : -1);

                }

              }
            }
          }
          for(let i = 0; i < this.DistinctStructure.length; i++) {
            for(let k = 0; k < this.DistinctStructure[i].Sub_Item_List.length; k++) {
              const StructureDetails =  this.DistinctStructure[i].Sub_Item_List[k].Sl_No;
              const ItemCode =  this.DistinctStructure[i].Sub_Item_List[k].Item_Code;
              const tempArr1 = $.grep(this.DetailList,function(obj) { return obj.Structure_Details === StructureDetails && obj.Item_Code === ItemCode });
              if(tempArr1.length) {
                processed2 = [];
                for(let p = 0; p < tempArr1.length; p++) {
                  if (tempArr1[p].bridge_item ) {
                    if(processed2.indexOf(tempArr1[p].bridge_item)<0) {
                      processed2.push(tempArr1[p].bridge_item);
                      this.DistinctStructure[i].Sub_Item_List[k].Sub_Item_Flag = true;
                      this.DistinctStructure[i].Sub_Item_List[k].Sub_Item_List.push({
                        bridge_item:tempArr1[p].bridge_item,
                        Sl_No:tempArr1[p].bridge_item_Sl_No,
                        ToggleFlag2: true,
                      });
                      this.DistinctStructure[i].Sub_Item_List[k].Sub_Item_List.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);
                    }
                  }
                }
              }

            }
          }
          console.log(this.DistinctStructure)
          // for(let i = 0; i < this.DetailList.length; i++) {
          //     if (this.DetailList[i].Structure_Details ===   this.ObjJobData.Structure_Details ) {
          //       if (processed.indexOf(this.DetailList[i].Item_Code)<0) {
          //         processed.push(this.DetailList[i].Item_Code);
          //         this.DistinctItemCode.push({
          //           Item_Code:this.DetailList[i].Item_Code,
          //           Sl_No:this.DetailList[i].Sl_No,
          //           structure:this.DetailList[i].Structure_Details,
          //           ToggleFlag: true,
          //           Sub_Item_Flag : true,
          //           Sub_Item_List : []
          //         });


          //       }
          //   }
          // }
          // const processed4 = [];
          // for(let i = 0; i < this.DistinctStructure.length; i++) {
          //   for(let k = 0; k < this.DetailList.length; k++) {
          //     if (this.DistinctStructure[i].Sl_No ===  this.DetailList[k].Structure_Details ) {
          //       if(processed4.indexOf(this.DetailList[k].Structure_Details)<0) {
          //         processed4.push(this.DetailList[k].Structure_Details);
          //         this.DistinctStructure[i].Sub_Item_Flag = true;
          //         this.DistinctStructure[i].Sub_Item_List.push({
          //           Item_Code:this.DetailList[k].Item_Code,
          //           Sl_No:this.DetailList[k].Structure_Details,
          //           ToggleFlag: true,
          //           Sub_Item_Flag : false,
          //           Sub_Item_List : []
          //         });
          //         this.DistinctStructure[i].Sub_Item_List.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);
          //       }
          //     }
          //   }
          // }
        } else {
          for(let i = 0; i < this.DetailList.length; i++) {
            if (processed.indexOf(this.DetailList[i].Item_Code)<0) {
              processed.push(this.DetailList[i].Item_Code);
              this.DistinctItemCode.push({
                Item_Code:this.DetailList[i].Item_Code,
                Sl_No:this.DetailList[i].Sl_No,
                ToggleFlag: true,
                Sub_Item_Flag : false,
                Sub_Item_List : []
              });


            }
          }
          for(let i = 0; i < this.DetailList.length; i++) {
            for(let k = 0; k < this.DistinctItemCode.length; k++) {
              if (this.DetailList[i].Item_Code ===  this.DistinctItemCode[k].Item_Code && this.DetailList[i].bridge_item ) {
                if(processed2.indexOf(this.DetailList[i].bridge_item)<0) {
                  processed2.push(this.DetailList[i].bridge_item);
                  this.DistinctItemCode[k].Sub_Item_Flag = true;
                  this.DistinctItemCode[k].Sub_Item_List.push({
                    bridge_item:this.DetailList[i].bridge_item,
                    Sl_No:this.DetailList[i].bridge_item_Sl_No,
                    ToggleFlag2: true,
                  });
                  this.DistinctItemCode[k].Sub_Item_List.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);
                }
              }
            }
          }
        }



        this.DistinctStructure.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);
        this.DistinctItemCode.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);
      }
      this.updateRowGroupMetaData();
      this.clearAddDetails();
      this.ChainageValidMgs = '';
    } else {
      if(!validFlag) {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          life: 5000,
          summary: "Chainage Error Message",
          detail: this.ChainageValidMgs
        });
      }
    }

  }
  isBetween(n, a, b,flag?) {
    let toFlag = false;
    if(flag === 'Tovalid') {
      toFlag = n === b ? true: false
    }
    if(flag === 'Fromvalid') {
      toFlag = n === a ? true: false
    }
    return toFlag ? false : (n - a) * (n - b) <= 0
  }
  GetDistinctItemCode(obj) {
    const processed = [] , processed2 = [];
    this.DistinctItemCode = [];
    for(let i = 0; i < this.DetailList.length; i++) {
      if (this.DetailList[i].Structure_Details ===   obj.Sl_No ) {
        if (processed.indexOf(this.DetailList[i].Item_Code)<0) {
          processed.push(this.DetailList[i].Item_Code);
          this.DistinctItemCode.push({
            Item_Code:this.DetailList[i].Item_Code,
            Sl_No:this.DetailList[i].Sl_No,
            ToggleFlag: true,
            Sub_Item_Flag : false,
            Sub_Item_List : []
          });


        }
    }
    }
    for(let i = 0; i < this.DetailList.length; i++) {
      for(let k = 0; k < this.DistinctItemCode.length; k++) {
        if (this.DetailList[i].Item_Code ===  this.DistinctItemCode[k].Item_Code && this.DetailList[i].bridge_item ) {
          if(processed2.indexOf(this.DetailList[i].bridge_item)<0) {
            processed2.push(this.DetailList[i].bridge_item);
            this.DistinctItemCode[k].Sub_Item_Flag = true;
            this.DistinctItemCode[k].Sub_Item_List.push({
              bridge_item:this.DetailList[i].bridge_item,
              Sl_No:this.DetailList[i].bridge_item_Sl_No,
              ToggleFlag2: true,
            });
            this.DistinctItemCode[k].Sub_Item_List.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);
          }
        }
      }
    }
    return this.DistinctItemCode;
  }
  DistinctItemCodeToggle(obj) {
    console.log('ccc')
    obj.ToggleFlag= !obj.ToggleFlag;
  }
  GridValidationCheck() {
    let flag = false;
    let sameFlag = false;
    this.ChainageValidMgs = '';
    const Chanage_From = Number(this.ObjJobData.Chanage_From_KM) + '.' + this.ObjJobData.Chanage_From_M;
    const Chanage_To = Number(this.ObjJobData.Chanage_To_KM) + '.' + this.ObjJobData.Chanage_To_M;
    const Chanage_At = Number(this.ObjJobData.Chanage_At_KM) + '.' + this.ObjJobData.Chanage_At_M;
    for(let i = 0; i < this.DetailList.length; i++) {
      if((this.DetailList[i].calculation_type === this.ObjJobData.calculation_type) && (this.DetailList[i].Item_Code === this.ObjJobData.Item_Code) && this.ObjJobData.Side === 'Both Side') {
        if(this.ObjJobData.bridge_item){
          if(this.DetailList[i].bridge_item === this.ObjJobData.bridge_item){
            const checkFrom = this.isBetween(Number(Chanage_From),Number(this.DetailList[i].Chanage_From),Number(this.DetailList[i].Chanage_To),'Tovalid');
            const checkTo = this.isBetween(Number(Chanage_To),Number(this.DetailList[i].Chanage_From),Number(this.DetailList[i].Chanage_To),'Fromvalid');
            if(checkFrom || checkTo) {
              console.log('found between');
              const Tostr =  'Chainage To : ' + this.DetailList[i].Chanage_To + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Fromstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Allstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' | Chainage To : ' + this.DetailList[i].Chanage_To +' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              this.ChainageValidMgs = checkFrom && checkTo ? Allstr : checkFrom ? Fromstr : checkTo ? Tostr: '';
              flag = false;
                break;
            } else {
              const checkMax = Number(Chanage_From) < Number(this.DetailList[i].Chanage_From);
              const checkMaxTo = checkMax ? Number(Chanage_To) > Number(this.DetailList[i].Chanage_From) : false;
              if(checkMaxTo) {
                console.log('found between')
                const Tostr =  'Chainage To : ' + this.DetailList[i].Chanage_To + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Fromstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Allstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' | Chainage To : ' + this.DetailList[i].Chanage_To +' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              this.ChainageValidMgs = checkFrom && checkTo ? Allstr : checkFrom ? Fromstr : checkTo ? Tostr: '';
                flag = false;
                break;
              } else{
                flag =  true;
              }
              }
            }
        } else {
            const checkFrom = this.isBetween(Number(Chanage_From),Number(this.DetailList[i].Chanage_From),Number(this.DetailList[i].Chanage_To),'Tovalid');
            const checkTo = this.isBetween(Number(Chanage_To),Number(this.DetailList[i].Chanage_From),Number(this.DetailList[i].Chanage_To),'Fromvalid');
            if(checkFrom || checkTo) {
              console.log('found between')
              const Tostr =  'Chainage To : ' + this.DetailList[i].Chanage_To + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Fromstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Allstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' | Chainage To : ' + this.DetailList[i].Chanage_To +' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              this.ChainageValidMgs = checkFrom && checkTo ? Allstr : checkFrom ? Fromstr : checkTo ? Tostr: '';
              flag = false;
                break;
            } else {
              const checkMax = Number(Chanage_From) < Number(this.DetailList[i].Chanage_From);
              const checkMaxTo = checkMax ? Number(Chanage_To) > Number(this.DetailList[i].Chanage_From) : false;
              if(checkMaxTo) {
                console.log('found between')
                const Tostr =  'Chainage To : ' + this.DetailList[i].Chanage_To + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Fromstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Allstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' | Chainage To : ' + this.DetailList[i].Chanage_To +' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              this.ChainageValidMgs = checkFrom && checkTo ? Allstr : checkFrom ? Fromstr : checkTo ? Tostr: '';
                flag = false;
                break;
              } else{
                flag =  true;
              }
            }
          }
      }
      else{
        if( (this.DetailList[i].calculation_type === this.ObjJobData.calculation_type) && (this.DetailList[i].Item_Code === this.ObjJobData.Item_Code) && (this.DetailList[i].Side === 'LHS' && this.ObjJobData.Side === 'LHS')) {
          if(this.ObjJobData.bridge_item){
            if(this.DetailList[i].bridge_item === this.ObjJobData.bridge_item){
              const checkFrom = this.isBetween(Number(Chanage_From),Number(this.DetailList[i].Chanage_From),Number(this.DetailList[i].Chanage_To),'Tovalid');
              const checkTo = this.isBetween(Number(Chanage_To),Number(this.DetailList[i].Chanage_From),Number(this.DetailList[i].Chanage_To),'Fromvalid');
              if(checkFrom || checkTo) {
                console.log('found between')
                const Tostr =  'Chainage To : ' + this.DetailList[i].Chanage_To + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Fromstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Allstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' | Chainage To : ' + this.DetailList[i].Chanage_To +' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              this.ChainageValidMgs = checkFrom && checkTo ? Allstr : checkFrom ? Fromstr : checkTo ? Tostr: '';
                flag = false;
                  break;
              } else {
                const checkMax = Number(Chanage_From) < Number(this.DetailList[i].Chanage_From);
              const checkMaxTo = checkMax ? Number(Chanage_To) > Number(this.DetailList[i].Chanage_From) : false;
              if(checkMaxTo) {
                console.log('found between')
                const Tostr =  'Chainage To : ' + this.DetailList[i].Chanage_To + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Fromstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Allstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' | Chainage To : ' + this.DetailList[i].Chanage_To +' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              this.ChainageValidMgs = checkFrom && checkTo ? Allstr : checkFrom ? Fromstr : checkTo ? Tostr: '';
                flag = false;
                break;
              } else{
                flag =  true;
              }
                }
              }
          } else {
              const checkFrom = this.isBetween(Number(Chanage_From),Number(this.DetailList[i].Chanage_From),Number(this.DetailList[i].Chanage_To),'Tovalid');
              const checkTo = this.isBetween(Number(Chanage_To),Number(this.DetailList[i].Chanage_From),Number(this.DetailList[i].Chanage_To),'Fromvalid');
              if(checkFrom || checkTo) {
                console.log('found between')
                const Tostr =  'Chainage To : ' + this.DetailList[i].Chanage_To + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Fromstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Allstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' | Chainage To : ' + this.DetailList[i].Chanage_To +' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              this.ChainageValidMgs = checkFrom && checkTo ? Allstr : checkFrom ? Fromstr : checkTo ? Tostr: '';
                flag = false;
                  break;
              } else {
                const checkMax = Number(Chanage_From) < Number(this.DetailList[i].Chanage_From);
                const checkMaxTo = checkMax ? Number(Chanage_To) > Number(this.DetailList[i].Chanage_From) : false;
                if(checkMaxTo) {
                  console.log('found between')
                  const Tostr =  'Chainage To : ' + this.DetailList[i].Chanage_To + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Fromstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Allstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' | Chainage To : ' + this.DetailList[i].Chanage_To +' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              this.ChainageValidMgs = checkFrom && checkTo ? Allstr : checkFrom ? Fromstr : checkTo ? Tostr: '';
                  flag = false;
                  break;
                } else{
                  flag =  true;
                }
              }
            }
        }
        else if( (this.DetailList[i].calculation_type === this.ObjJobData.calculation_type) && (this.DetailList[i].Item_Code === this.ObjJobData.Item_Code) && (this.DetailList[i].Side === 'RHS' && this.ObjJobData.Side === 'RHS')) {
          if(this.ObjJobData.bridge_item){
            if(this.DetailList[i].bridge_item === this.ObjJobData.bridge_item){
              const checkFrom = this.isBetween(Number(Chanage_From),Number(this.DetailList[i].Chanage_From),Number(this.DetailList[i].Chanage_To),'Tovalid');
              const checkTo = this.isBetween(Number(Chanage_To),Number(this.DetailList[i].Chanage_From),Number(this.DetailList[i].Chanage_To),'Fromvalid');
              if(checkFrom || checkTo) {
                console.log('found between')
                const Tostr =  'Chainage To : ' + this.DetailList[i].Chanage_To + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Fromstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Allstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' | Chainage To : ' + this.DetailList[i].Chanage_To +' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              this.ChainageValidMgs = checkFrom && checkTo ? Allstr : checkFrom ? Fromstr : checkTo ? Tostr: '';
                flag = false;
                  break;
              } else {
                const checkMax = Number(Chanage_From) < Number(this.DetailList[i].Chanage_From);
                const checkMaxTo = checkMax ? Number(Chanage_To) > Number(this.DetailList[i].Chanage_From) : false;
                if(checkMaxTo) {
                  console.log('found between')
                  const Tostr =  'Chainage To : ' + this.DetailList[i].Chanage_To + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Fromstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Allstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' | Chainage To : ' + this.DetailList[i].Chanage_To +' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              this.ChainageValidMgs = checkFrom && checkTo ? Allstr : checkFrom ? Fromstr : checkTo ? Tostr: '';
                  flag = false;
                  break;
                } else{
                  flag =  true;
                }
                }
              }
          } else {
              const checkFrom = this.isBetween(Number(Chanage_From),Number(this.DetailList[i].Chanage_From),Number(this.DetailList[i].Chanage_To),'Tovalid');
              const checkTo = this.isBetween(Number(Chanage_To),Number(this.DetailList[i].Chanage_From),Number(this.DetailList[i].Chanage_To),'Fromvalid');
              if(checkFrom || checkTo) {
                console.log('found between')
                const Tostr =  'Chainage To : ' + this.DetailList[i].Chanage_To + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Fromstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Allstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' | Chainage To : ' + this.DetailList[i].Chanage_To +' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              this.ChainageValidMgs = checkFrom && checkTo ? Allstr : checkFrom ? Fromstr : checkTo ? Tostr: '';
                flag = false;
                  break;
              } else {
                const checkMax = Number(Chanage_From) < Number(this.DetailList[i].Chanage_From);
                const checkMaxTo = checkMax ? Number(Chanage_To) > Number(this.DetailList[i].Chanage_From) : false;
                if(checkMaxTo) {
                  console.log('found between')
                  const Tostr =  'Chainage To : ' + this.DetailList[i].Chanage_To + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Fromstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              const Allstr =  'Chainage From : '+ this.DetailList[i].Chanage_From + ' | Chainage To : ' + this.DetailList[i].Chanage_To +' of Side ' + this.ObjJobData.Side + ' Already Exits.';
              this.ChainageValidMgs = checkFrom && checkTo ? Allstr : checkFrom ? Fromstr : checkTo ? Tostr: '';
                  flag = false;
                  break;
                } else{
                  flag =  true;
                }
              }

            }
        } else {
          flag = true;
        }

      }
    }
    if(this.ObjJobData.Chanage_From_KM || this.ObjJobData.Chanage_To_KM || this.ObjJobData.Chanage_From_M || this.ObjJobData.Chanage_To_M) {
      if(Chanage_From === Chanage_To ) {
        this.ChainageValidMgs = 'Both Chainage From '+Chanage_From+ ' and Chainage To '+Chanage_To+ ' are same.';
        sameFlag = true;
        flag = false;
      }
    }

    return  ( this.DetailList.length ||  sameFlag ) ? flag : true;
  }
  GetItemConsumption(item,item_code , bridge?) {
    if(item.Loose_Qnty) {
      const totalcompact = this.GetTotalQnt(item_code ,bridge);
      const totalLoseQnty = this.GetGridTotalLooseQnty(item);
      const n = (Number(totalLoseQnty.replace(/,/g, '')) / ( Number(totalcompact.replace(/,/g, ''))));
      return n.toFixed(2) +' %';
    }else {
      return '-';
    }
  }
  GetGridTotalLooseQnty(obj,bridge?){
    let arrTemp = [];
    const index =  this.DetailList.findIndex(ob => ob.Grid_Index === obj.Grid_Index);
    let tempArr = this.DetailList[index].Trip_Arr;

    let qunty:any = 0;
    for(let i = 0; i < tempArr.length; i++) {
      if (tempArr[i].Material_Unit === 'CFT') {
        const val = Number(tempArr[i].No_Of_Trip) * Number(tempArr[i].Loose_Qty_Per_Trip) * 0.0283;
        const addVal = typeof(val) === "number" ? val.toFixed(3) : Number(val).toFixed(3);
        qunty += Number(addVal);
      } else {
        qunty += Number(tempArr[i].Total_Loose_Qty);
      }
    }
    const decimalCheck = qunty % 1;
    if (decimalCheck > 0) {
      const k = qunty.toString()
      const n = k.lastIndexOf('.');
      const result = k.substring(n + 1);
      const round = Number(Math.round(qunty)).toFixed(3);
      qunty = (Number(result) >= 995 && Number(result) <= 999 ) ? Number(round).toFixed(3) : qunty.toFixed(3);
    }
    const valQnty =  typeof(qunty) === "number" ? qunty.toFixed(3) : Number(qunty).toFixed(3);
    return this.numberWithCommas(valQnty);
  }
  GetAverageThickness(obj){
    const totalLooseQnty = this.GetGridTotalLooseQnty(obj);
    const totalCompacctedQnty = this.GetTotalQnt(obj.Item_Code);
    const arrTemp = $.grep(this.DetailList,function(val){return val.Item_Code === obj.Item_Code});
    let Thikness = 0;
    for(let i = 0; i < arrTemp.length; i++) {
      if(arrTemp[i].Hight_Thikness) {
        Thikness += Number(arrTemp[i].Hight_Thikness.replace(/,/g, ''));
      }
    }
    const avgThickness =(Number(Thikness) / (Number(totalCompacctedQnty.replace(/,/g, '')) / ( Number(totalLooseQnty.replace(/,/g, '')))));
    return avgThickness.toFixed(3) + ' Cum.'
  }
  getDetailList(item , itemFlag ,struct?) {
    let tempArr = [];
    if(itemFlag === 'Main' ){
      for(let i = 0; i < this.DetailList.length; i++) {
        if(this.DetailList[i].Item_Code === item) {
          if(struct) {
            if(this.DetailList[i].Structure_Details === struct) {
              tempArr.push(this.DetailList[i])
            }
          } else {
            tempArr.push(this.DetailList[i])
          }
        }
      }
    }
    if(itemFlag === 'Sub' ){
      for(let i = 0; i < this.DetailList.length; i++) {
        if(this.DetailList[i].bridge_item === item) {
          if(struct) {
            if(this.DetailList[i].Structure_Details === struct) {
              tempArr.push(this.DetailList[i])
            }
          } else {
            tempArr.push(this.DetailList[i])
          }
        }
      }
    }
    if(this.ObjJobData.Type_of_Work === 'Road Works'){
      let arr1 = [];
      for(let i = 0; i < tempArr.length; i++) {
        if(tempArr[i].calculation_type === 'Addition' && tempArr[i].Side === 'LHS') {
          arr1.push(tempArr[i])
        }
      }
      arr1.sort(function (vote1, vote2) {
        if (Number(vote1.Chanage_From)  < Number(vote2.Chanage_From)) {
            return -1;
        }
        if ( Number(vote1.Chanage_From)  >  Number(vote2.Chanage_From)){
              return 1;
        }
      });
      let arr2 = [];
      for(let i = 0; i < tempArr.length; i++) {
        if(tempArr[i].calculation_type === 'Addition' && tempArr[i].Side === 'RHS') {
          arr2.push(tempArr[i])
        }
      }
      arr2.sort(function (vote1, vote2) {
        if (Number(vote1.Chanage_From)  < Number(vote2.Chanage_From)) {
            return -1;
        }
        if (Number(vote1.Chanage_From)  >  Number(vote2.Chanage_From)){
              return 1;
        }
      });
      let arr3 = [];
      for(let i = 0; i < tempArr.length; i++) {
        if(tempArr[i].calculation_type === 'Addition' && tempArr[i].Side === 'Both Side') {
          arr3.push(tempArr[i])
        }
      }
      arr3.sort(function (vote1, vote2) {
        if (Number(vote1.Chanage_From)  < Number(vote2.Chanage_From)) {
            return -1;
        }
        if (Number(vote1.Chanage_From)  >  Number(vote2.Chanage_From)){
              return 1;
        }
      });

      let arr4 = [];
      for(let i = 0; i < tempArr.length; i++) {
        if(tempArr[i].calculation_type === 'Deduction' && tempArr[i].Side === 'LHS') {
          arr4.push(tempArr[i])
        }
      }
      arr4.sort(function (vote1, vote2) {
        if (Number(vote1.Chanage_At)  < Number(vote2.Chanage_At)) {
            return -1;
        }
        if ( Number(vote1.Chanage_At)  >  Number(vote2.Chanage_At)){
              return 1;
        }
      });
      let arr5 = [];
      for(let i = 0; i < tempArr.length; i++) {
        if(tempArr[i].calculation_type === 'Deduction' && tempArr[i].Side === 'RHS') {
          arr5.push(tempArr[i])
        }
      }
      arr5.sort(function (vote1, vote2) {
        if (Number(vote1.Chanage_At)  < Number(vote2.Chanage_At)) {
            return -1;
        }
        if (Number(vote1.Chanage_At)  >  Number(vote2.Chanage_At)){
              return 1;
        }
      });
      let arr6 = [];
      for(let i = 0; i < tempArr.length; i++) {
        if(tempArr[i].calculation_type === 'Deduction' && tempArr[i].Side === 'Both Side') {
          arr6.push(tempArr[i])
        }
      }
      arr6.sort(function (vote1, vote2) {
        if (Number(vote1.Chanage_At)  < Number(vote2.Chanage_At)) {
            return -1;
        }
        if (Number(vote1.Chanage_At)  >  Number(vote2.Chanage_At)){
              return 1;
        }
      });


      const array = arr1.concat(arr2);
      const array1 = array.concat(arr3);
      const array2 = array1.concat(arr4);
      const array3 = array2.concat(arr5);
      const array4 = array3.concat(arr6);
      return array4;
    }
    if((this.ObjJobData.Type_of_Work === 'Bridges and Culverts Works'|| this.ObjJobData.Type_of_Work === 'Road Works (Concrete)')) {
      let arr1 = [];
      for(let i = 0; i < tempArr.length; i++) {
        if(tempArr[i].calculation_type === 'Addition') {
          arr1.push(tempArr[i])
        }
      }
      let arr2 = [];
      for(let i = 0; i < tempArr.length; i++) {
        if(tempArr[i].calculation_type === 'Deduction') {
          arr2.push(tempArr[i])
        }
      }
      const array = arr1.concat(arr2);
      return array;
    }

  }
  getDetailListHp (item , itemFlag ,struct?) {
    let tempArr = [];
    if(itemFlag === 'Main' ){
      for(let i = 0; i < this.DetailList2.length; i++) {
        if(this.DetailList2[i].Item_Code === item) {
          if(struct) {
            if(this.DetailList2[i].Structure_Details === struct) {
              tempArr.push(this.DetailList2[i])
            }
          } else {
            tempArr.push(this.DetailList2[i])
          }
        }
      }
    }
    if(itemFlag === 'Sub' ){
      for(let i = 0; i < this.DetailList2.length; i++) {
        if(this.DetailList2[i].bridge_item === item) {
          if(struct) {
            if(this.DetailList2[i].Structure_Details === struct) {
              tempArr.push(this.DetailList2[i])
            }
          } else {
            tempArr.push(this.DetailList2[i])
          }
        }
      }
    }
    let arr1 = [];
    for(let i = 0; i < tempArr.length; i++) {
      if(tempArr[i].calculation_type === 'Addition') {
        arr1.push(tempArr[i])
      }
    }
    let arr2 = [];
    for(let i = 0; i < tempArr.length; i++) {
      if(tempArr[i].calculation_type === 'Deduction') {
        arr2.push(tempArr[i])
      }
    }
    const array = arr1.concat(arr2);
    array.sort(function (vote1, vote2) {
      if (Number(vote1.Dia)  < Number(vote2.Dia)) {
          return -1;
      }
      if ( Number(vote1.Dia)  >  Number(vote2.Dia)){
            return 1;
      }
    });
    const processed = [];
    for(let i = 0; i < array.length; i++) {
      if (processed.indexOf(array[i].Dia)<0) {
        array[i]['firstInArr'] = true;
        processed.push(array[i].Dia);
      } else{
        array[i]['firstInArr'] = false;
      }
    }
    return array;
  }
  getDetailListbAR (item , itemFlag ,struct?) {
    let tempArr = [];
    if(itemFlag === 'Main' ){
      for(let i = 0; i < this.DetailList3.length; i++) {
        if(this.DetailList3[i].Item_Code === item) {
          if(struct) {
            if(this.DetailList3[i].Structure_Details === struct) {
              tempArr.push(this.DetailList3[i])
            }
          } else {
            tempArr.push(this.DetailList3[i])
          }
        }
      }
    }
    if(itemFlag === 'Sub' ){
      for(let i = 0; i < this.DetailList3.length; i++) {
        if(this.DetailList3[i].bridge_item === item) {
          if(struct.Sl_No) {
            if(this.DetailList3[i].Structure_Details === struct.Sl_No) {
              tempArr.push(this.DetailList3[i])
            }
          } else {
            tempArr.push(this.DetailList3[i])
          }
        }
      }
    }
    let arr1 = [];
    for(let i = 0; i < tempArr.length; i++) {
      if(tempArr[i].calculation_type === 'Addition') {
        arr1.push(tempArr[i])
      }
    }
    let arr2 = [];
    for(let i = 0; i < tempArr.length; i++) {
      if(tempArr[i].calculation_type === 'Deduction') {
        arr2.push(tempArr[i])
      }
    }
    const array = arr1.concat(arr2);
    array.sort(function (vote1, vote2) {
      if (Number(vote1.Dia)  < Number(vote2.Dia)) {
          return -1;
      }
      if ( Number(vote1.Dia)  >  Number(vote2.Dia)){
            return 1;
      }
    });
    const processed = [];
    for(let i = 0; i < array.length; i++) {
      if (processed.indexOf(array[i].Dia)<0) {
        array[i]['firstInArr'] = true;
        processed.push(array[i].Dia);
      } else{
        array[i]['firstInArr'] = false;
      }
    }
    return array;
  }
  firstInGroup2(str: any){
    const arr  = this.DetailList3.findIndex(x => x.Dia === str);

  }
  getDiaWiseLength(obj) {
    const arr = $.grep(this.DetailList3,function(ob){return ob.Dia === obj.Dia && ob.Structure_Details === obj.Structure_Details});
    return arr;
  }
  getDiaWiseLength2(obj) {
    const arr = $.grep(this.DetailList2,function(ob){return ob.Dia === obj.Dia && ob.Structure_Details === obj.Structure_Details});
    return arr;
  }
  GetTotalDiaWise(obj) {
    const arr = $.grep(this.DetailList3,function(ob){return ob.Dia === obj.Dia && ob.Structure_Details === obj.Structure_Details});
    let count = 0;
    for(let i = 0; i < arr.length; i++) {
      if(arr[i].Total_Length_Rmt) {
        count += Number(arr[i].Total_Length_Rmt);
      }
    }
    const valQnty =  typeof(count) === "number" ? count.toFixed(3) : Number(count).toFixed(3);
    return this.numberWithCommas(valQnty);
  }
  GetTotalDiaWiseQnty(obj){
    const val = this.GetTotalDiaWise(obj)
    return val ? val.replace(/,/g, '') : 0;
  }
  GetTotalDia(obj) {
    const arr = $.grep(this.DetailList3,function(ob){return ob.Item_Code === obj.Item_Code && ob.Structure_Details === obj.Structure_Details});
    let count = 0;
    for(let i = 0; i < arr.length; i++) {
      if(arr[i].QNTY) {
        count += Number(arr[i].QNTY.replace(/,/g, ''));
      }
    }
    const valQnty =  typeof(count) === "number" ? count.toFixed(3) : Number(count).toFixed(3);
    return this.numberWithCommas(valQnty);
  }
  getTotalLength(obj,bridge?) {
    let arr = [];
    if(bridge) {
      arr = $.grep(this.DetailList2,function(ob){return ob.bridge_item === obj.bridge_item && ob.Structure_Details === obj.Structure_Details  && ob.Dia === obj.Dia});
    } else {
      arr = $.grep(this.DetailList2,function(ob){return ob.Item_Code === obj.Item_Code && ob.Structure_Details === obj.Structure_Details  && ob.Dia === obj.Dia});
    }
    let count = 0;
    for(let i = 0; i < arr.length; i++) {
      if(arr[i].Total_Length) {
        count += Number(arr[i].Total_Length.replace(/,/g, ''));
      }
    }
    const valQnty =  typeof(count) === "number" ? count.toFixed(3) : Number(count).toFixed(3);
    return this.numberWithCommas(valQnty);
  }
  DeleteSubItemIndex(item) {
   // this.DeleteDetailList(index);
  }
  DeleteDetailList(item){
    const index =  this.tempArr.findIndex(obj => obj.Grid_Index === item.Grid_Index);
    this.tempArr.splice(index, 1);
    this.DetailList =  this.tempArr;
    this.DistinctItemCode = [];
    this.DistinctSubItemCode = [];
    let processed = [];
    let processed2 = [];
    let processed3 = [];
    for(let i = 0; i < this.DetailList.length; i++) {
      if (processed.indexOf(this.DetailList[i].Item_Code)<0) {
        processed.push(this.DetailList[i].Item_Code);
        this.DistinctItemCode.push({
          Item_Code:this.DetailList[i].Item_Code,
          Sl_No:this.DetailList[i].Sl_No,
          ToggleFlag: true,
          Sub_Item_Flag : false,
          Sub_Item_List : []
        });
      }
    }
    for(let i = 0; i < this.DetailList.length; i++) {
      for(let k = 0; k < this.DistinctItemCode.length; k++) {
        if (this.DetailList[i].Item_Code ===  this.DistinctItemCode[k].Item_Code && this.DetailList[i].bridge_item ) {
          if(processed2.indexOf(this.DetailList[i].bridge_item)<0) {
            processed2.push(this.DetailList[i].bridge_item);
            this.DistinctItemCode[k].Sub_Item_Flag = true;
            this.DistinctItemCode[k].Sub_Item_List.push({
              bridge_item:this.DetailList[i].bridge_item,
              Sl_No:this.DetailList[i].bridge_item_Sl_No,
              ToggleFlag2: true,
            });
            this.DistinctItemCode[k].Sub_Item_List.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);
          }
        }
      }
    }
    if(this.ObjJobData.Type_of_Work === 'Bridges and Culverts Works' || this.ObjJobData.Type_of_Work === 'Road Works (Concrete)'){
      this.DistinctStructure = [];
      for(let i = 0; i < this.DetailList.length; i++) {
        let struc;
        if(this.ObjJobData.Type_of_Work === 'Bridges and Culverts Works') {
          struc = this.DetailList[i].structure_at_km +'/'+this.DetailList[i].structure_at_meter+' Km. - '+ this.DetailList[i].Structured_Type;
        }else {
          struc = this.DetailList[i].Structure_Name +' - '+this.DetailList[i].Chainage_From_km +'/'+ this.DetailList[i].Chainage_From_meter +' to '+this.DetailList[i].Chainage_To_km +'/'+ this.DetailList[i].Chainage_To_meter+' Km.';
        }
        if (processed3.indexOf(struc)<0) {
          processed3.push(struc);
          this.DistinctStructure.push({
            structure:struc,
            Sl_No:this.DetailList[i].Structure_Details,
            ToggleFlag: true,
            Sub_Item_Flag : false,
            Sub_dist_Item: [],
            Sub_Item_List : []
          });
        }
        // if (this.DetailList[i].Structure_Details ===   this.ObjJobData.Structure_Details ) {
        //   if (processed.indexOf(this.DetailList[i].Item_Code)<0) {
        //     processed.push(this.DetailList[i].Item_Code);
        //     for(let p = 0; p < this.DistinctStructure.length; p++) {
        //       if(this.DistinctStructure[p].Sl_No === this.ObjJobData.Structure_Details){
        //         this.DistinctStructure[p].Sub_dist_Item.push({
        //           Item_Code:this.DetailList[i].Item_Code,
        //           Sl_No:this.DetailList[i].Structure_Details,
        //           ToggleFlag: true,
        //           Sub_Item_Flag : false,
        //           Sub_Item_List : []
        //         })
        //       }
        //     }
        //   }
        // }
      }

      for(let i = 0; i < this.DistinctStructure.length; i++) {
        const StructureDetails = this.DistinctStructure[i].Sl_No;
        const tempArr1 = $.grep(this.DetailList,function(obj) { return obj.Structure_Details === StructureDetails});
        if(tempArr1.length) {
          processed = [];
          for(let k = 0; k < tempArr1.length; k++) {
            if (processed.indexOf(tempArr1[k].Item_Code)<0) {
              processed.push(tempArr1[k].Item_Code);
              this.DistinctStructure[i].Sub_Item_Flag = true;
              this.DistinctStructure[i].Sub_Item_List.push({
                Item_Code:tempArr1[k].Item_Code,
                Sl_No:tempArr1[k].Structure_Details,
                Item_Code_Sl_No:tempArr1[k].Sl_No,
                ToggleFlag: true,
                Sub_Item_Flag : false,
                Sub_Item_List : []
              });
              this.DistinctStructure[i].Sub_Item_List.sort((a, b) => (Number(a.Item_Code_Sl_No) > Number(b.Item_Code_Sl_No)) ? 1 : -1);

            }

          }
        }
      }
      for(let i = 0; i < this.DistinctStructure.length; i++) {
        for(let k = 0; k < this.DistinctStructure[i].Sub_Item_List.length; k++) {
          const StructureDetails =  this.DistinctStructure[i].Sub_Item_List[k].Sl_No;
          const ItemCode =  this.DistinctStructure[i].Sub_Item_List[k].Item_Code;
          const tempArr1 = $.grep(this.DetailList,function(obj) { return obj.Structure_Details === StructureDetails && obj.Item_Code === ItemCode });
          if(tempArr1.length) {
            processed2 = [];
            for(let p = 0; p < tempArr1.length; p++) {
              if (tempArr1[p].bridge_item ) {
                if(processed2.indexOf(tempArr1[p].bridge_item)<0) {
                  processed2.push(tempArr1[p].bridge_item);
                  this.DistinctStructure[i].Sub_Item_List[k].Sub_Item_Flag = true;
                  this.DistinctStructure[i].Sub_Item_List[k].Sub_Item_List.push({
                    bridge_item:tempArr1[p].bridge_item,
                    Sl_No:tempArr1[p].bridge_item_Sl_No,
                    ToggleFlag2: true,
                  });
                  this.DistinctStructure[i].Sub_Item_List[k].Sub_Item_List.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);
                }
              }
            }
          }

        }
      }
    }
    this.DistinctStructure.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);
    this.DistinctItemCode.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);
    this.updateRowGroupMetaData();
    this.getAllQtyTrip();
  }
  DeleteDetailListHp(item){
    const index =  this.tempArr2.findIndex(obj => obj.Grid_Index === item.Grid_Index);
    this.tempArr2.splice(index, 1);
    this.DetailList2 =  this.tempArr2;
    this.DistinctItemCode2 = [];
    this.DistinctSubItemCode2 = [];
    this.DistinctStructure2 = [];
    let processed = [];
    let processed2 = [];
    let processed3 = [];
    this.DistinctStructure2 = [];
    for(let i = 0; i < this.DetailList2.length; i++) {
      let struc;
      if(this.ObjJobData.Type_of_Work === 'Bridges and Culverts Works'|| this.ObjJobData.Type_of_Work === 'Road Works (Concrete)') {
        struc = this.DetailList2[i].structure_at_km +'/'+this.DetailList2[i].structure_at_meter+' Km. - '+ this.DetailList2[i].Structured_Type;
      }else {
        struc = this.DetailList2[i].Structure_Name +' - '+this.DetailList2[i].Chainage_From_km +'/'+ this.DetailList2[i].Chainage_From_meter +' to '+this.DetailList2[i].Chainage_To_km +'/'+ this.DetailList2[i].Chainage_To_meter+' Km.';
      }
      if (processed3.indexOf(struc)<0) {
        processed3.push(struc);
        this.DistinctStructure2.push({
          structure:struc,
          Sl_No:this.DetailList2[i].Structure_Details,
          ToggleFlag: true,
          Sub_Item_Flag : false,
          Sub_dist_Item: [],
          Sub_Item_List : []
        });
      }

    }

    for(let i = 0; i < this.DistinctStructure2.length; i++) {
      const StructureDetails = this.DistinctStructure2[i].Sl_No;
      const tempArr1 = $.grep(this.DetailList2,function(obj) { return obj.Structure_Details === StructureDetails});
      if(tempArr1.length) {
        processed = [];
        for(let k = 0; k < tempArr1.length; k++) {
          if (processed.indexOf(tempArr1[k].Item_Code)<0) {
            processed.push(tempArr1[k].Item_Code);
            this.DistinctStructure2[i].Sub_Item_Flag = true;
            this.DistinctStructure2[i].Sub_Item_List.push({
              Item_Code:tempArr1[k].Item_Code,
              Sl_No:tempArr1[k].Structure_Details,
              Item_Code_Sl_No:tempArr1[k].Sl_No,
              ToggleFlag: true,
              Sub_Item_Flag : false,
              Sub_Item_List : []
            });
            this.DistinctStructure2[i].Sub_Item_List.sort((a, b) => (Number(a.Item_Code_Sl_No) > Number(b.Item_Code_Sl_No)) ? 1 : -1);
          }

        }
      }
    }
    for(let i = 0; i < this.DistinctStructure2.length; i++) {
      for(let k = 0; k < this.DistinctStructure2[i].Sub_Item_List.length; k++) {
        const StructureDetails =  this.DistinctStructure2[i].Sub_Item_List[k].Sl_No;
        const ItemCode =  this.DistinctStructure2[i].Sub_Item_List[k].Item_Code;
        const tempArr1 = $.grep(this.DetailList2,function(obj) { return obj.Structure_Details === StructureDetails && obj.Item_Code === ItemCode });
        if(tempArr1.length) {
          processed2 = [];
          for(let p = 0; p < tempArr1.length; p++) {
            if (tempArr1[p].bridge_item ) {
              if(processed2.indexOf(tempArr1[p].bridge_item)<0) {
                processed2.push(tempArr1[p].bridge_item);
                this.DistinctStructure2[i].Sub_Item_List[k].Sub_Item_Flag = true;
                this.DistinctStructure2[i].Sub_Item_List[k].Sub_Item_List.push({
                  bridge_item:tempArr1[p].bridge_item,
                  Sl_No:tempArr1[p].bridge_item_Sl_No,
                  ToggleFlag2: true,
                });
                this.DistinctStructure2[i].Sub_Item_List[k].Sub_Item_List.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);
              }
            }
          }
        }

      }
    }
    this.DistinctStructure2.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);
    this.DistinctItemCode2.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);

  }
  DeleteDetailListBAR(item){
    const index =  this.tempArr3.findIndex(obj => obj.Grid_Index === item.Grid_Index);
    this.tempArr3.splice(index, 1);
    this.DetailList3 =  this.tempArr3;
    this.DistinctItemCode3 = [];
    this.DistinctSubItemCode3 = [];
    this.DistinctStructure3 = [];
    let processed = [];
    let processed2 = [];
    let processed3 = [];
    this.DistinctStructure3 = [];
    for(let i = 0; i < this.DetailList3.length; i++) {
      let struc;
      if(this.ObjJobData.Type_of_Work === 'Bridges and Culverts Works'|| this.ObjJobData.Type_of_Work === 'Road Works (Concrete)') {
        struc = this.DetailList3[i].structure_at_km +'/'+this.DetailList3[i].structure_at_meter+' Km. - '+ this.DetailList3[i].Structured_Type;
      }else {
        struc = this.DetailList3[i].Structure_Name +' - '+this.DetailList3[i].Chainage_From_km +'/'+ this.DetailList3[i].Chainage_From_meter +' to '+this.DetailList3[i].Chainage_To_km +'/'+ this.DetailList3[i].Chainage_To_meter+' Km.';
      }
      if (processed3.indexOf(struc)<0) {
        processed3.push(struc);
        this.DistinctStructure3.push({
          structure:struc,
          Sl_No:this.DetailList3[i].Structure_Details,
          ToggleFlag: true,
          Sub_Item_Flag : false,
          Sub_dist_Item: [],
          Sub_Item_List : []
        });
      }

    }

    for(let i = 0; i < this.DistinctStructure3.length; i++) {
      const StructureDetails = this.DistinctStructure3[i].Sl_No;
      const tempArr1 = $.grep(this.DetailList3,function(obj) { return obj.Structure_Details === StructureDetails});
      if(tempArr1.length) {
        processed = [];
        for(let k = 0; k < tempArr1.length; k++) {
          if (processed.indexOf(tempArr1[k].Item_Code)<0) {
            processed.push(tempArr1[k].Item_Code);
            this.DistinctStructure3[i].Sub_Item_Flag = true;
            this.DistinctStructure3[i].Sub_Item_List.push({
              Item_Code:tempArr1[k].Item_Code,
              Sl_No:tempArr1[k].Structure_Details,
              Item_Code_Sl_No:tempArr1[k].Sl_No,
              ToggleFlag: true,
              Sub_Item_Flag : false,
              Sub_Item_List : []
            });
            this.DistinctStructure3[i].Sub_Item_List.sort((a, b) => (Number(a.Item_Code_Sl_No) > Number(b.Item_Code_Sl_No)) ? 1 : -1);
          }

        }
      }
    }
    for(let i = 0; i < this.DistinctStructure3.length; i++) {
      for(let k = 0; k < this.DistinctStructure3[i].Sub_Item_List.length; k++) {
        const StructureDetails =  this.DistinctStructure3[i].Sub_Item_List[k].Sl_No;
        const ItemCode =  this.DistinctStructure3[i].Sub_Item_List[k].Item_Code;
        const tempArr1 = $.grep(this.DetailList3,function(obj) { return obj.Structure_Details === StructureDetails && obj.Item_Code === ItemCode });
        if(tempArr1.length) {
          processed2 = [];
          for(let p = 0; p < tempArr1.length; p++) {
            if (tempArr1[p].bridge_item ) {
              if(processed2.indexOf(tempArr1[p].bridge_item)<0) {
                processed2.push(tempArr1[p].bridge_item);
                this.DistinctStructure3[i].Sub_Item_List[k].Sub_Item_Flag = true;
                this.DistinctStructure3[i].Sub_Item_List[k].Sub_Item_List.push({
                  bridge_item:tempArr1[p].bridge_item,
                  Sl_No:tempArr1[p].bridge_item_Sl_No,
                  ToggleFlag2: true,
                });
                this.DistinctStructure3[i].Sub_Item_List[k].Sub_Item_List.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);
              }
            }
          }
        }

      }
    }

    this.DistinctStructure3.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);
    this.DistinctItemCode3.sort((a, b) => (Number(a.Sl_No) > Number(b.Sl_No)) ? 1 : -1);

  }
  AddBridgeDetailList(valid) {

  }
  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.DetailList) {
        for (let i = 0; i < this.DetailList.length; i++) {
            let rowData = this.DetailList[i];
            let brand = rowData.Item_Code;
            if (i == 0) {
                this.rowGroupMetadata[brand] = { index: 0, size: 1 };
            }
            else {
                let previousRowData = this.DetailList[i - 1];
                let previousRowGroup = previousRowData.Item_Code;
                if (brand === previousRowGroup)
                    this.rowGroupMetadata[brand].size++;
                else
                    this.rowGroupMetadata[brand] = { index: i, size: 1 };
            }
        }
    }
  }

  getTripByItemCode(item) {
    const arrTemp1 = $.grep(this.DetailList,function(val){return val.Item_Code === item});
    let arrTemp = [];
    if(this.ObjJobData.Type_of_Work ==='Bridges and Culverts Works') {
      const arrTemp2 = $.grep(this.DetailList2,function(val){return val.Item_Code === item});
      const arrTemp3 = $.grep(this.DetailList3,function(val){return val.Item_Code === item});
      const arr = arrTemp1.concat(arrTemp2);
      arrTemp = arr.concat(arrTemp3);
    } else {
      arrTemp = arrTemp1;
    }
    let tempArr = [];
    for(let i = 0; i < arrTemp.length; i++) {
      if(arrTemp[i].Trip_Arr.length) {
        tempArr =  arrTemp[i].Trip_Arr;
        break;
      } else{
        tempArr = [];
      }
    }
    tempArr.sort(function(a, b){
      return a.Trip_By === b.Trip_By ? 0 : +(a.Trip_By > b.Trip_By) || -1;
    });
    return tempArr.length ? tempArr : [];
  }
  viewTripTempArrFromDetails (obj) {
    this.TripTempArrFromDetails = []
      const arrTemp = $.grep(this.DetailList,function(val){return val.Item_Code === obj.Item_Code});
      let tempArr = [];
      for(let i = 0; i < arrTemp.length; i++) {
        if(arrTemp[i].Trip_Arr.length) {
          tempArr =  arrTemp[i].Trip_Arr;
          break;
        } else{
          tempArr = [];
        }
      }
      if(tempArr.length) {
        this.TripTempArrFromDetails = tempArr;
        this.TripModal = true;
      } else {
        this.TripTempArrFromDetails = [];
        this.TripModal = false;
      }
  }
  viewTripTempArrFromDetails2 (obj) {
    this.TripTempArrFromDetails = []
      const arrTemp = $.grep(this.DetailList2,function(val){return val.Item_Code === obj.Item_Code});
      let tempArr = [];
      for(let i = 0; i < arrTemp.length; i++) {
        if(arrTemp[i].Trip_Arr.length) {
          tempArr =  arrTemp[i].Trip_Arr;
          break;
        } else{
          tempArr = [];
        }
      }
      if(tempArr.length) {
        this.TripTempArrFromDetails = tempArr;
        this.TripModal = true;
      } else {
        this.TripTempArrFromDetails = [];
        this.TripModal = false;
      }
  }

  SaveDailyEntry(valid) {
    this.DailyJobFormFormSubmitted = true;
    if(valid) {
      const obj = {
        'CIVIL_DP_RW_String' : JSON.stringify(this.DetailList),
        'CIVIL_DP_RW_Trip_String': JSON.stringify(this.TripTempArr)
      }
      const UrlAddress = "/BL_Txn_Civil_Daily_Job/Insert_CIVIL_DP_RW";
      this.$http.post(UrlAddress, obj).subscribe((data: any) => {
        if (data.success) {
          console.group("Compacct V2");
          console.log("%c  Entry Updated:", "color:green;");
          console.log("/BL_Txn_Civil_Daily_Job/Insert_CIVIL_DP_RW");
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "",
            detail: "Succesfully Entry Updated"
          });
          this.Spinner = false;
          this.DailyJobFormFormSubmitted = false;
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

  // TRIP BY
  ToggleTripBy(){
    this.TripBySubmitted = false;
    this.TripByName = undefined;
    if(this.ObjJobData.Type_of_Work){
      this.TripByModal = true;

    }
   }
  CreateTripBy(valid){
  this.TripBySubmitted = true;
  if(valid) {
      this.Spinner = true;
      const UrlAddress = "/BL_CRM_Txn_Enq_Tender/Create_Tender_BOQ_Trip_By";
      const obj = {
        Type : this.ObjJobData.Type_of_Work,
        Trip_By : this.TripByName
       };
      this.$http.post(UrlAddress, obj).subscribe((data: any) => {
        console.log(data)
      if (data.success) {
        // if (this.ObjTender.Foot_Fall_ID) {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "",
            detail: "Succesfully Trip By Created"
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
        this.GetTripByList(this.ObjJobData.Type_of_Work);
        this.TripBySubmitted = false;
        this.TripByName = undefined;
        this.TripByModal = false;
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
  ToggleType(){
    this.TypeSubmitted = false;
    this.TypeName = undefined;
    if(this.ObjJobData.Type_of_Work){
      this.TypeModal = true;

    }
   }
  CreateType(valid){
  this.TypeSubmitted = true;
  if(valid) {
      this.Spinner = true;
      const UrlAddress = "/BL_Txn_Civil_Daily_Job/Create_Structured_Type";
      const obj = {
        Structured_Type : this.TypeName
       };
      this.$http.post(UrlAddress, obj).subscribe((data: any) => {
        console.log(data)
      if (data.success) {
        // if (this.ObjTender.Foot_Fall_ID) {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "",
            detail: "Succesfully Type Created"
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
        this.GetBridgeType();
        this.TypeSubmitted = false;
        this.TypeName = undefined;
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
  ToggleLooseQnty(){
    this.LooseQntySubmitted = false;
    this.LooseQntyName = undefined;
    if(this.ObjJobData.Type_of_Work){
      this.LooseQntyModal = true;
    }
   }
  CreateLooseQnty(valid){
  this.LooseQntySubmitted = true;
  if(valid) {
      this.Spinner = true;
      const UrlAddress = "/BL_Txn_Civil_Daily_Job/Create_Loose_Qty_Per_Trip";
      const obj = {
        Loose_Type:this.ObjJobData.Type_of_Work,
        Loose_Qty_Per_Trip : this.LooseQntyName
       };
      this.$http.post(UrlAddress, obj).subscribe((data: any) => {
        console.log(data)
      if (data.success) {
        // if (this.ObjTender.Foot_Fall_ID) {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "",
            detail: "Succesfully Loose Qnty. Created"
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
        this.GetLooseQty(this.ObjJobData.Type_of_Work);
        this.LooseQntySubmitted = false;
        this.LooseQntyName = undefined;
        this.LooseQntyModal = false;
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
  ToggleStructureType(){
    this.StructureFormSubmitted = false;
    this.StructureTypeModal = false;
    this.StructureTypeModal2 = false;
    this.StructureFormSubmitted2 = false;
    this.ObjJobData.Party = 'OCPL';
    if(this.ObjJobData.Type_of_Work === 'Bridges and Culverts Works') {
      this.ObjJobData.structure_at_km = undefined;
      this.ObjJobData.structure_at_meter = undefined;
      this.ObjJobData.Structured_Type = undefined;
      this.ObjJobData.Structured_Breadth = undefined;
      this.ObjJobData.Structured_Height = undefined;
      this.ObjJobData.Structured_Length = undefined;
      this.ObjJobData.structure_at_km = undefined;
      this.ObjJobData.No_of_Span =  undefined;
      this.ObjJobData.Structure_Details = undefined;
      this.StructureTypeModal = true;

    }
    if(this.ObjJobData.Type_of_Work === 'Road Works (Concrete)') {
      this.ObjJobData.Chainage_From_km = undefined;
      this.ObjJobData.Chainage_From_meter = undefined;
      this.ObjJobData.Chainage_To_km = undefined;
      this.ObjJobData.Chainage_To_meter = undefined;
      this.ObjJobData.Structure_Name = undefined;
      this.ObjJobData.Structure_Side = undefined;
      this.StructureTypeModal2 = true;
    }
   }
  CreateStructureType(valid){
    this.StructureFormSubmitted = true;
    if(valid) {
        this.Spinner = true;
        // const UrlAddress = `/BL_Txn_Civil_Daily_Job/Create_Structured_Details?Party=`+this.ObjJobData.Party+`&structure_at_km=`+this.ObjJobData.structure_at_km+
        // `&structure_at_meter=`+this.ObjJobData.structure_at_meter+`&Structured_Type=`+this.ObjJobData.Structured_Type+`&structure_at=`+this.ObjJobData.structure_at+`&Structured_Breadth=`+this.ObjJobData.Structured_Breadth+
        // `&Structured_Height=`+this.ObjJobData.Structured_Height+`&Structured_Length=`+this.ObjJobData.Structured_Length;
        const UrlAddress = '/BL_Txn_Civil_Daily_Job/Create_Structured_Details';
        const obj = {
          Party : this.ObjJobData.Party,
          structure_at_km:this.ObjJobData.structure_at_km,
          structure_at: this.ObjJobData.structure_at_km +'.'+this.ObjJobData.structure_at_meter,
          No_of_Span: this.ObjJobData.No_of_Span,
          structure_at_meter:this.ObjJobData.structure_at_meter,
          Structured_Type:this.ObjJobData.Structured_Type,
          Structured_Breadth:this.ObjJobData.Structured_Breadth,
          Structured_Height:this.ObjJobData.Structured_Height,
          Structured_Length:this.ObjJobData.Structured_Length,
          Project_ID: this.ProjectID

          };
        this.$http.post(UrlAddress, obj).subscribe((data: any) => {
          console.log(data)
        if (data.success) {
          // if (this.ObjTender.Foot_Fall_ID) {
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "",
              detail: "Succesfully Structure Type Created"
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
          this.GetStructureTypeDetail();
          this.ObjJobData.Party = undefined;
          this.ObjJobData.structure_at_km = undefined;
          this.ObjJobData.structure_at_meter = undefined;
          this.ObjJobData.Structured_Type = undefined;
          this.ObjJobData.Structured_Breadth = undefined;
          this.ObjJobData.Structured_Height = undefined;
          this.ObjJobData.Structured_Length = undefined;
          this.ObjJobData.structure_at_km = undefined;
          this.ObjJobData.No_of_Span =  undefined;
          this.StructureTypeModal = false;
          this.StructureFormSubmitted = false;
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
  CreateStructureType2(valid){
    this.StructureFormSubmitted2 = true;
    const chanageValid = this.CheckIFStrucChainageExist();
    if(valid && chanageValid) {
        this.Spinner = true;
        // const UrlAddress = `/BL_Txn_Civil_Daily_Job/Create_Structured_Details?Party=`+this.ObjJobData.Party+`&structure_at_km=`+this.ObjJobData.structure_at_km+
        // `&structure_at_meter=`+this.ObjJobData.structure_at_meter+`&Structured_Type=`+this.ObjJobData.Structured_Type+`&structure_at=`+this.ObjJobData.structure_at+`&Structured_Breadth=`+this.ObjJobData.Structured_Breadth+
        // `&Structured_Height=`+this.ObjJobData.Structured_Height+`&Structured_Length=`+this.ObjJobData.Structured_Length;
        const UrlAddress = '/BL_Txn_Civil_Daily_Job/Create_Structured_Details_Concrete';
        const obj = {
          Party : this.ObjJobData.Party,
          Chainage_From_km :this.ObjJobData.Chainage_From_km,
          Chainage_From_meter : this.ObjJobData.Chainage_From_meter,
          Chainage_From  : this.ObjJobData.Chainage_From_km +'.'+ this.ObjJobData.Chainage_From_meter,
          Chainage_To_km : this.ObjJobData.Chainage_To_km,
          Chainage_To_meter:this.ObjJobData.Chainage_To_meter,
          Chainage_To :this.ObjJobData.Chainage_To_km +'.'+ this.ObjJobData.Chainage_To_meter,
          Structure_Name :this.ObjJobData.Structure_Name,
          Structure_Side: this.ObjJobData.Structure_Side,
          Project_ID: this.ProjectID
          };
        this.$http.post(UrlAddress, obj).subscribe((data: any) => {
          console.log(data)
        if (data.success) {
          // if (this.ObjTender.Foot_Fall_ID) {
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "",
              detail: "Succesfully Structure Type Created"
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
          this.GetStructureTypeDetail2();
          this.ObjJobData.Party = undefined;
          this.ObjJobData.Chainage_From_km = undefined;
          this.ObjJobData.Chainage_From_meter = undefined;
          this.ObjJobData.Chainage_To_km = undefined;
          this.ObjJobData.Chainage_To_meter = undefined;
          this.ObjJobData.Structure_Name = undefined;
          this.ObjJobData.Structure_Side = undefined;
          this.StructureTypeModal2 = false;
          this.StructureFormSubmitted2 = false;
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
    } else {
      if(!chanageValid) {
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          life: 5000,
          summary: "Chainage Error Message",
          detail: this.ChainageValidMgs
        });
      }
    }
  }
  CheckIFStrucChainageExist(){
    let flag = true;
    if(this.StructureTypeDetailList2.length){
      let sameFlag = false;
      this.ChainageValidMgs = '';
      const Chanage_From = Number(this.ObjJobData.Chainage_From_km) + '.' + this.ObjJobData.Chainage_From_meter;
      const Chanage_To = Number(this.ObjJobData.Chainage_To_km) + '.' + this.ObjJobData.Chainage_To_meter;
      const Chanage_At = Number(this.ObjJobData.Chanage_At_KM) + '.' + this.ObjJobData.Chanage_At_M;
      for(let i = 0; i < this.StructureTypeDetailList2.length; i++) {
        if(this.StructureTypeDetailList2[i].Structure_Side === this.ObjJobData.Structure_Side){
          const checkFrom = this.isBetween(Number(Chanage_From),Number(this.StructureTypeDetailList2[i].Chainage_From),Number(this.StructureTypeDetailList2[i].Chainage_To),'Tovalid');
          const checkTo = this.isBetween(Number(Chanage_To),Number(this.StructureTypeDetailList2[i].Chainage_To),Number(this.StructureTypeDetailList2[i].Chainage_From),'Fromvalid');
          if(checkFrom || checkTo) {
            console.log('found between');
            const Tostr =  'Chainage To : ' + this.StructureTypeDetailList2[i].Chainage_To + ' of Side ' + this.ObjJobData.Structure_Side + ' Already Exits.';
            const Fromstr =  'Chainage From : '+ this.StructureTypeDetailList2[i].Chainage_From + ' of Side ' + this.ObjJobData.Structure_Side + ' Already Exits.';
            const Allstr =  'Chainage From : '+ this.StructureTypeDetailList2[i].Chainage_From + ' | Chainage To : ' + this.StructureTypeDetailList2[i].Chainage_To +' of Side ' + this.ObjJobData.Structure_Side + ' Already Exits.';
            this.ChainageValidMgs = checkFrom && checkTo ? Allstr : checkFrom ? Fromstr : checkTo ? Tostr: '';
            flag = false;
              break;
          } else {
            const checkMax = Number(Chanage_From) < Number(this.StructureTypeDetailList2[i].Chainage_From);
            const checkMaxTo = checkMax ? Number(Chanage_To) > Number(this.StructureTypeDetailList2[i].Chainage_From) : false;
            if(checkMaxTo) {
              console.log('found between')
              const Tostr =  'Chainage To : ' + this.StructureTypeDetailList2[i].Chainage_To + ' of Side ' + this.ObjJobData.Structure_Side + ' Already Exits.';
            const Fromstr =  'Chainage From : '+ this.StructureTypeDetailList2[i].Chainage_From + ' of Side ' + this.ObjJobData.Structure_Side + ' Already Exits.';
            const Allstr =  'Chainage From : '+ this.StructureTypeDetailList2[i].Chainage_From + ' | Chainage To : ' + this.StructureTypeDetailList2[i].Chainage_To +' of Side ' + this.ObjJobData.Structure_Side + ' Already Exits.';
            this.ChainageValidMgs = checkFrom && checkTo ? Allstr : checkFrom ? Fromstr : checkTo ? Tostr: '';
              flag = false;
              break;
            } else{
              flag =  true;
            }
            }
          }
      }
      if(this.ObjJobData.Chainage_From_km || this.ObjJobData.Chainage_To_km || this.ObjJobData.Chainage_From_meter || this.ObjJobData.Chainage_To_meter) {
        if(Chanage_From === Chanage_To ) {
          this.ChainageValidMgs = 'Both Chainage From '+Chanage_From+ ' and Chainage To '+Chanage_To+ ' are same.';
          sameFlag = true;
          flag = false;
        }
      }

      return  ( this.StructureTypeDetailList2.length ||  sameFlag ) ? flag : true;
    } else {
      return true;
    }
  }
  ToggleParty(){
    this.PartySubmitted = false;
    this.PartyName = undefined;
      this.PartyModal = true;
   }
  CreateParty(valid){
  this.PartySubmitted = true;
  if(valid) {
      this.Spinner = true;
      const UrlAddress = "/BL_Txn_Civil_Daily_Job/Create_Party";
      const obj = {
        Party : this.PartyName
       };
      this.$http.post(UrlAddress, obj).subscribe((data: any) => {
        console.log(data)
      if (data.success) {
        // if (this.ObjTender.Foot_Fall_ID) {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "",
            detail: "Succesfully Party Created"
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
        this.GetParty();
        this.PartySubmitted = false;
        this.PartyName = undefined;
        this.PartyModal = false;
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
  ToggleReceivedFrom(){
    this.ReceivedFromSubmitted = false;
    this.ReceivedFromName = undefined;
    if(this.ObjJobData.Type_of_Work){
      this.ReceivedFromModal = true;
    }
   }
  CreateReceivedFrom(valid){
  this.ReceivedFromSubmitted = true;
  if(valid) {
      this.Spinner = true;
      const UrlAddress = "/BL_Txn_Civil_Daily_Job/Create_Received_From";
      const obj = {
        Type_of_Work : this.ObjJobData.Type_of_Work,
        Received_From : this.ReceivedFromName
       };
      this.$http.post(UrlAddress, obj).subscribe((data: any) => {
        console.log(data)
      if (data.success) {
        // if (this.ObjTender.Foot_Fall_ID) {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "",
            detail: "Succesfully Received From Created"
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
        this.GetReceivedFrom(this.ObjJobData.Type_of_Work);
        this.ReceivedFromSubmitted = false;
        this.ReceivedFromName = undefined;
        this.ReceivedFromModal = false;
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
  ToggleStructureName(){
    this.StructureNameSubmitted = false;
    this.StructureName = undefined;
    if(this.ObjJobData.Type_of_Work){
      this.StructureNameModal = true;
    }
   }
   CreateStructureName(valid){
    this.StructureNameSubmitted = true;
    if(valid) {
        this.Spinner = true;
        const UrlAddress = "/BL_Txn_Civil_Daily_Job/Create_Structured_Name";
        const obj = {
          Structure_Name  : this.StructureName,
          Work_Type : this.ObjJobData.Type_of_Work
        };
        this.$http.post(UrlAddress, obj).subscribe((data: any) => {
          console.log(data)
        if (data.success) {
          // if (this.ObjTender.Foot_Fall_ID) {
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "",
              detail: "Succesfully Structure Name Created"
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
          this.GetStructureName(this.ObjJobData.Type_of_Work);
          this.StructureNameSubmitted = false;
          this.StructureName = undefined;
          this.StructureNameModal = false;
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
  ShowStructureDetais(obj) {
    this.StructureDetailsObj['Party'] = undefined;
    this.StructureDetailsObj['structure_at_km'] = undefined;
    this.StructureDetailsObj['structure_at'] = undefined;
    this.StructureDetailsObj['No_of_Span'] = undefined;
    this.StructureDetailsObj['structure_at_meter'] = undefined;
    this.StructureDetailsObj['Structured_Type'] = undefined;
    this.StructureDetailsObj['Structured_Breadth'] = undefined;
    this.StructureDetailsObj['Structured_Height'] = undefined;
    this.StructureDetailsObj['Structured_Length'] = undefined;
    this.StructureDetailsObj['Chainage_From_km'] =  undefined;
    this.StructureDetailsObj['Chainage_From_meter'] =  undefined;
    this.StructureDetailsObj['Chainage_From'] =  undefined;
    this.StructureDetailsObj['Chainage_To_km'] =  undefined;
    this.StructureDetailsObj['Chainage_To_meter'] =  undefined;
    this.StructureDetailsObj['Chainage_To'] =  undefined;
    this.StructureDetailsObj['Structure_Name'] =  undefined;
    this.StructureDetailsObj['Structure_Side'] = undefined;
    this.StructureDetailsObj['flag'] =  undefined;
    if(obj.Type_of_Work === 'Bridges and Culverts Works') {
      this.StructureDetailsObj['flag'] = 'Bridges';
      this.StructureDetailsObj['Party'] = obj.Party;
      this.StructureDetailsObj['structure_at_km'] =  obj.structure_at_km;
      this.StructureDetailsObj['structure_at'] =  obj.structure_at;
      this.StructureDetailsObj['No_of_Span'] =  obj.No_of_Span;
      this.StructureDetailsObj['structure_at_meter'] =  obj.structure_at_meter;
      this.StructureDetailsObj['Structured_Type'] =  obj.Structured_Type;
      this.StructureDetailsObj['Structured_Breadth'] =  obj.Structured_Breadth;
      this.StructureDetailsObj['Structured_Height'] =  obj.Structured_Height;
      this.StructureDetailsObj['Structured_Length'] =  obj.Structured_Length;
      this.StructureDetailsModalFlag = true;
    }
    if(obj.Type_of_Work === 'Road Works (Concrete)') {
      this.StructureDetailsObj['flag'] = 'Concrete';
      this.StructureDetailsObj['Party'] = obj.Party;
      this.StructureDetailsObj['Chainage_From_km'] =  obj.Chainage_From_km;
      this.StructureDetailsObj['Chainage_From_meter'] =  obj.Chainage_From_meter;
      this.StructureDetailsObj['Chainage_From'] =  obj.Chainage_From;
      this.StructureDetailsObj['Chainage_To_km'] =  obj.Chainage_To_km;
      this.StructureDetailsObj['Chainage_To_meter'] =  obj.Chainage_To_meter;
      this.StructureDetailsObj['Chainage_To'] =  obj.Chainage_To;
      this.StructureDetailsObj['Structure_Name'] =  obj.Structure_Name;
      this.StructureDetailsObj['Structure_Side'] =  obj.Structure_Side;
      this.StructureDetailsModalFlag = true;
      }
  }
   // Clear & Tab
   TabClick(e) {
    this.tabIndexToView = e.index;
    this.buttonname = "Create";
   // this.clearData();
  }
  clearData() {
    this.Spinner = false;
   // this.BOQData = [];
   //  this.ItemList =[];
    this.DailyJobFormFormSubmitted = false;
    this.TripByFormSubmitted = false;
    this.DetailList = [];
    this.TripTempArr = [];
    this.ObjJobData = new JobData();
    this.JobDate = new Date();
    this.SelectedItemCode = undefined;
  }
  clearAddDetails () {
    const obj = this.ObjJobData;
    this.ObjJobData = new JobData();
    this.ObjJobData.Date = obj.Date;
    this.ObjJobData.Type_of_Work = obj.Type_of_Work;
    this.ObjJobData.calculation_type = obj.calculation_type;
    this.ObjJobData.Item_Code = obj.Item_Code;
    this.ObjJobData.UNIT =  obj.UNIT;
    this.ObjJobData.Sl_No =  obj.Sl_No;
    this.ObjJobData.BOQ_Txn_ID = obj.BOQ_Txn_ID;
    this.SelectedItemCode =  obj.Item_Code;
    this.ObjJobData.Structure_Details = obj.Structure_Details ? obj.Structure_Details :undefined;
    this.ChangeStructureDetails(this.ObjJobData.Structure_Details);
    this.JobDate = new Date(obj.Date);
    this.ObjJobData.Type_of_Work = obj.Type_of_Work;
    this.TripTempArr = this.ObjJobData.UNIT === 'Cum' ? this.getTripByItemCode(obj.Item_Code) : [];
    this.DailyJobFormFormSubmitted = false;
    this.TripByFormSubmitted = false;

    this.ObjJobData.Chanage_From_KM = undefined;
    this.ObjJobData.Chanage_From_M = undefined;
    this.ObjJobData.Chanage_To_KM = undefined;
    this.ObjJobData.Chanage_To_M = undefined;
    this.ObjJobData.Chanage_At_KM = undefined;
    this.ObjJobData.Chanage_At_M = undefined;
    this.ObjJobData.Chanage_At_KM = undefined;
    this.ObjJobData.Chanage_At_M = undefined;
   this.ObjJobData.Total_Length= undefined;
   this.ObjJobData.Side= undefined;
   this.ObjJobData.Width= undefined;
   this.ObjJobData.Hight_Thikness= undefined;
   this.ObjJobData.QNTY= undefined;
   this.ObjJobData.Trip_Arr = [];
   this.ObjJobData.Remarks= undefined;
  //  this.ObjJobData.Loose_Qnty= undefined;

  this.ObjJobData.bridge_item_length= undefined;
  this.ObjJobData.Bridge_Item_Breath = undefined;
  this.ObjJobData.Bridge_Item_Height= undefined;
  this.ObjJobData.Bridge_Item_Total_Qty= undefined;
  this.ObjJobData.Bridge_Item_Unit= undefined;
  this.ObjJobData.Bridge_Item_Remarks= undefined;
  this.ObjJobData.bridge_item= undefined;
  this.ObjJobData.bridge_item_Sl_No = undefined;
  this.ObjJobData.Material_Unit = 'CFT';
  if(this.BridgeItemSelect) {
    this.BridgeItemCodeChange(this.BridgeItemSelect)
  } else {
    this.BridgeItemSelect = undefined;
  }
  if(this.ObjJobData.Type_of_Work ==='Road Works (Concrete)' && this.ObjJobData.Structure_Details) {
    const structID = this.ObjJobData.Structure_Details;
    const obj1 = $.grep(this.StructureTypeDetailList2,function(obj){ return obj.Concrete_Structure_ID === structID})[0];
    this.ObjJobData.Side = obj1.Structure_Side;
  }
  this.ObjJobData.Side=this.ObjJobData.Type_of_Work ==='Bridges and Culverts Works' ? 'Both Side': undefined;
  this.ObjJobData.Dia = this.ObjJobData.Item_Code.toUpperCase() === 'WEEP HOLE' ? '4' : undefined;

  }
  clearBridgeData() {
    this.clearAddDetails();
  }
}
class Search{
  Project_Short_Name:string;
  Agreement_Number:string;
}
class JobData {
  Date:string;
  Type_of_Work:string;
  calculation_type:string;
  Structure_Details:string;
  Trip_By:string;
  Item_Code:string;
  No_Of_Trip:string;
  Loose_Qty_Per_Trip:string;
  Total_Loose_Qty:string;
  Chanage_From:string;
  Chanage_From_KM:string;
  Chanage_From_M:string;
  Chanage_To:string;
  Chanage_To_KM:string;
  Chanage_To_M:string;
  Chanage_At:string;
  Chanage_At_KM:string;
  Chanage_At_M:string;
  Total_Length:string;
  Side:string;
  Width:string;
  Hight_Thikness:string;
  QNTY:any;
  UNIT:string;
  Trip_Arr:any;
  Remarks:string;

  BOQ_Txn_ID:string;
  Sl_No:string;
  No_of_Span:string;
  Vehicle_No:string;
  Material_Unit:string;
  Received_From:string;
  Loose_Qnty:string;
  Deduct_Percentage:number;
  Total_Loose_Qnty_All:string;

  Party:string;
  structure_at:string;
  structure_at_km:string;
structure_at_meter:string;
Structured_Type:string;
Structured_Length:string;
Structured_Breadth :string;
Structured_Height :string;
bridge_item_length:string;
Bridge_Item_Breath :string;
Bridge_Item_Height:string;
Bridge_Item_Total_Qty:string;
Bridge_Item_Unit:string;
Bridge_Item_Remarks:string;
bridge_item:string;
Number:string;
bridge_item_Sl_No:string;
Grid_Index:number;

Dia:string;
Length_per_Each_Bar:string;
Total_Length_Rmt:string;
Co_efficient:string;
Size_Weep_Hole:string;
Length_per_piece:string;

Structure_Name:string;
Chainage_From_km:string;
Chainage_From_meter:string;
Chainage_To_km:string;
Chainage_To_meter:string;
Structure_Side:string;
}

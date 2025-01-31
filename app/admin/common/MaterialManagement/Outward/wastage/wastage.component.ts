import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { MessageService } from "primeng/api";
import { FileUpload } from "primeng/primeng";
declare var $: any;
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { CompacctHeader } from "../../../../shared/compacct.services/common.header.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CompacctGlobalApiService } from "../../../../shared/compacct.services/compacct.global.api.service";
import { DateTimeConvertService } from "../../../../shared/compacct.global/dateTime.service";
import { CompacctCommonApi } from "../../../../shared/compacct.services/common.api.service";
import { AnyARecord } from "dns";



@Component({
  selector: 'app-wastage',
  templateUrl: './wastage.component.html',
  styleUrls: ['./wastage.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class WastageComponent implements OnInit {

  items : any = [];
  Spinner = false;
  seachSpinner = false
  ShowSpinner = false;
  tabIndexToView = 0;
  buttonname = "Save";
  myDate = new Date();
  ObjRawMateriali : RawMateriali = new RawMateriali ();
  RawMaterialIssueFormSubmitted = false;
  ObjBrowse : Browse = new Browse ();
  Fcostcenlist:any = [];
  FromGodownList:any = [];
  Tocostcenlist:any = [];
  ToGodownList:any = [];
  FCostdisableflag = false;
  FGdisableflag = false;
  TGdisableflag = false;
  IndentListFormSubmitted = false;
  IndentList:any = [];
  ProductList:any = [];
  SelectedIndent: any;
  BackupIndentList:any = [];
  IndentFilter:any = [];
  TIndentList:any = [];
  Searchedlist:any = [];
  flag = false;
  productListFilter:any = [];
  SelectedProductType :any = [];
  Param_Flag ='';
  CostCentId_Flag : any;
  MaterialType_Flag = '';
  TCdisableflag = false;
  todayDate = new Date();
  initDate:any = [];
  RawMaterialIssueSearchFormSubmitted = false;
  ToBcostcenlist:any = [];
  ToBGodownList:any = [];
  TBCdisableflag = false;
  TBGdisableflag = false;
  ViewPoppup = false;
  Viewlist:any = [];
  Doc_date: any;
  Formstockpoint: any;
  FromCostCenter: any;
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
    this.route.queryParams.subscribe(params => {
      // console.log(params);
      this.clearData();
      this.Searchedlist = [];
      this.BackupIndentList = [];
     this.TIndentList = [];
     this.SelectedIndent = [];
      // this.Param_Flag = params['Name'];
      // this.CostCentId_Flag = params['Cost_Cen_ID'];
      // this.MaterialType_Flag = params['Material_Type']
      //  console.log (this.CostCentId_Flag);
    this.items = ["BROWSE", "CREATE"];
    this.Header.pushHeader({
      Header:  " Wastage " ,
      Link: " Material Management -> Wastage" 
    });
    this.getLockDate();
    this.GetFromCostCen();
    this.GetToCostCen();
    this.GetBToCostCen();
    this.GetProductType();
  })

  }

  TabClick(e){
    // console.log(e)
     this.tabIndexToView = e.index;
     this.items = ["BROWSE", "CREATE"];
     this.buttonname = "Save";
     this.clearData();
     this.BackupIndentList = [];
     this.TIndentList = [];
     this.SelectedIndent = [];
  }
  onReject() {
    this.compacctToast.clear("c");
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

  GetFromCostCen(){
    const tempObj = {
      Cost_Cen_ID : this.$CompacctAPI.CompacctCookies.Cost_Cen_ID,
      Material_Type : this.MaterialType_Flag
    }
    const obj = {
      "SP_String": "SP_Wastage_Material",
      "Report_Name_String": "Get Cost Centre",
      "Json_Param_String": JSON.stringify([tempObj])
    }
    this.GlobalAPI.getData(obj).subscribe((data:any)=>{
      this.Fcostcenlist = data;
      console.log('this.Fcostcenlist=',this.Fcostcenlist);
     this.ObjRawMateriali.From_Cost_Cen_ID = this.$CompacctAPI.CompacctCookies.Cost_Cen_ID;
      this.GetFromGodown();
     })
  }

  GetFromGodown(){
    if(this.ObjRawMateriali.From_Cost_Cen_ID){
      const tempObj = {
        Cost_Cen_ID : this.ObjRawMateriali.From_Cost_Cen_ID,
        Material_Type : this.MaterialType_Flag
      }
      const obj = {
        "SP_String": "SP_Wastage_Material",
        "Report_Name_String": "Get - Godown",
        "Json_Param_String": JSON.stringify([tempObj])
      }
      this.GlobalAPI.getData(obj).subscribe((data:any)=>{
        this.FromGodownList = data;
        console.log('this.FromGodownList=',this.FromGodownList)
        //this.ObjRawMateriali.From_godown_id = data[0].godown_id;
        this.ObjRawMateriali.From_godown_id = this.FromGodownList.length === 1 ? this.FromGodownList[0].godown_id : undefined;
       if(this.FromGodownList.length === 1){
         this.FGdisableflag = true;
       }else{
         this.FGdisableflag = false;
       }
         //console.log("From Godown List ===",this.FromGodownList);
      })
    }

  }

  GetToCostCen(){
    // const tempObj = {
    //   User_ID : this.$CompacctAPI.CompacctCookies.User_ID,
    //   Material_Type : this.MaterialType_Flag
    // }
    const obj = {
      "SP_String": "SP_Wastage_Material",
      "Report_Name_String": "Get Cost Centre Non outlet",
      //"Json_Param_String": JSON.stringify([tempObj])
    }
    this.GlobalAPI.getData(obj).subscribe((data:any)=>{
      this.Tocostcenlist = data;
     // if(this.$CompacctAPI.CompacctCookies.User_Type != 'A'){
      if (this.CostCentId_Flag) {
      this.ObjRawMateriali.To_Cost_Cen_ID = String(this.CostCentId_Flag);
      this.TCdisableflag = true;
      this.GetToGodown();
      } else {
        this.ObjRawMateriali.To_Cost_Cen_ID = undefined;
        this.TCdisableflag = false;
        this.GetToGodown();
      }
     // console.log("To Cost Cen List ===",this.Tocostcenlist);
    })
  }

  GetToGodown(){
    this.ToGodownList = [];
    //if(this.ObjRawMateriali.To_Cost_Cen_ID){
      const tempObj = {
        Cost_Cen_ID : this.ObjRawMateriali.To_Cost_Cen_ID,
        Material_Type : this.MaterialType_Flag
      }
      const obj = {
        "SP_String": "SP_Wastage_Material",
        "Report_Name_String": "Get - Godown",
        "Json_Param_String": JSON.stringify([tempObj])
      }
      this.GlobalAPI.getData(obj).subscribe((data:any)=>{
        this.ToGodownList = data;
  // this.ObjRawMateriali.To_godown_id = this.ToGodownList.length === 1 ? this.ToGodownList[0].godown_id : undefined;
       if(this.ToGodownList.length === 1){
        this.ObjRawMateriali.To_godown_id = this.ToGodownList[0].godown_id;
         this.TGdisableflag = true;
       }else{
        this.ObjRawMateriali.To_godown_id = undefined;
         this.TGdisableflag = false;
       }
       //console.log("To Godown List ===",this.ToGodownList);
      })
    //}

  }

  GetBToCostCen(){
    // const tempObj = {
    //   User_ID : this.$CompacctAPI.CompacctCookies.User_ID,
    //   Material_Type : this.MaterialType_Flag
    // }
    const obj = {
      "SP_String": "SP_Wastage_Material",
      "Report_Name_String": "Get Cost Centre Non outlet",
     // "Json_Param_String": JSON.stringify([tempObj])
    }
    this.GlobalAPI.getData(obj).subscribe((data:any)=>{
      this.ToBcostcenlist = data;
     // if(this.$CompacctAPI.CompacctCookies.User_Type != 'A'){
      if (this.CostCentId_Flag) {
      this.ObjBrowse.To_Cost_Cen_ID = String(this.CostCentId_Flag);
      this.TBCdisableflag = true;
      this.GetBToGodown();
      } else {
        this.ObjBrowse.To_Cost_Cen_ID = undefined;
        this.TBCdisableflag = false;
        this.GetBToGodown();
       // this.ToBGodownList = [];
      }
      console.log("To B Cost Cen List ===",this.ToBcostcenlist);
    })
  }

  GetBToGodown(){
    this.ToBGodownList = [];
    //if(this.ObjBrowse.To_Cost_Cen_ID){
      const tempObj = {
        Cost_Cen_ID : this.ObjBrowse.To_Cost_Cen_ID,
        Material_Type : this.MaterialType_Flag
      }
      const obj = {
        "SP_String": "SP_Wastage_Material",
        "Report_Name_String": "Get - Godown",
        "Json_Param_String": JSON.stringify([tempObj])
      }
      this.GlobalAPI.getData(obj).subscribe((data:any)=>{
        this.ToBGodownList = data;
  // this.ObjRawMateriali.To_godown_id = this.ToGodownList.length === 1 ? this.ToGodownList[0].godown_id : undefined;
       if(this.ToBGodownList.length === 1){
        //this.ObjRawMateriali.To_godown_id = this.ToGodownList[0].godown_id;
        this.ObjBrowse.To_godown_id = this.ToBGodownList[0].godown_id;
         this.TBGdisableflag = true;
       }else{
       // this.ObjRawMateriali.To_godown_id = undefined;
        this.ObjBrowse.To_godown_id = undefined;
         this.TBGdisableflag = false;
       }
       //console.log("To Godown List ===",this.ToGodownList);
      })
    //}

  }

  // FOR PRODUCT TABLE
  GetIndentList(valid){
    this.RawMaterialIssueFormSubmitted = true;
    if(valid){
      this.ShowSpinner = true;
    const TempObj = {
      Cost_Cen_ID : this.ObjRawMateriali.From_Cost_Cen_ID,
      Godown_ID : this.ObjRawMateriali.From_godown_id,
     
     }
   const obj = {
    "SP_String": "SP_Wastage_Material",
    "Report_Name_String" : "Get_Product",
   "Json_Param_String": JSON.stringify([TempObj])

  }
  this.GlobalAPI.getData(obj).subscribe((data:any)=>{
   const tempData = data
   console.log("tempdata=", tempData);
   tempData.forEach(element => {
    element['Issue_Qty'] = undefined;
    element['Narration'] = '';
 });
   this.ProductList = tempData;
   this.ShowSpinner = false;
   this.BackupIndentList = tempData;
    this.RawMaterialIssueFormSubmitted = false;
    this.GetProductType();
   console.log("this.ProductList======",this.ProductList);
   })
  }
  }

  // product Filter

  filterProduct(){
    if(this.SelectedProductType.length){
      let tempProduct = [];
      this.SelectedProductType.forEach(item => {
        this.BackupIndentList.forEach((el,i)=>{

          const ProductObj = this.BackupIndentList.filter((elem) => elem.Product_Type == item)[i];
          //const ProductObj = el;
         // console.log("ProductObj",ProductObj);
          if(ProductObj)
          tempProduct.push(ProductObj)
        })
        })
     this.ProductList  = [...tempProduct];
   }
    else {
    this.ProductList  = [...this.BackupIndentList];

    }
  }

  GetProductType(){
    let DOrderBy = [];
      this.productListFilter = [];
      //this.SelectedDistOrderBy1 = [];
      this.BackupIndentList.forEach((item) => {
        if (DOrderBy.indexOf(item.Product_Type) === -1) {
          DOrderBy.push(item.Product_Type);
          //this.SelectedProductType.push(item.Product_Type);
          this.productListFilter.push({ label: item.Product_Type, value: item.Product_Type });
         // console.log("this.productListFilter", this.productListFilter);
        }
      });
  }

  // GET PRODUCT LIST
  dataforproduct(){
    if(this.SelectedIndent.length) {
      let Arr =[]
      this.SelectedIndent.forEach(el => {
        if(el){
          const Dobj = {
            Doc_No : el,
            Cost_Cen_ID : this.ObjRawMateriali.From_Cost_Cen_ID,
            Godown_ID : this.ObjRawMateriali.From_godown_id,
            To_Cost_Cen_ID : this.ObjRawMateriali.To_Cost_Cen_ID,
            To_Godown_ID : this.ObjRawMateriali.To_godown_id,
            Material_Type : this.MaterialType_Flag
            }
      Arr.push(Dobj)
        }

    });
      console.log("Table Data ===", Arr)
      return Arr.length ? JSON.stringify(Arr) : '';
    }
  }

  GetProduct(arr){
    // const TempObj = {
    //   Cost_Cen_ID : this.ObjRawMateriali.From_Cost_Cen_ID,
    //   Godown_ID : this.ObjRawMateriali.From_godown_id,
    //  }
    if(this.dataforproduct()){
   const obj = {
    "SP_String": "SP_Wastage_Material",
    "Report_Name_String" : "Get Product",
    "Json_Param_String": this.dataforproduct()
   //"Json_Param_String": JSON.stringify([TempObj])

  }
  this.GlobalAPI.getData(obj).subscribe((data:any)=>{
    if(arr.length) {
      arr.forEach(elem => {
       data.forEach( item =>{
          if(Number(item.Product_ID) === Number(elem.Product_ID)){
            item.Issue_Qty = elem.Issue_Qty
          }
        });
      })
    }
    this.ProductList = data;
   console.log("this.ProductList======",this.ProductList);


  });
}
  }

  qtyChq(col){
    this.flag = false;
    console.log("col",col);
    if(col.Issue_Qty){
      if(col.Issue_Qty <=  col.Batch_Qty){
        this.flag = false;
        return true;
      }
      else {
        this.flag = true;
        this.compacctToast.clear();
             this.compacctToast.add({
                 key: "compacct-toast",
                 severity: "error",
                 summary: "Warn Message",
                 detail: "Quantity can't be more than in batch available quantity "
               });

             }
    }
   }

   saveqty(){
    let flag = true;
   for(let i = 0; i < this.ProductList.length ; i++){
    if(Number(this.ProductList[i].Batch_Qty) <  Number(this.ProductList[i].Issue_Qty)){
      flag = false;
      break;
    }
   }
   return flag;
  }
  // SAVE AND UPDATE

  dataforSaveRawMaterialIssue(){
    // console.log(this.DateService.dateConvert(new Date(this.myDate)))
     this.ObjRawMateriali.Doc_Date = this.DateService.dateConvert(new Date(this.todayDate));
    if(this.ProductList.length) {
      let tempArr =[]
      this.ProductList.forEach((item:any) => {
        if(item.Issue_Qty && Number(item.Issue_Qty) != 0) {
     const TempObj = {
            Doc_No:  this.ObjRawMateriali.Doc_No ?  this.ObjRawMateriali.Doc_No : "A",
            Doc_Date: this.ObjRawMateriali.Doc_Date,
            From_Cost_Cen_ID :this.ObjRawMateriali.From_Cost_Cen_ID,
            From_godown_id	: this.ObjRawMateriali.From_godown_id,
            Product_ID	: item.Product_ID,
            Product_Description	: item.Product_Description,
            Product_Type_ID	: item.Product_Type_ID,
            Qty	: item.Issue_Qty,
            UOM	: item.UOM,
            Narration : item.Narration,
            User_ID	:this.$CompacctAPI.CompacctCookies.User_ID,
            Batch_No : item.Batch_No
         }
        tempArr.push(TempObj)
      }
      });
      console.log("Save Data ===", tempArr)
      return JSON.stringify(tempArr);

    }
  }

  SaveRawMaterialIssue(){
    if(this.ObjRawMateriali.From_Cost_Cen_ID == this.ObjRawMateriali.To_Cost_Cen_ID &&
      this.ObjRawMateriali.From_godown_id == this.ObjRawMateriali.To_godown_id){
      this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "can't use same stock point with respect to same cost centre"
        });
        return false;
    }
    if(this.checkLockDate(this.DateService.dateConvert(new Date(this.todayDate)))) {
    if(this.saveqty()){
      const obj = {
        "SP_String": "SP_Wastage_Material",
        "Report_Name_String" : "Save_Wastage_Material",
       "Json_Param_String": this.dataforSaveRawMaterialIssue()

      }
      this.GlobalAPI.postData(obj).subscribe((data:any)=>{
        //console.log(data);
        var tempID = data[0].Column1;
        console.log("After Save",tempID);
       // this.Objproduction.Doc_No = data[0].Column1;
        if(data[0].Column1){
          this.compacctToast.clear();
          const mgs = this.buttonname === "Save" ? "Saved" : "Updated";
          this.compacctToast.add({
           key: "compacct-toast",
           severity: "success",
           summary: "Production Voucher  " + tempID,
           detail: "Succesfully  " + mgs
         });
         this.tabIndexToView = 0 ;
         this.items = ["BROWSE", "CREATE"];
         this.buttonname = "Save";
         this.GetSearchedList();
         this.clearData();
         this.ProductList =[];
         this.IndentListFormSubmitted = false;
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
    else{
      this.compacctToast.clear();
      this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Quantity can't be more than in batch available quantity "
        });
    }
    }

  }


  // FOR BROWSE
  getDateRange(dateRangeObj) {
    if (dateRangeObj.length) {
      this.ObjBrowse.start_date = dateRangeObj[0];
      this.ObjBrowse.end_date = dateRangeObj[1];
    }
  }
  GetSearchedList(){
    this.Searchedlist = [];
  const start = this.ObjBrowse.start_date
  ? this.DateService.dateConvert(new Date(this.ObjBrowse.start_date))
  : this.DateService.dateConvert(new Date());
const end = this.ObjBrowse.end_date
  ? this.DateService.dateConvert(new Date(this.ObjBrowse.end_date))
  : this.DateService.dateConvert(new Date());

  this.RawMaterialIssueSearchFormSubmitted = true;
  
const tempobj = {
  From_date : start,
  To_Date : end,
  Cost_Cen_ID : this.ObjBrowse.To_Cost_Cen_ID ? this.ObjBrowse.To_Cost_Cen_ID : 0,
  Godown_ID : this.ObjBrowse.To_godown_id ? this.ObjBrowse.To_godown_id : 0

}
const obj = {
  "SP_String": "SP_Wastage_Material",
  "Report_Name_String": "Browse_Wastage_Material",
  "Json_Param_String": JSON.stringify([tempobj])
}
 this.GlobalAPI.getData(obj).subscribe((data:any)=>{
   this.Searchedlist = data;
   console.log('Search list=====',this.Searchedlist)
   this.seachSpinner = false;
   this.RawMaterialIssueSearchFormSubmitted = false;
 })

}

  clearData(){
    this.ObjRawMateriali.From_Cost_Cen_ID = this.$CompacctAPI.CompacctCookies.Cost_Cen_ID;
    // FOR CREATE TAB
    this.SelectedProductType = [];
    this.productListFilter = [];
    if (this.CostCentId_Flag) {
      this.ObjRawMateriali.To_Cost_Cen_ID = String(this.CostCentId_Flag);
      this.TCdisableflag = true;
      this.GetToGodown();
      this.ObjBrowse.To_Cost_Cen_ID = String(this.CostCentId_Flag);
      this.TBCdisableflag = true;
      this.GetBToGodown();
      } else {
        this.ObjRawMateriali.To_Cost_Cen_ID = undefined;
        //this.ObjRawMateriali.To_godown_id = undefined;
        this.TCdisableflag = false;
        this.GetToGodown();
        this.ObjBrowse.To_Cost_Cen_ID = undefined;
        this.TBCdisableflag = false;
        this.GetBToGodown();
      }
      // FOR CREATE TAB
      
      // FOR BROWSE
      // if (this.CostCentId_Flag) {
      //   this.ObjBrowse.To_Cost_Cen_ID = String(this.CostCentId_Flag);
      //   this.TBCdisableflag = true;
      //   this.GetBToGodown();
      //   } else {
      //     this.ObjBrowse.To_Cost_Cen_ID = undefined;
      //     //this.ObjRawMateriali.To_godown_id = undefined;
      //     this.TBCdisableflag = false;
      //     this.GetBToGodown();
      //   }
        // FOR BROWSE

    this.ObjRawMateriali.From_godown_id = this.FromGodownList.length === 1 ? this.FromGodownList[0].godown_id : undefined;
     if(this.FromGodownList.length === 1){
       this.FGdisableflag = true;
     }else{
       this.FGdisableflag = false;
     }
    // this.GetToGodown();
    // FOR CREATE TAB
     this.ObjRawMateriali.To_godown_id = this.ToGodownList.length === 1 ? this.ToGodownList[0].godown_id : undefined;
     if(this.ToGodownList.length === 1){
       this.TGdisableflag = true;
     }else{
       this.TGdisableflag = false;
     }
     // FOR CREATE TAB

     // FOR BROWSE TAB
     this.ObjBrowse.To_godown_id = this.ToBGodownList.length === 1 ? this.ToBGodownList[0].godown_id : undefined;
     if(this.ToBGodownList.length === 1){
       this.TBGdisableflag = true;
     }else{
       this.TBGdisableflag = false;
     }
     // FOR BROWSE TAB

    this.ObjRawMateriali.Remarks = [];
    this.ObjRawMateriali.Indent_List = undefined;
    this.ProductList = [];
    this.IndentList = [];
    this.BackupIndentList = [];
    this.TIndentList = [];
    this.SelectedIndent = [];
    this.IndentFilter = [];
    // Product Filter
    this.SelectedProductType = [];
    this.ShowSpinner = false;
    this.ObjRawMateriali.Doc_No = undefined;
    this.todayDate = new Date();
    this.RawMaterialIssueSearchFormSubmitted = false;

  }
  // View
  View(DocNo){
    this.Viewlist = [];
    this.ObjRawMateriali.Doc_No = undefined;
    this.Doc_date = undefined;
    this.Formstockpoint = undefined;
    this.FromCostCenter = undefined;
    if(DocNo.Doc_No){
     
    // this.AuthPoppup = true;
    this.ViewPoppup = true;
    //this.tabIndexToView = 1;
     //console.log("this.EditDoc_No ", this.Adv_Order_No );
     this.geteditmaster(DocNo.Doc_No)
    }
  }
// Edit
EditIntStock(col){
  this.ObjRawMateriali.Doc_No = undefined;
  if(col.Doc_No){
   this.ObjRawMateriali = col.Doc_No;
   this.tabIndexToView = 1;
   this.ProductList = [];
   this.BackupIndentList = [];
   this.items = ["BROWSE", "UPDATE"];
   this.buttonname = "Update";
   this.geteditmaster(col.Doc_No)
  }

}
geteditmaster(Doc_No){
  const obj = {
    "SP_String": "SP_Wastage_Material",
  "Report_Name_String": "View_Wastage_Material",
    "Json_Param_String": JSON.stringify([{Doc_No:Doc_No}])
  }
  this.GlobalAPI.getData(obj).subscribe((data:any)=>{
    console.log("Edit",data);
    this.Viewlist = data;
    const TempData = data;
    this.todayDate = new Date(data[0].Doc_Date);
    this.ObjRawMateriali = data[0];
    TempData.forEach(element => {
      this.ProductList.push({
        Current_Stock_In_Dept:element.Current_Stock_In_Dept,
        Issue_Qty:element.Qty,
        Product_Description:element.Product_Description,
        Product_ID:element.Product_ID,
        Product_Type:element.Product_Type,
        Product_Type_ID:element.Product_Type_ID,
        Stock_Qty:element.Stock_Qty,
        UOM : element.UOM,
        Batch_No : element.Batch_No,
        Batch_Qty : element.Batch_Qty,
        Remarks : element.Remarks
      })
     });
     this.BackupIndentList = this.ProductList;
     this.GetProductType();
  })
}
// Delete
DeleteIntStocktr(col){
  this.ObjRawMateriali.Doc_No = undefined;
  if(col.Doc_No){
    if(this.checkLockDate(col.Doc_Date)){
    this.ObjRawMateriali.Doc_No = col.Doc_No;
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
onConfirm(){
  if(this.ObjRawMateriali.Doc_No){
    const Tempdata = {
      User_ID : this.$CompacctAPI.CompacctCookies.User_ID,
      Doc_No : this.ObjRawMateriali.Doc_No
    }
    const objj = {
      "SP_String": "SP_Wastage_Material",
      "Report_Name_String": "Delete_Wastage_Material",
      "Json_Param_String": JSON.stringify([Tempdata])
    }
    this.GlobalAPI.getData(objj).subscribe((data:any)=>{
      if (data[0].Column1 === "Done"){
        this.onReject();
        this.GetSearchedList();
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "success",
          summary: "Doc No.: " + this.ObjRawMateriali.Doc_No.toString(),
          detail: "Succesfully Deleted"
        });
        this.clearData();
      }
    })
  }
}

}

class RawMateriali {
  Doc_No : string = "" ;
  Doc_Date : string;
  From_godown_id : any;
  To_godown_id : any;
  To_Cost_Cen_ID : any;
  From_Cost_Cen_ID : any;
  Indent_List : any;
  Remarks : any;
  From_Cost_Cen_name:any;
  From_godown_Name:any;
 }
 class Browse {
  start_date : Date ;
  end_date : Date;
  To_Cost_Cen_ID : any;
  To_godown_id : any;
}

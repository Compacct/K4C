import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CompacctGlobalApiService {

  constructor(private http: HttpClient) { }
  getData(ParamObj) {
    const obj = {
      'SP_String': ParamObj.SP_String,
      'Report_Name_String':  ParamObj.Report_Name_String,
      'Json_Param_String': ParamObj.Json_Param_String ? ParamObj.Json_Param_String : 'NA',
      'Json_1_String': ParamObj.Json_1_String ? ParamObj.Json_1_String : 'NA',
      'Json_2_String': ParamObj.Json_2_String ? ParamObj.Json_2_String : 'NA' ,
      'Json_3_String': ParamObj.Json_3_String ? ParamObj.Json_3_String : 'NA',
      'Json_4_String': ParamObj.Json_4_String ? ParamObj.Json_4_String : 'NA'
    }
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(`/Common/Common_SP_For_All`,obj ,httpOptions).pipe(map((data:any) => data ? JSON.parse(data) : []));
  }
  postData(ParamObj) {
    const obj = {
      'SP_String': ParamObj.SP_String,
      'Report_Name_String':  ParamObj.Report_Name_String,
      'Json_Param_String': ParamObj.Json_Param_String ? ParamObj.Json_Param_String : 'NA',
      'Json_1_String': ParamObj.Json_1_String ? ParamObj.Json_1_String : 'NA',
      'Json_2_String': ParamObj.Json_2_String ? ParamObj.Json_2_String : 'NA' ,
      'Json_3_String': ParamObj.Json_3_String ? ParamObj.Json_3_String : 'NA',
      'Json_4_String': ParamObj.Json_4_String ? ParamObj.Json_4_String : 'NA'
    }
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(`/Common/Common_SP_For_All`,obj , httpOptions).pipe(map((data:any) => data ? JSON.parse(data) : []));
  }
  CommonTaskData(ParamObj) {
    const obj = {
      'Json_Param_String': ParamObj.Json_Param_String ? ParamObj.Json_Param_String : '[]'
    }
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(`/Common/Create_Common_task?Report_Name=`+ParamObj.Report_Name,obj ,httpOptions).pipe(map((data:any) => data ? JSON.parse(data) : []));
  }
  CommonTaskData2(ParamObj) {
    const obj = {
      'Json_Param_String': ParamObj.Json_Param_String ? ParamObj.Json_Param_String : '[]'
    }
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(`/Common/New_Common_task?Report_Name=`+ParamObj.Report_Name,obj ,httpOptions).pipe(map((data:any) => data ? JSON.parse(data) : []));
  }
  CommonPostData(ParamObj,URL) {
    const obj = {
      'SP_String': ParamObj.SP_String,
      'Report_Name_String':  ParamObj.Report_Name_String,
      'Json_Param_String': ParamObj.Json_Param_String ? ParamObj.Json_Param_String : 'NA',
      'Json_1_String': ParamObj.Json_1_String ? ParamObj.Json_1_String : 'NA',
      'Json_2_String': ParamObj.Json_2_String ? ParamObj.Json_2_String : 'NA' ,
      'Json_3_String': ParamObj.Json_3_String ? ParamObj.Json_3_String : 'NA',
      'Json_4_String': ParamObj.Json_4_String ? ParamObj.Json_4_String : 'NA'
    }
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(`/Common/`+URL,obj , httpOptions).pipe(map((data:any) => data ? JSON.parse(data) : []));
  }
  tutopiacallapis(ParamObj) {
    const obj = {
      'SP_String': ParamObj.SP_String,
      'Report_Name_String':  ParamObj.Report_Name_String,
      'Json_Param_String': ParamObj.Json_Param_String ? ParamObj.Json_Param_String : 'NA',
      'Json_1_String': ParamObj.Json_1_String ? ParamObj.Json_1_String : 'NA',
      'Json_2_String': ParamObj.Json_2_String ? ParamObj.Json_2_String : 'NA' ,
      'Json_3_String': ParamObj.Json_3_String ? ParamObj.Json_3_String : 'NA',
      'Json_4_String': ParamObj.Json_4_String ? ParamObj.Json_4_String : 'NA'    
    }
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(`/Common/Tutopia_Call_Common_SP_For_All`,obj , httpOptions).pipe(map((data:any) => data ? JSON.parse(data) : []));
  }
  CommonFileUpload(ParamObj) {
    const file = ParamObj;
    console.log("file",file);
     const formData: FormData = new FormData();
    formData.append("frontfile", file);
    const httpOptions = { headers: new HttpHeaders({ 'x-functions-key':'16S1jS9cr8TvSazPGh98dtutt7j0RS1YTH2G9NlJhD8NAzFuaOnQbQ=='}) };
   
    return this.http.post(`https://compacctcommon.azurewebsites.net/api/Common_File_Upload`,formData , httpOptions).pipe(map((data:any) => data ? data: []));
  }
}



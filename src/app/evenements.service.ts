import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Evenement } from './evenement';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class EvenementsService {

public evenements:Evenement[]=[
//  {cota:1,date:new Date("09/01/2022"),jour:1,mission:"mission1",id:1,activite:[
//   {cota:0.5,jour:1},
//   {cota:1,jour:2},
//   {cota:1,jour:3},
//   {cota:0.5,jour:4},
//   {cota:1,jour:5},
//   {cota:1,jour:6},
//   {cota:0.5,jour:7},
//   {cota:0.5,jour:8},
//   {cota:0.5,jour:9},
//   {cota:0.5,jour:10},
//   {cota:0.5,jour:11},
//   {cota:0.5,jour:12},
//   {cota:0.5,jour:13},
//   {cota:0.5,jour:14},
//   {cota:0.5,jour:15},
//   {cota:0.5,jour:16},
//   {cota:0.5,jour:17},
//   {cota:0.5,jour:18},
//   {cota:0.5,jour:19},
//   {cota:0.5,jour:20},
//  ]},
//  {cota:1,date:new Date("09/01/2022"),jour:1,mission:"mission2",id:2,activite:[
//   {cota:0.5,jour:1},
//   {cota:0,jour:2},
//   {cota:0,jour:3},
//   {cota:0.5,jour:4},
//   {cota:0,jour:5},
//   {cota:0,jour:6},
//   {cota:0.5,jour:7},
//   {cota:0.5,jour:8},
//   {cota:0.5,jour:9},
//   {cota:0.5,jour:10},
//   {cota:0.5,jour:11},
//   {cota:0.5,jour:12},
//   {cota:0.5,jour:13},
//   {cota:0.5,jour:14},
//   {cota:0.5,jour:15},
//   {cota:0.5,jour:16},
//   {cota:0.5,jour:17},
//   {cota:0.5,jour:18},
//   {cota:0.5,jour:19},
//   {cota:0.5,jour:20},
//  ]},
//  {cota:1,date:new Date("09/01/2022"),jour:1,mission:"mission3",id:3,activite:[
//   {cota:0.5,jour:1},
//   {cota:0,jour:2},
//   {cota:0,jour:3},
//   {cota:0.5,jour:4},
//   {cota:0,jour:5},
//   {cota:0,jour:6},
//   {cota:0.5,jour:7},
//   {cota:0.5,jour:8},
//   {cota:0,jour:9},
//   {cota:0,jour:10},
//   {cota:0.5,jour:11},
//   {cota:0,jour:12},
//   {cota:0,jour:13},
//   {cota:0.5,jour:14},
//  ]},
 
]
evenement:Evenement={cota:0.5,date:new Date("01/09/2022"),jour:1,mission:"mission1",id:1,activite:[{cota:0,jour:0}]}
constructor(private httpClient:HttpClient) { }
baseUrl=environment.baseUrl;
  getAll(){
    return this.evenements;
  }

  addAll(events:any):Observable<any>{
    let  iduser:string = localStorage.getItem("iduser")+""
    console.log(iduser);
    
  return  this.httpClient.post<any>(`${this.baseUrl}/evenement/${iduser}`,events,httpOptions);
  }

  update(mission : string,jour:number,value:number){

  }
getEventsByUserIdAndDate(id:string,date:Date){
  console.log(`${this.baseUrl}/evenement/get/${id}/`);
  console.log(date);
  
  return  this.httpClient.post<any>(`${this.baseUrl}/evenement/get/${id}/`,date,httpOptions);

}

}

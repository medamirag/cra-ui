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
]
evenement:Evenement={cota:0.5,date:new Date("01/09/2022"),typeEvent:0,jour:1,absence:0,heuresup:0,mission:"null",id:1,activite:[{cota:0,absence:0,overtime:0,jour:0}]}
constructor(private httpClient:HttpClient) { }
baseUrl=environment.baseUrl;
  getAll(){
    return this.evenements;
  }

  addAll(events:any,date:any):Observable<any>{
    let  iduser:string = localStorage.getItem("iduser")+""
    
  if(events.length===0){
    this.evenement.date=date
    return  this.httpClient.post<any>(`${this.baseUrl}/evenement/${iduser}`,[this.evenement],httpOptions);

  }    
  return  this.httpClient.post<any>(`${this.baseUrl}/evenement/${iduser}`,events,httpOptions);
  }

 
getEventsByUserIdAndDate(id:number,date:Date):Observable<Evenement[]>{
  console.log(`${this.baseUrl}/evenement/get/${id}/`);
  console.log(date);
  
  return  this.httpClient.post<Evenement[]>(`${this.baseUrl}/evenement/get/${id}/`,date);

}

}

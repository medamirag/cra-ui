import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mission } from './mission';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class MissionsService {
  baseUrl=environment.baseUrl
  userid:string="";
missions:Mission[]=[]
  constructor(private httpClient:HttpClient) { }

  getMission(){
    return this.httpClient.get<Mission[]>(`${this.baseUrl}/Mission/`)
  }
  addMission(mission:Mission):Observable<any>{
    this.userid= localStorage.getItem('iduser')+""
    return  this.httpClient.post<any>(`${this.baseUrl}/Mission/${this.userid}`,mission,httpOptions);
    }


}

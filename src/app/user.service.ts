import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;
  constructor(private httpClient:HttpClient) { }


  getUser(username:string,password:string):Observable<any>
  {console.log(`${this.baseUrl}/User/`);
  
    return this.httpClient.post(`${this.baseUrl}/User/`,{"username":username,"password":password},httpOptions)
  }
}

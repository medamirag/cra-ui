import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private userService : UserService) { }
username:string=""
password:string=""
error:string=""
  ngOnInit(): void {
  }
  login(){
this.userService.getUser(this.username,this.password).subscribe(data=>{
  console.log(data);
  
  if(data.message!="OK")
  this.error = data.message
  else{
  localStorage.setItem('iduser',data.id)
  console.log("ok");
  this.router.navigate(['/home']);
  }

  
})
  }

}
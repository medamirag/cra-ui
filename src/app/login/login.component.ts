import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  iduser:number=0
  constructor(private router:Router,private userService : UserService) { 
    this.iduser=Number(localStorage.getItem('iduser'))
    console.log("this.iduserss"+this.iduser);
    
    if(this.iduser>0)
    
    {
      this.router.navigate(['/home'])
      
    }
    else{
      
    }
  }

  
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

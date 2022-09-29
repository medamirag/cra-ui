import { Component, OnInit } from '@angular/core';
import { EvenementsService } from '../evenements.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private eventService:EvenementsService,private userService:UserService) { }

  ngOnInit(): void {
  //  this.eventService.getEventsByUserIdAndDate("1",new Date()).subscribe(data=>console.log(data));
    //this.userService.getUser("user1","password1").subscribe(data=>console.log(data));
  }

}

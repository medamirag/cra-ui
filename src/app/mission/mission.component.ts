import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Mission } from '../mission';
import { MissionsService } from '../missions.service';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
missions:Mission[]=[]
mission:Mission={name:""}
  constructor(private router:Router,private missionService:MissionsService,private modal: NgbModal) { }

  ngOnInit(): void {
this.getAll()  }
  addMission(): void {
    this.modal.open(this.modalContent, { size: 'lg' });
  }
  getAll(){
    this.missionService.getMission().subscribe(data=>this.missions=data)

  }
  saveMission(){
    console.log(this.mission);
    
    if(this.mission.name=="")
      alert("name cant be empty")
     if(this.missions.find(miss=>miss.name===this.mission.name)) 
     alert("mission already exists")
    {
    this.missionService.addMission(this.mission).subscribe(data=>{
      console.log(data);
      this.getAll()
      this.modal.dismissAll()

    });
      
    }
  }

}

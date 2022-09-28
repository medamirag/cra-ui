import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Activite } from '../activite';
import { ActiviteService } from '../activite.service';
import { Evenement } from '../evenement';
import { EvenementsService } from '../evenements.service';
import { Mission } from '../mission';
import { MissionsService } from '../missions.service';

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.scss']
})
export class EvenementsComponent implements OnInit {
  evenements: Evenement[] = []
  myDate: Date = new Date()
  firstDay: number = 1
  lastDay: number = 1
  missions: Mission[]=[];
  days: number[] = []
  missionName:string=""
  iduser:string=""
  constructor(private activityService : ActiviteService, private evenementsService: EvenementsService,private missionService:MissionsService) { 
   this.iduser= localStorage.getItem("iduser")+""
  }

  ngOnInit(): void {
    //this.getAll();

this.getAll()
    this.onDateChange(this.myDate)
    this.missionService.getMission().subscribe(data=>this.missions=data);
    
  }

  getAll() {
    this.evenementsService.getEventsByUserIdAndDate(this.iduser,this.myDate).subscribe(
      data=>{  
        console.log(data);
        
        this.evenements=data

      }
    )
  }
 changeInput(event:any){

     this.update(event.id.split('|')[0], event.id.split('|')[1], event.value)

  // detectChange
 }
  onDateChange(event: any) {
    this.myDate = new Date(event);
    this.lastDay = this.getDaysInMonth(this.myDate)
    
    for (let index = 1; index <= this.lastDay; index++) {
      this.days.push(index);
    }
    this.getAll()
  }
  getDaysInMonth(date: Date) {
    let count = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    console.log(count);
    return count

  }
  detectChange(mission:string,jour:number,value:number) {
    this.update(mission,jour,value)
  }
  // detectChange(event: any) {
  //   console.log(event.id);
  //   console.log(event.value);
  //   this.update(event.id.split('|')[0], event.id.split('|')[1], event.value)
  // }
  update(mission: string, jour: number, valeur: number) {
    let m: any;
    this.evenements.forEach(element => {
      if (element.mission === mission) {
        m = element.activite.find(ev => ev.jour == jour);
        if (m) {
          if (valeur==0.5)
          m.cota = 1
          else if(valeur==1)
          m.cota =0
          else
          m.cota = 0.5
        }


      }
    });
  }
  // update(mission: string, jour: number, valeur: number) {
  //   let m: any;
  //   this.evenements.forEach(element => {
  //     if (element.mission === mission) {
  //       m = element.activite.find(ev => ev.jour == jour);
  //       if (m) {
  //         m.cota = valeur
  //       }


  //     }
  //   });
  // }

  getMission(event:any){
    this.missionName = event.value;
  }
  addMission(){
    console.log("clickd");
    
    if(this.evenements.find(ev=>ev.mission===this.missionName)){
      alert("Mission Existss")
    }
    else if(this.missionName===""){
      alert("select mission!")
    }
    else{
      this.evenements.push({
        activite:this.activityService.getEmptyActivity(this.lastDay),cota:0,date:this.myDate,id:0,jour:0,mission:this.missionName
      })
    }
    console.log(this.evenements);
    
  }
  addAll(){
    return this.evenementsService.addAll(this.evenements).subscribe(data=>console.log(data));
  }

}

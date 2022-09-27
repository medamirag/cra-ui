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
  myDate: Date = new Date("09/26/2022")
  firstDay: number = 1
  lastDay: number = 1
  missions: Mission[]=[];
  days: number[] = []
  missionName:string=""
  constructor(private activityService : ActiviteService, private evenementsService: EvenementsService,private missionService:MissionsService) { }

  ngOnInit(): void {
    this.getAll();
    this.onDateChange(this.myDate)
    this.missions=this.missionService.getMission()

  }

  getAll() {

    this.evenements = this.evenementsService.getAll();

  }
  onDateChange(event: any) {
    this.myDate = new Date(event);
    this.lastDay = this.getDaysInMonth(this.myDate)
    
    for (let index = 1; index <= this.lastDay; index++) {
      this.days.push(index);
    }
  }
  getDaysInMonth(date: Date) {
    let count = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    console.log(count);
    return count

  }
  detectChange(event: any) {
    console.log(event.id);
    console.log(event.value);
    this.update(event.id.split('|')[0], event.id.split('|')[1], event.value)
  }
  update(mission: string, jour: number, valeur: number) {
    let m: any;
    this.evenementsService.update(mission, jour, valeur)
    this.evenements.forEach(element => {
      if (element.mission === mission) {
        m = element.activite.find(ev => ev.jour == jour);
        if (m) {
          m.cota = valeur
        }


      }
    });
  }

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
        activite:this.activityService.getEmptyActivity(this.lastDay),cota:0,date:new Date,id:0,jour:0,mission:this.missionName
      })
    }
  }
  addAll(){
    return this.evenementsService.addAll(this.evenements).subscribe(data=>console.log(data));
  }

}

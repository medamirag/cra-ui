import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
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
  evenementsAbs: Evenement[] = []
  evenementsOver: Evenement[] = []
  myDate: Date = new Date()
  totaux = new Map<number, number>();
  totauxAbs = new Map<number, number>();
  totauxOver = new Map<number, number>();
  totauxval: number = 0
  totalAbs: number = 0
  totalOvert: number = 0
  firstDay: number = 1
  hasAbsence: boolean = false;
  myVal: number = 0;
  hasOvertime: boolean = false;
  lastDay: number = 1
  missions: Mission[] = [];
  days: number[] = []
  missionName: string = ""
  iduser: number = 0
  constructor(private router:Router,private activityService: ActiviteService, private evenementsService: EvenementsService, private missionService: MissionsService) {

    this.iduser=Number(localStorage.getItem('iduser'))
    console.log("this.iduserss"+this.iduser);
    
    if(this.iduser==0)
    
    {
      this.router.navigate(['/'])
      
    }
    else{
      
    }
  

    
  }

  ngOnInit(): void {
    //this.getAll();
    this.getAll()
    this.onDateChange(this.myDate)
    this.missionService.getMission().subscribe(data => this.missions = data);

  }

  getAll() {
    this.evenementsService.getEventsByUserIdAndDate(this.iduser, this.myDate).subscribe(
      data => {

        this.evenements = data.filter(x=>x.mission!='Overtime'&&x.mission!='Absence')
        this.evenementsAbs = data.filter(x=>x.mission==='Absence')
        this.evenementsOver= data.filter(x=>x.mission==='Overtime')
        this.getTotaux();
        if (this.evenementsOver.length>0) {
          this.hasOvertime = true;

        }
        if (this.evenementsAbs.length>0) {
          this.hasAbsence = true;

        }

      }
    )
  }
  changeInput(event: any, n: any) {

    this.update(event.id.split('|')[0], event.id.split('|')[1],event.id.split('|')[2], event.value)
      this.getTotaux()
  }
  onDateChange(event: any) {
    this.hasAbsence=false
    this.hasOvertime=false
    this.myDate = new Date(event);
    this.lastDay = this.getDaysInMonth(this.myDate);
    this.days = [];
    for (let index = 1; index <= this.lastDay; index++) {
      this.days.push(index);
    }
    this.getAll()
  }

  getClass(n: any) {

    if (n > 1) {
      return 'alert'
    }
    // else if(n===0.5){
    //   return 'warning'
    // }
    // else if (n===1){
    //   return "perfect"
    // }
    else {
      return ""
    }
  }

  getDaysInMonth(date: Date) {
    let count = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    return count

  }
  detectChange(mission: string, jour: number, value: number) {
    this.update(mission, jour, "",value)

  }

  update(mission: string, jour: number, other:any,valeur: number) {
    let m: any;
    
    if(other==="Absence"){

    this.evenementsAbs.forEach(element => {

      if (element.mission == "Absence" ) {

        m = element.activite.find(ev => ev.jour == jour);

        if (m) {
          m.absence = valeur

        }

      }

    
     
    });
  }
  else if (other==='Overtime'){
    this.evenementsOver.forEach(element => {

      if (element.mission == "Overtime" ) {

        m = element.activite.find(ev => ev.jour == jour);

        if (m) {
          m.overtime = valeur
          
        }

      }

    
     
    });
  }
  else{
    this.evenements.forEach(element => {

      if (element.mission === mission) {
        m = element.activite.find(ev => ev.jour == jour);
        if (m) {
          if (valeur == 0.5)
            m.cota = 1
          else if (valeur == 1)
            m.cota = 0
          else
            m.cota = 0.5
        }


      }

    
     
    });
  }




  }


  getMission(event: any) {
    this.missionName = event.value;
  }
  addMission(n: number) {

    if (n == 1) {
      this.hasOvertime = true;
      this.evenementsOver.push({
        activite: this.activityService.getEmptyActivity(this.lastDay), absence: 0, typeEvent: 1, heuresup: 0, cota: 0, date: this.myDate, id: 0, jour: 0, mission: "Overtime"
      })

    }
    else if (n == 2) {
      this.hasAbsence = true;
      this.evenementsAbs.push({
        activite: this.activityService.getEmptyActivity(this.lastDay), absence: 0, typeEvent: 2, heuresup: 0, cota: 0, date: this.myDate, id: 0, jour: 0, mission: "Absence"
      })

    }
    else if (this.evenements.find(ev => ev.mission === this.missionName)) {
      alert("already exists")
    }

    else if (this.missionName === "" && n === 0) {
      alert("select mission!")
    }
    else {
      this.evenements.push({
        activite: this.activityService.getEmptyActivity(this.lastDay), absence: 0, typeEvent: 0, heuresup: 0, cota: 0, date: this.myDate, id: 0, jour: 0, mission: this.missionName
      })
    }

  }
  addAll() {
    return this.evenementsService.addAll([...this.evenements,...this.evenementsAbs,...this.evenementsOver],this.myDate).subscribe(data => console.log(data));
  }
  removeMission(mission:string){
    if(confirm("Are you sure to delete "+mission)) {
      this.evenements=this.evenements.filter(even=>even.mission!=mission)
    }
  }
    removeOvertime(){
      if(confirm("Are you sure to delete Overtime")) {
        this.evenementsOver=[]
        this.hasOvertime=false
      }
  }
    removeAbsence(){
      if(confirm("Are you sure to delete Absence")) {
        console.log(this.evenementsAbs);
        
        this.evenementsAbs=[]
        console.log(this.evenementsAbs);

        this.hasAbsence=false

      }
  }
  getTotaux() {
    this.totaux = new Map<number, number>();
    this.totauxOver = new Map<number, number>();
    this.totauxAbs = new Map<number, number>();

    this.totauxval = 0;
    this.totalOvert = 0;
    this.totalAbs = 0;
    this.evenements.forEach(element0 => {

      element0.activite.forEach(element => {
        this.totauxval += Number(element.cota);
        let oldelement = this.totaux.get(element.jour)
        
        if (oldelement !== undefined) {
          this.totaux.set(element.jour, Number(oldelement) + Number(element.cota))
        }
        else {
          this.totaux.set(element.jour, Number(element.cota))

        }
       
      });
    
    });



    

    this.evenementsOver.forEach(element0 => {

      element0.activite.forEach(element => {
  
        
        this.totalOvert += Number(element.overtime);
        let oldelementover = this.totauxAbs.get(element.jour)
        
        if (oldelementover !== undefined) {
          this.totauxAbs.set(element.jour, Number(oldelementover) + Number(element.overtime))
        }
        else {
          this.totauxAbs.set(element.jour, Number(element.overtime))

        }
        
      });
    
    });


    this.evenementsAbs.forEach(element0 => {

      element0.activite.forEach(element => {
      



      ////////


      this.totalAbs += Number(element.absence);
      let oldelementabs = this.totauxAbs.get(element.jour)
      
      if (oldelementabs !== undefined) {
        this.totauxAbs.set(element.jour, Number(oldelementabs) + Number(element.absence))
      }
      else {
        this.totauxAbs.set(element.jour, Number(element.absence))

      }




      });
    
    });

  }

}

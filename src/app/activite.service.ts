import { Injectable } from '@angular/core';
import { Activite } from './activite';

@Injectable({
  providedIn: 'root'
})
export class ActiviteService {
  emptyActivities:Activite[]=[
  
  ]
  constructor() { }
  getEmptyActivity(n:number){
    this.emptyActivities=[]
    for (let index = 1; index <= n; index++) {
      this.emptyActivities.push({cota:0,jour:index})
      
    }
    return this.emptyActivities
  }
}

import { Injectable } from '@angular/core';
import { Mission } from './mission';

@Injectable({
  providedIn: 'root'
})
export class MissionsService {
missions:Mission[]=[
  {name:"mission1"},
  {name:"mission2"},
  {name:"mission3"},
  {name:"mission4"},
  {name:"mission5"},
]
  constructor() { }

  getMission(){
    return this.missions
  }
}

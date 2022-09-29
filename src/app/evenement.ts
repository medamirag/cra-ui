import { Absence } from "./absence";
import { Activite } from "./activite";
import { Heuresup } from "./heuresup";
import { Mission } from "./mission";

export interface Evenement {

    mission:string;
    activite:Activite[];
    cota:number;
    date:Date;
    jour:number;
    id:number;
    heuresup:number;
    absence:number;
    typeEvent:number;




}

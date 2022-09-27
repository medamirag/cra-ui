import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvenementsComponent } from './evenements/evenements.component';
import { LoginComponent } from './login/login.component';
import { MissionComponent } from './mission/mission.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path:"test",component:TestComponent},
  {path:"",component:LoginComponent},
  {path:"home",component:EvenementsComponent},
  {path:"mission",component:MissionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

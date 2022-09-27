import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EvenementsComponent } from './evenements/evenements.component';
import {HttpClientModule} from '@angular/common/http';
import { TestComponent } from './test/test.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { MissionComponent } from './mission/mission.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    EvenementsComponent,
    TestComponent,
    UserComponent,
    LoginComponent,
    MissionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModalModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PEmployeeComponent } from './p-employee/p-employee.component';
import { EmployeeEvaluationComponent } from './p-employee/employee-evaluation/employee-evaluation.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderItemComponent } from './header/header-item/header-item.component';


@NgModule({
  declarations: [
    AppComponent,
    PEmployeeComponent,
    EmployeeEvaluationComponent,
    HeaderComponent,
    SidebarComponent,
    HeaderItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

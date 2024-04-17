import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderItemComponent } from './header/header-item/header-item.component';
import { QuestionBankComponent } from './p-employee/question-bank/question-bank.component';
import { SidebarItemComponent } from './sidebar/sidebar-item/sidebar-item.component';
import { QuestionItemComponent } from './p-employee/question-bank/question-item/question-item.component';
import { QuestionActionComponent } from './p-employee/question-bank/question-item/question-action/question-action.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSidenavModule } from '@angular/material/sidenav';
import { QuestionDrawerComponent } from './p-employee/question-drawer/question-drawer.component'
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HeaderItemComponent,
    QuestionBankComponent,
    SidebarItemComponent,
    QuestionItemComponent,
    QuestionActionComponent,
    QuestionDrawerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSidenavModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

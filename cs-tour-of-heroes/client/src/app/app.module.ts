import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesListComponent } from './crud-hero/component/heroes-list/heroes-list.component';
import { HeroDetailComponent } from './crud-hero/component/hero-detail/hero-detail.component';
import { AddHeroComponent } from './crud-hero/component/add-hero/add-hero.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeroesItemComponent } from './crud-hero/component/heroes-list/heroes-item/heroes-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesListComponent,
    HeroDetailComponent,
    AddHeroComponent,
    HeroesItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

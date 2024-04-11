import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesListComponent } from './crud-hero/component/heroes-list/heroes-list.component';
import { HeroDetailComponent } from './crud-hero/component/hero-detail/hero-detail.component';
import { AddHeroComponent } from './crud-hero/component/add-hero/add-hero.component';

const routes: Routes = [
  { path: '', redirectTo: "heroes", pathMatch: "full" },
  { path: "heroes", component: HeroesListComponent },
  { path: "heroes/:id", component: HeroDetailComponent },
  { path: "add", component: AddHeroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

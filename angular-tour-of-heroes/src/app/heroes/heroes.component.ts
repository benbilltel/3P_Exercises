import { Component, OnChanges, OnInit, inject } from '@angular/core';
import { Hero } from './iHeroes/hero';
import { CommonModule } from '@angular/common';
import { HeroService } from '../heroes/sHeroes/hero.service';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessageService } from '../messages/sMessage/message.service';
import { MessagesComponent } from '../messages/messages.component';
@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, HeroDetailComponent,MessagesComponent],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent {
  heroes: Hero[] = [];
  constructor(private heroService: HeroService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.getHeroes();
  }
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
  selectedHero?: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }
}
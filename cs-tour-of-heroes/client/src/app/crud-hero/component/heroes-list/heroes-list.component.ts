import { Component } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { DTOhero } from '../../DTOs/dtohero';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss'
})
export class HeroesListComponent {
  heroes!: DTOhero[]
  constructor(private sHero: HeroService,private router:Router) {

  }
  ngOnInit() {
    this.sHero.getAll().subscribe(heroesGot => {
      this.heroes = heroesGot;
    })
  }
  sendId(id: Number) {
    this.router.navigate(['/heroes/' + id]);
  } 
}

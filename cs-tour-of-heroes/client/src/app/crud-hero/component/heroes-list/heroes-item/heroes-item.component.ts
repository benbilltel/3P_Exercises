import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DTOhero } from '../../../DTOs/dtohero';

@Component({
  selector: 'app-heroes-item',
  templateUrl: './heroes-item.component.html',
  styleUrl: './heroes-item.component.scss'
})
export class HeroesItemComponent {
  @Input() heroes!: DTOhero[]
  @Output() getId = new EventEmitter<Number>
  sendId(id: Number | undefined) {
    this.getId.emit(id)
  }
}

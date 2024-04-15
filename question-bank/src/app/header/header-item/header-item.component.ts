import { Component, Input, OnInit } from '@angular/core';
import { DTOModule } from '../../dtos/dTOModule';

@Component({
  selector: 'app-header-item',
  templateUrl: './header-item.component.html',
  styleUrl: './header-item.component.scss'
})
export class HeaderItemComponent implements OnInit {
  @Input() modules: DTOModule[] = []
  ngOnInit(): void {
    console.log(this.modules)
  }
}

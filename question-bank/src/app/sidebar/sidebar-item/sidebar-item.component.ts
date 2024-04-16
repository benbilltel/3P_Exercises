import { Component, Input, OnInit } from '@angular/core';
import { DTOModule } from '../../dtos/dTOModule';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss'
})
export class SidebarItemComponent implements OnInit {
  @Input() modules?: DTOModule[] 
  ngOnInit(): void {
    
  }
}

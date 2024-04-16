import { Component, Input, OnInit } from '@angular/core';
import { DTOModule } from '../../dtos/dTOModule';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-item',
  templateUrl: './header-item.component.html',
  styleUrl: './header-item.component.scss'
})
export class HeaderItemComponent implements OnInit {
  @Input() modules: DTOModule[] = []
  currentUrl: string = ""
  constructor(private router: Router) { }
  ngOnInit(): void {
    
  }
  isActive(routePath: string = ""): boolean {
    this.currentUrl = this.router.url;
    return this.currentUrl.includes(routePath);
  }
}

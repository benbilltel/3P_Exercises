import { Component, OnInit } from '@angular/core';
import { ModulesService } from '../services/modules.service';
import { DTOModule } from '../dtos/dTOModule';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  modules: DTOModule[] = [];
  constructor(private moduleService: ModulesService) {
  }
  ngOnInit(): void {
    this.moduleService.modules$.subscribe(data=>{ 
      this.modules = data
    })
  }
}

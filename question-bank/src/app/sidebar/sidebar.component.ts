import { Component, OnInit } from '@angular/core';
import { ModulesService } from '../services/modules.service';
import { DTOModule } from '../dtos/dTOModule';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  modules: DTOModule[] = []
  constructor(private modulesService: ModulesService) { }
  ngOnInit(): void {
    this.modulesService.modules$.subscribe(data => {
      this.modules = data
    })
  }
}

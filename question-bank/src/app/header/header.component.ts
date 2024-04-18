import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModulesService } from '../services/modules.service';
import { DTOModule } from '../dtos/dTOModule';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  modules: DTOModule[] = [];
  private subscriptions: Subscription[] = [];
  constructor(private moduleService: ModulesService) {}
  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((sb) => sb.unsubscribe());
    }
  }
  ngOnInit(): void {
    this.subscriptions.push(
      this.moduleService.modules$.subscribe((data) => {
        this.modules = data;
      })
    );
  }
}

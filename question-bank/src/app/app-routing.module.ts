import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { QuestionBankComponent } from './p-employee/question-bank/question-bank.component';

const routes: Routes = [
  { path: "", redirectTo: "employee", pathMatch: "full" },
  { path: "employee", component: SidebarComponent, children: [{ path: "", redirectTo: "questionBank", pathMatch: "full" }, { path: "questionBank", component: QuestionBankComponent }] },
  { path: "config", component: SidebarComponent, children: [{ path: "", redirectTo: "questionBank", pathMatch: "full" }, { path: "questionBank", component: QuestionBankComponent }] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

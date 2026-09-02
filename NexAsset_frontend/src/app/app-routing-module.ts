import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Sidebar } from './components/sidebar/sidebar';
import { Dashboard } from './components/dashboard/dashboard';
import { Assets } from './components/assets/assets';
import { Employees } from './components/employees/employees';
import { Assignments } from './components/assignments/assignments';
import { History } from './components/history/history';
const routes: Routes = [ 
  { path: '', redirectTo: 'login', pathMatch: 'full' },
 
  { path: 'login', component: Login },
  { path: 'register', component:Register},
  { path: 'sidebar', component:Sidebar},
  { path: 'dashboard', component:Dashboard},
  { path: 'assets', component:Assets},
  { path: 'employees', component:Employees},
  { path: 'assignments', component:Assignments},
  { path: 'history', component:History}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

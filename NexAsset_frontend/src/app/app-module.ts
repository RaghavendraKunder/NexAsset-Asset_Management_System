import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

//components
import { Dashboard } from './components/dashboard/dashboard';
import { Assets } from './components/assets/assets';
import { Employees } from './components/employees/employees';
import { Assignments } from './components/assignments/assignments';
import { History } from './components/history/history';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Sidebar } from './components/sidebar/sidebar';

//Angular Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Angular Materials 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';

//HTTP
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
@NgModule({
  declarations: [
    App,
    Dashboard,
    Assets,
    Employees,
    Assignments,
    History,
    Login,
    Register,
    Sidebar,
  ],

  imports: [
    BrowserModule, 
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatMenuModule,
    MatListModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
  ReactiveFormsModule,],
  
  providers: [provideBrowserGlobalErrorListeners(), provideClientHydration(withEventReplay()),provideHttpClient(withFetch())],
  bootstrap: [App],
})
export class AppModule {}

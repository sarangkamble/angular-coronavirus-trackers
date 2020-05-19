import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { CountriesComponent } from './components/countries/countries.component';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { IndiaService } from './services/india.service';
import { IndiaComponent } from './components/india/india.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, NgbModule, AppRoutingModule, HttpClientModule, GoogleChartsModule],
  declarations: [ AppComponent, HomeComponent, NavbarComponent, CountriesComponent, DashboardCardComponent, IndiaComponent ],
  bootstrap:    [ AppComponent ],
  providers: [DataService, IndiaService]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CountriesComponent } from './components/countries/countries.component';
import { IndiaComponent } from './components/india/india.component';



const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'countries',component:CountriesComponent},

  {path:'countries/india',component:IndiaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

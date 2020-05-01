import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { GolbalDataSummary } from '../models/global.data';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  data : GolbalDataSummary[];
  countries : string[] = [];
  totalConfirmed = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  totalActive = 0;

  constructor(private service: DataService) { }

  ngOnInit() {

    this.service.getDateWiseData().subscribe(
      (result)=>{
        console.log(result)
      }
    )

    this.service.getGlobalData().subscribe(
      result=>{
        this.data = result;
        this.data.forEach(cs=>{
          this.countries.push(cs.country)
        })
      }
    )
  }

  updateValues(country : string){
    //console.log(country);
    this.data.forEach(cs=>{
      if(cs.country == country){
        this.totalActive = cs.active
        this.totalConfirmed = cs.confirmed
        this.totalDeaths = cs.deaths
        this.totalRecovered = cs.recovered
      }
    })


    
  }
}
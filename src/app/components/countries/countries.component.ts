import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { GolbalDataSummary } from "../models/global.data";
import { DateWiseData } from "../../models/datewise.data";
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { animation } from "@angular/animations";

@Component({
  selector: "app-countries",
  templateUrl: "./countries.component.html",
  styleUrls: ["./countries.component.css"]
})
export class CountriesComponent implements OnInit {
  data: GolbalDataSummary[];
  countries: string[] = [];
  totalConfirmed = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  totalActive = 0;
  selectedCountryData: DateWiseData[];
  dateWiseData;
  datatable = [];
  chart ={
    PieChart: 'PieChart',
    ColumnChart: 'ColumnChart',
    LineChart: 'LineChart',
    height: 500,
    options: {
        animation:{
          duration: 1000,
          easing: 'out',
        },
        is3D: true
      }

  }

  constructor(private service: DataService) {}

  ngOnInit(): void {

    merge(
      this.service.getDateWiseData().pipe(
        map(result=>{
          this.dateWiseData = result;
        })
      ),
      this.service.getGlobalData().pipe(map(result=>{
        this.data = result;
        this.data.forEach(cs => {
          this.countries.push(cs.country)
        })
      }))
    ).subscribe(
      {
        complete: ()=>{
          this.updateValues('India')
          // this.selectedCountryData = this.dateWiseData['India']
          // this.updateChart();
        }
      }
    )

  }

  updateChart() {

  this.datatable = []; 
   // this.datatable.push(["Date", "Cases"]);
    this.selectedCountryData.forEach(cs => {
      this.datatable.push([cs.date, cs.cases])
    })


  }

  updateValues(country: string) {
    //console.log(country);
    this.data.forEach(cs => {
      if (cs.country == country) {
        this.totalActive = cs.active;
        this.totalConfirmed = cs.confirmed;
        this.totalDeaths = cs.deaths;
        this.totalRecovered = cs.recovered;
      }
    });

    this.selectedCountryData = this.dateWiseData[country];
   // console.log(this.selectedCountryData);
    this.updateChart();
  }
}

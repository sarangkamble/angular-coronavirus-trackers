import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { GolbalDataSummary } from "../models/global.data";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  totalActive = 0;
  golbalData: GolbalDataSummary[];
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

        



  constructor(private dataService: DataService) {}

  initChart(caseType: string) {

  this.datatable = [];  
//    this.datatable.push(["Country", "Cases"]);
    this.golbalData.forEach(cs => {
      let value : number;

      if (caseType == 'c'){
        if (cs.confirmed > 2000){
          value = cs.confirmed
          //console.log('cccccccccccc'+value);
        }
      }

      if (caseType == 'a'){
        if (cs.active > 2000){
          value = cs.active
          //console.log('aaaaaaaaaaaa');
        }
      }

      if (caseType == 'd') 
        if (cs.deaths > 1000)
          value = cs.deaths

      if (caseType == 'r') 
        if (cs.recovered > 2000)
          value = cs.recovered
          
      this.datatable.push([cs.country, value]);
    });
    //
    //console.log(this.datatable)

  }

  ngOnInit() {
    this.dataService.getGlobalData().subscribe({
      next: result => {
        //        console.log(result);
        this.golbalData = result;
        result.forEach(cs => {
          if (!Number.isNaN(cs.confirmed)) {
            this.totalActive += cs.active;
            this.totalConfirmed += cs.confirmed;
            this.totalDeaths += cs.deaths;
            this.totalRecovered += cs.recovered;
          }
        });
        this.initChart('c');
      }
    });
  }

  updateChart(input: HTMLInputElement) {
    this.initChart(input.value);
    //console.log(input.value);
  }
}

import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { GolbalDataSummary } from "../models/global.data";
import { GoogleChartInterface } from "ng2-google-charts";

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
  pieChart: GoogleChartInterface = {
    chartType: "PieChart"
  };

  columnChart: GoogleChartInterface = {
    chartType: "ColumnChart"
  };

  constructor(private dataService: DataService) {}

  initChart(caseType: string) {
    let datatable = [];
    datatable.push(["Country", "Cases"]);
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
          
      datatable.push([cs.country, value]);
    });
    //
    this.pieChart = {
      chartType: "PieChart",
      dataTable: datatable,
      //firstRowIsData: true,

      options: {
        height: 500
      }
    };
    this.columnChart = {
      chartType: "ColumnChart",
      dataTable: datatable,
      //firstRowIsData: true,

      options: {
        height: 500
      }
    };
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
    console.log(input.value);
  }
}

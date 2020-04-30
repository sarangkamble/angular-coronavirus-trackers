import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { GolbalDataSummary } from '../models/global.data';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  totalConfirmed = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  totalActive = 0;
  golbalData: GolbalDataSummary[];
  pieChart: GoogleChartInterface = {

    chartType: 'PieChart'

  }

  constructor(private dataService: DataService) { }

  initChart(){
  let datatable = [];
  datatable.push(["Country", "Cases"])
  this.golbalData.forEach(cs=>{
    datatable.push[
      cs.country, cs.confirmed
    ]
  })

  this.pieChart = {
  chartType: 'PieChart',
  dataTable: datatable,
  //firstRowIsData: true,
  options: {'Country': 'Cases'},
};
}

  ngOnInit() {

    this.dataService.getGlobalData().subscribe({
      next: (result) => {
//        console.log(result);
        this.golbalData = result;
        result.forEach(cs=>{
          if(!Number.isNaN(cs.confirmed)){
            this.totalActive += cs.active
            this.totalConfirmed += cs.confirmed
            this.totalDeaths += cs.deaths
            this.totalRecovered += cs.recovered
          }
        })
        this.initChart();
      }
    })
  }

}
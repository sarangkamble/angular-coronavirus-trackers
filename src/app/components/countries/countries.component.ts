import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { GolbalDataSummary } from "../models/global.data";
import { DateWiseData } from "../../models/datewise.data";
import { GoogleChartInterface } from "ng2-google-charts";

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
  lineChart: GoogleChartInterface = {
    chartType: "LineChart"
  };

  constructor(private service: DataService) {}

  ngOnInit() {
    this.service.getDateWiseData().subscribe(result => {
      this.dateWiseData = result;
      this.updateChart();
      //console.log(result)
    });

    this.service.getGlobalData().subscribe(result => {
      this.data = result;
      this.data.forEach(cs => {
        this.countries.push(cs.country);
      });
    });
  }

  updateChart() {
    let dataTable = [];
    dataTable.push(["cases", "Date"]);
    this.selectedCountryData.forEach(cs => {
      dataTable.push([cs.cases, cs.date]);
    });
    this.lineChart = {
      chartType: "LineChart",
      dataTable: dataTable,
      //firstRowIsData: true,

      options: {
        height: 500
      }
    };
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
    console.log(this.selectedCountryData);
    this.updateChart();
  }
}

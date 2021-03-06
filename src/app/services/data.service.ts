import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GolbalDataSummary } from '../models/global.data';
import { DateWiseData } from '../models/datewise.data';
import {formatDate} from '@angular/common';
@Injectable()
export class DataService {

   dateYesterday: Date = new Date();
   yesterdayDate: string = formatDate(new Date(this.dateYesterday.setDate(this.dateYesterday.getDate() - 1)), 'MM-dd-yyyy', 'en');


private GOLBAL_DATA_URL = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${this.yesterdayDate}.csv`;


private DATEWISE_DATA_URL = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`;
  constructor(private _http: HttpClient) { }

  getDateWiseData(){
    return this._http.get(this.DATEWISE_DATA_URL, {responseType : 'text'})
      .pipe(map(result =>{
        let rows = result.split('\n');
        let mainData = {};
        
        let header = rows[0];
        let dates = header.split(/,(?=\S)/);
        dates.splice(0, 4);
        rows.splice(0, 1);

        rows.forEach(row=>{
          let cols = row.split(/,(?=\S)/);
          let con = cols[1];
          cols.splice(0, 4);
         // console.log(con, cols);
          mainData[con] = [];
          cols.forEach((value, index)=>{
            let dw : DateWiseData = {
              cases : + value,
              country : con,
              date : new Date(Date.parse(dates[index]))
            } 
            mainData[con].push(dw)
          })
        })
       // console.log(mainData)


//        console.log(dates);

        return mainData;
      }))
  }

  getGlobalData(){
    console.log(this.yesterdayDate);
    return this._http.get(this.GOLBAL_DATA_URL, {responseType : 'text'}).pipe(
      map(result=>{

        let data: GolbalDataSummary[] = [];
        let raw = {}
        let rows = result.split('\n');
        rows.splice(0,1);
        rows.forEach(row=>{
          let cols = row.split(/,(?=\S)/);
          let cs = {
            country : cols[3],
            confirmed : +cols[7],
            deaths : +cols[8],
            recovered : +cols[9],
            active : +cols[10]
          };
          
          let temp: GolbalDataSummary =raw[cs.country];
          if(temp){
            temp.active += cs.active
            temp.confirmed += cs.confirmed
            temp.deaths += cs.deaths
            temp.recovered += cs.recovered
            
            raw[cs.country] = temp;
          }else{
            raw[cs.country] = cs
          }
        })

        //console.log(raw);
        //return raw;
        return <GolbalDataSummary[]>Object.values(raw);
      })
    )
  }
}
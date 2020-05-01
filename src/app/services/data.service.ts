import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GolbalDataSummary } from '../models/global.data';

@Injectable()
export class DataService {

private GOLBAL_DATA_URL = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-30-2020.csv`;
private DATEWISE_DATA_URL = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`;
  constructor(private _http: HttpClient) { }

  getDateWiseData(){
    return this._http.get(this.DATEWISE_DATA_URL, {responseType : 'text'})
      .pipe(map(result =>{
        let rows = result.split('\n');
        
        let header = rows[0];
        let headerValues = header.split(/,(?=\S)/);
        console.log(headerValues);
        return result;
      }))
  }

  getGlobalData(){
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
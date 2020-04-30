import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {

private globalDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-29-2020.csv`;
  constructor(private _http: HttpClient) { }

  getGlobalData(){
    return this._http.get(this.globalDataUrl).pipe(
      map(result=>{
        console.log(result)
      })
    )
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class IndiaService {

  private INDIA_DATA_URL =`https://api.covid19india.org/state_district_wise.json`;

  constructor(private _http: HttpClient) { }

  getData(){
    console.log('IndiaService');
    return this._http.get(this.INDIA_DATA_URL);
  }

}
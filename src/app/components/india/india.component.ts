import { Component, OnInit } from '@angular/core';
import { IndiaService } from '../../services/india.service';

@Component({
  selector: 'app-india',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.css']
})
export class IndiaComponent implements OnInit {

  data = '';

  constructor(private service: IndiaService) { }

  ngOnInit() {

    this.getData();

  }

  getData(){
    this.service.getData().subscribe({
      next: result => {
        this.data = result;
        console.log(this.data)
      }
    })
  }

}
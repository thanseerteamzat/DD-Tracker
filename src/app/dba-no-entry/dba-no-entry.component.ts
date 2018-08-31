import { Component, OnInit } from '@angular/core';
import { Center } from "src/app/models/Center";
import { EtsService } from "src/app/services/ets.service";

@Component({
  selector: 'app-dba-no-entry',
  templateUrl: './dba-no-entry.component.html',
  styleUrls: ['./dba-no-entry.component.css']
})
export class DbaNoEntryComponent implements OnInit {

  centers: Center[] = [];
  
  constructor(private ets: EtsService) { 
    let that = this;
    this.ets.GetAllCenters().subscribe(data => {
      that.centers = data;
      },
      error => console.log(error),
      () => console.log('Get all complete'));

  }

  ngOnInit() {
  }

}

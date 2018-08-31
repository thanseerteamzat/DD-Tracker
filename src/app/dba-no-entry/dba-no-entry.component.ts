import { Component, OnInit } from '@angular/core';
import { Center } from "src/app/models/Center";
import { EtsService } from "src/app/services/ets.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dba-no-entry',
  templateUrl: './dba-no-entry.component.html',
  styleUrls: ['./dba-no-entry.component.css']
})
export class DbaNoEntryComponent implements OnInit {

  centers: Center[] = [];
  
  constructor(private ets: EtsService,private router:Router) { 
    let that = this;
    this.ets.GetAllCenters().subscribe(data => {
      that.centers = data;
      },
      error => console.log(error),
      () => console.log('Get all complete'));

  }

  ngOnInit() {
    if (this.ets.cookievalue == "2"|| this.ets.cookievalue == "3") {
      this.router.navigate(['/dba-no-entry'])
    }
    else {
      this.router.navigate(['/error']);
    }
  }

}

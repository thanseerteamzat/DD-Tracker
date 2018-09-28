import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { EtsService } from '../services/ets.service';
import { FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Center } from '../models/Center';
import { ddfromKKC } from '../models/ddktc';

@Component({
  selector: 'app-ddkkc',
  templateUrl: './ddkkc.component.html',
  styleUrls: ['./ddkkc.component.css']
})
export class DdkkcComponent implements OnInit {
  
  skipValue;
  limitValue;
  fromDate;
  toDate;
  centers: Center[];
  ddkkc:ddfromKKC[];  

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private router: Router,
    private http: HttpClient,
    private config: ConfigService,
    private ets: EtsService,
    private fb: FormBuilder,
    private cookieservice: CookieService


  ) {

    let that = this;
    this.ets.GetAllCenters().subscribe(data => {
      that.centers = data;
      console.log(that.centers)
      this.ets.centerList = this.centers;

    },
      error => console.log(error),
      () => console.log('Get all complete'));



      // let thatt = this;
      // this.ets.GetddfromTtc().subscribe(data => {
      //   that.ddkkc = data;
      //   console.log(that.ddkkc)
      //   // this.ets.centerList = this.centers;
  
      // },
      //   error => console.log(error),
      //   () => console.log('Get all complete'));
   }

  ngOnInit() {

    if (this.ets.cookievalue == "1" ||this.ets.cookievalue == "2" || this.ets.cookievalue == "3") {
      // this.router.navigate(['/dd-verification'])
    }
    else {
      this.router.navigate(['/error']);
    }
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(), 
      year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [day, month, year].join('-');
  }
  
  getDd(){

console.log(this.skipValue);
console.log(this.fromDate);
console.log(this.toDate);
console.log(this.limitValue);
let fromDate=this.formatDate(this.fromDate);
let toDate=this.formatDate(this.toDate);
console.log(this.fromDate,this.toDate);


let thatt = this;
this.ets.GetddfromTtc( fromDate, toDate,this.skipValue,this.limitValue).subscribe(data => {
  thatt.ddkkc = data;
  console.log(thatt.ddkkc)
  console.log(data)
  // this.ets.centerList = this.centers;

},
  error => console.log(error),
  () => console.log('Get all complete'));
}


    // console.log(fromDate ,'fromDate' , toDate , 'toDate' , skipValue ,'skipvalue')

  }

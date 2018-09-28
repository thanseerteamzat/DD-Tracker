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



      let thatt = this;
      this.ets.GetddfromTtc().subscribe(data => {
        that.ddkkc = data;
        console.log(that.ddkkc)
        // this.ets.centerList = this.centers;
  
      },
        error => console.log(error),
        () => console.log('Get all complete'));
   }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { CookieService } from 'ngx-cookie-service';
import { EtsService } from './services/ets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DD Tracker';
  Date = '10/11/2018(11.45pm)';
  version = 'V 6.1.2'
  // userId:[];
  cookievalue;
  expiredDate: Date;
  constructor(private route: ActivatedRoute, private cookieService: CookieService, public ets: EtsService) { }
  ngOnInit() {


    this.route.queryParams.subscribe(params => {
      var userId = params['u'];
      let password = params['p'];
      let privilege = params['q']
      let centerName=params['c']
      let userType=params['t']

      try {
        var u = window.atob(userId);
        var c = window.atob(centerName);
        var t = window.atob(userType);

        this.ets.cookievalue = privilege;
        this.ets.cookiename = u;

        this.ets.cookiecenter=c;
        this.ets.cookieuser=t;

        console.log('aaaaaaaaaaaaaaasaaa', privilege);
        console.log('*********************',c)
        console.log('usr type',t)
        this.expiredDate = new Date();
        this.expiredDate.setDate(this.expiredDate.getDate() + 1);
        this.ets.setCookie(this.ets.cookiename, this.ets.cookievalue, this.expiredDate,this.ets.cookieuser,this.ets.cookiecenter )
   
      // console.log('cookiee user' ,this.ets.cookieuser )
      }
      catch (e) {
        console.log(e);
      }



    });
  }



}

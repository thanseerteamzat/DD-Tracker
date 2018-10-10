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
  Date = '09/10/2018(11:00pm)';
  version = 'V 3.4.13'
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

      try {
        var u = window.atob(userId);
        var c =window.atob(centerName);

        this.ets.cookievalue = privilege;
        this.ets.cookiename = u;

        this.ets.cookiecenter=c;
        

        console.log('aaaaaaaaaaaaaaasaaa', privilege);
        console.log('*********************',c)
        this.expiredDate = new Date();
        this.expiredDate.setDate(this.expiredDate.getDate() + 1);
        this.ets.setCookie(this.ets.cookiename, this.ets.cookievalue, this.expiredDate,this.ets.cookiecenter)
   
      
      }
      catch (e) {
        console.log(e);
      }



    });
  }



}

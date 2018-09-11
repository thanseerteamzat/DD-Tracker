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
  version = '11/09/2018(N)';
  // userId:[];
  cookievalue;
  expiredDate: Date;
  constructor(private route: ActivatedRoute, private cookieService: CookieService, private ets: EtsService) { }
  ngOnInit() {


    this.route.queryParams.subscribe(params => {
      var userId = params['u'];
      let password = params['p'];
      let privilege = params['q']
      


      try {
        var u = window.atob(userId);
        this.ets.cookievalue = privilege;
      this.ets.cookiename = u;
      console.log('aaaaaaaaaaaaaaaaaa', privilege);
      this.expiredDate = new Date();
      this.expiredDate.setDate(this.expiredDate.getDate() + 1);
      this.ets.setCookie(this.ets.cookiename, this.ets.cookievalue, this.expiredDate)

      }
      catch (e) {
        console.log(e);
      }



    });
  }



}

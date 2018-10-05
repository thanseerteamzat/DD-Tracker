import { Component, OnInit } from '@angular/core';
import { EtsService } from '../services/ets.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-kkc-sro-entry',
  templateUrl: './kkc-sro-entry.component.html',
  styleUrls: ['./kkc-sro-entry.component.css']
})
export class KkcSroEntryComponent implements OnInit {
  mytime: Date = new Date();
  minDate: Date;
  maxDate : Date;
  enteredBy;
  todaydate=new Date;
  isformOpen :boolean;
  // isEditable;
  isEditMode;
  values = [
    { id: '1', name: 'Yes' },
    { id: '2', name:'No'}
  


  ];

  todaydatee= new Date;
    constructor(  private ets: EtsService,
      private cookieservice: CookieService
    ) {
    this.minDate = new Date();
    this.maxDate = new Date();

    this.minDate.setDate(this.minDate.getDate() - 5);
    this.maxDate.setDate(this.maxDate.getDate() + 0);

   }

  ngOnInit() {
    this.enteredBy = this.ets.cookiename;
    console.log('entered by',this.enteredBy);
  
  }
  myfunction(value){
    console.log(value);
    if(value == "Yes"){
      this.isformOpen=true;
    }
  else{
    this.isformOpen=false;
  }
  }
}

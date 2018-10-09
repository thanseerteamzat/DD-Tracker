import { Component, OnInit } from '@angular/core';
import { EtsService } from '../services/ets.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { ConfigService } from '../services/config.service';
import { FormBuilder } from '@angular/forms';
import { Center } from '../models/Center';
import { sroEntryList, sroEntry } from '../models/sroEntry';
import { Common } from '../models/common';

@Component({
  selector: 'app-srodailyreport',
  templateUrl: './srodailyreport.component.html',
  styleUrls: ['./srodailyreport.component.css']
})
export class SrodailyreportComponent implements OnInit {
  selectedData;
  isEditMode;
  enteredBy;
  selectedcenter;
  ishoLogin:boolean; 
  sroLists: sroEntryList[] = [];
  selectedmonth;  
  centers: Center[];
  months = [
    { id: '01', name: 'JAN' },
    { id: '02', name: 'FEB' },
    { id: '03', name: 'MARCH' },
    { id: '04', name: 'APRIL' },
    { id: '05', name: 'MAY' },
    { id: '06', name: 'JUNE' },
    { id: '07', name: 'JULY' },
    { id: '08', name: 'AUG' },
    { id: '09', name: 'SEP' },
    { id: '10', name: 'OCT' },
    { id: '11', name: 'NOVEMBER' },
    { id: '12', name: 'DECEMBER' },



  ];

  
  constructor(  private ets: EtsService,
    private cookieservice: CookieService,
    private route: ActivatedRoute,
  private db: AngularFireDatabase,
  private router: Router,
  // private http: HttpClient,
  private config: ConfigService,
  private fb: FormBuilder,) {



    let that = this;
    this.ets.GetAllCenters().subscribe(data => {
      that.centers = data;
      this.ets.centerList = this.centers;

    },
      error => console.log(error),
      () => console.log('Get all complete'));

      let itemReff = db.object('sroEntry');
      itemReff.snapshotChanges().subscribe(action => {
        this.sroLists = [];
        var quatationsList = action.payload.val();
        let quotationobj = Common.snapshotToArray(action.payload);
        quotationobj.forEach(element => {
          let ddListItem = new sroEntryList();
          let qobj: sroEntry = JSON.parse(element);
          // console.log("****" + element);
          if (qobj.sroId != undefined) {
            qobj.sroId = qobj.sroId.replace("/", "");
          }
  
          ddListItem.ddenter = qobj;
  
          // let custList = this.ets.centerList.filter(s => s.Id == (qobj.centerId));
          // // console.log('2222222222222222222222222222',custList)
          // if (custList.length > 0) {
          //   ddListItem.center = custList[0];
          // }
  
          this.sroLists.push(ddListItem);
          // console.log('length***************************',this.sroLists.length);
  
        });
      });
  


   }

  ngOnInit() {

    this.enteredBy = this.ets.cookiename;
    this.selectedcenter = this.ets.cookiecenter;
    console.log('entered by',this.enteredBy);
    if(this.selectedcenter == null)
    {
      this.ishoLogin=true;
    }
    else{
      this.ishoLogin=false;
    }
    console.log('isho login', this.ishoLogin)

    if (this.ets.cookievalue == "1" || this.ets.cookievalue == "2" || this.ets.cookievalue == "3") {
      // this.router.navigate(['/dd-entry'])
    }
    else {
      // this.router.navigate(['/error']);
    }

  }


  filter(value){
   
   
    console.log(value);
    this.selectedmonth=value;
    this.selectedData = this.sroLists.filter(
      s=> this.getMothFromDate(s.ddenter.date)== value
    )
    console.log(this.selectedData)

    function groupBy( array , f )
{
  var groups = {};
  array.forEach( function( o )
  {
    var group = JSON.stringify( f(o) );
    groups[group] = groups[group] || [];
    groups[group].push( o );  
  });
  return Object.keys(groups).map( function( group )
  {
    return groups[group]; 
  })
}

var result = groupBy(this.sroLists, function(item)
{
  return [item.lastname, item.age];
});
  }
  getMothFromDate(dateData) {
    if (dateData != null) {
      var month = dateData.toString().slice(3, -5)
      console.log('month**',month)
      return month;
    }

  }

}

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
import { Common } from '../models/common';
import { kkcId } from '../models/kkcId';

@Component({
  selector: 'app-ddkkc',
  templateUrl: './ddkkc.component.html',
  styleUrls: ['./ddkkc.component.css']
})
export class DdkkcComponent implements OnInit {
  ddLastids: kkcId[] = [];
  newddLastId: kkcId = new kkcId();
  count;
temp;
  fromLastId;
  tempfromDate;
  temptoDate;  
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


    let itemRef = db.object('kkcId');
    itemRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      this.ddLastids = [];
      obj.forEach(element => {
        let obj: kkcId = JSON.parse(element);
        this.newddLastId = obj;
        this.ddLastids.push(obj as kkcId);
        this.temp=this.ddLastids       

        // console.log('aaaaaaaaaaaaaaaaaaaa', this.ddLastids)
        this.count = obj.lastId;
        this.fromLastId = obj.Id;

      });
    });



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
      // this.router.navigate(['/error']);
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
this.tempfromDate=this.formatDate(this.fromDate);
this. temptoDate=this.formatDate(this.toDate);

console.log('fromdate',this.tempfromDate)
console.log(this.tempfromDate)

console.log('todate',this.temptoDate)
console.log('skip',this.skipValue)
console.log('limit',this.limitValue)


let thatt = this;
this.ets.GetddfromTtc( this.tempfromDate, this.temptoDate,this.skipValue,this.limitValue).subscribe(data => {
  thatt.ddkkc = data;
  console.log(thatt.ddkkc)
  console.log(data)
  // this.ets.centerList = this.centers;

},
  error => console.log(error),
  () => console.log('Get all complete'));
}


    // console.log(fromDate ,'fromDate' , toDate , 'toDate' , skipValue ,'skipvalue')

    DdtoDB(key, dlastid: kkcId){

    var counter = parseInt(this.count) + 1;
    var updates = {};
   
    for(let i=0;i<=this.ddkkc.length;i++){
      // key=key+1;
    let kkcJson = JSON.stringify(this.ddkkc[i]);
    console.log(kkcJson);
    try {
      this.db.database.ref('ddkkc').child(counter.toString()).set(kkcJson);
     
    }
    catch (ex) {
     console.log(ex);
    } 
    counter=counter+1;
         
  }
  counter=counter-2;
  dlastid.lastId = counter;
  
  updates['/kkcId/' + key] = JSON.stringify(dlastid);      
  let up = this.db.database.ref().update(updates);
  alert("Added Successfully")
}
  }

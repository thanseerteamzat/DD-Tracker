import { Component, OnInit } from '@angular/core';
import { Center } from '../models/Center';
import { Course } from '../models/Course';

import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../models/common';
import { ddEntry, ddList } from '../models/ddEntry';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConfigService } from "src/app/services/config.service";
import { EtsService } from "src/app/services/ets.service";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ddLastid } from '../models/ddLastid';
import { erpDespatch } from '../models/erpdespatch'
import { erpDespatchId}from '../models/erpdespId'
import { ddentryTemp } from '../models/ddentryTemp';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-erpdespatch-entry',
  templateUrl: './erpdespatch-entry.component.html',
  styleUrls: ['./erpdespatch-entry.component.css']
})
export class ErpdespatchEntryComponent implements OnInit {
  count;
  erpdespatchList:erpDespatch[]=[];
  ddLastids: erpDespatchId[] = [];
  fromLastId;

  erpdespNo;
  selectedcenter;
  selectedamount;
  selectednodd;
  tempcenterList
  todaydate=new Date;
  centerList: Center[] = [];
  newddLastId: erpDespatchId = new erpDespatchId();

  selecteddate;
  todaydatee=new Date;
  selecteddatee;
  erpdespatch:erpDespatch = new erpDespatch();
  centers:Center[];
  ngOnInit(){

  }
  constructor(  private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private router: Router,
    private http: HttpClient,
    private config: ConfigService,
    private ets: EtsService,
    private fb: FormBuilder,
    private cookieservice: CookieService){


      let itemRef = db.object('erpdespatchId');
      itemRef.snapshotChanges().subscribe(action => {
        var quatationsList = action.payload.val();
        let obj = Common.snapshotToArray(action.payload);
        this.ddLastids = [];
        obj.forEach(element => {
          let obj: erpDespatchId = JSON.parse(element);
          this.newddLastId = obj;
          // console.log(obj,'****************************obj')
          this.ddLastids.push(obj as erpDespatchId);

          // console.log('aaaaaaaaaaaaaaaaaaaa', this.ddLastids)
          this.count = obj.lastId;
          this.fromLastId = obj.Id;
          
  
        });
      });
  



      let erpdespatchitemRef = db.object('erpdespatch');
      erpdespatchitemRef.snapshotChanges().subscribe(action => {
        let erpobj = Common.snapshotToArray(action.payload);
        erpobj.forEach(element => {
          let obj: erpDespatch = JSON.parse(element);
          this.erpdespatchList.push(obj);
        });
      });


      console.log('******************************',this.erpdespatchList)

  let that = this;
  this.ets.GetAllCenters().subscribe(data => {
    that.centers = data;
    this.ets.centerList = this.centers;

  },
    error => console.log(error),
    () => console.log('Get all complete'));



   

    
}

clickme(name){
  console.log('******************',name)
var str;
  str=(name.match(/.{1,4}/g)); 
var abc=str[1];
console.log(abc)
let centerResponse = this.ets.centerList;
//  Iterate throw all keys.
for (let cent of centerResponse) {

  this.centerList.push(cent);

}
console.log(this.centerList.length)
try{
for(let i=0;i<=this.centerList.length;i++){
  this.tempcenterList=this.centerList[i];
  if(this.tempcenterList.CenterCode==abc){
    this.selectedcenter=this.tempcenterList.CenterName;
    console.log(this.selectedcenter)

  }
  // console.log(i)
}}
catch(x){

}
}
formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(), 
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

entrySelection(erpdespId,despenter:erpDespatch) {
console.log(despenter);
console.log(erpdespId)
this.router.navigate(['/erpdesp-details/' + erpdespId])


}
register(key, dlastid: erpDespatchId){
  console.log('checkkk',key)
  // this.router.navigate(['/dd-entry']);
   var counter = parseInt(this.count) + 1;
   console.log(counter,'****************************countrr')
  // var updates = {};
  // dlastid.lastId = counter;
  // console.log(dlastid.lastId,'lastiddddddddddddddddddddd')
  // updates['/erpdespatchId/'+ key] = JSON.stringify(dlastid);
  
  // this.erpdespatch.centerName=this.selectedcenter;
  // this.erpdespatch.erpAmount=this.selectedamount;
  // this.erpdespatch.noofDd=this.selectednodd;
  // this.selecteddate=this.todaydate
  // this.erpdespatch.date=this.formatDate(this.selecteddate);
  // this.selecteddatee=this.todaydatee;
  // this.erpdespatch.erpdate=this.formatDate(this.selecteddatee);
  // this.erpdespatch.centerName=this.selectedcenter;
  // this.erpdespatch.erpdespNo=this.erpdespNo;
  // var str=this.erpdespNo;
  // str=(str.match(/.{1,4}/g)); 
  // var abc=str[1];
  // console.log(abc,'1111111111')
  // console.log(str,'*************************')
  // let uniqueId = "/Q" + Common.newGuid();
  // console.log("****" + uniqueId);
  // this.erpdespatch.erpdespId = counter.toString();

  // let erpDespatchJson = JSON.stringify(this.erpdespatch);
  // console.log(erpDespatchJson);
  // try {
  //   this.db.database.ref('erpdespatch').child(counter.toString()).set(erpDespatchJson);
  //   alert("Added Successfully");
  //   this.router.navigate(['/erp-despatch-entry']);
  // }
  // catch (ex) {
  //   alert("Error in adding Quotation");
  // }
}


}


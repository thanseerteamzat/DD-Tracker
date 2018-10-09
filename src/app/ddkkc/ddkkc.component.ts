import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { EtsService } from '../services/ets.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Center } from '../models/Center';
import { ddfromKKC, kkcddList } from '../models/ddktc';
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
  ddLists: kkcddList[] = [];
  tempddlist
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



    this.ddcreateForm();
    
    let itemReff = db.object('ddkkc');
    itemReff.snapshotChanges().subscribe(action => {
      this.ddLists = [];
      var quatationsList = action.payload.val();
      let quotationobj = Common.snapshotToArray(action.payload);
      quotationobj.forEach(element => {
        let ddListItem = new kkcddList();
        let qobj: ddfromKKC = JSON.parse(element);
        // console.log("****" + element);
        if (qobj.slno != undefined) {
          qobj.slno = qobj.slno.replace("/", "");
        }

        ddListItem.ddenter = qobj;

        // let custList = this.ets.centerList.filter(s => s.Id == (qobj.centerId));
        // // console.log('2222222222222222222222222222',custList)
        // if (custList.length > 0) {
        //   ddListItem.center = custList[0];
        // }

        this.ddLists.push(ddListItem);

      });

    });






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

    if (this.ets.cookievalue != null && (this.ets.cookievalue.indexOf('x1') !==-1 ) || (this.ets.cookievalue == "All"))  {
      console.log('inside if condition *********************')
      // this.router.navigate(['/dd-entry'])
    }
    else {
      this.router.navigate(['/error']);
    }
    // if (this.ets.cookievalue == "1" ||this.ets.cookievalue == "2" || this.ets.cookievalue == "3") {
    //   // this.router.navigate(['/dd-verification'])
    // }
    // else {
    //   this.router.navigate(['/error']);
    // }
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

    beforeRegister(key, dlastid: kkcId){

      try {
        var ddExists = false;
        for (let i = 0; i <= this.ddLists.length; i++) {
          this.tempddlist = this.ddLists[i];
          for(let j=0; j<=this.ddkkc.length;j++){
          if (this.tempddlist.ddenter != null && this.tempddlist.ddenter.id == this.ddkkc[j].id) {
            ddExists = true;
            break;
          }
        }}
        console.log('fdf', ddExists);
        //   if(applicationNoExists)
        // {
        //   console.log(applicationNoExists);
        //   alert('Application number duplication');
        // }
        if (ddExists === false) {
          console.log(ddExists);
          this.register(key, dlastid);
        }
        else{
          alert('dd duplication , please check')
        }
        // if (a != 1) {
        //   this.register(key, dlastid);
        //     }
      }
      catch (x) {
        console.log(x);
      }
    }


    register(key, dlastid: kkcId){

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
    //  console.log(ex);
    } 
    counter=counter+1;
         
  }
  counter=counter-2;
  dlastid.lastId = counter;
  
  updates['/kkcId/' + key] = JSON.stringify(dlastid);      
  let up = this.db.database.ref().update(updates);
  alert("Added Successfully")
  this.resetForm();
}


ddentryForm = new FormGroup({

  // currentDate: new FormControl(),
  fromDatee: new FormControl(),
  toDatee: new FormControl(),
  skipValuee: new FormControl(),
  limitValues: new FormControl(),
})

ddcreateForm() {
  this.ddentryForm = this.fb.group(
    {
      // currentDate: [null, Validators.required],
      fromDatee: [null, Validators.required],
      toDatee: [null, Validators.required],
      skipValuee: [null, Validators.required],
      limitValues: [null, Validators.required],
     
     
     

    }
  )
}

  get fromDatee() { return this.ddentryForm.get('fromDatee'); }
  get toDatee() { return this.ddentryForm.get('toDatee'); }
  get skipValuee() { return this.ddentryForm.get('skipValuee'); }
  get limitValues() { return this.ddentryForm.get('limitValues'); }
  

  resetForm() {
    this.ddentryForm.reset(
      {
        // currentDate: null,
        fromDatee: null,
        toDatee: null,
        skipValuee: null,
        limitValues: null,
       }
    )
  }
}  

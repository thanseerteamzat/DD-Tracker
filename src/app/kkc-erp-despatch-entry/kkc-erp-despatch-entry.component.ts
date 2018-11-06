import { Component, OnInit } from '@angular/core';
import { AcadamicService } from '../services/acadamic.service';
import { Center, CenterData } from '../models/Center';
import { kkcerpDespatch,  erpData } from '../models/kkcErpdespatch';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { EtsService } from '../services/ets.service';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Common } from '../models/common';
import { erpDespatch } from '../models/erpdespatch';

@Component({
  selector: 'app-kkc-erp-despatch-entry',
  templateUrl: './kkc-erp-despatch-entry.component.html',
  styleUrls: ['./kkc-erp-despatch-entry.component.css']
})
export class KkcErpDespatchEntryComponent implements OnInit {
  centerList: Center[] = [];
  centers: CenterData;
  enteredDate = new Date;
  message : string;
  enteredTime = new Date;
  selectedenteredDate;
  selectedenteredTime;
  
  tempcenterList;
  erpEntries : erpData;
  selectedcenter;
  newerpentry:kkcerpDespatch = new kkcerpDespatch();
  // kkcerpdespatch: kkcerpDespatch;
  kkcerpdespatch: kkcerpDespatch = new kkcerpDespatch();
  enteredBy;
  userType;
  id;
  isSroLogin:boolean;
  // remarks;
  erpdespNo;
  // erpAmount;
  // noofDd;
  erpDate = new Date;
  Date = new Date;
  selectedDate;
  erpList = new Array<kkcerpDespatch>();
  serialNo : number;
  selectederpDate;
  isEditMode : boolean;
  constructor(private academic: AcadamicService,
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private router: Router,
    private http: HttpClient,
    private config: ConfigService,
    private ets: EtsService,
    private fb: FormBuilder,
    private cookieservice: CookieService
  ) {
    this.id = this.route.snapshot.paramMap.get('erpId');
    this.selectedenteredDate = this.formatDate(this.enteredDate);
    this.selectedenteredTime = this.formatTime(this.enteredTime)
    this.getAllkkccenters();
    this.ddcreateForm();
    this.getErpEntry();    
    if(this.id != undefined){     
       this.isEditMode  = true;
       console.log('isEditmode',this.isEditMode)
     }    
    }

  ngOnInit() {
    this.enteredBy = this.ets.cookiename;
    this.selectedcenter = this.ets.cookiecenter;

    console.log('*******************',this.selectedcenter)
    console.log('entered by', this.enteredBy);
    this.userType = this.ets.cookieuser;
    console.log(this.userType);
    if ((this.userType == "SRO" || this.userType == "KKC")) {
      console.log('it is sro');
      this.isSroLogin = true;
    }
    else {
      console.log('It is not sro')
    }
    // if(this.userType.indexOf('Admin') !== -1 && this.ets.cookieuser != null){
    //   console.log('it is ho');      
     //   this.isHoLogin = true;
    // }
    if (this.ets.cookievalue != null && (this.ets.cookievalue.indexOf('x6') !== -1) || (this.ets.cookievalue == "All")) {
      console.log('inside if condition *********************')
    }
    else {
      // this.router.navigate(['/error']);
    }
  }



  formatTime(time) {
    var d = new Date(time),
      hours = '' + (d.getHours()),
      minutes = '' + d.getMinutes(),
      seconds = d.getSeconds();
    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    return [hours, minutes].join('-');
  }

  getAllkkccenters() {
    this.academic.GetAllCenters().subscribe(resdata => {
      this.centers = resdata;
      console.log(resdata);
      this.centerList = new Array<Center>();
      for (let i = 0; i <= resdata.Data.length; i++) {
        if (resdata.Data[i] != null) {
          let c = new Center();
          c.Id = resdata.Data[i].Id;
          c.CenterCode = resdata.Data[i].CenterCode;
          c.CenterName = resdata.Data[i].CenterName;
          c.DistrictId = resdata.Data[i].DistrictId;
          this.centerList.push(c);
        }
      }
    },
      err => {
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      })

  }

  clickme(name) {
    var str;
    str = (name.match(/.{1,2}/g));
    var abc = str[2];
    console.log(abc)
    try {
      for (let i = 0; i <= this.centerList.length; i++) {
        var tempcenterList = this.centerList[i];
        console.log(tempcenterList.CenterCode)
        if (tempcenterList.CenterCode == abc) {
          this.selectedcenter = tempcenterList.CenterName;
          console.log(this.selectedcenter);
          break;
        }
      }
    }
    catch (x) {
    }
  }

  register() {

    let uniqueId = "ERP" + Common.newGuid();
    this.kkcerpdespatch.unique = uniqueId;
    this.kkcerpdespatch.remarks = this.newerpentry.remarks;
    this.kkcerpdespatch.noofDd = this.newerpentry.noofDd;
    this.kkcerpdespatch.centerName = this.selectedcenter;
    this.kkcerpdespatch.erpAmount = this.newerpentry.erpAmount;
   this.kkcerpdespatch.feesItem = this.newerpentry.feesItem;
    this.selectedDate = this.Date;
    // this.kkcerpdespatch.date = this.formatDate(this.selectedDate);
    this.selectederpDate = this.erpDate;
    this.kkcerpdespatch.erpdate = this.formatDate(this.selectederpDate);
    var temp = this.getMonthFromDate(this.kkcerpdespatch.erpdate);
    // switch(temp){
    //   case '01' :  
    // }
    this.kkcerpdespatch.erpdespNo = this.erpdespNo;
    this.kkcerpdespatch.enteredDate = this.selectedenteredDate;
    this.kkcerpdespatch.enteredTime =this.selectedenteredTime;
    console.log(this.erpdespNo)
    console.log(this.kkcerpdespatch);
    try{
    this.academic.AddKkcErpEntry(this.kkcerpdespatch)
    alert('Added Succesfully')
  }
    catch(ex){
      alert('error in adding Erp despatch')
    }
   this.getErpEntry();  
   this.resetForm();  
  
  
  
  }

  update(){
    console.log('inside update function')

    this.kkcerpdespatch.centerName = this.selectedcenter;

    // if(this.newerpentry.date.length <= 10){
    //   this.kkcerpdespatch.date = this.newerpentry.date;
    // }
    // else{
    //   this.kkcerpdespatch.date = this.formatDate(this.newerpentry.date)
    // }

    if(this.newerpentry.erpdate.length <= 10){
      this.kkcerpdespatch.erpdate = this.newerpentry.erpdate;
    }
    else{
      this.kkcerpdespatch.erpdate = this.formatDate(this.newerpentry.erpdate)
    }
    this.kkcerpdespatch.feesItem = this.newerpentry.feesItem;
    this.kkcerpdespatch.erpAmount = this.newerpentry.erpAmount;
    this.kkcerpdespatch.erpdespNo = this.erpdespNo;
    this.kkcerpdespatch.ID = this.newerpentry.ID;
    this.kkcerpdespatch.noofDd = this.newerpentry.noofDd;
    this.kkcerpdespatch.remarks = this.newerpentry.remarks;
    this.kkcerpdespatch.unique = this.newerpentry.unique;
    console.log(this.kkcerpdespatch);
    if (confirm('Are you sure to update details')) {

    this.academic.updateKkcErpEntry(this.kkcerpdespatch);

    alert('updated successfully')
    }
    this.getErpEntry();
    console.log('hai')
this.resetForm();
    this.router.navigate[('../dd-entry')];
    
  }

  getErpEntry(){
    
    let that = this;
    that.academic.GeterpEntry().subscribe(data => {
      that.erpEntries = data;
      console.log("hi************")
      console.log(that.erpEntries, 'ERP Entries');
      this.erpList = new Array<kkcerpDespatch>();
      this.serialNo = data.Data.length + 1;
      for (let i = 0; i <= data.Data.length; i++) {
      
        let erpEntry = new kkcerpDespatch();
        if(data.Data[i] != null){
        erpEntry.ID = data.Data[i].ID;
        erpEntry.centerName = data.Data[i].centerName;
        // erpEntry.date =  data.Data[i].date;
        erpEntry.erpAmount =  data.Data[i].erpAmount;
        erpEntry.erpdate = data.Data[i].erpdate;
        erpEntry.erpdespNo = data.Data[i].erpdespNo;
        erpEntry.noofDd = data.Data[i].noofDd;
        erpEntry.remarks = data.Data[i].remarks;
        erpEntry.unique = data.Data[i].unique;
        erpEntry.isdespatchEntered = data.Data[i].isdespatchEntered;
        erpEntry.enteredDate = data.Data[i].enteredDate;
        erpEntry.enteredTime=data.Data[i].enteredTime;
        erpEntry.ishoVerified = data.Data[i].ishoVerified;
        erpEntry.feesItem = data.Data[i].feesItem;
        this.erpList.push(erpEntry);
        }
      }
      console.log('erpEntry',this.erpList)
      this.geteditEntry();    
      
      },



      err => {
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      })
  
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


  ddentryForm = new FormGroup({

    // centerNameVal: new FormControl(),
    erpdespnoVal: new FormControl(),
    noodDdVal: new FormControl(),
    ddamountVal: new FormControl(),
    feesItemVal: new FormControl(),

    // remarksVal: new FormControl(),


  })
  ddcreateForm() {
    this.ddentryForm = this.fb.group(
      {
        erpdespnoVal: [null, Validators.required],
        feesItemVal: [null, Validators.required],
        
        // erpdespnoVal: [null,Validators.required],
        noodDdVal: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
        ddamountVal: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
        // remarks: [null, Validators.required],



      })
  }


  // get centerNameVal() { return this.ddentryForm.get('centerNameVal'); }
  get feesItemVal() { return this.ddentryForm.get('feesItemVal'); }

  get erpdespnoVal() { return this.ddentryForm.get('erpdespnoVal'); }
  get noodDdVal() { return this.ddentryForm.get('noodDdVal'); }
  get ddamountVal() { return this.ddentryForm.get('ddamountVal'); }

  resetForm() {
    this.ddentryForm.reset(
      {
        // centerNameVal: null,
        erpdespnoVal: null,
        noodDdVal: null,
        ddamountVal: null,
        feesItemVal: null
      }
    )
  }

  entrySelection(erpId , erpentry : kkcerpDespatch){
    console.log(erpentry);
    this.router.navigate(['/kkc-erp-desp-details/' + erpId])
    
  }

  geteditEntry(){
    if( this.id != undefined){
      for(let i=0 ; i <= this.erpList.length ; i++){
        let erpObj = this.erpList[i];
        if(erpObj != null && erpObj.unique == this.id){
           this.newerpentry.unique = erpObj.unique;
           this.newerpentry.centerName = erpObj.centerName;
          //  this.newerpentry.date = erpObj.date;
           this.newerpentry.erpAmount = erpObj.erpAmount;
           this.newerpentry.erpdate = erpObj.erpdate;
           this.newerpentry.erpdespNo = erpObj.erpdespNo;
           this.newerpentry.ID = erpObj.ID;
           this.newerpentry.noofDd = erpObj.noofDd;
           this.newerpentry.remarks = erpObj.remarks; 
           this.newerpentry.feesItem = erpObj.feesItem;
        }
      }
      console.log('*****************************',this.newerpentry)
    }

  }
 selectfeesItem(key){

  console.log(key);
  if( key == 'Prospectus'){
     this.message='If the fees item in dd despatch statement is prospectus, then we have to calculate total dd amount and total number of dd'  
  }
  else{
    this.message='';
  }

  }
  beforeregister(){

    // this.register();
    // for(let i=0; i<=this.erpList.length;i++){
    //   let tempObj = this.erpList[i];
    //   if(this)
    // }

  }
  getMonthFromDate(dateData) {
    if (dateData != null) {
      var month = dateData.toString().slice(3, -5)
      console.log('month**',month)
      return month;
    }}
  
}

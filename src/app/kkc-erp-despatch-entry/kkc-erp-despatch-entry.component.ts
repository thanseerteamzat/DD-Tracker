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
  tempcenterList;
  erpEntries : erpData;
  selectedcenter;
  // kkcerpdespatch: kkcerpDespatch;
  kkcerpdespatch: kkcerpDespatch = new kkcerpDespatch();

  remarks;
  erpdespNo;
  erpAmount;
  noofDd;
  erpDate = new Date;
  Date = new Date;
  selectedDate;
  erpList = new Array<kkcerpDespatch>();
  serialNo : number;
  selectederpDate;
  isEditMode;
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

    this.getAllkkccenters();
    this.ddcreateForm();
    this.getErpEntry();    
    
  }

  ngOnInit() {
  }




  getAllkkccenters() {
    this.academic.GetAllCenters().subscribe(resdata => {
      this.centers = resdata;
      console.log(resdata);
      this.centerList = new Array<Center>();
      for (let i = 0; i <= resdata.Data.length; i++) {
        if (resdata.Data != null) {
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
    this.kkcerpdespatch.remarks = this.remarks;
    this.kkcerpdespatch.noofDd = this.noofDd;
    this.kkcerpdespatch.centerName = this.selectedcenter;
    this.kkcerpdespatch.erpAmount = this.erpAmount;
    this.selectedDate = this.Date;
    this.kkcerpdespatch.date = this.formatDate(this.selectedDate);
    this.selectederpDate = this.erpDate;
    this.kkcerpdespatch.erpdate = this.formatDate(this.selectederpDate);
    this.kkcerpdespatch.erpdespNo = this.erpdespNo;
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
        erpEntry.date =  data.Data[i].date;
        erpEntry.erpAmount =  data.Data[i].erpAmount;
        erpEntry.erpdate = data.Data[i].erpdate;
        erpEntry.erpdespNo = data.Data[i].erpdespNo;
        erpEntry.noofDd = data.Data[i].noofDd;
        erpEntry.remarks = data.Data[i].remarks;
        erpEntry.unique = data.Data[i].unique;
        this.erpList.push(erpEntry);
        }
      }
      console.log('erpEntry',this.erpList)


      
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

    centerNameVal: new FormControl(),
    erpdespnoVal: new FormControl(),
    noodDdVal: new FormControl(),
    ddamountVal: new FormControl(),
    // remarksVal: new FormControl(),


  })
  ddcreateForm() {
    this.ddentryForm = this.fb.group(
      {
        centerNameVal: [null, Validators.required],
        erpdespnoVal: [null],
        noodDdVal: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
        ddamountVal: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
        // remarks: [null, Validators.required],



      })
  }


  get centerNameVal() { return this.ddentryForm.get('centerNameVal'); }
  get erpdespnoVal() { return this.ddentryForm.get('erpdespnoVal'); }
  get noodDdVal() { return this.ddentryForm.get('noodDdVal'); }
  get ddamountVal() { return this.ddentryForm.get('ddamountVal'); }

  resetForm() {
    this.ddentryForm.reset(
      {
        centerNameVal: null,
        erpdespnoVal: null,
        noodDdVal: null,
        ddamountVal: null,
      }
    )
  }

  entrySelection(key , erpentry : kkcerpDespatch){

    console.log(key);
    console.log(erpentry)
  }

}

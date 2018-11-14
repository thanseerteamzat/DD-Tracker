import { Component, OnInit } from '@angular/core';
import { AcadamicService } from '../services/acadamic.service';
import { Center, CenterData } from '../models/Center';
import { kkcerpDespatch, erpData } from '../models/kkcErpdespatch';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { EtsService } from '../services/ets.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Common } from '../models/common';
import { erpDespatch } from '../models/erpdespatch';
import { kkcErpReportTable, reportData } from '../models/kkerpdespatchReport';
import { parse } from 'path';

@Component({
  selector: 'app-kkc-erp-despatch-entry',
  templateUrl: './kkc-erp-despatch-entry.component.html',
  styleUrls: ['./kkc-erp-despatch-entry.component.css']
})
export class KkcErpDespatchEntryComponent implements OnInit {
  centerList: Center[] = [];
  centers: CenterData;
  enteredDate = new Date;
  test;
  testone;
  tempamount = 0;
  tempcount = 0;
  tempno = [];

  message: string;
  enteredTime = new Date;
  selectedenteredDate;
  selectedenteredTime;
  tableforerpReport = new kkcErpReportTable();
  selectedcenterCode;
  tempcenterList;
  erpEntries: erpData;
  reportEntries: reportData;
  selectedcenter;
  newerpentry: kkcerpDespatch = new kkcerpDespatch();
  // kkcerpdespatch: kkcerpDespatch;
  kkcerpdespatch: kkcerpDespatch = new kkcerpDespatch();
  enteredBy;
  userType;
  id;
  isSroLogin: boolean;
  // remarks;
  erpdespNo: string;
  // erpAmount;
  // noofDd;
  erpDate = new Date;
  Date = new Date;
  selectedDate;
  erpList = new Array<kkcerpDespatch>();
  reportList = new Array<kkcErpReportTable>()
  serialNo: number;
  selectederpDate;
  isEditMode: boolean;
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



    this.getReportTable();
    if (this.id != undefined) {
      this.isEditMode = true;
      console.log('isEditmode', this.isEditMode);
      let that = this;
      that.academic.GeterpEntry().subscribe(data => {
        that.erpEntries = data;
        this.erpList = new Array<kkcerpDespatch>();
        this.serialNo = data.Data.length + 1;
        for (let i = 0; i <= data.Data.length; i++) {
          let erpEntry = new kkcerpDespatch();
          if (data.Data[i] != null) {
            erpEntry = data.Data[i];
            this.erpList.push(erpEntry);
          }
        }
        console.log('erplist', this.erpList);
        this.geteditEntry();
      },
        err => {
          console.log('Error: ' + err.error);
          console.log('Name: ' + err.name);
          console.log('Message: ' + err.message);
          console.log('Status: ' + err.status);
        })

    }
  }

  ngOnInit() {
    this.enteredBy = this.ets.cookiename;
    this.selectedcenter = this.ets.cookiecenter;
    // this.getAllkkccenters();

    // this.getcentercodefromCenterName(this.selectedcenter);

    console.log('*******************', this.selectedcenter)
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
      this.getcentercodefromCenterName(this.selectedcenter)
    },
      err => {
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      })

  }

  getcentercodefromCenterName(selectedcenter) {

    console.log("inside************************************************");
    console.log('length', this.centerList.length)
    for (let i = 0; i <= this.centerList.length; i++) {
      var tempList = this.centerList[i];
      console.log('selected center', selectedcenter);
      if (tempList != null) {
        console.log(tempList);
      }
      if (tempList != null && tempList.CenterName == selectedcenter) {
        this.selectedcenterCode = tempList.CenterCode;
        console.log('selected center code******************************', this.selectedcenterCode);
      }
    }

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


  getReportTable() {
    let that = this;
    that.academic.GetKkcReportTable().subscribe(data => {
      that.reportEntries = data;
      console.log(that.reportEntries)
      this.reportList = new Array<kkcErpReportTable>();
      for (let i = 0; i <= data.Data.length; i++) {
        let reportEntry = new kkcErpReportTable();
        if (data.Data[i] != null) {
          reportEntry = data.Data[i];
          this.reportList.push(reportEntry);
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

  getErpEntry() {
    let that = this;
    that.academic.GeterpEntry().subscribe(data => {
      that.erpEntries = data;
      this.erpList = new Array<kkcerpDespatch>();
      this.serialNo = data.Data.length + 1;
      for (let i = 0; i <= data.Data.length; i++) {
        let erpEntry = new kkcerpDespatch();
        if (data.Data[i] != null) {
          erpEntry = data.Data[i];
          this.erpList.push(erpEntry);
        }
      }
      console.log('erplist', this.erpList)
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
    feesItemVal: new FormControl(),

    // remarksVal: new FormControl(),


  })
  ddcreateForm() {
    this.ddentryForm = this.fb.group(
      {
        erpdespnoVal: [null, Validators.compose([Validators.required, Validators.maxLength(4), Validators.pattern('[0-9]*')])],

        feesItemVal: [null, Validators.required],
        centerNameVal: [null, Validators.required],

        // erpdespnoVal: [null,Validators.required],
        noodDdVal: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
        ddamountVal: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
        // remarks: [null, Validators.required],



      })
  }


  get centerNameVal() { return this.ddentryForm.get('centerNameVal'); }
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

  entrySelection(erpId, erpentry: kkcerpDespatch) {
    console.log(erpentry);
    this.router.navigate(['/kkc-erp-desp-details/' + erpId])

  }

  geteditEntry() {
    if (this.id != undefined) {
      for (let i = 0; i <= this.erpList.length; i++) {
        let erpObj = this.erpList[i];
        if (erpObj != null && erpObj.unique == this.id) {
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
          //  this.newerpentry.erpdespNo = erpObj.erpdespNo;
          var str;
          str = (erpObj.erpdespNo.match(/.{1,7}/g));
          var abc = str[1];
          abc = (abc.match(/.{1,4}/g));

          this.erpdespNo = abc[0];
        }
      }
      console.log('*****************************', this.newerpentry)
    }

  }
  selectfeesItem(key) {

    console.log(key);
    if (key == 'Prospectus') {
      this.message = 'If the fees item in dd despatch statement is prospectus, then we have to calculate total dd amount and total number of dd'
    }
    else {
      this.message = '';
    }

  }
  beforeregister() {

    var dataalreadyExists: boolean;





    this.register();
    this.getErpEntry();
    let thatt = this;
    thatt.academic.GetKkcReportTable().subscribe(data => {
      thatt.reportEntries = data;
      console.log(thatt.reportEntries)
      this.reportList = new Array<kkcErpReportTable>();
      for (let i = 0; i <= data.Data.length; i++) {
        let reportEntry = new kkcErpReportTable();
        if (data.Data[i] != null) {
          reportEntry = data.Data[i];
          this.reportList.push(reportEntry);
        }
      }

      for (let i = 0; i <= this.reportList.length; i++) {
        let tempObj = this.reportList[i];
        if (tempObj != null && tempObj.month == this.kkcerpdespatch.month && tempObj.centerName == this.kkcerpdespatch.centerName) {
          //  this.tableforerpReport.centerName = this.kk
          dataalreadyExists = true;
          console.log('inside if')
          break;
        }
        else {
          dataalreadyExists = false;
        }
      }

      if (dataalreadyExists == true) {
        console.log('need update ');
        this.updateReportTable(this.kkcerpdespatch.month, this.kkcerpdespatch.centerName);
      }
      else {
        console.log('need register');
        this.registerReporttable();
      }




    },
      err => {
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      })

  }
  updateReportTable(month, centerName) {

    console.log('inside update report table')
    var amount = 0;
    var count = 0;
    var no = [];

    let thatt = this;
    thatt.academic.GetKkcReportTable().subscribe(data => {
      thatt.reportEntries = data;
      console.log(thatt.reportEntries)
      this.reportList = new Array<kkcErpReportTable>();
      for (let i = 0; i <= data.Data.length; i++) {
        let reportEntry = new kkcErpReportTable();
        if (data.Data[i] != null) {
          reportEntry = data.Data[i];
          this.reportList.push(reportEntry);
        }
      }

      for (let i = 0; i <= this.reportList.length; i++) {
        let tempreportObj = this.reportList[i];
        if (tempreportObj != null && tempreportObj.centerName == centerName && tempreportObj.month == month) {
          tempreportObj.totalAmount = parseFloat(tempreportObj.totalAmount.toString()) + parseFloat(this.kkcerpdespatch.erpAmount.toString());
          tempreportObj.totalNoofDd = parseFloat(tempreportObj.totalNoofDd.toString()) + parseFloat(this.kkcerpdespatch.noofDd.toString());
          tempreportObj.statementNo.push(this.kkcerpdespatch.erpdespNo);
          console.log('inside if')
          this.test = tempreportObj;


        }
      }
      console.log('abc', this.test);
      try {
        this.academic.UpdatekkcerpReportTable(this.test);
        console.log('report table updates succesfully')
      }
      catch (x) {
        alert('error in update report table');
      }


    },
      err => {
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      })

    this.resetForm();
  }
  registerReporttable() {
    this.tableforerpReport.centerName = this.kkcerpdespatch.centerName;
    this.tableforerpReport.month = this.kkcerpdespatch.month;
    this.tableforerpReport.totalAmount = this.kkcerpdespatch.erpAmount;
    this.tableforerpReport.totalNoofDd = this.kkcerpdespatch.noofDd;
    //  this.tableforerpReport.statementNo.push(this.kkcerpdespatch.erpdespNo);
    let uniqueId = Common.newGuid();
    this.tableforerpReport.tableId = uniqueId
    this.tableforerpReport.statementNo = [];
    this.tableforerpReport.date = this.kkcerpdespatch.erpdate;
    this.tableforerpReport.statementNo.push(this.kkcerpdespatch.erpdespNo)

    console.log('table for register', this.tableforerpReport);
    try {
      this.academic.AddkkcerpReportTable(this.tableforerpReport);
      this.resetForm();

    }
    catch (error) {
      console.log(error)
    }
  }
  getMonthFromDate(dateData) {
    if (dateData != null) {
      var month = dateData.toString().slice(3, -5)
      console.log('month**', month)
      return month;
    }
  }


  register() {

    let uniqueId = "ERP" + Common.newGuid();
    this.kkcerpdespatch.unique = uniqueId;
    this.kkcerpdespatch.remarks = this.newerpentry.remarks;
    this.kkcerpdespatch.noofDd = this.newerpentry.noofDd;
    this.kkcerpdespatch.centerName = this.selectedcenter;
    this.getcentercodefromCenterName(this.selectedcenter);

    this.kkcerpdespatch.erpAmount = this.newerpentry.erpAmount;
    this.kkcerpdespatch.feesItem = this.newerpentry.feesItem;
    this.selectedDate = this.Date;
    // this.kkcerpdespatch.date = this.formatDate(this.selectedDate);
    this.selectederpDate = this.erpDate;
    this.kkcerpdespatch.erpdate = this.formatDate(this.selectederpDate);
    var temp = this.getMonthFromDate(this.kkcerpdespatch.erpdate);

    switch (temp) {
      case '01': {
        this.kkcerpdespatch.month = 'JAN';
        break;
      }
      case '02': {
        this.kkcerpdespatch.month = 'FEB';
        break;
      }

      case '03': {
        this.kkcerpdespatch.month = 'MAR';
        break;
      }

      case '04': {
        this.kkcerpdespatch.month = 'APR';
        break;
      }

      case '05': {
        this.kkcerpdespatch.month = 'MAY';
        break;
      }

      case '06': {
        this.kkcerpdespatch.month = 'JUN';
        break;
      }
      case '07': {
        this.kkcerpdespatch.month = 'JUL';
        break;
      }

      case '08': {
        this.kkcerpdespatch.month = 'AUG';
        break;
      }
      case '09': {
        this.kkcerpdespatch.month = 'SEP';
        break;
      }

      case '10': {
        this.kkcerpdespatch.month = 'OCT';
        break;
      }

      case '11': {
        this.kkcerpdespatch.month = 'NOV';
        break;
      }

      case '12': {
        this.kkcerpdespatch.month = 'DEC';
        break;
      }

    }
    if (this.erpdespNo.length == 2) {
      this.erpdespNo = '00' + this.erpdespNo;
    }
    if (this.erpdespNo.length == 1) {
      this.erpdespNo = '000' + this.erpdespNo;
    }
    if (this.erpdespNo.length == 3) {
      this.erpdespNo = '0' + this.erpdespNo;
    }

    // if(this.isSroLogin){
    this.kkcerpdespatch.erpdespNo = 'IDE/' + this.selectedcenterCode + '/' + this.erpdespNo + '/' + this.getMonthFromDate(this.kkcerpdespatch.erpdate) + '/' + this.ets.financialYear
    // }
    // if(!this.isSroLogin){
    // this.kkcerpdespatch.erpdespNo = this.erpdespNo;
    // }
    this.kkcerpdespatch.enteredDate = this.selectedenteredDate;
    this.kkcerpdespatch.enteredTime = this.selectedenteredTime;
    console.log(this.erpdespNo)
    console.log(this.kkcerpdespatch);
    try {
      this.academic.AddKkcErpEntry(this.kkcerpdespatch);
      //  this.getReportTable();
      alert('Added Succesfully for the ERP Despatch No : ' + this.kkcerpdespatch.erpdespNo);
    }
    catch (ex) {
      alert('error in adding Erp despatch')
    }
    //  this.getErpEntry();  
    //  this.resetForm();  



  }

  update() {
    // console.log('inside update function')

    this.kkcerpdespatch.centerName = this.selectedcenter;
    if (this.newerpentry.erpdate.length <= 10) {
      this.kkcerpdespatch.erpdate = this.newerpentry.erpdate;
    }
    else {
      this.kkcerpdespatch.erpdate = this.formatDate(this.newerpentry.erpdate)
    }
    var temp = this.getMonthFromDate(this.kkcerpdespatch.erpdate)
    switch (temp) {
      case '01': {
        this.kkcerpdespatch.month = 'JAN';
        break;
      }
      case '02': {
        this.kkcerpdespatch.month = 'FEB';
        break;
      }

      case '03': {
        this.kkcerpdespatch.month = 'MAR';
        break;
      }

      case '04': {
        this.kkcerpdespatch.month = 'APR';
        break;
      }

      case '05': {
        this.kkcerpdespatch.month = 'MAY';
        break;
      }

      case '06': {
        this.kkcerpdespatch.month = 'JUN';
        break;
      }
      case '07': {
        this.kkcerpdespatch.month = 'JUL';
        break;
      }

      case '08': {
        this.kkcerpdespatch.month = 'AUG';
        break;
      }
      case '09': {
        this.kkcerpdespatch.month = 'SEP';
        break;
      }

      case '10': {
        this.kkcerpdespatch.month = 'OCT';
        break;
      }

      case '11': {
        this.kkcerpdespatch.month = 'NOV';
        break;
      }

      case '12': {
        this.kkcerpdespatch.month = 'DEC';
        break;
      }

    }



    this.kkcerpdespatch.feesItem = this.newerpentry.feesItem;
    this.kkcerpdespatch.erpAmount = this.newerpentry.erpAmount;
    // this.kkcerpdespatch.erpdespNo = this.erpdespNo;
    this.getcentercodefromCenterName(this.selectedcenter);
    if (this.erpdespNo.length == 3) {
      this.erpdespNo = '0' + this.erpdespNo;

    }

    if (this.erpdespNo.length == 2) {
      this.erpdespNo = '00' + this.erpdespNo;

    }
    if (this.erpdespNo.length == 2) {
      this.erpdespNo = '000' + this.erpdespNo;

    }

    this.kkcerpdespatch.erpdespNo = 'IDE/' + this.selectedcenterCode + '/' + this.erpdespNo + '/' + this.getMonthFromDate(this.kkcerpdespatch.erpdate) + '/' + this.ets.financialYear


    this.kkcerpdespatch.ID = this.newerpentry.ID;
    this.kkcerpdespatch.noofDd = this.newerpentry.noofDd;
    this.kkcerpdespatch.remarks = this.newerpentry.remarks;
    this.kkcerpdespatch.unique = this.newerpentry.unique;
    // console.log(this.kkcerpdespatch)
    if (confirm('Are you sure to update details')) {

      this.academic.updateKkcErpEntry(this.kkcerpdespatch);
      alert('updated successfully');

      let that = this;
      that.academic.GeterpEntry().subscribe(data => {
        that.erpEntries = data;
        this.erpList = new Array<kkcerpDespatch>();
        this.serialNo = data.Data.length + 1;
        for (let i = 0; i <= data.Data.length; i++) {
          let erpEntry = new kkcerpDespatch();
          if (data.Data[i] != null) {
            erpEntry = data.Data[i];
            this.erpList.push(erpEntry);
          }
        }
        // console.log(this.erpList,'erPLISTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT')
        var amount = 0;
        var count = 0;
        var no = [];
        // console.log(this.erpList.length, 'length')
        for (let i = 0; i <= this.erpList.length; i++) {
          let tempupdObj = this.erpList[i];
          // console.log(tempupdObj);
          // console.log(this.kkcerpdespatch.month);
          console.log(this.kkcerpdespatch.centerName)
          if (tempupdObj != null && tempupdObj.month == this.kkcerpdespatch.month && tempupdObj.centerName == this.kkcerpdespatch.centerName) {
            // console.log('inside if')
            amount = parseFloat(amount.toString()) + parseFloat(tempupdObj.erpAmount.toString());
            count = parseFloat(count.toString()) + parseFloat(tempupdObj.noofDd.toString());
            no.push(tempupdObj.erpdespNo)

          }
        }
        this.tempamount = amount;
        // console.log(this.tempamount, 'temp amount')
        this.tempcount = count;
        this.tempno = no;




      },
        err => {
          console.log('Error: ' + err.error);
          console.log('Name: ' + err.name);
          console.log('Message: ' + err.message);
          console.log('Status: ' + err.status);
        })

      let thatt = this;
      thatt.academic.GetKkcReportTable().subscribe(data => {
        that.reportEntries = data;
        
        console.log(that.reportEntries)
        this.reportList = new Array<kkcErpReportTable>();
        for (let i = 0; i <= data.Data.length; i++) {
          let reportEntry = new kkcErpReportTable();
          if (data.Data[i] != null) {
            reportEntry = data.Data[i];
            this.reportList.push(reportEntry); 
          }
        }

        for (let i = 0; i <= this.reportList.length; i++) {
          let tempupdateobj = this.reportList[i];
          if (tempupdateobj != null && tempupdateobj.centerName == this.kkcerpdespatch.centerName && tempupdateobj.month == this.kkcerpdespatch.month) {
            tempupdateobj.statementNo = this.tempno;
            tempupdateobj.totalNoofDd = this.tempcount;
            tempupdateobj.totalAmount = this.tempamount;
            // console.log(tempupdateobj, 'tempupdate obj');
            this.academic.UpdatekkcerpReportTable(tempupdateobj);
            console.log('************************')
            let that = this;
            that.academic.GetKkcReportTable().subscribe(data => {
              that.reportEntries = data;
              console.log(that.reportEntries)
              this.reportList = new Array<kkcErpReportTable>();
              for (let i = 0; i <= data.Data.length; i++) {
                let reportEntry = new kkcErpReportTable();
                if (data.Data[i] != null) {
                  reportEntry = data.Data[i];
                  this.reportList.push(reportEntry);
                }
              }
            },
              err => {
                console.log('Error: ' + err.error);
                console.log('Name: ' + err.name);
                console.log('Message: ' + err.message);
                console.log('Status: ' + err.status);
              })
        
            // this.getReportTable();

          }
        }
        // console.log('',)
      },
        err => {
          console.log('Error: ' + err.error);
          console.log('Name: ' + err.name);
          console.log('Message: ' + err.message);
          console.log('Status: ' + err.status);
        })


    }




    //  this.getErpEntry();
    //   console.log('hai')

    //   // console.log('month------------->',month , ' centerName --------->',centerName)
    //   var amount =0;
    //   var count =0
    //   var no = [];

    //   console.log('length',this.erpList.length);

    //   for(let i=0 ;i<=this.erpList.length; i++){
    //     let temperpObj = this.erpList[i];
    //     // console.log('temperpObj', temperp)
    //     if(temperpObj != null && temperpObj.month == this.kkcerpdespatch.month && temperpObj.centerName == this.kkcerpdespatch.centerName){
    //       amount = parseFloat(amount.toString()) + parseFloat(temperpObj.erpAmount.toString());
    //       console.log('amount*****************', amount);
    //       count = parseFloat(count.toString()) + parseFloat(temperpObj.noofDd.toString());
    //       console.log('count',count);
    //       no.push(temperpObj.erpdespNo);
    //     }

    //   }
    //   // amount = amount + parseFloat(this.kkcerpdespatch.erpAmount.toString());

    //   // count = count + parseFloat(this.kkcerpdespatch.noofDd.toString());
    //   // no.push(this.kkcerpdespatch.erpdespNo)
    //   // this.getReportTable();


    //   for(let i=0; i<=this.reportList.length;i++){
    //     let tempObj=this.reportList[i];
    //     // console.log('centerName',centerName);
    //     if(this.kkcerpdespatch.erpdespNo != null && tempObj !=null && tempObj.month == this.kkcerpdespatch.month && tempObj.centerName == this.kkcerpdespatch.centerName){
    //       console.log(tempObj.totalNoofDd);
    //       console.log(this.kkcerpdespatch.noofDd)
    //       // console.log(te)

    //       tempObj.totalNoofDd = count;
    //      tempObj.totalAmount = amount;
    //      tempObj.statementNo = no;
    //     // tempObj.totalNoofDd = parseFloat(tempObj.totalNoofDd.toString()) + parseFloat(this.kkcerpdespatch.noofDd.toString());      

    //     // tempObj.totalAmount =parseFloat( tempObj.totalAmount.toString()) + parseFloat(this.kkcerpdespatch.erpAmount.toString());

    //      tempObj.statementNo.push(this.kkcerpdespatch.erpdespNo);
    //      this.academic.UpdatekkcerpReportTable(tempObj);
    //     }
    //   }
























    // console.log('hai')
    //   this.resetForm();
    //   //  this.router.navigate[('../dd-entry')];

  }

}

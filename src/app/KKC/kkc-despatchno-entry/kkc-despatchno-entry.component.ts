import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AcadamicService } from 'src/app/services/acadamic.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { KKCentryData, kkcddEntry, kkcddEntryTemp } from 'src/app/models/KKC/kkcddentry';
import { KKCDespatch, KKCDespatchData } from 'src/app/models/KKC/kkc-despatch';
import { CenterData, Center } from 'src/app/models/Center';
import { KkcService } from 'src/app/services/kkc.service';
import { Common } from 'src/app/models/common';
import { EtsService } from 'src/app/services/ets.service';
import { kkcerpDespatch, erpData } from 'src/app/models/kkcErpdespatch';

@Component({
  selector: 'app-kkc-despatchno-entry',
  templateUrl: './kkc-despatchno-entry.component.html',
  styleUrls: ['./kkc-despatchno-entry.component.css']
})
export class KkcDespatchnoEntryComponent implements OnInit {
  kkcddEntries: KKCentryData;
  ddList = new Array<kkcddEntry>();
  ddEnteredList = new Array<kkcddEntry>();
  centers: CenterData;
  newDespatchEntry: kkcddEntry = new kkcddEntry();
  despatch: KKCDespatch = new KKCDespatch();
  centerList = new Array<Center>();
  centercode;
  selectedcenter;
  selectedFee;
  selectCenter;
  selectfee;
  ddtotal;
  selectedData: kkcddEntry[];
  checklisttotal;
  checklistddTotal;
  checklisttemp;
  tempentry;
  entered;
  checkList = new Array<kkcddEntryTemp>();
  tempcentercode;
  erpList = new Array<kkcerpDespatch>();
  despatchList = new Array<KKCDespatch>();
  feesItems = [
    { id: '1', name: 'Course Fee' },
    { id: '2', name: 'Prospectus' },
    // { id: '3', name: 'Re exam' },
    // { id: '4', name: 'Renewal Fee' },
    // { id: '5', name: 'Affiliation' },
    // { id: '6', name: 'Inspection' },
    // { id: '7', name: 'Duplicate Certificate/Marklist' },
  ];
  index;
  year;
  erpEntries: erpData;
  erpPreviousMonthEntryExists;
  erplistvariable;
  currentdatecountErp;
  previousdatecountErp;
  previousEntryPendingList;
  previousmonthsplit;
  despatchFormat;
  erpentryExists;
  temperpList;
  tempdesplist;
  despatchEntries: KKCDespatchData;
  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private academic: AcadamicService,
    private fb: FormBuilder,
    private kkc: KkcService,
    private ets: EtsService
  ) {

    this.despatchcreateForm();
    this.getErpEntry();
    this.getKKCddEntryDetails();
    this.getkkcCenters();
    this.getDespatchEntry();
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
  getkkcCenters() {
    this.academic.GetAllCenters().subscribe(resdata => {
      this.centers = resdata;
      console.log(resdata);
      this.centerList = new Array<Center>();
      for (let i = 0; i <= resdata.Data.length; i++) {
        let c = new Center();
        if (resdata.Data[i] != null) {
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
  getKKCddEntryDetails() {
    let that = this;
    that.academic.GetKkcDdEntry().subscribe(data => {
      that.kkcddEntries = data;
      for (let i = 0; i <= data.Data.length; i++) {
        let entry = new kkcddEntry();
        if (data.Data[i] != null) {
          this.ddList.push(data.Data[i]);
          this.ddEnteredList.push(data.Data[i]);

        }
      }
      console.log('erp entry', this.ddList)

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
      for (let i = 0; i <= data.Data.length; i++) {
        let erpEntry = new kkcerpDespatch();
        if (data.Data[i] != null) {

          this.erpList.push(data.Data[i]);
        }
      }
      console.log('erp entry', this.erpList)
    },
      err => {
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      })

  }

  getDespatchEntry() {
    let that = this;
    that.kkc.GetdespatchEntry().subscribe(data => {
      that.despatchEntries = data;
      for (let i = 0; i <= data.Data.length; i++) {
        let despatchEntry = new KKCDespatch();
        if (data.Data[i] != null) {

          this.despatchList.push(data.Data[i]);
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
  ngOnInit() {
    if (this.ets.cookievalue != null && (this.ets.cookievalue.indexOf('x7') !== -1) || (this.ets.cookievalue == "All")) {
      console.log('inside if condition *********************')
      // this.router.navigate(['/dd-entry'])
    }
    else {
      this.router.navigate(['/error']);
    }
    this.entered = this.ets.cookiename;
    this.despatch.enteredBy = this.entered;
  }



  listDatabyFiltering() {
    this.ddList.splice(0, this.ddList.length);
    this.selectedData.forEach(data => {
      this.ddList.push(data);
    })
  }
  filterCenter(centerValue) {
    this.selectedData = null;
    this.centerList.forEach(center => {
      if (center.CenterName == centerValue) {
        this.centercode = center.CenterCode;
      }
    })
    console.log('center code', this.centercode);
    this.selectCenter = centerValue;
    if (this.selectfee == null) {
      this.selectedData = this.ddEnteredList.filter(s => s.centerName == this.selectCenter);
      this.listDatabyFiltering();
      this.checkList.splice(0, this.checkList.length);
    }
    else if (this.selectCenter == null) {
      this.selectedData = this.ddEnteredList.filter(s => s.feesItem == this.selectfee);
      this.listDatabyFiltering();
      this.checkList.splice(0, this.checkList.length);
    }
    else {
      this.selectedData = this.ddEnteredList.filter(s => s.feesItem == this.selectfee
        && s.centerName == this.selectCenter);
      this.listDatabyFiltering();
      this.checkList.splice(0, this.checkList.length);

    }

  }
  filterFee(feeValue) {
    this.selectfee = feeValue;
    this.selectedData = null;
    if (this.selectCenter == null) {
      this.selectedData = this.ddEnteredList.filter(s => s.feesItem == this.selectfee);
      this.listDatabyFiltering();
      this.checkList.splice(0, this.checkList.length);
    }
    else if (this.selectfee == null) {
      this.selectedData = this.ddEnteredList.filter(s => s.centerName == this.selectCenter);
      this.listDatabyFiltering();
      this.checkList.splice(0, this.checkList.length);

    }
    else {
      this.selectedData = this.ddEnteredList.filter(s => s.feesItem == this.selectfee
        && s.centerName == this.selectCenter);
      this.listDatabyFiltering();
      this.checkList.splice(0, this.checkList.length);


    }
  }
  chechlistTotal(checklist) {
    this.checklistddTotal = 0;
    for (let i = 0; i <= checklist.length; i++) {

      this.checklisttemp = checklist[i];
      if (this.checklisttemp != null) {
        this.checklistddTotal = parseFloat(this.checklistddTotal) + parseFloat(this.checklisttemp.ddAmount);
      }
    }
  }
  onClick(event, temp, ddEntry: kkcddEntry) {

    if (event == true) {
      this.checkList.push(ddEntry);

      this.checklisttotal = this.checkList.length;
      this.checklistddTotal = 0;
      this.chechlistTotal(this.checkList)


    }

    else if (event == false) {

      if (temp != null) {
        this.index = this.checkList.findIndex(list => list.kkcId == temp)
        this.checkList.splice(this.index, 1)
        this.checklisttotal = this.checkList.length;
        this.checklistddTotal = 0;
        this.chechlistTotal(this.checkList)
      }

    }
  }
  getMothFromDate(dateData) {
    if (dateData != null) {
      var month = dateData.toString().slice(3, -5)
      //  console.log('month**',month)
      return month;
    }
  }

  erpdespatchEntryMonthCheck() {
    this.erpPreviousMonthEntryExists = false;
    let despno = this.newDespatchEntry.despatchNo;
    let split = despno.slice(-2);
    if (split.length >= 2) {
      this.previousmonthsplit = (parseInt(split) - 1);
    }
    else if (split.length <= 1) {
      this.previousmonthsplit = '0' + (parseInt(split) - 1);
    }
    for (let i = 0; i <= this.erpList.length; i++) {
      this.erplistvariable = this.erpList[i];
      this.currentdatecountErp = this.erpList.filter(s => this.getMothFromDate(s.erpdate) == split).length;
      this.previousdatecountErp = this.erpList.filter(s => this.getMothFromDate(s.erpdate) == this.previousmonthsplit);
    }
    for (let j = 0; j <= this.previousdatecountErp.length; j++) {
      var temp = this.previousdatecountErp[j];
      if (temp != null && temp.isdespatchEntered != true) {
        this.erpPreviousMonthEntryExists = true;
        break;
      }

    }
    if (this.erpPreviousMonthEntryExists == false) {
      console.log('new entry month')
      this.erpdespatchEntryCheck();
    }
    else {
      this.previousEntryPendingList = this.erpList.filter(s => this.getMothFromDate(s.erpdate) == this.previousmonthsplit && s.isdespatchEntered != true);
      alert('Previous Month Despatch Entry is pending. Please update...');

    }


  }

  erpdespatchEntryCheck() {
    let todaydate = new Date();
    this.year = todaydate.getFullYear();
    let nextyear = this.year + 1;
    let stnextyear = nextyear.toString();
    let styear = this.year.toString()
    var splityear = styear.slice(-2)
    var splitnextyear = stnextyear.slice(-2);
    this.despatchFormat = "IDE" + '/' + this.centercode + "/" + this.newDespatchEntry.despatchNo + "/" + splityear + "-" + splitnextyear;
    this.despatch.despatchNo = this.despatchFormat;
    this.erpentryExists = false;
    let datecheck = this.formatDate(this.newDespatchEntry.despatchDate);
    for (let i = 0; i <= this.erpList.length; i++) {
      this.temperpList = this.erpList[i];
      if (this.temperpList != null && this.temperpList.erpdespNo == this.despatchFormat && this.temperpList.erpAmount == this.checklistddTotal && this.temperpList.erpdate == datecheck) {
        this.erpentryExists = true;
        break;
      }

    }
    if (this.erpentryExists == true) {
      console.log(this.erpentryExists)
      this.beforeRegister();
    }
    else {
      alert('Despatch Entry not match with Erp entry')
    }


  }
  beforeRegister() {
    // console.log('key***', key)
    if (this.checkList.length == 0) {
      alert('Please select any Entry !!')
    }
    else {

      var despatchnoExists = false;
      console.log(this.despatchList)
      console.log(this.despatch.despatchNo);
      for (let i = 0; i <= this.despatchList.length; i++) {
        this.tempdesplist = this.despatchList[i];

        if (this.tempdesplist != null && this.tempdesplist.despatchNo == this.despatch.despatchNo) {
          despatchnoExists = true;
          break;
        }
      }
      if (despatchnoExists == false) {

        this.register();
      }
      else {
        alert('despatch number duplication');
        this.resetForm();
      }
    }
  }
  register() {
    this.ddtotal = 0;
    let todaydate = new Date();
    this.year = todaydate.getFullYear();
    let nextyear = this.year + 1;
    let stnextyear = nextyear.toString();
    let styear = this.year.toString()
    var splityear = styear.slice(-2)
    var splitnextyear = stnextyear.slice(-2);
    console.log('split ....', splitnextyear)
    var despformat = "IDE/" + this.centercode + "/" + this.newDespatchEntry.despatchNo + "/" + splityear + "-" + splitnextyear;
    console.log('despatch num', despformat)
    //code for updating status in erp despatch entry
    for (let j = 0; j <= this.erpList.length; j++) {
      var temperp = this.erpList[j]
      if (temperp != null && temperp.erpdespNo == despformat) {
        temperp.isdespatchEntered = true;

        try {
          this.kkc.updateKKCerpEntry(temperp);
        }
        catch (ex) {
          console.log(ex);
        }
      }
    }
    // code for updating corresponding dd's with despatchno
    for (let i = 0; i <= this.checkList.length; i++) {
      this.tempentry = this.checkList[i];
      if (this.tempentry != null) {
        this.ddtotal = this.ddtotal + parseInt(this.tempentry.ddAmount);
        this.tempentry.despatchNo = despformat;
        this.despatch.feeItem = this.tempentry.feesItem;
        this.tempentry.despatchDate = this.formatDate(this.newDespatchEntry.despatchDate);
        this.tempentry.isdespatchEntered = true;
        this.despatch.feeItem = this.tempentry.feesItem;
        try {
          this.kkc.updateKKCDespatchddEntry(this.tempentry);
        }
        catch (e) {
          console.log(e);
        }

      }
    }
    this.despatch.centerCode = this.centercode;
    if (this.ddtotal != 0) {
      let uniqueId = "DESP" + Common.newGuid();
      this.despatch.despId = uniqueId;
      let feeWT = parseFloat(this.ddtotal) / 1.18;
      let feewtfloat = feeWT.toFixed(2);
      let taxamount = parseFloat(this.ddtotal) - parseFloat(feewtfloat);
      let taxfloat = taxamount.toFixed(2);
      this.despatch.centerName = this.selectedcenter;
      this.despatch.despatchDate = this.formatDate(this.newDespatchEntry.despatchDate);
      this.despatch.despatchNo = despformat;
      this.despatch.isdespatchEntered = true;
      this.despatch.totalAmount = this.ddtotal;
      this.despatch.taxAmount = parseFloat(taxfloat);
      this.despatch.FWT = parseFloat(feewtfloat);
      this.despatch.noOfdd = this.checkList.length.toString();
      this.despatch.isackEntered = false;
      //calculating dba rate and amount
      if (this.despatch.feeItem == "Course Fee") {

        this.despatch.Rate = 60;
        let rate = (parseFloat(this.despatch.FWT.toString()) * parseFloat(this.despatch.Rate.toString())) / 100;
        let frate = rate.toFixed(2);
        this.despatch.Amount = parseFloat(frate);
        this.despatch.feeItem = "Course Fee";
      }
      else if (this.despatch.feeItem == "Prospectus") {
        this.despatch.Rate = 60;
        let rate = (parseFloat(this.despatch.FWT.toString()) * parseFloat(this.despatch.Rate.toString())) / 100;
        let frate = rate.toFixed(2);
        this.despatch.Amount = parseFloat(frate);
        this.despatch.feeItem = "Prospectus";
      }

      try {
        this.kkc.AddKKCDespatcEntry(this.despatch);
      }
      catch (e) {
        console.log(e);
      }
    }
    // code for zero amount calculations
    else {

      this.despatch.centerName = this.selectedcenter;
      this.despatch.despatchDate = this.formatDate(this.newDespatchEntry.despatchDate);
      this.despatch.despatchNo = despformat;

      this.despatch.isdespatchEntered = true;
      this.despatch.totalAmount = this.ddtotal;
      this.despatch.taxAmount = 0;
      this.despatch.FWT = 0;
      //calculating dba rate and amount

      if (this.despatch.feeItem == "Course Fee") {


        this.despatch.Amount = 0;
      }
      else if (this.despatch.feeItem == 'Prospectus') {

        this.despatch.Amount = 0;

      }

      try {
        this.kkc.AddKKCDespatcEntry(this.despatch);
      }
      catch (e) {
        console.log(e);
      }
    }



    alert('despatch Added :' + this.despatch.despatchNo);
    this.checkList.splice(0, this.checkList.length);

    console.log('clearedlist', this.checkList)
    this.resetForm();
    this.getKKCddEntryDetails();
  }
  //validation codes 

  despatchform = new FormGroup({
    despatchno: new FormControl(),
    despatchdate: new FormControl()
    // despatchbox: new FormControl()
  })

  despatchcreateForm() {
    this.despatchform = this.fb.group(
      {

        despatchNo: [null, Validators.compose([Validators.required, Validators.pattern('[0-9 //]*')])],
        // despatchbox: [null, Validators.requiredTrue],
        despatchdate: [false, Validators.required]
      }
    )
  }
  get despatchNo() { return this.despatchform.get('despatchNo'); }
  // get despatchbox() { return this.despatchform.get('despatchbox'); }
  get despatchdate() { return this.despatchform.get('despatchdate'); }

  resetForm() {
    this.despatchform.reset(
      {
        despatchNo: null,
        // despatchbox: null,
        despatchdate: null

      }
    )
  }
}

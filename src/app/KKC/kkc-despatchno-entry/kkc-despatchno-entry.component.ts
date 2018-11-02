import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AcadamicService } from 'src/app/services/acadamic.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { KKCentryData, kkcddEntry, kkcddEntryTemp } from 'src/app/models/KKC/kkcddentry';
import { KKCDespatch } from 'src/app/models/KKC/kkc-despatch';
import { CenterData, Center } from 'src/app/models/Center';
import { KkcService } from 'src/app/services/kkc.service';
import { Common } from 'src/app/models/common';
import { EtsService } from 'src/app/services/ets.service';

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
  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private academic: AcadamicService,
    private fb: FormBuilder,
    private kkc: KkcService,
    private ets: EtsService
  ) {

    this.despatchcreateForm();
    let that = this;
    that.academic.GetKkcDdEntry().subscribe(data => {
      that.kkcddEntries = data;
      for (let i = 0; i <= data.Data.length; i++) {
        let entry = new kkcddEntry();
        if (data.Data[i] != null) {
          entry.applicationNumber = data.Data[i].applicationNumber;
          entry.centerName = data.Data[i].centerName;
          entry.studentRollNumber = data.Data[i].studentRollNumber
          entry.bank = data.Data[i].bank;
          entry.courseName = data.Data[i].courseName;
          entry.studentName = data.Data[i].studentName;
          entry.date = data.Data[i].date;
          entry.ddAmount = data.Data[i].ddAmount;
          entry.ddDate = data.Data[i].ddDate;
          entry.ddNumber = data.Data[i].ddNumber;
          entry.enteredBy = data.Data[i].enteredBy;
          entry.feesItem = data.Data[i].feesItem;
          entry.kkcId = data.Data[i].kkcId;
          entry.KkcDdId = data.Data[i].KkcDdId;
          entry.isVerified = data.Data[i].isVerified;
          entry.isddCancelled = data.Data[i].isddCancelled;
          entry.KkcDdId = data.Data[i].KkcDdId;
          entry.kkcId = data.Data[i].kkcId;

          this.ddList.push(entry);
          this.ddEnteredList.push(entry);
        }
      }
      console.log(this.ddList)

    },
      err => {
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      }),

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
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
  }

  ngOnInit() {

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
    // console.log('center code', this.tempcentercode);
    this.selectCenter = centerValue;
    if (this.selectfee == null) {
      this.selectedData = this.ddEnteredList.filter(s => s.centerName == this.selectCenter);
      this.listDatabyFiltering();
    }
    else if (this.selectCenter == null) {
      this.selectedData = this.ddEnteredList.filter(s => s.feesItem == this.selectfee);
      this.listDatabyFiltering();
    }
    else {
      this.selectedData = this.ddEnteredList.filter(s => s.feesItem == this.selectfee
        && s.centerName == this.selectCenter);
      this.listDatabyFiltering();

    }

  }
  filterFee(feeValue) {
    this.selectfee = feeValue;
    this.selectedData = null;
    if (this.selectCenter == null) {
      this.selectedData = this.ddEnteredList.filter(s => s.feesItem == this.selectfee);
      this.listDatabyFiltering();
    }
    else if (this.selectfee == null) {
      this.selectedData = this.ddEnteredList.filter(s => s.centerName == this.selectCenter);
      this.listDatabyFiltering();
    }
    else {
      this.selectedData = this.ddEnteredList.filter(s => s.feesItem == this.selectfee
        && s.centerName == this.selectCenter);
      this.listDatabyFiltering();

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
    // console.log('event', event);
    // console.log('temp', temp);
    // console.log('ddEntry', ddEntry);
    if (event == true) {
      this.checkList.push(ddEntry);

      this.checklisttotal = this.checkList.length;
      this.checklistddTotal = 0;
      this.chechlistTotal(this.checkList)
      console.log('0000', this.checkList)

      console.log('1111', this.checklistddTotal)

    }

    else if (event == false) {

      if (temp != null) {
        // this.checklist.pop();
        // console.log('index', index)
        console.log('id', temp)

        this.index = this.checkList.findIndex(list => list.kkcId == temp)
        this.checkList.splice(this.index, 1)
        this.checklisttotal = this.checkList.length;

        this.checklistddTotal = 0;
        console.log('0000', this.index)

        this.chechlistTotal(this.checkList)
        console.log('checklist', this.checkList)
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

    for (let i = 0; i <= this.checkList.length; i++) {


      this.tempentry = this.checkList[i];
      if (this.tempentry != null) {
        this.ddtotal = this.ddtotal + parseInt(this.tempentry.ddAmount);
        console.log('total*****', this.ddtotal)
        this.tempentry.despatchNo = despformat;
        // this.despatch.feeItem = this.tempentry.feesItem;
        this.tempentry.despatchDate = this.formatDate(this.newDespatchEntry.despatchDate);
        this.tempentry.isdespatchEntered = true;
        this.despatch.feeItem = this.tempentry.feesItem;
        // this.tempentry.despId = key;
        try {
          this.kkc.updateKKCDespatchddEntry(this.tempentry);
        }
        catch (e) {
          console.log(e);
        }

      }
    }
    this.despatch.centerCode = this.centercode;
    console.log('centercode .....', this.despatch.centerCode)
    if (this.ddtotal != 0) {
      let uniqueId = "DD" + Common.newGuid();
      this.despatch.despId = uniqueId;
      let feeWT = parseFloat(this.ddtotal) / 1.18;
      let feewtfloat = feeWT.toFixed(2);
      let taxamount = parseFloat(this.ddtotal) - parseFloat(feewtfloat);
      let taxfloat = taxamount.toFixed(2);
      this.despatch.centerName = this.selectedcenter;
      this.despatch.despatchDate = this.formatDate(this.newDespatchEntry.despatchDate);
      this.despatch.despatchNo = despformat;
      // this.despatch.feeItem = this.tempentry.feesItem;
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
        // this.despatch.feeItem = "Course Fee";
      }
      else if (this.despatch.feeItem == "Prospectus") {
        this.despatch.Rate = 60;
        let rate = (parseFloat(this.despatch.FWT.toString()) * parseFloat(this.despatch.Rate.toString())) / 100;
        let frate = rate.toFixed(2);
        this.despatch.Amount = parseFloat(frate);
        // this.despatch.feeItem = "Inspection";
      }

      try {
        this.kkc.AddKKCDespatcEntry(this.despatch);
      }
      catch (e) {
        console.log(e);
      }
    }
    // code for zero amount
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

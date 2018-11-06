import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { EtsService } from 'src/app/services/ets.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AcadamicService } from 'src/app/services/acadamic.service';
import { Center, CenterData } from 'src/app/models/Center';
import { kkcerpDespatch, erpData } from 'src/app/models/kkcErpdespatch';
import { kkcdbaEntry } from 'src/app/models/KKC/kkc-dbaShareReleaseNote';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kkc-dba-share-release-note',
  templateUrl: './kkc-dba-share-release-note.component.html',
  styleUrls: ['./kkc-dba-share-release-note.component.css']
})
export class KkcDbaShareReleaseNoteComponent implements OnInit {
  centerList: Center[] = [];
  selectedmonth;
  centers: CenterData;

  selectedcenter;
  dbaNo;
  lstid;
  // dbaDate
  checklisttotal;
  checklistddTotal;
  selectedMonth;
  selectedFee;
  selectedCenter;
  erpList = new Array<kkcerpDespatch>();
  serialNo: number;
  erpEntries: erpData;
  newdbaEntry = new Array<kkcdbaEntry>();
  selectedData: kkcerpDespatch[];
  selectedDataIndex;
  selectmonth;
  selectedfee;
  taxtotal = 0;
  taxttotalRounded = 0;
  total = 0;
  total1 = 0;
  feewTotal1 = 0;
  feewtTotal = 0;
  temprate = 0;
  tot = 0;
  totalamount = 0;
  Months = [
    { id: '01', name: 'Jan' },
    { id: '02', name: 'Feb' },
    { id: '03', name: 'Mar' },
    { id: '04', name: 'Apr' },
    { id: '05', name: 'May' },
    { id: '06', name: 'Jun' },
    { id: '07', name: 'Jul' },
    { id: '08', name: 'Aug' },
    { id: '09', name: 'Sep' },
    { id: '10', name: 'Oct' },
    { id: '11', name: 'Nov' },
    { id: '12', name: 'Dec' },

  ];
  feesItems = [
    { id: '1', name: 'Course Fee' },
    { id: '2', name: 'Prospectus' },
    { id: '3', name: 'Re exam' },
    { id: '4', name: 'Renewal Fee' },
    { id: '5', name: 'Affiliation' },
    { id: '6', name: 'Inspection' },
    { id: '7', name: 'Duplicate Certificate/Marklist' },
  ];
  constructor(
    private db: AngularFireDatabase,
    private ets: EtsService,
    private fb: FormBuilder,
    private academic: AcadamicService,
    private router :Router
  ) {
    this.getAllkkccenters();
    this.getErpEntry();
    this.dbacreateForm();
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

  getErpEntry() {

    let that = this;
    that.academic.GeterpEntry().subscribe(data => {
      that.erpEntries = data;
      console.log("hi************")
      console.log(that.erpEntries, 'ERP Entries');
      this.erpList = new Array<kkcerpDespatch>();
      this.serialNo = data.Data.length + 1;
      for (let i = 0; i <= data.Data.length; i++) {

        let erpEntry = new kkcerpDespatch();
        if (data.Data[i] != null) {
          erpEntry.ID = data.Data[i].ID;
          erpEntry.centerName = data.Data[i].centerName;
          // erpEntry.date = data.Data[i].date;
          this.centerList.forEach(center => {
            if (center.CenterName == erpEntry.centerName) {
              erpEntry.centerCode = center.CenterCode;
            }
          })
          // erpEntry.date = data.Data[i].date;
          erpEntry.erpAmount = data.Data[i].erpAmount;
          erpEntry.erpdate = data.Data[i].erpdate;
          erpEntry.erpdespNo = data.Data[i].erpdespNo;
          erpEntry.noofDd = data.Data[i].noofDd;
          erpEntry.remarks = data.Data[i].remarks;
          erpEntry.unique = data.Data[i].unique;
          erpEntry.isdespatchEntered = data.Data[i].isdespatchEntered;
          erpEntry.enteredDate = data.Data[i].enteredDate;
          erpEntry.enteredTime = data.Data[i].enteredTime;
          erpEntry.ishoVerified = data.Data[i].ishoVerified;
          let feeWithoutTax = parseFloat(data.Data[i].erpAmount) / 1.18;
          let feeWithoutTaxRounded = feeWithoutTax.toFixed(2);
          let tax = parseFloat(data.Data[i].erpAmount) - parseFloat(feeWithoutTaxRounded);
          let taxRound = tax.toFixed(2);
          erpEntry.tax = parseFloat(taxRound);
          erpEntry.feeWithoutTax = parseFloat(feeWithoutTaxRounded);
          erpEntry.rate = 60;
          let shareAmount = (parseFloat(feeWithoutTaxRounded) * erpEntry.rate) / 100;
          let shareAmtRounded = shareAmount.toFixed(2);
          erpEntry.shareAmount = parseFloat(shareAmtRounded);
          this.erpList.push(erpEntry);
        }
      }
      console.log('erpEntry', this.erpList)

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
  getbatchNo() {
    let centerResponse = this.ets.centerList;
    //  Iterate throw all keys.
    for (let cent of centerResponse) {

      this.centerList.push(cent);

    }
    this.selectedData.forEach(data => {
      var split = data.centerName.slice(-5);
      if (split.includes('PD') && split.includes('DM')) {
        data.batchNo =
          'BN' + '/' + data.centerCode + '/' + '001' + '/' + this.ets.financialYear + ',' +
          'BN' + '/' + data.centerCode + '/' + '002' + '/' + this.ets.financialYear;

      }
      else if (split.includes('PD')) {
        data.batchNo = 'BN' + '/' + data.centerCode + '/' + '001' + '/' + this.ets.financialYear;
      }
      else if (split.includes('DM')) {
        data.batchNo = 'BN' + '/' + data.centerCode + '/' + '002' + '/' + this.ets.financialYear;

      }

    })

  }
  selectData(data) {

    try {

      this.taxtotal = 0;
      this.taxttotalRounded = 0;
      this.total = 0;
      this.total1 = 0;
      this.feewTotal1 = 0;
      this.feewtTotal = 0;
      this.temprate = 0;
      this.tot = 0;
      this.totalamount = 0;
      // for (let i = 0; i <= this.desplist.length; i++) {
      //   this.desplist.splice(i, this.desplist.length);
      // }

      for (let i = 0; i <= data.length; i++) {
        var temp = data[i];
        if (temp != null) {
          this.total = this.total + parseFloat(temp.despatchList.totalAmount.toString());
          // console.log('tempvalue*****', temp)
          this.total1 = parseFloat(this.total.toFixed(2));
          // console.log('desplist*****', this.temp)

          this.taxtotal = this.taxtotal + parseFloat(temp.despatchList.taxAmount.toString());
          this.taxttotalRounded = parseFloat(this.taxtotal.toFixed(2));
          this.feewtTotal = this.feewtTotal + parseFloat(temp.despatchList.FWT.toString());
          this.feewTotal1 = parseFloat(this.feewtTotal.toFixed(2));
          this.tot = this.tot + parseFloat(temp.despatchList.Amount);
          this.totalamount = parseFloat(this.tot.toFixed(2));

        }
      }
    }
    catch (e) {
      console.log('Exception..', e)
    }

  }
  getMothFromDate(dateData) {
    if (dateData != null) {
      var month = dateData.toString().slice(3, -5)
      // console.log('month**',month)
      return month;
    }
  }
  ngOnInit() {
    if (this.ets.cookievalue != null && (this.ets.cookievalue.indexOf('x9') !== -1) || (this.ets.cookievalue == "All")) {
      console.log('inside if condition *********************')
      // this.router.navigate(['/dd-entry'])
    }
    else {
      this.router.navigate(['/error']);
    }
  }

  filterMonth(key) {
    this.selectmonth = key;
    this.selectedData = null;

    // for (let i = 0; i <= this.desplist.length; i++) {
    //   this.desplist.splice(i, this.desplist.length);
    // }
    if (this.selectedfee == null && this.selectedcenter == null) {
      this.selectedData = this.erpList.filter(s => this.getMothFromDate(s.erpdate) == this.selectmonth && s.isdbaEntered == null)
      //    console.log('selected data',this.selectedData)
      //this.getdespatchDetails(this.selectedData);
      this.getbatchNo();
      this.selectData(this.selectedData)
    }
    else if (this.selectedfee == null) {
      this.selectedData = this.erpList.filter(s => this.getMothFromDate(s.erpdate) == this.selectmonth && s.centerName == this.selectedcenter && s.isdbaEntered == null)
      //this.getdespatchDetails(this.selectedData);
      this.getbatchNo();
      this.selectData(this.selectedData)

    }
    else if (this.selectedcenter == null) {
      this.selectedData = this.erpList.filter(s => s.feesItem == this.selectedfee && this.getMothFromDate(s.erpdate) == this.selectmonth && s.isdbaEntered == null)
      //this.getdespatchDetails(this.selectedData);
      this.getbatchNo();
      this.selectData(this.selectedData)

    }
    else {
      this.selectedData = this.erpList.filter(
        s => this.getMothFromDate(s.erpdate) == this.selectmonth && s.centerName == this.selectedcenter && s.feesItem == this.selectedfee && s.isdbaEntered == null)
      // //this.getdespatchDetails(this.selectedData);
      this.getbatchNo();
      this.selectData(this.selectedData)
    }

  }

  filterCenter(key) {

    this.selectedcenter = key;
    this.selectedData = null;
    // for (let i = 0; i <= this.desplist.length; i++) {
    //   this.desplist.splice(i, this.desplist.length);
    // }
    if (this.selectedfee == null && this.selectmonth == null) {
      this.selectedData = this.erpList.filter(s => s.centerName == this.selectedcenter && s.isdbaEntered == null)
      //this.getdespatchDetails(this.selectedData);
      this.getbatchNo();
      this.selectData(this.selectedData)

    }
    else if (this.selectedfee == null) {
      this.selectedData = this.erpList.filter(s => s.centerName == this.selectedcenter && this.getMothFromDate(s.erpdate) == this.selectmonth && s.isdbaEntered == null)
      //this.getdespatchDetails(this.selectedData);
      console.log('with fee filter******')

      this.getbatchNo();
      this.selectData(this.selectedData)
      console.log(this.selectedData);


    }
    else if (this.selectmonth == null) {
      this.selectedData = this.erpList.filter(s => s.centerName == this.selectedcenter && s.feesItem == this.selectedfee && s.isdbaEntered == null)
      console.log('with fee filter******')
      this.getbatchNo();
      this.selectData(this.selectedData)

    }
    else {
      this.selectedData = this.erpList.filter(s => this.getMothFromDate(s.erpdate) == this.selectmonth && s.centerName == this.selectedcenter && s.feesItem == this.selectedfee && s.isdbaEntered == null)
      //this.getdespatchDetails(this.selectedData);
      this.getbatchNo();
      this.selectData(this.selectedData)
    }


  }
  getdespatchDetails(data) {

  }
  //validation
  dbaForm = new FormGroup(
    {
      dbaNum: new FormControl(),
      dbaDate: new FormControl()
    }
  );
  dbacreateForm() {
    this.dbaForm = this.fb.group(
      {
        dbaNum: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],

        dbaDate: [null, Validators.required]
      }
    )
  };
  get dbaNum() { return this.dbaForm.get('dbaNum'); }
  get dbaDate() { return this.dbaForm.get('dbaDate'); }

  resetform() {
    this.dbaForm.reset(
      {
        dbaNum: null,
        dbaDate: null
      }
    )

  }
  beforeRegister(key){

  }
  filterFee(key){

  }
  export(){

  }
}

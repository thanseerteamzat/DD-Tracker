import { Component, OnInit } from '@angular/core';
import { EtsService } from 'src/app/services/ets.service';
import { KkcService } from 'src/app/services/kkc.service';
import { AcadamicService } from 'src/app/services/acadamic.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { KKCDespatch, KKCDespatchData } from 'src/app/models/KKC/kkc-despatch';
import { KKCentryData, kkcddEntry } from 'src/app/models/KKC/kkcddentry';
import { CenterData, Center } from 'src/app/models/Center';

@Component({
  selector: 'app-kkc-despatch-stud-list',
  templateUrl: './kkc-despatch-stud-list.component.html',
  styleUrls: ['./kkc-despatch-stud-list.component.css']
})
export class KkcDespatchStudListComponent implements OnInit {
  despatchEntries: KKCDespatchData
  despatchList = new Array<KKCDespatch>();
  despList = new Array<KKCDespatch>();
  kkcddEntries: KKCentryData
  ddList = new Array<kkcddEntry>();
  ddListTotal: kkcddEntry[]
  ddEnteredList = new Array<kkcddEntry>();
  centers: CenterData
  centerList = new Array<Center>();
  selectcenter;
  selectmonth;
  selectedCenter;
  selectedMonth;
  total = 0
  totalTemp = 0
  feeWtax = 0;
  feeWTtemp = 0;
  tax = 0;
  taxTotal = 0;
  selectlisttotal = 0;
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
  selectedData: kkcddEntry[];

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private academic: AcadamicService,
    private kkc: KkcService,
    private ets: EtsService
  ) {
    this.getKKCddEntryDetails();
    this.getkkcCenters();
  }
  getDespatchEntry() {
    let that = this;
    that.kkc.GetdespatchEntry().subscribe(data => {
      that.despatchEntries = data;
      for (let i = 0; i <= data.Data.length; i++) {
        let despatchEntry = new KKCDespatch();
        if (data.Data[i] != null) {

          this.despatchList.push(data.Data[i]);
          this.despList.push(data.Data[i]);
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
          this.ddListTotal = this.ddList.filter(s => s.isdespatchEntered == true)
          this.selectedListTotal(this.ddListTotal);
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
  ngOnInit() {
    if (this.ets.cookievalue != null && (this.ets.cookievalue.indexOf('x8') !==-1 ) || (this.ets.cookievalue == "All"))  {
      console.log('inside if condition *********************')
      // this.router.navigate(['/dd-entry'])
    }
    else {
      this.router.navigate(['/error']);
    }
  }
  listDatabyFiltering() {
    this.ddList.splice(0, this.ddList.length);
    this.selectedData.forEach(data => {
      this.ddList.push(data);
    })
    this.selectedListTotal(this.ddList)
  }

  selectedListTotal(data) {
    this.total = 0
    this.totalTemp = 0
    this.feeWtax = 0;
    this.feeWTtemp = 0;
    this.tax = 0;
    this.taxTotal = 0;
    this.selectlisttotal = 0;
    try {

      for (var i = 0; i <= data.length; i++) {
        var temp = data[i];
        if (temp != null) {
          this.selectlisttotal = data.length;

          this.total = this.total + parseFloat(temp.ddAmount.toString());
          this.totalTemp = parseFloat(this.total.toFixed(2));
          let fwt = parseFloat(temp.ddAmount.toString()) / 1.18;

          this.feeWtax = this.feeWtax + fwt;
          this.feeWTtemp = parseFloat(this.feeWtax.toFixed(2));
          let tax = parseFloat(temp.ddAmount) - fwt;
          this.tax = this.tax + tax;
          this.taxTotal = parseFloat(this.tax.toFixed(2));
        }
      }
    }

    catch (e) {
      console.log('Exception***', e)
    }
  }
  filterMonth(month) {
    this.selectmonth = month;
    this.selectedData = null;
    if (this.selectcenter == null) {
      this.selectedData = this.ddEnteredList.filter(c => this.getMothFromDate(c.despatchDate)
        == this.selectmonth && c.isdespatchEntered == true)
      this.listDatabyFiltering()
    }
    else if (this.selectmonth == null) {
      this.selectedData = this.ddEnteredList.filter(c => c.centerName
        == this.selectcenter && c.isdespatchEntered == true)
      this.listDatabyFiltering()

    }
    else {
      this.selectedData = this.ddEnteredList.filter(c => c.centerName == this.selectcenter
        && this.getMothFromDate(c.despatchDate) == this.selectmonth && c.isdespatchEntered == true)
      this.listDatabyFiltering()
    }

  }
  filterCenter(center) {
    this.selectcenter = center;
    this.selectedData = null;

    if (this.selectmonth == null) {
      this.selectedData = this.ddEnteredList.filter(c => c.centerName
        == this.selectcenter && c.isdespatchEntered == true)
      this.listDatabyFiltering()

    }
    else if (this.selectcenter == null) {
      this.selectedData = this.ddEnteredList.filter(c => this.getMothFromDate(c.despatchDate)
        == this.selectmonth && c.isdespatchEntered == true)
      this.listDatabyFiltering()
    }

    else {
      this.selectedData = this.ddEnteredList.filter(c => c.centerName == this.selectcenter
        && this.getMothFromDate(c.despatchDate) == this.selectmonth && c.isdespatchEntered == true)
      this.listDatabyFiltering()
    }

  }
  getMothFromDate(dateData) {
    if (dateData != null) {
      var month = dateData.toString().slice(3, -5)
      //  console.log('month**',month)
      return month;
    }
  }
}

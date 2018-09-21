import { Component, OnInit } from '@angular/core';
import { EtsService } from '../services/ets.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Center } from '../models/Center';
import { despatchList, Despatch, taxtemp } from '../models/despatch';
import { Common } from '../models/common';
import { ddEntry, ddList } from '../models/ddEntry';
import { element } from 'protractor';

@Component({
  selector: 'app-desp-stud-list',
  templateUrl: './desp-stud-list.component.html',
  styleUrls: ['./desp-stud-list.component.css']
})
export class DespStudListComponent implements OnInit {
  centerList: Center[] = [];
  centers: Center[] = [];
  // ddLists: despatchList[] = [];
  selectedcenter;
  selectedDespatch;
  ddLists: ddList[] = [];
  ddentrylist: ddEntry[] = [];
  selectedData: Array<ddList>;
  temp: ddEntry;
  total; totalTemp;
  tax; taxTotal;
  feeWtax; feeWTtemp;
  selectedDatatemp;
  datetemp;
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
  selectedCenter;
  tempsplit;
  selectedMonth;
  selectlisttotal;
  selectmonth
  selectedfee
  constructor(
    private db: AngularFireDatabase,
    private ets: EtsService,
    private router: Router
  ) {
    let centerResponse = this.ets.centerList;
    //  Iterate throw all keys.
    for (let cent of centerResponse) {

      this.centerList.push(cent);

    }
    // this.selectedData = this.centerList;


    let that = this;
    //center list from api
    this.ets.GetAllCenters().subscribe(data => {
      that.centers = data;
      this.ets.centerList = this.centers
    },
      error => console.log(error),
      () => console.log('Get all complete'));

    let itemRef = db.object('ddEntry');
    itemRef.snapshotChanges().subscribe(action => {
      this.ddLists = [];
      var quatationsList = action.payload.val();
      let quotationobj = Common.snapshotToArray(action.payload);
      quotationobj.forEach(element => {
        let ddListItem = new ddList();
        let ddentryitem = new ddEntry();
        let qobj: ddEntry = JSON.parse(element);
        // console.log("****" + element);
        if (qobj.ddlastId != undefined) {
          qobj.ddlastId = qobj.ddlastId.replace("/", "");
        }

        ddListItem.ddenter = qobj;
        // ddentryitem = qobj;

        let centList = this.ets.centerList.filter(s => s.Id == (qobj.centerId));
        // console.log('2222222222222222222222222222',custList)
        if (centList.length > 0) {
          ddListItem.center = centList[0];
        }

        this.ddLists.push(ddListItem);
        // this.ddentrylist.push(ddentryitem);

      });

    });
  }


  ngOnInit() {

    if (this.ets.cookievalue == "3") {
      // this.router.navigate(['/despatch-no-entry'])
    }
    else {
      this.router.navigate(['/error']);


    }
  }
  selectData(data) {
    this.total = 0
    this.totalTemp = 0
    this.feeWtax = 0;
    this.feeWTtemp = 0;
    this.tax = 0;
    this.taxTotal = 0;
    this.selectlisttotal = 0;
    try {
      if (data != null) {
        for (var i = 0; i <= data.length; i++) {
          var temp = data[i];

          this.selectlisttotal = data.length;

          this.total = this.total + parseFloat(temp.ddenter.Amount.toString());
          this.totalTemp = this.total.toFixed(2);
          this.tax = this.tax + parseFloat(temp.ddenter.taxValue);
          this.taxTotal = this.tax.toFixed(2);
          this.feeWtax = this.feeWtax + parseFloat(temp.ddenter.feeWT);
          this.feeWTtemp = this.feeWtax.toFixed(2);
        }
      }
    }
    catch (e) {
      console.log('Exception***', e)
    }

  }

  filterMonth(key) {

    this.selectmonth = key;
    // this.selectedData = null;
    // console.log('dd list data***', this.ddLists)
    console.log('dd list data***', this.selectmonth)

    if (this.selectedcenter == null) {
      // this.selectedData = this.ddLists
      this.selectedData = this.ddLists.filter(

        s => this.getMothFromDate(s.ddenter.despatchDate) == this.selectmonth
      )
      // console.log(this.selectedData);
      // console.log(this.ddLists);
      this.selectData(this.selectedData)
      console.log('success with center***')

    }

    else {
      this.selectedData = this.ddLists.filter(
        s => (this.getMothFromDate(s.ddenter.despatchDate)) == this.selectmonth && s.ddenter.centerId == this.selectedcenter && s.ddenter.isdespatchEntered == true
      )
      this.selectData(this.selectedData)
      console.log('success with month***')

    }



  }
  getMothFromDate(dateData) {
    if (dateData != null) {
      var month = dateData.toString().slice(3, -5)
      // console.log('month**',month)
      return month;
    }

  }
  filterCenter(key) {


    this.selectedcenter = key;
    this.selectedData = null;

    if (this.selectmonth == null) {
      this.selectedData = this.ddLists.filter(s => s.ddenter.centerId == this.selectedcenter && s.ddenter.isdespatchEntered == true)
      this.selectData(this.selectedData)

    }

    else {
      this.selectedData = this.ddLists.filter(s => this.getMothFromDate(s.ddenter.despatchDate) == this.selectmonth && s.ddenter.centerId == this.selectedcenter && s.ddenter.isdespatchEntered == true)
      this.selectData(this.selectedData)
    }


  }
}

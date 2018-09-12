import { Component, OnInit } from '@angular/core';
import { EtsService } from '../services/ets.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Center } from '../models/Center';
import { despatchList, Despatch, taxtemp } from '../models/despatch';
import { Common } from '../models/common';
import { ddEntry, ddList } from '../models/ddEntry';

@Component({
  selector: 'app-desp-stud-list',
  templateUrl: './desp-stud-list.component.html',
  styleUrls: ['./desp-stud-list.component.css']
})
export class DespStudListComponent implements OnInit {
  centerList: Center[] = [];
  centers: Center[] = [];
  // ddLists: despatchList[] = [];
  selectedCenter: string = "";
  ddLists: ddList[] = [];
  selectedData: ddList[];
  temp: ddList;
  total; totalTemp;
  tax = 0; taxTemp: taxtemp[]=[]; taxTotal; taxtotalTemp; tax1: taxtemp = new taxtemp(); taxtemp1; taxlist;
  feeWtax = 0; feeWTtemp;
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
        let qobj: ddEntry = JSON.parse(element);
        // console.log("****" + element);
        if (qobj.ddlastId != undefined) {
          qobj.ddlastId = qobj.ddlastId.replace("/", "");
        }

        ddListItem.ddenter = qobj;

        let custList = this.ets.centerList.filter(s => s.Id == (qobj.centerId));
        // console.log('2222222222222222222222222222',custList)
        if (custList.length > 0) {
          ddListItem.center = custList[0];
        }

        this.ddLists.push(ddListItem);

      });

    });
  }


  ngOnInit() {
  }

  filterCenter(key) {
    this.selectedData = this.ddLists.filter(s => s.center.Id == key && s.ddenter.despatchNo != null);
    this.total = 0
    this.totalTemp = 0;
    // this.taxTemp = 0;
    this.taxTotal = 0;

    this.feeWtax = 0;
    this.feeWTtemp = 0;
    for (var i = 0; i <= this.selectedData.length; i++) {
      this.temp = this.selectedData[i];
      var tempdata = this.temp.ddenter.Amount;
      this.total = this.total + parseFloat(this.temp.ddenter.Amount.toString());
      this.totalTemp = this.total.toFixed(2);
      this.tax = (parseFloat(this.temp.ddenter.Amount.toString()) * 18) / 100;
      this.tax1.taxamount = this.tax.toString();
      // console.log('tax amount **********',parseFloat(this.tax1.taxamount));
      this.taxtemp1 = parseFloat(this.tax1.taxamount);

      // this.taxTotal = parseFloat(this.taxTotal) + parseFloat(this.taxTemp);
      this.taxtotalTemp = this.taxTotal.toFixed(2);
      // this.feeWtax = parseFloat(tempdata) - this.taxTemp
      this.feeWTtemp = this.feeWtax.toFixed(2);
      this.taxTemp.push(this.taxtemp1)

      // console.log('filter', tempdata)
      console.log('taxtemp', this.taxTemp)

    }


  }

}

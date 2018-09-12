import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { EtsService } from '../services/ets.service';
import { Router } from '@angular/router';
import { ddList, ddEntry } from '../models/ddEntry';
import { Center } from '../models/Center';
import { Common } from '../models/common';
import { despatchList, Despatch } from '../models/despatch';

@Component({
  selector: 'app-despatchno-list',
  templateUrl: './despatchno-list.component.html',
  styleUrls: ['./despatchno-list.component.css']
})
export class DespatchnoListComponent implements OnInit {
  newddEntry: ddEntry = new ddEntry();
  ddLists: despatchList[] = [];
  centerList: Center[] = [];
  centers: Center[] = [];
  selectedCenter: string = "";
  selectedData: despatchList[] = [];
  filteredData;
  temp: despatchList[] = [];
  total = 0;
  total1;
  taxtotal = 0;
  taxttotal1;
  feewtTotal = 0;
  feewTotal1;
  centerData: ddList[] = [];
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



    let itemRef = db.object('Despatch');
    itemRef.snapshotChanges().subscribe(action => {
      this.ddLists = [];
      var quatationsList = action.payload.val();
      let quotationobj = Common.snapshotToArray(action.payload);
      quotationobj.forEach(element => {
        let ddListItem = new despatchList();
        let qobj: Despatch = JSON.parse(element);
        // console.log("****" + element);
        if (qobj.despatchNo != undefined) {
          qobj.despatchNo = qobj.despatchNo.replace("/", "");
        }

        ddListItem.despatchList = qobj;

        let centList = this.ets.centerList.filter(s => s.Id == (qobj.centerId));

        if (centList.length > 0) {
          ddListItem.center = centList[0];

          console.log('selected****', this.selectedCenter)
        }

        this.ddLists.push(ddListItem);

        // console.log('**********', this.selectedData)

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
  filterCenter(key) {
    console.log('data**********', this.ddLists)

    this.selectedData = this.ddLists.filter(s => s.center.Id == key);
    // this.centerData = this.selectedData;
    this.taxtotal = 0;
    this.taxttotal1 = 0;
    this.total = 0;
    this.total1 = 0;
    this.feewTotal1 = 0;
    this.feewtTotal = 0;
   
    for (let i = 0; i <= this.selectedData.length; i++) {
      var temp = this.selectedData[i];
      console.log('tempvalue*****', temp)
      this.total = this.total + parseFloat(temp.despatchList.totalAmount.toString());
      this.total1 = this.total.toFixed(2);
      this.taxtotal = this.taxtotal + parseFloat(temp.despatchList.taxAmount.toString());
      this.taxttotal1 = this.taxtotal.toFixed(2);
      this.feewtTotal = this.feewtTotal + parseFloat(temp.despatchList.FWT.toString());
      this.feewTotal1 = this.feewtTotal.toFixed(2);
      console.log('loooop***', this.total)

      this.temp.push(this.selectedData[i]);

    }





  }


}

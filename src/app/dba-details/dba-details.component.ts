import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { EtsService } from '../services/ets.service';
import { Router } from '@angular/router';
import { Common } from '../models/common';
import { dbaEntry, dbaList } from '../models/dbaEntry';
import { Center } from '../models/Center';

@Component({
  selector: 'app-dba-details',
  templateUrl: './dba-details.component.html',
  styleUrls: ['./dba-details.component.css']
})
export class DbaDetailsComponent implements OnInit {
  dbaList: dbaList[] = [];
  centerList: Center[] = []
  selectedData;
  temp;
  selectedDatatemp;
  centers;
  desptotal;
  taxtotal; fwtTotal;
  amountTotal;
  dtotal;
  ttotal;
  ftotal;
  samount;
  selectlisttotal;
  constructor(

    private db: AngularFireDatabase,
    private ets: EtsService,
    private router: Router,

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


    let dlRef = db.object('dbaEntry');
    dlRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      // this.dbaList = [];
      obj.forEach(element => {
        let ddListItem = new dbaList();

        let obj: dbaEntry = JSON.parse(element);
        ddListItem.dbaenter = obj;

        let centList = this.ets.centerList.filter(s => s.Id == (obj.centerId));
        // console.log('2222222222222222222222222222',custList)
        if (centList.length > 0) {
          ddListItem.center = centList[0];
        }
        this.dbaList.push(ddListItem);
        console.log('aaaaaaaaaaaaaaaaaaaa', this.dbaList)



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

    console.log('center****', key)
    // this.temp = null
    //  this.selectedData = null;

    this.selectedData = this.dbaList.filter(s => s.center.Id == key);
    this.selectlisttotal = this.selectedData.length;

    // this.selectedDatatemp = this.selectedData;
    console.log('data**********', this.selectedData)
    try {
      this.dtotal = 0;
      this.ttotal = 0;
      this.ftotal = 0;
      this.samount = 0;
      for (let i = 0; i < this.selectedData.length; i++) {
        this.temp = this.selectedData[i];
        this.dtotal = parseFloat(this.dtotal) + parseFloat(this.temp.dbaenter.despatchAmount);
        this.desptotal = this.dtotal.toFixed(2);
        this.ttotal = parseFloat(this.ttotal) + parseFloat(this.temp.dbaenter.tax);
        this.taxtotal = this.ttotal.toFixed(2);
        this.ftotal = parseFloat(this.ftotal) + parseFloat(this.temp.dbaenter.fwt);
        this.fwtTotal = this.ftotal.toFixed(2);
        this.samount = parseFloat(this.samount) + parseFloat(this.temp.dbaenter.stkAmount);
        this.amountTotal = this.samount.toFixed(2);
      }
    }
    catch (e) {

    }


  }
}

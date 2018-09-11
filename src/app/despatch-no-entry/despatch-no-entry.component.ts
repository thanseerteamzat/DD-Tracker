import { Component, OnInit } from '@angular/core';
import { ddList, ddEntry, CheckTemp, temp } from '../models/ddEntry';
import { Center } from '../models/Center';
import { Common } from '../models/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { EtsService } from "src/app/services/ets.service";
import { Router } from '@angular/router';
import { registerContentQuery } from '@angular/core/src/render3/instructions';
import { desptchLastid } from '../models/despatchlastId';
import { Despatch } from '../models/despatch';
import { ddentryTemp } from '../models/ddentryTemp';
import { ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-despatch-no-entry',
  templateUrl: './despatch-no-entry.component.html',
  styleUrls: ['./despatch-no-entry.component.css']
})
export class DespatchNoEntryComponent implements OnInit {
  newddEntry: ddEntry = new ddEntry();

  ddLists: ddList[] = [];
  centerList: Center[] = [];
  centers: Center[] = [];
  selectedcenter: string = "";
  selectedData: ddList[] = [];
  centerData;
  checklist: CheckTemp[] = [];
  ddtotal;

  despatchLastids: desptchLastid[] = [];
  newddLastId: desptchLastid = new desptchLastid();
  despatch: Despatch = new Despatch();
  count;
  fromLastId;
  sum;
  // temp: string
  feesItems = [
    { id: '1', name: 'Course Fee' },
    { id: '2', name: 'Prospectus' },
    { id: '3', name: 'Re exam' },
    { id: '4', name: 'Renewal Fee' },
    { id: '5', name: 'Affiliation' },
    { id: '6', name: 'Inspection' },
    { id: '7', name: 'Duplicate Certificate/Marklist' },
  ];
  selectedFeee;
  selectedFee;
  entered: string;
  constructor(private db: AngularFireDatabase,
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
        if (qobj.dduId != undefined) {
          qobj.dduId = qobj.dduId.replace("/", "");
        }
        this.newddEntry = qobj;
        ddListItem.ddenter = qobj;

        let centList = this.ets.centerList.filter(s => s.Id == (qobj.centerId));

        if (centList.length > 0) {
          ddListItem.center = centList[0];

          // console.log('selected****', this.selectedCenter)
        }

        this.ddLists.push(ddListItem);

        // console.log('**********', this.selectedData)

      });

    });

    //code for listing ddLastid
    let dlRef = db.object('despatchLastId');
    dlRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      this.despatchLastids = [];
      obj.forEach(element => {
        let obj: desptchLastid = JSON.parse(element);
        this.newddLastId = obj;
        this.despatchLastids.push(obj as desptchLastid);
        // console.log('aaaaaaaaaaaaaaaaaaaa', this.ddLastids)
        this.count = obj.lastId;
        this.fromLastId = obj.Id;

      });
    });


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
    // if (this.ets.cookievalue == "2" || this.ets.cookievalue == "3") {
    //   this.router.navigate(['/despatch-no-entry'])
    // }
    // else {
    //   this.router.navigate(['/error']);
    // }
    this.entered = this.ets.cookiename;
    this.despatch.enteredBy = this.entered;
    console.log('cookiename****', this.despatch.enteredBy)
  }
  filterCenter(key) {

    this.selectedData = this.ddLists.filter(s => s.ddenter.centerId == key);

    for (let i = 0; i <= this.checklist.length; i++) {
      this.checklist.pop();
    }
    console.log('........', this.checklist);

  }




  filterFee(key) {
    console.log('key....', key)
    this.selectedFeee = this.selectedData.filter(s => s.ddenter.feesItem == key)
    for (let i = 0; i <= this.checklist.length; i++) {
      this.checklist = null;
    }
    console.log('........', this.checklist);
  }
  onClick(event, temp, ddEntry: ddEntry) {
    console.log('id', temp)

    if (event == true) {
      // for (let i = 0; i != temp.length; i++) {

      this.checklist.push(ddEntry);


      // }
      console.log('event****', this.checklist)
    }
    else if (event == false) {

      this.checklist.pop();

    }
    console.log('chcklist*********', this.checklist.length)
  }
  register(key) {


    this.ddtotal = 0;

    for (let i = 0; i <= this.checklist.length; i++) {

      var temp = this.checklist[i];
      this.ddtotal = this.ddtotal + parseInt(temp.Amount);
      console.log('total*****', this.ddtotal)
      temp.despatchNo = this.newddEntry.despatchNo;
      temp.despatchDate = this.formatDate(this.newddEntry.despatchDate);
      temp.isdespatchEntered = true;
      var updates = {}

      updates['/ddEntry/' + temp.ddlastId] = JSON.stringify(temp);
      try {

        let up = this.db.database.ref().update(updates);
        this.router.navigate(['/despatch-no-entry'])
      }
      catch (e) {

      }
      //despatch new 




      var counter = parseInt(this.count) + 1;
      var updates = {};
      this.newddLastId.lastId = counter;
      updates['/despatchLastId/' + key] = JSON.stringify(this.newddLastId);
      let up = this.db.database.ref().update(updates);
      let taxamount = (this.ddtotal * 18) / 100;
      let feeWT = this.ddtotal - taxamount;

      this.despatch.centerId = this.selectedcenter;
      this.despatch.despatchDate = this.formatDate(this.newddEntry.despatchDate);
      this.despatch.despatchNo = this.newddEntry.despatchNo;
      this.despatch.feeItem = this.selectedFee
      this.despatch.isdespatchEntered = true;
      this.despatch.totalAmount = this.ddtotal;
      this.despatch.taxAmount = taxamount;
      this.despatch.FWT = feeWT;
      let ddEntryJson = JSON.stringify(this.despatch);

      console.log(ddEntryJson);
      try {
        this.db.database.ref('Despatch').child(counter.toString()).set(ddEntryJson);
        // alert("DD Entry added successfully!!.");
        // this.router.navigate(['/dd-entry']);
      }
      catch (ex) {

      }


    }
    for (let i = 0; i <= this.checklist.length; i++) {
      this.checklist.pop();
    }
    console.log('clearedlist', this.checklist)



  }

}

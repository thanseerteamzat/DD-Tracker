import { Component, OnInit } from '@angular/core';
import { ddList, ddEntry } from '../models/ddEntry';
import { Center } from '../models/Center';
import { Common } from '../models/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { EtsService } from "src/app/services/ets.service";

@Component({
  selector: 'app-despatch-no-entry',
  templateUrl: './despatch-no-entry.component.html',
  styleUrls: ['./despatch-no-entry.component.css']
})
export class DespatchNoEntryComponent implements OnInit {

  ddLists: ddList[] = [];
  centerList: Center[] = [];
  centers: Center[] = [];
  selectedCenter: string = "";
  selectedData;
  centerData;


  constructor(private db: AngularFireDatabase,
    private ets: EtsService
  ) {


    let centerResponse = this.ets.centerList;
    //  Iterate throw all keys.
    for (let cent of centerResponse) {

      this.centerList.push(cent);

    }
    this.selectedData = this.centerList;


    let that = this;
    //center list from api
    this.ets.GetAllCenters().subscribe(data => {
      that.centers = data;
      this.ets.centerList = this.centers
    },
      error => console.log(error),
      () => console.log('Get all complete'));



    // let itemRef = db.object('ddEntry');
    // itemRef.snapshotChanges().subscribe(action => {
    //   this.ddLists = [];
    //   var quatationsList = action.payload.val();
    //   let quotationobj = Common.snapshotToArray(action.payload);
    //   quotationobj.forEach(element => {
    //     let ddListItem = new ddList();
    //     let qobj: ddEntry = JSON.parse(element);
    //     // console.log("****" + element);
    //     if (qobj.dduId != undefined) {
    //       qobj.dduId = qobj.dduId.replace("/", "");
    //     }

    //     ddListItem.ddenter = qobj;

    //     let centList = this.centerList.filter(s => s.Id == (qobj.centerId));
    //     if (centList.length > 0) {
    //       ddListItem.center = centList[0];
    //       this.selectedCenter = this.centerList[0].Id;
    //     }

    //     this.ddLists.push(ddListItem);

    //   });

    // });
  }

  ngOnInit() {
  }
  filterCenter(key) {
    let centerResponse = this.ets.centerList;
    //  Iterate throw all keys.
    for (let cent of centerResponse) {

      this.centerList.push(cent);

    }
    this.selectedData = this.centerList;
    console.log('data.........', this.selectedData)

    this.selectedData = this.centerList.filter(s => s.Id == key);

    console.log('........', this.selectedData)



  }

}

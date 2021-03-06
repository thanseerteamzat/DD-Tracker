import { Component, OnInit } from '@angular/core';
import { ddList, ddEntry } from '../models/ddEntry';
import { Center } from '../models/Center';
import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../models/common';
import { Router } from '@angular/router';
import { EtsService } from '../services/ets.service';

@Component({
  selector: 'app-dd-id-entry',
  templateUrl: './dd-id-entry.component.html',
  styleUrls: ['./dd-id-entry.component.css']
})
export class DdIdEntryComponent implements OnInit {

  ddLists: ddList[] = [];
  centerList: Center[] = [];
  constructor(private db: AngularFireDatabase, private router: Router, private ets: EtsService) {

    this.ets.GetAllCenters().subscribe(data => {

      this.ets.centerList = data;

    },
      error => console.log(error),
      () => console.log('Get all complete'));

    let centerResponse = this.ets.centerList;
    //  Iterate throw all keys.
    for (let cent of centerResponse) {

      this.centerList.push(cent);

    }

    let itemRef = db.object('ddEntry');
    itemRef.snapshotChanges().subscribe(action => {
      this.ddLists = [];
      var quatationsList = action.payload.val();
      let quotationobj = Common.snapshotToArray(action.payload);
      quotationobj.forEach(element => {
        let ddListItem = new ddList();
        let qobj: ddEntry = JSON.parse(element);
        console.log("****" + element);
        if (qobj.dduId != undefined) {
          qobj.dduId = qobj.dduId.replace("/", "");
        }

        ddListItem.ddenter = qobj;

        let custList = this.centerList.filter(s => s.Id == (qobj.centerId));
        if (custList.length > 0) {
          ddListItem.center = custList[0];
        }

        this.ddLists.push(ddListItem);

      });

    });
  }


  ngOnInit() {

    if (this.ets.cookievalue == "2"|| this.ets.cookievalue == "3") {
      this.router.navigate(['/dd-id-entry'])
    }
    else {
      this.router.navigate(['/error']);
    }

  }
  updateDD(key, ddentry: ddEntry) {
    this.db.database.ref(`ddEntry/${key}`).once("value", snapshot => {

      let sid = snapshot.key;
      if (snapshot.exists()) {
        if (confirm('Are you sure to submit  ' + ddentry.ddId)) {

          ddentry.isVerified = true;
          ddentry.isddIdentered = true;

          var updates = {};
          updates['/ddEntry/' + sid] = JSON.stringify(ddentry);
          try {
            let up = this.db.database.ref().update(updates);
            this.router.navigate(['/dd-id-entry']);
          }
          catch (ex) {
            alert("Error in verifying dd");
          }
        }
        console.log('data......', ddentry)
      }
    })
  }

}

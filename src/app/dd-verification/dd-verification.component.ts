import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ddEntry, ddList } from '../models/ddEntry';
import { Common } from '../models/common';
import { Center } from '../models/Center';
import { Router, ActivatedRoute } from '@angular/router';
import { EtsService } from '../services/ets.service';
@Component({
  selector: 'app-dd-verification',
  templateUrl: './dd-verification.component.html',
  styleUrls: ['./dd-verification.component.css']
})
export class DdVerificationComponent implements OnInit {

  ddLists: ddList[] = [];
  centerList: Center[] = [];

  count;
  

  constructor(private route : ActivatedRoute,private db: AngularFireDatabase, private router: Router, private ets: EtsService) {

  
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
        // console.log("****" + element);
        if (qobj.ddlastId != undefined) {
          qobj.ddlastId = qobj.ddlastId.replace("/", "");
        }

        ddListItem.ddenter = qobj;

        let custList = this.ets.centerList.filter(s => s.Id == (qobj.centerId));
        console.log('2222222222222222222222222222',custList)
        if (custList.length > 0) {
          ddListItem.center = custList[0];
        }

        this.ddLists.push(ddListItem);

      });

    });
  





  }

  ngOnInit() {

    if (this.ets.cookievalue == "2"|| this.ets.cookievalue == "3" || this.ets.cookievalue =="1") {
      this.router.navigate(['/dd-verification'])
    }
    else {
      this.router.navigate(['/error']);
    }
    // if (this.ets.cookievalue == "2"|| this.ets.cookievalue == "3" || ) {
    //   this.router.navigate(['/dd-verification'])
    // }
    // else {
    //   this.router.navigate(['/error']);
    // }

    

    
  }
  verify(key, ddentry: ddEntry) {
    this.db.database.ref(`ddEntry/${key}`).once("value", snapshot => {

      let sid = snapshot.key;
      if (snapshot.exists()) {


        if (confirm('Are you sure to verify this dd entry')) {

          ddentry.isVerified = true;

          var updates = {};
          updates['/ddEntry/' + sid] = JSON.stringify(ddentry);
          try {
            let up = this.db.database.ref().update(updates);
            this.router.navigate(['/dd-verification']);
          }
          catch (ex) {
            alert("Error in verifying dd");
          }
        }
        console.log('ddddd', ddentry)

      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { adjddEntry, adjddList } from '../models/adjlastid';
import { Common } from '../models/common';
import { Center } from '../models/Center';
import { Router, ActivatedRoute } from '@angular/router';
import { EtsService } from '../services/ets.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-adjverification',
  templateUrl: './adjverification.component.html',
  styleUrls: ['./adjverification.component.css']
})
export class AdjverificationComponent implements OnInit {

  ddLists: adjddList[] = [];
  centerList: Center[] = [];

  count;
  format;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private router: Router, private ets: EtsService) {


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



    let itemRef = db.object('adjddEntry');
    itemRef.snapshotChanges().subscribe(action => {
      this.ddLists = [];
      var quatationsList = action.payload.val();
      let quotationobj = Common.snapshotToArray(action.payload);
      quotationobj.forEach(element => {
        let ddListItem = new adjddList();
        let qobj: adjddEntry = JSON.parse(element);
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


    // this.format = formatDate();



  }

  ngOnInit() {
    if (this.ets.cookievalue != null && (this.ets.cookievalue.indexOf('x2') !==-1 ) || (this.ets.cookievalue == "All"))  {
      console.log('inside if condition *********************')
      // this.router.navigate(['/dd-entry'])
    }
    else {
      this.router.navigate(['/error']);
    }
  

    // if (this.ets.cookievalue == "2" || this.ets.cookievalue == "3") {
    //   // this.router.navigate(['/dd-verification'])
    // }
    // else {
    //   this.router.navigate(['/error']);
    // }
    // if (this.ets.cookievalue == "2"|| this.ets.cookievalue == "3" || ) {
    //   this.router.navigate(['/dd-verification'])
    // }
    // else {
    //   this.router.navigate(['/error']);
    // }




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


  verify(key, ddentry: adjddEntry) {
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

  entrySelection(ddlastId, ddentry: adjddEntry) {

    console.log(ddlastId)
    console.log('inside functionl entry selection', ddlastId)
    console.log(ddentry.entryPros);
    console.log(ddentry.ddlastId)
    if (ddentry.entryPros == false) {
      this.router.navigate(['/adjdetails/' + ddlastId])
    }
    else {
      this.router.navigate(['ddentrypros-details/' + ddlastId])
    }
  }


}

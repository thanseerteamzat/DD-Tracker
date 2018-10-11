import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from 'selenium-webdriver/http';
import { ConfigService } from '../services/config.service';
import { EtsService } from '../services/ets.service';
import { FormBuilder } from '@angular/forms';
import { Common } from '../models/common';
import { InvoiceEntry } from '../models/invoiceentry';
import { Center } from '../models/Center';

@Component({
  selector: 'app-invoice-entry-details',
  templateUrl: './invoice-entry-details.component.html',
  styleUrls: ['./invoice-entry-details.component.css']
})
export class InvoiceEntryDetailsComponent implements OnInit {
  ddentries: InvoiceEntry[] = [];
  newddentry: InvoiceEntry = new InvoiceEntry();
  centerList: Center[] = [];
  isEditable;
  isEditMode;
  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    // private http: HttpClient,
    private config: ConfigService,
    private ets: EtsService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {

    let id = this.route.snapshot.paramMap.get('invoiceEntryId');
    console.log(id);
    
    let dReference = db.object('invoiceEntry');
    dReference.snapshotChanges().subscribe(action => {
      console.log(action.type);
      console.log(action.key);
      var ddentryList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      this.ddentries = [];
      obj.forEach(element => {
        let obj: InvoiceEntry = JSON.parse(element);
        let ddListItem = new InvoiceEntry();
        if (obj.invoiceEntryId != undefined && (obj.invoiceEntryId == id)) {
          obj.invoiceEntryId = obj.invoiceEntryId.replace("/", "");
          this.newddentry = obj;
          console.log('***********************',this.newddentry.invoiceEntryId)
          // let center = this.centerList.filter(s => s.Id == (obj.centerId));
          // if (center.length > 0) {
          //   this.selectedcenter = center[0];
          // }
        }
      })
    })

   }

  ngOnInit() {
    if (this.ets.cookievalue != null && (this.ets.cookievalue.indexOf('x1') !==-1 ) || (this.ets.cookievalue == "All"))  {
      console.log('inside if condition *********************')
      // this.router.navigate(['/dd-entry'])
    }
    else {
      this.router.navigate(['/error']);
    }

  }

  verify(key, ddentry: InvoiceEntry) {

    console.log('inside function')
    // console.log('888888888888888888888888888',key)
    this.db.database.ref(`invoiceEntry/${key}`).once("value", snapshot => {

      let sid = snapshot.key;
      if (snapshot.exists()) {


        if (confirm('Are you sure to verify this dd ')) {

          this.newddentry.isVerified = true;
          ddentry.isVerified = true;
          console.log(this.newddentry.isVerified)

          var updates = {};
          updates['/invoiceEntry/' + sid] = JSON.stringify(ddentry);
          try {
            let up = this.db.database.ref().update(updates);
            this.router.navigate(['/invoiceentryverification']);
          }
          catch (ex) {
            alert("Error in verifying dd");
          }
        }
        // console.log('ddddd', ddentry)

      }
    });
  }
  
}

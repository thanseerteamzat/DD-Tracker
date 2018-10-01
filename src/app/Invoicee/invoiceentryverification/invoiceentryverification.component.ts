import { Common } from '../../models/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { EtsService } from '../../services/ets.service';
import { InvoiceComponent } from '../Invoice Generation/invoice.component';
import { InvoiceEntry, invoiceentryList } from '../../models/invoiceentry';
import { Center } from '../../models/Center';

@Component({
  selector: 'app-invoiceentryverification',
  templateUrl: './invoiceentryverification.component.html',
  styleUrls: ['./invoiceentryverification.component.css']
})
export class InvoiceentryverificationComponent implements OnInit {


  
  ddLists: invoiceentryList[] = [];
  centerList: Center[] = [];

  count;
  format;
  constructor(private route: ActivatedRoute,
              private db: AngularFireDatabase,
               private router: Router,
                private ets: EtsService) {

    
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
              
              
              
                  let itemRef = db.object('invoiceEntry');
                  itemRef.snapshotChanges().subscribe(action => {
                    this.ddLists = [];
                    var quatationsList = action.payload.val();
                    let quotationobj = Common.snapshotToArray(action.payload);
                    quotationobj.forEach(element => {
                      let ddListItem = new invoiceentryList();
                      let qobj: InvoiceEntry = JSON.parse(element);
                      // console.log("****" + element);
                      if (qobj.invoiceEntryId != undefined) {
                        qobj.invoiceEntryId = qobj.invoiceEntryId.replace("/", "");
                      }
              
                      ddListItem.ddenter = qobj;
              
                      // let custList = this.ets.centerList.filter(s => s.Id == (qobj.centerId));
                      // // console.log('2222222222222222222222222222',custList)
                      // if (custList.length > 0) {
                      //   ddListItem.center = custList[0];
                      // }
              
                      this.ddLists.push(ddListItem);
              
                    });
              
                  });
              
              
  }

  ngOnInit() {
  }

}

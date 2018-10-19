import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { EtsService } from 'src/app/services/ets.service';
import { Router } from '@angular/router';
import { Common } from 'src/app/models/common';
import { InvoiceAmountPending } from 'src/app/models/invoice ';

@Component({
  selector: 'app-invoice-amount-pending-list',
  templateUrl: './invoice-amount-pending-list.component.html',
  styleUrls: ['./invoice-amount-pending-list.component.css']
})
export class InvoiceAmountPendingListComponent implements OnInit {
  selectedMonth;
  selectmonth;
  invAmtList: InvoiceAmountPending[] = []
  selectedData: InvoiceAmountPending[];
  Months = [
    { id: '01', name: 'Jan' },
    { id: '02', name: 'Feb' },
    { id: '03', name: 'Mar' },
    { id: '04', name: 'Apr' },
    { id: '05', name: 'May' },
    { id: '06', name: 'Jun' },
    { id: '07', name: 'Jul' },
    { id: '08', name: 'Aug' },
    { id: '09', name: 'Sep' },
    { id: '10', name: 'Oct' },
    { id: '11', name: 'Nov' },
    { id: '12', name: 'Dec' },

  ];
  constructor(
    private db: AngularFireDatabase,
    private ets: EtsService,
    private router: Router,
  ) {

    let dRef = db.object('invoiceAmtPending');
    dRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      this.invAmtList = [];
      obj.forEach(element => {
        let obj: InvoiceAmountPending = JSON.parse(element);
        this.invAmtList.push(obj as InvoiceAmountPending);
        console.log('data***', this.invAmtList)
      });
    });
  }

  ngOnInit() {

    if (this.ets.cookievalue != null && (this.ets.cookievalue.indexOf('y2') !== -1) || (this.ets.cookievalue == "All")) {
      console.log('inside if condition *********************')
      // this.router.navigate(['/dd-entry'])
    }
    else {
      this.router.navigate(['/error']);
    }
  }
  getMothFromDate(dateData) {
    if (dateData != null) {
      var month = dateData.toString().slice(3, -5)
      // console.log('month**', month)
      return month;
    }

  }
  filterMonth(key) {
    console.log(key)
    this.selectmonth = key;
    this.selectedData = this.invAmtList.filter(s => this.getMothFromDate(s.invoiceDate) == this.selectmonth && s.invAmtPending == true)
    console.log(this.selectedData)


  }


}

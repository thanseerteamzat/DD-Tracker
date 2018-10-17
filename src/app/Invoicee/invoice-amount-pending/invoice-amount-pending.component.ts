import { Component, OnInit } from '@angular/core';
import { invoiceList, Invoice, InvoiceAmountPending } from '../../models/invoice ';
import { Center } from '../../models/Center';
import { AngularFireDatabase } from 'angularfire2/database';
import { EtsService } from '../../services/ets.service';
import { Router } from '@angular/router';
import { Common } from '../../models/common';
import { TouchSequence } from 'selenium-webdriver';
import { asEnumerable } from 'linq-es2015';
import { element } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-invoice-amount-pending',
  templateUrl: './invoice-amount-pending.component.html',
  styleUrls: ['./invoice-amount-pending.component.css']
})
export class InvoiceAmountPendingComponent implements OnInit {

  invoiceList: invoiceList[] = [];
  centerList: Center[] = []
  invoice: Invoice[] = []
  selectedData: Invoice[];
  temp;
  selectedDatatemp;
  centers;
  desptotal;
  dtotal;
  selectlisttotal;
  selectedcenter;
  selectmonth;
  selectedfee;
  selectedFee;
  selectedMonth;
  selectedCenter;
  shareAmount;
  tax;
  amount; amr;
  newInvoice: Invoice = new Invoice();
  invoiceDate;
  invoiceNo;
  invoiceData;
  selectedNo;
  invoiceMonth;
  iList: Invoice[][];
  invList = new Array<InvoiceAmountPending>();
  filteredData;
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
  itempush: Invoice[] = []

  constructor(
    private db: AngularFireDatabase,
    private ets: EtsService,
    private router: Router,
  ) {
    // this.invList = []

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


    let dlRef = db.object('invoice');
    dlRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      obj.forEach(element => {
        let ddListItem = new invoiceList();

        let obj: Invoice = JSON.parse(element);
        ddListItem.invoiceenter = obj;

        let centList = this.ets.centerList.filter(s => s.Id == (obj.CenterId));
        if (centList.length > 0) {
          ddListItem.center = centList[0];
        }
        this.invoice.push(ddListItem.invoiceenter);
        this.invoiceList.push(ddListItem);

        if (this.invoice.filter(i => i.invoiceNo) != null) {
          this.invoiceData = new Set(this.invoice.map(item => item.invoiceNo));
        }

      });
    });



  }





  ngOnInit() {
    // if (this.ets.cookievalue == "3") {
    //   // this.router.navigate(['/despatch-no-entry'])
    // }
    // else {
    //   this.router.navigate(['/error']);


    // }
    if (this.ets.cookievalue != null && (this.ets.cookievalue.indexOf('y2') !== -1) || (this.ets.cookievalue == "All")) {
      console.log('inside if condition *********************')
      // this.router.navigate(['/dd-entry'])
    }
    else {
      this.router.navigate(['/error']);
    }

  }

  filterMonth(key) {
    console.log('key*****', key)
    for (let i = 0; i <= this.invList.length; i++) {
      this.invList.splice(i, this.invList.length);
    }
    this.selectmonth = key;
    this.selectedData = null;
    this.selectedData = this.invoice.filter(s => this.getMothFromDate(s.dbaMonth)
      == this.selectmonth && s.isInvoiceEntered == true)
    this.groupbyList();
    this.iList = asEnumerable(this.selectedData).GroupBy(x => x.invoiceNo).ToArray();

  }


  getMothFromDate(dateData) {
    if (dateData != null) {
      var month = dateData.toString().slice(0, -3)
      // console.log('month**', month)
      return month;
    }

  }

  groupbyList() {
    this.tax = 0;
    this.amount = 0;
    this.amr = 0;
    this.shareAmount = 0;
    this.iList = asEnumerable(this.selectedData).GroupBy(x => x.invoiceNo).ToArray();
    // console.log('iList***', this.iList)

    for (var i = 0; i < this.iList.length; i++) {
      let item = this.iList[i]
      var newList = new InvoiceAmountPending();
      for (var j: number = 0; j < item.length; j++) {
        let inneritem = item[j]
        newList.invoiceNo = inneritem.invoiceNo;
        newList.invoiceDate = inneritem.invoiceDate;
        this.shareAmount += parseFloat(inneritem.shareAmount)
        newList.shareAmount = this.shareAmount.toFixed(2);
        this.tax = (newList.shareAmount * 18) / 100;
        newList.taxAmount = parseFloat(this.tax.toFixed(2));
        this.amount = parseFloat(newList.shareAmount.toString()) + parseFloat(newList.taxAmount.toString());
        newList.totalAmount = parseFloat(this.amount.toFixed(2));
        let tds = (newList.shareAmount * 2) / 100;
        console.log(tds)
        newList.TDS = parseFloat(tds.toFixed(2))
        this.amr = parseFloat(newList.totalAmount.toString()) - parseFloat(newList.TDS.toString());
        newList.amountTobeRecieved = parseFloat(this.amr.toFixed(2));
        // newList.difference=newList.amountTobeRecieved 

      }
      this.invList.push(newList)
    }


    console.log('invList***', this.invList)




  }

}

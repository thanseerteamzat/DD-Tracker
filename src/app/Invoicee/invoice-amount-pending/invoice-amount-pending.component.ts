import { Component, OnInit } from '@angular/core';
import { invoiceList, Invoice, InvoiceAmountPending, invAmtPndgLastid } from '../../models/invoice ';
import { Center } from '../../models/Center';
import { AngularFireDatabase } from 'angularfire2/database';
import { EtsService } from '../../services/ets.service';
import { Router } from '@angular/router';
import { Common } from '../../models/common';
import { TouchSequence } from 'selenium-webdriver';
import { asEnumerable } from 'linq-es2015';
import { element } from '@angular/core/src/render3/instructions';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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
  newInvAmtPending: InvoiceAmountPending = new InvoiceAmountPending();
  pendingList: InvoiceAmountPending[] = [];
  filteredData;
  invLastids: invAmtPndgLastid[] = []
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
  selectedDataIndex;
  checkListTotalAmtPending;
  totaltaxAmount;
  totalshareAmount;
  noOfInvoices;
  entered;
  lastid;
  newinvLastid: invAmtPndgLastid = new invAmtPndgLastid();
  constructor(
    private db: AngularFireDatabase,
    private ets: EtsService,
    private router: Router,
    private fb: FormBuilder

  ) {
    // this.invList = []

    let centerResponse = this.ets.centerList;
    //  Iterate throw all keys.
    for (let cent of centerResponse) {

      this.centerList.push(cent);

    }
    // this.selectedData = this.centerList;

    // this.invoicecreateForm();
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


      });
      this.groupbyAllList(this.invoice);

    });


    let dRef = db.object('InvAmtLastid');
    dRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      this.invLastids = [];
      obj.forEach(element => {
        let obj: invAmtPndgLastid = JSON.parse(element);
        this.newinvLastid = obj;
        this.invLastids.push(obj as invAmtPndgLastid);
        this.lastid = obj.lastid;
      });
    });




  }
  groupbyAllList(data) {
    this.tax = 0;
    this.amount = 0;
    this.amr = 0;
    this.shareAmount = 0;
    this.selectedData = null;
    this.selectedData = data.filter(s => s.isInvoiceEntered == true && s.dbaMonth)
    this.iList = asEnumerable(this.selectedData).GroupBy(x => x.invoiceNo).ToArray();
    // console.log('iList***', this.iList)
    for (let i = 0; i < this.iList.length; i++) {
      let item = this.iList[i];
      var newList = new InvoiceAmountPending();
      for (let j: number = 0; j < item.length; j++) {
        let inneritem = item[j];
        newList.invoiceNo = inneritem.invoiceNo;
        newList.invoiceDate = inneritem.invoiceDate;
        newList.invAmtPending = inneritem.invAmtPending;
        this.shareAmount += parseFloat(inneritem.shareAmount)
        newList.shareAmount = this.shareAmount.toFixed(2);
        this.tax = (newList.shareAmount * 18) / 100;
        newList.taxAmount = parseFloat(this.tax.toFixed(2));
        this.amount = parseFloat(newList.shareAmount.toString()) + parseFloat(newList.taxAmount.toString());
        newList.totalAmount = parseFloat(this.amount.toFixed(2));
        let tds = (newList.shareAmount * 2) / 100;
        // console.log(tds)
        newList.incomeTaxTDS = parseFloat(tds.toFixed(2))
        this.amr = parseFloat(newList.totalAmount.toString()) - parseFloat(newList.incomeTaxTDS.toString());
        newList.amountTobeRecieved = parseFloat(this.amr.toFixed(2));
        // newList.difference=newList.amountTobeRecieved 

      }
      this.invList.push(newList)
      this.totalAmtPending(this.invList);
      // console.log('newlist', newList)

      // console.log('invlist***', this.invList)

    }
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

    if (this.ets.cookievalue != null && (this.ets.cookievalue.indexOf('y2') !== -1) || (this.ets.cookievalue == "All")) {
      // console.log('inside if condition *********************')
      // this.router.navigate(['/dd-entry'])
    }
    else {
      this.router.navigate(['/error']);
    }
    this.entered = this.ets.cookiename;

  }

  filterMonth(key) {
    for (let i = 0; i <= this.invList.length; i++) {
      this.invList.splice(i, this.invList.length);
    }
    this.selectmonth = key;
    this.selectedData = null;
    this.selectedData = this.invoice.filter(s => this.getMothFromDate(s.dbaMonth)
      == this.selectmonth && s.isInvoiceEntered == true)
    this.groupbyList();

  }


  getMothFromDate(dateData) {
    if (dateData != null) {
      var month = dateData.toString().slice(0, -3)
      return month;
    }

  }

  groupbyList() {
    this.iList = asEnumerable(this.selectedData).GroupBy(x => x.invoiceNo).ToArray();
    // console.log('ilist****', this.iList)
    for (var i = 0; i < this.iList.length; i++) {
      let item = this.iList[i]
      var newList = new InvoiceAmountPending();
      this.shareAmount = 0;
      this.tax = 0;
      this.amount = 0;
      this.amr = 0;
      for (var j: number = 0; j < item.length; j++) {
        let inneritem = item[j]
        newList.invoiceNo = inneritem.invoiceNo;
        newList.invoiceDate = inneritem.invoiceDate;
        newList.invAmtPending = inneritem.invAmtPending;
        this.shareAmount += parseFloat(inneritem.shareAmount)
        newList.shareAmount = this.shareAmount.toFixed(2);
        this.tax = (newList.shareAmount * 18) / 100;
        newList.taxAmount = parseFloat(this.tax.toFixed(2));
        this.amount = parseFloat(newList.shareAmount.toString()) + parseFloat(newList.taxAmount.toString());
        newList.totalAmount = parseFloat(this.amount.toFixed(2));
        if (inneritem.dbaMonth == 'Aug-18') {

          newList.gstTDS = 0;

        }

        else {
          let gsttds = (newList.shareAmount * 2) / 100;
          newList.gstTDS = parseFloat(gsttds.toFixed(2))
        }
        let tds = (newList.shareAmount * 2) / 100;

        // console.log(tds)
        newList.incomeTaxTDS = parseFloat(tds.toFixed(2))
        this.amr = parseFloat(newList.totalAmount.toString()) - parseFloat(newList.incomeTaxTDS.toString());
        newList.amountTobeRecieved = parseFloat(this.amr.toFixed(2));
        // newList.difference=newList.amountTobeRecieved 

      }
      this.invList.push(newList)
      this.totalAmtPending(this.invList);

    }
  }

  totalAmtPending(data) {
    this.checkListTotalAmtPending = 0;
    this.totalshareAmount = 0;
    this.totaltaxAmount = 0;
    for (let i = 0; i < data.length; i++) {
      var list = data[i];
      if (list != null) {
        this.checkListTotalAmtPending = (parseFloat(this.checkListTotalAmtPending) + parseFloat(list.amountTobeRecieved)).toFixed(2);
        this.totalshareAmount = (parseFloat(this.totalshareAmount) + parseFloat(list.shareAmount)).toFixed(2);
        this.totaltaxAmount = (parseFloat(this.totaltaxAmount) + parseFloat(list.taxAmount)).toFixed(2);
        this.noOfInvoices = data.length;
      }
    }
  }

  checkList(event, id, data: InvoiceAmountPending) {

    if (event == true) {

      this.pendingList.push(data);
    }
    else if (event == false) {
      this.selectedDataIndex = this.pendingList.findIndex(list => list.invoiceNo == id);
      this.pendingList.splice(this.selectedDataIndex, 1);
    }

  }

  beforeRegister() {
    if (this.pendingList.length == 0) {
      alert('Please select any Entry !!')

    }
    else {

      this.pendingList.forEach(data => {
        if (data.recievedAmount == null && data.recievedDate == null) {
          alert("Please enter selected data's recieved amount and date !!")

        }
        else {
          this.register();
        }

      })
    }
  }

  register() {
    try {

      var counter = parseFloat(this.lastid) + 1;
      for (let i = 0; i < this.pendingList.length; i++) {
        var list = this.pendingList[i];
        if (list != null) {
          list.recievedDate = this.formatDate(list.recievedDate);
          list.difference = parseFloat(list.totalAmount.toString()) - parseFloat(list.recievedAmount.toString());
          list.enteredBy = this.entered;
          this.iList.forEach(data => {
            data.forEach(innerdata => {
              if (innerdata.invoiceNo == list.invoiceNo) {
                var updates = {};
                innerdata.invAmtPending = true;
                updates['/invoice/' + innerdata.invoiceId] = JSON.stringify(innerdata);
                try {

                  let up = this.db.database.ref().update(updates);
                }
                catch (e) {

                }
              }
            })
          })

          let invoiceAmtEntryJson = JSON.stringify(list);
          console.log(invoiceAmtEntryJson);
          let split = list.invoiceNo.slice(0, -10)
          try {
            this.db.database.ref('invoiceAmtPending').child(split).set(invoiceAmtEntryJson);
          }
          catch (ex) {

          }
        }
      }
      alert('Added Successfully ');


    }
    catch (e) {
      console.log('Exception', e);
    }

    console.log('data***', this.newInvAmtPending)
  }

 

}

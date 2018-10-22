import { Component, OnInit } from '@angular/core';
import { invoiceList, Invoice, InvoiceCenterList2, tempInvCenterList2 } from 'src/app/models/invoice ';
import { Center } from 'src/app/models/Center';
import { Common } from 'src/app/models/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { EtsService } from 'src/app/services/ets.service';
import { Router } from '@angular/router';
import { asEnumerable } from 'linq-es2015';
import { element } from 'protractor';

@Component({
  selector: 'app-kcvtp-center-invList2',
  templateUrl: './kcvtp-center-invList2.component.html',
  styleUrls: ['./kcvtp-center-invList2.component.css']
})
export class KcvtpCenterinvList2Component implements OnInit {
  centerList: Center[] = []
  selectedData: Invoice[];
  temp;
  selectedDatatemp;
  centers;
  desptotal;
  taxtotal; fwtTotal;
  amountTotal;
  dtotal;
  ttotal;
  ftotal;
  samount;
  selectlisttotal;
  selectedcenter;
  selectmonth;
  selectedfee;
  selectedFee;
  selectedMonth;
  selectedCenter;
  ackData;
  invoiceList: invoiceList[] = [];
  invoice: Invoice[] = [];
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
  feesItems = [
    { id: '1', name: 'Course Fee' },
    { id: '2', name: 'Prospectus' },
    { id: '3', name: 'Re exam' },
    { id: '4', name: 'Renewal Fee' },
    { id: '5', name: 'Affiliation' },
    { id: '6', name: 'Inspection' },
    { id: '7', name: 'Duplicate Certificate/Marklist' },
  ];
  groupList: Invoice[][];
  groupList1: Invoice[][];
  groupList2 = new Array<Invoice[][]>()
  invList = new Array<tempInvCenterList2>();

  shareAmountTotal;
  constructor(private db: AngularFireDatabase,
    private ets: EtsService,
    private router: Router,

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


    let dlRef = db.object('invoice');
    dlRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);

      obj.forEach(element => {
        let ddListItem = new invoiceList();

        let obj: Invoice = JSON.parse(element);
        ddListItem.invoiceenter = obj;

        let centList = that.ets.centerList.filter(s => s.Id == (obj.CenterId));

        // console.log('2222222222222222222222222222',custList)
        if (centList.length > 0) {
          ddListItem.center = centList[0];
        }
        this.invoice.push(ddListItem.invoiceenter);
        this.invoiceList.push(ddListItem);
      });
      // this.groupbyAllList(this.invoice);
      // console.log('group list 1', this.invList)

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
  groupbyAllList(data) {
    this.selectedData = null;
    let centerResponse = this.ets.centerList;
    //  Iterate throw all keys.
    for (let cent of centerResponse) {

      this.centerList.push(cent);

    }
    this.selectedData = data.filter(s => s.isInvoiceEntered == true && s.feesItem == 'Course Fee')
    this.groupList = asEnumerable(this.selectedData).GroupBy(x => x.CenterId).ToArray();
    // console.log('groupList****', this.groupList)

    for (let i = 0; i < this.groupList.length; i++) {
      let item = this.groupList[i];
      this.groupList1 = asEnumerable(item).GroupBy(x => x.invoiceNo).ToArray();
      this.groupList2.push(this.groupList1);
    }
    for (let j: number = 0; j < this.groupList2.length; j++) {
      var item1 = this.groupList2[j];
      for (let k: number = 0; k < item1.length; k++) {
        let inneritem = item1[k];
        var newList = new InvoiceCenterList2();
        // console.log('invList****', inneritem)
        this.shareAmountTotal = 0;
        for (let l: number = 0; l < inneritem.length; l++) {
          var inItem = inneritem[l];
          // console.log('item***1', inneritem)
          if (newList.dbaNo == null) {
            newList.dbaNo = inItem.dbaNo + '\n';
          }
          else {
            newList.dbaNo += inItem.dbaNo.toString() + '\n';
          }
          newList.InvoiceNo = inItem.invoiceNo;
          this.centerList.forEach(data => {
            if (data.Id == inItem.CenterId) {
              newList.centerName = data.CenterName;

            }
          })
          newList.invoiceMonth = inItem.dbaMonth;
          (newList.dbaAmount += parseFloat(inItem.dbaAmount)).toFixed(2);
          this.shareAmountTotal = parseFloat(this.shareAmountTotal) + parseFloat(inItem.shareAmount.toString());
          newList.shareAmount = this.shareAmountTotal.toFixed(2);
          newList.invoiceDate = inItem.invoiceDate;

        }
        this.invList.push(newList);

      }
      // console.log('invList in constructor**', this.invList);

    }

  }







  filterMonth(key) {
    this.selectmonth = key;
    this.selectedData = null;
    // for (let a = 0; a <= this.invList.length; a++) {
    //   this.invList.splice( this.invList.length);
    // }
    this.invList = [];
    console.log('invlist change', this.invList)

    if (this.selectedcenter == null) {
      this.selectedData = this.invoice.filter(s => this.getMothFromDate(s.dbaMonth) ==
        this.selectmonth && s.isInvoiceEntered == true && s.feesItem == 'Course Fee');
      this.groupbyList();
    }

  }
  filterCenter(key) { }

  groupbyList() {
    // this.selectedData = null;
    let centerResponse = this.ets.centerList;
    //  Iterate throw all keys.
    for (let cent of centerResponse) {

      this.centerList.push(cent);

    }
    this.groupList = asEnumerable(this.selectedData).GroupBy(x => x.CenterId).ToArray();
    // console.log('groupList****', this.groupList)
    for (let i = 0; i < this.groupList.length; i++) {
      let item = this.groupList[i];
      this.groupList1 = asEnumerable(item).GroupBy(x => x.invoiceNo).ToArray();
      this.groupList2.push(this.groupList1);
    }
    // console.log('groupList****', this.groupList2)
    for (let j: number = 0; j < this.groupList2.length; j++) {
      var item1 = this.groupList2[j];
      for (let k: number = 0; k < item1.length; k++) {
        let inneritem = item1[k];
        var newList = new InvoiceCenterList2();
        // console.log('invList****', inneritem)
        this.shareAmountTotal = 0;
        for (let l: number = 0; l < inneritem.length; l++) {
          var inItem = inneritem[l];
          // console.log('item***1', inneritem)
          if (newList.dbaNo == null) {
            newList.dbaNo = inItem.dbaNo + '\n';
          }
          else {
            newList.dbaNo += inItem.dbaNo.toString() + '\n';
          }
          newList.InvoiceNo = inItem.invoiceNo;
          this.centerList.forEach(data => {
            if (data.Id == inItem.CenterId) {
              newList.centerName = data.CenterName;

            }
          })
          newList.invoiceMonth = inItem.dbaMonth;
          (newList.dbaAmount += parseFloat(inItem.dbaAmount)).toFixed(2);
          this.shareAmountTotal = parseFloat(this.shareAmountTotal) + parseFloat(inItem.shareAmount.toString());
          newList.shareAmount = this.shareAmountTotal.toFixed(2);
          newList.invoiceDate = inItem.invoiceDate;

        }

        this.invList.push(newList);
      }
      // console.log('invList in groupby**', this.invList);
    }
  }

  // filterCenter(key) {


  //   this.selectedcenter = key;
  //   this.selectedData = null;

  //   if (this.selectedfee == null && this.selectmonth == null) {
  //     this.selectedData = this.invoice.filter(s => s.invoiceenter.CenterId == this.selectedcenter && s.invoiceenter.isInvoiceEntered == true)
  //     // this.selectData(this.selectedData)

  //   }
  //   else if (this.selectedfee == null) {
  //     this.selectedData = this.invoice.filter(s => s.invoiceenter.CenterId == this.selectedcenter && this.getMothFromDate(s.invoiceenter.dbaMonth) == this.selectmonth && s.invoiceenter.isInvoiceEntered == true)
  //     console.log('with fee filter******')
  //     // this.selectData(this.selectedData)

  //   }
  //   else if (this.selectmonth == null) {
  //     this.selectedData = this.invoice.filter(s => s.invoiceenter.CenterId == this.selectedcenter && s.invoiceenter.feesItem == this.selectedfee && s.invoiceenter.isInvoiceEntered == true)
  //     console.log('with fee filter******')
  //     // this.selectData(this.selectedData)

  //   }
  //   else {
  //     this.selectedData = this.invoice.filter(s => this.getMothFromDate(s.invoiceenter.dbaMonth) == this.selectmonth && s.invoiceenter.CenterId == this.selectedcenter && s.invoiceenter.feesItem == this.selectedfee && s.invoiceenter.isInvoiceEntered == true)
  //     // this.selectData(this.selectedData)
  //   }


  // }

  getMothFromDate(dateData) {
    if (dateData != null) {
      var month = dateData.toString().slice(0, 3)
      // console.log('month**', month)
      return month;
    }
  }

}

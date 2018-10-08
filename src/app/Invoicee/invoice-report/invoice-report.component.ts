import { Component, OnInit } from '@angular/core';
import { invoiceList, Invoice } from '../../models/invoice ';
import { Center } from '../../models/Center';
import { AngularFireDatabase } from '../../../../node_modules/angularfire2/database';
import { EtsService } from '../../services/ets.service';
import { Router } from '../../../../node_modules/@angular/router';
import { Common } from '../../models/common';

@Component({
  selector: 'app-invoice-report',
  templateUrl: './invoice-report.component.html',
  styleUrls: ['./invoice-report.component.css']
})
export class InvoiceReportComponent implements OnInit {
  invoiceList: invoiceList[] = [];
  centerList: Center[] = []
  invoice: Invoice[] = []
  selectedData;
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
  feeamountTotal;
  feeamountlist;
  shareamountTotal;
  shareamountList;
  taxableAmount;
  cgst;
  sgst;
  totalinvoiceAmount;
  invoiceAmountTowords;
  invoicesplit;
  round = 0;
  convertedToWord;
  newInvoice: Invoice = new Invoice();
  invoiceDate;
  invoiceNo;
  invoiceData;
  selectedNo;
  invoiceMonth;
  Months = [
    { id: '01', name: 'JANUARY' },
    { id: '02', name: 'FEBRUARY' },
    { id: '03', name: 'MARCH' },
    { id: '04', name: 'APRIL' },
    { id: '05', name: 'MAY' },
    { id: '06', name: 'JUNE' },
    { id: '07', name: 'JULY' },
    { id: '08', name: 'AUGUST' },
    { id: '09', name: 'SEPTEMBER' },
    { id: '10', name: 'OCTOBER' },
    { id: '11', name: 'NOVEMBER' },
    { id: '12', name: 'DECEMBER' },

  ];
  constructor(
    private db: AngularFireDatabase,
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
      // this.dbaList = [];
      obj.forEach(element => {
        let ddListItem = new invoiceList();

        let obj: Invoice = JSON.parse(element);
        ddListItem.invoiceenter = obj;

        let centList = this.ets.centerList.filter(s => s.Id == (obj.CenterId));
        // console.log('2222222222222222222222222222',custList)
        if (centList.length > 0) {
          ddListItem.center = centList[0];
        }
        this.invoice.push(ddListItem.invoiceenter);
        this.invoiceList.push(ddListItem);
        if (this.invoice.filter(i => i.invoiceNo) != null) {
          this.invoiceData = new Set(this.invoice.map(item => item.invoiceNo));
          console.log('aaaaaaaaaaaaaaaaaaaa', this.invoiceData)
        }

      });
    });



  }
  selectData(data) {

    this.dtotal = 0;
    this.desptotal = 0;
    this.feeamountTotal = 0;
    this.feeamountTotal = 0;
    this.shareamountTotal = 0;
    this.shareamountList = 0;
    this.taxableAmount = 0;
    this.cgst = 0;
    this.sgst = 0;
    this.totalinvoiceAmount = 0;
    this.feeamountlist = 0;
    this.selectlisttotal = data.length;
    this.invoicesplit = 0;
    for (let i = 0; i <= data.length; i++) {
      this.temp = data[i];
      if (this.temp != null) {
        this.dtotal = parseFloat(this.dtotal) + parseFloat(this.temp.invoiceenter.dbaAmount);
        this.desptotal = this.dtotal.toFixed(2);

        this.feeamountTotal = parseFloat(this.feeamountTotal) + parseFloat(this.temp.invoiceenter.feeAmount);
        this.feeamountlist = this.feeamountTotal.toFixed(2);

        this.shareamountTotal = parseFloat(this.shareamountTotal) + parseFloat(this.temp.invoiceenter.shareAmount);
        this.shareamountList = this.shareamountTotal.toFixed(2);

        this.taxableAmount = this.shareamountList;

        let cgstrrate = 0.09;
        let cgstvalue = parseFloat(this.taxableAmount) * cgstrrate;
        this.cgst = cgstvalue.toFixed(2);

        let sgstrrate = 0.09;
        let sgstvalue = parseFloat(this.taxableAmount) * sgstrrate;
        this.sgst = sgstvalue.toFixed(2);

        let totalInvAmount = parseFloat(this.taxableAmount) + parseFloat(this.cgst) + parseFloat(this.sgst);
        this.totalinvoiceAmount = totalInvAmount.toFixed(2);
        // this.invoiceAmountTowords = this.number2text(this.totalinvoiceAmount);
        var splitmode = this.totalinvoiceAmount % 1;
        // var split = this.totalinvoiceAmount.slice(-3);
        console.log('splitted round off value**', splitmode.toFixed(2));
        var splitlasttwodigits = splitmode.toFixed(2);
        if (parseFloat(splitlasttwodigits) == 0) {
          console.log('success with zero')
          this.invoicesplit = splitlasttwodigits;
        }
        else {
          let a = 1 - parseFloat(splitlasttwodigits);
          let b = a.toFixed(2);
          console.log('b*****', b)
          let c = 0.50;
          if (b <= c.toString()) {
            console.log('greater')

            this.invoicesplit = '+' + b;
          }
          else {
            console.log('lesser')
            this.invoicesplit = '-' + splitlasttwodigits;

          }

          // console.log('actual round off', b)
        }
        // this.invoicesplit = '0.' + split;

        // this.convertedToWord = this.ets.convertedWord;
        // console.log('words in ts', this.convertedToWord)

      }
    }

  }

  ngOnInit() {
    // if (this.ets.cookievalue == "3") {
    //   // this.router.navigate(['/despatch-no-entry'])
    // }
    // else {
    //   this.router.navigate(['/error']);


    // }


  }
  generateInvoiceList(no) {
    console.log(no)
    this.selectedData = this.invoiceList.filter(s => s.invoiceenter.invoiceNo == no && s.invoiceenter.isInvoiceEntered == true)
    this.selectData(this.selectedData);
    this.selectedData.forEach(element => {
      this.invoiceDate = element.invoiceenter.invoiceDate;
      this.invoiceNo = element.invoiceenter.invoiceNo;
      var splitdate = this.invoiceDate.slice(-4)
      console.log('date**', splitdate)
      var month = this.getMothFromDate(this.invoiceDate);
      for (let i = 0; i <= this.Months.length; i++) {
        var temp = this.Months[i];
        if (temp != null && temp.id == month) {
          this.invoiceMonth = temp.name +'\t'+ splitdate
        }
      }
    });
  }

  getMothFromDate(dateData) {
    if (dateData != null) {
      var month = dateData.toString().slice(3, -5)
      // console.log('month**', month)
      return month;
    }

  }


}

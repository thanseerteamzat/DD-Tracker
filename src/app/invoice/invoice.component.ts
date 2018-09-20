import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { EtsService } from '../services/ets.service';
import { Router } from '@angular/router';
import { Common } from '../models/common';
import { dbaList, dbaEntry } from '../models/dbaEntry';
import { Center } from '../models/Center';
import { invoiceList, Invoice } from '../models/invoice ';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoiceList: invoiceList[] = [];
  centerList: Center[] = []
  selectedData;
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
        this.invoiceList.push(ddListItem);
        console.log('aaaaaaaaaaaaaaaaaaaa', this.invoiceList)



      });
    });
  }
  selectData(data) {

    try {
      this.dtotal = 0;
      this.ttotal = 0;
      this.ftotal = 0;
      this.samount = 0;
      this.desptotal = 0;
      this.taxtotal = 0;
      this.fwtTotal = 0;
      this.amountTotal = 0;
      this.selectlisttotal = data.length;

      for (let i = 0; i < data.length; i++) {
        this.temp = data[i];

        this.dtotal = parseFloat(this.dtotal) + parseFloat(this.temp.dbaenter.despatchAmount);
        this.desptotal = this.dtotal.toFixed(2);
        // if (this.temp.dbaenter.feesItem == 'Course Fee') {
        //   this.samount = 0;
        // }
        // else if(this.temp.dbaenter.feesItem == 'Prospectus')
        // {
        //   this.samount = 1;

        // }
        // this.ttotal = parseFloat(this.ttotal) + parseFloat(this.temp.dbaenter.tax);
        // this.taxtotal = this.ttotal.toFixed(2);
        this.ftotal = parseFloat(this.ftotal) + parseFloat(this.temp.dbaenter.fwt);
        this.fwtTotal = this.ftotal.toFixed(2);
        //   this.samount = parseFloat(this.samount) + parseFloat(this.temp.dbaenter.stkAmount);
        //   this.amountTotal = this.samount.toFixed(2);
      }
    }
    catch (e) {

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
  filterFee(key) {
    this.selectedfee = key;
    this.selectedData = null;
    if (this.selectmonth == null && this.selectedcenter == null) {

      this.selectedData = this.invoiceList.filter(s => s.invoiceenter.feesItem == this.selectedfee && s.invoiceenter.isdbaEntered == true)
      this.selectData(this.selectedData)
    }
    else if (this.selectmonth == null) {

      this.selectedData = this.invoiceList.filter(s => s.invoiceenter.feesItem == this.selectedfee && s.invoiceenter.CenterId == this.selectedcenter && s.invoiceenter.isdbaEntered == true)
      console.log('with month filter******')
      this.selectData(this.selectedData)

    }
    else if (this.selectedcenter == null) {

      this.selectedData = this.invoiceList.filter(s => s.invoiceenter.feesItem == this.selectedfee && ((s.invoiceenter.despatchDate.toString()).slice(3, -5)) == this.selectmonth && s.invoiceenter.isdbaEntered == true)
      console.log('with month filter******')
      this.selectData(this.selectedData)

    }
    else {
      this.selectedData = this.invoiceList.filter(s => ((s.invoiceenter.despatchDate.toString()).slice(3, -5)) == this.selectmonth && s.invoiceenter.CenterId == this.selectedcenter && s.invoiceenter.feesItem == this.selectedfee && s.invoiceenter.isdbaEntered == true)
      this.selectData(this.selectedData)
    }
  }

  filterMonth(key) {
    this.selectmonth = key;
    this.selectedData = null;

    if (this.selectedfee == null && this.selectedcenter == null) {
      this.selectedData = this.invoiceList.filter(s => ((s.invoiceenter.despatchDate.toString()).slice(3, -5)) == this.selectmonth && s.invoiceenter.isdbaEntered == true)
      this.selectData(this.selectedData)

    }
    else if (this.selectedfee == null) {
      this.selectedData = this.invoiceList.filter(s => ((s.invoiceenter.despatchDate.toString()).slice(3, -5)) == this.selectmonth && s.invoiceenter.CenterId == this.selectedcenter && s.invoiceenter.isdbaEntered == true)
      console.log('with fee filter******')
      this.selectData(this.selectedData)

    }
    else if (this.selectmonth == null) {
      this.selectedData = this.invoiceList.filter(s => s.invoiceenter.feesItem == this.selectedfee && s.invoiceenter.CenterId == this.selectedcenter && s.invoiceenter.isdbaEntered == true)
      console.log('with fee filter******')
      this.selectData(this.selectedData)

    }
    else {
      this.selectedData = this.invoiceList.filter(s => ((s.invoiceenter.despatchDate.toString()).slice(3, -5)) == this.selectmonth && s.invoiceenter.CenterId == this.selectedcenter && s.invoiceenter.feesItem == this.selectedfee && s.invoiceenter.isdbaEntered == true)
      this.selectData(this.selectedData)
    }

  }

  filterCenter(key) {


    this.selectedcenter = key;
    this.selectedData = null;

    if (this.selectedfee == null && this.selectmonth == null) {
      this.selectedData = this.invoiceList.filter(s => s.invoiceenter.CenterId == this.selectedcenter && s.invoiceenter.isdbaEntered == true)
      this.selectData(this.selectedData)

    }
    else if (this.selectedfee == null) {
      this.selectedData = this.invoiceList.filter(s => s.invoiceenter.CenterId == this.selectedcenter && ((s.invoiceenter.despatchDate.toString()).slice(3, -5)) == this.selectmonth && s.invoiceenter.isdbaEntered == true)
      console.log('with fee filter******')
      this.selectData(this.selectedData)

    }
    else if (this.selectmonth == null) {
      this.selectedData = this.invoiceList.filter(s => s.invoiceenter.CenterId == this.selectedcenter && s.invoiceenter.feesItem == this.selectedfee && s.invoiceenter.isdbaEntered == true)
      console.log('with fee filter******')
      this.selectData(this.selectedData)

    }
    else {
      this.selectedData = this.invoiceList.filter(s => ((s.invoiceenter.despatchDate.toString()).slice(3, -5)) == this.selectmonth && s.invoiceenter.CenterId == this.selectedcenter && s.invoiceenter.feesItem == this.selectedfee && s.invoiceenter.isdbaEntered == true)
      this.selectData(this.selectedData)
    }


  }
}

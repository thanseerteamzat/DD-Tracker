import { Component, OnInit } from '@angular/core';
import { Center } from 'src/app/models/Center';
import { AngularFireDatabase } from 'angularfire2/database';
import { EtsService } from 'src/app/services/ets.service';
import { Router } from '@angular/router';
import { AcadamicService } from 'src/app/services/acadamic.service';
import { InvoiceCenterList2, InvoiceCenterList2Data } from 'src/app/models/invoice ';

@Component({
  selector: 'app-center-invoice-list2',
  templateUrl: './center-invoice-list2.component.html',
  styleUrls: ['./center-invoice-list2.component.css']
})
export class CenterInvoiceList2Component implements OnInit {
  centerList: Center[] = [];
  centers;
  list: InvoiceCenterList2Data;
  centerInvoiceList2: InvoiceCenterList2[] = [];
  selectedData;
  selectedMonth;
  selectedCenter;
  centerInvoiceNo;
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
    private academic: AcadamicService
  ) {

    let that = this;
    //center list from api
    this.academic.GetAllKCVTPCenters().subscribe(resdata => {
      this.centers = resdata;
      // console.log(resdata);
      this.centerList = new Array<Center>();
      for (let i = 0; i <= resdata.Data.length; i++) {
        let c = new Center();
        if (resdata.Data[i] != null) {
          c.Id = resdata.Data[i].Id;
          c.CenterCode = resdata.Data[i].CenterCode;
          c.CenterName = resdata.Data[i].CenterName;
          c.DistrictId = resdata.Data[i].DistrictId;
          c.lastInvoiceNo = resdata.Data[i].lastInvoiceNo;
          this.centerList.push(c);

        }
      }

    },
      err => {
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      })



    that.academic.GetCenterInvoiceList2().subscribe(data => {
      that.list = data;

    },
      err => {
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      })

    console.log('list data**', this.list)
    // let invList = new InvoiceCenterList2();
    // if (this.list.Data != null) {
    //   for (let i = 0; i <= this.list.Data.length; i++) {
    //     var data = this.list.Data[i];
    //     if (data != null) {
    //       invList.dbaNo = data.dbaNo;
    //       invList.InvoiceNo = data.InvoiceNo;
    //       invList.centerName = data.centerName;
    //       invList.centerInvoiceNo = data.centerInvoiceNo
    //       invList.nextInvoiceNo = data.nextInvoiceNo;
    //       invList.centerName = data.centerName;
    //       invList.invoiceMonth = data.invoiceMonth;
    //       invList.dbaAmount = data.dbaAmount;
    //       invList.shareAmount = data.shareAmount;
    //       invList.taxableAmount = data.taxableAmount;
    //       invList.invoiceDate = data.invoiceDate;
    //       invList.enteredBy = data.enteredBy;
    //     }
    //     this.centerInvoiceList2.push(invList);

    //   }
    // }
    // console.log('DATA***', this.centerInvoiceList2)

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

  filterMonth(key) {
    console.log('key', key)


  }


  getMothFromDate(dateData) {
    if (dateData != null) {
      var month = dateData.toString().slice(0, 3)
      return month;
    }
  }
  filterCenter(key){

  }
  register(){
    
  }
}

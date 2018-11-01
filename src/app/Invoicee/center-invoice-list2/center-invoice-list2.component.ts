import { Component, OnInit } from '@angular/core';
import { Center } from 'src/app/models/Center';
import { AngularFireDatabase } from 'angularfire2/database';
import { EtsService } from 'src/app/services/ets.service';
import { Router } from '@angular/router';
import { AcadamicService } from 'src/app/services/acadamic.service';
import { InvoiceCenterList2, InvoiceCenterList2Data } from 'src/app/models/invoice ';
import { element } from 'protractor';

@Component({
  selector: 'app-center-invoice-list2',
  templateUrl: './center-invoice-list2.component.html',
  styleUrls: ['./center-invoice-list2.component.css']
})
export class CenterInvoiceList2Component implements OnInit {
  centerList: Center[] = [];
  centers;
  list: InvoiceCenterList2Data;
  centerInvoiceList2 = new Array<InvoiceCenterList2>();
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
      }),



      that.academic.GetCenterInvoiceList2().subscribe(data => {
        that.list = data;
        this.centerInvoiceList2 = new Array<InvoiceCenterList2>();
        for (let i = 0; i <= data.Data.length; i++) {
          let invList = new InvoiceCenterList2();
          if (data.Data[i] != null) {
            invList.dbaNo = data.Data[i].dbaNo;
            invList.InvoiceNo = data.Data[i].InvoiceNo;
            invList.centerName = data.Data[i].centerName;
            invList.centerInvoiceNo = data.Data[i].centerInvoiceNo
            invList.nextInvoiceNo = data.Data[i].nextInvoiceNo;
            invList.centerName = data.Data[i].centerName;
            invList.invoiceMonth = data.Data[i].invoiceMonth;
            invList.dbaAmount = data.Data[i].dbaAmount;
            invList.shareAmount = data.Data[i].shareAmount;
            invList.taxableAmount = data.Data[i].taxableAmount;
            invList.invoiceDate = data.Data[i].invoiceDate;
            invList.enteredBy = data.Data[i].enteredBy;
            this.centerInvoiceList2.push(invList);


          }


        }

        console.log('DATA***', this.centerInvoiceList2)
      },
        err => {
          console.log('Error: ' + err.error);
          console.log('Name: ' + err.name);
          console.log('Message: ' + err.message);
          console.log('Status: ' + err.status);
        })



  }

  ngOnInit() {
    // if (this.ets.cookievalue != null && (this.ets.cookievalue.indexOf('y2') !== -1) || (this.ets.cookievalue == "All")) {
    //   console.log('inside if condition *********************')
    //   // this.router.navigate(['/dd-entry'])
    // }
    // else {
    //   this.router.navigate(['/error']);
    // }
  }

  filterMonth(month) {
    console.log('key', month)



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

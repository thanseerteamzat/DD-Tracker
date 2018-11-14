import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { EtsService } from 'src/app/services/ets.service';
import { Router } from '@angular/router';
import { invoiceentryList, InvoiceEntry } from 'src/app/models/invoiceentry';
import { Common } from 'src/app/models/common';
import { Center } from 'src/app/models/Center';
import { AcadamicService } from 'src/app/services/acadamic.service';
import { InvoiceCenterList2 } from 'src/app/models/invoice ';

@Component({
  selector: 'app-center-invoice-report',
  templateUrl: './center-invoice-report.component.html',
  styleUrls: ['./center-invoice-report.component.css']
})
export class CenterInvoiceReportComponent implements OnInit {
  centerList: Center[] = []
  invoiceEntryLists: InvoiceEntry[] = [];
  invoiceEntry: InvoiceEntry[] = [];
  centers;
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
  centerInvoiceList2 = new Array<InvoiceCenterList2>();
  pendingList: InvoiceCenterList2[] = [];
  list;
  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private ets: EtsService,
    private academic: AcadamicService
  ) {


    let itemRef = db.object('invoiceEntry');
    itemRef.snapshotChanges().subscribe(action => {
      this.invoiceEntry = [];
      var quatationsList = action.payload.val();
      let quotationobj = Common.snapshotToArray(action.payload);
      quotationobj.forEach(element => {
        let ddListItem = new invoiceentryList();
        let qobj: InvoiceEntry = JSON.parse(element);
        this.invoiceEntry.push(qobj as InvoiceEntry)
        this.invoiceEntryLists = this.invoiceEntry.filter(s => s.isVerified == true);


      }),


        // console.log('7777777', this.centerList)
        // this.getKcvtpCenters();
        this.getkkcCenters();
      // this.kkcCenterInvoiceList()
      this.checkInvoicePendingCenters(this.invoiceEntryLists, this.centerInvoiceList2);

    });





  }

  getkkcCenters() {
    let that = this;
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
      // console.log('center list', this.centerList)
      this.kkcCenterInvoiceList()

    },
      err => {
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      })
  }
  kkcCenterInvoiceList() {
    let that = this;
    that.academic.GetCenterInvoiceList2().subscribe(data => {
      that.list = data;
      // console.log('CENTER***', this.centerList)
      for (let i = 0; i <= data.Data.length; i++) {
        let invList = new InvoiceCenterList2();
        if (data.Data[i] != null) {
          invList.dbaNo = data.Data[i].dbaNo;
          this.centerList.forEach(center => {
            if (center.CenterName == data.Data[i].centerName) {
              console.log('matching')

              let split1 = data.Data[i].InvoiceNo.slice(0, -10);
              // console.log('no', split1)
              let year = '18-19'
              invList.InvoiceNo = center.CenterCode + '/' + split1 + '/' + year

            }
          })
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

      // console.log('centerlist', this.centerInvoiceList2)


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

    this.getkkcCenters();


  }

  checkInvoicePendingCenters(invoiceData, invoiceCenterList) {
    console.log('invoiceData ', invoiceData)
    console.log('invoiceCentFerList ', invoiceCenterList)
    console.log('pendingList length', this.pendingList.length)

    for (let i = 0; i < invoiceCenterList.length; i++) {
      var centerInvoiceData = invoiceCenterList[i];
      for (let j = 0; j < invoiceData.length; j++) {
        var invoiceEntryData = invoiceData[j];
        console.log('before condition')

        if (centerInvoiceData != null && invoiceEntryData != null
          && centerInvoiceData.InvoiceNo == invoiceEntryData.invoiceNumber
          && centerInvoiceData.centerName == invoiceData.centerName
        ) {
          console.log('success')
          this.pendingList.push(centerInvoiceData);

        }

      }

    }
    console.log('PENDING LIST', this.pendingList)

  }
  filterMonth(monthValue) {

  }
  filterCenter(centerValue) {

  }

}

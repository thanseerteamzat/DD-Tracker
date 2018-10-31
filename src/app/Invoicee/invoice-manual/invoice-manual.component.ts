import { Component, OnInit } from '@angular/core';
import { invoiceList, Invoice, InvoiceCenterList2, InvoiceCenterList2Data, centerInvNoChkList, tempInvCenterList2 } from '../../models/invoice ';
import { Center } from '../../models/Center';
import { AngularFireDatabase } from '../../../../node_modules/angularfire2/database';
import { EtsService } from '../../services/ets.service';
import { Router } from '../../../../node_modules/@angular/router';
import { Common } from '../../models/common';
import { FormGroup, FormControl, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';
import { AcadamicService } from 'src/app/services/acadamic.service';
import { asEnumerable } from 'linq-es2015';

@Component({
  selector: 'app-invoice-manual',
  templateUrl: './invoice-manual.component.html',
  styleUrls: ['./invoice-manual.component.css']
})
export class InvoiceManualComponent implements OnInit {

  invoiceList: invoiceList[] = [];
  centerList: Center[] = []
  selectedData: invoiceList[];
  selectedDataInvoiceItems = new Array<Invoice>();
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
  invoicesplit;
  round = 0;
  convertedToWord;
  checklist: Invoice[] = [];
  checkboxIndex;
  invoiceNoExists;
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
  newInvoice: Invoice = new Invoice();
  tempinvoiceList;
  entered;
  centerInvoicelist;
  centerInvoiceData: InvoiceCenterList2Data;
  invoicecenterListData = new Array<centerInvNoChkList>()
  groupList: Invoice[][];
  groupList1: Invoice[][];
  groupList2 = new Array<Invoice[][]>()
  kcvtpCenterList: tempInvCenterList2[] = [];
  shareAmountTotal;
  taxableamtTotal;
  constructor(private db: AngularFireDatabase,
    private ets: EtsService,
    private router: Router,
    private fb: FormBuilder,
    private academic: AcadamicService

  ) {

    this.invoicecreateForm();
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
        // console.log('aaaaaaaaaaaaaaaaaaaa', this.invoiceList)



      });
    });


    that.academic.GetCenterInvoiceList2().subscribe(data => {
      that.centerInvoicelist = data;
      console.log('center inv data', that.centerInvoicelist)
      this.centerInvoiceData = data;
      let list = new centerInvNoChkList();
      for (let i = 0; i <= data.Data.length; i++) {
        if (data.Data[i] != null) {
          list.centerName = data.Data[i].centerName;
          list.centerInvoiceNo = data.Data[i].centerInvoiceNo;
          list.invoiceMonth = data.Data[i].invoiceMonth;
          list.InvoiceNo = data.Data[i].InvoiceNo;
          list.nextInvoiceNo = data.Data[i].nextInvoiceNo;
        }
        this.invoicecenterListData.push(list);

      }
      console.log('DATA**', this.centerInvoiceData)
    },
      err => {
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      })
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

        var splitmode = this.totalinvoiceAmount % 1;
        // var split = this.totalinvoiceAmount.slice(-3);
        // console.log('splitted round off value**', splitmode.toFixed(2));
        var splitlasttwodigits = splitmode.toFixed(2);
        if (parseFloat(splitlasttwodigits) == 0) {
          // console.log('success with zero')
          this.invoicesplit = splitlasttwodigits;
        }
        else {
          let a = 1 - parseFloat(splitlasttwodigits);
          let b = a.toFixed(2);
          // console.log('b*****', b)
          let c = 0.50;
          if (b <= c.toString()) {
            // console.log('greater')

            this.invoicesplit = '+' + b;
          }
          else {
            // console.log('lesser')
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

    // if (this.ets.cookievalue != null && (this.ets.cookievalue.indexOf('y2') !==-1 ) || (this.ets.cookievalue == "All"))  {
    //   console.log('inside if condition *********************')
    //   // this.router.navigate(['/dd-entry'])
    // }
    // else {
    //   this.router.navigate(['/error']);
    // }
    // if (this.ets.cookievalue == "3") {
    //   // this.router.navigate(['/despatch-no-entry'])
    // }
    // else {
    //   this.router.navigate(['/error']);


    // }
    this.entered = this.ets.cookiename;
    this.newInvoice.invoiceGeneratedBy = this.entered;
  }
  filterFee(key) {
    this.selectedfee = key;
    this.selectedData = null;
    if (this.selectmonth == null && this.selectedcenter == null) {

      this.selectedData = this.invoiceList.filter(s => s.invoiceenter.feesItem == this.selectedfee && s.invoiceenter.isdbaEntered == true)
      this.selectData(this.selectedData)
      this.groupbyList();
    }
    else if (this.selectmonth == null) {

      this.selectedData = this.invoiceList.filter(s => s.invoiceenter.feesItem == this.selectedfee && s.invoiceenter.CenterId == this.selectedcenter && s.invoiceenter.isdbaEntered == true)
      console.log('with month filter******')
      this.selectData(this.selectedData)
      this.groupbyList();

    }
    else if (this.selectedcenter == null) {

      this.selectedData = this.invoiceList.filter(s => s.invoiceenter.feesItem == this.selectedfee && this.getMothFromDate(s.invoiceenter.dbaMonth) == this.selectmonth && s.invoiceenter.isdbaEntered == true)
      console.log('with month filter******')
      this.selectData(this.selectedData)
      this.groupbyList();

    }
    else {
      this.selectedData = this.invoiceList.filter(s => this.getMothFromDate(s.invoiceenter.dbaMonth) == this.selectmonth && s.invoiceenter.CenterId == this.selectedcenter && s.invoiceenter.feesItem == this.selectedfee && s.invoiceenter.isdbaEntered == true)
      this.groupbyList();
      this.selectData(this.selectedData)
    }
  }

  filterMonth(key) {
    this.selectmonth = key;
    this.selectedData = null;

    if (this.selectedfee == null && this.selectedcenter == null) {
      this.selectedData = this.invoiceList.filter(s => this.getMothFromDate(s.invoiceenter.dbaMonth) == this.selectmonth && s.invoiceenter.isdbaEntered == true)
      this.selectData(this.selectedData)
      this.groupbyList();

    }
    else if (this.selectedfee == null) {
      this.selectedData = this.invoiceList.filter(s => this.getMothFromDate(s.invoiceenter.dbaMonth) == this.selectmonth && s.invoiceenter.CenterId == this.selectedcenter && s.invoiceenter.isdbaEntered == true)
      console.log('with fee filter******')
      this.selectData(this.selectedData)
      this.groupbyList();

    }
    else if (this.selectmonth == null) {
      this.selectedData = this.invoiceList.filter(s => s.invoiceenter.feesItem == this.selectedfee && s.invoiceenter.CenterId == this.selectedcenter && s.invoiceenter.isdbaEntered == true)
      console.log('with fee filter******')
      this.selectData(this.selectedData)
      this.groupbyList();

    }
    else {
      this.selectedData = this.invoiceList.filter(s => this.getMothFromDate(s.invoiceenter.dbaMonth) == this.selectmonth && s.invoiceenter.CenterId == this.selectedcenter && s.invoiceenter.feesItem == this.selectedfee && s.invoiceenter.isdbaEntered == true)
      this.selectData(this.selectedData)
      this.groupbyList();
    }

  }

  filterCenter(key) {


    this.selectedcenter = key;
    this.selectedData = null;

    if (this.selectedfee == null && this.selectmonth == null) {
      this.selectedData = this.invoiceList.filter(s => s.invoiceenter.CenterId == this.selectedcenter && s.invoiceenter.isdbaEntered == true)
      this.selectData(this.selectedData)
      this.groupbyList();

    }
    else if (this.selectedfee == null) {
      this.selectedData = this.invoiceList.filter(s => s.invoiceenter.CenterId == this.selectedcenter && this.getMothFromDate(s.invoiceenter.dbaMonth) == this.selectmonth && s.invoiceenter.isdbaEntered == true)
      console.log('with fee filter******')
      this.selectData(this.selectedData)
      this.groupbyList();

    }
    else if (this.selectmonth == null) {
      this.selectedData = this.invoiceList.filter(s => s.invoiceenter.CenterId == this.selectedcenter && s.invoiceenter.feesItem == this.selectedfee && s.invoiceenter.isdbaEntered == true)
      console.log('with fee filter******')
      this.selectData(this.selectedData)
      this.groupbyList();

    }
    else {
      this.selectedData = this.invoiceList.filter(s => this.getMothFromDate(s.invoiceenter.dbaMonth) == this.selectmonth && s.invoiceenter.CenterId == this.selectedcenter && s.invoiceenter.feesItem == this.selectedfee && s.invoiceenter.isdbaEntered == true)
      this.selectData(this.selectedData)
      this.groupbyList();
    }


  }
  getMothFromDate(dateData) {
    if (dateData != null) {
      var month = dateData.toString().slice(0, 3)
      // console.log('month**', month)
      return month;
    }
  }
  onClick(event, id, invoice: Invoice) {
    if (event == true) {
      this.checklist.push(invoice);
      // console.log('push**', this.checklist)
    }
    else if (event == false) {
      this.checkboxIndex = this.checklist.findIndex(list => list.invoiceId == id);
      this.checklist.splice(this.checkboxIndex, 1);
      // console.log('pop**', this.checklist)

    }
    //   console.log('event***', event);
    // console.log('id***', id)
    // console.log('invoice***', invoice)
  }

  duplicationCheck() {



    this.kcvtpCenterList.push(data)



    for (let j = 0; this.kcvtpCenterList.length; j++) {
      var list = this.kcvtpCenterList[j];
      for (let i = 0; i < this.centerInvoiceData.Data.length; i++) {
        var data = this.centerInvoiceData.Data[i];
        if (list != undefined && data != undefined && list.centerName == data.centerName) {
          console.log('sucees')
          list.centerInvoiceNo = data.nextInvoiceNo.toString();

        }

      }
      this.kcvtpCenterList.push(list);

    }
    // console.log('check', this.kcvtpCenterList)
    // console.log('check', this.invoicecenterListData)
    // this.invoiceNoExists = false;
    // console.log(this.newInvoice.invoiceNo)
    // for (let i = 0; i <= this.invoiceList.length; i++) {
    //   this.tempinvoiceList = invoiceList[i];
    //   console.log(this.invoiceList)
    //   if (this.tempinvoiceList != null && this.tempinvoiceList.invoiceenter.invoiceNo == this.newInvoice.invoiceNo) {
    //     this.invoiceNoExists = true;
    //     break;
    //   }
    // }
    // if (this.invoiceNoExists == false) {
    //   // console.log(this.invoiceNoExists)

    //   console.log('new enrty')
    // }
    // else {
    //   console.log('duplication')
    // }
  }

  generateInvoice() {

    if (this.checklist.length == 0) {
      alert('Please select any')
    }
    else {
      this.checklist.forEach(element => {
        element.invoiceNo = this.newInvoice.invoiceNo;
        element.invoiceDate = this.formatDate(this.newInvoice.invoiceDate);
        element.isInvoiceEntered = true;
        element.invoiceGeneratedBy = this.entered;
        var updates = {}

        updates['/invoice/' + element.invoiceId] = JSON.stringify(element);
        try {

          let up = this.db.database.ref().update(updates);

        }
        catch (e) {

        }
      })

      alert('Invoice Added :' + this.newInvoice.invoiceNo);
      this.resetform();
    }
  }


  groupbyList() {
    let grouplist2Length = this.groupList2.length;
    this.groupList2.splice(0, grouplist2Length);
    this.kcvtpCenterList.splice(0, this.kcvtpCenterList.length)
    this.selectedDataInvoiceItems.splice(0, this.selectedDataInvoiceItems.length);
    let centerResponse = this.ets.centerList;
    //  Iterate throw all keys.
    for (let cent of centerResponse) {

      this.centerList.push(cent);

    }
    this.selectedData.forEach(data => {
      this.selectedDataInvoiceItems.push(data.invoiceenter)
    })
    console.log('seleced data', this.selectedDataInvoiceItems)
    this.groupList = asEnumerable(this.selectedDataInvoiceItems).GroupBy(x => x.CenterId).ToArray();

    for (let j: number = 0; j < this.groupList.length; j++) {
      var item = this.groupList[j];
      var newList = new InvoiceCenterList2();
      // console.log('invList****', inneritem)
      this.shareAmountTotal = 0;
      this.taxableamtTotal = 0;
      for (let l: number = 0; l < item.length; l++) {
        var inItem = item[l];
        // console.log('item***1', inneritem)
        if (newList.dbaNo == null) {
          newList.dbaNo.push(inItem.dbaNo);
        }
        else {
          newList.dbaNo.push(inItem.dbaNo);
        }
        // console.log('dba no', newList.dbaNo)
        newList.InvoiceNo = inItem.invoiceNo;
        this.centerList.forEach(data => {
          if (data.Id == inItem.CenterId) {
            newList.centerName = data.CenterName;

          }
        })
        newList.invoiceMonth = inItem.dbaMonth;
        (newList.dbaAmount += parseFloat(inItem.dbaAmount)).toFixed(2);
        let taxamt = (parseFloat(inItem.dbaAmount) / 118) * 18;
        this.taxableamtTotal = parseFloat(this.taxableamtTotal) + taxamt;
        newList.taxableAmount = this.taxableamtTotal.toFixed(2);
        let dbamt = (parseFloat(inItem.dbaAmount) - taxamt) * 0.65;
        this.shareAmountTotal = parseFloat(this.shareAmountTotal) + dbamt;
        newList.shareAmount = this.shareAmountTotal.toFixed(2);
        newList.invoiceDate = inItem.invoiceDate;

      }
      this.kcvtpCenterList.push(newList);

      console.log('finl data', this.kcvtpCenterList)

    }
  }

  //validations

  invoiceForm = new FormGroup(
    {
      invoiceNum: new FormControl(),
      invoiceDate: new FormControl()
    }
  );
  invoicecreateForm() {
    this.invoiceForm = this.fb.group(
      {
        invoiceNum: [null, Validators.compose([Validators.required, Validators.pattern('[0-9 ///-]*')])],

        invoiceDate: [null, Validators.required]
      }
    )
  };
  get invoiceNum() { return this.invoiceForm.get('invoiceNum'); }
  get invoiceDate() { return this.invoiceForm.get('invoiceDate'); }

  resetform() {
    this.invoiceForm.reset(
      {
        dbaNum: null,
        dbaDate: null
      }
    )

  }
}

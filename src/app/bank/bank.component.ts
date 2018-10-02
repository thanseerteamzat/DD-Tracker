import { Component, OnInit } from '@angular/core';
// import { ddLastid } from '../models/ddLastid';
import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../models/common';
import { ActivatedRoute, Params } from '@angular/router';
// import { desptchLastid } from '../models/despatchlastId';
import { adjddEntry } from '../models/adjlastid';
import { element } from 'protractor';
import { Despatch } from '../models/despatch';
import { dbaLastid } from '../models/dbalastId';
import { Dddetails } from '../models/dddetails';

import { EtsService } from '../services/ets.service';
import { adjddLastid } from '../models/adjlastid';
import { Invoice, invoiceList } from '../models/invoice ';
import { dbaEntry } from '../models/dbaEntry';
import { ddLastid } from '../models/ddLastid';


@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  ddktc: Dddetails[];
  newInvoice: Invoice = new Invoice();
  // order: string;
  ddLastids: dbaEntry[] = [];
  total;
  constructor(private db: AngularFireDatabase, private route: ActivatedRoute, private ets: EtsService) {

    // let itemRef = db.object('dbaEntry');
    // itemRef.snapshotChanges().subscribe(action => {
    //   var quatationsList = action.payload.val();
    //   let obj = Common.snapshotToArray(action.payload);
    //   this.ddLastids = [];
    //   obj.forEach(element => {
    //     let obj: dbaEntry = JSON.parse(element);
    //     // this.newddLastId = obj;
    //     this.ddLastids.push(obj);


    //   });
    // });

  }

  ngOnInit() {



    // this.route.queryParams.subscribe(params => {
    //   let userId = params['userId'];
    //   let password = params['password'];
    //   console.log(atob(userId), atob(password));
    //   console.log(btoa(userId), btoa(password));
    // });  let that = this;
    // let that=this;
    // this.ets.GetddfromTtc().subscribe(data => {
    //   that.ddktc = data;
    //  console.log(this.ddktc);

    //   // this.ets.centerList = this.centers;

    // },
    //   error => console.log(error),
    //   () => console.log('Get all complete'));




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

  register() {
    // this.ddLastids.forEach(element => {
    //   // if (element.Rate == 65) {
        
      
    //   var updates = {}
    //   element.isInvoiceEntered = false;
    //   updates['/invoice/' + element.invoiceId] = JSON.stringify(element);
    //   try {

    //     let up = this.db.database.ref().update(updates);

    //   }
    //   catch (e) {

    //   }
    // // }

    // })

    // this.ddLastids.forEach(element => {
    //   this.total = 0;
    //   this.newInvoice.feesItem = element.feesItem;
    //   this.newInvoice.invoiceId = element.dbaId;
    //   this.newInvoice.dbaNo = element.dbaNo;
    //   this.newInvoice.CourseCode = element.courseCode;
    //   this.newInvoice.CenterCode = element.centerCode;
    //   this.newInvoice.CenterId = element.centerId;
    //   this.newInvoice.dbaAmount = element.despatchAmount;
    //   this.newInvoice.feeAmount = element.fwt;
    //   this.newInvoice.despatchDate = element.despatchDate;
    //   // this.newInvoice.feesItem = element.feesItem;
    //   this.newInvoice.dbaMonth = element.despatchMonth;
    //   this.newInvoice.isdbaEntered = element.isdbaEntered
    //   this.newInvoice.isInvoiceEntered=false;
    //   if (element.feesItem == 'Course Fee') {
    //     this.newInvoice.share = 15;
    //     let percentage = parseFloat(this.newInvoice.share.toString()) / 100;
    //     this.total = parseFloat(element.fwt.toString()) * parseFloat(percentage.toString());
    //     this.newInvoice.shareAmount = this.total.toFixed(2);



    //   }
    //   else if (element.feesItem == 'Prospectus') {
    //     this.newInvoice.share = 80;
    //     let ppercentage = parseFloat(this.newInvoice.share.toString()) / 100;
    //     this.total = parseFloat(element.fwt.toString()) * parseFloat(ppercentage.toString());
    //     this.newInvoice.shareAmount = this.total.toFixed(2);
    //     console.log('percentage',ppercentage)
    //     console.log('total', this.total)
    //   }

    //   else if (element.feesItem == 'Inspection') {
    //     this.newInvoice.share = 60;
    //     let percentage = parseFloat(this.newInvoice.share.toString()) / 100;
    //     this.total = parseFloat(element.fwt.toString()) * parseFloat(percentage.toString());
    //     this.newInvoice.shareAmount = this.total.toFixed(2);
    //   }
    //   else if (element.feesItem == 'Affilication' || element.feesItem == 'Renewal Fee') {
    //     this.newInvoice.share = 80;
    //     let percentage = parseFloat(this.newInvoice.share.toString()) / 100;
    //     this.total = parseFloat(element.fwt.toString()) * parseFloat(percentage.toString());
    //     this.newInvoice.shareAmount = this.total.toFixed(2);
    //   }

    //   else {

    //     if (element.feesItem == 'Course Fee') {
    //       this.newInvoice.share = 0;
    //       // let percentage = parseFloat(this.newInvoice.shareAmount) / 100;
    //       // this.total. = parseFloat(element.FWT.toString()) * parseFloat(percentage.toString());
    //       this.newInvoice.shareAmount = '0';
    //     }
    //     else if (element.feesItem == 'Prospectus') {
    //       this.newInvoice.share = 0;
    //       // let percentage = parseFloat(this.newInvoice.shareAmount) / 100;
    //       // this.total. = parseFloat(element.FWT.toString()) * parseFloat(percentage.toString());
    //       this.newInvoice.shareAmount = '0';
    //     }

    //     else if (element.feesItem == 'Inspection') {
    //       this.newInvoice.share = 0;
    //       // let percentage = parseFloat(this.newInvoice.shareAmount) / 100;
    //       // this.total. = parseFloat(element.FWT.toString()) * parseFloat(percentage.toString());
    //       this.newInvoice.shareAmount = '0';
    //     }
    //     else if (element.feesItem == 'Affilication' || element.feesItem == 'Renewal Fee') {
    //       this.newInvoice.share = 0;
    //       // let percentage = parseFloat(this.newInvoice.shareAmount) / 100;
    //       // this.total. = parseFloat(element.FWT.toString()) * parseFloat(percentage.toString());
    //       this.newInvoice.shareAmount = '0';
    //     }
    //   }





    //   let invoiceEntryJson = JSON.stringify(this.newInvoice);
    //   console.log(invoiceEntryJson);
    //   try {
    //     this.db.database.ref('invoice').child(element.dbaId).set(invoiceEntryJson);
    //   }
    //   catch (ex) {

    //   }




    // })


    //code for 
    // this.ddLastids.forEach(element => {

    //   if (element.feeItem == "Prospectus") {
    //     element.Rate = 80;

    //     let rate = (parseFloat(element.FWT.toString()) * parseFloat(element.Rate.toString())) / 100;
    //     let frate = rate.toFixed(2);

    //     var updates = {}
    //     element.Amount = parseFloat(frate);
    //     updates['/Despatch/' + element.despId] = JSON.stringify(element);
    //     try {

    //       let up = this.db.database.ref().update(updates);

    //     }
    //     catch (e) {

    //     } console.log('aaaaaaaaaaaaaaaaaaaa',this.ddLastids )
    //   }
    // })
    //   else if (element.feeItem == "Inspection") {
    //     element.Rate = 60;

    //     let rate = (parseFloat(element.FWT.toString()) * 65) / 100;
    //     let frate = rate.toFixed(2);

    //     var updates = {}
    //     element.Amount = parseFloat(frate);

    //     updates['/Despatch/' + element.despId] = JSON.stringify(element);
    //     try {

    //       let up = this.db.database.ref().update(updates);

    //     }
    //     catch (e) {

    //     } console.log('aaaaaaaaaaaaaaaaaaaa', this.ddLastids)
    //   }
    //   else{
    //     element.Rate = 80;

    //     let rate = (parseFloat(element.FWT.toString()) * 65) / 100;
    //     let frate = rate.toFixed(2);

    //     var updates = {}
    //     element.Amount = parseFloat(frate);

    //     updates['/Despatch/' + element.despId] = JSON.stringify(element);
    //     try {

    //       let up = this.db.database.ref().update(updates);

    //     }
    //     catch (e) {

    //     }
    //     console.log('aaaaaaaaaaaaaaaaaaaa', this.ddLastids)
    //   }

    // })


    //   // this.total.al = parseFloat(element.Amount) / 1.18;
    //   // this.total.al1 = total.toFixed(2);
    //   this.total.al = parseFloat(element.Amount) - parseFloat(element.feeWT);
    //   this.total.al1 = total.toFixed(2);
    //   // console.log('tax', total)
    //   // this.total.al = parseFloat(element.totalAmount.toString()) / 1.18;
    //   // this.total.al1 = total.toFixed(2);
    //   console.log('feee without tax', total1)
    //   var updates = {}
    //   element.taxValue = total1.toString();
    //   // element.ddDate = this.formatDate(element.ddDate)
    //   updates['/ddEntry/' + element.ddlastId] = JSON.stringify(element);
    //   try {

    //     let up = this.db.database.ref().update(updates);
    //     // this.router.navigate(['/despatch-no-entry'])
    //   }
    //   catch (e) {

    //   }
    // })
    // console.log('aaaaaaaaaaaaaaaaaaaa', this.ddLastids)
    // adjddlastId
    // adjdbaLastId
    // let uniqueId = "/DD" + Common.newGuid();
    // this.newddLastid.Id = uniqueId;


    // let ddEntryJson = JSON.stringify(this.newddLastid);
    // console.log(ddEntryJson);
    // try {
    //   this.db.database.ref('kkcId').child(uniqueId).set(ddEntryJson);
    //   alert("DD Entry added successfully!!..");

    // }
    // catch (ex) {

    // }

  }

}

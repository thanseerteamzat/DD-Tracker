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
import { Invoice, invoiceList, invAmtPndgLastid } from '../models/invoice ';
import { dbaEntry } from '../models/dbaEntry';
import { ddLastid } from '../models/ddLastid';
import { kkcId } from '../models/kkcId';
import { ddEntry } from '../models/ddEntry';
import { erpDespatch } from '../models/erpdespatch';


@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  ddktc: Dddetails[];
  newInvoice: Invoice = new Invoice();
  newddLastid: invAmtPndgLastid = new invAmtPndgLastid();
  // order: string;
  ddLastids: erpDespatch[] = [];
  despatchlist: Despatch[] = [];
  ddnolist;
  total;
  templist;
  desppush: Despatch[] = []
  ddpush: ddEntry[] = []
  despdata;
  dddata;
  constructor(private db: AngularFireDatabase, private route: ActivatedRoute, private ets: EtsService) {

    // let itemRef = db.object('erpdespatch');
    // itemRef.snapshotChanges().subscribe(action => {
    //   var quatationsList = action.payload.val();
    //   let obj = Common.snapshotToArray(action.payload);
    //   this.ddLastids = [];
    //   obj.forEach(element => {
    //     let obj: erpDespatch = JSON.parse(element);
    //     // this.newddLastId = obj;
    //     this.ddLastids.push(obj);
    //     // console.log('***', this.ddLastids)

    //   });
    // });
    // let dtemRef = db.object('Despatch');
    // dtemRef.snapshotChanges().subscribe(action => {
    //   var quatationsList = action.payload.val();
    //   let obj = Common.snapshotToArray(action.payload);
    //   this.despatchlist = [];
    //   obj.forEach(element => {
    //     let obj: Despatch = JSON.parse(element);
    //     // this.newddLastId = obj;
    //     this.despatchlist.push(obj);


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
    // this.despatchlist.forEach(element => {


    //   var updates = {}
    //   // var finaldata = element.despatchNo.replace(/\//g, "");
    //   // var fulldata = finaldata.replace(/-|\s/g, "");
    //   var a = element.despatchNo.slice(0, -14);
    //   var b = element.despatchNo.slice(3, -10);
    //   var c = element.despatchNo.slice(7, -6);
    //   var d = element.despatchNo.slice(11, -4);
    //   var e = element.despatchNo.slice(13, -2);
    //   var f = element.despatchNo.slice(15);
    //   var despformat = a + '/' + b + '/' + c + '/' + d + '/' + e + '-' + f;
    //   console.log('split aa 3', despformat)
    //   element.despatchNo = despformat
    //   updates['/Despatch/' + element.despId] = JSON.stringify(element);
    //   try {

    //     let up = this.db.database.ref().update(updates);

    //   }
    //   catch (e) {

    //   }


    // }
    // )

    // console.log('dd***', this.ddLastids)
    // console.log('desp***', this.despatchlist)
    // let count = 0
    // for (let i = 0; i <= this.despatchlist.length; i++) {
    //   this.ddnolist = this.despatchlist[i];

    //   if (this.ddnolist != null) {
    //     var finaldata = this.ddnolist.despatchNo.replace(/\//g, "");
    //     var fulldata = finaldata.replace(/-|\s/g, "");
    //     this.ddnolist.despatchNo = fulldata;
    //     this.desppush.push(this.ddnolist)
    //     // console.log('fin', this.desppush)



    //     // console.log('success', this.ddnolist.despatchNo)
    //   }


    // }
    // for (let j = 0; j <= this.ddLastids.length; j++) {

    //   this.templist = this.ddLastids[j];
    //   if (this.templist != null && this.templist.despatchNo != null) {

    //     let a = this.templist.despatchNo.replace(/\//g, "");
    //     var b = a.replace(/-|\s/g, "");
    //     // console.log('list', a)

    //     this.templist.despatchNo = b;
    //     this.ddpush.push(this.templist)


    //   }
    // }
    // // console.log('data*****', this.ddpush)
    // for (let i = 0; i <= this.ddpush.length; i++) {
    //   this.despdata = this.desppush[i];
    //   if (this.despdata != null) {
    //     // console.log('data---', this.despdata.despatchNo)
    //     for (let j = 0; j <= this.ddpush.length; j++) {
    //       this.dddata = this.ddpush[j];
    //       if (this.dddata != null && this.dddata.isdespatchEntered == true) {
    //         // console.log(count)
    //         if (this.despdata.despatchNo == this.dddata.despatchNo) {
    //           var count = this.ddpush.filter(obj => obj.despatchNo === this.despdata.despatchNo).length;

    //           console.log('count' + count, 'despid' + this.despdata.despId)



    //           // IDEH8241217071819
    //           var a = this.despdata.despatchNo.slice(0, -14);
    //           var b = this.despdata.despatchNo.slice(3, -10);
    //           var c = this.despdata.despatchNo.slice(7, -6);
    //           var d = this.despdata.despatchNo.slice(11, -4);
    //           var e = this.despdata.despatchNo.slice(13, -2);
    //           var f = this.despdata.despatchNo.slice(15);
    //           var despformat = a + '/' + b + '/' + c + '/' + d + '/' + e + '-' + f;
    //           console.log('split aa 3', despformat)
    //           var updates = {}
    //           this.despdata.despatchNo = despformat;
    //           this.despdata.noOfdd = count;
    //           updates['/Despatch/' + this.despdata.despId] = JSON.stringify(this.despdata);
    //           try {

    //             let up = this.db.database.ref().update(updates);

    //           }
    //           catch (e) {

    //           }
    //         }
    //       }
    //     }
    //   }
    // }
    // console.log('fin', this.ddpush)

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
    // let uniqueId = "/IAP" + Common.newGuid();
    // this.newddLastid.id = uniqueId;


    // let ddEntryJson = JSON.stringify(this.newddLastid);
    // console.log(ddEntryJson);
    // try {
    //   this.db.database.ref('InvAmtLastid').child(uniqueId).set(ddEntryJson);
    //   alert("DD Entry added successfully!!..");

    // }
    // catch (ex) {

    // }

  }

}

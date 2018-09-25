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


@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  ddktc:Dddetails[];
   newddLastid: adjddLastid = new adjddLastid();
  // order: string;
  // ddLastids: Despatch[] = [];

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute ,private ets:EtsService) {

    // let itemRef = db.object('Despatch');
    // itemRef.snapshotChanges().subscribe(action => {
    //   var quatationsList = action.payload.val();
    //   let obj = Common.snapshotToArray(action.payload);
    //   this.ddLastids = [];
    //   obj.forEach(element => {
    //     let obj: Despatch = JSON.parse(element);
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
    let that=this;
    this.ets.GetddfromTtc().subscribe(data => {
      that.ddktc = data;
     console.log(this.ddktc);
      
      // this.ets.centerList = this.centers;

    },
      error => console.log(error),
      () => console.log('Get all complete'));




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


    //code for 
    // this.ddLastids.forEach(element => {

    //   if (element.feeItem == "Course Fee") {
    //     element.Rate = 65;

    //     let rate = (parseFloat(element.FWT.toString()) * parseFloat(element.Rate.toString())) / 100;
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


    //   // let total = parseFloat(element.Amount) / 1.18;
    //   // let total1 = total.toFixed(2);
    //   let total = parseFloat(element.Amount) - parseFloat(element.feeWT);
    //   let total1 = total.toFixed(2);
    //   // console.log('tax', total)
    //   // let total = parseFloat(element.totalAmount.toString()) / 1.18;
    //   // let total1 = total.toFixed(2);
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
    let uniqueId = "/DD" + Common.newGuid();
    this.newddLastid.Id = uniqueId;


    let ddEntryJson = JSON.stringify(this.newddLastid);
    console.log(ddEntryJson);
    try {
      this.db.database.ref('erpdespatchId').child(uniqueId).set(ddEntryJson);
      alert("DD Entry added successfully!!..");

    }
    catch (ex) {

    }
    
  }

}

import { Component, OnInit } from '@angular/core';
import { ddLastid } from '../models/ddLastid';
import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../models/common';
import { ActivatedRoute, Params } from '@angular/router';
import { desptchLastid } from '../models/despatchlastId';
import { ddEntry } from '../models/ddEntry';
import { element } from 'protractor';
import { Despatch } from '../models/despatch';


@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

  newddLastid: desptchLastid = new desptchLastid();
  order: string;
  ddLastids: Despatch[] = [];

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute) {

    let itemRef = db.object('Despatch');
    itemRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      this.ddLastids = [];
      obj.forEach(element => {
        let obj: Despatch = JSON.parse(element);
        // this.newddLastId = obj;
        this.ddLastids.push(obj);


      });
    });

  }

  ngOnInit() {



    // this.route.queryParams.subscribe(params => {
    //   let userId = params['userId'];
    //   let password = params['password'];
    //   console.log(atob(userId), atob(password));
    //   console.log(btoa(userId), btoa(password));
    // });




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
    this.ddLastids.forEach(element => {

      // let total = parseFloat(element.Amount) / 1.18;
      // let total1 = total.toFixed(2);
      // let total = parseFloat(element.Amount) - parseFloat(element.feeWT);
      // let total1 = total.toFixed(2);
      // console.log('tax', total)
      let total = parseFloat(element.totalAmount.toString()) / 1.18;
      let total1 = total.toFixed(2);
      console.log('feee without tax', total1)
      var updates = {}
      element.FWT = parseFloat(total1);
      // element.ddDate = this.formatDate(element.ddDate)
      updates['/Despatch/'] = JSON.stringify(element);
      try {

        let up = this.db.database.ref().update(updates);
        // this.router.navigate(['/despatch-no-entry'])
      }
      catch (e) {

      }
    })
    console.log('aaaaaaaaaaaaaaaaaaaa', this.ddLastids)

    // let uniqueId = "/DD" + Common.newGuid();
    // this.newddLastid.Id = uniqueId;


    // let ddEntryJson = JSON.stringify(this.newddLastid);
    // console.log(ddEntryJson);
    // try {
    //   this.db.database.ref('despatchLastId').child(uniqueId).set(ddEntryJson);
    //   alert("DD Entry added successfully!!.");

    // }
    // catch (ex) {

    // }
    //
  }

}

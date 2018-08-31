import { Component, OnInit } from '@angular/core';
import { ddLastid } from '../models/ddLastid';
import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../models/common';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

  newddLastid: ddLastid = new ddLastid();
  order: string;
  constructor(private db: AngularFireDatabase, private route: ActivatedRoute) { }

  ngOnInit() {


    this.route.queryParams.subscribe(params => {
      let userId = params['userId'];
      let password = params['password'];
      console.log(atob(userId), atob(password));
      console.log(btoa(userId), btoa(password));
    });




  }





  register() {


    // let uniqueId = "/DD" + Common.newGuid();
    // this.newddLastid.Id = uniqueId;


    // let ddEntryJson = JSON.stringify(this.newddLastid);
    // console.log(ddEntryJson);
    // try {
    //   this.db.database.ref('ddLastId').child(uniqueId).set(ddEntryJson);
    //   alert("DD Entry added successfully!!.");

    // }
    // catch (ex) {

    // }

  }

}

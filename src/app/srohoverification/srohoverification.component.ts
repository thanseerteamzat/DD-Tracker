import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { registerdateList, registerDate } from '../models/registerDate';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { FormBuilder } from '@angular/forms';
import { Common } from '../models/common';

@Component({
  selector: 'app-srohoverification',
  templateUrl: './srohoverification.component.html',
  styleUrls: ['./srohoverification.component.css']
})
export class SrohoverificationComponent implements OnInit {

  todaydate=new Date;
  dateLists: registerdateList[] = [];
  
  
  constructor(    private cookieservice: CookieService,
    private route: ActivatedRoute,
  private db: AngularFireDatabase,
  private router: Router,
  private http: HttpClient,
  private config: ConfigService,
  private fb: FormBuilder) { 

    let itemReff = db.object('dateforsro');
    itemReff.snapshotChanges().subscribe(action => {
      this.dateLists = [];
      var quatationsList = action.payload.val();
      let quotationobj = Common.snapshotToArray(action.payload);
      quotationobj.forEach(element => {
        let ddListItem = new registerdateList();
        let qobj: registerDate = JSON.parse(element);
        // console.log("****" + element);
        if (qobj.Id != undefined) {
          qobj.Id = qobj.Id.replace("/", "");
        }

        ddListItem.ddenter = qobj;

        // let custList = this.ets.centerList.filter(s => s.Id == (qobj.centerId));
        // // console.log('2222222222222222222222222222',custList)
        // if (custList.length > 0) {
        //   ddListItem.center = custList[0];
        // }

        this.dateLists.push(ddListItem);
        // console.log('length***************************',this.sroLists.length);
      });
    });
    



 }


  ngOnInit() {
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

}

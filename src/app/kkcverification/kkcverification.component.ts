import { Component, OnInit } from '@angular/core';
import { kkcddList, ddfromKKC } from '../models/ddktc';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { EtsService } from '../services/ets.service';
import { Common } from '../models/common';

@Component({
  selector: 'app-kkcverification',
  templateUrl: './kkcverification.component.html',
  styleUrls: ['./kkcverification.component.css']
})
export class KkcverificationComponent implements OnInit {

  ddLists: kkcddList[] = [];
  // centerList: Center[] = [];

  count;
  format;
  constructor(private route: ActivatedRoute,
              private db: AngularFireDatabase,
               private router: Router,
                private ets: EtsService) {

    
              
                  let itemRef = db.object('ddkkc');
                  itemRef.snapshotChanges().subscribe(action => {
                    this.ddLists = [];
                    var quatationsList = action.payload.val();
                    let quotationobj = Common.snapshotToArray(action.payload);
                    quotationobj.forEach(element => {
                      let ddListItem = new kkcddList();
                      let qobj: ddfromKKC = JSON.parse(element);
                      // console.log("****" + element);
                      if (qobj.slno != undefined) {
                        qobj.slno = qobj.slno.replace("/", "");
                      }
              
                      ddListItem.ddenter = qobj;
              
                      // let custList = this.ets.centerList.filter(s => s.Id == (qobj.centerId));
                      // // console.log('2222222222222222222222222222',custList)
                      // if (custList.length > 0) {
                      //   ddListItem.center = custList[0];
                      // }
              
                      this.ddLists.push(ddListItem);
              
                    });
              
                  });
              
              
  }

  ngOnInit() {
    if (this.ets.cookievalue != null && (this.ets.cookievalue.indexOf('x2') !==-1 ) || (this.ets.cookievalue == "All"))  {
      console.log('inside if condition *********************')
      // this.router.navigate(['/dd-entry'])
    }
    else {
      this.router.navigate(['/error']);
    }
  
   
    // if (this.ets.cookievalue == "1" ||this.ets.cookievalue == "2" || this.ets.cookievalue == "3") {
    //   // this.router.navigate(['/dd-verification'])
    // }
    // else {
    //   this.router.navigate(['/error']);
    // }
  }


}

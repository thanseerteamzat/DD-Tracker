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
  months = [
    { id: '01', name: 'JAN' },
    { id: '02', name: 'FEB' },
    { id: '03', name: 'MARCH' },
    { id: '04', name: 'APRIL' },
    { id: '05', name: 'MAY' },
    { id: '06', name: 'JUNE' },
    { id: '07', name: 'JULY' },
    { id: '08', name: 'AUG' },
    { id: '09', name: 'SEP' },
    { id: '10', name: 'OCT' },
    { id: '11', name: 'NOVEMBER' },
    { id: '12', name: 'DECEMBER' },



  ];
  selectedData;
  selectedmonth;  

  ddLists: kkcddList[] = [];
  // centerList: Center[] = [];
  newddentry:ddfromKKC = new ddfromKKC;
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
                      this.newddentry=qobj;
              
                      // let custList = this.ets.centerList.filter(s => s.Id == (qobj.centerId));
                      // // console.log('2222222222222222222222222222',custList)
                      // if (custList.length > 0) {
                      //   ddListItem.center = custList[0];
                      // }
              
                      this.ddLists.push(ddListItem);
                                  
                     });
                     this.selectedData=this.ddLists;
              
                  });
              this.selectedData=this.ddLists;
              
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


verify(key, ddentry: ddfromKKC) {
     console.log('function workss*******')
    console.log('key',key);
    console.log('dd details',ddentry)
    this.db.database.ref(`ddkkc/${key}`).once("value", snapshot => {
       console.log('snap id exists')
      let sid = snapshot.key;
      if (snapshot.exists()) {
        console.log('inside*******')


        if (confirm('Are you sure to verify this dd entry')) {

          ddentry.isVerified = true;
          // ddentry.isVerified = true;

          var updates = {};
          updates['/ddkkc/' + sid] = JSON.stringify(ddentry);
          try {
            let up = this.db.database.ref().update(updates);
            // this.router.navigate(['/dd-verification']);
          }
          catch (ex) {
            alert("Error in verifying dd");
          }
        }
        // console.log('ddddd', ddentry)

      }
    });
  }

  filter(value){

    // this.ackData = new Set(this.dateLists.map(item => item.ddenter.date));
    // console.log('ackvalue',this.ackData)


console.log(value);
this.selectedmonth=value;
this.selectedData = this.ddLists.filter(
  s=> this.getMonthFromDate(s.ddenter.EnteredOn)== value
)
console.log(this.selectedData);


}
getMonthFromDate(dateData) {
  if (dateData != null) {
    var month = dateData.toString().slice(3, -5)
    console.log('month**',month)
    return month;
  }

}

}

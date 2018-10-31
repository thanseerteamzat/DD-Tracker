import { Component, OnInit } from '@angular/core';
import { EtsService } from '../services/ets.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { ConfigService } from '../services/config.service';
import { FormBuilder } from '@angular/forms';
import { Center, CenterData } from '../models/Center';
import { sroEntryList, sroEntry } from '../models/sroEntry';
import { Common } from '../models/common';
import { registerdateList, registerDate } from '../models/registerDate';
import { AcadamicService } from '../services/acadamic.service';

@Component({
  selector: 'app-srodailyreport',
  templateUrl: './srodailyreport.component.html',
  styleUrls: ['./srodailyreport.component.css']
})
export class SrodailyreportComponent implements OnInit {
  centerList = new Array<Center>();
  userType:string;
  isSroLogin:boolean;
  selectedData;
  centers: CenterData;
  isEditMode;
  sroverifiedBy;
  ackData;
  selectedcenter;
  ishoLogin:boolean; 
  dateLists: registerdateList[] = [];
  selectedmonth;  
  // centers: Center[];
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

  
  constructor(  private ets: EtsService,
    private cookieservice: CookieService,
    private route: ActivatedRoute,
  private db: AngularFireDatabase,
  private router: Router,
  // private http: HttpClient,
  private config: ConfigService,
  private fb: FormBuilder,
  private academic:AcadamicService) {



    this.academic.GetAllCenters().subscribe(resdata => {
      this.centers = resdata;
      console.log(resdata);
      this.centerList = new Array<Center>();
      for (let i = 0; i <= resdata.Data.length; i++) {
        if(resdata.Data != null){
        let c = new Center();
        c.Id = resdata.Data[i].Id;
        c.CenterCode = resdata.Data[i].CenterCode;
        c.CenterName = resdata.Data[i].CenterName;
        c.DistrictId = resdata.Data[i].DistrictId;
        this.centerList.push(c);
        }
      }

    },
      err => {
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      })
  



      

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
      console.log('ack data',this.ackData);         
   }

   ngOnInit() {
    this.userType= this.ets.cookieuser;
    console.log(this.userType);
    if((this.userType == "SRO" || this.userType== "KKC")){
      console.log('sro Login');      
      this.isSroLogin = true; 
    }
    else {
    console.log('It is not sro')
    }

    this.sroverifiedBy = this.ets.cookiename;
    this.selectedcenter = this.ets.cookiecenter;
    // console.log('entered by',this.enteredBy);
    if(this.selectedcenter == null)
    {
      this.ishoLogin=true;
    }
    else{
      this.ishoLogin=false;
    }
    console.log('isho login', this.ishoLogin)


    
    if (this.ets.cookievalue != null && (this.ets.cookievalue.indexOf('x6') !==-1 ) || (this.ets.cookievalue == "All"))  {
      console.log('inside if condition *********************')
      // this.router.navigate(['/dd-entry'])
    }
    else {
      // this.router.navigate(['/error']);
    }

    // if (this.ets.cookievalue == "1" || this.ets.cookievalue == "2" || this.ets.cookievalue == "3") {
    //   // this.router.navigate(['/dd-entry'])
    // }
    // else {
    //   // this.router.navigate(['/error']);
    // }

  }


  filter(value){

        // this.ackData = new Set(this.dateLists.map(item => item.ddenter.date));
        // console.log('ackvalue',this.ackData)
   
   
    console.log(value);
    this.selectedmonth=value;
    this.selectedData = this.dateLists.filter(
      s=> this.getMonthFromDate(s.ddenter.date)== value
    )
    console.log(this.selectedData)

    
  }
  getMonthFromDate(dateData) {
    if (dateData != null) {
      var month = dateData.toString().slice(3, -5)
      console.log('month**',month)
      return month;
    }

   
  }
  
  save(key , ddentry:registerDate){
    
    this.db.database.ref(`dateforsro/${key}`).once("value", snapshot => {

      let sid = snapshot.key;
      if (snapshot.exists()) {


        if (confirm('Are you sure to verify this entry')) {

          // this. = true;
          ddentry.issroVerified = true;
          ddentry.sroverifiedBy = this.sroverifiedBy;


          var updates = {};
          updates['/dateforsro/' + sid] = JSON.stringify(ddentry);
          try {
            let up = this.db.database.ref().update(updates);
            // this.router.navigate(['/']);
          }
          catch (ex) {
            alert("Error in verifying dd");
          }
        }
        // console.log('ddddd', ddentry)

      }
    });

  }
  

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../services/config.service';
import { EtsService } from '../../services/ets.service';
import { AcadamicService } from '../../services/acadamic.service';
import { FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { kkcddEntry, KKCentryData } from '../../models/KKC/kkcddentry';

@Component({
  selector: 'app-kkc-dd-verification',
  templateUrl: './kkc-dd-verification.component.html',
  styleUrls: ['./kkc-dd-verification.component.css']
})
export class KkcDdVerificationComponent implements OnInit {

  kkcddEntries: KKCentryData;
  ddList = new Array<kkcddEntry>();
  selectedmonth;
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
  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private router: Router,
    private http: HttpClient,
    private config: ConfigService,
    private ets: EtsService,
    private academic: AcadamicService,
    private fb: FormBuilder,
    private cookieservice: CookieService

  ) {



    let that = this;
    that.academic.GetKkcDdEntry().subscribe(data => {
      that.kkcddEntries = data;
      for (let i = 0; i <= data.Data.length; i++) {
        let entry = new kkcddEntry();
        entry.applicationNumber = data.Data[i].applicationNumber;
        entry.centerName = data.Data[i].centerName;
        entry.studentRollNumber = data.Data[i].studentRollNumber
        entry.bank = data.Data[i].bank;
        entry.courseName = data.Data[i].courseName;
        entry.studentName = data.Data[i].studentName;
        entry.date = data.Data[i].date;
        entry.ddAmount = data.Data[i].ddAmount;
        entry.ddDate = data.Data[i].ddDate;
        entry.ddNumber = data.Data[i].ddNumber;
        entry.enteredBy = data.Data[i].enteredBy;
        entry.feesItem = data.Data[i].feesItem;
        entry.kkcId = data.Data[i].kkcId;
        entry.KkcDdId = data.Data[i].KkcDdId;

        this.ddList.push(entry);
        // console.log('dd entriess',this.ddList)

      }


    },
      err => {
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      })






  }
  ngOnInit() {

  }
  entrySelection(ddentry: kkcddEntry, kkcId) {
    console.log('dd entry', ddentry);
    console.log('dd entry', kkcId);
    this.router.navigate(['/kkc-dd-entry-details/' + kkcId])

  }
  filter(key) {


  }
}

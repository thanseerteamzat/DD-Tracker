import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConfigService } from "src/app/services/config.service";
import { EtsService } from "src/app/services/ets.service";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { kkcddEntry } from '../../models/KKC/kkcddentry';
import { Center } from '../../models/Center';
import { AcadamicService } from '../../services/acadamic.service';
import { Course } from '../../models/Course';



@Component({
  selector: 'app-kkc-ddentry',
  templateUrl: './kkc-ddentry.component.html',
  styleUrls: ['./kkc-ddentry.component.css']
})
export class KkcDdentryComponent implements OnInit {
  kkcddEntry :kkcddEntry = new kkcddEntry;
  tempcentercode;
  kkcddEntries;
  selectedcenterr
  courses;
 tempcenter;
  split1;
  vtemp
  centerList: Center[] = [];
  courseList: Course[] = [];
  code;

  centers;
  feesItem;
  applicationNumber;
  district;
  ddDate = new Date;
  centerName;
  courseName;
  studentName;
  studentRollNumber;
  ddNumber;
  bank;
  ddAmount;
  enteredBy;
  todaydate= new Date;
  districts = [
    { id: '1', name: 'KANNUR' },
    { id: '2', name: 'KOZHIKODE' },
    { id: '3', name: 'MALAPPURAM' },
    { id: '4', name: 'PALAKKAD' },
    { id: '5', name: 'THRISSUR' },
    { id: '6', name: 'ERNAKULAM' },
    { id: '7', name: 'KOTTAYAM' },
    { id: '8', name: 'PATHANAMTHITTA' },
    { id: '9', name: 'ALAPPUZHA' },
    { id: '10', name: 'KOLLAM' },
    { id: '11', name: 'THIRUVANANTHAPURAM' },
  ];

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private router: Router,
    private http: HttpClient,
    private config: ConfigService,
    private ets: EtsService,
    private academic:AcadamicService,
    private fb: FormBuilder,
    private cookieservice: CookieService

  ) {
    this.academic.GetAllCenters().subscribe(data => {
      this.centers=data;
      console.log(this.centers,'Centers')
    },
    err => {
      console.log('Error: ' + err.error);
      console.log('Name: ' + err.name);
      console.log('Message: ' + err.message);
      console.log('Status: ' + err.status);
    })

    let that=this;
    that.academic.GetKkcDdEntry().subscribe(data => {
      that.kkcddEntries=data;
      console.log("hi************")
      console.log(that.kkcddEntries,'KKC DD Entries')
    },
    err => {
      console.log('Error: ' + err.error);
      console.log('Name: ' + err.name);
      console.log('Message: ' + err.message);
      console.log('Status: ' + err.status);
    })

    this.academic.GetAllCourses().subscribe(data => {
      this.courses=data;
      console.log(this.courses,'Courses')
    },
    err => {
      console.log('Error: ' + err.error);
      console.log('Name: ' + err.name);
      console.log('Message: ' + err.message);
      console.log('Status: ' + err.status);
    })
   }

  ngOnInit() {
  
    this.enteredBy=this.ets.cookiename;
  }
  register(){
  
    console.log('inside regsiter**')
    this.kkcddEntry.feesItem=this.feesItem;
    this.kkcddEntry.date=this.formatDate(this.todaydate);
    this.kkcddEntry.ddDate=this.formatDate(this.ddDate);
    this.kkcddEntry.applicationNumber=this.applicationNumber;
    this.kkcddEntry.centerName=this.centerName;
    this.kkcddEntry.studentName=this.studentName;
    this.kkcddEntry.bank=this.bank;
    this.kkcddEntry.courseName=this.courseName;
    this.kkcddEntry.studentRollNumber=this.studentRollNumber;
    this.kkcddEntry.ddNumber=this.ddNumber;
    this.kkcddEntry.ddAmount=this.ddAmount;
    this.kkcddEntry.enteredBy=this.enteredBy;
    console.log('KKC DD ENTRY ------------>',this.kkcddEntry);    
    this.academic.AddKkcDdEntry(this.kkcddEntry)
    alert('DD Added Successfully');

    let that=this;
    that.academic.GetKkcDdEntry().subscribe(data => {
      that.kkcddEntries=data;
      console.log("hi************")
      console.log(that.kkcddEntries,'KKC DD Entries')
    },
    err => {
      console.log('Error: ' + err.error);
      console.log('Name: ' + err.name);
      console.log('Message: ' + err.message);
      console.log('Status: ' + err.status);
    })

  }

  callType(value) {


   
  //   this.split1 = value.split(" ")[1];
  //   console.log('split1,',this.split1)
  //   let that = this;
  //   console.log(this.vtemp)
  //   this.ets.GetAllCourses(this.vtemp).subscribe(data => {
  //     that.courses = data;
  //     console.log(that.courses,'*****************')
  //     this.ets.courseList = this.courses;


  //   },
  //     error => console.log(error),
  //     () => console.log('courses'));
  //   // // console.log(this.split1);
  //   // return this.split1;


  // }
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

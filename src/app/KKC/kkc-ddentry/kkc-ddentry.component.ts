import { CenterData } from './../../models/Center';
import { CourseData } from './../../models/Course';
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
import { Common } from '../../models/common';



@Component({
  selector: 'app-kkc-ddentry',
  templateUrl: './kkc-ddentry.component.html',
  styleUrls: ['./kkc-ddentry.component.css']
})
export class KkcDdentryComponent implements OnInit {
  kkcddEntry: kkcddEntry = new kkcddEntry;
  tempcentercode;
  kkcddEntries;
  tempcoursecode;
  selectedcenterr
  courses: CourseData;
  tempcenter;
  split1;
  vtemp
  // centerList: Center[] = [];
  centerList = new Array<Center>();
  courseList = new Array<Course>();

  // courseList: Course[] = [];
  code;

  centers: CenterData;
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
  SerialNo;
  todaydate = new Date;
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
  minDate;
  maxDate;
  isEditMode;
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
    this.ddcreateForm();

    this.academic.GetAllCenters().subscribe(resdata => {
      this.centers = resdata;
      console.log(resdata);
      this.centerList = new Array<Center>();
      for (let i = 0; i <= resdata.Data.length; i++) {
        let c = new Center();
        c.Id = resdata.Data[i].Id;
        c.CenterCode = resdata.Data[i].CenterCode;
        c.CenterName = resdata.Data[i].CenterName;
        this.centerList.push(c);

      }

      console.log(this.centers, 'Centers')
    },
      err => {
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      })

    let that = this;
    that.academic.GetKkcDdEntry().subscribe(data => {
      that.kkcddEntries = data;
      this.SerialNo = that.kkcddEntries.Data.length + 1;
      console.log('this.serialNo', this.SerialNo)
      console.log("hi************")
      console.log(that.kkcddEntries, 'KKC DD Entries')
    },
      err => {
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      })

    this.academic.GetAllCourses().subscribe(courseData => {
      this.courses = courseData;
      console.log(courseData);
      this.courseList = new Array<Course>();
      for (let i = 0; i <= courseData.Data.length; i++) {
        let cou = new Course();
        cou.Code = this.courses.Data[i].Code;
        cou.Name = courseData.Data[i].Name;
        this.courseList.push(cou);
      }

    },
      err => {
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      })

    console.log('courseList**************************',
      this.courseList)
  }

  ngOnInit() {

    this.enteredBy = this.ets.cookiename;
  }
  register() {

    console.log('inside regsiter**')
    this.kkcddEntry.feesItem = this.feesItem;
    this.kkcddEntry.date = this.formatDate(this.todaydate);
    this.kkcddEntry.ddDate = this.formatDate(this.ddDate);
    this.kkcddEntry.applicationNumber = this.applicationNumber;
    this.kkcddEntry.centerName = this.centerName;
    this.kkcddEntry.studentName = this.studentName;
    this.kkcddEntry.bank = this.bank;
    this.kkcddEntry.courseName = this.courseName;
    this.kkcddEntry.studentRollNumber = 'K18' + this.tempcentercode + this.tempcoursecode + this.studentRollNumber;
    this.kkcddEntry.ddNumber = this.ddNumber;
    this.kkcddEntry.ddAmount = this.ddAmount;
    this.kkcddEntry.enteredBy = this.enteredBy;
    let uniqueId = "DD" + Common.newGuid();
    this.kkcddEntry.kkcId = uniqueId;
    console.log('KKC DD ENTRY ------------>', this.kkcddEntry);
    this.academic.AddKkcDdEntry(this.kkcddEntry)
    alert('DD Added Successfully**');

    let that = this;
    that.academic.GetKkcDdEntry().subscribe(data => {
      that.kkcddEntries = data;
      console.log("hi************")
      console.log(that.kkcddEntries, 'KKC DD Entries')
    },
      err => {
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      })
    this.resetForm();
  }

  callType(value) {
    console.log(this.centerList, '*********************************8');

    for (let i = 0; i <= this.centerList.length; i++) {
      console.log('i');
      let tempcenterObj = this.centerList[i];
      if (tempcenterObj != null && tempcenterObj.CenterName == this.centerName) {
        this.tempcentercode = tempcenterObj.CenterCode;
        console.log('tempcentercode', this.tempcentercode);

      }
      // if(tempcenterObj.Data.N)

    }
    console.log('centername', this.centerName);

    console.log('value', value);
    let split1 = value.split(" ")[1];
    console.log('splitted value', split1);

    // let that = this;
    // this.ets.GetAllCourses(split1).subscribe(data => {
    //   that.courses = data;

    //   this.ets.courseList = this.courses;


    // },
    //   error => console.log(error),
    //   () => console.log('courses'));
    // // console.log(this.split1);
    // return this.split1;




  }
  callTypee() {
    console.log(this.courseList);
    for (let i = 0; i <= this.courseList.length; i++) {
      console.log('i');
      let tempcourseObj = this.courseList[i];
      console.log(this.courseName);
      console.log(tempcourseObj.Code);
      if (tempcourseObj != null && tempcourseObj.Name == this.courseName) {
        this.tempcoursecode = tempcourseObj.Code;
        console.log('tempcentercode', this.tempcoursecode);

      }
      // if(tempcenterObj.Data.N)

    }

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


  ddentryForm = new FormGroup({

    // currentDate: new FormControl(),
    centerNameVal: new FormControl(),
    courseNameVal: new FormControl(),
    studentNameVal: new FormControl(),
    rollNumberVal: new FormControl(),
    ddNumberVal: new FormControl(),
    bankVal: new FormControl(),
    // ddDate: new FormControl(),
    ddAmountVal: new FormControl(),
    feesItemVal: new FormControl(),
    applicationNoVal: new FormControl()

  })

  ddcreateForm() {
    this.ddentryForm = this.fb.group(
      {
        // currentDate: [null, Validators.required],
        centerNameVal: [null, Validators.required],
        courseNameVal: [null, Validators.required],
        rollNumberVal: [null, Validators.required],

        studentNameVal: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z \-\']+')])],
        ddNumberVal: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]*')])],
        bankVal: [null, Validators.required],
        // ddDate: [null, Validators.required],
        ddAmountVal: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
        feesItemVal: [null, Validators.required],
        applicationNoVal: [null, Validators.required]

      }
    )
  }

  // get currentDate() { return this.ddentryForm.get('currentDate'); }
  get centerNameVal() { return this.ddentryForm.get('centerNameVal'); }
  get courseNameVal() { return this.ddentryForm.get('courseNameVal'); }
  get rollNumberVal() { return this.ddentryForm.get('rollNumberVal'); }

  get studentNameVal() { return this.ddentryForm.get('studentNameVal'); }
  get ddNumberVal() { return this.ddentryForm.get('ddNumberVal'); }
  get bankVal() { return this.ddentryForm.get('bankVal'); }
  get ddAmountVal() { return this.ddentryForm.get('ddAmountVal'); }
  // get ddDate() { return this.ddentryForm.get('ddDate'); }
  get feesItemVal() { return this.ddentryForm.get('feesItemVal'); }
  get applicationNoVal() { return this.ddentryForm.get('applicationNoVal'); }

  resetForm() {
    this.ddentryForm.reset(
      {
        // currentDate: null,
        centerNameVal: null,
        courseNameVal: null,
        studentNameVal: null,
        ddNumberVal: null,
        bankVal: null,
        ddAmountVal: null,
        rollNumberVal: null,
        // ddDate: null,
        feesItemVal: null,
        applicationNoVal: null
      }
    )
  }

}

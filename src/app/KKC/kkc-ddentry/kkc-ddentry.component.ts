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
  entries;
  tempentries;
  // centerList: Center[] = [];
  centerList = new Array<Center>();
  courseList = new Array<Course>();

  // courseList: Course[] = [];
  code;

  centers: CenterData;
  feesItem;
  applicationNumber;
  ddDate = new Date;
  centerName;
  courseName;
  studentName;
  studentRollNumber
  ddNumber;
  bank;
  ddAmount;
  enteredBy;
  SerialNo;
  splitValue;
  todaydate = new Date;
  districts = [
    { id: '1', name: 'Kannur' },
    { id: '2', name: 'Kozhikode' },
    { id: '3', name: 'Malappuram' },
    { id: '4', name: 'Palakkad' },
    { id: '5', name: 'Thrissur' },
    { id: '6', name: 'Ernakulam' },
    { id: '7', name: 'Kottayam' },
    { id: '8', name: 'Pathanamthitta' },
    { id : '9',name:'Idukki'},

    { id: '10', name: 'Alappuzha' },
    { id: '11', name: 'Kollam' },
    { id: '12', name: 'Thiruvananthapuram' },
  ];
  minDate;
  newddentry: kkcddEntry = new kkcddEntry();
   
  maxDate;
  isEditMode:boolean;
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

    let id = this.route.snapshot.paramMap.get('kkcId');
    console.log('id***',id);
    if(id != undefined){
      this.isEditMode = true ;
    }
    else{
    }  
   console.log('isedit mode',this.isEditMode)
    this.academic.GetAllCenters().subscribe(resdata => {
      this.centers = resdata;
      console.log(resdata);
      this.centerList = new Array<Center>();
      for (let i = 0; i <= resdata.Data.length; i++) {
        let c = new Center();
        c.Id = resdata.Data[i].Id;
        c.CenterCode = resdata.Data[i].CenterCode;
        c.CenterName = resdata.Data[i].CenterName;
        c.DistrictId = resdata.Data[i].DistrictId;
        this.centerList.push(c);

      }

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
      that.entries =data; 
      this.tempentries = this.entries.Data;
      if(id != undefined){
      for(let i=0 ; i <= this.tempentries.length ; i++){
        let tempobj = this.tempentries[i];
        if( tempobj != null  && tempobj.kkcId == id ){
          this.newddentry.kkcId= tempobj.kkcId;
          this.newddentry.KkcDdId = tempobj.KkcDdId;
          this.newddentry.feesItem =tempobj.feesItem;
          this.newddentry.bank = tempobj.bank;
          this.newddentry.applicationNumber = tempobj.applicationNumber;
          this.newddentry.centerName = "";
          this.newddentry.courseName = "";
          this.newddentry.date = tempobj.date;
          this.newddentry.ddAmount = tempobj.ddAmount;
          this.newddentry.ddDate = tempobj.ddDate;
          this.newddentry.ddNumber = tempobj.ddNumber;
          this.newddentry.enteredBy = tempobj.enteredBy;
          this.newddentry.studentName = tempobj.studentName;
          this.newddentry.studentRollNumber = tempobj.studentRollNumber;
          this.newddentry.enteredBy = tempobj.enteredBy;
          var splitValue =this.newddentry.studentRollNumber;
          splitValue= splitValue.substr(splitValue.length - 3);
          this.newddentry.studentRollNumber =splitValue;
          console.log('split value' , splitValue);
          console.log('new dd entry',this.newddentry);        

        }
      }
    }},
      err => {
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      })

    this.academic.GetAllCourses().subscribe(courseData => {
      this.courses = courseData;
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

  }

  ngOnInit() {

    this.enteredBy = this.ets.cookiename;
  }
  register() {

    console.log('inside regsiter**')
    this.kkcddEntry.feesItem = this.newddentry.feesItem;
    console.log('today date',this.todaydate)
    this.kkcddEntry.date = this.formatDate(this.todaydate);
    console.log('date',this.kkcddEntry.date)

    this.kkcddEntry.ddDate =this.formatDate(this.ddDate);
    this.kkcddEntry.applicationNumber = this.newddentry.applicationNumber;
    this.kkcddEntry.centerName = this.newddentry.centerName;
    this.kkcddEntry.studentName = this.newddentry.studentName;
    this.kkcddEntry.bank = this.newddentry.bank;
    this.kkcddEntry.courseName = this.newddentry.courseName;
    this.kkcddEntry.studentRollNumber = 'K18' + this.tempcentercode + this.tempcoursecode + '0' + this.newddentry.studentRollNumber;
    this.kkcddEntry.ddNumber = this.newddentry.ddNumber;
    this.kkcddEntry.ddAmount = this.newddentry.ddAmount;
    this.kkcddEntry.enteredBy = this.enteredBy;
    let uniqueId = "DD" + Common.newGuid();
    this.kkcddEntry.kkcId = uniqueId;
    console.log('kkc dd entry',this.kkcddEntry);
    this.academic.AddKkcDdEntry(this.kkcddEntry)
    alert('DD Added Successfully****');

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

  update() {

    console.log('inside update**')
    this.kkcddEntry.feesItem = this.newddentry.feesItem;
   if(this.newddentry.date.length <= 10){
    this.kkcddEntry.date = this.newddentry.date;
   }
   else{
     this.kkcddEntry.date = this.formatDate(this.newddentry.date);
   }
   if(this.newddentry.ddDate.length <= 10){
    this.kkcddEntry.ddDate = this.newddentry.ddDate;
   }
   else{
    this.kkcddEntry.ddDate = this.formatDate(this.newddentry.ddDate)

   }
    this.kkcddEntry.applicationNumber = this.newddentry.applicationNumber;
    this.kkcddEntry.centerName = this.newddentry.centerName;
    this.kkcddEntry.studentName = this.newddentry.studentName;
    this.kkcddEntry.bank = this.newddentry.bank;
    this.kkcddEntry.courseName = this.newddentry.courseName;
    this.kkcddEntry.studentRollNumber =  'K18' + this.tempcentercode + this.tempcoursecode + '0' + this.newddentry.studentRollNumber ;
    this.kkcddEntry.ddNumber = this.newddentry.ddNumber;
    this.kkcddEntry.ddAmount = this.newddentry.ddAmount;
   
    this.kkcddEntry.enteredBy = this.newddentry.enteredBy;
    this.kkcddEntry.kkcId = this.newddentry.kkcId;
    // let uniqueId = "DD" + Common.newGuid();
    // this.kkcddEntry.kkcId = uniqueId;
    console.log('kkc dd entry',this.kkcddEntry);
    this.academic.updateKKCEntry(this.kkcddEntry)
    alert('updates succesfully');
    this.router.navigate[('/kkc-dd-verification')]

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
  }


  callType(value) {
    console.log(this.centerList, '*********************************8');

    for (let i = 0; i <= this.centerList.length; i++) {
      console.log('i');
      let tempcenterObj = this.centerList[i];
      if (tempcenterObj != null && tempcenterObj.CenterName == this.newddentry.centerName) {
        this.tempcentercode = tempcenterObj.CenterCode;
        console.log('tempcentercode', this.tempcentercode);

      }
      // if(tempcenterObj.Data.N)

    }
    // console.log('centername', this.centerName);

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
      console.log(this.newddentry.courseName);
      console.log(tempcourseObj.Code);
      if (tempcourseObj != null && tempcourseObj.Name == this.newddentry.courseName) {
        this.tempcoursecode = tempcourseObj.Code;
        console.log('tempcoursecode', this.tempcoursecode);

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
        rollNumberVal: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern('[0-9]*')])],

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
  district(district){
console.log('district************',district)
this.academic.GetAllCentersByDistrict(district).subscribe(resdata => {
  this.centers = resdata;
  this.centerList = new Array<Center>();
  for (let i = 0; i <= resdata.Data.length; i++) {
    let c = new Center();
    c.Id = resdata.Data[i].Id;
    c.CenterCode = resdata.Data[i].CenterCode;
    c.CenterName = resdata.Data[i].CenterName;
    c.DistrictId = resdata.Data[i].DistrictId;
    this.centerList.push(c);

  }

},
  err => {
    console.log('Error: ' + err.error);
    console.log('Name: ' + err.name);
    console.log('Message: ' + err.message);
    console.log('Status: ' + err.status);
  })


}

}

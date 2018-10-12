import { Component, OnInit } from '@angular/core';
import { EtsService } from '../services/ets.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from 'selenium-webdriver/http';
import { ConfigService } from '../services/config.service';
import { Common } from '../models/common';
import { sroEntry, sroEntryList } from '../models/sroEntry';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { sroId } from '../models/sroId';
import { Center } from '../models/Center';
import { Course } from '../models/Course';
import { registerDate } from '../models/registerDate';
@Component({
  selector: 'app-kkc-sro-entry',
  templateUrl: './kkc-sro-entry.component.html',
  styleUrls: ['./kkc-sro-entry.component.css']
})
export class KkcSroEntryComponent implements OnInit {
  centers: Center[];
  selectedcenter;
  checkvariable;
  tempsroList;
  courses: Course[];
  code;
  tempvariable;
  tempvariableone;
  tempcentercode;
  tempcenter;
  tempcenterforDate;
  tempcenterdate;
  sumamount: number = 0;
  countdd: number = 0;
  selectedcenterr: string = "";
  split1: string;
  centerList: Center[] = [];
  vtemp: string;
  tempAmount;
  sroLists: sroEntryList[] = [];
  remarks;
  mytime: Date = new Date();
  minDate: Date;
  maxDate: Date;
  temptime;
  enteredBy;
  sroEntry: sroEntry = new sroEntry();
  dateforRegiter = new registerDate();
  ddCollected;
  selectedcourse;
  studentName;
  ddNumber;
  bank;
  tempdateeCount;
  tempdate;
  tempdateCount;
  appNo;
  Amount;
  feesItem;
  sroLastids: sroId[] = [];
  newsroLastId: sroId = new sroId();
  fromLastId;
  count;
  todaydate = new Date;
  selecteddate;
  selecteddatee;
  isformOpen: boolean;
  // isEditable;
  isEditMode;
  values = [
    { id: '1', name: 'Yes' },
    { id: '2', name: 'No' }
  ];

  todaydatee = new Date;
  constructor(private ets: EtsService,
    private cookieservice: CookieService,
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private router: Router,
    // private http: HttpClient,
    private config: ConfigService,
    private fb: FormBuilder,
  ) {




    this.minDate = new Date();
    this.maxDate = new Date();
    this.ddcreateForm();

    this.minDate.setDate(this.minDate.getDate() - 5);
    this.maxDate.setDate(this.maxDate.getDate() + 0);


    let that = this;
    this.ets.GetAllCenters().subscribe(data => {
      that.centers = data;
      this.ets.centerList = this.centers;

    },
      error => console.log(error),
      () => console.log('Get all complete'));


    this.selectedcenter = this.ets.cookiecenter;
    console.log('selected center*********************', this.selectedcenter)
    let thatt = this;
    this.ets.GetAllCourses(this.selectedcenter).subscribe(data => {
      thatt.courses = data;
      console.log('courses', thatt.courses)

      // this.ets.courseList = this.courses;


    },
      error => console.log(error),
      () => console.log('courses'));
    // // console.log(this.split1);
    // return this.split1; 




    let itemReff = db.object('sroEntry');
    itemReff.snapshotChanges().subscribe(action => {
      this.sroLists = [];
      var quatationsList = action.payload.val();
      let quotationobj = Common.snapshotToArray(action.payload);
      quotationobj.forEach(element => {
        let ddListItem = new sroEntryList();
        let qobj: sroEntry = JSON.parse(element);
        // console.log("****" + element);
        if (qobj.sroId != undefined) {
          qobj.sroId = qobj.sroId.replace("/", "");
        }

        ddListItem.ddenter = qobj;

        // let custList = this.ets.centerList.filter(s => s.Id == (qobj.centerId));
        // // console.log('2222222222222222222222222222',custList)
        // if (custList.length > 0) {
        //   ddListItem.center = custList[0];
        // }

        this.sroLists.push(ddListItem);
        // console.log('length***************************',this.sroLists.length);

      });
      var count = 0;
      this.sumamount = 0;
      var sumamount = 0;
      // console.log('length', this.sroLists.length)
      this.tempdateCount = this.formatDate(this.todaydate)
      // console.log("tempdate*****************************", this.tempdateCount);
      let topicObj = new sroEntryList;
      for (let i = 0; i <= this.sroLists.length; i++) {
        topicObj = this.sroLists[i]
        //  console.log(topicObj.ddenter);
        if (topicObj != null && topicObj.ddenter.ddNumber != null && topicObj.ddenter.date == this.tempdateCount && topicObj.ddenter.centerName == this.selectedcenter) {
          count = count + 1;
          sumamount = parseFloat(sumamount.toString()) + parseFloat(topicObj.ddenter.ddAmount.toString());
          this.sumamount = sumamount;
          //  console.log(count);
          this.countdd = count;
          //  count=count+1;

        }
      }
      // console.log('count', this.countdd)
      // console.log(this.sumamount, 'sumamount""""""""""""""""""""""""""""""""""""')




    });

    // for(let i=0; i<=this.sroLists.length;i++){
    //   this.tempsroList = this.sroLists[i];
    //   if(this.tempsroList !=null){
    //   console.log(this.tempsroList.ddenter);
    //   }

    //   if(this.tempsroList!=null){

    //   console.log(this.tempsroList.ddenter.centerName);
    //   }
    // }



    let itemRef = db.object('sroId');
    itemRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      this.sroLastids = [];
      obj.forEach(element => {
        let obj: sroId = JSON.parse(element);
        this.newsroLastId = obj;
        console.log('*********************', this.newsroLastId)
        this.sroLastids.push(obj as sroId);
        // console.log('aaaaaaaaaaaaaaaaaaaa', this.ddLastids)
        this.count = obj.lastId;
        this.fromLastId = obj.Id;

      });
    });



  }

  ngOnInit() {
    this.enteredBy = this.ets.cookiename;
    this.selectedcenter = this.ets.cookiecenter;
    console.log('entered by', this.enteredBy);


    if (this.ets.cookievalue != null && (this.ets.cookievalue.indexOf('x6') !== -1) || (this.ets.cookievalue == "All")) {
      console.log('inside if condition *********************')
      // this.router.navigate(['/dd-entry'])
    }
    else {
      this.router.navigate(['/error']);
    }

    // if (this.ets.cookievalue == "1" || this.ets.cookievalue == "2" || this.ets.cookievalue == "3") {
    //   // this.router.navigate(['/dd-entry'])
    // }
    // else {
    //   // this.router.navigate(['/error']);
    // }

  }
  myfunction(value) {
    // console.log(value);
    if (value == "Yes") {
      this.isformOpen = true;
    }
    else {
      this.isformOpen = false;
    }
  }

  beforeregister(key, dlastid: sroId) {
    this.tempvariable = this.Amount;
    // this.tempvariableone = this.ddNumber;
    this.tempvariableone=this.ddCollected
    this.register(key, dlastid);
    var tempAmount = 0;

    var datealreadyExists;
    let dateObj = new sroEntryList;
    this.tempdateeCount = this.formatDate(this.todaydate)
    this.tempcenterdate = this.selectedcenter;
    for (let i = 0; i <= this.sroLists.length; i++) {
      dateObj = this.sroLists[i];
      if (dateObj != null && dateObj.ddenter.date == this.tempdateeCount && dateObj.ddenter.centerName == this.selectedcenter) {
        console.log('date already entered');
        datealreadyExists = true;
        break;
      }
      else {
        datealreadyExists = false;
      }
    }

    if (datealreadyExists == false) {
      this.registerDate(key, dlastid)
    }
    else {
      // if (dateObj.ddenter.ddNumber != null)
      
      if(this.tempvariableone=='Yes'){
      this.updateDate(key, dlastid, this.tempdateeCount, this.tempcenterdate);
    }
    else{
      // alert('error');
    }
  }

  }
  updateDate(key, dlastid, tempdate, tempcenter) {
    let vamount = this.tempvariable;
    var amount :number;
    console.log('update works************')
    amount=this.tempvariable;
    
    
    let count = 1;
    //  console.log('sroList Length ***************',this.sroLists.length)
    for (let i = 0; i < this.sroLists.length; i++) {
      // console.log('inside Looop')
      let tempObj = this.sroLists[i];

      if (tempObj != null && amount!=null &&tempObj.ddenter.ddAmount!=null && tempObj.ddenter.date == tempdate && tempObj.ddenter.centerName == tempcenter) {
       console.log('inside if condition')
        amount =  parseFloat(amount.toString()) + parseFloat(tempObj.ddenter.ddAmount.toString());
        console.log('amount*****************',amount);
        count=count+1
      }
    }
    var updates = {};
    this.dateforRegiter.ddAmount=amount.toString();
    // var temp = 1 + this.count;
    this.dateforRegiter.noofDd = count;
    updates['/dateforsro/' + this.dateforRegiter.Id] = JSON.stringify(this.dateforRegiter);
    try {
      let up = this.db.database.ref().update(updates);
    }
    catch (x) {
      console.log(x);
    }
  }
  registerDate(key, dlastid) {


    let uniqueId = "/Q" + Common.newGuid();
    // console.log("****" + uniqueId);
    this.dateforRegiter.Id = uniqueId;
    if (this.tempvariableone == 'Yes') {
      this.dateforRegiter.noofDd = 1;
    this.dateforRegiter.ddAmount = this.tempvariable;
      
      console.log('exists');
    }
    else {
      this.dateforRegiter.noofDd = 0;
      var a=0;
    this.dateforRegiter.ddAmount = a.toString();
      


    }
    this.dateforRegiter.centerName = this.selectedcenter;
    this.tempdate=this.formatDate(this.todaydate);
    this.dateforRegiter.date = this.tempdate;
    // console.log('this.Amount***********************',this.Amount)
    let dateJson = JSON.stringify(this.dateforRegiter);
    // console.log(dateJson);
    try {
      this.db.database.ref('dateforsro').child(uniqueId).set(dateJson);
      // alert(" added successfull!!. ");
      // this.router.navigate(['/listquotation']);
    }
    catch (ex) {
      alert("Error in adding date");
    }

    
  }
  register(key, dlastid: sroId) {


    var counter = parseInt(this.count) + 1;
    //updating lastid
    var updates = {};
    dlastid.lastId = counter;
    updates['/sroId/' + key] = JSON.stringify(dlastid);
    let up = this.db.database.ref().update(updates);
    this.sroEntry.sroId = counter.toString();


    // console.log(key);
    console.log(dlastid.lastId)
    // console.log('inside function')
    this.sroEntry.enteredBy = this.enteredBy;

    this.sroEntry.ddAmount = this.Amount;
    // console.log('amount', this.Amount);
    this.sroEntry.applicationNumber = this.appNo;
    // console.log('app Number', this.appNo)
    this.sroEntry.feesItem = this.feesItem;
    // console.log('fees item', this.feesItem);
    this.selecteddate = this.todaydate;
    this.selecteddatee = this.todaydatee;
    this.sroEntry.date = this.formatDate(this.selecteddate);
    // console.log(this.sroEntry.date);

    this.sroEntry.enteredDate = this.formatDate(this.selecteddatee);
    // console.log(this.todaydatee)
    this.sroEntry.bank = this.bank;
    // console.log('bank', this.bank)
    this.sroEntry.ddNumber = this.ddNumber;
    // console.log('number********', this.ddNumber)
    this.sroEntry.studentName = this.studentName;
    // console.log('student name', this.studentName)

    // console.log('sroooo enteredby', this.sroEntry.enteredBy);
    this.temptime = this.mytime
    this.sroEntry.time = this.formatTime(this.temptime);
    // console.log(this.mytime)
    this.sroEntry.isddCollected = this.ddCollected
    this.sroEntry.remarks = this.remarks;
    this.sroEntry.ddAmount = this.Amount;
    this.sroEntry.centerName = this.selectedcenter;
    this.sroEntry.courseName = this.selectedcourse;
    let uniqueId = "/Q" + Common.newGuid();
    // console.log("****" + uniqueId);
    // this.erpdespatch.erpdespId = uniqueId;

    let InvoiceEntryJson = JSON.stringify(this.sroEntry);
    // console.log(InvoiceEntryJson);
    try {
      this.db.database.ref('sroEntry').child(counter.toString()).set(InvoiceEntryJson);
      alert("Added Successfully Please Note Inward Invoice Entry Serial No :" + this.sroEntry.sroId);
      this.isformOpen = false;
      this.resetForm();
      // this.tempdata=[];
      // this.tempdata=this.erpdespatchList;
      // this.router.navigateByUrl('/dd-entry', { skipLocationChange: true });

      this.router.navigate(['/sro-entry']);
      // this.router.navigate(['/erp-despatch-entry']);
    }
    catch (ex) {
      alert("Error in adding Quotation ");
    }
    this.selectedcenter = this.ets.cookiecenter;





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

  formatTime(time) {
    var d = new Date(time),
      hours = '' + (d.getHours() + 1),
      minutes = '' + d.getMinutes(),
      seconds = d.getSeconds();


    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;


    return [hours, minutes].join('-');
  }



  callType(value) {


    // this.tempcentercode = null;
    this.selectedcenterr = value;
    this.split1 = this.selectedcenterr.split(" ")[1];
    // console.log(this.split1);

    // this.split1 = value.substring( 0, value.indexOf(":"));
    //  console.log(this.split1)
    // this.split1=this.selectedcenterr.split(":")[0];
    for (let i = 0; i < this.ets.centerList.length; i++) {
      //variable for check reference

      var temp = this.ets.centerList[i];
      // console.log('*****',temp)
      if (temp.Id == this.split1) {
        this.vtemp = temp.CenterName;

        // this.selectedcenterr=value;
        // console.log(this.vtemp);


      }


      let centerResponse = this.ets.centerList;
      //  Iterate throw all keys.
      for (let cent of centerResponse) {

        this.centerList.push(cent);

      }

      this.code = 'Code:';
      try {

        for (let i = 0; i <= this.centerList.length; i++) {
          this.tempcenter = this.centerList[i];
          if (this.tempcenter.Id == this.split1) {
            this.tempcentercode = this.tempcenter.CenterCode;

          }
        }

      }
      catch (e) {

      }


    }


    // this.split1=this.selectedcenterr.split(": ")[1];


    // let that = this;
    // this.ets.GetAllCourses(this.vtemp).subscribe(data => {
    //   that.courses = data;

    //   this.ets.courseList = this.courses;


    // },
    //   error => console.log(error),
    //   () => console.log('courses'));
    // // // console.log(this.split1);
    // // return this.split1;


  }



  ddentryForm = new FormGroup({

    isddcollected: new FormControl(),
    remarkss: new FormControl(),
    feesitem: new FormControl(),
    appno: new FormControl(),
    courseName: new FormControl(),
    studentname: new FormControl(),
    ddnumber: new FormControl(),
    banks: new FormControl(),
    ddAmount: new FormControl(),
    // centerName :new FormControl(),


  })
  ddcreateForm() {
    this.ddentryForm = this.fb.group(
      {
        // currentDate: [null, Validators.required],
        isddcollected: [null, Validators.required],
        centerName: [null, Validators.required],
        remarkss: [null],
        feesitem: [null],
        appno: [null],
        courseName: [null],
        studentname: [null],
        ddnumber: [null],
        banks: [null],
        ddAmount: [null]


      })
  }

  get isddcollected() { return this.ddentryForm.get('isddcollected'); }
  // get centerName() { return this.ddentryForm.get('centerName'); }
  get feesitem() { return this.ddentryForm.get('feesitem'); }
  get appno() { return this.ddentryForm.get('appno'); }
  get courseName() { return this.ddentryForm.get('courseName'); }
  get studentname() { return this.ddentryForm.get('studentname'); }
  get ddnumber() { return this.ddentryForm.get('ddnumber'); }
  get banks() { return this.ddentryForm.get('banks'); }
  get ddAmount() { return this.ddentryForm.get('ddAmount'); }





  resetForm() {
    this.ddentryForm.reset(
      {
        // currentDate: null,
        remarkss: null,
        centerName: null,
        feesitem: null,
        appno: null,
        courseName: null,
        studentname: null,
        ddnumber: null,
        banks: null,
        ddAmount: null,

      })
  }
}

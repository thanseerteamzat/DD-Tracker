import { Component, OnInit } from '@angular/core';
import { Center } from '../models/Center';
import { Course } from '../models/Course';

import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../models/common';
import { adjddEntry, adjddList } from '../models/adjlastid';

import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConfigService } from "src/app/services/config.service";
import { EtsService } from "src/app/services/ets.service";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { adjddLastid } from '../models/adjlastid';
import { adjddentryTemp } from '../models/adjlastid';

// import { ddLastid } from '../models/ddLastid';
// import { ddentryTemp } from '../models/ddentryTemp';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-adj-entry',
  templateUrl: './adj-entry.component.html',
  styleUrls: ['./adj-entry.component.css']
})
export class AdjEntryComponent implements OnInit {

  tempdate;
  tempcheck;
  tempapplist;
  minDate: Date;
  bsValue = new Date();

  minDateDD: Date;
  maxDateDD: Date;

  maxDate: Date;
  todaydate = new Date();
  todaydatee = new Date();
  selecteddate;
  selecteddatee;
  tempcenter;
  tempcentercode;
  //api url and center variable
  d = new Date();
  code;
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

  temp2: string;
  centers: Center[];
  courses: Course[];
  ddLists: adjddList[] = [];
  //variable four count
  count;
  //variable for last id
  fromLastId;
  isEditMode: boolean = false;
  shouldShowContent: boolean = false;
  centerList: Center[] = [];
  courseList: Course[] = [];
  centerhelp: Center[];
  selectedcenter: string = "";
  selectedcenterr: string = "";
  selectedcourse: string = "";
  newddLastId: adjddLastid = new adjddLastid();
  ddLastids: adjddLastid[] = [];
  ddtempentries: adjddentryTemp[] = [];
  newddEntry: adjddEntry = new adjddEntry();
  newddentryTemp: adjddentryTemp = new adjddentryTemp();
  newLastid: adjddLastid = new adjddLastid();
  vtemp: string;
  split1: string;
  ddentries: adjddEntry[] = [];
  newddentry: adjddEntry = new adjddEntry();
  qIdEditMode: string = undefined;
  check: string;
  adjlastidvalue;
  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private router: Router,
    private http: HttpClient,
    private config: ConfigService,
    private ets: EtsService,
    private fb: FormBuilder,
    private cookieservice: CookieService

  ) {
    // console.log('new *********************************',this.newddEntry.dDate);
    this.minDate = new Date();
    this.maxDate = new Date();

    this.minDateDD = new Date();
    this.maxDateDD = new Date();

    this.minDate.setDate(this.minDate.getDate() - 4);
    this.maxDate.setDate(this.maxDate.getDate() + 0);

    this.minDateDD.setDate(this.minDateDD.getDate() - 50);
    this.maxDateDD.setDate(this.maxDateDD.getDate() + 0);
    // this.tempcheck = new Date ;  
    // this.newddEntry.ddDate = this.tempcheck;
    // console.log(this.newddEntry.ddDate,'********************************CHECK')
    this.ddcreateForm();

    let id = this.route.snapshot.paramMap.get('adjddlastId');
    //  console.log('id***********************',id)
    let itemReff = db.object('adjddEntry');
    itemReff.snapshotChanges().subscribe(action => {
      this.ddLists = [];
      var quatationsList = action.payload.val();
      let quotationobj = Common.snapshotToArray(action.payload);
      quotationobj.forEach(element => {
        let ddListItem = new adjddList();
        let qobj: adjddEntry = JSON.parse(element);
        // console.log("****" + element);
        if (qobj.ddlastId != undefined) {
          qobj.ddlastId = qobj.ddlastId.replace("/", "");
        }

        ddListItem.ddenter = qobj;

        let custList = this.ets.centerList.filter(s => s.Id == (qobj.centerId));
        // console.log('2222222222222222222222222222', custList)
        if (custList.length > 0) {
          ddListItem.center = custList[0];
        }

        this.ddLists.push(ddListItem);

      });

    });



    if (id != undefined) {
      this.qIdEditMode = id;
      this.isEditMode = true;
    }
    let that = this;
    this.ets.GetAllCenters().subscribe(data => {
      that.centers = data;
      this.ets.centerList = this.centers;

    },
      error => console.log(error),
      () => console.log('Get all complete'));

    if (id != undefined) {
      // console.log('12345678901234567892345678234567856789', id)
      let dReference = db.object('adjddEntry');
      dReference.snapshotChanges().subscribe(action => {
        console.log(action.type);
        console.log(action.key);

        var ddentryList = action.payload.val();
        // console.log(this.quotations[0].customerName)
        // console.log(quatationsList);
        let obj = Common.snapshotToArray(action.payload);
        this.ddentries = [];
        obj.forEach(element => {

          let obj: adjddEntry = JSON.parse(element);
          let ddListItem = new adjddEntry();

          // console.log("****" + element);
          if (obj.ddlastId != undefined && (obj.ddlastId) == id) {
            obj.ddlastId = obj.ddlastId.replace("/", "");
            this.newddEntry = obj;

            // let center = this.centerList.filter(s => s.Id==(obj.centerId));
            // // console.log('000000000000000',center)
            // if (center.length > 0) {
            //   this.selectedcenter = center[0];
            // }
          }
        })
      })




    }
    //code for listing ddLastid
    let itemRef = db.object('adjddlastId');
    itemRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      this.ddLastids = [];
      obj.forEach(element => {
        let obj: adjddLastid = JSON.parse(element);
        this.newddLastId = obj;
        this.ddLastids.push(obj as adjddLastid);
        // console.log('aaaaaaaaaaaaaaaaaaaa', this.ddLastids)
        this.count = obj.lastId;
        console.log('split', this.count)

        var split = this.count.split('')[1];
        console.log('split', split)
        var counter = parseInt(split) + 1;
        this.adjlastidvalue = 'A' + counter;
        console.log('splitted value', this.adjlastidvalue)
        this.fromLastId = obj.Id;

      });
    });

    //code for listing ddentrytemp
    let ddentryttempRef = db.object('adjddentryTemp');
    ddentryttempRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      this.ddtempentries = [];
      obj.forEach(element => {
        let obj: adjddEntry = JSON.parse(element);
        this.newddentryTemp = obj;
        this.ddtempentries.push(obj as adjddentryTemp);
      });
    });


    // dates of ddentry
    let todayDate = (new Date(Date.now()));
    let dddate = new Date();
    this.newddEntry.ddDate = this.formatDate(this.newddEntry.ddDate);
    this.newddEntry.dDate = this.formatDate(this.newddEntry.dDate);


  }


  //EDIT




  ngOnInit() {


    // console.log('***********************',ddList)


    this.newddentry.enteredBy = this.ets.cookiename;

    // if (this.ets.cookievalue == "1" || this.ets.cookievalue == "2" || this.ets.cookievalue == "3") {
    //   // this.router.navigate(['/dd-entry'])
    // }
    // else {
    //   this.router.navigate(['/error']);
    // }

    this.check = this.ets.cookiename;
    this.newddEntry.enteredBy = this.check;


  }

  //date format
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }



  beforeregister(key, dlastid: adjddLastid) {
    console.log(key)
    try {
      var applicationNoExists = false;
      for (let i = 0; i <= this.ddLists.length; i++) {
        this.tempapplist = this.ddLists[i];
        if (this.tempapplist != null && this.tempapplist.ddenter.appNo == this.newddEntry.appNo) {
          applicationNoExists = true;
          break;
        }
      }
      //   if(applicationNoExists)
      // {
      //   console.log(applicationNoExists);
      //   alert('Application number duplication');
      // }
      if (applicationNoExists === false) {
        this.register(key, dlastid);
      }
      else {
        alert('application number duplication')
      }
      // if (a != 1) {
      //   this.register(key, dlastid);
      //     }
    }
    catch (x) {
      console.log(x);
    }
  }



  register(key, dlastid: adjddLastid) {

    this.newddEntry.entryPros = false;

    if (this.isEditMode) {
      this.tempdate = this.newddentry.dDate;
      this.todaydate = this.tempdate;
      this.newddEntry.dDate = this.formatDate(this.newddEntry.dDate);
      this.newddEntry.ddDate = this.formatDate(this.newddEntry.ddDate);

      this.newddEntry.prosvalue = false;
      var ddreferno = this.newddEntry.ddNumber;
      var ddreferdate = this.newddEntry.ddDate;
      var ddreferbank = this.newddEntry.bank;

      for (let i = 0; i < this.ddtempentries.length; i++) {
        //variable for check reference
        var temp = this.ddtempentries[i];
        // console.log('tttttttttttttttttttttt', temp)

      }
      if (temp != null) {
        if (temp.ddNumber == ddreferno && temp.ddDate == ddreferdate && temp.bank == ddreferbank) {
          // console.log('******************************************************  Edit mode')
          var updates = {};
          this.newddEntry.centerId = this.selectedcenter;
          this.newddEntry.courseName = this.selectedcourse;


          //Fee without tax equation : ddamount /1.18

          let feewithoutTax = parseFloat(this.newddEntry.Amount) / 1.18;
          let fwtFloat = feewithoutTax.toFixed(2);
          this.newddEntry.feeWT = fwtFloat;

          //tax calculation equation : ddamount -feewithouttax

          let tax = parseFloat(this.newddEntry.Amount) - parseFloat(this.newddEntry.feeWT);
          let taxfloat = tax.toFixed(2);
          this.newddEntry.taxValue = taxfloat;

          //update query

          if (confirm('Are you sure to update details')) {
            updates['/adjddEntry/' + this.newddEntry.ddlastId] = JSON.stringify(this.newddEntry);
            try {
              let up = this.db.database.ref().update(updates);

            }
            catch (ex) {
              alert("Error in Updating details");
            }
            this.newddentryTemp.bank = this.newddentry.bank;
            this.newddentryTemp.ddDate = this.newddentry.ddDate;
            this.newddentryTemp.ddNumber = this.newddentry.ddNumber;

            updates['/adjddentryTemp/' + this.newddEntry.ddlastId] = JSON.stringify(this.newddentryTemp);
            try {
              let up = this.db.database.ref().update(updates);

            }
            catch (ex) {
              alert("Error in Updating Quotation");
            }
            this.router.navigate(['/adjverification']);

          }
          else {
            this.router.navigate(['/adjverification']);

          }


        }

        else {
          var updates = {};
          this.newddEntry.centerId = this.selectedcenter;
          this.newddEntry.courseName = this.selectedcourse;

          //Fee without tax equation : ddamount /1.18

          let feewithoutTax = parseFloat(this.newddEntry.Amount) / 1.18;
          let fwtFloat = feewithoutTax.toFixed(2);
          this.newddEntry.feeWT = fwtFloat;

          //tax calculation equation : ddamount -feewithouttax

          let tax = parseFloat(this.newddEntry.Amount) - parseFloat(this.newddEntry.feeWT);
          let taxfloat = tax.toFixed(2);
          this.newddEntry.taxValue = taxfloat;

          updates['/adjddEntry/' + this.newddEntry.ddlastId] = JSON.stringify(this.newddEntry);
          try {
            if (confirm('Are you sure to update details ')) {
              let up = this.db.database.ref().update(updates);
              this.router.navigate(['/adjverification']);

            }
            else {
              this.router.navigate(['/adjverification']);
            }

          }
          catch (ex) {
            alert("Error in Updating Quotation");
          }

        }

      }
    }

    //new ddentry adding code

    else {

      this.newddEntry.prosvalue = false;
      // console.log('******************************************* Not Edit Mode')
      var ddreferno = this.newddEntry.ddNumber;
      var ddreferdate = this.newddEntry.ddDate;
      var ddreferbank = this.newddEntry.bank;

      for (let i = 0; i < this.ddtempentries.length; i++) {
        //variable for check reference
        var temp = this.ddtempentries[i];
        // console.log('tttttttttttttttttttttt', temp)

      }
      if (temp != null) {
        if (temp.ddNumber == ddreferno && temp.ddDate == ddreferdate && temp.bank == ddreferbank) {

          alert('DD details  already exists')
        }
        else {
          var counter = parseInt(this.count) + 1;
          //updating lastid
          var updates = {};
          dlastid.lastId = this.adjlastidvalue;
          updates['/adjddlastId/' + key] = JSON.stringify(dlastid);
          let up = this.db.database.ref().update(updates);
          this.newddEntry.ddlastId = this.adjlastidvalue
          this.newddEntry.centerId = this.selectedcenter;
          this.newddEntry.courseName = this.selectedcourse;
          this.selecteddate = this.todaydate;
          this.selecteddatee = this.todaydatee;
          this.newddEntry.ddDate = this.formatDate(this.selecteddatee);
          this.newddEntry.dDate = this.formatDate(this.selecteddate);
          this.newddEntry.ddDate = this.formatDate(this.newddEntry.ddDate);

          // this.newddEntry.ddDate = this.formatDate(this.newddEntry.ddDate);
          // this.newddEntry.dDate = this.formatDate(this.newddEntry.dDate);

          // let uniqueId = "/DD" + Common.newGuid();
          // this.newddEntry.dduId = uniqueId;
          this.newddentryTemp.ddDate = this.newddEntry.ddDate;
          this.newddentryTemp.ddNumber = this.newddEntry.ddNumber;
          this.newddentryTemp.bank = this.newddEntry.bank;
          let ddentryTempJson = JSON.stringify(this.newddentryTemp);

          try {
            this.db.database.ref('adjddentryTemp').child(this.adjlastidvalue).set(ddentryTempJson);

          }
          catch (ex) {

          }
          this.newddEntry.isVerified = false;
          this.newddEntry.isddIdentered = false;
          this.newddEntry.isidVerified = false;
          //Fee without tax equation : ddamount /1.18

          let feewithoutTax = parseFloat(this.newddEntry.Amount) / 1.18;
          let fwtFloat = feewithoutTax.toFixed(2);
          this.newddEntry.feeWT = fwtFloat;

          //tax calculation equation : ddamount -feewithouttax

          let tax = parseFloat(this.newddEntry.Amount) - parseFloat(this.newddEntry.feeWT);
          let taxfloat = tax.toFixed(2);
          this.newddEntry.taxValue = taxfloat;

          let ddEntryJson = JSON.stringify(this.newddEntry);

          try {
            this.db.database.ref('adjddEntry').child(this.adjlastidvalue).set(ddEntryJson);
            alert("DD Entry added successfully!! Please note DD Serial No : A" + this.newddEntry.ddlastId);
            this.router.navigate(['/adjustment']);
          }
          catch (ex) {

          }
        }
        this.resetForm();
      }
      else {
        var counter = parseInt(this.count) + 1;
        //updating lastid
        var updates = {};
        dlastid.lastId = this.adjlastidvalue;
        updates['/adjddlastId/' + key] = JSON.stringify(dlastid);
        let up = this.db.database.ref().update(updates);
        this.newddEntry.ddlastId = this.adjlastidvalue;
        this.newddEntry.centerId = this.selectedcenter;
        this.newddEntry.courseName = this.selectedcourse;
        this.newddEntry.ddDate = this.formatDate(this.selecteddate);

        // let uniqueId = "/DD" + Common.newGuid();
        // this.newddEntry.dduId = uniqueId;
        this.newddentryTemp.ddDate = this.newddEntry.ddDate;
        this.newddentryTemp.ddNumber = this.newddEntry.ddNumber;
        this.newddentryTemp.bank = this.newddEntry.bank;
        let ddentryTempJson = JSON.stringify(this.newddentryTemp);

        try {
          this.db.database.ref('adjddentryTemp').child(this.adjlastidvalue).set(ddentryTempJson);

        }
        catch (ex) {

        }
        this.newddEntry.isVerified = false;
        this.newddEntry.isddIdentered = false;
        this.newddEntry.isidVerified = false;
        //Fee without tax equation : ddamount /1.18

        let feewithoutTax = parseFloat(this.newddEntry.Amount) / 1.18;
        let fwtFloat = feewithoutTax.toFixed(2);
        this.newddEntry.feeWT = fwtFloat;

        //tax calculation equation : ddamount -feewithouttax

        let tax = parseFloat(this.newddEntry.Amount) - parseFloat(this.newddEntry.feeWT);
        let taxfloat = tax.toFixed(2);
        this.newddEntry.taxValue = taxfloat;

        let ddEntryJson = JSON.stringify(this.newddEntry);

        try {
          this.db.database.ref('adjddEntry').child(this.adjlastidvalue).set(ddEntryJson);

          alert("DD Entry added successfully!! Please note DD Serial No : A" + this.newddEntry.ddlastId);
          this.router.navigate(['/adjustment']);
        }
        catch (ex) {

        }
        this.resetForm();

      }
    }


  }

  //validation codes 

  ddentryForm = new FormGroup({

    // currentDate: new FormControl(),
    centerName: new FormControl(),
    courseName: new FormControl(),
    studentName: new FormControl(),
    ddNumber: new FormControl(),
    bank: new FormControl(),
    // ddDate: new FormControl(),
    ddAmount: new FormControl(),
    feesItem: new FormControl(),
    applicationNo: new FormControl()

  })

  ddcreateForm() {
    this.ddentryForm = this.fb.group(
      {
        // currentDate: [null, Validators.required],
        centerName: [null, Validators.required],
        courseName: [null, Validators.required],

        studentName: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z \-\']+')])],
        ddNumber: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]*')])],
        bank: [null, Validators.required],
        // ddDate: [null, Validators.required],
        ddAmount: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
        feesItem: [null, Validators.required],
        applicationNo: [null, Validators.required]

      }
    )
  }

  // get currentDate() { return this.ddentryForm.get('currentDate'); }
  get centerName() { return this.ddentryForm.get('centerName'); }
  get courseName() { return this.ddentryForm.get('courseName'); }

  get studentName() { return this.ddentryForm.get('studentName'); }
  get ddNumber() { return this.ddentryForm.get('ddNumber'); }
  get bank() { return this.ddentryForm.get('bank'); }
  get ddAmount() { return this.ddentryForm.get('ddAmount'); }
  // get ddDate() { return this.ddentryForm.get('ddDate'); }
  get feesItem() { return this.ddentryForm.get('feesItem'); }
  get applicationNo() { return this.ddentryForm.get('applicationNo'); }

  resetForm() {
    this.ddentryForm.reset(
      {
        // currentDate: null,
        centerName: null,
        courseName: null,
        studentName: null,
        ddNumber: null,
        bank: null,
        ddAmount: null,
        // ddDate: null,
        feesItem: null,
        applicationNo: null
      }
    )
  }

  district(district) {
    // console.log('district******=****************', district);
    // console.log(district);
    // console.log('*************');
    this.temp2 = district;
    // console.log(this.temp2);
    let that = this;
    this.ets.GetCenterbyDist(this.temp2).subscribe(data => {
      that.centers = data;
      // console.log(this.centers)

    },
      error => console.log(error),
      () => console.log('courses'));
    // // console.log(this.split1);
    // return this.split1;



  }


  callType(value) {


    this.tempcentercode = null;
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


    let that = this;
    this.ets.GetAllCourses(this.vtemp).subscribe(data => {
      that.courses = data;

      this.ets.courseList = this.courses;


    },
      error => console.log(error),
      () => console.log('courses'));
    // // console.log(this.split1);
    // return this.split1;


  }
  getResult(event) {

    console.log('eventttttttttttttttttttt', event)
    if (event == "Prospectus") {

      this.router.navigate(['/adjprospectus']);

    }
    else {
      console.log('error')
    }
  }

}




import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from 'selenium-webdriver/http';
import { ConfigService } from '../services/config.service';
import { EtsService } from '../services/ets.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Center } from '../models/Center';
import { Course } from '../models/Course';
import { ddList, ddEntry } from '../models/ddEntry';
import { ddLastid } from '../models/ddLastid';
import { ddentryTemp } from '../models/ddentryTemp';
import { Common } from '../models/common';

@Component({
  selector: 'app-prospectus',
  templateUrl: './prospectus.component.html',
  styleUrls: ['./prospectus.component.css']
})
export class ProspectusComponent implements OnInit {

  centers: Center[];
  courses: Course[];
  ddLists: ddList[] = [];
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
  newddLastId: ddLastid = new ddLastid();
  ddLastids: ddLastid[] = [];
  ddtempentries: ddentryTemp[] = [];
  newddEntry: ddEntry = new ddEntry();
  newddentryTemp: ddentryTemp = new ddentryTemp();
  newLastid: ddLastid = new ddLastid();
  minDate: Date;
  maxDate: Date;
  vtemp: string;
  split1: string;
  ddentries: ddEntry[] = [];
  newddentry: ddEntry = new ddEntry();
  qIdEditMode: string = undefined;
  cookienametodb;
  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private router: Router,
    // private http: HttpClient,
    private config: ConfigService,
    private ets: EtsService,
    private fb: FormBuilder,
  ) {
    this.ddcreateForm();

    let id = this.route.snapshot.paramMap.get('ddlastId');
    console.log('**********************************')
    console.log(id);
    if (id != undefined) {
      this.qIdEditMode = id;
      this.isEditMode = true;
    }
    let that = this;
    this.ets.GetAllCenters().subscribe(data => {
      that.centers = data;
      this.ets.centerList = this.centers;
      // console.log('testtttttttt', this.ets.centerList)
      // var result =this.ets.centerList.map(x =>x.CenterName)
      // console.log('cnet',result)
    },
      error => console.log(error),
      () => console.log('Get all complete'));

    if (id != undefined) {

      let dReference = db.object('ddEntry');
      dReference.snapshotChanges().subscribe(action => {
        console.log(action.type);
        console.log(action.key);

        var ddentryList = action.payload.val();
        // console.log(this.quotations[0].customerName)
        // console.log(quatationsList);
        let obj = Common.snapshotToArray(action.payload);
        this.ddentries = [];
        obj.forEach(element => {

          let obj: ddEntry = JSON.parse(element);
          let ddListItem = new ddEntry();

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
    let itemRef = db.object('ddLastId');
    itemRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      this.ddLastids = [];
      obj.forEach(element => {
        let obj: ddLastid = JSON.parse(element);
        this.newddLastId = obj;
        this.ddLastids.push(obj as ddLastid);
        // console.log('aaaaaaaaaaaaaaaaaaaa', this.ddLastids)
        this.count = obj.lastId;
        this.fromLastId = obj.Id;

      });
    });

    //code for listing ddentrytemp
    let ddentryttempRef = db.object('ddentryTemp');
    ddentryttempRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      this.ddtempentries = [];
      obj.forEach(element => {
        let obj: ddEntry = JSON.parse(element);
        this.newddentryTemp = obj;
        this.ddtempentries.push(obj as ddentryTemp);
      });
    });
    this.newddEntry.feesItem = "Prospectus";
    this.newddentry.enteredBy = this.ets.cookiename;
    //dates of ddentry;
    let todayDate = (new Date(Date.now()));
    let dddate = new Date();
    this.newddEntry.ddDate = this.formatDate(dddate);
    this.newddEntry.dDate = this.formatDate(todayDate);
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
  ngOnInit() {
    console.log('cokieeeeeeeee name', this.ets.cookiename)
    this.newddentry.enteredBy = this.ets.cookiename;
    if (this.ets.cookievalue == "1" || this.ets.cookievalue == "3") {
      this.router.navigate(['/dd-entry'])
    }
    else {
      this.router.navigate(['/error']);
    }
    this.cookienametodb = this.ets.cookiename
  }
  register(key, dlastid: ddLastid) {
    console.log('******************************************* Not Edit Mode')
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
        dlastid.lastId = counter;
        updates['/ddLastId/' + key] = JSON.stringify(dlastid);
        let up = this.db.database.ref().update(updates);
        this.newddEntry.ddlastId = counter.toString();
        this.newddEntry.centerId = this.selectedcenter;
        this.newddEntry.feesItem = "Prospectus";
        this.newddentry.enteredBy = this.ets.cookiename;

        this.newddentryTemp.ddDate = this.newddEntry.ddDate;
        this.newddentryTemp.ddNumber = this.newddEntry.ddNumber;
        this.newddentryTemp.bank = this.newddEntry.bank;
        let ddentryTempJson = JSON.stringify(this.newddentryTemp);
        console.log(ddentryTempJson);
        try {
          this.db.database.ref('ddentryTemp').child(counter.toString()).set(ddentryTempJson);

        }
        catch (ex) {

        }
        this.newddEntry.isVerified = false;
        this.newddEntry.isddIdentered = false;
        this.newddEntry.isidVerified = false;
        this.newddentry.enteredBy = this.cookienametodb;

        let ddEntryJson = JSON.stringify(this.newddEntry);
        console.log(ddEntryJson);
        try {
          this.db.database.ref('ddEntry').child(counter.toString()).set(ddEntryJson);
          alert("DD Entry added successfully!!.");
          this.router.navigate(['/dd-entry']);
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
      dlastid.lastId = counter;
      updates['/ddLastId/' + key] = JSON.stringify(dlastid);
      let up = this.db.database.ref().update(updates);
      this.newddEntry.ddlastId = counter.toString();
      this.newddEntry.centerId = this.selectedcenter;
      this.newddEntry.feesItem = "Prospectus";
      this.newddentry.enteredBy = this.ets.cookiename;

      this.newddentryTemp.ddDate = this.newddEntry.ddDate;
      this.newddentryTemp.ddNumber = this.newddEntry.ddNumber;
      this.newddentryTemp.bank = this.newddEntry.bank;
      let ddentryTempJson = JSON.stringify(this.newddentryTemp);
      console.log(ddentryTempJson);
      try {
        this.db.database.ref('ddentryTemp').child(counter.toString()).set(ddentryTempJson);

      }
      catch (ex) {

      }
      this.newddEntry.isVerified = false;
      this.newddEntry.isddIdentered = false;
      this.newddEntry.isidVerified = false;
      this.newddentry.enteredBy = this.cookienametodb;

      let ddEntryJson = JSON.stringify(this.newddEntry);
      console.log(ddEntryJson);
      try {
        this.db.database.ref('ddEntry').child(counter.toString()).set(ddEntryJson);
        alert("DD Entry added successfully!!.");
        this.router.navigate(['/dd-entry']);
      }
      catch (ex) {

      }
      this.resetForm();

    }
  }

  ddentryForm = new FormGroup({

    // currentDate: new FormControl(),
    centerName: new FormControl(),
    // courseName: new FormControl(),
    // studentName: new FormControl(),
    ddNumber: new FormControl(),
    bank: new FormControl(),
    // ddDate: new FormControl(),
    ddAmount: new FormControl(),
    feesItem: new FormControl(),
    // applicationNo: new FormControl()

  })

  ddcreateForm() {
    this.ddentryForm = this.fb.group(
      {
        // currentDate: [null, Validators.required],
        centerName: [null, Validators.required],
        // courseName: [null, Validators.required],

        // studentName: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z \-\']+')])],
        ddNumber: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]*')])],
        bank: [null, Validators.required],
        // ddDate: [null, Validators.required],
        ddAmount: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
        feesItem: [null, Validators.required],
        // applicationNo: [null, Validators.required]

      }
    )
  }

  // get currentDate() { return this.ddentryForm.get('currentDate'); }
  get centerName() { return this.ddentryForm.get('centerName'); }
  // get courseName() { return this.ddentryForm.get('courseName'); }

  // get studentName() { return this.ddentryForm.get('studentName'); }
  get ddNumber() { return this.ddentryForm.get('ddNumber'); }
  get bank() { return this.ddentryForm.get('bank'); }
  get ddAmount() { return this.ddentryForm.get('ddAmount'); }
  // get ddDate() { return this.ddentryForm.get('ddDate'); }
  get feesItem() { return this.ddentryForm.get('feesItem'); }
  // get applicationNo() { return this.ddentryForm.get('applicationNo'); }

  resetForm() {
    this.ddentryForm.reset(
      {
        // currentDate: null,
        centerName: null,
        // courseName: null,
        // studentName: null,
        ddNumber: null,
        bank: null,
        ddAmount: null,
        // ddDate: null,
        feesItem: null,
        // applicationNo: null
      }
    )
  }

}

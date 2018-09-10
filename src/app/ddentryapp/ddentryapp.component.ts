import { Component, OnInit } from '@angular/core';
import { Center } from '../models/Center';
import { Course } from '../models/Course';

import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../models/common';
import { ddEntry, ddList } from '../models/ddEntry';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConfigService } from "src/app/services/config.service";
import { EtsService } from "src/app/services/ets.service";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ddLastid } from '../models/ddLastid';
import { ddentryTemp } from '../models/ddentryTemp';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-ddentryapp',
  templateUrl: './ddentryapp.component.html',
  styleUrls: ['./ddentryapp.component.css']
})
export class DdentryappComponent implements OnInit {

//api url and center variable
d = new Date();
selectedData ;
newselectedData ;

districts = [
  {id:'1', name:'KANNUR'},
  {id:'2', name:'KOZHIKODE'},
  {id:'3', name:'MALAPPURAM'},
  {id:'4', name:'PALAKKAD'},
  {id:'5', name:'THRISSUR'},
  {id:'6', name:'ERNAKULAM'},
  {id:'7', name:'KOTTAYAM'},
  {id:'8', name:'PATHANAMTHITTA'},
  {id:'9', name:'ALAPPUZHA'},
  {id:'10', name:'KOLLAM'},
  {id:'11', name:'THIRUVANANTHAPURAM'},
  
   
  
];

temp2:string;
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
selectedstudent:string="";
selectedcenterr: string = "";
selectedcourse: string = "";
selectedappNo :string = "";
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
check : string;
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
  this.ddcreateForm();

  let id = this.route.snapshot.paramMap.get('ddlastId');
  console.log('this is id ********************************');
  
  console.log(id);
  // console.log()


  let itemReff = db.object('ddEntry');
  itemReff.snapshotChanges().subscribe(action => {
    this.ddLists = [];
    var quatationsList = action.payload.val();
    let quotationobj = Common.snapshotToArray(action.payload);
    quotationobj.forEach(element => {
      let ddListItem = new ddList();
      let qobj: ddEntry = JSON.parse(element);
      // console.log("****" + element);
      if (qobj.ddlastId != undefined) {
        qobj.ddlastId = qobj.ddlastId.replace("/", "");
      }

      ddListItem.ddenter = qobj;

      let custList = this.ets.centerList.filter(s => s.Id == (qobj.centerId));
      console.log('2222222222222222222222222222',custList)
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
    // console.log('testtttttttt', this.ets.centerList)
    // var result =this.ets.centerList.map(x =>x.CenterName)
    // console.log('cnet',result)
  },
    error => console.log(error),
    () => console.log('Get all complete'));

  if (id != undefined) {
    // console.log('12345678901234567892345678234567856789', id)
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


  //dates of ddentry
  let todayDate = (new Date(Date.now()));
  let dddate = new Date();
  this.newddEntry.ddDate = this.formatDate(dddate);
  this.newddEntry.dDate = this.formatDate(todayDate);


}


//EDIT




ngOnInit() {

  // console.log('***********************',ddList)

  console.log('cokieeeeeeeee name',this.ets.cookiename)
  this.newddentry.enteredBy = this.ets.cookiename;
  
  if (this.ets.cookievalue == "1" || this.ets.cookievalue == "3" || this.ets.cookievalue == "2") {
    // this.router.navigate(['/dd-entry'])
  }
  else {
    this.router.navigate(['/error']);
  }

   console.log('cokieeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee name',this.ets.cookiename)
  this.check = this.ets.cookiename;
  this.newddEntry.enteredBy = this.check;
  console.log('cokieeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee name check',this.newddEntry.enteredBy)
   
  
}

//date format
formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('-');
}

register(key, dlastid: ddLastid ) {
console.log('appno**************************',this.newddEntry.appNo);
console.log(this.newddEntry.dDate);
console.log(this.selectedcenter);

   this.newddEntry.entryPros=false;



  if (this.isEditMode) {

    var ddreferno = this.newddEntry.ddNumber;
    var ddreferdate = this.newddEntry.ddDate;
    var ddreferbank = this.newddEntry.bank;

    for (let i = 0; i < this.ddtempentries.length; i++) {
      //variable for check reference
      var temp = this.ddtempentries[i];
      console.log('tttttttttttttttttttttt', temp)

    }
    if (temp != null) {
      if (temp.ddNumber == ddreferno && temp.ddDate == ddreferdate && temp.bank == ddreferbank) {
        console.log('******************************************************  Edit mode')
        var updates = {};
        this.newddEntry.centerId = this.selectedcenter;
        this.newddEntry.courseName = this.selectedcourse;
        
        if (confirm('Are you sure to update details')) {
          updates['/ddEntry/' + this.newddEntry.ddlastId] = JSON.stringify(this.newddEntry);
          try {
            let up = this.db.database.ref().update(updates);

          }
          catch (ex) {
            alert("Error in Updating details");
          }
          this.newddentryTemp.bank = this.newddentry.bank;
          this.newddentryTemp.ddDate = this.newddentry.ddDate;
          this.newddentryTemp.ddNumber = this.newddentry.ddNumber;

          updates['/ddentryTemp/' + this.newddEntry.ddlastId] = JSON.stringify(this.newddentryTemp);
          try {
            let up = this.db.database.ref().update(updates);

          }
          catch (ex) {
            alert("Error in Updating Quotation");
          }
          this.router.navigate(['/dd-verification']);

        }
        else {
          this.router.navigate(['/dd-verification']);

        }


      }

      else {
        var updates = {};
        this.newddEntry.centerId = this.selectedcenter;
        this.newddEntry.courseName = this.selectedcourse;
        this.newddEntry.studentName = this.selectedstudent;

        updates['/ddEntry/' + this.newddEntry.ddlastId] = JSON.stringify(this.newddEntry);
        try {
          if (confirm('Are you sure to update details')) {
            let up = this.db.database.ref().update(updates);
            this.router.navigate(['/dd-verification']);

          }
          else {
            this.router.navigate(['/dd-verification']);
          }

        }
        catch (ex) {
          alert("Error in Updating Quotation");
        }

      }

    }
  }



  else {

    console.log('******************************************* Not Edit Mode')
    var ddreferno = this.newddEntry.ddNumber;
    var ddreferdate = this.newddEntry.ddDate;
    var ddreferbank = this.newddEntry.bank;
    this.newddEntry.secondphase = true;
    for (let i = 0; i < this.ddtempentries.length; i++) {
      //variable for check reference
      var temp = this.ddtempentries[i];
      // console.log('tttttttttttttttttttttt', temp)

    }
    if (temp != null) {
      // console.log('888888888888888888888888888888888888888 ')
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
        this.newddEntry.courseName = this.selectedcourse;
        this.newddEntry.studentName = this.selectedstudent;

        // let uniqueId = "/DD" + Common.newGuid();
        // this.newddEntry.dduId = uniqueId;
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
      this.newddEntry.courseName = this.selectedcourse;
      

      // let uniqueId = "/DD" + Common.newGuid();
      // this.newddEntry.dduId = uniqueId;
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


}

//validation codes 

ddentryForm = new FormGroup({

  // currentDate: new FormControl(),
  centerName: new FormControl(),
  courseName: new FormControl(),
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
      courseName: [null, Validators.required],

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
get courseName() { return this.ddentryForm.get('courseName'); }

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
      courseName: null,
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

district(district){
  console.log('district**********************',district);
  // console.log(district);
  // console.log('*************');
  this.temp2=district;
  console.log(this.temp2);
  let that = this;
  this.ets.GetCenterbyDist(this.temp2).subscribe(data => {
    that.centers = data;
    console.log(this.centers)

  },
    error => console.log(error),
    () => console.log('courses'));
  // // console.log(this.split1);
  // return this.split1;

  

}


callType(value,key) {
  this.selectedcenterr = value;
  this.split1 = this.selectedcenterr.split(" ")[1];
  console.log(this.split1)

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
      console.log(this.vtemp);


    }

    // console.log('value',this.selectedcenterr);

  }

  this.selectedData = this.ddLists.filter(s => s.ddenter.centerId== key);
    
  console.log('........filter', this.selectedData);
  





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
loadApp(selectedstudent){
  this.newselectedData = this.selectedData.filter(s => s.ddenter.studentName== selectedstudent);
    
  console.log('........filter', this.newselectedData);
  
  // console.log('8888888888888888888888',selectedstudent)




}
getResult(event) {

  console.log('eventttttttttttttttttttt', event)
  if (event == "Prospectus") {

    this.router.navigate(['/prospectus']);

  }
  else {
    console.log('error')
  }
}

}


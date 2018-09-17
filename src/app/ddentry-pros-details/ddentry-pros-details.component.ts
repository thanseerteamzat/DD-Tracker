import { Component, OnInit } from '@angular/core';
import { Common } from '../models/common';
import { ddLastid } from '../models/ddLastid';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { EtsService } from '../services/ets.service';
import { Center } from '../models/Center';
import { Course } from '../models/Course';


import { ddList, ddEntry } from '../models/ddEntry';
import { ddentryTemp } from '../models/ddentryTemp';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ddentry-pros-details',
  templateUrl: './ddentry-pros-details.component.html',
  styleUrls: ['./ddentry-pros-details.component.css']
})
export class DdentryProsDetailsComponent implements OnInit {
  isEditable: Boolean = false;
  isEditMode: boolean = false;
  qIdEditMode: string = undefined;

  ddentries: ddEntry[] = [];
  newddentry: ddEntry = new ddEntry();
  centerList : Center []=[];
  selectedcenter: Center = new Center();
  centers:Center[];
  courses:Course[];
  selectedcenterr:string = "";
  
  
  vtemp:string;
  split1:string;
  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private http: HttpClient,
    private config: ConfigService,
    private ets: EtsService,
    private route: ActivatedRoute,
    private fb : FormBuilder
    
  ) {
    this.ddcreateForm();
    let id = this.route.snapshot.paramMap.get('ddlastId');
    console.log('**********************************',id)
    // console.log(id);
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

    let centerResponse = this.ets.centerList;
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@',centerResponse)
    
    //  Iterate throw all keys.
    for (let cent of centerResponse) {

      this.centerList.push(cent);
      

    }

   

if(id != undefined){

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
      // console.log('111111111111111111***********************',this.newddentry.ddlastId)
      
      // console.log("****" + element);
      if (obj.ddlastId != undefined && (obj.ddlastId==id)) {
        obj.ddlastId = obj.ddlastId.replace("/", "");
        this.newddentry = obj;
        // console.log('000000000000000',this.newddentry)
        // console.log(this.newddentry.centerId);
        // console.log(this.newddentry.courseName);
        console.log('````````````````````````````````````````````',this.newddentry.ddlastId)

        
        let center = this.centerList.filter(s => s.Id==(obj.centerId));
        // console.log('000000000000000',center)
        if (center.length > 0) {
          this.selectedcenter = center[0];
        }
      }
    })
  })

  


}

  }

  ngOnInit() {

  
    // console.log('***************************************************111111',this.newddentry.ddlastId);
    
  }

  ddentryForm = new FormGroup({

    // currentDate: new FormControl(),
    centerName: new FormControl(),
    courseName:new FormControl(),
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
        courseName:null,
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
  callType(value){
    console.log(value);
    this.selectedcenterr=value;
    this.split1=this.selectedcenterr.split(" ")[1];
    // console.log(this.split1)
    
    // this.split1 = value.substring( 0, value.indexOf(":"));
  //  console.log(this.split1)
    // this.split1=this.selectedcenterr.split(":")[0];
    for (let i = 0; i < this.ets.centerList.length; i++) {
      //variable for check reference

      var temp = this.ets.centerList[i];
      // console.log('*****',temp)
      if(temp.Id==this.split1){
       this.vtemp=temp.CenterName;
       
        // this.selectedcenterr=value;
        // console.log(this.vtemp);
   
        
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


verify(key, ddentry: ddEntry) {

  
  console.log('888888888888888888888888888',key)
  this.db.database.ref(`ddEntry/${key}`).once("value", snapshot => {

    let sid = snapshot.key;
    if (snapshot.exists()) {


      if (confirm('Are you sure to verify this dd entry')) {

        this.newddentry.isVerified=true;
        ddentry.isVerified = true;

        var updates = {};
        updates['/ddEntry/' + sid] = JSON.stringify(ddentry);
        try {
          let up = this.db.database.ref().update(updates);
          this.router.navigate(['/dd-verification']);
        }
        catch (ex) {
          alert("Error in verifying dd");
        }
      }
      console.log('ddddd', ddentry)

    }
  });
}


cancelDd(key, ddentry: ddEntry) {

  this.db.database.ref(`ddEntry/${key}`).once("value", snapshot => {

    let sid = snapshot.key;
    if (snapshot.exists()) {


      if (confirm('Are you sure to want to cancel this dd entry')) {

        this.newddentry.isddCanceled=true;
        ddentry.isddCanceled = true;

        var updates = {};
        updates['/ddEntry/' + sid] = JSON.stringify(ddentry);
        try {
          let up = this.db.database.ref().update(updates);
          this.router.navigate(['/dd-verification']);
        }
        catch (ex) {
          alert("Error in cancelling DD");
        }
      }

    }
  });
}
}
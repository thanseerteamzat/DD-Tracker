import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../services/config.service';
import { EtsService } from '../../services/ets.service';
import { FormBuilder, FormGroup, FormControl ,Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Center } from '../../models/Center';
import { Common } from '../../models/common';
import { InwardId } from '../../models/inwardId';
import { InvoiceEntry, invoiceentryList } from '../../models/invoiceentry';

@Component({
  selector: 'app-invoice-entry',
  templateUrl: './invoice-entry.component.html',
  styleUrls: ['./invoice-entry.component.css']
})
export class InvoiceEntryComponent implements OnInit {
  ddLists: invoiceentryList[] = [];
  isEditMode: boolean = false;
  ddentries: InvoiceEntry[] = [];
  newddentry: InvoiceEntry = new InvoiceEntry();
  centerList: Center[] = [];
 
  count;
  format;
  // centerList: Center[] = [];
  tempvalue: string;
  remarks;
  invoicenumber;
  month;
  enteredBy;
  selectedcenter;
  check;
  invoiceEntry:InvoiceEntry = new InvoiceEntry();
  
  fromLastId;
  todaydate = new Date;
  todaydatee= new Date;
  selecteddate;
  selecteddatee;
  centers:Center[];
  inwardLastids: InwardId[] = [];
  newinwardLastId: InwardId = new InwardId();

  


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

  inwardItem ="Invoice";
  months = [
    { id: '1', name: 'JAN' },
    { id: '2', name: 'FEB' },
    { id: '3', name: 'MAR' },
    { id: '4', name: 'APR' },
    { id: '5', name: 'MAY' },
    { id: '6', name: 'JUN' },
    { id: '7', name: 'JUL' },
    { id: '8', name: 'AUG' },
    { id: '9', name: 'SEP' },
    { id: '10', name: 'OCT' },
    { id: '11', name: 'NOV' },
    { id: '12', name: 'DEC' },



  ];

  constructor( private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private router: Router,
    private http: HttpClient,
    private config: ConfigService,
    private ets: EtsService,
    private fb: FormBuilder,
    private cookieservice: CookieService) {


      let id = this.route.snapshot.paramMap.get('invoiceEntryId');

      if(id != undefined)
      {
        this.isEditMode = true;

      }
    this.ddcreateForm();
      



    let centerResponse = this.ets.centerList;
    //  Iterate throw all keys.
    for (let cent of centerResponse) {

      this.centerList.push(cent);


    }



    let itemReff = db.object('invoiceEntry');
    itemReff.snapshotChanges().subscribe(action => {
      this.ddLists = [];
      var quatationsList = action.payload.val();
      let quotationobj = Common.snapshotToArray(action.payload);
      quotationobj.forEach(element => {
        let ddListItem = new invoiceentryList();
        let qobj: InvoiceEntry = JSON.parse(element);
        // console.log("****" + element);
        if (qobj.invoiceEntryId != undefined) {
          qobj.invoiceEntryId = qobj.invoiceEntryId.replace("/", "");
        }

        ddListItem.ddenter = qobj;

        // let custList = this.ets.centerList.filter(s => s.Id == (qobj.centerId));
        // // console.log('2222222222222222222222222222',custList)
        // if (custList.length > 0) {
        //   ddListItem.center = custList[0];
        // }

        this.ddLists.push(ddListItem);

      });

    });

    if (id != undefined) {

    let dReference = db.object('invoiceEntry');
    dReference.snapshotChanges().subscribe(action => {
      console.log(action.type);
      console.log(action.key);
      var ddentryList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      this.ddentries = [];
      obj.forEach(element => {
        let obj: InvoiceEntry = JSON.parse(element);
        let ddListItem = new InvoiceEntry();
        if (obj.invoiceEntryId != undefined && (obj.invoiceEntryId == id)) {
          obj.invoiceEntryId = obj.invoiceEntryId.replace("/", "");
          this.newddentry = obj;
          console.log('***********************',this.newddentry.invoiceEntryId)
          // let center = this.centerList.filter(s => s.Id == (obj.centerId));
          // if (center.length > 0) {
          //   this.selectedcenter = center[0];
          // }
        }
      })
    })

  
  }

    
      let that = this;
    this.ets.GetAllCenters().subscribe(data => {
      that.centers = data;
      console.log(that.centers)
      this.ets.centerList = this.centers;

    },
      error => console.log(error),
      () => console.log('Get all complete'));




      let itemRef = db.object('inwardId');
      itemRef.snapshotChanges().subscribe(action => {
        var quatationsList = action.payload.val();
        let obj = Common.snapshotToArray(action.payload);
        this.inwardLastids = [];
        obj.forEach(element => {
          let obj: InwardId = JSON.parse(element);
          this.newinwardLastId = obj;
          this.inwardLastids.push(obj as InwardId);
          // console.log('aaaaaaaaaaaaaaaaaaaa', this.ddLastids)
          this.count = obj.lastId;
          this.fromLastId = obj.Id;
  
        });
      });
  



     }

  ngOnInit() {

    this.newddentry.enteredBy = this.ets.cookiename;

    if (this.ets.cookievalue != null && (this.ets.cookievalue.indexOf('x1') !==-1 ) || (this.ets.cookievalue == "All"))  {
      console.log('inside if condition *********************')
      // this.router.navigate(['/dd-entry'])
    }
    else {
      this.router.navigate(['/error']);
    }
    // if (this.ets.cookievalue != null && (this.ets.cookievalue.indexOf('x1') !==-1 ) || (this.ets.cookievalue == "All"))  {
    //   console.log('inside if condition *********************')
    //   // this.router.navigate(['/dd-entry'])
    // }
    // else {
    //   this.router.navigate(['/error']);
    // }
  
    // if (this.ets.cookievalue == "1" || this.ets.cookievalue == "2" || this.ets.cookievalue == "3") {
    //   // this.router.navigate(['/dd-entry'])
    // }
    // else {
    //   this.router.navigate(['/error']);
    // }

    this.check = this.ets.cookiename;
    this.enteredBy = this.check;


  }
  


  district(district) {
    // console.log('district******=****************', district);
    // console.log(district);
    // console.log('*************');
    this.tempvalue = district;
    // console.log(this.temp2);
    let that = this;
    this.ets.GetCenterbyDist(this.tempvalue).subscribe(data => {
      that.centers = data;
      // console.log(this.centers)

    },
      error => console.log(error),
      () => console.log('courses'));
    // // console.log(this.split1);
    // return this.split1;



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
  register(key, dlastid: InwardId){

  if(this.isEditMode){
    var updates = {};

    this.invoiceEntry.remarks=this.remarks;
    this.invoiceEntry.centerName=this.newddentry.centerName;
    this.selecteddate=this.todaydate
    this.invoiceEntry.date=this.formatDate(this.selecteddate);
    this.selecteddatee=this.todaydatee;
    this.invoiceEntry.invoiceDate=this.formatDate(this.selecteddatee);
    console.log('*********************',this.newddentry.invoiceNumber)
    this.invoiceEntry.invoiceNumber=this.newddentry.invoiceNumber;
    this.invoiceEntry.inwardItem='Invoice';
    // this.invoiceEntry.dbaNo=this.newddentry.dbaNo;
    this.invoiceEntry.taxableAmount=this.newddentry.taxableAmount;
    this.invoiceEntry.month=this.newddentry.month;
    this.invoiceEntry.enteredBy=this.newddentry.enteredBy;
    this.invoiceEntry.remarks=this.newddentry.remarks;
    if (confirm('Are you sure to update details')) {
      updates['/invoiceEntry/' + this.newddentry.invoiceEntryId] = JSON.stringify(this.newddentry);
      try {
        let up = this.db.database.ref().update(updates);
        alert('updated succesfully')
      }
      catch (ex) {
        alert("Error in Updating details");
      }
    


    

    // console.log('is Edit mode')
  }}
  else{
    console.log('not edit mode')
    var counter = parseInt(this.count) + 1;
    //updating lastid
    var updates = {};
    dlastid.lastId = counter;
    updates['/inwardId/' + key] = JSON.stringify(dlastid);
    let up = this.db.database.ref().update(updates);
    this.invoiceEntry.invoiceEntryId = counter.toString();
  
    this.invoiceEntry.remarks=this.remarks;
    this.invoiceEntry.centerName=this.newddentry.centerName;
    this.selecteddate=this.todaydate
    this.invoiceEntry.date=this.formatDate(this.selecteddate);
    this.selecteddatee=this.todaydatee;
    this.invoiceEntry.invoiceDate=this.formatDate(this.selecteddatee);
    console.log('*********************',this.newddentry.invoiceNumber)
    this.invoiceEntry.invoiceNumber=this.newddentry.invoiceNumber;
    this.invoiceEntry.inwardItem='Invoice';
    // this.invoiceEntry.dbaAmount=this.newddentry.dbaAmount;
    this.invoiceEntry.taxableAmount=this.newddentry.taxableAmount;
    this.invoiceEntry.month=this.newddentry.month;
    this.invoiceEntry.enteredBy=this.newddentry.enteredBy;
    this.invoiceEntry.remarks=this.newddentry.remarks;
    // var str=this.erpdespNo;
    // str=(str.match(/.{1,4}/g)); 
    // var abc=str[1];
    // console.log(abc,'1111111111')
    // console.log(str,'*************************')
    let uniqueId = "/Q" + Common.newGuid();
    console.log("****" + uniqueId);
    // this.erpdespatch.erpdespId = uniqueId;
  
    let InvoiceEntryJson = JSON.stringify(this.invoiceEntry);
    console.log(InvoiceEntryJson);
    try {
      this.db.database.ref('invoiceEntry').child(counter.toString()).set(InvoiceEntryJson);
      alert("Added Successfully Please Note Inward Invoice Entry Serial No :"+this.invoiceEntry.invoiceEntryId);
    this.resetForm();
      
      // this.resetForm();
      // this.tempdata=[];
      // this.tempdata=this.erpdespatchList;
      // this.router.navigateByUrl('/dd-entry', { skipLocationChange: true });
  
      this.router.navigate(['/invoice-entry']);
      // this.router.navigate(['/erp-despatch-entry']);
    }
    catch (ex) {
      alert("Error in adding Quotation ");
    }
  }
  }
  
  ddentryForm = new FormGroup({

    centerName: new FormControl(),
    invoiceno: new FormControl(),
    monthh: new FormControl(),
    // remarks: new FormControl(),
  
  
  })
  ddcreateForm() {
    this.ddentryForm = this.fb.group(
      {
        // currentDate: [null, Validators.required],
        centerName: [null, Validators.required],
        // date: [null, Validators.required],
        invoiceno: [null, Validators.required],
        // erpdate: [null, Validators.required],
        monthh: [null,Validators.required],
        // remarks: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
        // remarks: [null, Validators.required],
  
  
  
  })}
  get centerName() { return this.ddentryForm.get('centerName'); }
get invoiceno() { return this.ddentryForm.get('invoiceno'); }
get monthh() { return this.ddentryForm.get('monthh'); }
resetForm() {
  this.ddentryForm.reset(
    {
      // currentDate: null,
      centerName: null,
      // date:null,
      invoiceno:null,
    //  erpdate:null,
   monthh:null,
  //  ddamount:null
    }
  )
}
    
}

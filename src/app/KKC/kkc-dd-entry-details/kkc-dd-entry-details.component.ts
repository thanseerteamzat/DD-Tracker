import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../services/config.service';
import { AcadamicService } from '../../services/acadamic.service';
import { EtsService } from '../../services/ets.service';
import { FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { KKCentryData, kkcddEntry } from '../../models/KKC/kkcddentry';

@Component({
  selector: 'app-kkc-dd-entry-details',
  templateUrl: './kkc-dd-entry-details.component.html',
  styleUrls: ['./kkc-dd-entry-details.component.css']
})
export class KkcDdEntryDetailsComponent implements OnInit {
  kkcddEntries:KKCentryData;
  ddList = new Array<kkcddEntry>();
  // ddList: kkcddEntry[] = [];
  newddentry: kkcddEntry = new kkcddEntry();
  entries;
  tempentries;
  ddListLength:string;
  isEditable;
  minDate;
  maxDate
  minDateDD;
  maxDateDD
  constructor(private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private router: Router,
    private http: HttpClient,
    private config: ConfigService,
    private ets: EtsService,
    private academic: AcadamicService,
    private fb: FormBuilder,
    private cookieservice: CookieService
) {
    let id = this.route.snapshot.paramMap.get('kkcId');
    console.log('id',id);
    let that = this;
    that.academic.GetKkcDdEntry().subscribe(data => {
      that.entries =data; 
     
      that.kkcddEntries = data;
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
          this.newddentry.centerName = tempobj.centerName;
          this.newddentry.courseName = tempobj.courseName;
          this.newddentry.date = tempobj.date;
          this.newddentry.ddAmount = tempobj.ddAmount;
          this.newddentry.ddDate = tempobj.ddDate;
          this.newddentry.ddNumber = tempobj.ddNumber;
          this.newddentry.enteredBy = tempobj.enteredBy;
          this.newddentry.studentName = tempobj.studentName;
          this.newddentry.studentRollNumber = tempobj.studentRollNumber
        
          console.log('********************** inside if condition')
        }
      }

      }

      let entry = new kkcddEntry();

      for (let i = 0; i <= data.Data.length; i++) {
        if(data.Data[i] != null) {    
        entry.applicationNumber = data.Data[i].applicationNumber;
        entry.centerName=data.Data[i].centerName;
        entry.studentRollNumber=data.Data[i].studentRollNumber
        entry.bank = data.Data[i].bank;
        entry.courseName = data.Data[i].courseName;
        entry.studentName=data.Data[i].studentName;
        entry.date = data.Data[i].date;
        entry.ddAmount = data.Data[i].ddAmount;
        entry.ddDate = data.Data[i].ddDate;
        entry.ddNumber = data.Data[i].ddNumber;
        entry.enteredBy = data.Data[i].enteredBy;
        entry.feesItem = data.Data[i].feesItem;
        entry.kkcId = data.Data[i].kkcId;
        entry.KkcDdId = data.Data[i].KkcDdId;

                
        this.ddList.push(entry);
        

      }
    
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
    
  
verify(key,entry:kkcddEntry){

  console.log(key);
  console.log(entry);
  let that = this;
  if (confirm('Are you sure to verify this dd entry')) {
    entry.isVerified = true ;
  
  that.academic.updateKKCEntry(entry);
  alert('Updated Successfully')
  }
    



}
}

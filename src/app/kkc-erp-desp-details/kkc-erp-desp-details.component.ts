import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { EtsService } from '../services/ets.service';
import { ConfigService } from '../services/config.service';
import { HttpClient } from 'selenium-webdriver/http';
import { kkcerpDespatch, erpData } from '../models/kkcErpdespatch';
import { AcadamicService } from '../services/acadamic.service';

@Component({
  selector: 'app-kkc-erp-desp-details',
  templateUrl: './kkc-erp-desp-details.component.html',
  styleUrls: ['./kkc-erp-desp-details.component.css']
})
export class KkcErpDespDetailsComponent implements OnInit {

  erpEntries : erpData;
  erpList = new Array<kkcerpDespatch>();
  newerpentry: kkcerpDespatch = new kkcerpDespatch();
  isEditable;
  isEditMode;
  id;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private config: ConfigService,
    private academic: AcadamicService,

    private fb: FormBuilder,
    private cookieservice: CookieService
  ) 
  {
     this.id = this.route.snapshot.paramMap.get('erpId');
    this.getErpEntry();
  }

  ngOnInit() {
  }

  getErpEntry(){

    let that = this;
    that.academic.GeterpEntry().subscribe(data => {
      that.erpEntries = data;
      console.log("hi************")
      console.log(that.erpEntries, 'ERP Entries');
      this.erpList = new Array<kkcerpDespatch>();
      // this.serialNo = data.Data.length + 1;
      for (let i = 0; i <= data.Data.length; i++) {
      
        let erpEntry = new kkcerpDespatch();
        if(data.Data[i] != null){
        erpEntry.ID = data.Data[i].ID;
        erpEntry.centerName = data.Data[i].centerName;
        erpEntry.date =  data.Data[i].date;
        erpEntry.erpAmount =  data.Data[i].erpAmount;
        erpEntry.erpdate = data.Data[i].erpdate;
        erpEntry.erpdespNo = data.Data[i].erpdespNo;
        erpEntry.noofDd = data.Data[i].noofDd;
        erpEntry.remarks = data.Data[i].remarks;
        erpEntry.unique = data.Data[i].unique;
        this.erpList.push(erpEntry);
        }
      }
      console.log('erpEntry',this.erpList)
      
      for(let i=0 ; i <= this.erpList.length ; i++){
        let erpObj = this.erpList[i];
        if(erpObj != null && erpObj.unique == this.id){
           this.newerpentry.unique = erpObj.unique;
           this.newerpentry.centerName = erpObj.centerName;
           this.newerpentry.date = erpObj.date;
           this.newerpentry.erpAmount = erpObj.erpAmount;
           this.newerpentry.erpdate = erpObj.erpdate;
           this.newerpentry.erpdespNo = erpObj.erpdespNo;
           this.newerpentry.ID = erpObj.ID;
           this.newerpentry.noofDd = erpObj.noofDd;
           this.newerpentry.remarks = erpObj.remarks; 
        }
      }
      console.log(this.newerpentry)

      
      },



      err => {
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      })
  
  }

}

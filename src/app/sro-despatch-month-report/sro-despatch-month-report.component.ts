import { Component, OnInit } from '@angular/core';
import { AcadamicService } from '../services/acadamic.service';
import { reportData, kkcErpReportTable } from '../models/kkerpdespatchReport';
import { EtsService } from '../services/ets.service';
import { Center, CenterData } from '../models/Center';

@Component({
  selector: 'app-sro-despatch-month-report',
  templateUrl: './sro-despatch-month-report.component.html',
  styleUrls: ['./sro-despatch-month-report.component.css']
})
export class SroDespatchMonthReportComponent implements OnInit {
  centerList = new Array<Center>();
  centers : CenterData;
  isSroLogin:boolean;
  userType;
  reportEntries : reportData;
  reportList = new Array<kkcErpReportTable>()
  selectedcenter;
  constructor(private academic :AcadamicService,
 private ets:EtsService) { 
    this.getReportTable();
    this.academic.GetAllCenters().subscribe(resdata => {
      this.centers = resdata;
      console.log(resdata);
      this.centerList = new Array<Center>();
      for (let i = 0; i <= resdata.Data.length; i++) {
        if(resdata.Data != null){
        let c = new Center();
        c.Id = resdata.Data[i].Id;
        c.CenterCode = resdata.Data[i].CenterCode;
        c.CenterName = resdata.Data[i].CenterName;
        c.DistrictId = resdata.Data[i].DistrictId;
        this.centerList.push(c);
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
    this.selectedcenter = this.ets.cookiecenter;
    this.userType= this.ets.cookieuser;
    console.log(this.userType);
    if((this.userType == "SRO" || this.userType== "KKC")){
      console.log('sro Login');      
      this.isSroLogin = true; 
    }
    else {
    console.log('It is not sro')
    }
    
  }
  getReportTable(){
    let that = this;
    that.academic.GetKkcReportTable().subscribe(data => {
      that.reportEntries = data;
      console.log("hi************")
      // console.log(that.erpEntries, 'ERP Entries');
      console.log(that.reportEntries)
      this.reportList = new Array<kkcErpReportTable>();
      for (let i = 0; i <= data.Data.length; i++) {
  
        let reportEntry = new kkcErpReportTable();
        if(data.Data[i] != null){
         reportEntry = data.Data[i];      
        this.reportList.push(reportEntry);
        }
      }
      console.log('reportEntry',this.reportList)
      // this.geteditEntry();    
      
      },



      err => {
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      })
   

  }
}

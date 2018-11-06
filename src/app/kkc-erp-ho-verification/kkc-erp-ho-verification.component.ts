import { Component, OnInit } from '@angular/core';
import { kkcerpDespatch, erpData } from '../models/kkcErpdespatch';
import { AcadamicService } from '../services/acadamic.service';
import { Center, CenterData } from '../models/Center';
import { EtsService } from '../services/ets.service';

@Component({
  selector: 'app-kkc-erp-ho-verification',
  templateUrl: './kkc-erp-ho-verification.component.html',
  styleUrls: ['./kkc-erp-ho-verification.component.css']
})
export class KkcErpHoVerificationComponent implements OnInit {
  erpList = new Array<kkcerpDespatch>();
  centerList = new Array<Center>();
  centers:CenterData;  
  erpEntries : erpData;
  selectedData;
  selectedmonth;
  isEditMode;
  selectmonth;
  selectedcenter;
  enteredBy;
  months = [
    { id: '01', name: 'JAN' },
    { id: '02', name: 'FEB' },
    { id: '03', name: 'MARCH' },
    { id: '04', name: 'APRIL' },
    { id: '05', name: 'MAY' },
    { id: '06', name: 'JUNE' },
    { id: '07', name: 'JULY' },
    { id: '08', name: 'AUG' },
    { id: '09', name: 'SEP' },
    { id: '10', name: 'OCT' },
    { id: '11', name: 'NOVEMBER' },
    { id: '12', name: 'DECEMBER' },
  ];


  constructor(private academic: AcadamicService,
    private ets : EtsService) { 
    this.getErpEntry();
    this.getAllKkcCenters();
    this.selectedData=this.erpList;

  }

  ngOnInit() {
    this.enteredBy = this.ets.cookiename;
    // console.log()
    
  }
  getErpEntry(){    
    let that = this;
    that.academic.GeterpEntry().subscribe(data => {
      that.erpEntries = data;
      this.erpList = new Array<kkcerpDespatch>();
      for (let i = 0; i <= data.Data.length; i++) {
        let erpEntry = new kkcerpDespatch();
        if(data.Data[i] != null){
        erpEntry[i]=data.Data[i];
        this.erpList.push(erpEntry[i]);
        }
      }
      console.log('erpEntry',this.erpList)
      // this.geteditEntry();    
      },  
      err => {
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      })
  }
verify(key, erpEntry:kkcerpDespatch){

console.log(key);
console.log(erpEntry);
erpEntry.ishoVerified = true;
erpEntry.hoVerifiedBy = this.enteredBy;
console.log(erpEntry.hoVerifiedBy)

if (confirm('Are you sure to update details')) {
  try{
  this.academic.updateKkcErpEntry(erpEntry);
  alert('Verified successfully');

  }
  catch(ex){
    alert('error while updating')
  }
  }
}  

getAllKkcCenters(){
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
filterwithCenter(value){

  this.selectedcenter = value;
  this.selectedData = null;

  if (this.selectmonth == null) {
    this.selectedData = this.erpList.filter(s => s.centerName == this.selectedcenter)

  }

  else {
    this.selectedData = this.erpList.filter(s => this.getMonthFromDate(s.erpdate) == this.selectmonth && s.centerName == this.selectedcenter)
  }


}



filterwithMonth(key) {

  this.selectmonth = key;
  console.log('dd list data***', this.selectmonth)

  if (this.selectedcenter == null) {
    this.selectedData = this.erpList.filter(

      s => this.getMonthFromDate(s.erpdate) == this.selectmonth
    )

  }

  else {
    this.selectedData = this.erpList.filter(
      s => (this.getMonthFromDate(s.erpdate)) == this.selectmonth && s.centerName == this.selectedcenter 
    )
    console.log('success with month***')

  }



}

getMonthFromDate(dateData) {
  if (dateData != null) {
    var month = dateData.toString().slice(3, -5)
    console.log('month**',month)
    return month;
  }}



}

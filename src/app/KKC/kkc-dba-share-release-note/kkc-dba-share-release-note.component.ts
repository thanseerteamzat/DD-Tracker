import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { EtsService } from 'src/app/services/ets.service';
import { FormBuilder } from '@angular/forms';
import { AcadamicService } from 'src/app/services/acadamic.service';
import { Center, CenterData } from 'src/app/models/Center';
import { kkcerpDespatch, erpData } from 'src/app/models/kkcErpdespatch';

@Component({
  selector: 'app-kkc-dba-share-release-note',
  templateUrl: './kkc-dba-share-release-note.component.html',
  styleUrls: ['./kkc-dba-share-release-note.component.css']
})
export class KkcDbaShareReleaseNoteComponent implements OnInit {
  centerList: Center[] = [];
  centers: CenterData;
  erpList = new Array<kkcerpDespatch>();
  serialNo: number;
  erpEntries: erpData;

  constructor(
    private db: AngularFireDatabase,
    private ets: EtsService,
    private fb: FormBuilder,
    private academic: AcadamicService
  ) {
    this.getAllkkccenters();
    this.getErpEntry();
  }
  getAllkkccenters() {
    this.academic.GetAllCenters().subscribe(resdata => {
      this.centers = resdata;
      console.log(resdata);
      this.centerList = new Array<Center>();
      for (let i = 0; i <= resdata.Data.length; i++) {
        if (resdata.Data[i] != null) {
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

  getErpEntry() {

    let that = this;
    that.academic.GeterpEntry().subscribe(data => {
      that.erpEntries = data;
      console.log("hi************")
      console.log(that.erpEntries, 'ERP Entries');
      this.erpList = new Array<kkcerpDespatch>();
      this.serialNo = data.Data.length + 1;
      for (let i = 0; i <= data.Data.length; i++) {

        let erpEntry = new kkcerpDespatch();
        if (data.Data[i] != null) {
          erpEntry.ID = data.Data[i].ID;
          erpEntry.centerName = data.Data[i].centerName;
          erpEntry.date = data.Data[i].date;
          erpEntry.erpAmount = data.Data[i].erpAmount;
          erpEntry.erpdate = data.Data[i].erpdate;
          erpEntry.erpdespNo = data.Data[i].erpdespNo;
          erpEntry.noofDd = data.Data[i].noofDd;
          erpEntry.remarks = data.Data[i].remarks;
          erpEntry.unique = data.Data[i].unique;
          erpEntry.isdespatchEntered = data.Data[i].isdespatchEntered;
          erpEntry.enteredDate = data.Data[i].enteredDate;
          erpEntry.enteredTime = data.Data[i].enteredTime;
          erpEntry.ishoVerified = data.Data[i].ishoVerified;
          this.erpList.push(erpEntry);
        }
      }
      console.log('erpEntry', this.erpList)

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

}

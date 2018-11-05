import { CenterData } from './../models/Center';
import { CourseData } from './../models/Course';
import { Injectable } from '@angular/core';
// import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from "@angular/common/http";
import { ConfigService } from "src/app/services/config.service";
import { map } from 'rxjs/operators';
import { Center } from '../models/Center';
import { Course } from '../models/Course';
import { CookieService } from 'ngx-cookie-service';
import { dbaEntry, dbaList, dbaShareReleaseNote } from '../models/dbaEntry';
import { catchError, retry } from 'rxjs/operators';
import { despatchList } from '../models/despatch';
import { kkcddEntry, KKCentryData } from '../models/KKC/kkcddentry';
import { InvoiceCenterList2, InvoiceCenterList2Data, centerUpdate, centerInvNoChkListData } from '../models/invoice ';
import { kkcerpDespatch, erpData } from '../models/kkcErpdespatch';

@Injectable({
  providedIn: 'root'
})
export class AcadamicService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor(private http: HttpClient,
    private config: ConfigService, private cookieService: CookieService) {


  }
  public GetAllCenters(): Observable<CenterData> {
    const body = {
      "Table": "centers", "Where": {
        "CategoryId": "KKC"
      }
    };
    return this.http.post<CenterData>(this.config.pyUrl + 'GetRows', body)
  }

  public GetAllKCVTPCenters(): Observable<CenterData> {
    const body = {
      "Table": "centers", "Where": {
        "CategoryId": "KCVTP"
      }
    };
    return this.http.post<CenterData>(this.config.pyUrl + 'GetRows', body)
  }

  public GetAllCentersByDistrict(district): Observable<CenterData> {
    const body = {
      "Table": "centers", "Where": {
        "CategoryId": "KKC",
        "DistrictId": district,
      }
    };
    return this.http.post<CenterData>(this.config.pyUrl + 'GetRows', body)
  }



  public GetAllCourses(): Observable<CourseData> {
    console.log('AddddEntry in service**************')

    const body = { "Table": "course" };
    return this.http.post<CourseData>(this.config.pyUrl + 'GetRows', body)

  }

  public GetKkcDdEntry(): Observable<KKCentryData> {
    console.log('AddSubject in service**************')

    const body = { "Table": "kkcddEntry" };


    return this.http.post<KKCentryData>(this.config.pyUrl + 'GetRows', body)

  }
  public AddKkcDdEntry(ddEntry: kkcddEntry) {
    const Sub = {
      "kkcId": ddEntry.kkcId,
      "date": ddEntry.date,
      "feesItem": ddEntry.feesItem,
      "applicationNumber": ddEntry.applicationNumber,
      "centerName": ddEntry.centerName,
      "courseName": ddEntry.courseName,
      "studentName": ddEntry.studentName,
      "ddNumber": ddEntry.ddNumber,
      "bank": ddEntry.bank,
      "studentRollNumber": ddEntry.studentRollNumber,
      "ddAmount": ddEntry.ddAmount,
      "ddDate": ddEntry.ddDate,
      "enteredBy": ddEntry.enteredBy,
      "isVerified": ddEntry.isVerified,

    };
    const body = {
      "Table": "kkcddEntry",
      "Data": Sub,
      "UniqueId": "KkcDdId"
    };

    this.http.post(this.config.pyUrl + 'AddRow', body)
      .subscribe(data => { },
        err => {
          console.log('Error: ' + err.error);
          console.log('Name: ' + err.name);
          console.log('Message: ' + err.message);
          console.log('Status: ' + err.status);
        });
  }

  public GeterpEntry(): Observable<erpData> {
    console.log('AddSubject in service**************')

    const body = { "Table": "kkcErpEntry" };


    return this.http.post<erpData>(this.config.pyUrl + 'GetRows', body)

  }

 



  public AddKkcErpEntry(erpEntry: kkcerpDespatch) {
    const Sub = {
      "unique": erpEntry.unique,
      "date": erpEntry.date,
      "erpAmount": erpEntry.erpAmount,
      "erpdate": erpEntry.erpdate,
      "centerName": erpEntry.centerName,
      "erpdespNo": erpEntry.erpdespNo,
      "noofDd": erpEntry.noofDd,
      "remarks": erpEntry.remarks,
      "enteredDate":erpEntry.enteredDate,
      "enteredTime":erpEntry.enteredTime

    };
    const body = {
      "Table": "kkcErpEntry",
      "Data": Sub,
    };

    this.http.post(this.config.pyUrl + 'AddRow', body)
      .subscribe(data => { },
        err => {
          console.log('Error: ' + err.error);
          console.log('Name: ' + err.name);
          console.log('Message: ' + err.message);
          console.log('Status: ' + err.status);
        });
  }

















  public updateKKCEntry(ddEntry: kkcddEntry) {
    console.log('here', ddEntry);
    const Sub = {

      "date": ddEntry.date,
      "feesItem": ddEntry.feesItem,
      "applicationNumber": ddEntry.applicationNumber,
      "centerName": ddEntry.centerName,
      "courseName": ddEntry.courseName,
      "studentName": ddEntry.studentName,
      "ddNumber": ddEntry.ddNumber,
      "bank": ddEntry.bank,
      "studentRollNumber": ddEntry.studentRollNumber,
      "ddAmount": ddEntry.ddAmount,
      "ddDate": ddEntry.ddDate,
      "enteredBy": ddEntry.enteredBy,
      "isVerified": ddEntry.isVerified,
      "isddCancelled": ddEntry.isddCancelled
      

    };
    const body = {
      "Table": "kkcddEntry",
      "Where": { "kkcId": ddEntry.kkcId },
      "Data": Sub,
      "UniqueId": "KkcDdId"
    };

    this.http.post(this.config.pyUrl + 'UpdateRows', body)
      .subscribe(data => {
        console.log('data', data)
      },
        err => {
          console.log('Error: ' + err.error);
          console.log('Name: ' + err.name);
          console.log('Message: ' + err.message);
          console.log('Status: ' + err.status);
        });
  }


  public updateKkcErpEntry(erpEntry: kkcerpDespatch) {
    console.log('here', erpEntry);
    const Sub = {

      "centerName": erpEntry.centerName,
      "date": erpEntry.date,
      "erpAmount": erpEntry.erpAmount,
      "erpdate": erpEntry.erpdate,
      "erpdespNo": erpEntry.erpdespNo,
      // "ID": erpEntry.ID,
      "noofDd": erpEntry.noofDd,
      "remarks": erpEntry.remarks,
      "ishoVerified":erpEntry.ishoVerified,
      "hoVerifiedBy":erpEntry.hoVerifiedBy,
      // "unique": erpEntry.unique,
     
    };
    const body = {
      "Table": "kkcErpEntry",
      "Where": { "unique": erpEntry.unique },
      "Data": Sub,
      "UniqueId": "unique"
      
    };

    this.http.post(this.config.pyUrl + 'UpdateRows', body)
      .subscribe(data => {
        console.log('data', data)
      },
        err => {
          console.log('Error: ' + err.error);
          console.log('Name: ' + err.name);
          console.log('Message: ' + err.message);
          console.log('Status: ' + err.status);
        });
  }



  // public ExportDbaReport(dbaDetails: dbaShareReleaseNote) {
  public AddCenterInvoiceList2(invoiceEntry: InvoiceCenterList2) {
    // console.log('centerno data', invoiceEntry);
    const Sub = {
      "dbaNo": invoiceEntry.dbaNo,
      "InvoiceNo": invoiceEntry.InvoiceNo,
      "centerInvoiceNo": invoiceEntry.centerInvoiceNo,
      "centerName": invoiceEntry.centerName,
      "invoiceMonth": invoiceEntry.invoiceMonth,
      "dbaAmount": invoiceEntry.dbaAmount,
      "shareAmount": invoiceEntry.shareAmount,
      "taxableAmount": invoiceEntry.taxableAmount,
      "invoiceDate": invoiceEntry.invoiceDate,
      "invAmtPending": invoiceEntry.invAmtPending,
      "enteredBy": invoiceEntry.enteredBy,



    };
    const body = {
      "Table": "ddtKCVTPInvoiceCenterList2",
      "Data": Sub,
      "UniqueId": "Id"
    };

    this.http.post(this.config.pyUrl + 'AddRow', body)
      .subscribe(data => { },
        err => {
          console.log('Error: ' + err.error);
          console.log('Name: ' + err.name);
          console.log('Message: ' + err.message);
          console.log('Status: ' + err.status);
        });
  }


  public GetCenterInvoiceList2(): Observable<InvoiceCenterList2Data> {
    console.log('AddSubject in service**************')

    const body = { "Table": "ddtKCVTPInvoiceCenterList2" };


    return this.http.post<InvoiceCenterList2Data>(this.config.pyUrl + 'GetRows', body)

  }


  public updateLastInvoiceNo(center: Center) {
    // console.log('here', center);
    const Sub = {

      "lastInvoiceNo": center.lastInvoiceNo,
    };
    const body = {
      "Table": "centers",
      "Where": { "Id": center.Id },
      "Data": Sub,
      // "UniqueId": "Id"
    };

    this.http.post(this.config.pyUrl + 'UpdateRows', body)
      .subscribe(data => {
        // console.log('data', data)
      },
        err => {
          console.log('Error: ' + err.error);
          console.log('Name: ' + err.name);
          console.log('Message: ' + err.message);
          console.log('Status: ' + err.status);
        });
  }


  public ExportDbaReport(dbaDetails: Array<dbaShareReleaseNote>) {

    const body = {
      "Data": dbaDetails
    };

    this.http.post(this.config.pyUrl + 'ExportDBAReport', body)
      .subscribe(data => { console.log('data****', data) },
        err => {
          console.log('Error: ' + err.error);
          console.log('Name: ' + err.name);
          console.log('Message: ' + err.message);
          console.log('Status: ' + err.status);
        });
  }



}

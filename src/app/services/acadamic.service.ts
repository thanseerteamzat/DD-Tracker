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
import { InvoiceCenterList2, InvoiceCenterList2Data } from '../models/invoice ';

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

  public updateKKCEntry(ddEntry: kkcddEntry) {
    console.log('here',ddEntry);
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

    };
    const body = {
      "Table": "kkcddEntry",
      "Where": { "kkcId": ddEntry.kkcId },
      "Data": Sub,
      "UniqueId": "KkcDdId"
    };

    this.http.post(this.config.pyUrl + 'UpdateRows', body)
      .subscribe(data => { 
        console.log('data',data)
      },
        err => {
          console.log('Error: ' + err.error);
          console.log('Name: ' + err.name);
          console.log('Message: ' + err.message);
          console.log('Status: ' + err.status);
        });
  }




  // public ExportDbaReport(dbaDetails: dbaShareReleaseNote) {
  public AddCenterInvoiceList2(ddEntry: InvoiceCenterList2) {
    const Sub = {
      "dbaNo": ddEntry.dbaNo,
      "InvoiceNo": ddEntry.InvoiceNo,
      "centerInvoiceNo": ddEntry.centerInvoiceNo,
      "centerName": ddEntry.centerName,
      "invoiceMonth": ddEntry.invoiceMonth,
      "dbaAmount": ddEntry.dbaAmount,
      "shareAmount": ddEntry.shareAmount,
      "taxableAmount": ddEntry.taxableAmount,
      "invoiceDate": ddEntry.invoiceDate,
      "invAmtPending": ddEntry.invAmtPending,
      "enteredBy": ddEntry.enteredBy,



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


  public ExportDbaReport(dbaDetails: Array<dbaShareReleaseNote>) {
    // const Sub = {
    //   "despSerialNo": dbaDetails.despSerialNo,
    //   "centerName": dbaDetails.centerName,
    //   "batchNo": dbaDetails.batchNo,
    //   "depDate": dbaDetails.depDate,
    //   "feesItem": dbaDetails.feesItem,
    //   "total": dbaDetails.total,
    //   "tax": dbaDetails.tax,
    //   "fwt": dbaDetails.fwt,
    //   "amt": dbaDetails.amt,
    //   "rate": dbaDetails.rate,


    // };
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

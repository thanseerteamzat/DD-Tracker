import { Injectable } from '@angular/core';
// import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from "@angular/common/http";
import { ConfigService } from "src/app/services/config.service";
import { map } from 'rxjs/operators';
import { Center } from '../models/Center';
import { Course } from '../models/Course';
import { CookieService } from 'ngx-cookie-service';
import { dbaEntry, dbaList } from '../models/dbaEntry';
import { catchError, retry } from 'rxjs/operators';
import { despatchList } from '../models/despatch';
import { kkcddEntry } from '../models/KKC/kkcddentry';

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
    public GetAllCenters(){
      const body = {"Table":"centers","Where":{
        "CategoryId" :"KKC"
      }};
      return this.http.post(this.config.pyUrl +'GetRows', body)
    }

    public  GetAllCourses() {
      console.log('AddddEntry in service**************')
       
        const body = {"Table": "course"};
        return  this.http.post(this.config.pyUrl +'GetRows', body)
    
    }

    public  GetKkcDdEntry() {
      console.log('AddSubject in service**************')
       
        const body = {"Table": "kkcddEntry"};
     

    return  this.http.post(this.config.pyUrl +'GetRows', body)
    
    }
    public  AddKkcDdEntry(ddEntry: kkcddEntry) {
        const Sub = {"kkcId": ddEntry.kkcId,
                     "date":ddEntry.date,
                    "feesItem":ddEntry.feesItem,
                    "applicationNumber":ddEntry.applicationNumber,
                     "centerName":ddEntry.centerName,
                      "courseName":ddEntry.courseName,
                     "studentName":ddEntry.studentName,
                      "ddNumber":ddEntry.ddNumber,
                      "bank":ddEntry.bank,
                      "studentRollNumber":ddEntry.studentRollNumber,
                      "ddAmount":ddEntry.ddAmount,
                      "ddDate":ddEntry.ddDate,
                      "enteredBy":ddEntry.enteredBy,
                      "isVerified":ddEntry.isVerified,

                    };
        const body = {"Table": "kkcddEntry",
                       "Data":Sub,
                       "UniqueId":"KkcDdId"};

      this.http.post(this.config.pyUrl +'AddRow', body)
      .subscribe(data => {},
      err => {
      console.log('Error: ' + err.error);
      console.log('Name: ' + err.name);
      console.log('Message: ' + err.message);
      console.log('Status: ' + err.status);
      });
      }
}

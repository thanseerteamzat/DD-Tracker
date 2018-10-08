import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from "@angular/common/http";
import { ConfigService } from "src/app/services/config.service";
import { map } from 'rxjs/operators';
import { Center } from '../models/Center';
import { Course } from '../models/Course';
import { CookieService } from 'ngx-cookie-service';
import { dbaEntry } from '../models/dbaEntry';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EtsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  public centerList: Center[] = [];
  public courseList: Course[] = [];
  public cookiename: string;
  public cookievalue: string;
  public cookiecenter: string;
  
  public expirydate: Date;
  public convertedWord: string;
  url = ''
  constructor(private http: HttpClient,
    private config: ConfigService, private cookieService: CookieService) { }

  GetAllCenters = (): Observable<any> => {
    return this.http.get(this.config.apiUrl + 'center')



  }
  GetAllCourses = (centerName): Observable<any> => {
    return this.http.get(this.config.apiUrl + 'course?centername=' + centerName)

  }
  GetCenterbyDist = (district): Observable<any> => {
    return this.http.get(this.config.apiUrl + 'center?district=' + district)
  }

  GetddfromTtc = (fromDate,toDate,skipValue,limitValue): Observable<any> => {
    return this.http.get(this.config.apiUrlKKC + 'payment.php?from=' + fromDate   +'&to='+ toDate +'&skip='+skipValue +'&limit='+limitValue)

  }
  getCookie() {
    return this.cookieService.getAll();
    // return this.cookieService.get(setcenter);
    

  }
  setCookie(cookiename, cookievalue,setcenter, expirydate ) {
    return this.cookieService.set(cookiename, cookievalue,setcenter, expirydate)

  }


  public sendData(dbaData: dbaEntry): Observable<dbaEntry> {
    dbaData.centerCode = '2'
    // mailData.To = 'utek@utek.in';
    // mailData.CC = 'md@utek.in';
    // mailData.CC1 = 'nk@utek.in';
    // mailData.CC2 = 'utekatl@gmail.com';
    // mailData.CC3 = '';
    // mailData.CC4 = '';

    return this.http.post<dbaEntry>(this.url, dbaData, this.httpOptions)
      .pipe(

        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later..');
  };


}

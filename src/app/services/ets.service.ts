import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "src/app/services/config.service";
import { map } from 'rxjs/operators';
import { Center } from '../models/Center';
import { Course } from '../models/Course';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class EtsService {

  public centerList: Center[] = [];
  public courseList: Course[] = [];
  public cookiename: string;
  public cookievalue: string;
  public expirydate: Date;
  constructor(private http: HttpClient,
    private config: ConfigService, private cookieService: CookieService) { }

  GetAllCenters = (): Observable<any> => {
    return this.http.get(this.config.apiUrl + 'center')



  }
  GetAllCourses = (centerName): Observable<any> => {
    return this.http.get(this.config.apiUrl + 'course?centername=' + centerName)

  }

  getCookie(cookievalue) {
    return this.cookieService.get(cookievalue);

  }
  setCookie(cookiename, cookievalue,expirydate) {
    return this.cookieService.set(cookiename, cookievalue,expirydate)

  }
}

import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "src/app/services/config.service";
import { map } from 'rxjs/operators';
import { Center } from '../models/Center';
import { Course } from '../models/Course';


@Injectable({
  providedIn: 'root'
})
export class EtsService {

  public centerList: Center[] =[];
  public courseList: Course[] =[];
  constructor(private http: HttpClient,
    private config: ConfigService, ) { }

  GetAllCenters = (): Observable<any> => {
    return this.http.get(this.config.apiUrl + 'center')



  }
  GetAllCourses = (centerName): Observable<any> => {
    return this.http.get(this.config.apiUrl + 'course?centername='+ centerName)

}


}

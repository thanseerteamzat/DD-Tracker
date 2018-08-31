import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public apiUrl = "http://35.196.123.117:90/api/";
  
  constructor() { }
}

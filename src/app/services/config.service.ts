import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public apiUrl = "http://35.190.162.90:83/api/";
  public apiUrlKKC="http://keltronttc.in/api/";
  public pyUrl="http://35.190.162.90:81/"
  public pytestUrl="http://35.190.162.90:89/"

  
  constructor() { }
}

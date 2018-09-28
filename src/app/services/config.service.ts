import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public apiUrl = "http://35.190.162.90:83/api/";
  public apiUrlKKC="http://keltronttc.in/api/payment.php?";
  
  constructor() { }
}

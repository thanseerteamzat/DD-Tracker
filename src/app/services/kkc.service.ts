import { Injectable } from '@angular/core';
import { HttpHeaders ,HttpClient} from '@angular/common/http';
import { ConfigService } from './config.service';
import { kkcddEntry } from '../models/KKC/kkcddentry';
import { KKCDespatchData, KKCDespatch } from '../models/KKC/kkc-despatch';

@Injectable({
  providedIn: 'root'
})
export class KkcService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {

  }

  public updateKKCDespatchddEntry(ddentry: kkcddEntry) {
    console.log('here', ddentry);
    const Sub = {

      "despatchNo": ddentry.despatchNo,
      "despatchDate": ddentry.despatchDate,
      "isdespatchEntered": ddentry.isdespatchEntered,
    };
    const body = {
      "Table": "kkcddEntry",
      "Where": { "Id": ddentry.kkcId },
      "Data": Sub,
      // "UniqueId": "Id"
    };

    this.http.post(this.config.pytestUrl + 'UpdateRows', body)
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
  public AddKKCDespatcEntry(despatch: KKCDespatch) {
    console.log('depatch',despatch)
    const Sub = {
      "despId": despatch.despId,
      "noOfdd": despatch.noOfdd,
      "despatchNo": despatch.despatchNo,
      "despatchDate": despatch.despatchDate,
      "centerName": despatch.centerName,
      "centerCode": despatch.centerCode,
      "feeItem": despatch.feeItem,
      "totalAmount": despatch.totalAmount,
      "taxAmount": despatch.taxAmount,
      "FWT": despatch.FWT,
      "Amount": despatch.Amount,
      "Rate": despatch.Rate,
      "enteredBy": despatch.enteredBy,
      "isdespatchEntered": despatch.isdespatchEntered,

    };
    const body = {
      "Table": "kkcDespatchEntry",
      "Data": Sub,
      // "UniqueId": "Id"
    };

    this.http.post(this.config.pytestUrl + 'AddRow', body)
      .subscribe(data => { },
        err => {
          console.log('Error: ' + err.error);
          console.log('Name: ' + err.name);
          console.log('Message: ' + err.message);
          console.log('Status: ' + err.status);
        });
  }
}

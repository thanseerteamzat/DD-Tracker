import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { kkcddEntry } from '../models/KKC/kkcddentry';
import { KKCDespatchData, KKCDespatch } from '../models/KKC/kkc-despatch';
import { Observable } from 'rxjs';
import { kkcerpDespatch } from '../models/kkcErpdespatch';

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
    // console.log('here', ddentry);
    const Sub = {

      "despatchNo": ddentry.despatchNo,
      "despatchDate": ddentry.despatchDate,
      "isdespatchEntered": ddentry.isdespatchEntered
    };
    const body = {
      "Table": "kkcddEntry",
      "Where": { "kkcId": ddentry.kkcId },
      "Data": Sub
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
  public AddKKCDespatcEntry(despatch: KKCDespatch) {
    // console.log('depatch', despatch)
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

    this.http.post(this.config.pyUrl + 'AddRow', body)
      .subscribe(data => { },
        err => {
          console.log('Error: ' + err.error);
          console.log('Name: ' + err.name);
          console.log('Message: ' + err.message);
          console.log('Status: ' + err.status);
        });
  }

  public GetdespatchEntry(): Observable<KKCDespatchData> {
    const body = { "Table": "kkcDespatchEntry" };
    return this.http.post<KKCDespatchData>(this.config.pyUrl + 'GetRows', body)

  }

  public updateKKCerpEntry(erp: kkcerpDespatch) {
    // console.log('here', erp);
    const Sub = {

      "isdespatchEntered": erp.isdespatchEntered,
         };
    const body = {
      "Table": "kkcErpEntry",
      "Where": {"unique": erp.unique },
      "Data": Sub,
      // "UniqueId": "Id"
    };

    this.http.post(this.config.pyUrl + 'UpdateRows', body)
      .subscribe(data => {
        console.log('kkcerp123', data)
      },
        err => {
          console.log('Error: ' + err.error);
          console.log('Name: ' + err.name);
          console.log('Message: ' + err.message);
          console.log('Status: ' + err.status);
        });
  }
}

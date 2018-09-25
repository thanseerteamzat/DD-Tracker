import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { EtsService } from '../services/ets.service';
import { FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { erpDespatch } from '../models/erpdespatch';
import { Common } from '../models/common';
import { O_NONBLOCK } from 'constants';

@Component({
  selector: 'app-erpdespdetails',
  templateUrl: './erpdespdetails.component.html',
  styleUrls: ['./erpdespdetails.component.css']
})
export class ErpdespdetailsComponent implements OnInit {

  newerpdespatch:erpDespatch =new erpDespatch();

  constructor( private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private router: Router,
    private http: HttpClient,
    private config: ConfigService,
    private ets: EtsService,
    private fb: FormBuilder,
    private cookieservice: CookieService) { 
    let id = this.route.snapshot.paramMap.get('erpdespId');
    console.log('id******************',id);
      let dReference = db.object('erpdespatch');
      dReference.snapshotChanges().subscribe(action => {
        console.log(action.type);
        console.log(action.key);
    
        var ddentryList = action.payload.val();
        let obj = Common.snapshotToArray(action.payload);
        obj.forEach(element => {
    
          let obj: erpDespatch = JSON.parse(element);
          let ddListItem = new erpDespatch();
          if (obj.erpdespId != undefined && (obj.erpdespId==id)) {
            obj.erpdespId = obj.erpdespId.replace("/", "");
            this.newerpdespatch = obj;
            console.log('````````````````````````````````````````````',this.newerpdespatch.erpdespId)
    
            
            // let center = this.centerList.filter(s => s.Id==(obj.centerId));
            // // console.log('000000000000000',center)
            // if (center.length > 0) {
            //   this.selectedcenter = center[0];
          }
        })
      })


        }

  

ngOnInit() {

 var despatchone=this.newerpdespatch;
 console.log('*******************',despatchone);
  }

    }

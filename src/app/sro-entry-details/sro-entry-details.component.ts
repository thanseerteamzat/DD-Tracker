import { Component, OnInit } from '@angular/core';
import { sroEntry, sroEntryList } from '../models/sroEntry';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from '../services/config.service';
import { EtsService } from '../services/ets.service';
import { FormBuilder } from '@angular/forms';
import { Common } from '../models/common';

@Component({
  selector: 'app-sro-entry-details',
  templateUrl: './sro-entry-details.component.html',
  styleUrls: ['./sro-entry-details.component.css']
})
export class SroEntryDetailsComponent implements OnInit {
  sroentries: sroEntry[] = [];
  newsroentry: sroEntry = new sroEntry();
  isformOpen :boolean;
  minDate;
  maxDate;
  isEditMode;
  mytime;
  courses
  values = [
    { id: '1', name: 'Yes' },
    { id: '2', name: 'No' }
  ];
  
  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    // private http: HttpClient,
    private config: ConfigService,
    private ets: EtsService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {

    let id = this.route.snapshot.paramMap.get('sroId');
    console.log(id);
    
    let dReference = db.object('sroEntry');
    dReference.snapshotChanges().subscribe(action => {
      console.log(action.type);
      console.log(action.key);
      var ddentryList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      this.sroentries = [];
      obj.forEach(element => {
        let obj: sroEntry = JSON.parse(element);
        let ddListItem = new sroEntryList();
        if (obj.sroId != undefined && (obj.sroId == id)) {
          obj.sroId = obj.sroId.replace("/", "");
          this.newsroentry = obj;
          console.log(this.newsroentry,'sroEntry*************')
          console.log('***********************',this.newsroentry.sroId)
          // let center = this.centerList.filter(s => s.Id == (obj.centerId));
          // if (center.length > 0) {
          //   this.selectedcenter = center[0];
          // }
        }
      })
    })


   }

  ngOnInit() {
  }

  formOpen(value) {
    // console.log(value);
    if (value == "Yes") {
      this.isformOpen = true;
    }
    else {
      this.isformOpen = false;
    }
  }
  filterCenter()
  {}

}

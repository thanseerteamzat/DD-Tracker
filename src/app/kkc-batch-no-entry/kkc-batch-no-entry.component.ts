import { Component, OnInit } from '@angular/core';
import { EtsService } from '../services/ets.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { ConfigService } from '../services/config.service';
import { FormBuilder } from '@angular/forms';
import { KKCStudent } from '../models/kkcstudent';

@Component({
  selector: 'app-kkc-batch-no-entry',
  templateUrl: './kkc-batch-no-entry.component.html',
  styleUrls: ['./kkc-batch-no-entry.component.css']
})
export class KkcBatchNoEntryComponent implements OnInit {

  students:KKCStudent[];
  constructor(
    private ets: EtsService,
    private cookieservice: CookieService,
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private router: Router,
    // private http: HttpClient,
    private config: ConfigService,
    private fb: FormBuilder,

  ) { 

    this.ets.GetStudentsFromKKC().subscribe(data =>{
    this.students=data;
    console.log(this.students);
    })
  }

  ngOnInit() {
  }

}

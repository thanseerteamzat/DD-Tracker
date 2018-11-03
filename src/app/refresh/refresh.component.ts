import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.css']
})
export class RefreshComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
    // this.router.navigate[('/kkc-despatch-entry')]
  }

}

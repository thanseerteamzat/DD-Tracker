import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DD Tracker';
  version = '30/08/2018(N)';
  // userId:[];
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {


    this.route.queryParams.subscribe(params => {
      var userId = params['u'];
      let password = params['p'];
      let privilege = params['q']
      console.log('aaaaaaaaaaaaaaaaaa', userId)
      try {
        var decoded = window.atob(userId);
        //  document.getElementById("decoded").innerHTML = decoded;
        // var encoded = btoa(userId)
        // console.log(btoa(userId),btoa(password));

        // console.log('covertedddddddddddddddd', encoded);
        console.log('covertedddddddddddddddd', decoded);
      }
      catch (e) {
        console.log(e);
      }
    });
  }

}

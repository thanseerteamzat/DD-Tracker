import { Component, OnInit } from '@angular/core';
import { Common } from '../../models/common';
import { ddDespatchAck, despackList } from '../../models/Acknowledgement';
import { Center } from '../../models/Center';
import { AngularFireDatabase } from '../../../../node_modules/angularfire2/database';
import { EtsService } from '../../services/ets.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-despatch-ack-details',
  templateUrl: './despatch-ack-details.component.html',
  styleUrls: ['./despatch-ack-details.component.css']
})
export class DespatchAckDetailsComponent implements OnInit {
  despList: despackList[] = [];
  centerList: Center[] = []
  selectedData;
  centers;
  newdespAck: ddDespatchAck = new ddDespatchAck();
  tempdata;
  despatchTotal;
  despatchAmount;
  despinvoicedate;
  despinvoiceNo;
  preparedBy;
  ackData;
  selectedNo;
  constructor(
    private db: AngularFireDatabase,
    private ets: EtsService,
    private router: Router
  ) {

    let centerResponse = this.ets.centerList;
    //  Iterate throw all keys.
    for (let cent of centerResponse) {

      this.centerList.push(cent);

    }
    // this.selectedData = this.centerList;


    let that = this;
    //center list from api
    this.ets.GetAllCenters().subscribe(data => {
      that.centers = data;
      this.ets.centerList = this.centers
    },
      error => console.log(error),
      () => console.log('Get all complete'));

    let dlRef = db.object('despatchAck');
    dlRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      // this.dbaList = [];
      obj.forEach(element => {
        let ddListItem = new despackList();

        let obj: ddDespatchAck = JSON.parse(element);
        ddListItem.despacklist = obj;

        let centList = this.ets.centerList.filter(s => s.Id == (obj.centerId));
        // console.log('2222222222222222222222222222',custList)
        if (centList.length > 0) {
          ddListItem.center = centList[0];
        }
        this.despList.push(ddListItem);
        // console.log('aaaaaaaaaaaaaaaaaaaa', this.invoiceList)
        this.ackData = new Set(this.despList.map(item => item.despacklist.ackNo));
        console.log('aaaaaaaaaaaaaaaaaaaa', this.ackData)


      });
    });


  }

  ngOnInit() {

    if (this.ets.cookievalue != null && (this.ets.cookievalue.indexOf('x5') !==-1 ) || (this.ets.cookievalue == "All"))  {
      console.log('inside if condition *********************')
      // this.router.navigate(['/dd-entry'])
    }
    else {
      this.router.navigate(['/error']);
    }
  

    // if (this.ets.cookievalue == "3") {
    //   // this.router.navigate(['/despatch-no-entry'])
    // }
    // else {
    //   this.router.navigate(['/error']);


    // }
  }
  selectData(data) {
    this.despatchTotal = 0;
    this.despatchAmount = 0;
    for (let i = 0; i <= data.length; i++) {
      this.tempdata = data[i];
      if (this.tempdata != null) {
        this.despatchTotal = parseFloat(this.despatchTotal) + parseFloat(this.tempdata.despacklist.totalAmount);
        console.log('sum****', this.despatchTotal)
      }

    }

  }

  generateInvoiceList(selectedNo) {
    this.selectedData = this.despList.filter(s => s.despacklist.ackNo == selectedNo)
    this.selectData(this.selectedData);
    this.selectedData.forEach(element => {
      this.despinvoicedate = element.despacklist.ackdate
      this.despinvoiceNo = element.despacklist.ackNo
      this.preparedBy = element.despacklist.preparedBy
    })
  }

  print(cmpName): void {


    let printContents = document.getElementById('printSectionId').innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();

    document.body.innerHTML = originalContents;
  }

}

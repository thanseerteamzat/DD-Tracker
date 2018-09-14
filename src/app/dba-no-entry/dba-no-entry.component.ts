import { Component, OnInit } from '@angular/core';
import { Center } from "src/app/models/Center";
import { EtsService } from "src/app/services/ets.service";
import { Router } from '@angular/router';
import { ddList, ddEntry } from '../models/ddEntry';
import { despatchList, Despatch } from '../models/despatch';
import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../models/common';

@Component({
    selector: 'app-dba-no-entry',
    templateUrl: './dba-no-entry.component.html',
    styleUrls: ['./dba-no-entry.component.css']
})
export class DbaNoEntryComponent implements OnInit {


    selectedcenter;
    newddEntry: ddEntry = new ddEntry();
    ddLists: despatchList[] = [];
    centerList: Center[] = [];
    newsoneselectedData;
    centers: Center[] = [];
    tempcenter;
    // selectedCenter: string = "";
    selectedData: Array<any>;
    despatchList;

    selectedDespatch;
    filteredData;
    temp: despatchList[] = [];
    total = 0;
    total1;
    taxtotal = 0;
    taxttotal1;
    feewtTotal = 0;
    selectedCenter;
    feewTotal1;
    centerData: ddList[] = [];

    selectedDatatemp;
    selectedMonthtemp;
    selectedMonth;
    Months = [
        { id: '01', name: 'Jan' },
        { id: '02', name: 'Feb' },
        { id: '03', name: 'Mar' },
        { id: '04', name: 'Apr' },
        { id: '05', name: 'May' },
        { id: '06', name: 'Jun' },
        { id: '07', name: 'Jul' },
        { id: '08', name: 'Aug' },
        { id: '09', name: 'Sep' },
        { id: '10', name: 'Oct' },
        { id: '11', name: 'Nov' },
        { id: '12', name: 'Dec' },
    
      ];
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



        let itemRef = db.object('Despatch');
        itemRef.snapshotChanges().subscribe(action => {
            this.ddLists = [];
            var quatationsList = action.payload.val();
            let quotationobj = Common.snapshotToArray(action.payload);
            quotationobj.forEach(element => {
                let ddListItem = new despatchList();
                let qobj: Despatch = JSON.parse(element);
                // console.log("****" + element);
                if (qobj.despatchNo != undefined) {
                    qobj.despatchNo = qobj.despatchNo.replace("/", "");
                }

                ddListItem.despatchList = qobj;

                let centList = this.ets.centerList.filter(s => s.Id == (qobj.centerId));

                if (centList.length > 0) {
                    ddListItem.center = centList[0];

                    // console.log('selected****', this.selectedCenter)
                }

                this.ddLists.push(ddListItem);

                // console.log('**********', this.selectedData)

            });

        });

    }

    ngOnInit() {




        if (this.ets.cookievalue == "3") {
            // this.router.navigate(['/despatch-no-entry'])
        }
        else {
            this.router.navigate(['/error']);


        }
    }
    filterCenter(key) {


        this.selectedData = null;


        this.selectedData = this.ddLists.filter(s => s.center.Id == key);
        this.selectedDatatemp = this.selectedData;

        console.log('dat*******************a', this.selectedDatatemp);
        this.taxtotal = 0;
        this.taxttotal1 = 0;
        this.total = 0;
        this.total1 = 0;
        this.feewTotal1 = 0;
        this.feewtTotal = 0;
        try {

            for (let i = 0; i <= this.selectedData.length; i++) {
                var temp = this.selectedData[i];
                console.log('tempvalue*****', temp)
                this.total = this.total + parseFloat(temp.despatchList.totalAmount.toString());
                this.total1 = this.total.toFixed(2);
                this.taxtotal = this.taxtotal + parseFloat(temp.despatchList.taxAmount.toString());
                this.taxttotal1 = this.taxtotal.toFixed(2);
                this.feewtTotal = this.feewtTotal + parseFloat(temp.despatchList.FWT.toString());
                this.feewTotal1 = this.feewtTotal.toFixed(2);
                console.log('loooop***', this.total)

                this.temp.push(this.selectedData[i]);

            }
        }
        catch (e) {
            console.log('Exception..', e);
        }



    }

    filterDespatch(key) {
        console.log('temp********', this.selectedDatatemp);

        this.selectedData = this.selectedDatatemp.filter(s => s.despatchList.despatchNo == key);
        console.log(this.selectedData);

        this.taxtotal = 0;
        this.taxttotal1 = 0;
        this.total = 0;
        this.total1 = 0;
        this.feewTotal1 = 0;
        this.feewtTotal = 0;
        try {
            for (let i = 0; i <= this.selectedData.length; i++) {
                var temp = this.selectedData[i];
                console.log('tempvalue*****', temp)
                this.total = this.total + parseFloat(temp.despatchList.totalAmount.toString());
                this.total1 = this.total.toFixed(2);
                this.taxtotal = this.taxtotal + parseFloat(temp.despatchList.taxAmount.toString());
                this.taxttotal1 = this.taxtotal.toFixed(2);
                this.feewtTotal = this.feewtTotal + parseFloat(temp.despatchList.FWT.toString());
                this.feewTotal1 = this.feewtTotal.toFixed(2);
                console.log('loooop***', this.total)

                this.temp.push(this.selectedData[i]);

            }
        }
        catch (e) {
            console.log('Exception..', e);
        }
        this.selectedMonthtemp = this.selectedData;


    }

    filterMonth(key) {

        try {
            this.selectedData = this.selectedDatatemp.filter(s => ((s.despatchList.despatchDate.toString()).slice(3, -5)) == key)
            console.log('date', this.selectedData);
            this.taxtotal = 0;
            this.taxttotal1 = 0;
            this.total = 0;
            this.total1 = 0;
            this.feewTotal1 = 0;
            this.feewtTotal = 0;

            for (let i = 0; i <= this.selectedData.length; i++) {
                var temp = this.selectedData[i];
                console.log('tempvalue*****', temp)
                this.total = this.total + parseFloat(temp.despatchList.totalAmount.toString());
                this.total1 = this.total.toFixed(2);
                this.taxtotal = this.taxtotal + parseFloat(temp.despatchList.taxAmount.toString());
                this.taxttotal1 = this.taxtotal.toFixed(2);
                this.feewtTotal = this.feewtTotal + parseFloat(temp.despatchList.FWT.toString());
                this.feewTotal1 = this.feewtTotal.toFixed(2);
                console.log('loooop***', this.total)

                this.temp.push(this.selectedData[i]);

            }
        }
        catch (e) {
            console.log('Exception..', e)
        }




    }

}

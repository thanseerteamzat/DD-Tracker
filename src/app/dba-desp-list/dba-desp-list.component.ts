import { Component, OnInit } from '@angular/core';
import { despatchtemp, Despatch, despatchList } from '../models/despatch';
import { dbaLastid } from '../models/dbalastId';
import { dbaEntry } from '../models/dbaEntry';
import { Invoice } from '../models/invoice ';
import { ddEntry, ddList } from '../models/ddEntry';
import { Center } from '../models/Center';
import { AngularFireDatabase } from 'angularfire2/database';
import { EtsService } from '../services/ets.service';
import { Router } from '@angular/router';
import { Common } from '../models/common';

@Component({
    selector: 'app-dba-desp-list',
    templateUrl: './dba-desp-list.component.html',
    styleUrls: ['./dba-desp-list.component.css']
})
export class DbaDespListComponent implements OnInit {

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
    tempmonth;
    selectedDatatemp;
    selectedMonthtemp;
    selectedMonth;
    temprate;
    selectedDataIndex;
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
    feesItems = [
        { id: '1', name: 'Course Fee' },
        { id: '2', name: 'Prospectus' },
        { id: '3', name: 'Re exam' },
        { id: '4', name: 'Renewal Fee' },
        { id: '5', name: 'Affiliation' },
        { id: '6', name: 'Inspection' },
        { id: '7', name: 'Duplicate Certificate/Marklist' },
    ];
    desplist: despatchtemp[] = [];
    dbaLastids: dbaLastid[] = [];
    newddLastId: dbaLastid = new dbaLastid();
    newdba: dbaEntry = new dbaEntry();
    dbalist: dbaEntry[] = [];
    newdespatch: Despatch = new Despatch();
    newInvoice: Invoice = new Invoice();
    typedtext;
    entered;
    count;
    tempentry;
    checklisttotal;
    selectedfee;
    selectmonth;
    totalamount;
    tot;
    despatchtotalAmount;
    despatchtaxTotal;
    despatchfeeWT;
    Amount;
    rateTotal;
    dbanoExits;
    tempdbalist;
    dbaservice;
    constructor(
        private db: AngularFireDatabase,
        private ets: EtsService,
        private router: Router,

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
                let dobj: dbaEntry = JSON.parse(element);
                if (qobj.despatchNo != undefined) {
                    qobj.despatchNo = qobj.despatchNo.replace("/", "");
                }

                ddListItem.despatchList = qobj;
                // this.newdespatch = qobj;
                // this.newdba = qobj;
                let centList = this.ets.centerList.filter(s => s.Id == (qobj.centerId));

                if (centList.length > 0) {
                    ddListItem.center = centList[0];

                    // console.log('selected****', this.selectedCenter)
                }

                this.ddLists.push(ddListItem);

                // console.log('**********', this.selectedData)

            });

        });
        let dlRef = db.object('dbaLastId');
        dlRef.snapshotChanges().subscribe(action => {
            var quatationsList = action.payload.val();
            let obj = Common.snapshotToArray(action.payload);
            this.dbaLastids = [];
            obj.forEach(element => {
                let obj: dbaLastid = JSON.parse(element);
                this.newddLastId = obj;
                this.dbaLastids.push(obj as dbaLastid);
                this.count = obj.lastId;


            });
        });

        let dbRef = db.object('dbaEntry');
        dbRef.snapshotChanges().subscribe(action => {
            var quatationsList = action.payload.val();
            let obj = Common.snapshotToArray(action.payload);
            this.dbalist = [];
            obj.forEach(element => {
                let obj: dbaEntry = JSON.parse(element);

                this.dbalist.push(obj as dbaEntry);



            });
        });

    }
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    }

    selectData(data) {

        try {

            this.taxtotal = 0;
            this.taxttotal1 = 0;
            this.total = 0;
            this.total1 = 0;
            this.feewTotal1 = 0;
            this.feewtTotal = 0;
            this.temprate = 0;
            this.tot = 0;
            this.totalamount = 0;
            for (let i = 0; i <= this.desplist.length; i++) {
                this.desplist.splice(i, this.desplist.length);
            }

            for (let i = 0; i <= data.length; i++) {
                var temp = data[i];
                if (temp != null) {
                    this.total = this.total + parseFloat(temp.despatchList.totalAmount.toString());
                    // console.log('tempvalue*****', temp)
                    this.total1 = this.total.toFixed(2);
                    // console.log('desplist*****', this.temp)

                    this.taxtotal = this.taxtotal + parseFloat(temp.despatchList.taxAmount.toString());
                    this.taxttotal1 = this.taxtotal.toFixed(2);
                    this.feewtTotal = this.feewtTotal + parseFloat(temp.despatchList.FWT.toString());
                    this.feewTotal1 = this.feewtTotal.toFixed(2);
                    this.tot = this.tot + parseFloat(temp.despatchList.Amount);
                    this.totalamount = this.tot.toFixed(2);

                }
            }
        }
        catch (e) {
            console.log('Exception..', e)
        }

    }
    ngOnInit() {


        if (this.ets.cookievalue != null && (this.ets.cookievalue.indexOf('x10') !==-1 ) || (this.ets.cookievalue == "All"))  {
            console.log('inside if condition *********************')
            // this.router.navigate(['/dd-entry'])
          }
          else {
            this.router.navigate(['/error']);
          }

        // if (this.ets.cookievalue == "3") {
        //     // this.router.navigate(['/despatch-no-entry'])
        // }
        // else {
        //     this.router.navigate(['/error']);


        // }

    }

    filterFee(key) {
        this.selectedfee = key;
        this.selectedData = null;
        for (let i = 0; i <= this.desplist.length; i++) {
            this.desplist.splice(i, this.desplist.length);
        }
        if (this.selectmonth == null && this.selectedcenter == null) {

            this.selectedData = this.ddLists.filter(s => s.despatchList.feeItem == this.selectedfee && s.despatchList.isdbaEntered == true)
            this.selectData(this.selectedData)
        }
        else if (this.selectmonth == null) {

            this.selectedData = this.ddLists.filter(s => s.despatchList.feeItem == this.selectedfee && s.despatchList.centerId == this.selectedcenter && s.despatchList.isdbaEntered == true)
            this.selectData(this.selectedData)

        }
        else if (this.selectedcenter == null) {

            this.selectedData = this.ddLists.filter(s => s.despatchList.feeItem == this.selectedfee && this.getMothFromDate(s.despatchList.despatchDate) == this.selectmonth && s.despatchList.isdbaEntered == true)
            this.selectData(this.selectedData)

        }
        else {
            this.selectedData = this.ddLists.filter(s => this.getMothFromDate(s.despatchList.despatchDate) == this.selectmonth && s.despatchList.centerId == this.selectedcenter && s.despatchList.feeItem == this.selectedfee && s.despatchList.isdbaEntered == true)
            this.selectData(this.selectedData)
        }
    }

    filterMonth(key) {
        this.selectmonth = key;
        this.selectedData = null;
        for (let i = 0; i <= this.desplist.length; i++) {
            this.desplist.splice(i, this.desplist.length);
        }
        if (this.selectedfee == null && this.selectedcenter == null) {
            this.selectedData = this.ddLists.filter(s => this.getMothFromDate(s.despatchList.despatchDate) == this.selectmonth && s.despatchList.isdbaEntered == true)
            this.selectData(this.selectedData)

        }
        else if (this.selectedfee == null) {
            this.selectedData = this.ddLists.filter(s => this.getMothFromDate(s.despatchList.despatchDate) == this.selectmonth && s.despatchList.centerId == this.selectedcenter && s.despatchList.isdbaEntered == true)
            this.selectData(this.selectedData)

        }
        else if (this.selectedcenter == null) {
            this.selectedData = this.ddLists.filter(s => s.despatchList.feeItem == this.selectedfee && this.getMothFromDate(s.despatchList.despatchDate) == this.selectmonth && s.despatchList.isdbaEntered == true)
            this.selectData(this.selectedData)

        }
        else {
            this.selectedData = this.ddLists.filter(
                s => this.getMothFromDate(s.despatchList.despatchDate) == this.selectmonth && s.despatchList.centerId == this.selectedcenter && s.despatchList.feeItem == this.selectedfee && s.despatchList.isdbaEntered == true)
            this.selectData(this.selectedData)
        }

    }

    filterCenter(key) {


        this.selectedcenter = key;
        this.selectedData = null;
        for (let i = 0; i <= this.desplist.length; i++) {
            this.desplist.splice(i, this.desplist.length);
        }
        if (this.selectedfee == null && this.selectmonth == null) {
            this.selectedData = this.ddLists.filter(s => s.despatchList.centerId == this.selectedcenter && s.despatchList.isdbaEntered == true)
            this.selectData(this.selectedData)

        }
        else if (this.selectedfee == null) {
            this.selectedData = this.ddLists.filter(s => s.despatchList.centerId == this.selectedcenter && this.getMothFromDate(s.despatchList.despatchDate) == this.selectmonth && s.despatchList.isdbaEntered == true)
            console.log('with fee filter******')
            this.selectData(this.selectedData)

        }
        else if (this.selectmonth == null) {
            this.selectedData = this.ddLists.filter(s => s.despatchList.centerId == this.selectedcenter && s.despatchList.feeItem == this.selectedfee && s.despatchList.isdbaEntered == true)
            console.log('with fee filter******')
            this.selectData(this.selectedData)

        }
        else {
            this.selectedData = this.ddLists.filter(s => this.getMothFromDate(s.despatchList.despatchDate) == this.selectmonth && s.despatchList.centerId == this.selectedcenter && s.despatchList.feeItem == this.selectedfee && s.despatchList.isdbaEntered == true)
            this.selectData(this.selectedData)
        }


    }

    getMothFromDate(dateData) {
        if (dateData != null) {
            var month = dateData.toString().slice(3, -5)
            // console.log('month**',month)
            return month;
        }
    }
    onSend(data) {
        console.log('data***', data);
        this.ets.sendData(data);
    }






}

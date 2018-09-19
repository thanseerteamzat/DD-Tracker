import { Component, OnInit } from '@angular/core';
import { Center } from "src/app/models/Center";
import { EtsService } from "src/app/services/ets.service";
import { Router } from '@angular/router';
import { ddList, ddEntry } from '../models/ddEntry';
import { despatchList, Despatch, despatchtemp } from '../models/despatch';
import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../models/common';
import { dbaLastid } from '../models/dbalastId';
import { dbaEntry } from '../models/dbaEntry';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';

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
    tempmonth;
    selectedDatatemp;
    selectedMonthtemp;
    selectedMonth;
    temprate;
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
    newdespatch: Despatch = new Despatch();
    typedtext;
    entered;
    count;
    tempentry;
    checklisttotal;
    selectedfee;
    selectmonth;
    constructor(
        private db: AngularFireDatabase,
        private ets: EtsService,
        private router: Router,
        private fb: FormBuilder
    ) {
        this.dbacreateForm();
        this.resetform();
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
                console.log('aaaaaaaaaaaaaaaaaaaa', this.dbaLastids)
                this.count = obj.lastId;


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

            for (let i = 0; i <= this.desplist.length; i++) {
                this.desplist.splice(i, this.desplist.length);
            }

            for (let i = 0; i <= data.length; i++) {
                var temp = data[i];
                // console.log('tempvalue*****', temp)
                // this.tempmonth = temp.despatchList.despatchDate;

                this.total = this.total + parseFloat(temp.despatchList.totalAmount.toString());
                // console.log('tempvalue*****', temp)
                this.total1 = this.total.toFixed(2);
                // console.log('desplist*****', this.temp)

                this.taxtotal = this.taxtotal + parseFloat(temp.despatchList.taxAmount.toString());
                this.taxttotal1 = this.taxtotal.toFixed(2);
                this.feewtTotal = this.feewtTotal + parseFloat(temp.despatchList.FWT.toString());
                this.feewTotal1 = this.feewtTotal.toFixed(2);
                // console.log('loooop***', this.total)



                // this.temp.push(this.selectedData[i]);

            }
        }
        catch (e) {
            // console.log('Exception..', e)
        }

    }
    ngOnInit() {

        this.resetform();


        // if (this.ets.cookievalue == "3") {
        //     // this.router.navigate(['/despatch-no-entry'])
        // }
        // else {
        //     this.router.navigate(['/error']);


        // }
        this.entered = this.ets.cookiename;
        this.newdba.enteredBy = this.entered;
        console.log('cookiename****', this.entered)
    }

    filterFee(key) {
        this.selectedfee = key;
        this.selectedData = null;
        if (this.selectmonth == null) {

            this.selectedData = this.ddLists.filter(s => s.despatchList.feeItem == this.selectedfee)
            this.selectData(this.selectedData)

        }
        else {

            this.selectedData = this.ddLists.filter(s => s.despatchList.feeItem == this.selectedfee && ((s.despatchList.despatchDate.toString()).slice(3, -5)) == this.selectmonth)
            console.log('with month filter******')
            this.selectData(this.selectedData)
        }
    }

    filterMonth(key) {
        this.selectmonth = key;
        this.selectedData = null;

        if (this.selectedfee == null) {
            this.selectedData = this.ddLists.filter(s => ((s.despatchList.despatchDate.toString()).slice(3, -5)) == this.selectmonth)
            this.selectData(this.selectedData)

        }
        else {
            this.selectedData = this.ddLists.filter(s => ((s.despatchList.despatchDate.toString()).slice(3, -5)) == this.selectmonth && s.despatchList.feeItem == this.selectedfee)
            console.log('with fee filter******')
            this.selectData(this.selectedData)

        }

    }


    filterCenter(key) {

        this.selectedData = this.selectedDatatemp.filter(s => s.center.Id == key);
        // this.tempmonth = this.selectedData.filter(s => s.despatchList.despatchDate)

        console.log('dat*******************a', this.selectedDatatemp);
        this.taxtotal = 0;
        this.taxttotal1 = 0;
        this.total = 0;
        this.total1 = 0;
        this.feewTotal1 = 0;
        this.feewtTotal = 0;
        try {

            for (let i = 0; i <= this.desplist.length; i++) {
                this.desplist.splice(i, this.desplist.length);
            }

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

    filterDespatch(key) {
        console.log('temp********', this.selectedDatatemp);

        this.selectedData = this.ddLists.filter(s => s.despatchList.despatchNo == key);
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







    onchange(event, temp, despatch: Despatch) {

        if (event == true) {

            this.desplist.push(despatch);
            // this.checklisttotal = this.desplist.length;

        }
        else {

            this.desplist.pop();
            // this.checklisttotal = this.desplist.length;


        }
        console.log('data****', this.desplist)


    }
    register(lastid) {


        console.log('lastid***', lastid)
        try {
            for (let i = 0; i < this.desplist.length; i++) {
                this.tempentry = this.desplist[i];



                var updates = {};
                this.tempentry.dbaNo = this.newdespatch.dbaNo;
                this.tempentry.dbaDate = this.formatDate(this.newdespatch.dbaDate);
                this.tempentry.isdbaEntered = true;
                updates['/Despatch/' + this.tempentry.despId] = JSON.stringify(this.tempentry);
                try {

                    let up = this.db.database.ref().update(updates);
                    // this.router.navigate(['/despatch-no-entry'])
                }
                catch (e) {

                }

                var counter = parseInt(this.count) + 1;
                var updates = {};
                this.newddLastId.lastId = counter;
                updates['/dbaLastId/' + lastid] = JSON.stringify(this.newddLastId);
                let up = this.db.database.ref().update(updates);

                this.newdba.dbaId = counter.toString();
                this.newdba.dbaNo = this.newdespatch.dbaNo;
                this.newdba.dbaDate = this.formatDate(this.newdespatch.dbaDate);
                this.newdba.centerId = this.tempentry.centerId;
                this.newdba.centerCode = this.tempentry.centerCode;
                this.newdba.despatchNo = this.tempentry.despatchNo;
                this.Months.forEach(element => {

                    if (element.id == (this.tempentry.despatchDate.slice(3, -5))) {
                        this.newdba.despatchMonth = element.name + '-' + this.tempentry.despatchDate.slice(8);
                    }
                });
                this.desplist.forEach(element => {
                    this.newdba.feesItem = element.feeItem;
                }
                )
                // this.newdba.despatchMonth = this.tempentry.;
                this.newdba.despatchDate = this.tempentry.despatchDate;
                this.newdba.despatchAmount = this.tempentry.totalAmount;
                this.newdba.tax = this.tempentry.taxAmount;
                this.newdba.fwt = this.tempentry.FWT;
                this.newdba.stkAmount = this.tempentry.Amount;
                this.newdba.stkRate = this.tempentry.Rate;
                this.newdba.isdbaEntered = true;



                let dbaEntryJson = JSON.stringify(this.newdba);
                console.log(dbaEntryJson);
                try {
                    this.db.database.ref('dbaEntry').child(this.newdba.dbaId).set(dbaEntryJson);
                    // alert("DD Entry added successfully!!.");
                    // this.router.navigate(['/dd-entry']);
                }
                catch (ex) {

                }
            }
        }
        catch (e) {

            console.log('Exception***', e)

        }

        alert('dba Added :' + this.newdba.dbaNo);
        this.router.navigate(['/dba-no-entry']);
        this.selectedData = null;
        this.taxttotal1 = 0;
        this.total1 = 0;
        this.feewTotal1 = 0;
        this.resetform();
        for (let i = 0; i <= this.desplist.length; i++) {
            this.desplist.splice(i, this.desplist.length);
        }

    }
    //validation
    dbaForm = new FormGroup(
        {
            dbaNum: new FormControl(),
            dbaDate: new FormControl()
        }
    );
    dbacreateForm() {
        this.dbaForm = this.fb.group(
            {
                dbaNum: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],

                dbaDate: [null, Validators.required]
            }
        )
    };
    get dbaNum() { return this.dbaForm.get('dbaNum'); }
    get dbaDate() { return this.dbaForm.get('dbaDate'); }

    resetform() {
        this.dbaForm.reset(
            {
                dbaNum: null,
                dbaDate: null
            }
        )
    }
}

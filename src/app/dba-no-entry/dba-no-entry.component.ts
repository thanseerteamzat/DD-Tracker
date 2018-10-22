import { Component, OnInit } from '@angular/core';
import { Center } from "src/app/models/Center";
import { EtsService } from "src/app/services/ets.service";
import { Router } from '@angular/router';
import { ddList, ddEntry } from '../models/ddEntry';
import { despatchList, Despatch, despatchtemp } from '../models/despatch';
import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../models/common';
import { dbaLastid } from '../models/dbalastId';
import { dbaEntry, dbaShareReleaseNote } from '../models/dbaEntry';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';
import { Invoice } from '../models/invoice ';
import { IfStmt } from '@angular/compiler';
import { AcadamicService } from '../services/acadamic.service';

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
    selectedData: despatchList[];
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
    checklisttemp;
    checklistddTotal;
    batchNo;
    despatch: Despatch[] = []
    newdbaNote: dbaShareReleaseNote = new dbaShareReleaseNote();
    dbaExportdata: dbaShareReleaseNote[] = [];
    constructor(
        private db: AngularFireDatabase,
        private ets: EtsService,
        private router: Router,
        private fb: FormBuilder,
        private academic: AcadamicService
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

                this.despatch.push(ddListItem.despatchList);

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

        this.resetform();
        this.dbaservice = this.dbalist;

        if (this.ets.cookievalue != null && (this.ets.cookievalue.indexOf('x9') !== -1) || (this.ets.cookievalue == "All")) {
            console.log('inside if condition *********************')
            // this.router.navigate(['/dd-entry'])
        }
        else {
            this.router.navigate(['/error']);
        }
        this.dbaservice = this.ddLists;

        this.entered = this.ets.cookiename;
        this.newdba.enteredBy = this.entered;
        this.newInvoice.enteredby = this.entered;
        console.log('cookiename****', this.entered)
    }

    filterFee(key) {
        this.selectedfee = key;
        this.selectedData = null;
        for (let i = 0; i <= this.desplist.length; i++) {
            this.desplist.splice(i, this.desplist.length);
        }
        if (this.selectmonth == null && this.selectedcenter == null) {

            this.selectedData = this.ddLists.filter(s => s.despatchList.feeItem == this.selectedfee && s.despatchList.isdbaEntered == null)
            this.getdespatchDetails(this.selectedData);
            this.selectData(this.selectedData);
        }
        else if (this.selectmonth == null) {

            this.selectedData = this.ddLists.filter(s => s.despatchList.feeItem == this.selectedfee && s.despatchList.centerId == this.selectedcenter && s.despatchList.isdbaEntered == null)
            this.getdespatchDetails(this.selectedData);
            this.selectData(this.selectedData)

        }
        else if (this.selectedcenter == null) {

            this.selectedData = this.ddLists.filter(s => s.despatchList.feeItem == this.selectedfee && this.getMothFromDate(s.despatchList.despatchDate) == this.selectmonth && s.despatchList.isdbaEntered == null)
            this.getdespatchDetails(this.selectedData);
            this.selectData(this.selectedData)

        }
        else {
            this.selectedData = this.ddLists.filter(s => this.getMothFromDate(s.despatchList.despatchDate) == this.selectmonth && s.despatchList.centerId == this.selectedcenter && s.despatchList.feeItem == this.selectedfee && s.despatchList.isdbaEntered == null)
            this.getdespatchDetails(this.selectedData);
            this.selectData(this.selectedData)
        }
    }


    getdespatchDetails(data) {

        let centerResponse = this.ets.centerList;
        //  Iterate throw all keys.
        for (let cent of centerResponse) {

            this.centerList.push(cent);

        }
        for (let i = 0; i < data.length; i++) {
            var list = data[i];
            this.newdbaNote.despSerialNo = list.despatchList.despId;
            this.centerList.forEach(data => {
                if (data.Id == list.despatchList.centerId) {
                    this.newdbaNote.centerName = data.CenterName;
                }
            })
    
            this.newdbaNote.batchNo = list.despatchList.batchNo;
            this.newdbaNote.depDate = list.despatchList.despatchDate;
            this.newdbaNote.feesItem = list.despatchList.feeItem;
            this.newdbaNote.total = list.despatchList.totalAmount;
            this.newdbaNote.tax = list.despatchList.taxAmount;
            this.newdbaNote.fwt = list.despatchList.FWT;
            this.newdbaNote.amt = list.despatchList.Amount;
            this.newdbaNote.rate = list.despatchList.Rate;
            this.dbaExportdata.push(this.newdbaNote);
        }
        console.log('data ***', this.dbaExportdata)
    }

    export()
    {
        // this.academic.ExportDbaReport(this.dbaExportdata)
    }
    filterMonth(key) {
        this.selectmonth = key;
        this.selectedData = null;

        for (let i = 0; i <= this.desplist.length; i++) {
            this.desplist.splice(i, this.desplist.length);
        }
        if (this.selectedfee == null && this.selectedcenter == null) {
            this.selectedData = this.ddLists.filter(s => this.getMothFromDate(s.despatchList.despatchDate) == this.selectmonth && s.despatchList.isdbaEntered == null)
        //    console.log('selected data',this.selectedData)
            this.getdespatchDetails(this.selectedData);
            this.getbatchNo();
            this.selectData(this.selectedData)
        }
        else if (this.selectedfee == null) {
            this.selectedData = this.ddLists.filter(s => this.getMothFromDate(s.despatchList.despatchDate) == this.selectmonth && s.despatchList.centerId == this.selectedcenter && s.despatchList.isdbaEntered == null)
            this.getdespatchDetails(this.selectedData);
            this.getbatchNo();
            this.selectData(this.selectedData)

        }
        else if (this.selectedcenter == null) {
            this.selectedData = this.ddLists.filter(s => s.despatchList.feeItem == this.selectedfee && this.getMothFromDate(s.despatchList.despatchDate) == this.selectmonth && s.despatchList.isdbaEntered == null)
            this.getdespatchDetails(this.selectedData);
            this.getbatchNo();
            this.selectData(this.selectedData)

        }
        else {
            this.selectedData = this.ddLists.filter(
                s => this.getMothFromDate(s.despatchList.despatchDate) == this.selectmonth && s.despatchList.centerId == this.selectedcenter && s.despatchList.feeItem == this.selectedfee && s.despatchList.isdbaEntered == null)
            this.getdespatchDetails(this.selectedData);
            this.getbatchNo();
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
            this.selectedData = this.ddLists.filter(s => s.despatchList.centerId == this.selectedcenter && s.despatchList.isdbaEntered == null)
            this.getdespatchDetails(this.selectedData);
            this.getbatchNo();
            this.selectData(this.selectedData)

        }
        else if (this.selectedfee == null) {
            this.selectedData = this.ddLists.filter(s => s.despatchList.centerId == this.selectedcenter && this.getMothFromDate(s.despatchList.despatchDate) == this.selectmonth && s.despatchList.isdbaEntered == null)
            this.getdespatchDetails(this.selectedData);
            console.log('with fee filter******')

            this.getbatchNo();
            this.selectData(this.selectedData)
            console.log(this.selectedData);


        }
        else if (this.selectmonth == null) {
            this.selectedData = this.ddLists.filter(s => s.despatchList.centerId == this.selectedcenter && s.despatchList.feeItem == this.selectedfee && s.despatchList.isdbaEntered == null)
            console.log('with fee filter******')
            this.getbatchNo();
            this.selectData(this.selectedData)

        }
        else {
            this.selectedData = this.ddLists.filter(s => this.getMothFromDate(s.despatchList.despatchDate) == this.selectmonth && s.despatchList.centerId == this.selectedcenter && s.despatchList.feeItem == this.selectedfee && s.despatchList.isdbaEntered == null)
            this.getdespatchDetails(this.selectedData);
            this.getbatchNo();
            this.selectData(this.selectedData)
        }


    }

    getbatchNo() {
        let centerResponse = this.ets.centerList;
        //  Iterate throw all keys.
        for (let cent of centerResponse) {

            this.centerList.push(cent);

        }
        this.selectedData.forEach(data => {
            var split = data.center.CenterName.slice(-5);
            if (split.includes('PD') && split.includes('DM')) {
                data.despatchList.batchNo =
                    'BN' + '/' + data.center.CenterCode + '/' + '001' + '/' + this.ets.financialYear + ',' +
                    'BN' + '/' + data.center.CenterCode + '/' + '002' + '/' + this.ets.financialYear;

            }
            else if (split.includes('PD')) {
                data.despatchList.batchNo = 'BN' + '/' + data.center.CenterCode + '/' + '001' + '/' + this.ets.financialYear;
            }
            else if (split.includes('DM')) {
                data.despatchList.batchNo = 'BN' + '/' + data.center.CenterCode + '/' + '002' + '/' + this.ets.financialYear;

            }

        })

    }

    getMothFromDate(dateData) {
        if (dateData != null) {
            var month = dateData.toString().slice(3, -5)
            // console.log('month**',month)
            return month;
        }
    }

    chechlistTotal(checklist) {
        for (let i = 0; i <= checklist.length; i++) {

            this.checklisttemp = checklist[i];
            if (this.checklisttemp != null) {
                this.checklistddTotal = parseFloat(this.checklistddTotal) + parseFloat(this.checklisttemp.totalAmount);
            }
        }
    }


    onchange(event, temp, despatch: Despatch) {

        if (event == true) {

            this.desplist.push(despatch);
            this.checklisttotal = this.desplist.length;
            this.checklistddTotal = 0;
            this.chechlistTotal(this.desplist);
        }
        else if (event == false) {
            this.selectedDataIndex = this.desplist.findIndex(list => list.despId == temp);
            this.desplist.splice(this.selectedDataIndex, 1);
            this.checklisttotal = this.desplist.length;
            this.checklistddTotal = 0;
            this.chechlistTotal(this.desplist);

        }
        console.log('data****', this.desplist)


    }
    beforeRegister(id) {
        console.log('list', this.desplist)
        if (this.desplist.length == 0) {
            alert('Please select  any Entry !!');

        }
        else {

            this.dbanoExits = false;
            var list = this.dbalist;
            console.log('list***', list)
            this.newdba.dbaNo = this.newdespatch.dbaNo;
            console.log('dbaNo***', this.newdba.dbaNo)

            for (let i = 0; i <= this.dbalist.length; i++) {
                this.tempdbalist = this.dbalist[i];
                if (this.tempdbalist != null && this.tempdbalist.dbaNo == this.newdba.dbaNo) {
                    this.dbanoExits = true;
                    break;
                }
            }
            if (this.dbanoExits == false) {

                this.register(id);
            }
            else {

                alert('dbaNo number duplication');



            }
        }

    }

    register(lastid) {
        this.despatchtotalAmount = 0;
        this.despatchtaxTotal = 0;
        this.despatchfeeWT = 0;
        this.Amount = 0;
        this.rateTotal = 0;

        console.log('lastid***', lastid)
        try {
            for (let i = 0; i < this.desplist.length; i++) {
                this.tempentry = this.desplist[i];
                var updates = {};
                this.tempentry.dbaNo = this.newdespatch.dbaNo;
                this.tempentry.batchNo = this.batchNo;
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
                this.newdba.batchNo = this.batchNo;
                // this.newdba.despatchNo = this.tempentry.despatchNo;
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
                this.newdba.feesItem = this.tempentry.feeItem;
                // this.newdba.despatchDate = this.tempentry.despatchDate;
                this.despatchtotalAmount = parseFloat(this.despatchtotalAmount.toString()) + parseFloat(this.tempentry.totalAmount);
                console.log('total amount', this.despatchtotalAmount)
                let totalamountfloatvalue = this.despatchtotalAmount.toFixed(2);
                this.newdba.despatchAmount = totalamountfloatvalue;
                this.despatchtaxTotal = parseFloat(this.despatchtaxTotal.toString()) + parseFloat(this.tempentry.taxAmount);
                let taxfloatvalue = this.despatchtaxTotal.toFixed(2);
                this.newdba.tax = taxfloatvalue;
                this.despatchfeeWT = parseFloat(this.despatchfeeWT.toString()) + parseFloat(this.tempentry.FWT);
                let feeWTfloatvalue = this.despatchfeeWT.toFixed(2);
                this.newdba.fwt = feeWTfloatvalue;
                this.Amount = parseFloat(this.Amount.toString()) + parseFloat(this.tempentry.Amount);
                let amountfloatvalue = this.Amount.toFixed(2);
                this.newdba.stkAmount = amountfloatvalue;
                // this.rateTotal = parseFloat(this.rateTotal.toString()) + parseFloat(Rate);
                // let ratefloatvalue = this.rateTotal.toFixed(2);
                // this.newdba.stkRate = ratefloatvalue;


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

                if (this.newdba.feesItem == 'Course Fee') {
                    this.newInvoice.share = 15;
                    let percentage = parseFloat(this.newInvoice.share.toString()) / 100;
                    let tot = parseFloat(this.newdba.fwt.toString()) * parseFloat(percentage.toString());
                    this.newInvoice.shareAmount = tot.toFixed(2);
                }
                else if (this.newdba.feesItem == 'Prospectus') {
                    this.newInvoice.share = 80;
                    let percentage = parseFloat(this.newInvoice.share.toString()) / 100;
                    let tot = parseFloat(this.newdba.fwt.toString()) * parseFloat(percentage.toString());
                    this.newInvoice.shareAmount = tot.toFixed(2);
                }

                else if (this.newdba.feesItem == 'Inspection') {
                    this.newInvoice.share = 60;
                    let percentage = parseFloat(this.newInvoice.share.toString()) / 100;
                    let tot = parseFloat(this.newdba.fwt.toString()) * parseFloat(percentage.toString());
                    this.newInvoice.shareAmount = tot.toFixed(2);
                }
                else if (this.newdba.feesItem == 'Affilication' || this.newdba.feesItem == 'Renewal Fee') {
                    this.newInvoice.share = 80;
                    let percentage = parseFloat(this.newInvoice.share.toString()) / 100;
                    let tot = parseFloat(this.newdba.fwt.toString()) * parseFloat(percentage.toString());
                    this.newInvoice.shareAmount = tot.toFixed(2);
                }

                else {

                    if (this.newdba.feesItem == 'Course Fee') {
                        this.newInvoice.share = 0;
                        // let percentage = parseFloat(this.newInvoice.shareAmount) / 100;
                        // let tot = parseFloat(element.FWT.toString()) * parseFloat(percentage.toString());
                        this.newInvoice.shareAmount = '0';
                    }
                    else if (this.newdba.feesItem == 'Prospectus') {
                        this.newInvoice.share = 0;
                        // let percentage = parseFloat(this.newInvoice.shareAmount) / 100;
                        // let tot = parseFloat(element.FWT.toString()) * parseFloat(percentage.toString());
                        this.newInvoice.shareAmount = '0';
                    }

                    else if (this.newdba.feesItem == 'Inspection') {
                        this.newInvoice.share = 0;
                        // let percentage = parseFloat(this.newInvoice.shareAmount) / 100;
                        // let tot = parseFloat(element.FWT.toString()) * parseFloat(percentage.toString());
                        this.newInvoice.shareAmount = '0';
                    }
                    else if (this.newdba.feesItem == 'Affilication' || this.newdba.feesItem == 'Renewal Fee') {
                        this.newInvoice.share = 0;
                        // let percentage = parseFloat(this.newInvoice.shareAmount) / 100;
                        // let tot = parseFloat(element.FWT.toString()) * parseFloat(percentage.toString());
                        this.newInvoice.shareAmount = '0';
                    }
                }


            }
        }
        catch (e) {

            console.log('Exception***', e)

        }

        //code for saving to invoice
        this.newInvoice.feesItem = this.newdba.feesItem;
        this.newInvoice.invoiceId = counter.toString();
        this.newInvoice.dbaNo = this.newdba.dbaNo;
        this.newInvoice.CourseCode = this.newdba.courseCode;
        this.newInvoice.CenterCode = this.newdba.centerCode;
        this.newInvoice.CenterId = this.newdba.centerId;
        this.newInvoice.dbaAmount = this.newdba.despatchAmount;
        this.newInvoice.feeAmount = this.newdba.fwt;
        this.newInvoice.despatchDate = this.newdba.despatchDate;
        this.newInvoice.feesItem = this.newdba.feesItem;
        this.newInvoice.dbaMonth = this.newdba.despatchMonth;
        this.newInvoice.isdbaEntered = this.newdba.isdbaEntered;
        this.newInvoice.isInvoiceEntered = false;
        // this.newInvoice.batchNo = this.batchNo;
        this.newInvoice.invAmtPending = false;



        let invoiceEntryJson = JSON.stringify(this.newInvoice);
        console.log(invoiceEntryJson);
        try {
            this.db.database.ref('invoice').child(this.newdba.dbaId).set(invoiceEntryJson);
        }
        catch (ex) {

        }
        alert('dba Added :' + this.newdba.dbaNo);
        // this.router.navigate(['/dba-no-entry']);
        // this.selectedData = null;

        this.resetform();
        for (let i = 0; i <= this.desplist.length; i++) {
            this.desplist.splice(i, this.desplist.length);
        }

    }
    dbaCalculation(totalamount, taxamount, feeWt, Amount, Rate, feesitem) {



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

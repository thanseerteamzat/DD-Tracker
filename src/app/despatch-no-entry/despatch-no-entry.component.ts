import { Component, OnInit } from '@angular/core';
import { ddList, ddEntry, CheckTemp, temp } from '../models/ddEntry';
import { Center } from '../models/Center';
import { Common } from '../models/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { EtsService } from "src/app/services/ets.service";
import { Router } from '@angular/router';
import { desptchLastid } from '../models/despatchlastId';
import { Despatch } from '../models/despatch';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { element } from 'protractor';


@Component({
    selector: 'app-despatch-no-entry',
    templateUrl: './despatch-no-entry.component.html',
    styleUrls: ['./despatch-no-entry.component.css']
})
export class DespatchNoEntryComponent implements OnInit {
    newddEntry: ddEntry = new ddEntry();
    selectedDatatemp;
    ddLists: ddList[] = [];
    centerList: Center[] = [];
    centers: Center[] = [];
    selectedcenter: string = "";
    selectedData: Array<ddList>;
    centerData;
    checklist: CheckTemp[] = [];
    tempentry
    ddtotal;
    despatchLastids: desptchLastid[] = [];
    newddLastId: desptchLastid = new desptchLastid();
    despatch: Despatch = new Despatch();
    count;
    fromLastId;
    checklisttotal;
    temp: temp[] = []
    tempdesplist;
    feesItems = [
        { id: '1', name: 'Course Fee' },
        { id: '2', name: 'Prospectus' },
        { id: '3', name: 'Re exam' },
        { id: '4', name: 'Renewal Fee' },
        { id: '5', name: 'Affiliation' },
        { id: '6', name: 'Inspection' },
        { id: '7', name: 'Duplicate Certificate/Marklist' },
    ];
    selectedFeee;
    selectedFee;
    entered: string;
    tempcenter;
    tempcentercode;
    year;
    selectfee;
    checklistddTotal;
    despatchLists: Despatch[] = [];
    checklisttemp;
    index;
    constructor(private db: AngularFireDatabase,
        private ets: EtsService,
        private router: Router,
        private fb: FormBuilder
    ) {
        this.despatchcreateForm();
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



        let itemRef = db.object('ddEntry');
        itemRef.snapshotChanges().subscribe(action => {
            this.ddLists = [];
            var quatationsList = action.payload.val();
            let quotationobj = Common.snapshotToArray(action.payload);
            quotationobj.forEach(element => {
                let ddListItem = new ddList();
                let qobj: ddEntry = JSON.parse(element);
                // console.log("****" + element);
                if (qobj.dduId != undefined) {
                    qobj.dduId = qobj.dduId.replace("/", "");
                }
                // this.newddEntry = qobj;
                ddListItem.ddenter = qobj;

                let centList = this.ets.centerList.filter(s => s.Id == (qobj.centerId));

                if (centList.length > 0) {
                    ddListItem.center = centList[0];

                    // console.log('selected****', this.selectedCenter)
                }

                this.ddLists.push(ddListItem);

                // console.log('**********', this.selectedData)

            });

        });

        //code for listing ddLastid
        let dlRef = db.object('despatchLastId');
        dlRef.snapshotChanges().subscribe(action => {
            var quatationsList = action.payload.val();
            let obj = Common.snapshotToArray(action.payload);
            this.despatchLastids = [];
            obj.forEach(element => {
                let obj: desptchLastid = JSON.parse(element);
                this.newddLastId = obj;
                this.despatchLastids.push(obj as desptchLastid);
                // console.log('aaaaaaaaaaaaaaaaaaaa', this.ddLastids)
                this.count = obj.lastId;
                this.fromLastId = obj.Id;

            });
        });

        let dlsRef = db.object('Despatch');
        dlsRef.snapshotChanges().subscribe(action => {
            var quatationsList = action.payload.val();
            let obj = Common.snapshotToArray(action.payload);
            this.despatchLists = [];
            obj.forEach(element => {
                let obj: Despatch = JSON.parse(element);
                // this.newddLastId = obj;
                this.despatchLists.push(obj as Despatch);
                // console.log('aaaaaaaaaaaaaaaaaaaa', this.ddLastids)
                // this.count = obj.lastId;
                // this.fromLastId = obj.Id;

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

    ngOnInit() {
        // if (this.ets.cookievalue == "3") {
        //   // this.router.navigate(['/despatch-no-entry'])
        // }
        // else {
        //   this.router.navigate(['/error']);
        // }
        this.entered = this.ets.cookiename;
        this.despatch.enteredBy = this.entered;
        console.log('cookiename****', this.despatch.enteredBy)
    }
    filterCenter(key) {


        let centerResponse = this.ets.centerList;
        //  Iterate throw all keys.
        for (let cent of centerResponse) {

            this.centerList.push(cent);

        }
        try {

            for (let i = 0; i <= this.centerList.length; i++) {
                this.tempcenter = this.centerList[i];
                if (this.tempcenter.Id == key) {
                    this.tempcentercode = this.tempcenter.CenterCode;
                    console.log('successs****', this.tempcentercode);

                }
            }

        }
        catch (e) {

        }
        console.log('successs**/**', this.tempcenter);
        this.selectedcenter = key;
        this.selectedData = null;
        if (this.selectfee == null) {
            this.selectedData = this.ddLists.filter(s => s.ddenter.centerId == key && s.ddenter.isVerified == true && s.ddenter.isdespatchEntered == null);

            for (let i = 0; i <= this.checklist.length; i++) {
                this.checklist.splice(i, this.checklist.length);
            }

        }
        else {
            this.selectedData = this.ddLists.filter(s => s.ddenter.feesItem == this.selectfee && s.ddenter.centerId == this.selectedcenter && s.ddenter.isVerified == true && s.ddenter.isdespatchEntered == null)
            for (let i = 0; i <= this.checklist.length; i++) {
                this.checklist.splice(i, this.checklist.length);
            }
        }

    }




    filterFee(key) {
        this.selectfee = key;
        this.selectedData = null;
        if (this.selectedcenter == null) {
            this.selectedData = this.ddLists.filter(s => s.ddenter.feesItem == this.selectfee && s.ddenter.isVerified == true && s.ddenter.isdespatchEntered == null);

            for (let i = 0; i <= this.checklist.length; i++) {
                this.checklist.splice(i, this.checklist.length);
            }

        }
        else {
            this.selectedData = this.ddLists.filter(s => s.ddenter.feesItem == this.selectfee && s.ddenter.centerId == this.selectedcenter && s.ddenter.isVerified == true && s.ddenter.isdespatchEntered == null)
            for (let i = 0; i <= this.checklist.length; i++) {
                this.checklist.splice(i, this.checklist.length);
            }
        }

    }

    chechlistTotal(checklist) {
        for (let i = 0; i <= checklist.length; i++) {

            this.checklisttemp = checklist[i];
            if (this.checklisttemp != null) {
                this.checklistddTotal = parseFloat(this.checklistddTotal) + parseFloat(this.checklisttemp.Amount);
            }
        }
    }
    onClick(event, temp, ddEntry: ddEntry) {
        console.log('id', temp)
        if (event == true) {
            // for (let i = 0; i != temp.length; i++) {
            // console.log('index', index)

            this.checklist.push(ddEntry);

            this.checklisttotal = this.checklist.length;
            this.checklistddTotal = 0;
            this.chechlistTotal(this.checklist)
            console.log('0000', this.checklist)

            console.log('1111', this.checklistddTotal)

        }

        else if (event == false) {

            if (temp != null) {
                // this.checklist.pop();
                // console.log('index', index)
                console.log('id', temp)

                this.index = this.checklist.findIndex(list => list.ddlastId == temp)
                this.checklist.splice(this.index,1)
                this.checklisttotal = this.checklist.length;

                this.checklistddTotal = 0;
                console.log('0000', this.index)

                this.chechlistTotal(this.checklist)
                console.log('checklist', this.checklist)
            }
        }
    }


    beforeRegister(key) {
        console.log('center***', this.selectedcenter)

        var despatchnoExists = false;
        var list = this.despatchLists;
        let todaydate = new Date();
        this.year = todaydate.getFullYear();
        let nextyear = this.year + 1;
        let stnextyear = nextyear.toString();
        let styear = this.year.toString()
        var splityear = styear.slice(-2)
        var splitnextyear = stnextyear.slice(-2);
        console.log(list)
        var despformat = "IDE/" + this.tempcentercode + "/" + this.newddEntry.despatchNo + "/" + splityear + "-" + splitnextyear;
        this.despatch.despatchNo = despformat;
        // this.despatch.despatchNo
        for (let i = 0; i <= this.despatchLists.length; i++) {
            this.tempdesplist = this.despatchLists[i];

            if (this.tempdesplist != null && this.tempdesplist.despatchNo == this.despatch.despatchNo) {
                despatchnoExists = true;
                break;
            }
        }
        if (despatchnoExists == false) {
            console.log('ssss', despformat);
            console.log(despatchnoExists)
            console.log('despatch entry')
            this.register(key);
        }
        else {
            alert('despatch number duplication');
            this.resetForm();
        }
        {

        }


    }
    register(key) {
        if (key != null) {
            this.ddtotal = 0;

            try {
                for (let i = 0; i <= this.checklist.length; i++) {
                    let todaydate = new Date();
                    this.year = todaydate.getFullYear();
                    let nextyear = this.year + 1;
                    let stnextyear = nextyear.toString();
                    let styear = this.year.toString()
                    var splityear = styear.slice(-2)
                    var splitnextyear = stnextyear.slice(-2);
                    console.log('split ....', splitnextyear)
                    var despformat = "IDE/" + this.tempcentercode + "/" + this.newddEntry.despatchNo + "/" + splityear + "-" + splitnextyear;

                    this.tempentry = this.checklist[i];
                    this.ddtotal = this.ddtotal + parseInt(this.tempentry.Amount);
                    console.log('total*****', this.ddtotal)
                    this.tempentry.despatchNo = despformat;
                    this.tempentry.despatchDate = this.formatDate(this.newddEntry.despatchDate);
                    this.tempentry.isdespatchEntered = true;
                    // this.tempentry.despId = key;
                    var updates = {}

                    updates['/ddEntry/' + this.tempentry.ddlastId] = JSON.stringify(this.tempentry);
                    try {

                        let up = this.db.database.ref().update(updates);
                        // this.router.navigate(['/despatch-no-entry'])
                    }
                    catch (e) {

                    }
                    //despatch table entry code 


                    var counter = parseInt(this.count) + 1;
                    var updates = {};
                    this.newddLastId.lastId = counter;
                    updates['/despatchLastId/' + key] = JSON.stringify(this.newddLastId);
                    let up = this.db.database.ref().update(updates);

                    //inserting despatch to despatch table

                    this.despatch.centerCode = this.tempcentercode;
                    console.log('centercode .....', this.despatch.centerCode)
                    if (this.ddtotal != 0) {

                        let feeWT = parseFloat(this.ddtotal) / 1.18;
                        let feewtfloat = feeWT.toFixed(2);
                        let taxamount = parseFloat(this.ddtotal) - parseFloat(feewtfloat);
                        let taxfloat = taxamount.toFixed(2);
                        this.despatch.centerId = this.selectedcenter;
                        this.despatch.despId = counter.toString();
                        this.despatch.despatchDate = this.formatDate(this.newddEntry.despatchDate);
                        this.despatch.despatchNo = despformat;
                        this.despatch.feeItem = this.tempentry.feeItem;
                        this.despatch.isdespatchEntered = true;
                        this.despatch.totalAmount = this.ddtotal;
                        this.despatch.taxAmount = parseFloat(taxfloat);
                        this.despatch.FWT = parseFloat(feewtfloat);
                        //calculating dba rate and amount

                        if (this.tempentry.feesItem == "Course Fee") {

                            this.despatch.Rate = 65;
                            let rate = (parseFloat(this.despatch.FWT.toString()) * parseFloat(this.despatch.Rate.toString())) / 100;
                            let frate = rate.toFixed(2);
                            this.despatch.Amount = parseFloat(frate);
                        }
                        else if (this.tempentry.feesItem == "Inspection") {
                            this.despatch.Rate = 60;
                            let rate = (parseFloat(this.despatch.FWT.toString()) * parseFloat(this.despatch.Rate.toString())) / 100;
                            let frate = rate.toFixed(2);
                            this.despatch.Amount = parseFloat(frate);

                        }
                        else {
                            this.despatch.Rate = 80;
                            let rate = (parseFloat(this.despatch.FWT.toString()) * parseFloat(this.despatch.Rate.toString())) / 100;
                            let frate = rate.toFixed(2);
                            this.despatch.Amount = parseFloat(frate);

                        }

                        this.despatch.feeItem = this.tempentry.feeItem;
                        let ddEntryJson = JSON.stringify(this.despatch);
                        console.log(ddEntryJson);
                        try {
                            this.db.database.ref('Despatch').child(this.despatch.despId).set(ddEntryJson);
                            // alert("DD Entry added successfully!!.");
                            // this.router.navigate(['/dd-entry']);
                        }
                        catch (ex) {

                        }
                    }
                    // code for zero amount
                    else {

                        this.despatch.centerId = this.selectedcenter;
                        this.despatch.despId = counter.toString();
                        this.despatch.despatchDate = this.formatDate(this.newddEntry.despatchDate);
                        this.despatch.despatchNo = despformat;
                        this.despatch.feeItem = this.tempentry.feeItem;
                        this.despatch.isdespatchEntered = true;
                        this.despatch.totalAmount = this.ddtotal;
                        this.despatch.taxAmount = 0;
                        this.despatch.FWT = 0;
                        //calculating dba rate and amount

                        if (this.tempentry.feesItem == "Course Fee") {

                            // this.despatch.Rate = 65;
                            // let rate = (parseFloat(this.despatch.FWT.toString()) * parseFloat(this.despatch.Rate.toString())) / 100;
                            // let frate = rate.toFixed(2);
                            this.despatch.Amount = 0;
                        }
                        else if (this.tempentry.feesItem == 'Inspection') {
                            // this.despatch.Rate = 60;
                            // let rate = (parseFloat(this.despatch.FWT.toString()) * parseFloat(this.despatch.Rate.toString())) / 100;
                            // let frate = rate.toFixed(2);
                            this.despatch.Amount = 0;

                        }
                        else {
                            // this.despatch.Rate = 80;
                            // let rate = (parseFloat(this.despatch.FWT.toString()) * parseFloat(this.despatch.Rate.toString())) / 100;
                            // let frate = rate.toFixed(2);
                            this.despatch.Amount = 0;

                        }

                        this.despatch.feeItem = this.tempentry.feeItem;

                        let ddEntryJson = JSON.stringify(this.despatch);
                        console.log(ddEntryJson);
                        try {
                            this.db.database.ref('Despatch').child(this.despatch.despId).set(ddEntryJson);
                            // alert("DD Entry added successfully!!.");
                            // this.router.navigate(['/dd-entry']);
                        }
                        catch (ex) {

                        }
                    }

                }
            }
            catch (e) {
                console.log('Exception..', e);
            }
            alert('despatch Added :' + this.despatch.despatchNo);
            for (let i = 0; i <= this.checklist.length; i++) {
                this.checklist.splice(i, this.checklist.length);
            }

            console.log('clearedlist', this.checklist)
            this.resetForm();

        }
        else {
            alert('Error in updating details');
            // this.router.navigate
        }


    }

    //validation codes 

    despatchform = new FormGroup({
        despatchno: new FormControl(),
        // despatchbox: new FormControl()
    })

    despatchcreateForm() {
        this.despatchform = this.fb.group(
            {

                despatchNo: [null, Validators.compose([Validators.required, Validators.pattern('[0-9 //]*')])],
                // despatchbox: [null, Validators.requiredTrue],
                despatchdate: [false, Validators.required]
            }
        )
    }
    get despatchNo() { return this.despatchform.get('despatchNo'); }
    // get despatchbox() { return this.despatchform.get('despatchbox'); }
    get despatchdate() { return this.despatchform.get('despatchdate'); }

    resetForm() {
        this.despatchform.reset(
            {
                despatchNo: null,
                // despatchbox: null,
                despatchdate: null

            }
        )
    }

}

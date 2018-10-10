export class sroEntry{

    sroId:string;
    date:string;
    enteredDate:string;
    time:string;
    enteredBy:string;
    isddCollected:string;
    feesItem:string;
    applicationNumber:string;
    courseName:string;
    studentName:string;
    ddNumber:string;
    bank:string;
    ddAmount:number;
    remarks:string;
    centerName:string
}

export class sroEntryList {
    ddenter: sroEntry = new sroEntry();
    // center: Center = new Center();

}

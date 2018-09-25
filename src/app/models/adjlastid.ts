import { Input } from "@angular/core";
import { Center } from '../models/Center';
import { Course } from '../models/Course';

export class adjddLastid
{
    Id:string;
    lastId :string;
}

export class adjddList {
    ddenter: adjddEntry = new adjddEntry();
    center: Center = new Center();

}

export class adjddEntry{

    dduId: string; //guid
    ddlastId: string; //ddId updation

    dDate: string;
    centerId: string;
    centerName: string;
    courseName: string;

    ddNumber: string;
    appNo: string;
    studentName: string;
    ddDate: string;
    Amount: string;
    bank: string;
    enteredBy: string;
    feesItem: string;
    isVerified: boolean; //use for dd verification
    isidVerified: boolean; //used for dd id verification
    isddIdentered: boolean; //used for ddId entry
    ddId: string; //dd Id entry 
    ddRollNo: string;
    despatchNo: string;
    despatchDate: string;
    dbaNo: string;
    entryPros: boolean;
    prosvalue: boolean;
    secondphase: boolean;
    isdespatchEntered: boolean;
    taxValue: string;
    feeWT: string;
    isddCanceled:boolean;
}

export class adjCheckTemp {
    dduId: string; //guid
    ddlastId: string; //ddId updation

    dDate: string;
    centerId: string;
    centerName: string;
    courseName: string;

    ddNumber: string;
    appNo: string;
    studentName: string;
    ddDate: string;
    Amount: string;
    bank: string;
    enteredBy: string;
    feesItem: string;
    isVerified: boolean; //use for dd verification
    isidVerified: boolean; //used for dd id verification
    isddIdentered: boolean; //used for ddId entry
    ddId: string; //dd Id entry 
    ddRollNo: string;
    despatchNo: string;
    despatchDate: string;
    dbaNo: string;
    entryPros: boolean;
    prosvalue: boolean;
    secondphase: boolean;
    isdespatchEntered: boolean;
    taxValue: string;
    feeWT: string;

}

export class adjtemp {
    dduId: string; //guid
    ddlastId: string; //ddId updation

    dDate: string;
    centerId: string;
    centerName: string;
    courseName: string;

    ddNumber: string;
    appNo: string;
    studentName: string;
    ddDate: string;
    Amount: string;
    bank: string;
    enteredBy: string;
    feesItem: string;
    isVerified: boolean; //use for dd verification
    isidVerified: boolean; //used for dd id verification
    isddIdentered: boolean; //used for ddId entry
    ddId: string; //dd Id entry 
    ddRollNo: string;
    despatchNo: string;
    despatchDate: string;
    dbaNo: string;
    entryPros: boolean;
    prosvalue: boolean;
    secondphase: boolean;
    isdespatchEntered: boolean;
    taxValue: string;
    feeWT: string;
}
export class adjddentryTemp
{
    ddNumber: string;
    ddDate: string;
    bank: string;

}
export class adjdesptchLastid
{
    Id:string;
    lastId :number;
}





export class adjDespatch {
    despId: string
    despatchNo: string; // unique id
    despatchDate: string;
    centerId: string;
    centerCode: string;
    feeItem: string;
    totalAmount: Number; //total of dd's of despatch number of a center
    taxAmount: Number; // 18% tax from total amount
    FWT: Number //fee without tax
    Amount: Number;
    Rate: Number;
    enteredBy: string;
    isdespatchEntered: boolean;
    dbaNo: string;
    dbaDate:string;
    isdbaEntered: boolean;


}
export class adjdespatchList {
    center: Center = new Center();
    despatchList: adjDespatch = new adjDespatch();
    taxlist: adjtaxtemp = new adjtaxtemp();
}
export class adjtaxtemp {
    Id: string;
    taxamount: string;
}
export class adjdespatchtemp {
    despId: string
    despatchNo: string; // unique id
    despatchDate: string;
    centerId: string;
    centerCode: string;
    feeItem: string;
    totalAmount: Number; //total of dd's of despatch number of a center
    taxAmount: Number; // 18% tax from total amount
    FWT: Number //fee without tax
    Amount: Number;
    Rate: Number;
    enteredBy: string;
    isdespatchEntered: boolean;
    dbaNo: string;
    dbaDate:string;
    isdbaEntered: boolean;}

export class adjdbatemp {
    dbano: string;
}





export class adjdbaEntry {

    dbaId: string;
    dbaNo: string;
    dbaDate: string;
    centerId: string;
    centerCode: string;
    courseCode: string;
    feesItem: string;
    despatchNo: string;
    despatchMonth: string;
    despatchDate: string;
    despatchAmount: string;
    tax: string;
    fwt: string;
    stkAmount: string;
    stkRate: string;
    enteredBy: string;
    isdbaEntered: boolean;


}

export class adjdbaList {
    dbaenter: adjdbaEntry = new adjdbaEntry();
    center: Center = new Center();
}

export class adjdbaLastid {
    id: string;
    lastId: Number;
}

export class adjInvoice {

    invoiceId: string;
    dbaNo: string;
    CourseCode: string;
    feesItem: string;
    CenterCode: string;
    CenterId: string;
    dbaAmount: string;
    despatchDate: string;
    feeAmount: string;
    share: Number;
    shareAmount: string;
    isdbaEntered: boolean;
    enteredby: string;
}

export class adjinvoiceList {
    invoiceenter: adjInvoice = new adjInvoice();
    center: Center = new Center();
}
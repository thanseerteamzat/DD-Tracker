import { Input } from "@angular/core";
import { Center } from '../models/Center';
import { Course } from '../models/Course';

export class adjddLastid
{
    Id:string;
    lastId :number;
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

export class CheckTemp {
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
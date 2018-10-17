import { Center } from "./Center";
import { Despatch } from "./despatch";

export class dbaEntry {

    dbaId: string;
    dbaNo: string;
    dbaDate: string;
    centerId: string;
    centerCode: string;
    courseCode: string;
    feesItem: string;
    despatchNo: string;
    batchNo: string;
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

export class dbaList {
    dbaenter: dbaEntry = new dbaEntry();
    center: Center = new Center();
    despList: Despatch[] = new Array();

}
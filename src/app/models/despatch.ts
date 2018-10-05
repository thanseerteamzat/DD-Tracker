import { Center } from "./Center";

export class Despatch {
    despId: string
    noOfdd: string;
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
    dbaDate: string;
    ackno: string;
    isdbaEntered: boolean;


}
export class despatchList {
    center: Center = new Center();
    despatchList: Despatch = new Despatch();
    taxlist: taxtemp = new taxtemp();
}
export class taxtemp {
    Id: string;
    taxamount: string;
}
export class despatchtemp {
    despId: string
    noOfdd: string;
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
    dbaDate: string;
    ackno: string;
    isdbaEntered: boolean;

}

export class dbatemp {
    dbano: string;
}
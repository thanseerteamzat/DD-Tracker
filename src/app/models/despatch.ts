import { Center } from "./Center";

export class Despatch {
    despatchNo: string; // unique id
    despatchDate: string;
    centerId: string;
    feeItem: string;
    totalAmount: Number; //total of dd's of despatch number of a center
    taxAmount: Number; // 18% tax from total amount
    FWT: Number //fee without tax
    enteredBy: string;
    isdespatchEntered: boolean;


}
export class despatchList {
    center: Center = new Center();
    despatchList: Despatch = new Despatch();
}
export class KKCDespatchData {
    public Data = new Array<KKCDespatch>();
}
 
export class KKCDespatch {
    despId: string// unique id
    noOfdd: string;
    despatchNo: string;
    despatchDate: string;
    centerName: string;
    centerCode: string;
    feeItem: string;
    totalAmount: Number; //total of dd's of despatch number of a center
    taxAmount: Number; // 18% tax from total amount
    FWT: Number //fee without tax
    Amount: Number;//despatch share
    Rate: Number;
    enteredBy: string;
    isdespatchEntered: boolean;
    dbaNo: string;
    dbaDate: string;
    ackno: string;
    batchNo: string;
    isdbaEntered: boolean;
    isackEntered: boolean;
}
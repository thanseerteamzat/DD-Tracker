import { Center } from "./Center";

export class Invoice {

    invoiceId: string;
    dbaNo: string;
    batchNo: string;
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
    dbaMonth: string;
    isInvoiceEntered: boolean;
    invoiceNo: string;
    invoiceDate: string;
    invAmtPending: boolean;
    enteredby: string;
    invoiceGeneratedBy: string;
}

export class invoiceList {
    invoiceenter: Invoice = new Invoice();
    center: Center = new Center();
}

export class InvoiceAmountPending {
    constructor() {
        // this.totalAmount = 0;
        this.shareAmount = 0;
        // this.totalAmount = 0;
        // this.TDS = 0;
        // this.difference = 0;
        // this.taxAmount = 0;

    }
    invoiceDate: string;
    invoiceNo: string;
    ackDate: string;
    shareAmount: number;
    taxAmount: number;
    totalAmount: number;
    TDS: number;
    amountTobeRecieved: number;
    recievedAmount: number;
    recievedDate: string;
    difference: number;
    dateDifference: string;
    invAmtPending:boolean;
    enteredBy: string;
}
export class invAmtPndgLastid {
    id: string;
    lastid: number;
}
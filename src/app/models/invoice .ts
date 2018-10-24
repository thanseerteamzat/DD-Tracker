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
    incomeTaxTDS: number;
    gstTDS: number;
    amountTobeRecieved: number;
    recievedAmount: number;
    recievedDate: string;
    difference: number;
    dateDifference: string;
    invAmtPending: boolean;
    enteredBy: string;
}
export class invAmtPndgLastid {
    id: string;
    lastid: number;
}

export class InvoiceCenterList2Data {
    public Data = new Array<InvoiceCenterList2>()
}
export class InvoiceCenterList2 {
    constructor() {
        this.dbaAmount = 0;
        this.shareAmount = 0;
        // this.TDS = 0;
        // this.difference = 0;
        // this.taxAmount = 0;

    }
    dbaNo: Array<String> = [];
    // dbaNo:string
    InvoiceNo: string;
    centerInvoiceNo: string;
    nextInvoiceNo: number;
    centerName: string;
    invoiceMonth: string;
    dbaAmount: number;
    shareAmount: number;
    taxableAmount: number;
    invoiceDate: string;
    isgstValue: number;
    invAmtPending: boolean;
    enteredBy: string;
}

export class tempInvCenterList2 {
    constructor() {
        this.dbaAmount = 0;
        this.shareAmount = 0;
        // this.TDS = 0;
        // this.difference = 0;
        // this.taxAmount = 0;

    }
    dbaNo: Array<String> = [];
    InvoiceNo: string;
    centerInvoiceNo: string;
    nextInvoiceNo: number;
    centerName: string;
    invoiceMonth: string;
    dbaAmount: number;
    shareAmount: number;
    invoiceDate: string;
    isgstValue: number;
    invAmtPending: boolean;
    enteredBy: string;
}

export class centerInvNoChkList {
    InvoiceNo: string;
    centerInvoiceNo: string;
    nextInvoiceNo: number;
    centerName: string;
    invoiceMonth: string;
}
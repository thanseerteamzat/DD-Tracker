import { Center } from "./Center";

export class Invoice {

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
    dbaMonth: string;
    isInvoiceEntered: boolean;
    invoiceNo: string;
    invoiceDate:string;
    enteredby: string;
}

export class invoiceList {
    invoiceenter: Invoice = new Invoice();
    center: Center = new Center();
}
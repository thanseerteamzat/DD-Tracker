import { Center } from "./Center";

export class InvoiceEntry {
invoiceEntryId:String;
centerName:string;
inwardItem:string;
date:string;
invoiceNumber:string;
invoiceDate:string;
month:string;
remarks:string;
enteredBy:string;

}

export class invoiceentryList {
    ddenter: InvoiceEntry = new InvoiceEntry();
    center: Center = new Center();

}

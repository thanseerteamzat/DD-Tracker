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
// dbaNo:string;
taxableAmount:string;
verifiedBy:string;
isVerified:boolean;

}

export class invoiceentryList {
    ddenter: InvoiceEntry = new InvoiceEntry();
    center: Center = new Center();

}

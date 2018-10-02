import { Center } from "./Center";

export class ddfromKKC {

    slno:string;
 id:string;
TotalAmount:string;
Bank:string;
DDNumber:string;
DDDate:string;
EnteredOn:string;
ReceiptNo:string;
FeeType:string;
Installment:string;
CenterCode:string;
CenterName:string;
CenterCategory:string;
StudentRollNo:string;
StudentName:string;
StudentApplicationNumber:string;
CourseName:string;
}

export class kkcddList {
    ddenter: ddfromKKC = new ddfromKKC();
    center: Center = new Center();

}
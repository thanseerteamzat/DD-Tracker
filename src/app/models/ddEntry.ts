import { Center } from "./Center";

export class ddEntry {
    dduId: string; //guid
    ddlastId: string; //ddId updation

    dDate: string;
    centerId: string;
    centerName:string;
    courseName:string;
    
    ddNumber: string;
    appNo:string;
    studentName: string;
    ddDate: string;
    Amount: string;
    bank: string;
    enteredBy: string;
    feesItem: string;
    isVerified: boolean; //use for dd verification
    isidVerified:boolean; //used for dd id verification
    isddIdentered: boolean; //used for ddId entry
    ddId: string; //dd Id entry 
    ddRollNo: string;
    despatchNo: string;
    despatchDate :string;
    dbaNo: string;

}
export class ddList {
    ddenter: ddEntry = new ddEntry();
    center: Center = new Center();
    

}
export class CheckTemp
{
    dduId: string; //guid
    ddlastId: string; //ddId updation

    dDate: string;
    centerId: string;
    centerName:string;
    courseName:string;
    
    ddNumber: string;
    appNo:string;
    studentName: string;
    ddDate: string;
    Amount: string;
    bank: string;
    enteredBy: string;
    feesItem: string;
    isVerified: boolean; //use for dd verification
    isidVerified:boolean; //used for dd id verification
    isddIdentered: boolean; //used for ddId entry
    ddId: string; //dd Id entry 
    ddRollNo: string;
    despatchNo: string;
    despatchDate :string;
    dbaNo: string;
}
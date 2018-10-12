import { Center } from "./Center";

export class ddDespatchAck {
    ackNo: string;
    centerId: string;
    despatchNo: string;
    ackdate: string;
    despatchDatee: string;
    noOfDD: string;
    totalAmount: string;
    preparedBy: string;
}

export class despackList {
    despacklist: ddDespatchAck = new ddDespatchAck();
    center: Center = new Center();
}
export class ackLastid
{
    id:string;
    lastid :Number;
}
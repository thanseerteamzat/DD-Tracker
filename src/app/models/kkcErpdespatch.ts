import { Center } from "./Center";
import { erpDespatch } from "./erpdespatch";
export class erpData {
    public Data = new Array<kkcerpDespatch>()
}
export class kkcerpDespatch {
    ID:number;
    unique :string;
    date: string;
    erpdespNo: String;
    centerName: string;
    erpdate: string;
    noofDd: String;
    erpAmount: string;
    remarks: string;
    isEditable: Boolean;
    isentered: Boolean;
    isdespatchEntered: boolean;
}
export class kkcerpdespatchList {
    ddenter: kkcerpDespatch = new kkcerpDespatch();
    center: Center = new Center();

}
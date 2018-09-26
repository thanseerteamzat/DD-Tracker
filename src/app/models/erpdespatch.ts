export class erpDespatch {

    erpdespId:String;
    date:string;
    erpdespNo:String;
    centerName:string;
    erpdate:string;
    noofDd:String;
    erpAmount:string;
    remarks:string;
    isEditable:Boolean;
    isentered:Boolean;
}
export class erpdespatchList {
    ddenter: erpDespatch = new erpDespatch();
    // center: Center = new Center();

}
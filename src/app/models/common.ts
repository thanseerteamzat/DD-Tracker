export class Common {
    public static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    public static snapshotToArray(snapshot) {
        var returnArr = [];
        snapshot.forEach(function (childSnapshot) {
            var item = childSnapshot.val();
            returnArr.push(item);
        });
        return returnArr;
    }
}

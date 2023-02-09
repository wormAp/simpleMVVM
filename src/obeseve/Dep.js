/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
let uuid = 0;
export default class Dep {
    static target = null;
    constructor() {
        this._id = ++uuid;
        this._subs = [];
        this._subsMap = new Map();
    }

    subscribe(){
        if(Dep.target && !this._subsMap.has(Dep.target.id)){
            this._subsMap.set(Dep.target.id,Dep.target);
            this._subs.push(Dep.target);
        }
    }
    notify(){
        this._subs.forEach((watch)=>{
            watch.update();
        })
    }
}

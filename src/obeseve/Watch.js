/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import genGet from "../util/genGet";
import Dep from "./Dep";
let uuid= 0
export default class Watch {
    constructor(data,exp,cb) {
        this.id = ++uuid;
        this.get = genGet(exp);
        this.cb = cb;
        this.data = data;
        this.val = this.getVal();
    }
    getVal(){
        try {
            Dep.target = this;
            let val = this.get(this.data);
            return val;
        }finally {
            Dep.target = null;
        }
    }
    update(){
        let val = this.getVal();
        if(typeof val == "object" || val!==this.val){
            if(this.cb instanceof Function){
                this.cb(this.val,val);
                this.val = val;
            }
        }
    }
}

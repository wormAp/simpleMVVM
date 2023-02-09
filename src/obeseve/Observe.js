/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import arrayProp from "./proxyArray";
import observer from "./observer";
import Dep from "./Dep";
function def(obj,key,val) {
    Object.defineProperty(obj,key,{
        value:val,
        enumerable:false,
        writable:true
    })
}
function defineProp(obj,key,val) {
    if(val === undefined){
        val = obj[key];
    }
    let dep = new Dep();
    let childOB = observer(obj[key]);
    Object.defineProperty(obj,key,{
        get() {
            if(Dep.target){
                dep.subscribe();
                if(childOB){childOB.dep.subscribe()}
            }
            return val;
        },
        set(newVal){
            if(newVal === val){return;}
            val = newVal;
            dep.notify();
            observer(newVal);
        }
    })
}
export default class Observe {
    constructor(obj) {
        def(obj,"__ob__",this);
        def(this,"dep",new Dep());
        if(Array.isArray(obj)){
            Object.setPrototypeOf(obj,arrayProp);
            this.walkArr(obj);
        }else{
            this.walk(obj);
        }
    }
    walkArr(arr){
        arr.forEach((item)=>{
            observer(item);
        });
    }
    walk(obj){
        Object.keys(obj).forEach((key)=>{
            defineProp(obj,key);
        });
    }
}

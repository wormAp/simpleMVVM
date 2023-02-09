/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
const methods = [
    "push",
    "pop",
    "shift",
    "unshift",
    "splice",
    "sort",
    "reverse"
];
const arrayProp = Object.create(Array.prototype);

methods.forEach((method)=>{
   let org = arrayProp[method];
    arrayProp[method] = function () {
        let result = org.call(this,...arguments);
        let add = [];
        let arg = [...arguments];
        switch (method) {
            case "push":
            case "unshift":
                add = arg;
                break;
            case "splice":
                add = arg.slice(2)
                break;
        }
        this.__ob__.walkArr(add);
        this._ob__.dep.notify();
        return result;
    }
});
export default arrayProp;

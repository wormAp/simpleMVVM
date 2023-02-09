/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
export default function genGet(str) {
    const keys = str.split('.');
    return function (obj) {
        keys.forEach((key)=>{
            obj = obj[key];
        });
        return obj;
    }
}

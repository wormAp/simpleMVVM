/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import Observe from "./Observe";
export default function observer(obj) {
    if(typeof obj !== 'object'){return;}
    let ob;
    if(obj.__ob__){
        ob=obj.__ob__;
    }else{
        ob = new Observe(obj);
    }
    return ob;
}

/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import createVNode from "./createVNode";
import genGet from "../util/genGet";
export default function mixCreate(Tpl) {
    Tpl.prototype.createElement = function (tag,data) {
        let children = [];
        for(let i=2;i<arguments.length;i++){
            children.push(arguments[i]);
        }
        return createVNode(tag,data,children,undefined,undefined);
    }
    Tpl.prototype.createText = function (text) {
        return createVNode("text",{},undefined,text,undefined);
    }
    Tpl.prototype.getText = function (name) {
        let get = genGet(name);
        return get(this);
    }
}

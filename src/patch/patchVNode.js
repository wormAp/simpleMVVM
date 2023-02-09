/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import createVNode from "../vNode/createVNode";
import createElement from "./createElement";
import pathSameVNode from "./pathSameVNode";
export function sameNode(oldVNode,newVNode) {
    return oldVNode.tag === newVNode.tag && oldVNode.key === newVNode.key
}
export default function patchVNode(oldVNode,newVNode) {
    if(typeof oldVNode == 'object' && !oldVNode.tag){
        oldVNode = createVNode(oldVNode.tagName.toLowerCase(),{},undefined,undefined,oldVNode);
    }
    if(sameNode(oldVNode,newVNode)){
        pathSameVNode(oldVNode,newVNode);
    }else{
        let nativeDom = createElement(newVNode);
        oldVNode.elm.parentNode.insertBefore(nativeDom,oldVNode.elm);
        oldVNode.elm.parentNode.removeChild(oldVNode.elm);
    }
    return newVNode;
}

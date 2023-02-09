/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import createElement from "./createElement";
import {sameNode} from "./patchVNode";
function pathChildren(oldVNode,newVNode) {
    let newStartIndex = 0;
    let oldStartIndex = 0;
    let newEndIndex = newVNode.children.length-1;
    let oldEndIndex = oldVNode.children.length-1;
    let newStart = newVNode.children[newStartIndex];
    let oldStart = oldVNode.children[oldStartIndex];
    let newEnd = newVNode.children[newEndIndex];
    let oldEnd = oldVNode.children[oldEndIndex];
    let cache  = null;
    while (newStartIndex<=newEndIndex && oldStartIndex<=oldEndIndex){
        if(newStart === undefined){newStart=newVNode.children[++newStartIndex];continue}
        if(oldStart === undefined){oldStart=oldVNode.children[++oldStartIndex];continue}
        if(newEnd === undefined){newEnd=newVNode.children[--newEndIndex];continue}
        if(oldEnd === undefined){oldStart=oldVNode.children[--oldEndIndex];continue}
        if(sameNode(oldStart,newStart)){
            pathSameVNode(oldStart,newStart);
            oldStart =  oldVNode.children[++oldStartIndex];
            newStart = newVNode.children[++newStartIndex];
        }else if(sameNode(oldEnd,newEnd)){
            pathSameVNode(oldEnd,newEnd);
            newEnd = newVNode.children[--newEndIndex];
            oldEnd = oldVNode.children[--oldEndIndex];
        }else if(sameNode(oldEnd,newStart)){
            pathSameVNode(oldEnd,newStart);
            //move
            oldEnd.elm.parentNode.insertBefore(oldEnd.elm,oldStart.elm);
            newStart = newVNode.children[++newStartIndex];
            oldEnd = oldVNode.children[--oldEndIndex];
        }else if(sameNode(oldStart,newEnd)){
            pathSameVNode(oldStart,newEnd);
            oldStart.elm.parentNode.insertBefore(oldStart.elm,oldEnd.elm.nextElementSibling);
            oldStart =  oldVNode.children[++oldStartIndex];
            newEnd = newVNode.children[--newEndIndex];
        }else{
            if(!cache){
                cache = new Map();
                for(let i = oldStartIndex;i<=oldEndIndex;i++){
                    if(oldVNode.children[i]){
                        cache.set(oldVNode.children[i].key,i);
                    }
                }
            }
            if(cache.has(newStart.key)){
                //移动
                pathSameVNode(oldVNode.children[cache.get(newStart.key)],newStart)
                oldStart.elm.parentNode.insertBefore(oldVNode.children[cache.get(newStart.key)].elm,oldStart.elm);
                oldVNode.children[cache.get(newStart.key)] = undefined;
            }else{
                let dom = createElement(newStart);
                oldEnd.elm.parentNode.insertBefore(dom,oldStart.elm);
            }
            oldStart = oldVNode.children[++oldStartIndex];
        }
    }
    if(oldStartIndex<=oldEndIndex){
        for(let i=oldStartIndex;i<=oldEndIndex;i++){
            if(oldVNode.children[i] != undefined){
                oldVNode.children[i].elm.parentNode.removeChild(oldVNode.children[i].elm);
                // oldVnode.children.splice(i,1);
            }
        }
    }
    else if(newStartIndex<=newEndIndex){
        for(let i=newStartIndex;i<=newEndIndex;i++){
            let dom = createElement(newVNode.children[i]);
            oldEnd.elm.parentNode.insertBefore(dom,oldEnd.elm.nextElementSibling);
        }
    }
}
export default function pathSameVNode(oldVNode,newVNode) {
    newVNode.elm = oldVNode.elm;
    if(newVNode.tag === "text"){
         if(oldVNode.text !== newVNode.text)
            oldVNode.elm.nodeValue = newVNode.text;
    }else if(oldVNode.tag === "text" && (oldVNode.children === undefined || oldVNode.children.length==0)){
        let nativeDom = createElement(newVNode);
        oldVNode.elm.parentNode.insertBefore(nativeDom,oldVNode.elm);
        oldVNode.elm.parentNode.removeChild(oldVNode.elm);
    }else{
        pathChildren(oldVNode,newVNode);
    }
}

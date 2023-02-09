/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
function toStr(cfg) {
    if(typeof cfg !== "object"){return cfg;}
    let result = [];
    Object.keys(cfg).forEach((key)=>{
        result.push(`${key}:${cfg[key]}`);
    });
    return result.join(";");
}
function processAttrs(dom,props) {

    Object.keys(props).forEach((key)=>{
        if(key!=="key"){
            let str = props[key];
            if(key==="style"){
                str = toStr(props[key])
            }
            dom.setAttribute(key,str);
        }
    })
}
export default function createElement(vNode) {
    if(vNode.tag === "text"){
        vNode.elm = document.createTextNode(vNode.text);
        processAttrs(vNode.elm,vNode.data);
        return vNode.elm;
    }else{
        let dom = document.createElement(vNode.tag);
        vNode.children.forEach((cNode)=>{
            dom.appendChild(createElement(cNode));
        });
        vNode.elm = dom;
        processAttrs(vNode.elm,vNode.data.props);
        return dom;
    }
}

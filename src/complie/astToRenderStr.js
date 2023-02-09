/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
function paresAttrs(attrs) {
    let resultAttrs = [];
    attrs.forEach((attr)=>{
        let templeStyles;
        if(attr.name==="style"){
            let temp = {}
            let itemStyles = attr.value.split(";");
            itemStyles = itemStyles.filter((itemStyle)=>itemStyle.trim()!="");
            itemStyles.forEach((itemStyle)=>{
                let [key,val] = itemStyle.split(":");
                temp[key] = val;
            });
            templeStyles = JSON.stringify(temp);
        }else{
            templeStyles = JSON.stringify(attr.value)
        }
        resultAttrs.push(`${attr.name}:${templeStyles}`);
    });
    return `{props:{${resultAttrs.join(',')}}}`
}
function genChildren(node) {
    let children = node.children;
    let result = [];
    children.forEach((item)=>{
        result.push(genCode(item));
    });
    return result.join(',');
}
const nameReg = /\{\{([^{}=<>]+)\}\}/g
function genText(node) {
    let text = node.text;
    let index = 0;
    let match;
    let result = [];
    while (match=nameReg.exec(text)){
        let len = match[0].length;
        if(match.index>index){
            let text = node.text(index,match.index);
            result.push(`"${text}"`);
            result.push(`getText("${match[1]}")`)
        }else{
            result.push(`getText("${match[1]}")`)
        }
        index = match.index+len;
    }
    if(index<node.text.length){
        result.push(`"${node.text.substring(index)}"`);
    }
    return `createText(${result.join("+")})`;
}
function genCode(node) {
    if(node.type==3){
        //text
        return genText(node);
    }else{
        //element
        return `createElement("${node.tagName}",${paresAttrs(node.attrs)},${node.children.length>0?genChildren(node):undefined})`
    }
}
export default function astToRenderStr(ast) {
    let render = new Function(`
        with(this){
            return (${genCode(ast)});
        }
    `);
    return render;
}

function createElement(){}
function createText(){}
function getText(){}

createElement("div",{props:{style:{"text-align":" center"},class:"info infoColor"}},createElement("h1",{props:{style:{"color":" #9f9797","background":" #fff"}}},createText(getText("schoolName")+"中学信息")),createElement("div",{props:{}},createElement("div",{props:{style:{"margin-bottom":" 10px"}}},createText("基本信息")),createElement("div",{props:{class:"mag"}},createElement("div",{props:{style:{"margin-bottom":" 5px"}}},createText("教师信息")),createElement("div",{props:{style:{"margin-bottom":" 5px"}}},createText("教师数量:"),createElement("span",{props:{}},createText(getText("sum")+"人"))),createElement("div",{props:{style:{"margin-bottom":" 5px"}}},createText("高级教师数量:"),createElement("span",{props:{}},createText(getText("number")+"人")))),createElement("div",{props:{class:"mag"}},createText("重点高中上线率>="),createElement("span",{props:{}},createText(getText("rate")))),createElement("div",{props:{class:"mag"}},createText("电话:"),createElement("span",{props:{}},createText(getText("tel")))),createElement("div",{props:{class:"mag"}},createText("地址:"),createElement("span",{props:{}},createText(getText("address"))))))

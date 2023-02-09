import createAstNode from "./createAstNode";

/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
const name = "[a-z|A-Z|_|-][a-z|A-Z|0-9|_|-]*"
//<my-header <header
const tagStartOpenReg = new RegExp(`^\<(?:${name}[:])?(${name})`);
// > />
const tagStartCloseReg =new RegExp(`^\(/)?[^<>=]*>`);
//</my-header> </header>
const tagEndReg = new RegExp(`^\</(?:${name}[:])?(${name})>`);
//data = 'test' data = "test" data = test
const attrReg = new RegExp(`^\\s*(${name})\\s*(?:=)\\s*(?:'([^<>=]+)'|"([^<>=]+)"|([^<>=]+))`);
function toAst(html,options) {
    let tail = html.trim();
    function next(n) {
        tail = tail.substring(n)
    }
    function processStartTag(tagName) {
        const match = {
            tagName:tagName,
            attrs:[]
        };
        let attr;
        while (!tagStartCloseReg.test(tail) && (attr=tail.match(attrReg))){
            match.attrs.push({
                name:attr[1],
                value:attr[2]||attr[3]||attr[4]
            })
            next(attr[0].length);
        }
        let startEnd = tail.match(tagStartCloseReg);
        if(startEnd){
            next(startEnd[0].length)
        }
        return match;
    }
    while (tail){
        let index = tail.indexOf("<");
        if(index===0){
            let tagOpenMatch = tail.match(tagStartOpenReg)
            if(tagOpenMatch){
                next(tagOpenMatch[0].length);
                let match = processStartTag(tagOpenMatch[1]);
                if(options.open){
                    options.open(match.tagName,match.attrs)
                }
                continue;
            }
            let  tagEndMatch = tail.match(tagEndReg);
            if(tagEndMatch){
                next(tagEndMatch[0].length);
                if(options.close){
                    options.close(tagEndMatch[1]);
                }
            }
        }else{
            let text = tail.substring(0,index);
            next(text.length);
            text = text.trim();
            if(text!=""){
                if(options.chart){
                    options.chart(text);
                }
            }
        }
    }
}
export default function htmlToAST(html) {
    let root;
    let stack = [];
    let currentParent;
    let ast = toAst(html,{
        open(tagName,attrs){
            let element = createAstNode(tagName,attrs);
            if(!root){
                root = element;
            }
            currentParent = element;
            stack.push(element);
        },
        close(tagName){
            let elements = stack.pop();
            currentParent = stack.length>0?stack[stack.length-1]:null;
            if(currentParent){
                currentParent.children.push(elements);
            }
        },
        chart(text){
            currentParent.children.push({
                text:text,
                type:3
            });
        }
    });
    return root;
}

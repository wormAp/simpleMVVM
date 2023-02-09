/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import mixCreate from "./vNode/createElement";
import parseToRender from "./complie/parseToRender";
import patchVNode from "./patch/patchVNode";
import observer from "./obeseve/observer";
import Watch from "./obeseve/Watch";
export default function Tpl(options) {
    this.options = options || {};
    this.vnode = this.options.el;
    initData(this,options);
    initRender(this,options.tpl)
}
Tpl.prototype.mount = function () {
    let vnode =  this.render();
    this.vnode =  patchVNode(this.vnode,vnode);
}
Tpl.prototype.watch =function(data,exp,cb){
    new Watch(data,exp,cb);
}
Tpl.prototype.update = function () {
    let vnode =  this.render();
    this.vnode = patchVNode(this.vnode,vnode);
}
function proxy(tpl,data) {
    Object.keys(data).forEach((key)=>{
        Object.defineProperty(tpl,key,{
            set(v) {
                if(v===data[key]){return;}
                    data[key] = v;
            },
            get() {
                return data[key];
            }
        })
    });
}
function initData(tpl,options){
    let data = options.data;
    observer(data)  //响应式
    proxy(tpl,data);
}
function initRender(tpl,template){
    tpl.render = parseToRender(template);

}
mixCreate(Tpl)

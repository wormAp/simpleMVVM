/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import "./index.css"
import Tpl from "./tpl";
let btn = document.createElement('button')
btn.innerHTML = "更新";
document.body.appendChild(btn);
let app1 = document.createElement('div')
document.body.appendChild(app1);
const htmlStr = `
        <div key="a" style="text-align: center;" class="info infoColor">
            <h1 key="b" style="color: #9f9797;background: #fff;">{{schoolName}}中学信息</h1>
            <div key="c">
                <div key="d" style="margin-bottom: 10px">基本信息</div>
                <div key="e" class="mag">
                    <div key="f" style="margin-bottom: 5px">教师信息</div>
                    <div key="g" style="margin-bottom: 5px">教师数量:<span>{{sum}}人</span></div>
                    <div key="h" style="margin-bottom: 5px">高级教师数量:<span>{{number}}人</span></div>
                </div>
                <div key="i" class="mag">重点高中上线率>=<span>{{rate}}</span></div>
                <div key="j" class="mag">电话:<span>{{tel}}</span></div>
                <div key="k" class="mag">地址:<span>{{address}}</span></div>
            </div>
        </div>
    `
app1.innerHTML = `
<div><span>学校名称:</span><input id="scName" value=""/></div>   
${htmlStr}
`;
let app2 = document.createElement('div')
document.body.appendChild(app2);

let tpl = new Tpl({
    tpl:htmlStr,
    el:app2,
    data:{
        schoolName:"测试一中",
        sum:200,
        number:87,
        rate:"85%",
        tel:"16789876546",
        address:"**省**市**区**街道"
    }
});
tpl.mount();
// debugger
tpl.watch(tpl,"schoolName",()=>{
    tpl.update();
})
btn.onclick = function(){
    tpl.schoolName = document.getElementById('scName').value;
}

console.log(tpl)


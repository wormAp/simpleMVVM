/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import htmlToAST from "./htmlToAST";
import astToRenderStr from "./astToRenderStr";
export default function parseToRender(htmlStr) {
    let ast = htmlToAST(htmlStr);
    let render = astToRenderStr(ast);
    return render;
}

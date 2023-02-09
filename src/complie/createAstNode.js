/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
export default function createAstNode(tag,attrs) {
    return({
        tagName:tag,
        attrs:attrs,
        type:1,
        parent:null,
        children:[]
    })
}

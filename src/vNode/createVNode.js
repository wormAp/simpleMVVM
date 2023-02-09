/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
export default function createVNode(tag,data,children,text,elm) {
    data = data || {};
    let props = data.props || {};
    let key = props.key;
    return({
        tag,
        data,
        key,
        children,
        text,
        elm
    });
}

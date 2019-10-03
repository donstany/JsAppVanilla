import { MOCK } from "./MOCK_DATA.js";

(function(data, document){

    let keys = Object.keys(data[0]);

    function crateTag(tag, content){
        return  `<${tag}>
     ${Array.isArray(content) ? content.join("") : content}
</${tag}>`;
    }

    function createSingleTag(tag, prop, val){
        return `<${tag} ${prop}="${val}" />`;
    }

    const renderTable = crateTag.bind(undefined, "table"); // partial application techniques
    const renderThead = crateTag.bind(undefined, "thead");
    const renderTbody = crateTag.bind(undefined, "tbody");
    const renderTr = crateTag.bind(undefined, "tr");
    const renderTd = crateTag.bind(undefined, "td");
    const renderTh = crateTag.bind(undefined, "th");
    const renderUl = crateTag.bind(undefined, "ul");
    const renderLi = crateTag.bind(undefined, "li");

    function chooseContentType(map, defaultWrapperCallBack, type, content) {
            if(typeof map[type] === "function"){
               return defaultWrapperCallBack(map[type](content));
            }
            return defaultWrapperCallBack(content);
    };
    // render hook
    const fieldsMap ={
        avatar: x => createSingleTag("img", "src", x),
        friends : list => renderUl(list.map(f => renderLi(`${f.first_name} ${f.last_name}`)))
    }
    const defaultTd = chooseContentType.bind(
            undefined,
            fieldsMap,
            renderTd
    );

    let result = renderTable(
        renderThead(renderTr(keys.map( key => renderTh(key)))) 
        +
        renderTbody(
            data.map( row  => renderTr( keys.map(cell => defaultTd(cell,row[cell]))))
                    )
    )
 
    document .getElementById("app").innerHTML = result;

}(MOCK.slice(0,20), document))
// (MOCK, {getElementById: () => { } }))



import { MOCK } from "./MOCK_DATA.js";

(function(data, document){
    let keys = Object.keys(data[0]);
    function crateTag(tag, content){
        return  `<${tag}>
     ${Array.isArray(content) ? content.join("") : content}
</${tag}>`;
    }

    const renderTable = crateTag.bind(undefined, "table");
    const renderThead = crateTag.bind(undefined, "thead");
    const renderTbody = crateTag.bind(undefined, "tbody");
    const renderTr = crateTag.bind(undefined, "tr");
    const renderTd = crateTag.bind(undefined, "td");
    const renderTh = crateTag.bind(undefined, "th");

   let result= renderTable(
        renderThead(renderTr(keys.map( key => renderTh(key)))) 
        +
        renderTbody(
           data.map( row  => renderTr( keys.map(cell => renderTd(row[cell]))))
           )
    )
 
    document .getElementById("app").innerHTML = result;

}(MOCK, document))
// (MOCK, {getElementById: () => { } }))



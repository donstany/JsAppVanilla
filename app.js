import { MOCK } from "./MOCK_DATA.js";

(function(data, document){
    let keys = Object.keys(data[0]);
    let result ="";

    function crateTag(tag, content){
        return  `<${tag}>
     ${Array.isArray(content) ? content.join("") : content}
</${tag}>`;
    }

    result +="<table>"
    result += crateTag(
                "thead",
                crateTag("tr", keys.map( key => crateTag("th", key)))
                );
    result +=   "  <tbody>"

    result += data
                .map( row  => crateTag("tr", keys.map(cell => 
                    crateTag("td", row[cell])))
                    )

    result +="  </tbody>"

    result +="</table>"
 
    document .getElementById("app").innerHTML = result;

}(MOCK, document))
// (MOCK, {getElementById: () => { } }))



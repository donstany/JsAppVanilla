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
               return defaultWrapperCallBack(map[type](type, content));
            }
            return defaultWrapperCallBack(content);
    };
    // render hook
    const fieldsMap = {
        avatar: (_, x) => createSingleTag("img", "src", x),
        friends : (_, list) => renderUl(list.map(f => renderLi(`${f.first_name} ${f.last_name}`))),
        email: (_, x) => `<a href="mailto:${x}">${x}</a>`
    }

    const headingsMap = {
        first_name : (type,content) => {
            return `<a class="filter" data-sortby="${type}">${content}</a>`
        }
    };

    const defaultTd = chooseContentType.bind(
            undefined,
            fieldsMap,
            renderTd
    );

    const defaultTh = chooseContentType.bind(
        undefined,
        headingsMap,
        renderTh
    );

    const dictionary = {
        id: "Identity",
        email: "Mail",
        avatar: "Photo",
        gender: "Gender",
        last_name: "Last Name",
        first_name: "Name",
        friends:"Friends",
        ip_address:"IP",
    };

    function main(data){
        return renderTable(
            renderThead(
                renderTr(
                    keys.map(
                        key => defaultTh(key, dictionary[key])
                    )
                )
            ) 
            +
            renderTbody(
                data.map(
                    row => renderTr(
                        keys.map(
                            cell => defaultTd(cell,row[cell])
                        )
                    )
                )
            )
        )
    }

    function addToHTML(data){
        document.getElementById("app").innerHTML = main(data);
    }

    addToHTML(data);

    function sortBy(key, objA, objB ){
        return objA[key].localeCompare(objB[key]);
    }

    document.addEventListener("click", function(evt) { 
        if(evt.target.classList.contains("filter")) {
            addToHTML(
                data.sort(
                    sortBy.bind(undefined, evt.target.dataset.sortby)
                )
            )
        }
    }, true ) = result;

}(MOCK.slice(0,20), document))
// (MOCK, {getElementById: () => { } }))



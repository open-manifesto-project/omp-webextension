


/*** WIP
 function sanitizeInput(){
    Object.entries(inputs).forEach(
        ([key, value]) => {
            if(value.value == null){
                setInputStyle(value, "error");
            } else {
                setInputStyle(value);
            }
        }
    )
}

 **/
function setInputStyle(element,type){
    let borderColor = element.style.borderColor;
    let boxShadow = element.style.boxShadow;
    switch(type){
        case "warning":
            borderColor = "#d7b600";
            boxShadow = "0 0 0 1px #d7b600, 0 0 0 4px rgba(215, 182, 0, 0.3)";
            break;

        case "error":
            borderColor = "#d70022";
            boxShadow = "0 0 0 1px #d70022, 0 0 0 4px rgba(251, 0, 34, 0.3)";
            break;

        default:
            borderColor = "rgba(12, 12, 13, 0.2)";
            break;
    }

    element.style.borderColor = borderColor;
    element.style.boxShadow = boxShadow;

}

let inputs = {
    limit: document.querySelector("#input-limit"),
    endpoint: document.querySelector("#input-endpoint"),
    journals: document.querySelector("#input-journals"),
    action_confirm: document.querySelector("#action_confirm")
};
// inputs init
document.querySelector("#label-limit").insertAdjacentText("afterbegin", browser.i18n.getMessage("inputLimitLabel"));
document.querySelector("#label-endpoint").insertAdjacentText("afterbegin", browser.i18n.getMessage("inputEndpointLabel"));
document.querySelector("#label-journals").insertAdjacentText("afterbegin", browser.i18n.getMessage("inputJournalsLabel"));

inputs.limit.placeholder = browser.i18n.getMessage("inputGenericPlaceholder");
inputs.endpoint.placeholder = browser.i18n.getMessage("inputGenericPlaceholder");
inputs.endpoint.value = 'http://localhost:5000';
inputs.journals.placeholder = browser.i18n.getMessage("inputCommaSeparatedPlaceholder");
inputs.action_confirm.textContent = browser.i18n.getMessage("actionConfirmText");



browser.tabs.executeScript({file: "/js/app.js"})
    .then(inputs.action_confirm.addEventListener("click", (e)=>{
        browser.tabs.sendMessage(tabs[0].id, {
            endpoint: inputs.endpoint.value,
            limit: inputs.limit.value,
            journals: inputs.journals.value,
        })
    }
));













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
}
// inputs init
document.querySelector("#label-limit").insertAdjacentText("afterbegin", browser.i18n.getMessage("inputLimitLabel"));
document.querySelector("#label-endpoint").insertAdjacentText("afterbegin", browser.i18n.getMessage("inputEndpointLabel"));
document.querySelector("#label-journals").insertAdjacentText("afterbegin", browser.i18n.getMessage("inputJournalsLabel"));

inputs.limit.placeholder = browser.i18n.getMessage("inputGenericPlaceholder");
inputs.endpoint.placeholder = browser.i18n.getMessage("inputGenericPlaceholder");
inputs.endpoint.value = 'http://localhost:5000';
inputs.journals.placeholder = browser.i18n.getMessage("inputCommaSeparatedPlaceholder");


inputs.action_confirm.textContent = browser.i18n.getMessage("actionConfirmText");




/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
    console.error(`Failed to execute content script: ${error.message}`);
}

function actionConfirmManager() {
    inputs.action_confirm.addEventListener("click", (evt => {

    }));

}

browser.tabs.executeScript({file: "/js/load_defaults.js"})
    .then(actionConfirmManager())
    .catch(reportExecuteScriptError);

// content script comms

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */

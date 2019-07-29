class Api {
    constructor(endpoint){
        this.endpoint = endpoint;
        this.xhr = new XMLHttpRequest();
        this.response = null;
        this.urls = {
            parties: "parties",
            proposals: "proposals"
        };

    }

    getParties(){
        this.xhr.open("GET", `${this.endpoint}/${this.urls.parties}`, false);
        this.xhr.send();
        return this.xhr.response;
    }

    getProposals(){
        this.xhr.open("GET", `${this.endpoint}/${this.urls.proposals}`, false);
        this.xhr.send();
        return this.xhr.response;
    }

    getProposalByParty(party, id){
        this.xhr.open("GET", `${this.endpoint}/${this.urls.proposals}/${party}/${id}`, false);
        this.xhr.send();
        return this.xhr.response;
    }
}


function handleMessage(request, sender, sendResponse){
    let response;
    let api = new Api(request.endpoint);
    switch(request.type){
        case "parties":
            response = api.getParties();
            break;

        case "many":
            response = api.getProposals();
            break;

        case "one":
            response = api.getProposalByParty(request.party, request.id);
            break
    }

    sendResponse(response);
}

browser.runtime.onMessage.addListener(handleMessage);




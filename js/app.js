class App{

    constructor(){


        this.constants = {
            // common <meta> objects for SEO analysys.
            commonMetas: {
                "name": ["category", "category_slug"],
                "property": ["article:tag", "article:section", "og:type", "article:section"]
            },

            // if a given meta's name is some sort of a keyword...
            keywordsHeader: ["keywords", "news_keywords"]
        };

        this.visualReferences = {
            news: document.createElement("DIV"), // the original website will wrapped inside this div when app.buildVisuals() is called
            proposals: document.createElement("DIV"), // the new proposals container
            innerProposals : {}, //used to store inner individual proposals' text containers when proposals are loaded
            action_getProposals: document.createElement("button"), // button used to load proposals
        };

        /*
        each first-tier attribute (currently proposals and news) is a html id pointing to an existing element. when app.buildVisuals() is called,
        for each element its style inner dict will be applied.
        feel free to append or replace this object in order to add or replace styles.
        */
        this.visualConfigs = {
            proposals: {
                height: "20%",
                width: "100%",
                overflowY: "scroll"
            },
            news: {
                height: "80%",
                width: "100%",
                overflowY: "scroll"
            }
        };

        // endpoint and limit values, set by the popup Options menu.
        this.endpoint = document.getElementById('endpoint');
        this.limit = document.getElementById("proposalsLimit") || 5;

        // keywords array which needs to be computed with a list of metas by app.extractKeywordsFromMetas(metasList).
        // this array will be sent when searching proposals by keywords -> app.getProposals()
        this.keywords = [];


    }

    extractKeywordsFromMetas(metasList) {
        let app = this; //see last lines of app.buildVisuals()

        // metasList filtered by the contants.keywordsHeader values
        let keywordsList = metasList.filter(
            function (meta) {
                return app.constants.keywordsHeader.includes(meta.getAttribute("name"))
            }
        );

        // appending contants.commonMetas filter
        keywordsList.push(
            metasList.filter(
                function (meta) {
                    return app.constants.commonMetas["property"][0].includes(meta.getAttribute("property"))
                }
            )
        );

        // object2array and strings cleanup
        keywordsList = keywordsList.flat();
        let auxList = [];
        let clean_keyword;
        for (let i = 0; i < keywordsList.length; i++) {
            let keywords = keywordsList[i].content.split(",");
            for (let j = 0; j < keywords.length; j++) {
                clean_keyword = keywords[j].trim().toLowerCase();
                if (auxList.indexOf(clean_keyword) === -1) {
                    auxList.push(clean_keyword)
                }
            }
        }

        this.keywords = auxList;
        return auxList;
    }

    buildVisuals(){
        try {

            // asigning visualReferences' new objects some id
            for (const [key, value] of Object.entries(this.visualReferences)) {
                value.id = key;
            }

            let body = document.body;
            let html = document.getElementsByTagName('HTML')[0];


            this.visualReferences.action_getProposals.textContent = browser.i18n.getMessage("action_getProposalsTitle");
            this.visualReferences.proposals.appendChild(this.visualReferences.action_getProposals);

            // wrapping up the original site inside the news container
            while (body.firstChild)
                this.visualReferences.news.appendChild(body.firstChild);

            body.style.height = "100%";
            html.style.height = "100%";

            body.appendChild(this.visualReferences.news);
            body.appendChild(this.visualReferences.proposals);

            // ppling styles to the defined app.visualConfigs attributes
            /*
            for each top-level app.visualConfigs object, a HTML element search is made as it expects
            for each of the defined objects to have a HTML element with an assigned ID, then each
            defined style is applied
             */
            Object.entries(this.visualConfigs).forEach(
                ([key, value]) => {
                    let element = document.getElementById(key);
                    Object.entries(value).forEach(
                        ([key1, value1]) => {
                            element.style[key1] = value1
                        }
                    )
                }
            );
        }
        catch (e){
            console.log(e)
        }

        /*
        javascript more like lamescript ¯¯\_(ツ)_/¯¯
        this next assignation is necessary since getProposals will override `this` or any reference to the current object
         */

        let app = this;
        this.visualReferences.action_getProposals.addEventListener("click", this.getProposals);
    }

    buildCustomVisuals(newFunc){
        this.buildVisuals();
        newFunc();
    }

    getParties(){

        const sending = browser.runtime.sendMessage({
            endpoint: 'http://localhost:5000',
            type: "parties"
        });

        function handleMessage(message) {
            console.log(message);

        }

        function handleError(error){
            console.log(`getParties:: ${error}`)
        }

        sending.then(handleMessage, handleError)
    }

    // needed by getProposals
    createProposalContainer(proposalObject, party){
        console.log(party);
        let div = document.createElement("DIV");
        div.id = `proposal-${party}/${proposalObject.id}`;
        app.visualReferences.innerProposals[div.id] = div;
        let header = document.createElement("H2");
        header.innerHTML = `${party} - ${proposalObject.title}`;
        div.appendChild(header);


        function getProposalInfo(event){
            const sending = browser.runtime.sendMessage({
                endpoint: app.endpoint,
                type: "one",
                party: party,
                id: proposalObject.id
            });
            sending.then(handle_message, handle_error);

            function handle_message(message){
                let response = JSON.parse(message).proposal;
                div.innerHTML = `<h2> ${party} - ${proposalObject.title}</h2>` +
                    `<ul>` +
                    `<li>` +
                    `<b>Topic:</b> ${response.topic}` +
                    `</li>` +
                    `<li>` +
                    `<b>Subtopic:</b> ${response.subtopic}` +
                    `</li>` +
                    `<li>` +
                    `<b>Body:</b> ${response.body}` +
                    `</li>` +
                    `</ul>`
            }

            function handle_error(error){
                console.log(error);
            }
        }

        div.addEventListener("click", getProposalInfo);

        this.visualReferences.proposals.appendChild(div);
    }

    getProposals(){

        app.endpoint = 'http://localhost:5000';
        const sending = browser.runtime.sendMessage({
            endpoint: app.endpoint,
            keywords: app.keywords,
            type: "many"
        });

        function handleMessage(message) {
            let response = JSON.parse(message).proposals;
            Object.entries(response).forEach(
                ([key, values]) =>
                {
                    for(let i = 0; i < values.length; i++){
                        try{
                            console.log(app);
                            app.createProposalContainer(values[i], key);
                        }
                        catch (e){
                            console.log(e)
                        }

                    }

                }
            )
        }

        function handleError(error){
            console.log(`getProposals:: ${error}`)
        }

        sending.then(handleMessage, handleError)
    }

}

// get the two top level domain name of the current href, so id doesn't matter if a website's third level domain is 'www' or nonexistent
const SITE = window.location.href.split('/')[2].split('.').slice(0).slice(-2).join('.');

//defined journals where this script will be applied
//
const JOURNALS = [
    'lavanguardia.com', 'elpais.com', 'elmundo.es', 'abc.es', '20minutos.es',
    'elconfidencial.com', 'elespanol.com', 'okdiario.com', 'eldiario.es', 'publico.es'
];

if (JOURNALS.indexOf(SITE) > -1){
    let app = new App();
    app.extractKeywordsFromMetas([...document.getElementsByTagName("meta")]); //sets app.keywords but also returns them
    app.buildVisuals();
}
else {
    console.log("not journals");
}








class App{

    constructor(limit, endpoint){


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
        this.endpoint = endpoint;
        this.limit = limit;

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
        this.visualReferences.action_getProposals.addEventListener("click", this.getProposals.bind(this));

    }

    buildCustomVisuals(newFunc){
        this.buildVisuals();
        newFunc();
    }

    getParties(){

        const sending = browser.runtime.sendMessage({
            endpoint: this.endpoint,
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

        let id = `proposal-${party}/${proposalObject.id}`;
        let div = document.createElement("DIV");
        div.id = id;
        this.visualReferences.innerProposals[div.id] = div;
        let header = document.createElement("H2");
        header.innerHTML = `${party} - ${proposalObject.title}`;
        div.appendChild(header);


        function getProposalInfo(event){
            const sending = browser.runtime.sendMessage({
                endpoint: this.endpoint,
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

        div.addEventListener("click", getProposalInfo.bind(this));


        this.visualReferences.proposals.appendChild(div);
    }

    getProposals(){

        const sending = browser.runtime.sendMessage({
            endpoint: this.endpoint,
            keywords: this.keywords,
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
        let app = this;
        sending.then(handleMessage.bind(this), handleError.bind(this))
    }


    destroy(){
        document.body.removeChild(this.visualReferences.proposals);
        while (this.visualReferences.news.firstChild)
            document.body.append(this.visualReferences.news.firstChild);

        document.body.removeChild(this.visualReferences.news)

    }
}









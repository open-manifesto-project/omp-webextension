(function() {

    // get the two top level domain name of the current href, so id doesn't matter if a website's third level domain is 'www' or nonexistent
    const SITE = window.location.href.split('/')[2].split('.').slice(0).slice(-2).join('.');

    //defined journals where this script will be applied
    //
    let JOURNALS = [
        'lavanguardia.com', 'elpais.com', 'elmundo.es', 'abc.es', '20minutos.es',
        'elconfidencial.com', 'elespanol.com', 'okdiario.com', 'eldiario.es', 'publico.es'
    ];

    let limit;
    let endpoint = 'http:localhost:5000';
    let journals;
    let app;
    function init(){
        //JOURNALS = JOURNALS.concat(journals.split("-"));
        try {
            if (journals !== null){
                if (JOURNALS.indexOf(SITE) > -1){
                    app = new App(limit, endpoint);
                    app.extractKeywordsFromMetas([...document.getElementsByTagName("meta")]); //sets app.keywords but also returns them
                    app.buildVisuals();
                }
                else {
                    console.log("not journals");
                }
            }

        } catch (e){
            console.log(e);
        }

    }


    if (window.hasRun) {
        app.destroy();
        alert("destroying");
        init();

        return;
    }


    window.hasRun = true;
    alert("first creation");

    init();



    /**
     * Listen for messages from the background script.

     */
    browser.runtime.onMessage.addListener((message) => {
        endpoint = message.endpoint;
        journals = message.journals;
        limit = message.limit;
    });

})();
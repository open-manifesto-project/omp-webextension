
/*
###############################################################################################
#### UTILS 										   										   ####
###############################################################################################
*/

/*
 *
 * @param metasList entry meta array
 * @return contentsList array of strings with all of metasList's member.content
 *
 */


function metasList2contentsList(metasList){
	let auxList = [];
	let clean_keyword;
	for (let i = 0; i < metasList.length; i++) {
		let keywords = metasList[i].content.split(",");
		for (let j = 0; j < keywords.length; j++) {
			clean_keyword = keywords[j].trim().toLowerCase();
			if (auxList.indexOf(clean_keyword) === -1) {
				auxList.push(clean_keyword)
			}
		}
	}
	return auxList;
}

/*
###############################################################################################
#### 										CONSTS										   ####
###############################################################################################
*/


const SITE = window.location.href.split('/')[2].split('.').slice(0).slice(-2).join('.');

const JOURNALS = [
    'lavanguardia.com', 'elpais.com', 'elmundo.es', 'abc.es', '20minutos.es',
    'elconfidencial.com', 'elespanol.com', 'okdiario.com', 'eldiario.es', 'publico.es'
];

function init() {

	const COMMON_METAS = {
		"name": ["category", "category_slug"],
		"property": ["article:tag", "article:section", "og:type", "article:section"]
	};
	const KEYWORDS_HEADERS = ["keywords", "news_keywords"];
	/*
    ###############################################################################################
    #### 									ATTRIBUTES										   ####
    ###############################################################################################
    */


	var metasList = [...document.getElementsByTagName("meta")];
	var keywordsList = metasList.filter(
		function (meta) {
			return KEYWORDS_HEADERS.includes(meta.getAttribute("name"))
		});

	keywordsList.push(
		metasList.filter(
			function (meta) {
				return COMMON_METAS["property"][0].includes(meta.getAttribute("property"))
			}
		)
	);

	keywordsList = keywordsList.flat();
	keywordsList = metasList2contentsList(keywordsList); //see UTILS section


	let button = document.createElement("BUTTON");
	button.textContent = "get proposals";

	let body = document.body;
	let html = document.getElementsByTagName("HTML")[0];
	let proposals = document.createElement("DIV");
	proposals.id = "proposals";
	let news = document.createElement("DIV");
	news.id = "news";


	/*
    ###############################################################################################
    #### VISUAL INIT									   									   ####
    ###############################################################################################
    */

    proposals.appendChild(button);
    while (body.firstChild) {
        news.appendChild(body.firstChild)
    }
    body.style.height = "100%";
    html.style.height = "100%";
    proposals.style.height = "20%";
    news.style.height = "80%";
    news.style.overflowY = "scroll";
    proposals.style.overflowY = "scroll";
    body.appendChild(news);
    body.appendChild(proposals);


    function create_proposal_container(proposal_object, party){
        let div = document.createElement("DIV");
        div.id = `proposal-${party}/${proposal_object.id}`;
        let header = document.createElement("H2");
        header.innerHTML = `${party} - ${proposal_object.title}`;
        div.appendChild(header);


		function get_proposal(event) {
			sending = browser.runtime.sendMessage({
				type: "one",
				party: party,
				id: proposal_object.id
			});
			sending.then(handle_message, handle_error);

			function handle_message(message){
				response = JSON.parse(message).proposal;
				div.innerHTML = `<h2> ${party} - ${proposal_object.title}</h2>` +
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

		div.addEventListener("click", get_proposal);
        proposals.appendChild(div);



    }

	function get_proposals(event){
		const sending = browser.runtime.sendMessage({
			type: "many",
			keywords: keywordsList
		});

		function handle_message(message) {
			let response = JSON.parse(message).proposals;
			Object.entries(response).forEach(
				([key, values]) =>
				{
					for(let i = 0; i < values.length; i++){
						create_proposal_container(values[i], key);
					}

				}
			)

		}

		function handle_error(error){
			console.log(`Error: ${error}`)
		}

		sending.then(handle_message, handle_error)
	}


	button.addEventListener("click", get_proposals)
}

if (JOURNALS.indexOf(SITE) > -1)
	init();
else
	console.log("not journals");

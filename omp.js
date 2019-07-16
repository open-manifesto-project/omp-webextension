
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
	return auxList
}


/*
###############################################################################################
#### 										CONSTS										   ####
###############################################################################################
*/

const LIMIT = 5;
const COMMON_METAS = {
	"name": ["category", "category_slug"],
	"property": ["article:tag", "article:section", "og:type", "article:section"]
};
const KEYWORDS_HEADERS = ["keywords", "news_keywords"];

//const PARTIES = api.getParties();

/*
###############################################################################################
#### 									ATTRIBUTES										   ####
###############################################################################################
*/


let metasList = [...document.getElementsByTagName("meta")];
let keywordsList = metasList.filter(
	function (meta) {
		return KEYWORDS_HEADERS.includes(meta.getAttribute("name"))
	});

keywordsList.push(
	metasList.filter(
		function(meta){
			return COMMON_METAS["property"][0].includes(meta.getAttribute("property"))
		}
	)
);

keywordsList = keywordsList.flat();
keywordsList = metasList2contentsList(keywordsList); //see UTILS section


// VISUAL
/////

let button = document.createElement("BUTTON");
button.textContent = "get proposals";

let body = document.body;
let main = document.createElement("DIV");
main.id = "main";

let proposals = document.createElement("DIV");
proposals.id = "proposals";

let news = document.createElement("DIV");
news.id = "news";

/////


/*
###############################################################################################
#### VISUAL INIT									   ####
###############################################################################################
*/

proposals.appendChild(button);

main.appendChild(news);
main.appendChild(proposals);

while (body.firstChild)
{
	news.appendChild(body.firstChild)
}

body.style.cssText = "height: 100%;" +
	"padding: 8px;" +
	"box-sizing: border-box;";



for (let element in [proposals, news]){
	[proposals, news][element].style.cssText = "box-sizing: border-box;" +
		"overflow-y: auto;" +
		"overflow-x: hidden;" +
		"padding: 10px;" +
		"border: 1px solid #C0C0C0;" +
		"box-shadow: inset 0 1px 2px #e4e4e4;" +
		"background-color: #fff;"
}


body.appendChild(main);

try {

	Split(['#news', '#proposals'], {
		direction: 'vertical',
		sizes: [70, 30],
		gutterSize: 8,
		cursor: "row-resize"
	})

}
catch (err) {
	console.log("Error at splitting\n");
	console.log(err)
}

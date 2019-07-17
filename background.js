
let response;

function handle_message(request, sender, send_response){
    let xhr = new XMLHttpRequest();
    let petition = 'http://localhost:5000/';

    if (request.type === "many"){
        petition += 'proposals';
    }
    else
        petition += `proposals/${request.party}/${request.id}`;

    xhr.onreadystatechange=function(){
        if(this.readyState === 4 && this.status === 200){
            response = this.responseText;
            }
    };
    xhr.open("GET", petition, false);
    xhr.send();

    send_response(response);
}



browser.runtime.onMessage.addListener(handle_message);


let gifServerUrl = "http://localhost:62000/";

function createGifSearchRequest(keyword){
    return {
        keyword : keyword
    }
}

function createGifMessageRequest(username,gifUrl){
    return {
        "gif":gifUrl,
        "userName":username
    }
}


function sendKeyword(request){
    $.ajax({
        type: "POST",
        url: gifServerUrl + "gif-list",
        data: JSON.stringify(request),
        dataType: "JSON",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (response) {
            let ModalelemSelect = document.getElementById('gif-select-modal');
            let instanceSelect = M.Modal.init(ModalelemSelect);
            instanceSelect.open();
            console.log(response);
            let gifContainer = document.getElementById("gif-container");
            for (let i = 0; i < response.length; i++) {
                let gifDiv = document.createElement("div");
                gifDiv.setAttribute("class", "col s6");
                let gif = document.createElement("a");
                gif.setAttribute("href", "#");
                let img = document.createElement("img");
                img.setAttribute("src", response[i]);
                img.setAttribute("alt", response[i]);
                img.setAttribute("height", "150");
                img.setAttribute("width", "300");
                gif.appendChild(img);
                gifDiv.appendChild(gif);
                gifContainer.appendChild(gifDiv);
                gif.addEventListener('click', function () {
                    let userName = sessionStorage.getItem("user_name");
                    let gifMessageRequest = createGifMessageRequest(userName, response[i]);
                    sendMessage(gifMessageRequest);
                    let ModalelemSelect = document.getElementById('gif-select-modal');
                    let instanceSelect = M.Modal.init(ModalelemSelect);
                    instanceSelect.close();
                })
            }
        }});
}

document.getElementById("gif-btn").addEventListener('click', function () {

            let ModalelemSearch = document.getElementById('gif-input-modal');
            let instanceSearch = M.Modal.init(ModalelemSearch);
            instanceSearch.open();
            let accept_button = document.getElementById("accept-gif-input");
            accept_button.addEventListener('click', function () {

                let gif_input = document.getElementById("gif-input");
                let searchKeyword = gif_input.value;
                sessionStorage.setItem('gif_input', searchKeyword);
                let gifSearchRequest = createGifSearchRequest(searchKeyword);
                sendKeyword(gifSearchRequest);

            })

});

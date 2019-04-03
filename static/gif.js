// document.getElementById("gif-btn")
//     .addEventListener("click",(e)=>{
//         e.preventDefault();
//         let userName = sessionStorage.getItem("user_name");
//         console.log(userName);
//         request = createRequest(userName, document.getElementById("chatInput").value);
//         sendMessage(request);
//     });

let gifServerUrl = "http://localhost:62000/";

function createGifSearchRequest(keyword){
    return {
        keyword : keyword,
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
        }
    });
}

document.getElementById("gif-btn").addEventListener('click', function () {

            let Modalelem = document.getElementById('gif-input-modal');
            let instance = M.Modal.init(Modalelem);
            //if (sessionStorage.getItem("user_name") === null) {
                instance.open();
            //}
            let accept_button = document.getElementById("accept-gif-input");
            accept_button.addEventListener('click', function () {

                let gif_input = document.getElementById("gif-input");
                let searchKeyword = gif_input.value;
                sessionStorage.setItem('gif_input', searchKeyword)
                request = createGifSearchRequest(searchKeyword);
                sendKeyword(request);

            })

});

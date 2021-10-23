let serverUrl = "ws://localhost:8080/";
let webSocket = new WebSocket(serverUrl + 'chat');

function renderMessage(messages) {

    let userName = sessionStorage.getItem("user_name");

    for (data of messages){
        let cardPanel = document.createElement("div");
        let textSpan = document.createElement("div");
        let wrapperRow = document.createElement("div");

        wrapperRow.appendChild(cardPanel);
        cardPanel.appendChild(textSpan);


        if ( userName === data.userName) {
            wrapperRow.classList.add("right-align");
            cardPanel.classList.add("cyan");
            cardPanel.classList.add("darken-2");
            textSpan.classList.add("white-text");
        } else {
            cardPanel.classList.add("grey");
            cardPanel.classList.add("lighten-2");
            textSpan.classList.add("black-text");
        }

        textSpan.innerText = data.message;
        wrapperRow.classList.add("row");
        cardPanel.classList.add("card-panel");

        document.getElementById("messageContainer")
            .appendChild(wrapperRow);
    }
}

function connectToSocket() {
    webSocket.onmessage = (message) => {
        console.log(message.data)
        renderMessage([JSON.parse(message.data)]);
    };
}

function createRequest(username,message){
    return {
        "message":message,
        "userName":username
    }
}


function sendMessage(request){
    webSocket.send(JSON.stringify(request));
}

function getMessages(){
    /*$.ajax({
        type: "GET",
        url: serverUrl + "getMessages",
        data: JSON.stringify(request),
        dataType: "JSON",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (response) {
            renderMessage(response);
        },
        error: function(response){
            console.log(response);
        }
    });*/
}



document.getElementById("sendChat")
    .addEventListener("click",(e)=>{
        e.preventDefault();
        let userName = sessionStorage.getItem("user_name");
        let message = document.getElementById("chatInput").value;
        document.getElementById("chatInput").vallue;
        console.log(userName);
        request = createRequest(userName,message);
        sendMessage(request);
    });

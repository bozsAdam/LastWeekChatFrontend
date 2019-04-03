let serverUrl = "http://localhost:61000/";

function renderMessage(messages) {

    let userName = sessionStorage.getItem("user_name");

    for (data of messages){
        let cardPanel = document.createElement("div");
        let textSpan = document.createElement("div");
        let imgSpan = document.createElement("img");
        let wrapperRow = document.createElement("div");

        wrapperRow.appendChild(cardPanel);
        cardPanel.appendChild(textSpan);
        if(data.gif != null) cardPanel.appendChild(imgSpan);


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

        if(data.gif != null) {
            imgSpan.setAttribute("src", data.gif);
            imgSpan.setAttribute("alt", data.gif);
            wrapperRow.classList.add("row");
            cardPanel.classList.add("card-panel");
        }

        document.getElementById("messageContainer")
            .appendChild(wrapperRow);
    }
}

function connectToSocket() {
    var socket = new SockJS(serverUrl + 'chat-server');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.debug = () => {};
        stompClient.subscribe('/chat', function (greeting) {
            renderMessage([JSON.parse(greeting.body)]);
        });

    });
}

function createRequest(username,message){
    return {
        "message":message,
        "userName":username
    }
}


function sendMessage(request){
    $.ajax({
        type: "POST",
        url: serverUrl + "message",
        data: JSON.stringify(request),
        dataType: "JSON",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

document.getElementById("sendChat")
    .addEventListener("click",(e)=>{
        e.preventDefault();
        let userName = sessionStorage.getItem("user_name");
        request = createRequest(userName, document.getElementById("chatInput").value);
        sendMessage(request);
        document.getElementById("chatInput").value = "";
    });

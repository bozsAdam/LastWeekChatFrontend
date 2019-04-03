let serverUrl = "http://192.168.163.228:61000/";

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
    var socket = new SockJS(serverUrl + 'chat-server');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
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

function getMessages(){
    $.ajax({
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
    });
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

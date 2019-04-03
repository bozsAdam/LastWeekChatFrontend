let serverUrl = "http://192.168.163.228:61000/";

function connectToSocket() {
    var socket = new SockJS(serverUrl + 'chat-server');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/chat', function (greeting) {
            let data = JSON.parse(greeting.body);
            let cardPanel = document.createElement("div");
            let textSpan = document.createElement("div");
            let wrapperRow = document.createElement("div");

            wrapperRow.appendChild(cardPanel);
            cardPanel.appendChild(textSpan);


            if(sessionStorage.getItem("user_name") === data.userName){
                wrapperRow.classList.add("right-align");
                cardPanel.classList.add("cyan");
                cardPanel.classList.add("darken-2");
                textSpan.classList.add("white-text");
            } else{
                cardPanel.classList.add("grey");
                cardPanel.classList.add("lighten-2");
                textSpan.classList.add("black-text");
            }

            textSpan.innerText = data.message;
            wrapperRow.classList.add("row");
            cardPanel.classList.add("card-panel");

            document.getElementById("messageContainer")
                    .appendChild(wrapperRow);



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
        console.log(userName);
        request = createRequest(userName, document.getElementById("chatInput").value);
        sendMessage(request);
    });

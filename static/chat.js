let serverUrl = "http://localhost:61000/";

function connectToSocket() {
    var socket = new SockJS(serverUrl + 'chat-server');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/chat', function (greeting) {
            console.log("Connected to the game socket");
            console.log(JSON.parse(greeting.body))
        });

    });
}

function createRequest(username,message){
    return {
        "message":message,
        "username":username
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
        },
        success: function (response) {
            console.log("success");
        },
        error: function (error){
            console.log("failed because: " + error)
        }
    });
}

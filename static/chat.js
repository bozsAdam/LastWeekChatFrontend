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

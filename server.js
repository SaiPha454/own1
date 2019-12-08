var express=require("express");
var app=express();

var server=require("http").createServer(app);
var io=require("socket.io").listen(server);


server.listen(process.env.PORT || 4710 );
console.log("Server is runnning on http://localhost:4710");

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

io.sockets.on("connection",function(socket){
    console.log("A client is connected");

    socket.on("message",function(msg){
        var msgType=msg.type;
        console.log("Get New message: The message type is: ",msgType);
        socket.broadcast.emit(msgType,msg);
    });

    
});


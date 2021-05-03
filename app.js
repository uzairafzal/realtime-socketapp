var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendfile('index.html');
});
io.on('connection', function (socket) {
    console.log('A user connected');

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        socket.broadcast.emit("someoneDisconnected");
    });
    // sending socket identifier as params
    socket.broadcast.emit("someoneConnected", socket.id);
});
http.listen(3000, function () {
    console.log('listening on *:3000');
});
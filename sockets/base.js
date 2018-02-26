'use strict';
var ioMgr = function(){
}
ioMgr.prototype.init = function(io){
    var self = this;
    this.io =io;
    io.on('connection', function (socket) {
     // console.log('a user connected');
     // self.sendMsg('Welcome to Websockets');
    });
}
ioMgr.prototype.sendMsg =function(msg){
    this.io.sockets.emit('message', msg);
}
module.exports = new ioMgr();
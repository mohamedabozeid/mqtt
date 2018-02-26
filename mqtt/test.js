var mqtt = require('mqtt');
var io = require('../sockets/base'); 

var mqttServer = function(){    
}
mqttServer.prototype.init = function(){
   var client  = mqtt.connect('mqtt://m11.cloudmqtt.com',{
        clientId:"Mohamed-Abozeid",
        username:"hcrunwpg",
        password:"L6gL4AQpl3rS",
        port:"15222"
    });
     this.client = client;
    client.on('connect', function () {
      client.subscribe('#');
      client.publish('presence', 'Hello cloud mqtt');
    })
     
    client.on('message', function (topic, message) {
      // message is Buffer
      io.sendMsg({"topic":topic, "msg":message.toString()});
      console.log(message.toString());
      //client.end();
    })
}
mqttServer.prototype.sendMsg = function(topic, msg){
  this.client.publish(topic, msg);
}


module.exports = new mqttServer();



 var mqttClient = function(){
     var self = this;
     this.topic = ko.observable("Device 01");
     this.msg= ko.observable("");
     this.messages = ko.observableArray([]);
     this.socket = io();
     this.socket.on('message', function(msg){
        self.messages.push(msg);
      });
 }

 mqttClient.prototype.submit =  function(){
     var self = this;
    $.ajax({
        type: "POST",
        url: '/mqtt/sendMsg',
        data: {"topic":self.topic(), "msg":self.msg()},
        success: function(){},
        dataType: "json"
      });
 }

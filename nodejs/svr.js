var http = require('http'),
    fs = require('fs');

var server = http.createServer();

server.on('request',function(req, res){
   res.writeHeader(200, {'Content-Type': 'text/html'});

   var w = req.url;
	if (w=="/") w="/wsc.htm";

   var read = fs.createReadStream(__dirname + w);
   read.on('error', function(err){
      res.end(err.stack);
   });
   read.on('data', function(data){
      res.write(data);
   });
   read.on('end', function(){
      res.end();
   });
});

server.on('request', function(req, res){

   console.log(req.url + ' "' + req.headers['host'] + '"');

   console.log(req.method + ' "' + req.headers['user-agent'] + '"');
});

//server.listen(8080);
server.listen(80);

var io = require('socket.io');
var socket = io.listen(server);

var usr_list = [];
var usr_count = 0;

var count = 0;


socket.sockets.on('connection', function (client) {

    count++;
    if (Boolean(usr_list[client.id])) {
        client.send("welcome back " + usr_list[client.id]);
        var num = usr_list[client.id];
    } else {
        var num = "No." + usr_count;
        usr_count++;

        usr_list[client.id] = num;

        /*
        var st = "";
        for (var i in usr_list) {
            st += i + ",";
        }
        st += "length:" + usr_list.length;
        
        client.send("you name :" + num + st);
        */
        client.send("you name :" + num);
        
        client.broadcast.send("enter :" + num);
        client.broadcast.send("count:" + count);
    }

    //client.broadcast.send("connect:" + client.id);
    //client.broadcast.send("member:" + count);

    // Success!  Now listen to messages to be received
    client.on('message', function (event) {
        var msg = usr_list[client.id] + " Say " + event;

        console.log(msg);
        client.send(" " + event);
        client.broadcast.send(msg);
    });
    client.on('disconnect', function () {
        //clearInterval(interval);
        count--;
        console.log('Server has disconnected');
        client.broadcast.send("leave member:" + num);
        client.broadcast.send("count:" + count);
    });

});

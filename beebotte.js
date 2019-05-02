var bbt = require('beebotte');
var express = require('express');
var app = express();
var path = require("path");
const io = require('socket.io')();
// var http = require('http').createServer(app);
const hostname = '127.0.0.1';
const port = 8080;
var transport = {
    type: 'socketio',
    apiKey: 'gsMtD4jA0aKVC8pnBbpouiBb',
    secretKey: 'GM0aSlrFlw1fP3FY65qziQeQ5pTPTn2T'
}
// var client = new bbt.Connector({apiKey: 'gsMtD4jA0aKVC8pnBbpouiBb', secretKey: 'GM0aSlrFlw1fP3FY65qziQeQ5pTPTn2T'});

// client.read({
//     channel: '5008MQ7',
//     resource: 'co', 
//     limit: 5/* Retrieves last 5 records */
//   }, function(err, res) {
//     if (err) {
//         throw (err)
//     } else {
//         console.log("heheh",res)
//     }
//   });

client = new bbt.Stream({ transport: transport });

client.on('connected', function(res) {
    client.subscribe( '5008MQ7', 'co', {read: true, write: true}, function(err,message){
        // res.render(__dirname + "/view/main", {msg:message});
        if (err) {
            throw(err);
        } else {
            console.log("Beebotte data",message);
        }
      })
})

// app.get('/', function(req, res) {
//     res.render(__dirname + '/view/main',{name:'asdada'});
// });

app.set('view engine','ejs');
app.set("views", path.join(__dirname, "views"));

// http.listen(port, function() {
//     console.log('Server start at port',port);
// });








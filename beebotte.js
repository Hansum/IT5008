var bbt = require('beebotte');
var express = require('express');
var app = express();
var path = require("path");
var http = require('http');
const server = require('http').Server(app)
const io = require('socket.io')(server);
var bodyParser = require('body-parser')
var data;
// var http = require('http').createServer(app);
const hostname = '127.0.0.1';
const port = 8080;
var transport = {
    type: 'socketio',
    apiKey: 'gsMtD4jA0aKVC8pnBbpouiBb',
    secretKey: 'GM0aSlrFlw1fP3FY65qziQeQ5pTPTn2T'
}

// client = new bbt.Stream({ transport: transport });

// client.on('connected', function() {
//     client.subscribe( '5008MQ7', 'co', {read: true, write: true}, function(err,message){
//         // res.render(__dirname + "/view/main", {msg:message});
//         if (err) {
//             throw(err);
//         } else {
//             console.log("MESSAGE",message)
//         }
//       })

//       .on('subscribed', function(sub) {
//         client.read( '5008MQ7', 'co');
//       })
// })



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))



app.get('/', function(req, res) {
    res.sendFile(__dirname + '/view/index.html');
});


app.set('view engine','ejs');
app.set("views", path.join(__dirname, "views"));

server.listen(port, function() {
    console.log('Server start at port',port);
});

io.on('connection', socket => {
    console.log("User connected")
    const getCurrentData = _ => new Promise( (resolve, reject) => {
            
        var client = new bbt.Connector({apiKey: 'gsMtD4jA0aKVC8pnBbpouiBb', secretKey: 'GM0aSlrFlw1fP3FY65qziQeQ5pTPTn2T'});
            client.read({
                channel: '5008MQ7',
                resource: 'co',
                limit: 1/* Retrieves last 5 records */
            }, function(err, res) {
                if (err) {
                    throw (err)
                } else {
                    resolve(res.data)
                }
            });
    })

    socket.on("start", async () => {
        let promised = []
        promised.push(getCurrentData())
        Promise.all(promised)
                .then((value) =>{
                    console.log(value)
                    console.log("Here")
                })
    })
})




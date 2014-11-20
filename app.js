var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

var routes = require('./routes/index');
var users = require('./routes/users');
var question = require('./routes/question');
var answer2 = require('./routes/two-answer');
var answer4 = require('./routes/four-answer');
var answert = require('./routes/text-answer');

var maru_count = 0;
var batsu_count = 0;
var a_count = 0;
var b_count = 0;
var c_count = 0;
var d_count = 0;
var textArray = new Array();
var questionArray = new Array();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/question', question);
app.use('/two-answer', answer2);
app.use('/four-answer', answer4);
app.use('/text-answer', answert);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = http.createServer(app);
server.listen(2000);

// Socket.IO
var socketio = require('socket.io');
var io = socketio.listen(server);

io.sockets.on("connection", function(socket){
    console.log("Connected!");
    // メッセージ送信（送信者にも送られる）
    socket.on("maru:send", function (data) {
        maru_count++;
        io.sockets.emit("maru:send", {value:maru_count});
    });

    socket.on("batsu:send", function (data) {
        batsu_count++;
        io.sockets.emit("batsu:send", {value:batsu_count});
    });

    socket.on("a:send", function (data) {
        a_count++;
        io.sockets.emit("a:send", {value: a_count});
    });

    socket.on("b:send", function (data) {
        b_count++;
        io.sockets.emit("b:send", {value: b_count});
    });

    socket.on("c:send", function (data) {
        c_count++;
        io.sockets.emit("c:send", {value: c_count});
    });

    socket.on("d:send", function (data) {
        d_count++;
        io.sockets.emit("d:send", {value: d_count});
    });

    socket.on("text:send", function (data) {
        //textArary.push(data);
        io.sockets.emit("text:send", data);
    });

    socket.on("question:send", function (data) {
        questionArray.push(data.value);
        io.sockets.emit("question:send", data.value);
    });

    socket.on("answer-type", function(data){
        var type = data.value;
        io.sockets.emit("answer-type", {value: type});
    });
});


/*
// 切断したときに送信
socket.on("disconnect", function(){
// io.sockets.emit("S_to_C_message", {value:"user disconnected"});
});
*/
//});

module.exports = app;

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

    // メッセージ送信（送信者にも送られる）
    socket.on("maru:send", function (data) {
        maru_count++;
        io.sockets.emit("maru:send", {value:maru_count});
    });

    socket.on("batsu:send", function (data) {
        batsu_count++;
        io.sockets.emit("batsu:send", {value:batsu_count});
    });

    socket.on("maru_batsu", function (data) {
        io.sockets.emit("maru_batsu", {value:data});
        console.log(data);
    });



    // 切断したときに送信
    socket.on("disconnect", function(){
        // io.sockets.emit("S_to_C_message", {value:"user disconnected"});
    });
});

module.exports = app;

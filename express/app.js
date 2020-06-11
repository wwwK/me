var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 解决跨域 https://juejin.im/post/5d83465e6fb9a06add4e661c
const cors = require('cors');
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
  next();
});

//连接数据库
var server = require('http').Server(app);
var io = require('socket.io')(server, {
    path: '/socket'
});

server.listen(3002);
// WARNING: app.listen(80) will NOT work here!

io.on('connection', function(socket) {

    console.log('a user connected')
    io.emit('login', { msg: '一个位用户已登录', content: 1 })

    // to one room
    // socket.to('others').emit('an event', { some: 'data' });

    //监听发送的消息
    socket.on('mes', function(data) {
        if (data.editor) {
            io.emit('update', { msg: 'server发的最新内容', content: data.editor })
        }
    })

    socket.on('disconnect', function() {
        io.emit('user disconnected');
    });
});

module.exports = app;
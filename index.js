const express = require('express');
// const chalk = require("chalk")
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const http = require('http');
const { Server } = require("socket.io");
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();
const homeRouter = require('./src/routers/home');
const userTabRouter = require('./src/routers/userTab');
const chatReader = require('./src/utils/chatReader');
const dataSocketManager = require('./src/utils/dataSocket');
const websocketPort = process.env.WEBSOCKET_PORT;

app.use(morgan('tiny'));
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use('/userTabs', userTabRouter);
app.use('/', homeRouter);

const server = http.createServer(app);
const io = new Server(server);

server.listen(websocketPort, () => {
    console.log('listening on ', websocketPort);
});

chatReader.readChatroom();
dataSocketManager.openSocket(io);

// dataSocketManager.openDataSocket(app);
const express = require('express');
const app = express();
const http = require('http');

const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*", } });
module.exports = io;

const sequelize = require('./config/db-config');

sequelize.sync().then(() => {
    console.log('Database is ready!');
    
    require('./config/express-config')(app);
    require('./routes')(app);
    require('./socketIO')(io);

    server.listen(5000, () => {
        console.log('Server is listening on *:5000');
    });
});
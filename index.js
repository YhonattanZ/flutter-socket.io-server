const express = require('express');
const path = require('path');
require('dotenv').config();

//App express
const app = express();

//Node server 
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server); 
require('./sockets/socket.js');




const publicpath = path.resolve(__dirname, 'public');

app.use(express.static(publicpath));
server.listen( process.env.PORT, (err)=>{

if (err) throw new Error(err);
console.log(`Servidor corriendo puerto`, process.env.PORT)

})

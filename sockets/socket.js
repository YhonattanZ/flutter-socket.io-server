const { io } = require('../index');


//Sockets messages
io.on('connection', client => {
    console.log('Cliente conectado');
   
    client.on('disconnect', ()=>{console.log('Cliente desconectado')});

    client.on('mensaje',(payload) => {
        console.log('Mensaje mi loco', payload);
        io.emit('mensaje', {admin: 'Mensaje Admin'})
    });

});


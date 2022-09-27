const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
bands.addBand(new Band('Yuzu'));
bands.addBand(new Band('FLOW'));
bands.addBand(new Band('YOASOBI'));
bands.addBand(new Band('Miku'));

console.log(bands);

//Sockets messages
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());
   
    client.on('disconnect', ()=>{console.log('Cliente desconectado')});

    client.on('mensaje',(payload) => {
        console.log('Mensaje mi loco', payload);
        io.emit('mensaje', {admin: 'Mensaje Admin'})
    });

    client.on('vote-band', (payload) => {
    bands.voteBand(payload.id);
    io.emit('active-bands', bands.getBands());
    });
 
    client.on('add-band', (payload) => {
    const newBand = new Band (payload.name);    
    bands.addBand(newBand);
    io.emit('active-bands', bands.getBands());
    });
 
    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
        });
});



require('./config/config')
const express = require('express')
const mongoose = require('mongoose'); //importamos mongoose
const path= require ('path');
const app = express()
const bodyParser = require('body-parser');

//parse aplicacion
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//habiilidar el public

app.use(express.static(path.resolve(__dirname ,'../public')));
//unica importacion que carga todas las rutas

app.use(require('./routes/index')); //usando rutas del usuario

//conexión a la BD
mongoose.connect(process.env.URLDB, (err, resp) => { //recibimos un error o una respuesta.
    if (err) throw error; //si sae error me mostrará por qué
    console.log('Base de datos ONLINE');
});
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto', process.env_PORT);
});


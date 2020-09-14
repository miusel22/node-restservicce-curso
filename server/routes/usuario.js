
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');//exportamos underscore
const Usuario = require('../models/usuario'); //objeto para usar y trabajar con ese schema
const { response } = require('express');

const app = express()
//obtener base de datos
app.get('/usuario', function (req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde); //transformando a numero

    let limite = req.query.limite || 5;
    limite = Number(limite); //transformo a numero
    Usuario.find({estado:true}, 'nombre email role estado google img')//podemos definir qué campos queremos mostrar
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {//ejecuta

            if (err) {
                return res.status(400).json({//si sucede cualquier error
                    ok: false,
                    err
                });
            }

            Usuario.count({estado:true}, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });

            }) //recibe una condición para que los cuente


        })
});

app.post('/usuario', function (req, res) {

    let body = req.body; //recibimos toda la info 

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),//encriptando contrasea
        role: body.role

    });

    usuario.save((err, usuarioDB) => { //recibimos un error o el usuario que se creó en la base de datos
        if (err) {
            return res.status(400).json({//si sucede cualquier error
                ok: false,
                err
            });
        }



        res.json({
            ok: true,
            usuario: usuarioDB
        });


    });


});
//actualizar el registro
app.put('/usuario/:id', function (req, res) {//obtenemos el parametro del id para ponder eliminarlo
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']); //recibe el objeto que tiene todas las propiedades


    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }



        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })

});

//Borrando el registro

app.delete('/usuario/:id', function (req, res) {
  
let id= req.params.id;

//Usuario.findByIdAndRemove(id, (err,usuarioBorrado)=>{ //borrado fisicamente

//definimos esto para cambiar el estado
let cambiaEstado={
    estado:false
} ;

Usuario.findByIdAndUpdate(id,cambiaEstado, {new:true}, (err,usuarioBorrado)=>{   //cambiamos el estado
    if (err) {
        return res.status(400).json({
            ok: false,
            err
        });
    };
    if(!usuarioBorrado){
        return res.status(400).json({
            ok: false,
            err:{
            message:'Usuario no encontrado'
            }
        });
    };
    
    res.json({
    ok:true,
    usuario: usuarioBorrado
    });
});

});


module.exports = app; //exportamos el archivo
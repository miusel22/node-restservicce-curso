const express= require('express');

let{verificaToken, verificarAdmin_Role}= require('../middelwares/autenticacion');


let app= express();

const Categoria =require('../models/categoria');



//servicio que se encarga de mostrar todas las categorias
app.get('/categoria',verificaToken,(req,res)=>{
    Categoria.find({})
    .sort('descripcion')
    .populate('usuario','nombre email')
    .exec((err,categorias)=>{
        if(err){
            return res.status(500).json({
              ok:false,
              err  
            });
        
        }
        res.json({
        ok:true,
        categorias    
        });
    
    })

});

//mostrar categoria por id
app.get('/categoria/:id',verificaToken,(req,res)=>{
    let id= req.params.id;
Categoria.findById(id, (err,categoriaDB)=>{
    if(err){
        return res.status(500).json({
          ok:false,
          err  
        });
    
    }
    if(!categoriaDB){
        return res.status(500).json({
          ok:false,
          err  :{
              message:'El id no es correcto'
          }
        });
    
    }
    res.json({
    ok:true,
    categoria:categoriaDB
    })

})

});


//Crear nueva categoria
app.post('/categoria',verificaToken,(req,res)=>{
let body= req.body;
let categoria= new Categoria({
 descripcion:body.descripcion,
 usuario:req.usuario._id   
});

categoria.save((err,categoriaDB)=>{
if(err){
    return res.status(500).json({
      ok:false,
      err  
    });

}
if(!categoriaDB){
   return res.status(400).json({
       ok:false,
       err
   }) ;
}
res.json({
    ok:true,
    categoria:categoriaDB
});




});

});

// ============================
// Mostrar todas las categorias
// ============================
app.put('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    };

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });


});


//mostrar todas las categorias
app.delete('/categoria/:id',(req,res)=>{
let id= req.params.id;
Categoria.findByIdAndRemove(id,[verificaToken, verificarAdmin_Role] ,(err,categoriaDB)=>{

    if (err) {
        return res.status(500).json({
            ok: false,
            err
        });
    }

    if (!categoriaDB) {
        return res.status(400).json({
            ok: false,
            err:{
                message:'El ID no existe'
            }
        });
    }
    res.json({
        ok:true,
        message:'Categoría borrada'
    })

})

});

module.exports=app;
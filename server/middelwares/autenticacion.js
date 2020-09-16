//creamos una función que ejecute la verificación del token

//=======
//VERIFICAR TOKEN
//====
//improtamos la libreria de JWT
const jwt = require('jsonwebtoken');
let verificaToken = (req, res, next) => { //recibe 3 aegumentos

    let token = req.get('token');//recibimos e to

    //libreria que nos ayuda a validar si el token no es valido
    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "TOKEN NO VALIDO"
                }
            });
        }

        req.usuario = decoded.usuario;

        next();

    })

};
//=====VERIFICAR ADMINROLE
let verificarAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next();

    } else {
        res.json({
            ok: false,
            err: {
                message: 'El usuario no es administador'
            }
        });
    }





};

module.exports = {
    verificaToken,
    verificarAdmin_Role
}
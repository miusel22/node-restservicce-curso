//encargado de trabajar modelo de datos
const mongoose= require('mongoose');
const uniqueValidator= require('mongoose-unique-validator'); //plugin del uniquevalidator

let rolesValidos={ //objeto que tiee varias propiedades
    values:['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido' //validación del rol
    };
let Schema = mongoose.Schema;


//definimos nuestro esquema

let usuarioSchema= new Schema({ //definimos las reglas , los campos que va a tener la conexión
 nombre:{
     type: String,
     required: [true,'El nombre es necesario']
 },
 email:{
     type:String,
     unique:true, //para que funcione el pluggin
     require:[true, 'El correo es necesario']
 },
 password:{
     type:String,
     require:[true, 'La contraseña es obligatoria']

 },
 img:{
     type:String,
     require:false
 },
 role:{
     type:String,
     default: 'USER_ROLE',
     enum:rolesValidos
     
 },
 estado:{
     type: Boolean,
     default:true,
 },
 google:{
    type: Boolean,
    default:false
 }

});  
//para no mostrar la contraseña
usuarioSchema.methods.toJSON = function(){
let user= this;
let userObject= user.toObject();
delete userObject.password;
return userObject;

}
//usando pluggin en particular

usuarioSchema.plugin(uniqueValidator, {message:'{PATH} debe de ser unico'});

module.exports= mongoose.model('Usuario', usuarioSchema) //para exportar y le damos un nombre al squema que va a tener toda la conf de usuario

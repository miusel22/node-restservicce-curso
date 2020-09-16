

//==================
//PUERTO
//================

process.env.PORT= process.env.PORT || 3000;
//==================
//ENTORNO
//================

process.env.NODE_ENV= process.env.NODE_ENV || 'dev';
//==================
//BASE DE DATOS
//================
//==================
//VENCIMIENTO DE TOKEN
//================
//60 segundos
//60 mn
//24 horas
//20dias

process.env.CADUCIDAD_TOKEN=60*60*24*30;
//==================
//SEED DE AUTENTICACION
//================

process.env.SEED=process.env.SEED || 'este-es-el-seed-desarrollo';

let urlDB;
if(process.env.NODE_ENV === 'dev'){
urlDB='mongodb://localhost:27017/cafe';    
}
else{
urlDB=process.env.MONGO_URI;    
}

process.env.URLDB= urlDB;


//==================
//GOOGLE CLIENT ID
//================

process.env.CLIENT_ID= process.env.CLIENT_ID || '228074250612-f00hnf79ubhgckrhpgrjvravn9ten24g.apps.googleusercontent.com';


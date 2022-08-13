const sequelize = require("Sequelize");
const express = require('express');
const sqlite =require ("./Connection");
const app = express();


sqlite
	.authenticate()
	.then(() => {
		
	})
	.catch((e) => {
		console.log(e);
	});
app.listen(8000,()=>{
  console.log("Servidor Conectado")
  
})
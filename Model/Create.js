const Sequelize =require("sequelize");
const Sqlite =require ("./../Connection.js");


  const  Create =Sqlite.define("games",{
  title:{
    type:Sequelize.TEXT
  },
  estudio:{
    type:Sequelize.TEXT
  },
  description:{
    type:Sequelize.TEXT
  },
  ano:{
    type:Sequelize.TEXT
  }
});
Create.sync({force:true});
module.exports=Create;
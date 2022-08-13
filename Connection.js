const {Sequelize}= require('sequelize');
const sequelize =new Sequelize('Api','root','',{
  dialect:'sqlite',
  host: './API.sqlite'
})
module.exports=sequelize;
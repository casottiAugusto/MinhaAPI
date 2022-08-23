const Sequelize = require('sequelize');
const Sqlite = require('./../Connection.js');

const User = Sqlite.define('user', {
	email: { 
    type: Sequelize.STRING 
  },
	nome: { 
    type: Sequelize.STRING 
  },
	senha: { 
    type: Sequelize.STRING 
  }
});
//User.sync({ force: true });
module.exports = User;

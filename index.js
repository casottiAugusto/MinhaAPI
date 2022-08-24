const sequelize = require('Sequelize');
const express = require('express');
const sqlite = require('./Connection');
const db = require('./Model/Create');
const User = require('./Model/User');
const bodyparse = require('body-parser');
const cors = require('cors');
const jwt =require('jsonwebtoken');

const JWTSecret="gnoqz8huJ77jjDhNF7OHCh73ScB5toHwfxk3lxE2oP3jP";

const app = express();
app.use(cors());
function auth(req,res,next){
	const authToken=req.headers['authorization'];
	if (authToken !=undefined) {
	const bearer =authToken.split(" ");
	const token=bearer[1];
	jwt.verify(token,JWTSecret,(err,data)=>{
		if (err) {
			res.status(401);
			res.json({error:"tokem Invalido"});
		}else{
			console.log(data)

		}

	})
		
	}else{
		res.status(401)
		res.json({erro:"Token não passado"})

	}
	next()
}

app.use(bodyparse.json());

sqlite.authenticate().then(() => { }).catch((e) => {
	console.log(e);
});
app.get('/games', auth,(req, res) => {
	db
		.findAll()
		.then((g) => {
			res.json(g);
			res.sendStatus(200);
		})
		.catch((erro) => {
			res.sendStatus(400);
		});
});
app.get('/user', (req, res) => {
	User.findAll().then((u) => {
		res.json(u);
		res.status(200);
	})
})
app.post('/user', (req, res) => {
	let { email, nome, senha } = req.body;
	User
		.create({
			email: email,
			nome: nome,
			senha: senha
		})
		.then(() => {
			res.sendStatus(200);
		})
		.catch((err) => {
			console.log(err);
		});
});
app.post('/auth', (req, res) => {
	let { nome, senha } = req.body;
	if (nome != undefined) {
		User.findOne({ where: { nome: nome, senha: senha } })
			.then(user => {
				if (user != undefined) {
					if (user.senha == senha) {
						jwt.sign({id:User.id,email:User.email},JWTSecret,{expiresIn:"48h"},(err,token)=>{
							if (err) {
								res.status(400);
								res.json({erro:"Falha ao gerar token"})
								
							}else{
								res.status(200);
								res.json({token:token});

							}
						})
					} else {
						res.status(401);
						res.json("Credenciais invalidas!");
					}
				} else {
					res.status(404);
					res.json({ e: "Nome não encontrado." })
				}
			}).catch(e => console.log(e, "Deu merda..."))
	} else {
		res.status(400);
		res.json({ e: "Nome ou senha invalido" });
	}
});

app.post('/game', (req, res) => {
	let { title, estudio, description, ano } = req.body;

	db
		.create({
			title: title,
			estudio: estudio,
			description: description,
			ano: ano
		})
		.then(() => {
			res.sendStatus(200);
		})
		.catch((err) => {
			console.log(err);
			res.sendStatus(400);
		});
});
app.delete('/game/:id', (req, res) => {
	if (isNaN(req.params.id)) {
		res.sendStatus(400);
	} else {
		let { id } = req.params;

		db
			.findOne({ where: { id: id } })
			.then((g) => {
				if (g == null) {
					res.sendStatus(404);
				} else {
					db.destroy({ where: { id: id } });
					res.sendStatus(200);
				}
			})
			.catch((err) => {
				console.log(err);
				res.sendStatus(500);
			});
	}
});
app.put('/game/:id', (req, res) => {
	if (isNaN(req.params.id)) {
		res.sendStatus(400);
	} else {
		let { id } = req.params;

		db
			.findOne({ where: { id: id } })
			.then((g) => {
				if (g == null) {
					res.sendStatus(404);
				} else {
					let { title, estudio, description, ano } = req.body;
					if (title != undefined) {
						g.update({ title: title }, { where: { id: id } });
					}
					if (estudio != undefined) {
						g.update({ estudio: estudio }, { where: { id: id } });
					}
					if (description != undefined) {
						g.update({ description: description }, { where: { id: id } });
					}
					if (ano != undefined) {
						g.update({ ano: ano }, { where: { id: id } });
					}
					res.sendStatus(200);
				}
			})
			.catch((err) => {
				console.log(err);
				res.sendStatus(500);
			});
	}
});

app.listen(8000, (res, req) => { });

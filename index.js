const sequelize = require('Sequelize');
const express = require('express');
const sqlite = require('./Connection');
const create = require('./Model/Create');
const bodyparse = require('body-parser');

const app = express();

app.use(bodyparse.json());

sqlite.authenticate().then(() => {}).catch((e) => {
	console.log(e);
});
app.get('/games', (req, res) => {
	create
		.findAll()
		.then((g) => {
			res.json(g);
			res.sendStatus(200);
		})
		.catch((erro) => {
			res.sendStatus(400);
		});
});


app.post('/game', (req, res) => {
	const { title, estudio, description, ano } = req.body;
	console.log(title);
	create
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
app.listen(8000, (res, req) => {});

const sequelize = require('Sequelize');
const express = require('express');
const sqlite = require('./Connection');
const db = require('./Model/Create');
const bodyparse = require('body-parser');
const { where } = require('Sequelize');

const app = express();

app.use(bodyparse.json());

sqlite.authenticate().then(() => {}).catch((e) => {
	console.log(e);
});
app.get('/games', (req, res) => {
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

app.post('/game', (req, res) => {
	const { title, estudio, description, ano } = req.body;
	console.log(title);
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


app.listen(8000, (res, req) => {});

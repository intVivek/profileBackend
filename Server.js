const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'login',
	password: '1+2=Three',
	port: '3306'
});

app.use(function(req, res, next) {
	console.log(req.headers.origin);
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
	next();
});

db.connect(function (err) {
	if (err) throw err;
	console.log("Database Connected!");
});


app.post('/submit',(req, res) => {
	var q="insert into contactEmail values ('"+req.body.email+"');";;
	console.log(req.body.email,q);

	db.query(q, (error, results) => {
		console.log(results);
	});
});

app.listen(8080,()=>{
  console.log('server started');
})
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contaclist']);
var bodyParser = require('body-parser');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function(req,res) {
    db.contaclist.find(function(err,docs) {
    	console.log(docs);
    	res.json(docs);
    });
});

app.post('/contactlist', function(req,res) {
	db.contaclist.insert(req.body,function(err, doc) {
		res.json(doc);
	});
});

app.delete('/contactlist/:id', function(req,res) {
	var id = req.params.id;
	db.contaclist.remove({_id: mongojs.ObjectId(id)},function(err,doc) {
		res.json(doc);
	});
});

app.get('/contactlist/:id', function(req,res) {
	var id= req.params.id;
	db.contaclist.findOne({_id: mongojs.ObjectId(id)}, function(err,doc) {
		res.json(doc);
	});
});

app.put('/contactlist/:id',function(req,res) {
	var id= req.params.id;
	db.contaclist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name:req.body.name, email: req.body.email, telefone: req.body.telefone}},
		new: true},function(err,doc) {
			res.json(doc);
	});
});

app.listen(3000);

console.log('Server runnin on port 3000');
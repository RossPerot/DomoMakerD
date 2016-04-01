var _ = require('underscore');
var models = require('../models');

var Domo = models.Domo;

var makerPage = function(req, res){
	Domo.DomoModel.findByOwner(req.session.account._id, function(err, docs){
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occured'});
		}
		
		res.render('app', {csrfToken: req.csrfToken(), domos: docs});
	});
};
var allDomosPage = function(req, res){
	Domo.DomoModel.find({}, function(err, docs){
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occured'});
		}
		
		res.render('allDomos', {csrfToken: req.csrfToken(), domos: docs});
	});
};

var makeDomo = function(req, res){
	if(!req.body.name || !req.body.age){
		return res.status(400).json({error: "RAWR! All fields are required"});
	}
	var domoData = {
		name: req.body.name,
		age: req.body.age,
		height: req.body.height,
		weight: req.body.weight,
		owner: req.session.account._id,
	};
	
	var newDomo = new Domo.DomoModel(domoData);
	
	newDomo.save(function(err){
		if(err){
			console.log(err);
			return res.status(400).json({error:'An error occured'});
		}
		
		res.json({redirect: '/maker'});
	});
};

module.exports.makerPage = makerPage;
module.exports.make = makeDomo;
module.exports.allDomosPage = allDomosPage;
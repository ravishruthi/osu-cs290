var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5771);

// Referenced: module 'Server-Side Form Handling' -> Form Processing -> GETs
// mainly modified view for get and the code variables to make it more intuitive.
app.get('/',function(req,res){
  var url_params = [];
  for (var param in req.query){
    url_params.push({'key':param,'value':req.query[param]})
  }
  var param_obj = {paramList: url_params};
  res.render('get-request', param_obj)
});

// Referenced module 'Server-Side Form Handling' -> Form Processing -> POSTs
// mainly modified view for get and the code variables to make it more intuitive.
//  modified code to include list of objects for params AND props
//  modified view for post
app.post('/',function(req,res){
  var url_params = [];
  for (var param in req.query){
    url_params.push({'key':param,'value':req.query[param]})
  }
  var obj = {paramList: url_params};

  var properties = [];
  for (var prop in req.body){
    properties.push({'key':prop,'value':req.body[prop]})
  }
  obj.propList = properties;
  res.render('post-request', obj);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

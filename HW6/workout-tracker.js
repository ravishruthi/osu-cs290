// Majority of the code was taken from module: Using MySQL with Node.js
// I changed render to send so that I could have client side js take care of response from server side.
// Only the form to insert a new workout was rendered in handlebars.
var express = require('express');
const mysql = require('./dbcon.js');

var path = require('path');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5114);

app.use(express.static('public'));

app.get('/reset-table',function(req,res,next){
  var context = {};
  //replace your connection pool with the your variable containing the connection pool
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.text = "Table Reset";
      res.render('home',context);
    })
  });
});
// used to always render the form to insert new workout.
app.get('/',function(req,res){
  res.render('home');
});

// used to get all workouts in database.
app.get('/table-data',function(req,res){
  var context = {};
  mysql.pool.query("SELECT * FROM workouts", function(err, rows, fields){
     context.results = JSON.stringify(rows);
     res.send(context);
   });
});

// used to insert new workout.
app.get('/insert', function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)",
  [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
    res.send(context);
  });
});

// used to update workout already in database. I will always send edited data with the data already in database.
app.get('/update',function(req,res,next){
  var context = {};
  mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=?  WHERE id=? ",
    [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs, req.query.id],
    function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Updated " + result.changedRows + " rows.";
    res.send(context);
  });
});

// used to delete workout.
app.get('/delete',function(req,res,next){
  var context = {};
  mysql.pool.query("DELETE FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Deleted" + result.removedRow;
    res.send(context);
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});

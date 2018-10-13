var express = require('express');
var app = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
  host: "localhost",
  user: "himanshu",
  password: "himanshu",
  database: "inventory"
});


app.post('/setItemDetails', function (req, res) {
  if(req.url === '/favicon.ico') {
        res.writeHead(404);
        res.end();
    }
    else{
      res.writeHead(200, {'Content-Type': 'text/json'});
    con.connect(function(err) {
    //if (err) throw err;
    console.log("Connected!");
    });
    var objs = [];
    var values = [
    [req.body.item_name, req.body.item_cat, req.body.payment_type,req.body.txn_id, req.body.amount, req.body.tax, req.body.tax_percentage, req.body.image_url]
  ];
    con.query("INSERT INTO purchase_history (item_name,item_cat,payment_type,txn_id,amount,tax,tax_percentage,image_url) VALUES ?", [values], function (err, results) {
    //if (err) throw err;
 //    for (var i = 0;i < results.rows; i++) {
 //       objs.push({username: results[i].name});
  // }
    console.log(results);
    res.write("aa"+JSON.stringify(results));
    
    res.end();
    });
    }
});


app.get('/getItemDetails', function (req, res) {
  if(req.url === '/favicon.ico') {
        res.writeHead(404);
        res.end();
    }
    else{
      res.writeHead(200, {'Content-Type': 'text/json'});
    con.connect(function(err) {
    //if (err) throw err;
    console.log("Connected!");
    });
    var objs = [];
    con.query("SELECT * FROM purchase_history", function (err, results) {
    //if (err) throw err;
 //    for (var i = 0;i < results.rows; i++) {
 //       objs.push({username: results[i].name});
  // }
    console.log(results);
    res.write(JSON.stringify(results));
    
    res.end();
    });
    }
});



app.listen(8080);
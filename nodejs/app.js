//// Retrieve
//var MongoClient = require('mongodb').MongoClient;
//
//// Connect to the db
//MongoClient.connect("mongodb://candidate.20.mongolayer.com:10655/app33842458", function(err, db) {
//                    if(!err) {
//                    console.log("We are connected");
//                    }
//                    });


var request = require("request")

var url = "http://fuelhackathon.herokuapp.com/users"

// Sample request
//request({
//            url: url,
//            json: true
//        },
//        function (error, response, body) {
//            if (!error && response.statusCode === 200) {
//                console.log(body) // Print the json response
//            }
//        })


var express = require('express');
var fs = require('fs');
var app = express();


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
        res.render('index.ejs',{title:"BB and T"});
        });


app.get('/users', function(req, res){
        request({
                url: url,
                json: true
                },
                function (error, response, users) {
                if (!error && response.statusCode === 200) {
                
                    console.log(users) // Print the json response
                res.render('users.ejs',{title:"BB and T",users:users});

                }
                else
                    res.render('error.ejs');

                })
        });

app.get('/user/:id', function(req, res, next){
        var accountsURL = "http://fuelhackathon.herokuapp.com/accounts/" + req.parms.id;
        console.log("accountsURL = " + accountsURL);
        request({
                url: accountsURL,
                json: true
                },
                function (error, response, accounts) {
                if (!error && response.statusCode === 200) {
                
                console.log(accounts) // Print the json response
                res.render('user.ejs',{title:"Accounts",accounts:accounts});
                
                }
                else
                res.render('error.ejs');
                
                })
        });

app.listen(3000);
console.log('app is listening at localhost:3000');


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
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
                              extended: true
                              }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
        res.render('index.ejs',{title:"BB and T"});
        });

app.post('/login', function(req, res){
        request({
                url: url,
                json: true
                },
                function (error, response, users) {
                if (!error && response.statusCode === 200) {
                    console.log("got users");
                    var currentUserId = 0;
                    var currentUser;
                    console.log("username = " + req.body.username);
                    console.log("password = " + req.body.password);
                    for(var i=0; i<users.length; i++)
                    {
                        console.log("users[i].lastName = " + users[i].lastName);
                        if(users[i].firstName === req.body.username && users[i].lastName == req.body.password)
                        {
                            console.log("MATCH!");
                            currentUser = users[i];
                            currentUserId = users[i]._id;
                            break;
                        }
                    }
                    console.log("currentUser = " + currentUser);
                    if(currentUser != null) // Successful login!
                    {
                        var accountsURL = "http://fuelhackathon.herokuapp.com/accounts/" + currentUserId;
                        console.log("accountsURL = " + accountsURL);
                        request({
                                url: accountsURL,
                                json: true
                                },
                                function (error, response, accounts) {
                                if (!error && response.statusCode === 200) {
                                
                                console.log(accounts) // Print the json response
                                res.render('presentView.ejs',{title:"Accounts",accounts:accounts});
//                                fs.readFile('presentView.html', function(err, page) {
//                                            res.writeHead(200, {'Content-Type': 'text/html'});
//                                            res.write(page);
//                                            res.end();
//                                            });
                                }
                                else
                                res.render('error.ejs');
                                
                                })
                    }
                    else {
                        res.render('index.ejs');
                    }
                }
        })
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

app.get('/usersjson', function(req, res){
        request({
                url: url,
                json: true
                },
                function (error, response, users) {
                if (!error && response.statusCode === 200) {
                
                console.log(users) // Print the json response
                res.render('usersjson.ejs',{title:"BB and T",users:users});
                
                }
                else
                res.render('error.ejs');
                
                })
        });

app.get('/user/:id', function(req, res, next){
        var accountsURL = "http://fuelhackathon.herokuapp.com/accounts/" + req.params.id;
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

app.get('/account/:id', function(req, res, next){
        var transactionsURL = "http://fuelhackathon.herokuapp.com/transactions/" + req.params.id;
        console.log("transactionsURL = " + transactionsURL);
        request({
                url: transactionsURL,
                json: true
                },
                function (error, response, transactions) {
                if (!error && response.statusCode === 200) {
                
                console.log(transactions) // Print the json response
                res.render('account.ejs',{title:"Transactions",transactions:transactions});
                }
                else
                res.render('error.ejs');
                
                })
        });

app.get('/accountMap/:id', function(req, res, next){
        var transactionsURL = "http://fuelhackathon.herokuapp.com/transactions/" + req.params.id;
        console.log("transactionsURL = " + transactionsURL);
        request({
                url: transactionsURL,
                json: true
                },
                function (error, response, transactions) {
                if (!error && response.statusCode === 200) {
                
                console.log(transactions) // Print the json response
                res.render('map.ejs',{title:"Transactions",transactions:transactions});
                }
                else
                res.render('error.ejs');
                
                })
        });
var port = process.env.PORT || 3000;
app.listen(port);
console.log('app is listening on port: ' + port);


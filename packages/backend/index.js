var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();

let transactions = {};

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  console.log("/");
  res.status(200).send("hello world");
});
app.get("/:address", function (req, res) {
  let address = req.params.address;
  console.log("/", address);
  res.status(200).send(transactions[address]);
});

app.post("/clearAddress", function (request, response) {
  console.log("CLEARING!!!!", request.body); // your JSON
  response.send(request.body); // echo the result back
  transactions[request.body.id] = {};
  console.log("transactions", transactions);
  response.status(200).send("success");
});

app.post("/", function (request, response) {
  console.log("POOOOST!!!!", request.body); // your JSON
  response.send(request.body); // echo the result back
  if (!transactions[request.body.id]) {
    transactions[request.body.id] = {};
  }
  transactions[request.body.id][request.body.bidder] = request.body;
  console.log("transactions", transactions);
});

app.post("/reset/secret", function (request, response) {
  transactions = {};
  response.status(200).send("success");
});

var server = app.listen(8001, function () {
  console.log("app running on port.", server.address().port);
});

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/GJDB", {useNewUrlParser: true});

const journalSchema = {
  gone: String,
  gtwo: String,
  gthree: String,
  affirmations: String,
  date: String

};

const Entry = mongoose.model("Entry", journalSchema);


app.get("/", function(req, res){
  Entry.find({}, function(err, entries){
  res.render("allposts", {
  entries: entries
    });
  });

});

app.get("/makePost", function(req, res){
  res.render("makePost");
});

app.post("/makePost", function(req, res){
  const entry = new Entry({
    gone: req.body.grateful1,
    gtwo: req.body.grateful2,
    gthree: req.body.grateful3,
    affirmations: req.body.affirmations,
    date: req.body.date
    });


  entry.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

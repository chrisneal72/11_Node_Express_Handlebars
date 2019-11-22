var express = require("express");

var router = express.Router();

// Import the model (burger_models.js) to use its database functions.
var burger = require("../models/burger_models.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(data) {
    let burgers = [];
    let devBurgers = [];
    data.forEach(function(currentValue){
      if(currentValue.devoured){
        devBurgers.push(currentValue);
      }else{
        burgers.push(currentValue);
      }
    });
    var hbsObject = {
      burger: burgers,
      devoured: devBurgers
    };
    console.log(hbsObject);
    res.render("burger_lists", hbsObject);
  });
});

router.post("/api/burger", function(req, res) {
  burger.create([
    "name"
  ], [
    req.body.name
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burger/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burger/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  // console.log(condition)
  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;

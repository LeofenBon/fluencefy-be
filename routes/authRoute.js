const express = require("express");

const authController = require("./../controller/authController");

router = express.Router();

router.route("/signup").post((req, res, next) => {
  if (req.body.influencer) return next("route");
  else next();
}, authController.createBrand);

router.route("/signup").post(authController.createInfluencer);

module.exports = router;

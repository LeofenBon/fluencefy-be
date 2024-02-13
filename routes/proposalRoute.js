const proposalController = require("./../controller/proposalController");

const express = require("express");

const router = express.Router();

router.route("/").post(proposalController.createProposal);

module.exports = router;

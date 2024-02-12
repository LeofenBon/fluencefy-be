"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class proposal extends Model {
    static associate(models) {}
  }
  proposal.init({}, { sequelize, modelName: "proposal" });
  return proposal;
};

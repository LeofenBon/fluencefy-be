"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    static associate(models) {
      this.belongsTo(models.brand_profile);
      this.belongsToMany(models.influencer_profile, {
        through: models.proposal,
      });
    }
  }
  project.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      niche: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "project",
    }
  );
  return project;
};

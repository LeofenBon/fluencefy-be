"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class influencer_profile extends Model {
    static associate(models) {
      this.belongsToMany(models.project, { through: models.proposal });
    }
  }
  influencer_profile.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      niche: {
        type: DataTypes.STRING,
      },
      insta_follower_count: {
        type: DataTypes.STRING,
      },
      instagram_link: {
        type: DataTypes.STRING,
      },
      twitter_follower_count: {
        type: DataTypes.STRING,
      },
      twitter_link: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "influencer_profile",
    }
  );
  return influencer_profile;
};

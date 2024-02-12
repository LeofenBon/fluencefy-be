"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class influencer_profile extends Model {
    static associate(models) {
      this.belongsToMany(models.project, { through: models.proposal });
    }
    async validatePassword(password) {
      return await bcrypt.compare(password, this.password);
    }

    isPasswordChanged(jwtTimestamp) {
      if (this.password_changed_at) {
        const pChangedTimestamp = parseInt(
          this.password_changed_at.getTime() / 1000,
          10
        );
        console.log("jwtTimestamp", jwtTimestamp);
        console.log("pChangedTimestamp", pChangedTimestamp);
        return jwtTimestamp < pChangedTimestamp;
      }
      return false;
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
        validate: {
          notNull: {
            msg: "Please enter your first name",
          },
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your last name",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Please enter a valid email address",
          },
          notNull: {
            msg: "Please enter your email address",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your password",
          },
          len: [8],
        },
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
      password_changed_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "influencer_profile",
    }
  );

  influencer_profile.beforeCreate(async (influencer, options) => {
    try {
      const hashedPassword = await bcrypt.hash(influencer.password, 12);
      influencer.password = hashedPassword;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  });

  return influencer_profile;
};

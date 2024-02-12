"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class brand_profile extends Model {
    static associate(models) {
      return this.hasMany(models.project);
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
        return jwtTimestamp < pChangedTimestamp;
      }
      return false;
    }
  }

  brand_profile.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      brand_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter brand name",
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
            msg: "Please enter email address",
          },
        },
        set(value) {
          this.setDataValue("email", value.toLowerCase());
        },
      },
      brand_picture: {
        type: DataTypes.STRING,
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
      password_changed_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "brand_profile",
    }
  );

  brand_profile.beforeCreate(async (brand, options) => {
    try {
      const hashedPassword = await bcrypt.hash(brand.password, 12);
      console.log("hashedPassword", hashedPassword);
      brand.password = hashedPassword;
    } catch (err) {
      console.log(err);
    }
  });

  return brand_profile;
};

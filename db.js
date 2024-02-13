const { Sequelize } = require("sequelize");

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sequelizeInstance = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  dialect: "postgres",
  host: PGHOST,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// class User extends Model {}
// User.init(
//   {
//     id: {
//       type: Sequelize.UUID,
//       defaultValue: Sequelize.UUIDV4,
//       primaryKey: true,
//     },
//     username: DataTypes.STRING,
//     birthday: DataTypes.DATE,
//   },
//   { sequelize: sequelizeInstance, modelName: "user" }
// );

// (async () => {
//   await sequelizeInstance.sync();
//   const jane = await User.create({
//     username: "janedoe",
//     birthday: new Date(1980, 6, 20),
//   });
//   console.log(jane.toJSON());
// })();

module.exports = sequelizeInstance;

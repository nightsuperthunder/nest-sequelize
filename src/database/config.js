// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    dialect: process.env.SEQUELIZE_DIALECT,
    host: process.env.SEQUELIZE_HOST,
    port: process.env.SEQUELIZE_PORT,
    username: process.env.SEQUELIZE_USERNAME,
    password: process.env.SEQUELIZE_PASSWORD,
    database: process.env.SEQUELIZE_DATABASE,
  },
  test: {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'sequelize_test',
  },
  production: {
    dialect: process.env.SEQUELIZE_DIALECT,
    host: process.env.SEQUELIZE_HOST,
    port: process.env.SEQUELIZE_PORT,
    username: process.env.SEQUELIZE_USERNAME,
    password: process.env.SEQUELIZE_PASSWORD,
    database: process.env.SEQUELIZE_DATABASE,
  },
};

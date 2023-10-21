import Sequelize from "sequelize";
import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _items from "./items.js";
import _users from "./users.js";

const sequelize = new Sequelize(
  process.env.DB_NM,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

function initModels(sequelize) {
  const items = _items.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  items.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasMany(items, { as: "items", foreignKey: "user_id" });

  return {
    items,
    users,
  };
}

const models = initModels(sequelize);
export default models;
export { sequelize };

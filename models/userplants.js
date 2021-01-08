'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPlants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserPlants.belongsTo(models.User, {
        foreignKey: "parent",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
      UserPlants.hasMany(models.Photos,{
        foreignKey: 'userPlant',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      })
    }
  };
  UserPlants.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    birthday: {
      type: DataTypes.STRING
    },
    TreffleId: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'UserPlants',
    tableName: 'userPlants'
  });
  return UserPlants;
};
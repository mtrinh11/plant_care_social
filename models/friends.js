'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friends extends Model {
    static associate(models) {
    }
  };
  Friends.init({
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'users',
          key:'id'
        }
      },
      friendId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      }
  }, {
    sequelize,
    modelName: 'Friends',
    tableName: 'friends'
  });
  return Friends;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friends extends Model {
    static associate(models) {
      // Friends.belongsTo(models.User, {
      //   as: "sender",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE"
      // })
      // Friends.belongsTo(models.User, {
      //   as: "accepter",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE"
      // })
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
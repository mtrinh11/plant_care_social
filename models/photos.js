'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Photos.belongsTo(models.UserPlants, {
        foreignKey: "user_plant_id",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  };
  Photos.init({
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userPlant: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UserPlant',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Photos',
    tableName: 'photos'
  });
  return Photos;
};
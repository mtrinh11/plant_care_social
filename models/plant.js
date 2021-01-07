'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Plant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Plant.init(
    {
      author: DataTypes.STRING,
      bibliography: DataTypes.TEXT,
      common_name: DataTypes.STRING,
      family: DataTypes.STRING,
      family_common_name: DataTypes.STRING,
      genus: DataTypes.STRING,
      links: {
        type: DataTypes.JSONB,
        get: function (value) {
          return JSON.parse(this.getDataValue(value))
        }
      },
      rank: DataTypes.STRING,
      scientific_name: DataTypes.STRING,
      slug: DataTypes.STRING,
      status: DataTypes.STRING,
      synonyms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: []
      },
      year: DataTypes.BIGINT
    },
    {
      sequelize,
      modelName: 'Plant',
      tableName: 'plants',
      hooks: {
        beforeCreate: function (plant) {
          console.log(plant.dataValues.links)
          plant.dataValues.links = JSON.stringify(plant.dataValues.links)
        }
      }
    }
  )
  return Plant
}
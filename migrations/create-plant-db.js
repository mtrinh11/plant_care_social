'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('plants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      author: Sequelize.STRING,
      bibliography: Sequelize.TEXT,
      common_name: Sequelize.STRING,
      family: Sequelize.STRING,
      family_common_name: Sequelize.STRING,
      genus: Sequelize.STRING,
      links: {
        type: Sequelize.JSONB,
        get: function (value) {
          return JSON.parse(this.getDataValue(value))
        }
      },
      rank: Sequelize.STRING,
      scientific_name: Sequelize.STRING,
      slug: Sequelize.STRING,
      status: Sequelize.STRING,
      synonyms: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        defaultValue: []
      },
      year: Sequelize.BIGINT,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('plants')
  }
}
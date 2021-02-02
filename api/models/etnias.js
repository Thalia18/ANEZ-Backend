const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Etnias = sequelize.define(
    'etnias',
    {
      etnia_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      etnia: {
        type: DataTypes.CHAR(20),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated_at',
      },
    },
    {
      sequelize,
      tableName: 'etnias',
      schema: 'public',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'etnias_pk',
          unique: true,
          fields: [{ name: 'etnia_id' }],
        },
        {
          name: 'pk_etnias',
          unique: true,
          fields: [{ name: 'etnia_id' }],
        },
      ],
    }
  );
  Etnias.associate = function (models) {
    Etnias.hasMany(models.pacientes, {
      foreignKey: 'etnia_id',
    });
  };
  // Etnias.sync();
  return Etnias;
};

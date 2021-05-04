const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Generos = sequelize.define(
    'generos',
    {
      genero_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      genero: {
        type: DataTypes.CHAR(15),
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
      tableName: 'generos',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'generos_pk',
          unique: true,
          fields: [{ name: 'genero_id' }],
        },
        {
          name: 'pk_generos',
          unique: true,
          fields: [{ name: 'genero_id' }],
        },
      ],
    }
  );
  Generos.associate = function (models) {
    Generos.hasMany(models.pacientes, {
      foreignKey: 'genero_id',
    });
  };
  return Generos;
};

const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Capitulos = sequelize.define(
    'capitulos',
    {
      capitulo_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      codigo: {
        type: DataTypes.CHAR(5),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.CHAR(256),
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
      tableName: 'capitulos',
      schema: 'public',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'capitulos_pk',
          unique: true,
          fields: [{ name: 'capitulo_id' }],
        },
        {
          name: 'pk_capitulos',
          unique: true,
          fields: [{ name: 'capitulo_id' }],
        },
      ],
    }
  );
  Capitulos.associate = function (models) {
    Capitulos.hasMany(models.categorias, {
      foreignKey: 'capitulo_id',
    });
  };
  return Capitulos;
};

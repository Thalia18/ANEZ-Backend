const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Fotos = sequelize.define(
    'fotos',
    {
      foto_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      evolucion_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'evoluciones',
          key: 'evolucion_id',
        },
      },
      foto_url: {
        type: DataTypes.CHAR(150),
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
      tableName: 'fotos',
      schema: 'public',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'evolucionesfotos_fk',
          fields: [{ name: 'evolucion_id' }],
        },
        {
          name: 'fotos_pk',
          unique: true,
          fields: [{ name: 'foto_id' }],
        },
        {
          name: 'pk_fotos',
          unique: true,
          fields: [{ name: 'foto_id' }],
        },
      ],
    }
  );
  Fotos.associate = function (models) {
    Fotos.belongsTo(models.evoluciones, {
      foreignKey: 'evolucion_id',
      as: 'evolucion',
    });
  };
  return Fotos;
};

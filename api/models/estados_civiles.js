const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const EstadosCiviles = sequelize.define(
    'estados_civiles',
    {
      estado_civil_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      estado_civil: {
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
      tableName: 'estados_civiles',
      schema: 'public',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'estadosciviles_pk',
          unique: true,
          fields: [{ name: 'estado_civil_id' }],
        },
        {
          name: 'pk_estados_civiles',
          unique: true,
          fields: [{ name: 'estado_civil_id' }],
        },
      ],
    }
  );
  EstadosCiviles.associate = function (models) {
    EstadosCiviles.hasMany(models.pacientes, {
      foreignKey: 'estado_civil_id',
    });
  };
  return EstadosCiviles;
};

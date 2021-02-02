const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const NivelesDeInstruccion = sequelize.define(
    'niveles_de_instruccion',
    {
      nivel_de_instruccion_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nivel_de_instruccion: {
        type: DataTypes.CHAR(25),
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
      tableName: 'niveles_de_instruccion',
      schema: 'public',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'nivelesdeinstruccion_pk',
          unique: true,
          fields: [{ name: 'nivel_de_instruccion_id' }],
        },
        {
          name: 'pk_niveles_de_instruccion',
          unique: true,
          fields: [{ name: 'nivel_de_instruccion_id' }],
        },
      ],
    }
  );

  NivelesDeInstruccion.associate = function (models) {
    NivelesDeInstruccion.hasMany(models.pacientes, {
      foreignKey: 'nivel_de_instruccion_id',
    });
  };
  return NivelesDeInstruccion;
};

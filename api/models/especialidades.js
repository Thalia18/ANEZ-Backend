const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Especialidades = sequelize.define(
    'especialidades',
    {
      especialidad_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      especialidad: {
        type: DataTypes.CHAR(50),
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
      tableName: 'especialidades',
      schema: 'public',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'especialidades_pk',
          unique: true,
          fields: [{ name: 'especialidad_id' }],
        },
        {
          name: 'pk_especialidades',
          unique: true,
          fields: [{ name: 'especialidad_id' }],
        },
      ],
    }
  );
  Especialidades.associate = function (models) {
    Especialidades.belongsTo(models.especialidades_medicos, {
      foreignKey: 'especialidad_id',
      as: 'especialidades',
    });
  };
  return Especialidades;
};

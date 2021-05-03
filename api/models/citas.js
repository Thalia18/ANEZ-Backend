const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Citas = sequelize.define(
    'citas',
    {
      cita_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      medico_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'medicos',
          key: 'medico_id',
        },
      },
      paciente_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'pacientes',
          key: 'paciente_id',
        },
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      hora: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      motivo_cita: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      telefono_paciente: {
        type: DataTypes.CHAR(15),
        allowNull: true,
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
      tableName: 'citas',
      schema: 'public',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'citas_pk',
          unique: true,
          fields: [{ name: 'cita_id' }],
        },
        {
          name: 'citasmedicos_fk',
          fields: [{ name: 'medico_id' }],
        },
        {
          name: 'citaspacientes_fk',
          fields: [{ name: 'paciente_id' }],
        },
        {
          name: 'pk_citas',
          unique: true,
          fields: [{ name: 'cita_id' }],
        },
      ],
    }
  );
  Citas.associate = function (models) {
    Citas.belongsTo(models.pacientes, {
      foreignKey: 'paciente_id',
      as: 'pacientes',
    });
    Citas.belongsTo(models.medicos, {
      foreignKey: 'medico_id',
      as: 'medicos',
    });
  };
  return Citas;
};

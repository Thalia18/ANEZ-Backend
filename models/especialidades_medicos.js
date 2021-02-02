const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const EspecialidadesMedicos = sequelize.define(
    'especialidades_medicos',
    {
      especialidad_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'especialidades',
          key: 'especialidad_id',
        },
      },
      medico_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'medicos',
          key: 'medico_id',
        },
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
      tableName: 'especialidades_medicos',
      schema: 'public',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'especialidadesmedicos2_fk',
          fields: [{ name: 'medico_id' }],
        },
        {
          name: 'especialidadesmedicos_fk',
          fields: [{ name: 'especialidad_id' }],
        },
        {
          name: 'especialidadesmedicos_pk',
          unique: true,
          fields: [{ name: 'especialidad_id' }, { name: 'medico_id' }],
        },
        {
          name: 'pk_especialidades_medicos',
          unique: true,
          fields: [{ name: 'especialidad_id' }, { name: 'medico_id' }],
        },
      ],
    }
  );
  EspecialidadesMedicos.associate = function (models) {
    EspecialidadesMedicos.belongsTo(models.medicos, {
      foreignKey: 'medico_id',
      as: 'medicos',
    });
    EspecialidadesMedicos.belongsTo(models.especialidades, {
      foreignKey: 'especialidad_id',
      as: 'especialidades',
    });
  };
  return EspecialidadesMedicos;
};

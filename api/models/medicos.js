const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Medicos = sequelize.define(
    'medicos',
    {
      medico_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      consultorio_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'consultorios',
          key: 'consultorio_id',
        },
      },
      cedula: {
        type: DataTypes.CHAR(15),
        allowNull: false,
      },
      nombre: {
        type: DataTypes.CHAR(60),
        allowNull: false,
      },
      apellido: {
        type: DataTypes.CHAR(60),
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
      tableName: 'medicos',
      schema: 'public',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'consultoriosmedicos_fk',
          fields: [{ name: 'consultorio_id' }],
        },
        {
          name: 'medicos_pk',
          unique: true,
          fields: [{ name: 'medico_id' }],
        },
        {
          name: 'pk_medicos',
          unique: true,
          fields: [{ name: 'medico_id' }],
        },
      ],
    }
  );
  Medicos.associate = function (models) {
    Medicos.hasMany(models.citas, {
      foreignKey: 'medico_id',
    });
    Medicos.belongsTo(models.consultorios, {
      foreignKey: 'consultorio_id',
      as: 'consultorios',
    });
    Medicos.belongsTo(models.especialidades_medicos, {
      foreignKey: 'medico_id',
      as: 'medicos',
    });
    Medicos.hasMany(models.usuarios, {
      foreignKey: 'medico_id',
    });
  };
  return Medicos;
};

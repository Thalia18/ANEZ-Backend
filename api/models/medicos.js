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
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'usuarios',
          key: 'usuario_id',
        },
      },
      especialidad: {
        type: DataTypes.JSON,
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
          name: 'medicos_pk',
          unique: true,
          fields: [{ name: 'medico_id' }],
        },
        {
          name: 'pk_medicos',
          unique: true,
          fields: [{ name: 'medico_id' }],
        },
        {
          name: 'usuarios_medicos_fk',
          fields: [{ name: 'usuario_id' }],
        },
      ],
    }
  );
  Medicos.associate = function (models) {
    Medicos.hasMany(models.citas, {
      foreignKey: 'medico_id',
    });

    Medicos.belongsTo(models.usuarios, {
      foreignKey: 'medico_id',
      as: 'usuario',
    });
  };
  return Medicos;
};

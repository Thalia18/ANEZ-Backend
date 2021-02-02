const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Evoluciones = sequelize.define(
    'evoluciones',
    {
      evolucion_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      historia_clinica_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'historias_clinicas',
          key: 'historia_clinica_id',
        },
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      motivo_consulta: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      fecha_ultima_menstruacion: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      procedimiento: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      diagnostico: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tratamiento: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      proximo_control: {
        type: DataTypes.DATEONLY,
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
      tableName: 'evoluciones',
      schema: 'public',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'evoluciones_pk',
          unique: true,
          fields: [{ name: 'evolucion_id' }],
        },
        {
          name: 'evolucioneshistoriasclinicas_fk',
          fields: [{ name: 'historia_clinica_id' }],
        },
        {
          name: 'pk_evoluciones',
          unique: true,
          fields: [{ name: 'evolucion_id' }],
        },
      ],
    }
  );
  Evoluciones.associate = function (models) {
    Evoluciones.belongsTo(models.historias_clinicas, {
      foreignKey: 'historia_clinica_id',
      as: 'historiaclinica',
    });
    Evoluciones.hasMany(models.fotos, {
      foreignKey: 'evolucion_id',
    });
    Evoluciones.belongsTo(models.subcategorias_evoluciones, {
      foreignKey: 'evolucion_id',
      as: 'evoluciones',
    });
  };
  return Evoluciones;
};

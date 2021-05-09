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
        allowNull: true,
      },
      diagnostico_cie10: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      medicacion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      foto: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      proximo_control: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      indicacion: {
        type: DataTypes.TEXT,
        allowNull: true,
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
  };
  return Evoluciones;
};

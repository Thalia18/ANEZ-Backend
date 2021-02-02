const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const HistoriasClinicas = sequelize.define(
    'historias_clinicas',
    {
      historia_clinica_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      paciente_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'pacientes',
          key: 'paciente_id',
        },
      },
      antecedente_patologico_personal: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      antecedente_quirurgico: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      alergia: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      gesta: {
        type: DataTypes.CHAR(15),
        allowNull: false,
      },
      parto: {
        type: DataTypes.CHAR(15),
        allowNull: false,
      },
      cesarea: {
        type: DataTypes.CHAR(15),
        allowNull: false,
      },
      aborto: {
        type: DataTypes.CHAR(15),
        allowNull: false,
      },
      metodo_anticonceptivo: {
        type: DataTypes.CHAR(30),
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
      tableName: 'historias_clinicas',
      schema: 'public',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'historiasclinicas_pk',
          unique: true,
          fields: [{ name: 'historia_clinica_id' }],
        },
        {
          name: 'pacienteshistoriasclinicas_fk',
          fields: [{ name: 'paciente_id' }],
        },
        {
          name: 'pk_historias_clinicas',
          unique: true,
          fields: [{ name: 'historia_clinica_id' }],
        },
      ],
    }
  );
  HistoriasClinicas.associate = function (models) {
    HistoriasClinicas.belongsTo(models.pacientes, {
      foreignKey: 'paciente_id',
      as: 'pacientes',
    });
    HistoriasClinicas.hasMany(models.evoluciones, {
      foreignKey: 'historia_clinica_id',
    });
  };
  return HistoriasClinicas;
};

const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Pacientes = sequelize.define(
    'pacientes',
    {
      paciente_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      tipo_de_sangre_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'tipos_de_sangre',
          key: 'tipo_de_sangre_id',
        },
      },
      etnia_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'etnias',
          key: 'etnia_id',
        },
      },
      nivel_de_instruccion_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'niveles_de_instruccion',
          key: 'nivel_de_instruccion_id',
        },
      },
      estado_civil_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'estados_civiles',
          key: 'estado_civil_id',
        },
      },
      nombre: {
        type: DataTypes.CHAR(100),
        allowNull: false,
      },
      apellido: {
        type: DataTypes.CHAR(100),
        allowNull: false,
      },
      cedula: {
        type: DataTypes.CHAR(15),
        allowNull: false,
        unique: 'unique_cedula',
      },
      fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      lugar_nacimiento: {
        type: DataTypes.CHAR(50),
        allowNull: false,
      },
      direccion: {
        type: DataTypes.CHAR(50),
        allowNull: false,
      },
      telefono: {
        type: DataTypes.CHAR(15),
        allowNull: false,
      },
      contacto_emergencia_nombre: {
        type: DataTypes.CHAR(150),
        allowNull: true,
      },
      contacto_emergencia_telefono: {
        type: DataTypes.CHAR(15),
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
    },
    {
      sequelize,
      tableName: 'pacientes',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'pacientes_pk',
          unique: true,
          fields: [{ name: 'paciente_id' }],
        },
        {
          name: 'pacientesestadosciviles_fk',
          fields: [{ name: 'estado_civil_id' }],
        },
        {
          name: 'pacientesetnias_fk',
          fields: [{ name: 'etnia_id' }],
        },
        {
          name: 'pacientesnivelesdeinstruccion_f',
          fields: [{ name: 'nivel_de_instruccion_id' }],
        },
        {
          name: 'pacientestiposdesangre_fk',
          fields: [{ name: 'tipo_de_sangre_id' }],
        },
        {
          name: 'pk_pacientes',
          unique: true,
          fields: [{ name: 'paciente_id' }],
        },
        {
          name: 'unique_cedula',
          unique: true,
          fields: [{ name: 'cedula' }],
        },
      ],
    }
  );
  Pacientes.associate = function (models) {
    Pacientes.belongsTo(models.etnias, {
      foreignKey: 'etnia_id',
      as: 'etnias',
    });
    Pacientes.belongsTo(models.estados_civiles, {
      foreignKey: 'estado_civil_id',
      as: 'estadocivil',
    });
    Pacientes.belongsTo(models.niveles_de_instruccion, {
      foreignKey: 'nivel_de_instruccion_id',
      as: 'niveldeinstruccion',
    });
    Pacientes.belongsTo(models.tipos_de_sangre, {
      foreignKey: 'tipo_de_sangre_id',
      as: 'tipodesangre',
    });
    Pacientes.hasMany(models.citas, {
      foreignKey: 'paciente_id',
    });
    Pacientes.hasMany(models.historias_clinicas, {
      foreignKey: 'paciente_id',
    });
  };
  // Pacientes.sync();
  return Pacientes;
};

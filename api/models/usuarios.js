const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  const Usuarios = sequelize.define(
    'usuarios',
    {
      usuario_id: {
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
      rol_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'roles',
          key: 'rol_id',
        },
      },
      usuario: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        unique: 'unique_usuario',
      },
      contrasena: {
        type: DataTypes.TEXT,
        allowNull: false,
        set(value) {
          const hash = bcrypt.hashSync(
            value,
            10
            // Math.floor(Math.random() * (15 - 8 + 1)) + 8
          );
          this.setDataValue('contrasena', hash);
        },
      },
      cedula: {
        type: DataTypes.CHAR(15),
        allowNull: false,
        unique: 'unique_cedula_usuario',
      },
      nombre: {
        type: DataTypes.CHAR(100),
        allowNull: false,
      },
      apellido: {
        type: DataTypes.CHAR(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.CHAR(150),
        allowNull: true,
      },
      telefono: {
        type: DataTypes.CHAR(15),
        allowNull: false,
      },
      fecha_nacimiento: {
        type: DataTypes.DATEONLY,
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
      tableName: 'usuarios',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'consultorios_usuarios_fk',
          fields: [{ name: 'consultorio_id' }],
        },
        {
          name: 'pk_usuarios',
          unique: true,
          fields: [{ name: 'usuario_id' }],
        },
        {
          name: 'unique_cedula_usuario',
          unique: true,
          fields: [{ name: 'cedula' }],
        },
        {
          name: 'unique_usuario',
          unique: true,
          fields: [{ name: 'usuario' }],
        },
        {
          name: 'usuarios_pk',
          unique: true,
          fields: [{ name: 'usuario_id' }],
        },
        {
          name: 'usuarios_roles_fk',
          fields: [{ name: 'rol_id' }],
        },
      ],
    }
  );
  Usuarios.associate = function (models) {
    Usuarios.hasMany(models.medicos, {
      foreignKey: 'medico_id',
    });
    Usuarios.belongsTo(models.roles, {
      foreignKey: 'rol_id',
      as: 'rol',
    });
    Usuarios.belongsTo(models.consultorios, {
      foreignKey: 'consultorio_id',
      as: 'consultorios',
    });
  };
  return Usuarios;
};

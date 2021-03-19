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
      tableName: 'usuarios',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'pk_usuarios',
          unique: true,
          fields: [{ name: 'usuario_id' }],
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
  };
  return Usuarios;
};

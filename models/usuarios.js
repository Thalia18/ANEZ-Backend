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
      medico_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'medicos',
          key: 'medico_id',
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
      nombre_u: {
        type: DataTypes.CHAR(50),
        allowNull: false,
      },
      contrasena: {
        type: DataTypes.TEXT,
        allowNull: false,
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
          name: 'usuarios_medicos_fk',
          fields: [{ name: 'medico_id' }],
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
  return Usuarios;
};

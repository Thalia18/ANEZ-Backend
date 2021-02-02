const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Roles = sequelize.define(
    'roles',
    {
      rol_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nombre_rol: {
        type: DataTypes.CHAR(50),
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'roles',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'pk_roles',
          unique: true,
          fields: [{ name: 'rol_id' }],
        },
      ],
    }
  );
  return Roles;
};

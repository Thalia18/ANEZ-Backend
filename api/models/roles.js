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
      rol: {
        type: DataTypes.CHAR(50),
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
      tableName: 'roles',
      schema: 'public',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'pk_roles',
          unique: true,
          fields: [{ name: 'rol_id' }],
        },
      ],
    }
  );
  Roles.associate = function (models) {
    Roles.hasMany(models.usuarios, {
      foreignKey: 'rol_id',
    });
  };
  return Roles;
};

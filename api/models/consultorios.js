const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Consultorios = sequelize.define(
    'consultorios',
    {
      consultorio_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.CHAR(60),
        allowNull: false,
      },
      ruc: {
        type: DataTypes.CHAR(15),
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
      logo: {
        type: DataTypes.CHAR(250),
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
      tableName: 'consultorios',
      schema: 'public',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'consultorios_pk',
          unique: true,
          fields: [{ name: 'consultorio_id' }],
        },
        {
          name: 'pk_consultorios',
          unique: true,
          fields: [{ name: 'consultorio_id' }],
        },
      ],
    }
  );
  Consultorios.associate = function (models) {
    Consultorios.hasMany(models.usuarios, {
      foreignKey: 'consultorio_id',
    });
  };
  return Consultorios;
};

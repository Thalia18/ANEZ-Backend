const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const TiposDeSangre = sequelize.define(
    'tipos_de_sangre',
    {
      tipo_de_sangre_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      tipo_de_sangre: {
        type: DataTypes.CHAR(3),
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
      tableName: 'tipos_de_sangre',
      schema: 'public',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'pk_tipos_de_sangre',
          unique: true,
          fields: [{ name: 'tipo_de_sangre_id' }],
        },
        {
          name: 'tiposdesangre_pk',
          unique: true,
          fields: [{ name: 'tipo_de_sangre_id' }],
        },
      ],
    }
  );
  TiposDeSangre.associate = function (models) {
    TiposDeSangre.hasMany(models.pacientes, {
      foreignKey: 'tipo_de_sangre_id',
    });
  };
  return TiposDeSangre;
};

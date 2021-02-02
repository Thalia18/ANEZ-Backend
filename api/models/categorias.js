const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Categorias = sequelize.define(
    'categorias',
    {
      categoria_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      capitulo_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'capitulos',
          key: 'capitulo_id',
        },
      },
      codigo: {
        type: DataTypes.CHAR(5),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.CHAR(256),
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
      tableName: 'categorias',
      schema: 'public',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'capituloscategorias_fk',
          fields: [{ name: 'capitulo_id' }],
        },
        {
          name: 'categorias_pk',
          unique: true,
          fields: [{ name: 'categoria_id' }],
        },
        {
          name: 'pk_categorias',
          unique: true,
          fields: [{ name: 'categoria_id' }],
        },
      ],
    }
  );
  Categorias.associate = function (models) {
    Categorias.hasMany(models.subcategorias, {
      foreignKey: 'categoria_id',
    });
    Categorias.belongsTo(models.capitulos, {
      foreignKey: 'capitulo_id',
      as: 'capitulo',
    });
  };
  return Categorias;
};

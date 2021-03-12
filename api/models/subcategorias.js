const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Subcategorias = sequelize.define(
    'subcategorias',
    {
      subcategoria_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'categorias',
          key: 'categoria_id',
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
      tableName: 'subcategorias',
      schema: 'public',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'categoriassubcategorias_fk',
          fields: [{ name: 'categoria_id' }],
        },
        {
          name: 'pk_subcategorias',
          unique: true,
          fields: [{ name: 'subcategoria_id' }],
        },
        {
          name: 'subcategorias_pk',
          unique: true,
          fields: [{ name: 'subcategoria_id' }],
        },
      ],
    }
  );
  Subcategorias.associate = function (models) {
    Subcategorias.belongsTo(models.categorias, {
      foreignKey: 'categoria_id',
      as: 'categoria',
    });
    Subcategorias.belongsTo(models.categorias_evoluciones, {
      foreignKey: 'categoria_id',
      as: 'subcategorias',
    });
  };
  return Subcategorias;
};

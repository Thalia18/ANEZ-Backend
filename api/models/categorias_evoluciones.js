const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const CategoriasEvoluciones = sequelize.define(
    'categorias_evoluciones',
    {
      categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'categorias',
          key: 'categoria_id',
        },
      },
      evolucion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'evoluciones',
          key: 'evolucion_id',
        },
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
      tableName: 'categorias_evoluciones',
      schema: 'public',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'categorias_evoluciones2_fk',
          fields: [{ name: 'evolucion_id' }],
        },
        {
          name: 'categorias_evoluciones_fk',
          fields: [{ name: 'categoria_id' }],
        },
        {
          name: 'categorias_evoluciones_pk',
          unique: true,
          fields: [{ name: 'categoria_id' }, { name: 'evolucion_id' }],
        },
        {
          name: 'pk_categorias_evoluciones',
          unique: true,
          fields: [{ name: 'categoria_id' }, { name: 'evolucion_id' }],
        },
      ],
    }
  );
  CategoriasEvoluciones.associate = function (models) {
    CategoriasEvoluciones.belongsTo(models.evoluciones, {
      foreignKey: 'evolucion_id',
      as: 'evoluciones',
    });
    CategoriasEvoluciones.belongsTo(models.categorias, {
      foreignKey: 'categoria_id',
      as: 'categorias',
    });
  };
  return CategoriasEvoluciones;
};

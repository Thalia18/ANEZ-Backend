const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const SubcategoriasEvoluciones = sequelize.define(
    'subcategorias_evoluciones',
    {
      subcategoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'subcategorias',
          key: 'subcategoria_id',
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
      tableName: 'subcategorias_evoluciones',
      schema: 'public',
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: 'pk_subcategorias_evoluciones',
          unique: true,
          fields: [{ name: 'subcategoria_id' }, { name: 'evolucion_id' }],
        },
        {
          name: 'subcategoriasevoluciones2_fk',
          fields: [{ name: 'evolucion_id' }],
        },
        {
          name: 'subcategoriasevoluciones_fk',
          fields: [{ name: 'subcategoria_id' }],
        },
        {
          name: 'subcategoriasevoluciones_pk',
          unique: true,
          fields: [{ name: 'subcategoria_id' }, { name: 'evolucion_id' }],
        },
      ],
    }
  );
  SubcategoriasEvoluciones.associate = function (models) {
    SubcategoriasEvoluciones.belongsTo(models.evoluciones, {
      foreignKey: 'evolucion_id',
      as: 'evoluciones',
    });
    SubcategoriasEvoluciones.belongsTo(models.subcategorias, {
      foreignKey: 'subcategoria_id',
      as: 'subcategorias',
    });
  };
  return SubcategoriasEvoluciones;
};

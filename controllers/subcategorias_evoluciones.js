const models = require('../models');
const pagination = require('../utils/pagination');

const createSubcategoriaEvolucion = async (req, res) => {
  try {
    await models.subcategorias_evoluciones.create(req.body);
    return res.status(201).send('Created');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getSubcategoriasEvoluciones = async (req, res) => {
  try {
    const especialidadesMedicos = await models.subcategorias_evoluciones.findAll(
      {
        model: models.subcategorias_evoluciones,
      }
    );
    let data = pagination(req.query.page, especialidadesMedicos);
    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getSubcategoriaEvolucionById = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategoriaEvolucion = await models.subcategorias_evoluciones.findOne(
      {
        where: { evolucion_id: id },
        // include: [
        //   {
        //     model: models.evoluciones,
        //     as: 'evoluciones',
        //   },
        //   { model: models.subcategorias, as: 'subcategorias' },
        // ],
      }
    );
    if (subcategoriaEvolucion) {
      return res.status(200).json({ data: subcategoriaEvolucion });
    }
    return res.status(404).send('The specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateSubcategoriaEvolucion = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.subcategorias_evoluciones.update(req.body, {
      where: { evolucion_id: id },
    });
    if (updated) {
      await models.subcategorias_evoluciones.findOne({
        where: { evolucion_id: id },
      });
      return res.status(200).send('Updated');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteSubcategoriaEvolucion = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.subcategorias_evoluciones.destroy({
      where: { evolucion_id: id },
    });
    if (deleted) {
      return res.status(204).send('Deleted');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
module.exports = {
  createSubcategoriaEvolucion,
  getSubcategoriasEvoluciones,
  getSubcategoriaEvolucionById,
  updateSubcategoriaEvolucion,
  deleteSubcategoriaEvolucion,
};

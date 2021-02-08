const models = require('../models');

const createTipoDeSangre = async (req, res) => {
  try {
    await models.tipos_de_sangre.create(req.body);
    return res.status(200).send('Created');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllTiposDeSangre = async (req, res) => {
  try {
    const tiposDeSangre = await models.tipos_de_sangre.findAll();
    return res.status(200).json({ data: tiposDeSangre });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getTipoDeSangreById = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoDeSangre = await models.tipos_de_sangre.findOne({
      where: { tipo_de_sangre_id: id },
    });
    if (tipoDeSangre) {
      return res.status(200).json({ data: tipoDeSangre });
    }
    return res.status(404).send('The specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateTipoDeSangre = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.tipos_de_sangre.update(req.body, {
      where: { tipo_de_sangre_id: id },
    });
    if (updated) {
      await models.tipos_de_sangre.findOne({
        where: { tipo_de_sangre_id: id },
      });
      return res.status(200).send('Updated');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteTipoDeSangre = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.tipos_de_sangre.destroy({
      where: { tipo_de_sangre_id: id },
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
  createTipoDeSangre,
  getAllTiposDeSangre,
  getTipoDeSangreById,
  updateTipoDeSangre,
  deleteTipoDeSangre,
};

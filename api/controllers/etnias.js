const models = require('../models');

const createEtnia = async (req, res) => {
  try {
    await models.etnias.create(req.body);
    return res.status(200).send('Created');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllEtnias = async (req, res) => {
  try {
    const etnias = await models.etnias.findAll();
    return res.status(200).json({ etnias });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getEtniaById = async (req, res) => {
  try {
    const { id } = req.params;
    const etnia = await models.etnias.findOne({
      where: { etnia_id: id },
    });
    if (etnia) {
      return res.status(200).json({ data: etnia });
    }
    return res.status(404).send('The specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateEtnia = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.etnias.update(req.body, {
      where: { etnia_id: id },
    });
    if (updated) {
      await models.etnias.findOne({
        where: { etnia_id: id },
      });
      return res.status(200).send('Updated');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteEtnia = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.etnias.destroy({
      where: { etnia_id: id },
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
  createEtnia,
  getAllEtnias,
  getEtniaById,
  updateEtnia,
  deleteEtnia,
};

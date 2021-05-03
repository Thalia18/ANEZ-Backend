const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../models');
var srs = require('secure-random-string');

const accessTokenSecret = srs({ length: 256 });

const confirmUser = async (req, res) => {
  try {
    let user = req.body.usuario;
    let password = req.body.contrasena;
    const usuario = await models.usuarios.findOne({
      where: { usuario: user },
      include: [
        {
          model: models.roles,
          as: 'rol',
        },
      ],
    });
    if (usuario) {
      const match = await bcrypt.compareSync(password, usuario.contrasena);
      if (match) {
        const accessToken = jwt.sign(
          { usuario: usuario.usuario, rol: usuario.rol.rol },
          accessTokenSecret,
          { expiresIn: '15m' }
        );
        if (usuario.rol.rol.trim() === 'MÉDICO') {
          const medico = await models.medicos.findOne({
            where: { usuario_id: usuario.usuario_id },
          });

          return res.status(200).json({
            accessToken: accessToken,
            data: {
              isLoggedIn: true,
              usuario: usuario.usuario,
              rol: usuario.rol.rol,
              nombre: usuario.nombre,
              apellido: usuario.apellido,
              cedula: usuario.cedula,
              consultorio_id: usuario.consultorio_id,
              medico_id: medico.medico_id,
              especialidad: medico.especialidad,
            },
          });
        } else {
          return res.status(200).json({
            accessToken: accessToken,
            data: {
              isLoggedIn: true,
              usuario: usuario.usuario,
              rol: usuario.rol.rol,
              nombre: usuario.nombre,
              apellido: usuario.apellido,
              cedula: usuario.cedula,
              consultorio_id: usuario.consultorio_id,
            },
          });
        }
      }
    } else {
      return res.status(404).send('Password or username incorrect');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

module.exports = {
  confirmUser,
  accessTokenSecret,
};

const Usuario = require("../models/usuarioModel");
const bcrypt = require("bcrypt");
const { createToken } = require('../services/token');
const { Router } = require("express");


const createUsuario = async ( req, res) => {
    let { nombre, rut } = req.body;
    rut = rut.toLowerCase();
    let password = await bcrypt.hash(req.body.password, 10);
    Usuario.findOne({ rut }, (err, usuario) => {
        if (err) {
            return res.status(400).send({ message: 'Error al crear el usuario' });
        }
        if (usuario) {
            return res.status(400).send({ message: 'El usuario ya existe' });
        }
        const newUser = new Usuario({
            nombre,
            rut,
            password
        });
        newUser.save((err, usuario) => {
            if (err) {
                return res.status(400).send({ message: 'Error al crear el usuario' });
            }
            return res.status(201).send(usuario);
        })
    })
};

const login = (req, res) => {
    console.log(req.body)
    let rut = req.body.rut
    rut = rut.toLowerCase();
    Usuario.findOne({ rut }, (err, usuario) => {
        if (err) {
            return res.status(400).send({ message: 'Error al iniciar sesión' });
        }
        if (!usuario) {
            return res.status(404).send({ message: 'No se encontró el usuario' });
        }
        bcrypt.compare(req.body.password, usuario.password, (err, check) => {
            if (err) {
                return res.status(400).send({ message: 'Error al iniciar sesión' });
            }
            if (!check) {
                return res.status(400).send({ message: 'La contraseña es incorrecta' });
            }
            res.cookie('token', createToken(usuario), { httpOnly: true })
            return res.status(200).send({ message: 'Inició sesión correctamente', token: createToken(usuario), usuario: usuario.nombre });
        })
    })
}

const checkToken = (req, res) => {
    return res.status(200).send({ message: 'Token válido' });
}

const logout = (req, res) => {
    res.clearCookie('token');
    return res.status(200).send({ message: 'Cerró sesión correctamente' });
}
const getUsuario = (req, res) => {
    const { id } = req.params;
    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(400).send({ message: 'Error al obtener el usuario' });
        }
        if (!usuario) {
            return res.status(404).send({ message: 'No se encontró el usuario' });
        }
        return res.status(200).send(usuario);
    })
}

const getUsuarios = (req, res) => {
    Usuario.find({}, (err, usuario) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener los usuarios" });
        }
        return res.status(200).send(usuario);
    });
};

const deleteUsuario = (req, res) => {
    const { id } = req.params;
    Usuario.findByIdAndDelete(id, (err, usuario) => {
      if (err) {
        return res.status(400).send({ message: "Error al obtener el usuario" });
      }
      if(!usuario) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      return res.status(200).send(usuario);
    });
  };

module.exports = {
    createUsuario,
    getUsuario,
    getUsuarios,
    deleteUsuario,
    checkToken,
    login,
    logout
};
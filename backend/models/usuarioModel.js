const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    rut: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("usuario", UsuarioSchema);
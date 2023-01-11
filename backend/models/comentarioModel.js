const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Publicacion = mongoose.model("publicacion");

const ComentarioSchema = new Schema({
    nombre:{
        type : String,
        required: true
    },
    rut:{
        type: Schema.ObjectId,
        ref: "usuario"
    },
    descripcion:{
        type: String,
        required: true
    },
    publicacion_comentada: {
        type: Schema.ObjectId,
        ref: "publicacion"
    },
    publicacion_a_comentar: {
        type: String,
        required: true
    },
    fecha:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("comentario", ComentarioSchema);

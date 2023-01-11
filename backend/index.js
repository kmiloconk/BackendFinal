const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();
const publicacionRoutes = require('./routes/publicacionRoutes');
const comentarioRoutes = require('./routes/comentarioRoutes');
const reporteRoutes = require('./routes/reporteRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const likeRoutes = require('./routes/likeRoutes');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.listen(process.env.PORT, () => {
    console.log("El proyecto esta corriendo en el puerto => ", process.env.PORT);
});

app.use(cookieParser());
app.use(cors({credentials: true, origin: '*'}));
app.use(express.json());
app.options('*', cors());
app.use('/api', publicacionRoutes);
app.use('/api', comentarioRoutes);
app.use('/api', reporteRoutes);
app.use('/api', categoriaRoutes);
app.use('/api',usuarioRoutes);
app.use('/api',likeRoutes);


mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(process.env.DB, (err) => {
    if (err) {
        return console.log("Error al conectar con la base de datos", err);
    }
    return console.log("Conectado a la base de datos");
});

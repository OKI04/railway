const {connection} = require("./database/connection");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

//Inicializar app
console.log("App de node arrancada");

//Conectar a la base de datos
connection();

//Servidor
const app = express();
const port = process.env.PORT || 3900;

//Middlewares
app.use(cors()); //Configurar CORS
app.use(express.json()); //recibir datos con contentType app/json
app.use(express.urlencoded({extended: false})); //Obtener los datos en x-www-form
app.use(morgan('dev')); //Muestra un resumen de la peticion HTTP por consola
app.use(cookieParser()); //Permite ver las cookies por consola
app.use("/imagenes", express.static(path.join(__dirname, "imagenes")));

//Rutas
const user_rutas = require("../back/routers/auth.routes");
const productos_rutas = require("../back/routers/productos.routes");
const carrusel_rutas = require("../back/routers/carrusel.routes");

app.use("/admin", user_rutas);
app.use("/admin/products", productos_rutas);
app.use("/admin/carrusel/products", carrusel_rutas);
const path = require("path");

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, "../front/dist")));

// Cualquier ruta no reconocida (SPA) redirige a index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../front/dist/index.html"));
});


//Crear servidor y escuchar peticiones http
app.listen(port, () => {
    console.log("Servidor corriendo en el puerto: " + port);
});
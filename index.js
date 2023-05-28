const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();

const PORT = process.env.PORT;
const URL = process.env.MONGO_URL;

//Conexion a BBDD

// mongoose.connect(URL, {})
//     .then( () => {
//         console.log("Conexion exitosa")
//     } )
//     .catch(error => {
//         console.log(error);
//     });

const DBConection = async () => {

    try {
        await mongoose.connect(URL, {})
        console.log("Conexion a BBDD exitosa")
    } catch (error) {
        console.log(error);
    }

}

DBConection();

//Configurando el cors
app.use(cors());

//Sintaxis para poder gestionar los datos a través de un req.body
app.use(express.json({ extended: true }));
app.use(express.urlencoded());

//Routes
app.get("/api/test-route", (req, res) => {
    return res.status(200).send({
        succes: true,
        message: "Ruta de prueba"
    })
});

//Routes with Controllers
app.use("/api", require("./routes/ArticlesRoute.js"));

//Creando el server
app.listen(PORT, () => {
    console.log(`Conexion realizada por el puerto ${PORT}...`);
});


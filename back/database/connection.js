const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

const connection = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Conectado a MongoDB Atlas");
    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos");
    }
};

module.exports = {
    connection
};

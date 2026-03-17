 require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");


const cors = require("cors");

const connectDB = require("./config/db");
connectDB();
const app = express();
app.use(express.json());
 app.use(cors()); // permite todas las origins
// Rutas
app.use("/api/crear-envio",require("./routes/crearEnvioRoutes"));
app.use("/api/crear-etiqueta",require("./routes/crearEtiqueta"));
app.use("/api/auth", require("./routes/auth.routes"));

app.use("/api/products", require("./routes/product.routes"));

app.use("/api/cart", require("./routes/cart"));

app.listen(3000, () => {
  console.log("API corriendo en http://localhost:3000");
});


const User=require( "../models/User.js");
const { transporter }=require("../config/mailer.js");
const crypto = require("crypto");

// Importar Express y crear el router
const express = require('express');
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: "Usuario no existe" });

  // generar token
  const token = crypto.randomBytes(20).toString("hex");

  user.resetToken = token;
  user.resetTokenExpires = Date.now() + 3600000; // 1 hora
  await user.save();

  const link = `http://localhost:3000/reset-password/${token}`;

  await transporter.sendMail({
    from: "Soporte <soporte@email.com>",
    to: user.email,
    subject: "Recuperar contraseña",
    html: `
      <p>Haz click para cambiar tu contraseña:</p>
      <a href="${link}">${link}</a>
    `
  });

  res.json({ msg: "Correo enviado" });
});

module.exports = router;
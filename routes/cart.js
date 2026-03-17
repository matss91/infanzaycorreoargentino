const express = require("express");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");

require("dotenv").config();

const router = express.Router();


router.post("/send-cart", async (req, res) => {
  const { cart, email } = req.body;

  try {
    // Crear PDF en memoria
    const doc = new PDFDocument();
    let buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", async () => {
      const pdfData = Buffer.concat(buffers);

      // Configurar transporte de email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Tu carrito en PDF",
        text: "Adjunto encontrarás tu carrito en PDF.",
        attachments: [
          {
            filename: "carrito.pdf",
            content: pdfData,
          },
        ],
      });

      res.json({ message: "Email enviado correctamente" });
    });

    // Contenido del PDF
    doc.fontSize(18).text("Resumen de tu carrito", { align: "center" });
    doc.moveDown();

    let total = 0;

    cart.forEach((item) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      doc
        .fontSize(12)
        .text(`${item.name} x ${item.quantity} - $${subtotal}`);
    });

    doc.moveDown();
    doc.fontSize(14).text(`Total: $${total}`);

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al enviar email" });
  }
});



module.exports=router;
const axios = require("axios");

const comprarEtiqueta = async (req, res) => {
  try {
    const { rate_id } = req.body;
console.log("--------------"+rate_id+"------------------")
    const response = await axios.post(
      `https://api.goshippo.com/transactions`,
      {
        rate: rate_id,
        label_file_type: "PDF",  // También puede ser PNG
        async: false
      },
      {
        headers: {
          Authorization: `ShippoToken ${process.env.SHIPPO_SANDBOX_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Etiqueta generada:", response.data);
    res.status(201).json(response.data);

  } catch (error) {
    console.error("Error generando etiqueta:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

module.exports = { comprarEtiqueta };
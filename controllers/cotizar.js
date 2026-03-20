const axios = require("axios");

const cotizarEnvio = async (req, res) => {
  try {
    const { address_from, address_to, parcels } = req.body;

    // Creamos un "shipment" temporal para obtener tarifas
    const response = await axios.post(
      "https://api.goshippo.com/shipments",
      {
        address_from,
        address_to,
        parcels,
        async: true // importante: async:true para que solo calcule tarifas y no cree el envío definitivo
      },
      {
        headers: {
          Authorization: `ShippoToken ${process.env.SHIPPO_SANDBOX_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    // Obtenemos las tarifas disponibles
    const rates = response.data.rates;
    console.log("Tarifas obtenidas:", rates);

    res.status(200).json({ rates });

  } catch (error) {
    console.error("Error cotizando envío:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

module.exports = { cotizarEnvio };
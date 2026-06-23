const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/generate", async (req, res) => {

  const { topic } = req.body;

  try {

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/google/flan-t5-large",
      {
        inputs: `Explain ${topic} for placement aptitude with:
        1. Detailed theory
        2. Important formulas
        3. 2 solved examples
        4. 5 practice questions`
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        }
      }
    );

    res.json({
      content: response.data[0].generated_text
    });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "AI generation failed" });
  }

});

module.exports = router;
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Route to handle chat requests
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: userMessage,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.5,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const chatResponse = response.data.choices[0].text.trim();
    res.json({ message: chatResponse });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error communicating with ChatGPT');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

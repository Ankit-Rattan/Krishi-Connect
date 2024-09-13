const express = require('express');
const { EndpointClient } = require('@google-cloud/aiplatform');

const app = express();
const port = 3001;

// Replace with your Gemini API key
const apiKey = 'AIzaSyAPPEU_P0uVM2sx2S29EmexjHX6jsoxTWQ';

// Initialize Gemini client
const client = new EndpointClient({ credentials: apiKey });

app.post('/api/gemini', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await client.predict({
            endpointId: 'YOUR_ENDPOINT_ID',
            instances: [{ text: prompt }]
        });

        res.json(response.predictions[0].text);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing request' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
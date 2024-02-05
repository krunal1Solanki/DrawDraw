const express = require('express');
const app = express();
const client = require('./client')


app.use(express.json())
app.post('/set-data', async (req, res) => {
    try {
        const { key, value } = req.body; // Extract key and value from request body
        if (!key || !value) {
            return res.status(400).json({ error: 'Key and value are required.' });
        }

        // Set data in the database using the client
        await client.set(key, JSON.stringify(value));
        return res.status(200).json({ message: 'Data set successfully.' });
    } catch (error) {
        console.error('Error setting data:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});
app.get('/get-data/:key', async (req, res) => {
    try {
        const key = req.params.key; // Extract key from request parameters
        if (!key) {
            return res.status(400).json({ error: 'Key is required.' });
        }

        // Get data from the database using the client
        const data = await client.get(key);
        if (!data) {
            return res.status(404).json({ error: 'Data not found for the given key.' });
        }

        // Parse JSON data and send it in the response
        const jsonData = JSON.parse(data);
        return res.status(200).json(jsonData);
    } catch (error) {
        console.error('Error getting data:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});
app.listen(3012, () => {
    console.log(`3012`)
})
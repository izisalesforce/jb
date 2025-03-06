// routes/journeybuilder.js

const express = require('express');
const axios = require('axios');

const router = express.Router();

/**
 * Save Activity Configuration
 */
router.post('/save', (req, res) => {
    console.log('Save activity configuration:', JSON.stringify(req.body, null, 2));
    // Persist configuration settings as needed.
    res.status(200).json({});
});

/**
 * Validate Activity Configuration
 */
router.post('/validate', (req, res) => {
    console.log('Validate activity configuration:', JSON.stringify(req.body, null, 2));
    // Perform validation logic if needed.
    res.status(200).json({});
});

/**
 * Publish Activity Configuration
 */
router.post('/publish', (req, res) => {
    console.log('Publish activity configuration:', JSON.stringify(req.body, null, 2));
    // Perform any additional actions on publish.
    res.status(200).json({});
});

/**
 * Execute Journey Activity
 * Extracts the parameter and passes it to an external API.
 */
router.post('/execute', async (req, res) => {
    console.log('Execute activity:', JSON.stringify(req.body, null, 2));

    try {
        const inArguments = req.body.inArguments || [];
        let customParam;

        if (inArguments.length > 0 && inArguments[0].customParam) {
            customParam = inArguments[0].customParam;
        }

        if (!customParam) {
            console.error('Missing customParam in the payload.');
            return res.status(400).json({ error: 'Missing customParam' });
        }

        // Replace with your actual external API endpoint
        const apiEndpoint = 'https://externalapi.example.com/endpoint';
        const apiResponse = await axios.post(apiEndpoint, { param: customParam });

        console.log('External API response:', apiResponse.data);
        res.status(200).json({ status: 'ok' });
    } catch (error) {
        console.error('Error executing custom activity:', error);
        res.status(500).json({ error: 'Failed to execute custom activity' });
    }
});

module.exports = router;

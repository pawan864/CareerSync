const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const userMsg = req.body.message;
        if (!userMsg) return res.status(400).json({ error: "Message is required" });
        
        // Use Node's built-in fetch (which bypasses browser Cloudflare Turnstile blocks)
        const fetchRes = await fetch(`https://text.pollinations.ai/${encodeURIComponent(userMsg + " (Answer as a helpful CareerSync AI Assistant)")}`);
        const text = await fetchRes.text();
        
        res.json({ reply: text });
    } catch (error) {
        console.error("Pollinations API Error:", error);
        res.status(500).json({ error: "Failed to connect to AI" });
    }
});

module.exports = router;

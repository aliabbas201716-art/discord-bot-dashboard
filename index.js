const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const path = require('path');
const ngrok = require('@ngrok/ngrok'); // The tunnel package

const app = express();
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

const PORT = 3008;

// 1. SERVE YOUR WEBSITE CODE
// Replace 'your-website-folder' with the exact name of the folder containing your index.html
app.use(express.static(path.join(__dirname, 'public')));

// 2. START THE WEB SERVER & SECURE TUNNEL
app.listen(PORT, async () => {
    console.log(`Web server listening internally on port ${PORT}`);
    
    try {
        // Starts the tunnel and requests a free secure HTTPS URL
        const session = await ngrok.forward({
            addr: PORT,
            authtoken: '3KCjWkjVE0q9lGAK9IfZFdtPtBv_2M4Ci9BjZEh9CoebH1AP8' // Put your ngrok token inside these quotes
        });
        
        console.log(`\n==================================================`);
        console.log(`🚀 SECURE LIVE LINK: ${session.url()}`);
        console.log(`==================================================\n`);
    } catch (error) {
        console.error('Error starting secure tunnel:', error);
    }
});

// 3. YOUR DISCORD BOT LOGIN
client.once('ready', () => {
    console.log(`Bot logged in successfully as ${client.user.tag}`);
});

// Replace with your actual Discord Bot Token
client.login('MTU1NTYzMzA3MzI1OTkzNzg5Mg.GpJyId.qtW_YATg7lVULFyX7GOwUVrOgAFo5BrYxE_vMA');

#!/usr/bin/env node

// Import the required libraries
import axios from 'axios';
import terminalImage from 'terminal-image';
import path from 'path';

// API URL to fetch a random waifu image from Anime Waifu API
const waifuApiUrl = "https://api.waifu.pics/sfw/waifu";

// Set the desired width for the image display (adjust based on your terminal size)
const imageWidth = 45; // You can modify this value to fit your terminal window

// Function to fetch and display a random waifu image with dynamic title and details
async function fetchAndDisplayWaifu() {
    try {
        // Fetch a random waifu image from the Anime Waifu API
        const response = await axios.get(waifuApiUrl);
        const waifuData = response.data;

        if (waifuData.url) {
            // Extract the title dynamically from the image URL
            const imageFileName = path.basename(waifuData.url);
            const title = `${imageFileName}`;

            // Display the waifu image details with the dynamic title
            console.log(`\n🎉 Here’s a random waifu image for you! 🎉\n`);
            console.log(`Title: ${title}\n`);

            // Commenting out the image URL output
            // console.log(`Image URL: ${waifuData.url}\n`);

            // Fetch the image data as a buffer
            const imageResponse = await axios.get(waifuData.url, {
                responseType: 'arraybuffer'
            });

            // Convert the image buffer to a terminal-friendly format and display it with a set width
            const image = await terminalImage.buffer(Buffer.from(imageResponse.data), { width: imageWidth });
            console.log(image);
        } else {
            console.log("No waifu image found. Please try again.");
        }
    } catch (error) {
        console.error("🚨 Failed to fetch waifu image:", error.message);
    }
}

// Run the fetchAndDisplayWaifu function
fetchAndDisplayWaifu();

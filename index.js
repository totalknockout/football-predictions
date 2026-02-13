require("dotenv").config();
const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set("view engine", "ejs");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Homepage
app.get("/", (req, res) => {
    res.render("index");
});

// Fetch predictions
app.get("/predictions", async (req, res) => {
    try {
        const response = await axios.get(
            "https://football-prediction-api.p.rapidapi.com/api/v2/predictions", {
            headers: {
                "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
                "X-RapidAPI-Host": "football-prediction-api.p.rapidapi.com"
            },
            params: {
                market: "classic" // optional filter
            }
        });

        const predictions = response.data.data || [];
        res.render("predictions", { predictions });
    } catch (error) {
        console.error("API Error:", error.toString());
        res.render("error", { message: "Failed to fetch predictions" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});

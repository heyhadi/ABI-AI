// Import the express in typescript file
const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();



const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


const configuration = new Configuration({
    apiKey: process.env.SECRET_KEY,
});
const openai = new OpenAIApi(configuration);



// Handling '/' Request
app.get("/", (req, res) => {
    res.json({
        message: "Hi I am ABI, An AI Chatbot made for learning purpose by @heyhadi",
    });
});

//Handling input prompt from frontend
app.post("/chat", async (req, res) => {
    const {body} = req.body;
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages:[{role: "user", content: `${body}`}]
           
        });

        res.status(200).send({
            success: true,
            error_code: 0,
            bot: response.data.choices[0].message.content
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            error_code: error.code,
            message: error.message
        })
    }
});

// Server setup
app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});

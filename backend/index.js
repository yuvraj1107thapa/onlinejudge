const express = require("express");

const { generateFile } = require('./generateFile');
const { executeCpp } = require("./executeCpp")
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.get("/", (req, res) => {
    return res.json({ hello: "world" });
});

app.post("/run", async (req, res) => {
    const { language = "cpp", code } = req.body;
    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code" });
    }
    try {
        const filepath = await generateFile(language, code);
        const output = await executeCpp(filepath);
        return res.json({ filepath, output });
    } catch (err) {
        return res.status(500).send(err);
    }
});

// start listening for connections
app.listen(3000, () => {
    console.log("Listening on port 3000!");
});
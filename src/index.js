const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.post("/user", (req, res) => {
    res.send("Testing!");
});

app.listen(port, () => {
    console.log("Server is running on port " + port);
});

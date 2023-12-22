const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task management server is running smoothly");
});

app.listen(port, () => {
  console.log(`Task management server is running on port ${port}`);
});

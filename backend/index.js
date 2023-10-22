const express = require("express");
const app = express();
const port = 3001;
const mongoDB = require("./db");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

app.get("/", (req, res) => {
  res.send("Hell World!");
});

app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/UpdateCart"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

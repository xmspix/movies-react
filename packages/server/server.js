import "babel-polyfill";
import express from "express";

const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Accept-Encoding", "gzip, deflate");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use("/api", require("./routes/api"));

process.stdout.write("\u001b[2J\u001b[0;0H");
app.listen(port, () => {
  console.log(`🚀  Server ready at http://localhost:${port}`);
});

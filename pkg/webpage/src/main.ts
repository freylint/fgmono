import express from "express";
import { readFileSync } from "fs";

// Initialized via build script
const webpage = null;

const app = express();
const port = 8080;


app.get('/', (req, res) => {
  res.send(webpage);
})

app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
import express from "express";
import { readFileSync } from "fs";

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.sendStatus(200);
})

app.use((req, res, next) => {
  res.status(400).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

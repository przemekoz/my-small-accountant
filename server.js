const express = require("express");
const jsonServer = require("json-server");
const chokidar = require("chokidar");
const cors = require("cors");
const helpers = require("./server_helpers.js");

const fileName = process.argv[ 2 ] || "./data/entries.js"
const port = process.argv[ 3 ] || 3500;

let router = undefined;

const app = express();

const createServer = () => {
  delete require.cache[ require.resolve(fileName) ];
  setTimeout(() => {
    router = jsonServer.router(fileName.endsWith(".js")
      ? require(fileName)() : fileName);
  }, 1000);
}

createServer();

app.use(cors());
app.use(jsonServer.bodyParser);

const sourcePath = "data/entries.js";

app.post("/api/save-data/income", (req, resp) => {
  const year = req.body.year;
  const month = req.body.month;
  const newValue = parseInt(req.body.income, 10);
  const newValueTransferedZus = req.body.transferredZus ? true : false;

  if (!helpers.checkExistsEntry(sourcePath, year, month)) {
    helpers.placeNewEntry(sourcePath, year, month);
  }

  helpers.readWriteEntries(sourcePath, /income:\s[0-9]*/, "income: " + newValue);
  helpers.readWriteEntries(sourcePath, /transferredZus:\s[true|false]*/, "transferredZus: " + newValueTransferedZus);
  helpers.copyDataFile(sourcePath);
  resp.json({ status: "ok", newValue, newValueTransferedZus })
});

app.post("/api/save-data/tax", (req, resp) => {
  const year = req.body.year;
  const month = req.body.month;
  const newValue = parseInt(req.body.transferredTax, 10);
  
  if (!helpers.checkExistsEntry(sourcePath, year, month)) {
    helpers.placeNewEntry(sourcePath, year, month);
  }

  helpers.readWriteEntries(sourcePath, /transferredTax:\s[0-9]*/, "transferredTax: " + newValue);
  helpers.copyDataFile(sourcePath);
  resp.json({ status: "ok", newValue })
});

app.use("/api", (req, resp, next) => router(req, resp, next));

chokidar.watch(fileName).on("change", () => {
  console.log("Refresh server...");
  createServer();
  console.log("Done.");
});

app.listen(port, () => console.log(`Server is listening on port: ${ port }`));

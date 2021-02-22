const express = require("express");
const jsonServer = require("json-server");
const chokidar = require("chokidar");
const cors = require("cors");
const fs = require('fs');

const fileName = process.argv[ 2 ] || "./data/entries.js"
const port = process.argv[ 3 ] || 3500;

let router = undefined;

const app = express();

const createServer = () => {
  delete require.cache[ require.resolve(fileName) ];
  setTimeout(() => {
    router = jsonServer.router(fileName.endsWith(".js")
      ? require(fileName)() : fileName);
  }, 100)
}

createServer();

app.use(cors());
app.use(jsonServer.bodyParser);

const sourcePath = "data/entries.js";

app.use("/api/save-data/income", (req, resp) => {
  const newValue = "321111111";
  console.log(req)
  copyEntries();
  readWriteEntries(sourcePath, /income:\s[0-9]*/, "income: " + newValue);
  resp.json({ status: "ok", newValue })
});

app.use("/api/save-data/tax", (req, resp) => {
  const newValue = "000000000000000001";
  copyEntries();
  readWriteEntries(sourcePath, /transferredTax:\s[0-9]*/, "transferredTax: " + newValue);
  resp.json({ status: "ok", newValue })
});

app.use("/api", (req, resp, next) => router(req, resp, next));

chokidar.watch(fileName).on("change", () => {
  console.log("Refresh server...");
  createServer();
  console.log("Done.");
});

app.listen(port, () => console.log(`Server is listening on port: ${ port }`));

// helpers ---------------------------------------------------------

function readWriteEntries(sourcePath, regExp, replace) {
  var data = fs.readFileSync(sourcePath, 'utf-8');
  var newValue = replaceLast(data, regExp, replace);
  fs.writeFileSync(sourcePath, newValue, 'utf-8');
  console.log(sourcePath + 'modify complete');
}

function replaceLast(what, regExp, replacement) {
  return what.split(',').reverse().join(',').replace(new RegExp(regExp), replacement).split(',').reverse().join(',');
}

function copyEntries() {
  var date = new Date();
  var destinantionPath = "data/entries.copy." + date.getFullYear() + date.getMonth() + date.getDate() + ".js";
  fs.copyFile(sourcePath, destinantionPath, (err) => {
    if (err) {
      console.log("error! can't write copy file.");
    };
    console.log('source.txt was copied to destination.txt');
  });
}
const fs = require("fs");

module.exports = {
  readWriteEntries,
  replaceLast,
  checkExistsEntry,
  placeNewEntry,
  copyDataFile: function (sourcePath) {
    setTimeout(() => {
      copyDataFile(sourcePath);
    }, 3000);
  }
};

function readWriteEntries(sourcePath, regExp, replace, year, month) {
  var data = fs.readFileSync(sourcePath, 'utf-8');
  var newValue = replaceLast(data, regExp, replace);
  fs.writeFileSync(sourcePath, newValue, 'utf-8');
  console.log('Moodify complete in: ' + sourcePath);
}

function placeNewEntry(sourcePath, year, month) {
  var data = fs.readFileSync(sourcePath, 'utf-8');
  var newValue = data.replace("];", getEntry(year, month));
  fs.writeFileSync(sourcePath, newValue, 'utf-8');
  console.log('Added new entry to: ' + sourcePath);
}

function replaceLast(what, regExp, replacement) {
  return what.split(',').reverse().join(',').replace(new RegExp(regExp), replacement).split(',').reverse().join(',');
}

function copyDataFile(sourcePath) {
  var date = new Date();
  var destinantionPath = "data/entries.copy." + date.getFullYear() + date.getMonth() + date.getDate() + ".js";
  fs.copyFile(sourcePath, destinantionPath, (err) => {
    if (err) {
      console.log("error! can't write copy file.");
    };
    console.log('source.txt was copied to destination.txt');
  });
}

function checkExistsEntry(sourcePath, year, month) {
  var data = fs.readFileSync(sourcePath, 'utf-8');
  return data.indexOf("id: " + year + "_" + month) > -1
}

function getEntry(year, month) {
  return "  {\r\n \
    id: " + year + "_" + month + ",\r\n \
    year: " + year + ",\r\n \
    month: " + month + ",\r\n \
    income: 0,\r\n \
    transferredZus: false,\r\n \
    transferredTax: 0,\r\n \
  },\r\n \
];";
}
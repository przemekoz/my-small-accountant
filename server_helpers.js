const fs = require("fs");

function readWriteEntries(sourcePath, regExp, replace) {
  var data = fs.readFileSync(sourcePath, 'utf-8');
  var newValue = replaceLast(data, regExp, replace);
  fs.writeFileSync(sourcePath, newValue, 'utf-8');
  console.log(sourcePath + ' modify complete');
}

function replaceLast(what, regExp, replacement) {
  return what.split(',').reverse().join(',').replace(new RegExp(regExp), replacement).split(',').reverse().join(',');
}

function copyEntries(sourcePath) {
  var date = new Date();
  var destinantionPath = "data/entries.copy." + date.getFullYear() + date.getMonth() + date.getDate() + ".js";
  fs.copyFile(sourcePath, destinantionPath, (err) => {
    if (err) {
      console.log("error! can't write copy file.");
    };
    console.log('source.txt was copied to destination.txt');
  });
}

module.exports = {
  readWriteEntries,
  replaceLast,
  copyEntriesDelayed: function (sourcePath) {
    setTimeout(() => {
      copyEntries(sourcePath);
    }, 5000);
  }
};
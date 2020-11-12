const fs = require('fs-extra');
const concat = require('concat');

let es5Files = [];
let es2015Filse = [];
let style = "";

fs.readdir('./dist/pos').then((files) => {
  for (let i = 0; i < files.length; i++) {
    if (files[i].indexOf('es5.js') != -1) es5Files.push('./dist/pos/' + files[i]);
    if (files[i].indexOf('es2015.js') != -1) es2015Filse.push('./dist/pos/' + files[i]);

  };

  concatenate(es5Files, 'element-es5.js');
  concatenate(es2015Filse, 'element-es2015.js');
})

async function concatenate(files, outFilename) {
  console.log(files)
    await fs.ensureDir('output');
    await concat(files, `output/${outFilename}`);
}


const fs = require('fs');
const zopfli = require('node-zopfli');

const options = {
  verbose: false,
  verbose_more: false,
  numiterations: 15,
  blocksplitting: true,
  blocksplittinglast: false,
  blocksplittingmax: 15
};

function compressFiles(path) {
  fs.readdir(path, (err, files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path + '/' + file;
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        compressFiles(filePath);
      } else if (
        filePath.endsWith('.html') ||
        filePath.endsWith('.js') ||
        filePath.endsWith('.css') ||
        filePath.endsWith('.jpg') ||
        filePath.endsWith('.jpeg') ||
        filePath.endsWith('.png')
      ) {
        fs.createReadStream(filePath)
          .pipe(zopfli.createGzip(options))
          .pipe(fs.createWriteStream(filePath + '.gz'));
      }
    }
  });
}

const ROOT_DIR = './dist/public/';
compressFiles(ROOT_DIR);

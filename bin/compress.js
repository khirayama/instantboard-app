const fs = require('fs');
const minimist = require('minimist');
const zopfli = require('node-zopfli');

function isTarget(filePath) {
  return (
    filePath.endsWith('.html') ||
    filePath.endsWith('.js') ||
    filePath.endsWith('.css') ||
    filePath.endsWith('.png') ||
    filePath.endsWith('.jpg') ||
    filePath.endsWith('.jpeg') ||
    filePath.endsWith('.svg')
  );
}

function compressFile(filePath) {
  console.log(`Compressing ${filePath}`);
  const options = {
    verbose: false,
    verbose_more: false,
    numiterations: 15,
    blocksplitting: true,
    blocksplittinglast: false,
    blocksplittingmax: 15,
  };

  const stream = fs
    .createReadStream(filePath)
    .pipe(zopfli.createGzip(options))
    .pipe(fs.createWriteStream(filePath + '.gz'));
  stream.on('end', () => {
    console.log(`Finished to compress ${filePath}`);
  });
}

function compressFiles(rootPath) {
  fs.readdir(rootPath, (err, fileNames) => {
    for (let i = 0; i < fileNames.length; i++) {
      const fileName = fileNames[i];
      const filePath = rootPath + '/' + fileName;
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        compressFiles(filePath);
      } else if (isTarget(filePath)) {
        compressFile(filePath);
      }
    }
  });
}

function watchFiles(rootPath) {
  fs.watch(rootPath, (eventType, filename) => {
    const filePath = ((rootPath.endsWith('/')) ? rootPath : rootPath + '/') + filename;
    console.log(`Change ${filePath}`);
    if (isTarget(filePath)) {
      compressFile(filePath);
    }
  });
}

function main() {
  const argv = minimist(process.argv.slice(2));
  const target = argv._[0];
  const isWatch = argv.w;
  if (!target) {
    throw new Error('Need arguments');
  }

  compressFiles(target);
  if (isWatch) {
    watchFiles(target);
  }
}

main();

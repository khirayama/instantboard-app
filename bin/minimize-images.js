const fs = require('fs');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');

const ROOT_DIR = './materials';
const DIST_DIR = './src/assets';

function isTarget(filePath) {
  return (
    filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.jpeg') || filePath.endsWith('.webp') || filePath.endsWith('svg')
  );
}

function compressImage(filePath) {
  console.log(`Compressing ${filePath}`);
  const tmpDist = filePath.split('/');
  tmpDist.pop();
  const dist = tmpDist.join('/').replace(ROOT_DIR, DIST_DIR);
  imagemin([filePath], dist, {
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: '60-70',
      }),
    ],
  });
  imagemin([filePath], dist, {
    plugins: [
      imageminWebp({
        quality: '60-70',
        lossless: true,
      }),
    ],
  });
}

function compressImages(rootPath) {
  fs.readdir(rootPath, (err, fileNames) => {
    for (let i = 0; i < fileNames.length; i++) {
      const fileName = fileNames[i];
      const filePath = rootPath + '/' + fileName;
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        compressImages(filePath);
      } else if (isTarget(filePath)) {
        compressImage(filePath);
      }
    }
  });
}

compressImages(ROOT_DIR);

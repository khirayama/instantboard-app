import * as crypto from 'crypto';
import * as fastify from 'fastify';
import * as fs from 'fs';
import * as path from 'path';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import serveStaticCompression from './middleware/serve-static-compression';
import Spinner from './presentations/components/spinner';

const app: any = fastify();

const APP_SERVER_PORT: number = Number(process.env.PORT || '3000');

function minifyHTML(htmlString: string): string {
  const parts: string[] = htmlString.split('\n');
  const minifiedParts: string[] = parts.map(part => part.trim());
  return minifiedParts.join('');
}

function isTargetExtension(filePath) {
  return filePath.endsWith('.js') || filePath.endsWith('.css');
}

interface IHash {
  filePath: string;
  value: string;
}

function createHashes(rootPath: string): IHash[] {
  const fileNames: string[] = fs.readdirSync(rootPath);
  let hashes: IHash[] = [];
  for (const fileName of fileNames) {
    const filePath: string = rootPath + '/' + fileName;
    const stats: any = fs.statSync(filePath);
    if (stats.isDirectory()) {
      hashes = hashes.concat(createHashes(filePath));
    } else if (isTargetExtension(filePath)) {
      const content: string = fs.readFileSync(filePath, 'utf-8');
      const hash: string = crypto
        .createHash('sha1')
        .update(content)
        .digest('hex');
      hashes.push({ filePath, value: hash });
    }
  }
  return hashes;
}

interface IOptions {
  preload?: boolean;
  defer?: boolean;
  async?: boolean;
  rootFilePath?: string;
}

function generateExternalFileTags(hashes: IHash[], options: IOptions = {}): string[] {
  const tags: string[] = [];

  for (const hash of hashes) {
    const filePath = hash.filePath.replace(options.rootFilePath || '', '');
    if (filePath.endsWith('.css')) {
      if (options.preload) {
        tags.push(`<link rel="preload" href="${filePath}?revision=${hash.value}" as="style">`);
      }
      tags.push(`<link rel="stylesheet" href="${filePath}?revision=${hash.value}">`);
    } else if (filePath.endsWith('.js')) {
      if (options.preload) {
        tags.push(`<link rel="preload" href="${filePath}?revision=${hash.value}" as="script">`);
      }
      const attrs: string[] = [];
      if (options.defer) {
        attrs.push('defer');
      }
      if (options.async) {
        attrs.push('async');
      }
      tags.push(`<script src="${filePath}?revision=${hash.value}" ${attrs.join(' ')}></script>`);
    }
  }
  return tags;
}

function template(): string {
  const hashes = createHashes(path.join(__dirname, 'public'));
  const externalFileTags = generateExternalFileTags(hashes, {
    preload: true,
    defer: true,
    rootFilePath: path.join(__dirname, 'public'),
  });
  const htmlString: string = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <link rel="preconnect" href="//api.instantboard.cloud" crossorigin>
  <link rel="manifest" href="/manifest.json">
  ${externalFileTags.join('')}
  <meta name="mobile-web-app-capable" content="yes">
  <link rel="icon" sizes="192x192" href="/images/icon-android.png">

  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="Instantboard">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <link rel="apple-touch-icon" sizes="76x76" href="/images/icon-ios.png">

  <title>Instantboard</title>

  <script>
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
  ga('create', 'UA-107259240-1', 'auto');
  </script>
  <script async src='https://www.google-analytics.com/analytics.js'></script>
</head>
<body>
  <section class="application">
    <main class="application--main"></main>
    <div class="application--loader">
      ${ReactDOMServer.renderToString(<Spinner />)}
    </div>
  </section>
</body>
</html>
`;
  return minifyHTML(htmlString);
}

const html: string = template();

app.use('/', serveStaticCompression(path.join(__dirname, 'public')));
app.get('*', (req, res): void => {
  res.type('text/html').send(html);
});

/* eslint-disable capitalized-comments */
/* tslint:disable:no-console */
console.log(`Start api app at ${new Date()}`);
/* tslint:enable:no-console */
/* eslint-enable capitalized-comments */
app.listen(APP_SERVER_PORT);

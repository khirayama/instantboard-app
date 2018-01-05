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

const scriptContent: string = fs.readFileSync(path.join(__dirname, 'public', 'bundle.js'), 'utf-8');
const scriptHash: string = crypto.createHash('sha1').update(scriptContent).digest('hex');
const stylesheetContent: string = fs.readFileSync(path.join(__dirname, 'public', 'index.css'), 'utf-8');
const stylesheetHash: string = crypto.createHash('sha1').update(stylesheetContent).digest('hex');

function template(): string {
  const htmlString: string = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

  <link rel="preload" href="/index.css?revision=${stylesheetHash}" as="style">
  <link rel="preload" href="/bundle.js?revision=${scriptHash}" as="script">

  <link rel="preconnect" href="//api.instantboard.cloud" crossorigin>

  <link rel="stylesheet" href="/index.css?revision=${stylesheetHash}">
  <script src="/bundle.js?revision=${scriptHash}" defer></script>

  <link rel="manifest" href="/manifest.json">

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
      ${ReactDOMServer.renderToString(<Spinner/>)}
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

import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as fastify from 'fastify';
import * as path from 'path';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as serveStatic from 'serve-static';
import Spinner from './presentations/components/spinner';

const app = fastify();

const APP_SERVER_PORT = Number(process.env.PORT || '3000');

function minifyHTML(htmlString) {
  const parts = htmlString.split('\n');
  const minifiedParts = parts.map(part => part.trim());
  return minifiedParts.join('');
}

function template() {
  const htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

  <link rel="stylesheet" href="/index.css">
  <script src="/bundle.js" defer></script>

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

const html = template();

app.use(compression({
  threshold: 0,
  level: 9,
  memLevel: 9,
}));
app.use(cookieParser());

// For fastify
app.use(serveStatic(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.type('text/html').send(html);
});

/* eslint-disable capitalized-comments */
/* tslint:disable:no-console */
console.log(`Start api app at ${new Date()}`);
/* tslint:enable:no-console */
/* eslint-enable capitalized-comments */
app.listen(APP_SERVER_PORT);

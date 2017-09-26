import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as path from 'path';
import * as React from 'react';
import {SpinnerIcon} from './components/icon';
import reducers from './reducers';
import Navigator from './router/navigator';
import Router from './router/router';
import routes from './router/routes';
import initialState from './store/initial-state';
import Store from './store/store';

import * as jwt from 'jwt-simple';
import tokenManager from './utils/token-manager';

const app = express();
const store: IStore = new Store(initialState, reducers);
const router = new Router(routes);

const SECRET_KEY = process.env.SECRET_KEY;

const APP_SERVER_PORT = process.env.PORT || 3000;

function minifyHTML(htmlString) {
  const parts = htmlString[0].split('\n');
  const minifiedParts = parts.map((part) => part.trim());
  return minifiedParts.join('');
}

function template() {
  return minifyHTML`<!DOCTYPE html>
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
</head>
<body>
  <section class="application">
    <main class="application--main"></main>
    <div class="application--loader">
      <div class="spinner-icon">
        <svg viewBox="0 0 32 32" width="32" height="32">
          <defs>
            <linearGradient id="spinner-gradient">
              <stop class="spinner-color1" offset="100%"/>
              <stop class="spinner-color2" offset="100%"/>
            </linearGradient>
          </defs>
          <circle id="spinner" cx="16" cy="16" r="14" fill="none"/>
        </svg>
      </div>
    </div>
  </section>
</body>
</html>`;
}

app.use(compression({
  threshold: 0,
  level: 9,
  memLevel: 9,
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(cookieParser());

app.get(router.getPaths(), (req, res) => {
  res.send(template());
});

/* eslint-disable capitalized-comments */
/* tslint:disable:no-console */
console.log(`Start api app at ${new Date()}`);
/* tslint:enable:no-console */
/* eslint-enable capitalized-comments */
app.listen(APP_SERVER_PORT);

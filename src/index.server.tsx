import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import {SpinnerIcon} from './components/icon';
import reducers from './reducers';
import Navigator from './router/navigator';
import Router from './router/router';
import routes from './router/routes';
import initialState from './store/initial-state';
import Store from './store/store';

import tokenManager from './utils/token-manager';
import * as jwt from 'jwt-simple';

const app = express();
const store: IStore = new Store(initialState, reducers);
const router = new Router(routes);

const SECRET_KEY = process.env.SECRET_KEY;

const APP_SERVER_PORT = process.env.APP_SERVER_PORT;
const APP_SERVER_HOSTNAME = process.env.APP_SERVER_HOSTNAME;
const APP_SERVER_HOST = `http://${APP_SERVER_HOSTNAME}:${APP_SERVER_PORT}`;

function template(content) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="/index.css">
  <script src="/bundle.js" defer></script>
  <link rel="manifest" href="/manifest.json">
  <title>Instantboard</title>
</head>
<body>
  <section class="application">
    <main class="application--main">${content}</main>
    <div class="application--loader">
      ${ReactDOMServer.renderToString(<SpinnerIcon/>)}
    </div>
  </section>
</body>
</html>`;
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(cookieParser());

app.get(router.getPaths(), (req, res) => {
  if (req.path !== '/login') {
    const token = req.cookies[tokenManager.key];
    try {
      const decode = jwt.decode(token, SECRET_KEY);
    } catch(err) {
      res.redirect('/login');
    }
  }

  const content = ReactDOMServer.renderToString((
    <Navigator
      props={{store}}
      router={router}
      path={req.path}
    />
  ));
  res.send(template(content));
});

console.log(`Start api app at ${new Date()} on ${APP_SERVER_HOST}`);
app.listen(APP_SERVER_PORT);

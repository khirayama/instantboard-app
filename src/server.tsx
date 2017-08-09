import * as path from 'path';
import * as express from 'express';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import Store from './store/store';
import initialState from './store/initial-state';
import reducers from './reducers';
import Navigator from './router/navigator';
import Router from './router/router';
import routes from './router/routes';

const app = express();
const store: IStore = new Store(initialState, reducers);
const router = new Router(routes);

function template(content) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="/index.css">
  <script src="/bundle.js" defer></script>
  <title>Instantboard</title>
</head>
<body>
  <section class="application">
    <main class="application--main">${content}</main>
    <div class="application--loader">
      <div class="loader">
        <svg viewBox="0 0 32 32" width="32" height="32">
          <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
        </svg>
      </div>
    </div>
  </section>
</body>
</html>`
}

app.use(express.static(path.join(__dirname, 'public')));

app.get(router.getPaths(), (req, res) => {
  console.log(req.path);
  const content = ReactDOMServer.renderToString((
    <Navigator
      props={{store}}
      router={router}
      path={req.path}
    />
  ));
  res.send(template(content))
});
app.listen(3000);

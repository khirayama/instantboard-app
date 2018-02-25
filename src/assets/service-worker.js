self.addEventListener('install', event => {
  console.log('installing');
});

self.addEventListener('activate', event => {
  console.log('activating');
});

self.addEventListener('fetch', event => {
  console.log('fetching', event.request.url);
});

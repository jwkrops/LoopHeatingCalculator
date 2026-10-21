/* Offline copy of the Loop heating setup app.
   Strategy: try the network first so updates arrive straight away; if the network is down
   or takes longer than 3 s, serve the copy saved on the device.
   When you publish a new version, change VERSION so old copies are cleared. */
const VERSION = "1.0.0";
const CACHE = "loop-heating-" + VERSION;
const ASSETS = ["./", "./index.html"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k.startsWith("loop-heating-") && k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  const net = fetch(req).then(res => {
    if(res.ok){ const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  });
  e.waitUntil(net.catch(() => {}));
  e.respondWith((async () => {
    const cached = await caches.match(req, { ignoreSearch: true })
                || (req.mode === "navigate" ? await caches.match("./index.html") : undefined);
    if(!cached) return net;
    const timeout = new Promise(res => setTimeout(() => res(cached), 3000));
    return Promise.race([net.catch(() => cached), timeout]);
  })());
});

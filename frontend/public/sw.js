if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let c=Promise.resolve();return s[e]||(c=new Promise(async c=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=c}else importScripts(e),c()})),c.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},c=(c,s)=>{Promise.all(c.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(c)};self.define=(c,n,i)=>{s[c]||(s[c]=Promise.resolve().then(()=>{let s={};const a={uri:location.origin+c.slice(1)};return Promise.all(n.map(c=>{switch(c){case"exports":return s;case"module":return a;default:return e(c)}})).then(e=>{const c=i(...e);return s.default||(s.default=c),s})}))}}define("./sw.js",["./workbox-6f0d2936"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/",revision:"nqDMW2_gTNYb8jVM-2BT-"},{url:"/_next/static/chunks/commons.0f9ebf7166a2c8a4b853.js",revision:"382d8cd9dc2a6c7c430d8f35867f8c96"},{url:"/_next/static/chunks/f3b27fedcdaecd9484d9dc052f54de078860e6a8.3e43614c0f40051927cb.js",revision:"b05ff27228efbf218927b2cc1680fb6c"},{url:"/_next/static/chunks/fe34ef65717bd4c6eef2f6eed4a7584e058a8255.137898382c7e036bbd3c.js",revision:"3a81afed5954a12bd0cddfdc1fdfa6c0"},{url:"/_next/static/chunks/framework.5fcc7199ef0beb206d2f.js",revision:"a6ffcc3fbc51a136797bdccc32a2fe32"},{url:"/_next/static/css/b90ce9456505a1dc0b11.css",revision:"9881cd669539390c657f20ff8fbcc391"},{url:"/_next/static/nqDMW2_gTNYb8jVM-2BT-/_buildManifest.js",revision:"fb96ae7926f5104f50f0cf1b3a23a9b5"},{url:"/_next/static/nqDMW2_gTNYb8jVM-2BT-/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/nqDMW2_gTNYb8jVM-2BT-/pages/_app.js",revision:"6a7931e9def845bec80b7cdc41ce1eee"},{url:"/_next/static/nqDMW2_gTNYb8jVM-2BT-/pages/_error.js",revision:"b358e30c3eba23838b26fb342d8d7078"},{url:"/_next/static/nqDMW2_gTNYb8jVM-2BT-/pages/index.js",revision:"c44599912548a01c28d644b5a7b89146"},{url:"/_next/static/runtime/main-5c8b120d4571eb6c84ab.js",revision:"d8040c4d93e7bb04da7ff3c919bc32ac"},{url:"/_next/static/runtime/polyfills-ad15616ed8cbb873dc95.js",revision:"12277db71cf83b1117b61d73a1685a91"},{url:"/_next/static/runtime/webpack-91b117697e716c22a78b.js",revision:"40b4095b5b68a142c856f388ccb756f2"},{url:"/icons/apple-icon.png",revision:"3d13c7a847b4bd17a3e50dbcde9a2b78"},{url:"/icons/favicon.ico",revision:"940cc6bd3bb401fc3be83df3dfd09488"},{url:"/icons/icon-128x128.png",revision:"db7481a04968b3ad4716436d30b3e409"},{url:"/icons/icon-144x144.png",revision:"689a1926530ed6ca26db537029c1dfd7"},{url:"/icons/icon-152x152.png",revision:"98af072da209b3b297308717b06ea86c"},{url:"/icons/icon-16x16.png",revision:"4c0dc2eb604228b0ee11fbfb59572520"},{url:"/icons/icon-192x192.png",revision:"7ab8c82581552c7558c5b009ffcb3cd2"},{url:"/icons/icon-32x32.png",revision:"eb47dfd48aa3ecbeeb7be6431b41112c"},{url:"/icons/icon-384x384.png",revision:"aae6d1f552c78e06bf42aae2462a98fa"},{url:"/icons/icon-512x512.png",revision:"837ab4469c705c188326cec571ecb227"},{url:"/icons/icon-72x72.png",revision:"cb6e3fb9db7db52f0986da1ff9bab188"},{url:"/icons/icon-96x96.png",revision:"7d8348b60cdd985bd24b48cb56855c1a"},{url:"/manifest.json",revision:"688128be216cc2f753fe641590f2fcd3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/use\.fontawesome\.com\/releases\/.*/i,new e.CacheFirst({cacheName:"font-awesome",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.StaleWhileRevalidate({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.StaleWhileRevalidate({cacheName:"others",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
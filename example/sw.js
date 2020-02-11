// when the browser requests a resource
// addEventListener('fetch', event => {
//     event.respondWith(
//         // look in the cache for the resource
//         caches.match(event.request).then(async response => {
//             if (response) {
//                 // is in cache, respond with the cached resource
//                 return response;
//             }
//             // if not found fetch it from the network
//             const networkResponse = await fetch(event.request);
//             // response needs to be cloned if going to be used more than once
//             const clonedResponse = networkResponse.clone();
            
//             // save response to runtime cache for later use
//             const runtimeCache = await caches.open('runtime-cache');
//             runtimeCache.put(event.request, networkResponse);
            
//             // respond with the cloned network response
//             return Promise.resolve(clonedResponse);
//         })
//     );
// });

addEventListener('message', event => {
    if (event.data && event.data.type === 'NEW_VERSION') {
        skipWaiting();
    }
});
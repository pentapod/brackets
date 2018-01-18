/* eslint no-undef: 0 */
/* eslint no-restricted-globals: 0 */

var totalFiles = precacheConfig.length;
var processedFiles = 0;
//Original cleanResponse function from bramble-sw
var originalCleanResponseFunc = cleanResponse;

var cleanResponse = function(originalResponse) {
    "use strict";

    processedFiles++;
    self.clients.matchAll({
        includeUncontrolled: true,
        type: 'window'
    }).then(function(clients) {
        clients.forEach(function(client) {
            client.postMessage({
                progress: processedFiles / totalFiles
            });
        });
    });
    //finally call the original cleanResponseFunc
    return originalCleanResponseFunc(originalResponse);
};

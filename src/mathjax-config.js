/**
 * Viola: A configuration file for MathJax
 */

/*global MathJax*/

(function() {
    "use strict";

    window.MathJax = {
        showProcessingMessages: false,
        messageStyle: "none",
        tex2jax: {
            inlineMath: [["$", "$"], ["\\(", "\\)"]]
        },
        SVG: {
            scale: 90,
            font: "STIX-Web",
            linebreaks: {
                automatic: true
            },
            styles: {
                ".MJXc-display": {
                    margin: "0"
                }
            }
        },
        "fast-preview": {
            disabled: true
        },
        AuthorInit: function() {
            MathJax.Hub.processSectionDelay = 0;
        }
    };
}());

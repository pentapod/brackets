/*
 * Viola: A configuration file for MathJax.
 * This file is used for web preview and it's no effect to print preview.
 * See also vivliostyle/resources/mathjax-config.js
 */

/* eslint-disable */

window.MathJax = {
    showProcessingMessages: false,
    messageStyle: "none",
    CommonHTML: {
        scale: 90,
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

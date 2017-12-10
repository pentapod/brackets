/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets: true, $, vivliostyle*/

/**
 *  PrintPreviewer: a library for Viola
 */
define(function (require, exports, module) {
    "use strict";

    var BrambleEvents = brackets.getModule("bramble/BrambleEvents");
    var BrambleStartupState = brackets.getModule("bramble/StartupState");
    var UrlCache = brackets.getModule("filesystem/impls/filer/UrlCache");

    var PrintPreviewerTemplate = require("text!lib/Print.html");

    var _previewerRef, _viewer, _currentUrl, _iframeRef;

    function init() {
        if (!_iframeRef) {
            $("#second-pane").append(PrintPreviewerTemplate);
            var iframeConfig = {
                id: "print-previewer-root",
                src: BrambleStartupState.url("base") + "extensions/default/bramble/print-previewer/index.html",
                frameborder: 0
            };
            $("<iframe>", iframeConfig).prependTo("#print-previewer-wrapper");

            _iframeRef = window.document.getElementById("print-previewer-root");
            window.addEventListener("message", _listener);
        }

        BrambleEvents.on("bramble:projectSaved", reload);
    }

    function _listener(event) {
        var msgObj;

        try {
            msgObj = JSON.parse(event.data);
        } catch (e) {
            return;
        }

        if (msgObj.message === "ready") {
            reload();
        }
    }

    function getPreviewerIFrame() {
        return _iframeRef;
    }

    function sendMessage(msgStr) {
        if (!_iframeRef) {
            return;
        }
        var win = _iframeRef.contentWindow;
        win.postMessage(msgStr, "*");
    }

    function reload() {
        if (typeof _currentUrl !== "string") {
            return;
        }
        sendMessage(JSON.stringify({
            action: "load_document",
            url: _currentUrl
        }));
    }

    function updateBrowserUrl(url) {
        if (typeof url !== "string" || _currentUrl === url) {
            return;
        }
        _currentUrl = url;
        sendMessage(JSON.stringify({
            action: "load_document",
            url: _currentUrl
        }));
    }

    function navigateLeft() {
        sendMessage(JSON.stringify({
          action: "navigate_left"
      }));
    }

    function navigateRight() {
        sendMessage(JSON.stringify({
            action: "navigate_right"
        }));
    }

    exports.init = init;
    exports.getPreviewerIFrame = getPreviewerIFrame;
    exports.sendMessage = sendMessage;
    exports.reload = reload;
    exports.updateBrowserUrl = updateBrowserUrl;
    exports.navigateLeft = navigateLeft;
    exports.navigateRight = navigateRight;
});

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets: true, $, vivliostyle*/

/**
 *  PrintPreviewer: a library for Viola
 */
define(function (require, exports, module) {
    "use strict";

    var BrambleEvents = brackets.getModule("bramble/BrambleEvents");
    var BrambleStartupState = brackets.getModule("bramble/StartupState");

    var _previewerRef, _viewer, _currentUrl;

    function init(previewerRootRef) {
        _previewerRef = previewerRootRef;
        _viewer = new vivliostyle.viewer.Viewer({
            userAgentRootURL: "thirdparty/vivliostyle/resources/",
            viewportElement: _previewerRef,
            debug: true,
        });

        BrambleEvents.on("bramble:projectSaved", reload);
    }

    function reload() {
        if (typeof _currentUrl !== "string") {
            return;
        }
        if (_viewer) {
            _viewer.loadDocument({
                url: _currentUrl,
                startPage: undefined,
                skipPagesBefore: undefined,
            }, {}, {
                fitToScreen: true,
            });
        }
    }

    function updateBrowserUrl(url) {
        if (typeof url !== "string" || _currentUrl === url) {
            return;
        }
        _currentUrl = url;
        if (_viewer) {
            _viewer.loadDocument({
                url: url,
                startPage: undefined,
                skipPagesBefore: undefined,
            }, {}, {
                fitToScreen: true
            });
        }
    }

    function navigateLeft() {
        if (_viewer) {
          _viewer.navigateToPage("left");
        }
    }

    function navigateRight() {
        if (_viewer) {
          _viewer.navigateToPage("right");
        }
    }

    exports.init = init;
    exports.reload = reload;
    exports.updateBrowserUrl = updateBrowserUrl;
    exports.navigateLeft = navigateLeft;
    exports.navigateRight = navigateRight;
});

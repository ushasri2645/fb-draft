"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "prepareDesignPublisher", {
    enumerable: true,
    get: function() {
        return prepareDesignPublisher;
    }
});
_export_star(require("./beta"), exports);
function _export_star(from, to) {
    Object.keys(from).forEach(function(k) {
        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) {
            Object.defineProperty(to, k, {
                enumerable: true,
                get: function() {
                    return from[k];
                }
            });
        }
    });
    return from;
}
const { canva_sdk } = window;
const prepareDesignPublisher = canva_sdk.intents.v1.design.prepareDesignPublisher;
window.__canva__?.sdkRegistration?.registerPackageVersion('intents/design', '2.0.0', 'alpha');

"use strict"
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get prepareAssetPicker () {
        return prepareAssetPicker;
    },
    get prepareUrlExpander () {
        return prepareUrlExpander;
    }
});
const { canva_sdk } = window;
const prepareAssetPicker = canva_sdk.intents.v1.asset.prepareAssetPicker;
const prepareUrlExpander = canva_sdk.intents.v1.asset.prepareUrlExpander;
window.__canva__?.sdkRegistration?.registerPackageVersion('intents/asset', '2.0.0', 'alpha');

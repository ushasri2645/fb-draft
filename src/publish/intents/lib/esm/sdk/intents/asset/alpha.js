const { canva_sdk } = window;
export const prepareAssetPicker = canva_sdk.intents.v1.asset.prepareAssetPicker;
export const prepareUrlExpander = canva_sdk.intents.v1.asset.prepareUrlExpander;
window.__canva__?.sdkRegistration?.registerPackageVersion('intents/asset', '2.0.0', 'alpha');

const { canva_sdk } = window;
export * from './beta';
export const prepareDesignPublisher = canva_sdk.intents.v1.design.prepareDesignPublisher;
window.__canva__?.sdkRegistration?.registerPackageVersion('intents/design', '2.0.0', 'alpha');

"use strict"
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "prepareDesignEditor", {
    enumerable: true,
    get: function() {
        return prepareDesignEditor;
    }
});
const { canva_sdk } = window;
const prepareDesignEditor = canva_sdk.intents.v1.design.prepareDesignEditor;

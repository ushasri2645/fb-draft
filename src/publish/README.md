
# Setup Instructions

1. Pull down the [`canva-apps-sdk-starter-kit`](https://github.com/canva-sdks/canva-apps-sdk-starter-kit) repo
2. Unzip the "tmp-publish" file we send in Slack. You will see two folders:
   - `intents`: the npm package that contains intent contract types
   - `design_publisher`: an example app that demonstrates how to implement DesignPublisherIntent
3. Place the unzipped package folder `intents` into the root folder of `canva-apps-sdk-starter-kit`
4. Update the `package.json` file and point `@canva/intents` to local:

```json
{
  "dependencies": {
    "@canva/intents": "./intents",
    ...
  }
}
```

5. Run `npm i` to install dependencies. Check that `node_modules/@canva/intents` is pointing to the local intents folder
6. Put the `design_publisher` example app code under the `examples/intents/` folder
7. Run the app with `npm start design_publisher`

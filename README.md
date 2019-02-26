## Install guide

1. Run `yarn install`
2. Be sure to have segment config filled in a global scope. It should look like this:

```js
window.Segments = {
  config: {
    AUTH_TOKEN: '',
    API_HOST: '',
    CANCEL_PATH: '',
    SEGMENT_ID: null
  }
};
```

3. `yarn serve` for development

## Build guide

- Run `yarn build` if you want to build whole application for the deployment. Then you can host contents of `/dist` folder as static files.
- Run `yarn build-lib` if you want to make build of remp-segment-builder as npm package (It's used for example in remp-scenario-builder).

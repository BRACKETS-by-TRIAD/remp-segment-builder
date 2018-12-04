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

3. `yarn serve` during development, or `yarn build` for production

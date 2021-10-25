`````
Arco Pro

# Package build

Package code
`````

*Auto translate by google.*

## Package and build

When the code is written, execute the following command to package the code

```bash
npm run build
```

This command calls `arco run build:site` which is a packaging command provided by Arco Cli. After packaging is completed, a `dist` folder will be generated in the root directory, which is the code that can be used for deployment.

arco cli is based on webpack, and the webpack configuration is open at the same time. If you need to customize the configuration, you can create a new `.config/webpack.config.js` in the root directory to modify the configuration, as follows:

```js
exports.site = (config, env) => {
   config.output.path = path.resolve(__dirname,'../prod');
};
```

What needs to be modified is the config variable. This variable is the default webpack configuration item. You can modify it according to the webpack configuration.

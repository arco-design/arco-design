`````
Arco Pro

# Npm Scripts

package.json script presets convenient and practical commands
`````

*Auto translate by google.*

Pro uses Arco CLI as the development and construction tool. Arco CLI provides a rich and practical API. This article mainly introduces several Pro's build commands based on Arco CLI.

## Development

```bash
npm run dev
```

The api called is as follows

```json
{
  "scripts": {
    "dev": "arco-scripts dev:site --port 9090"
  }
}
```

This will start the application at `0.0.0.0:9090`.

This command calls `arco-scripts dev:site`, this api supports passing two parameters: `ip` and `port`, and the priority of these two parameters is higher than the webpack configuration file.

We can specify the host and port through this api, as follows

### Specify host as localhost

```json
{
  "scripts": {
    "dev": "arco-scripts dev:site --ip localhost"
  }
}
```

### Specify port 8080

```json
{
  "scripts": {
    "dev": "arco-scripts dev:site --port 8080"
  }
}
```

Note that these two parameters have higher priority than the webpack configuration file.

For the modification of other dev server parameters, please refer to the webpack configuration chapter, and modify it by understanding the webpack configuration process.

## Build production

```bash
npm run build
```

The api called is as follows

```json
{
  "scripts": {
    "dev": "arco-scripts build:site"
  }
}
```

This command builds the production environment code according to the provided webpack configuration. Please refer to the webpack configuration chapter for specific configuration.

## Code Check

```bash
npm run eslint & npm run stylelint
```

Pro's code style check relies on eslint and stylelint, and also uses prettier, which is the mainstream match in the industry. The configuration items can be found in `.esintrc`, `.prettierrc` and `.stylelintignore` in the root directory.

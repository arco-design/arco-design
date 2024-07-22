`````
Material Market

# All Commands

Get a quick overview of all available commands contained in arco-cli and arco-scripts.
`````

*Auto translate by google.*

Arco provides the two commands `arco` and `arco-scripts` through `arco-cli` and `arco-scripts`. Before use, please install the following two NPM packages:

```
npm install arco-cli -g

npm install arco-scripts -g
```

You can execute `arco --help` and `arco-scripts --help` to quickly see the command usage:

```
$ arco --help

        ___ ____ _
       / | ______________ / __ \___ _____(_)___ _____
      / /| | / ___/ ___/ __ \/ / / / _ \/ ___/ / __ `/ __ \
     / ___ |/ / / /__/ /_/ / /_/ / __(__) / /_/ / / / /
    /_/ |_/_/ \___/\____/_____/\___/____/_/\__, /_/ /_/
                                             /____/

Usage: arco [commands] [options]

Options:
  -v, --version View the current version
  -h, --help output usage information

Commands:
  init [options] <projectName> Create a template project in the current folder.
  generate [options] Generate metadata
  publish Publish to npm
  sync [options] Synchronize information to the material market
  preview [options] Preview material details page with locally built products
  login SSO user login
  logout Exit SSO login
  whoami view current user information
  group [options] Related operations of user group
  template [options] Related operations of the material template
  block material block related commands
  help [cmd] display help for [cmd]
-------------------------------------------------- -------------------------------------
If you need to view a subcommand, you can use the subcommand help, such as: arco sync -h
Examples:
  $ arco sync -h
-------------------------------------------------- -------------------------------------
```

```
$ arco-scripts --help

Usage: arco-scripts command [options]

Options:
  -V, --version output the version number
  -h, --help output usage information

Commands:
  dev:component [options] build components with watch mode
  dev:art copy art template with watch mode
  build:component build all these sources: es, cjs, dist, icon and css
  build:component:css
  build:component:dist
  build:component:es
  build:component:cjs
  build:art
  dev:site [options] build your website with watch mode. e.g. arco-scripts dev:site --ip 127.0.0.1 --port 9090
  build:site
  build:icon
  docgen [options] generate document of component. e.g. arco-scripts docgen --components Alert,Affix,Button
  test A command which contains test:client and test:node, any option you entered will be passed to Jest. e.g. arco-scripts test --updateSnapshot
  test:client Any option you entered will be passed to Jest. e.g. arco-scripts test:client --updateSnapshot
  test:node Any option you entered will be passed to Jest. e.g. arco-scripts test:node --bail
  show:config <configType> Show your current config for arco-scripts. Valid type: babel|style|webpack.component|webpack.site|webpack.icon|jest|docgen
```

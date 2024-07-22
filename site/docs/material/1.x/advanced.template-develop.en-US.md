`````
Material Market

# Template Development

Learn how to develop custom material templates.
`````

*Auto translate by google.*

Arco officially provides a variety of material templates. When they cannot meet your needs, you can develop your own material templates. It is recommended to modify based on Arco's official material item, and then convert it into a material template.

## **Convert the project into a template**

Assuming that you already have a secondary-developed Arco material project, you can quickly convert it into a template through the `arco template --create` command.

```
$ arco template --create

        ___ ____ _
       / | ______________ / __ \___ _____(_)___ _____
      / /| | / ___/ ___/ __ \/ / / / _ \/ ___/ / __ `/ __ \
     / ___ |/ / / /__/ /_/ / /_/ / __(__) / /_/ / / / /
    /_/ |_/_/ \___/\____/_____/\___/____/_/\__, /_/ /_/
                                             /____/

? Please enter the path of the existing project as a template ./hello-arco
? Please enter the target path of the generated template ./my-template
? Is the generated template used in the monorepo project? No
? Please enter the NPM package name of this template my-template
✔ The copy of the project content is complete!
✔ Successfully converted the template!
```

The generated template directory structure is as follows, **please make sure that there are no side-effect products (such as packaged products, etc.) in the template**:

```
.
├── package.json
└── template
    ├── .config
    ├── .eslintignore
    ├── .eslintrc
    ├── .prettierrc
    ├── .storybook
    ├── .stylelintignore
    ├── .stylelintrc
    ├── README.md
    ├── gitignore
    ├── package.json
    ├── src
    ├── stories
    ├── tests
    └── tsconfig.json
```

## **Add HOOK**

After the `arco init` initialization project is completed, it will try to execute the custom hook function of the template. Here you can customize the help information, perform project construction, etc. Add `hook/after-init.js` to the root directory of the project. Below is an example of a hook function:

```javascript
// hook/after-init.js
const {spawn} = require('child_process');

const logInfo = (messages) => {
  messages.forEach((m) => {
    console.log(`\x1B[32m${m}\x1B[0m`);
  });
};

module.exports = ({ projectName, isForMonorepo }) => {
  return new Promise((resolve, reject) => {
    spawn('npm', ['run','build'], {stdio:'inherit' }).on('close', (code) => {
      if (code) {
        reject();
      } else {
        if (isForMonorepo) {
          logInfo([
            '************************************************* *****************',
            'You can re-execute the following command in the Lerna root directory to preview all items',
            `$ npm run dev`,
            '************************************************* *****************',
          ]);
        } else {
          logInfo([
            '************************************************* *****************',
            'You can execute the following command to start the project',
            `$ cd ${projectName}`,
            `$ npm run dev`,
            '************************************************* *****************',
          ]);
        }
        resolve();
      }
    });
  });
};
```

**Note: No NPM dependency package should be used in `after-init`-the downloaded template has been removed at this time, it is an in-memory function.**

## **Debug local template**

```
# Use the template parameter to specify the local path as a template
arco init hello-arco --template file:../path/to/your/template
```

## **Publish and use templates**

After the template is developed and debugged correctly, it can be used after it is published to NPM. You can use this template to initialize the material project by `arco init hello-arco --template yourTemplatePackageName`.

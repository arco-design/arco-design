`````
Arco Pro

# Directory Structure

The organizational structure of the project file.
`````

*Auto translate by google.*

## contents

We organize files according to the type of resources, try to make the function of each folder or file relatively independent, and reduce coupling. When the following structure is not enough to use, it is recommended to try not to deviate from this principle when adjusting.

## Take the `create-react-app` architecture as an example.

```bash
├── README.md
├── config-overrides.js
├── package-lock.json
├── package.json
├── public
│ └── index.html          # cra packaging template
├── react-app-env.d.ts
├── src
│ ├── assets              # static resources
│ ├── components          # General business components
│ ├── context.tsx         # global configuration
│ ├── declaration.d.ts
│ ├── index.tsx           # Entry file
│ ├── layout.tsx          # layout
│ ├── locale              # Internationalized language pack
│ ├── mock                # public component mock data
│ ├── pages               # page template
│ ├── react-app-env.d.ts
│ ├── routes.ts           # Route configuration
│ ├── settings.json       # configuration file
│ ├── store               # redux state management
│ ├── style               # Global style
│ └── utils               # Tool library
├── tsconfig-base.json
├── tsconfig.json
└── yarn.lock
```

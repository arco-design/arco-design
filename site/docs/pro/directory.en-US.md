`````
Arco Pro

# Directory Structure

The organizational structure of the project file.
`````

*Auto translate by google.*

## contents

We organize files according to the type of resources, try to make the function of each folder or file relatively independent, and reduce coupling. When the following structure is not enough to use, it is recommended to try not to deviate from this principle when adjusting.

```bash
├── README.md
├── package-lock.json
├── package.json
├── public
│ └── index.html
├── src
│ ├── assets # static resources
│ ├── components # General business components
│ ├── context.ts # global configuration
│ ├── declaration.d.ts
│ ├── history.ts # history example
│ ├── index.tsx # Entry file
│ ├── layout # layout
│ ├── locale # Internationalized language pack
│ ├── mock # mock data
│ ├── pages # page template
│ ├── redux # State Management Center
│ ├── routes.tsx # Route configuration
│ ├── settings.json # configuration file
│ ├── style # Global style
│ └── utils # Tool library
└── tsconfig.json
```

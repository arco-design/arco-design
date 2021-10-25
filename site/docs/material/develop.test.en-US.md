`````
Material Market

# Test

Understand the unit testing of material items.
`````

*Auto translate by google.*

*This article is based on the project created by Arco's official material template*

arco-scripts has built-in Jest testing tools, you can use Jest to write your unit tests in your project. Take the component material project as an example, its `src/__test__` directory structure is as follows:

```
src/__test__
├── __snapshots__
│ └── demo.test.ts.snap
├── demo.test.ts
└── index.test.tsx
```

You can write your unit test in the `__test__` directory, and then execute the following command to test:

```bash
# jest --env=jsdom
arco-scripts test:client

# jest --env=node
arco-scripts test:node

# This command is a combination of test:client and test:node
arco-scripts test
```

If you need to use Jest CLI parameters, you can pass them directly after the test/test:client/test:node command. Arco will pass all these parameters to Jest transparently.

```bash
arco-scripts test --bail --updateSnapshot --passWithNoTests

arco-scripts test:client --updateSnapshot --coverage

arco-scripts test:node --bail
```

For custom Jest test configuration, please refer to: Create Project-Custom Configuration. You can also refer to the following documents:

- [Jest Configuration File](https://jestjs.io/docs/en/configuration)
- [Jest CLI options](https://jestjs.io/docs/en/cli)

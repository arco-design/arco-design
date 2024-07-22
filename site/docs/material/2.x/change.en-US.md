`````
Material Market 2.0

# 2.0 Changes

This document introduces some changes in Arco Material 2.x.
`````

*Auto translate by google.*

## Background
The Material Platform has been in use since its first version was launched at the end of 2020. Its main design concept has been used to this day, and it is based on `arco-cli` for material creation and release, and `arco-scripts` for material development and construction. During the actual operation, we found some problems:

* Material classification: We divided materials into different types such as "components", "blocks", "pages", "component libraries", and "tool functions", which increased the cost of understanding, and it was impossible to directly preview the "component library" type of materials on the material details page;

* Material preview: We used runtime rendering based on [react-live](https://github.com/FormidableLabs/react-live) to preview component demos, which provided convenience for users to debug demos online, but brought many [restrictions](https://arco.design/docs/material/build#demo-%E4%BE%9D%E8%B5%96) to the writing of component demos, resulting in some material demos not being able to be previewed normally;

* Document organization: In the 1.x Demo specification, it is necessary to add comments to the Demo in the form of JSDoc as a description of the Demo, which is very unintuitive and there is no way to freely edit the Demo document;

* Team Site: In order to provide a more aggregated document site experience for the team, we provide the "Team Site" feature. Although the team site has a very high degree of flexibility, it also brings some problems:
* Material duplication: Since the team site exists independently, the materials in it do not need to be published to the material platform, which may cause a material to exist in both the team site and the platform material list;
* Data statistics are difficult: Also due to its flexibility, we have lost many statistical dimensions for team site materials, and there are problems with data statistics duplication;
* Learning cost: In addition to understanding the basic concepts and operations of materials, users also need to understand the content of the team site.

## Changes
In response to the above problems, we have streamlined the concept of materials and redeveloped the CLI tool to assist development. Compared with the 1.x version of materials, 2.x has the following main changes (the in-progress but unfinished parts are marked with TODO):

* Streamlined material classification, all materials are called components:
* Replace the concepts of "blocks" and "pages" with whether to allow forks. Compared with ordinary components, "blocks" and "pages" can be understood as "components that require users to edit their source code before they can be used". The Fork operation can directly insert the component source code into the user project for secondary development;
* Materials are no longer dimensionally bound to NPM packages. The redesigned material ID is `npmPcakgeName/ComponentName`. Even if there are multiple components in an NPM package, they can correspond to materials one by one (for example, `@arco-design/web-react/Button` and `@arco-design/web-react/Tag` are from the same NPM package, but they are two independent materials);
* Changes in material document maintenance method:
* Compile the demo during the build process to ensure that the demo can be previewed normally on the platform;
* Use [MDX](https://mdxjs.com/) to write material documents, and you can freely organize the document content;
* Optimization of team homepage material display method:
* When a user enters a team to browse its materials, the view will switch to a document site view, with better hierarchical distinction and browsing experience;
* Provides online editing capabilities for material menus, allowing users to freely group team materials;

![image](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/226eedbd9c2646aeba24a088b53a95de~tplv-goo7wpa0wc-image.image)

* Redesigned CLI tool:

* Merges the capabilities of `arco-cli` and `arco-scripts`, and abandons the global installation method;

* Automatic API document extraction, through simple configuration and following API document writing rules, component API documents can be automatically injected into material documents;

* Workspace material management based on the workspace concept, greatly simplifying CLI-related configuration files;

* Component document writing based on MDX, a new development experience;

* [TODO] Provides unified interaction and API design, and will continue to expand support for Vue / Node type materials on this CLI in the future;

## About Team Site
In view of the disadvantages of Team Site mentioned above and this major version optimization, we will focus on the iteration of 2.x version of materials in the future, and Team Site will gradually enter the maintenance-only state. **If you are using the Material Platform for the first time, we do not recommend using the Team Site function. Please build your Team Material based on 2.x. **

This is the background and major changes of Material 2.x. Read on to learn how to get started.

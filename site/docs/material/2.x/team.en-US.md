
`````
Material Market 2.0

# Material Team

`````

*Auto translate by google.*

Material team is the best way to organize public materials within a team. You can apply for your material team through [this page](https://arco.design/material/createGroup/) (ByteDance intranet users please go to the corresponding intranet domain name). Once the team name is determined, it cannot be changed at will. Please try to use a clear team name with business orientation.

## Team ID
You can view the team ID in the team page URL or team overview:
![Image](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/54b78460f3264fb2a135aecb52fc2aa7~tplv-goo7wpa0wc-image.image)
By configuring the `group` field for the material in `arco.workspace.jsonc`, you can publish the material to a specific team:
```JSON
{
"arco.aspect/workspace": {
"components": {
"extends": {
// Specify the default team for all components, or set a different team for each component in members
"group": 1
},
"members": []
}
}
}
```

## Member Management
Team members are divided into two roles:

* Administrator (Owner): has the highest authority of the team, can manage all materials under the team, invite/delete team members;
* Ordinary member (Master): has the authority to publish materials to this team, can only manage materials authored by himself, and cannot manage materials published by other members of the team.

Team administrators can modify the team's basic information and manage team members on the "Team Configuration" page:
![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/91694c339e97497582daa7cd1a3cbbb0~tplv-goo7wpa0wc-image.image)

## Team Materials
![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/714370c5b95440b99057960cb2a75f11~tplv-goo7wpa0wc-image.image)

The materials owned by the team will be displayed on the "Team Materials" page. Different from the preview method on the platform homepage, the team page adopts a more traditional document station format for material organization and preview. When a user previews a material, the document page of the current material will be directly displayed on the right side of the menu:
![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/9130ca44e5d44ab6bc704552a1968d1f~tplv-goo7wpa0wc-image.image)

### Edit material catalog
We support online editing of material categories. Click the "Edit" icon on the right side of the "Overview" menu (only visible to team administrators) to enter the material category editing page:
![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/d5134f2b3ae94404b9646a30af51bb33~tplv-goo7wpa0wc-image.image)

On this page, you can freely organize the material catalog structure and set the default grouping of materials (materials that do not explicitly specify a grouping will be placed in the default grouping).
If your team has not set material catalog rules, we will try to group and display them according to material keywords (material `category` field), but will only try to group materials with only one keyword. Therefore, we recommend setting material grouping rules for your team through the above catalog editing function.
### Version log
Currently, Arco does not provide an automated version log generation tool. Here we only explain how to host the version log together with the material platform.
#### Add a single log for all materials
If you want to add a unified entry version log for your material library, just create an MDX file like adding a new component and register it as a component in `arco.workspace.jsonc`.
For example, add `src/__changelog__/index.mdx` to the project, and the corresponding Workspace configuration is:
```JSON
// arco.workspace.jsonc
{
"arco.aspect/workspace": {
"components": {
"members": [
{
"name": "Changelog"
"rootDir": "src",
"entries": {
"base": "__changelog__",
"preview": "index.mdx"
}
}
]
}
}
}
```

When synchronizing materials, the above document will be uploaded to the material platform as a separate component.
#### Add logs for each material
If you maintain independent version logs for each component, we recommend adding a Markdown document of the log in the component directory, and then configuring other static files for the component in addition to the Demo preview file through the `entries.extraDocs` field of the component (currently only Markdown files are supported).
For example, in the Button component directory `src/Button`, add a version log file `__docs__/changelog.md` to it, and its corresponding configuration is:
```JSON
// arco.workspace.jsonc
{
"arco.service/workspace": {
"components": {
"extends": {
// Declare the default version log document for the workspace component
"entries": {
"extraDocs": [
{
"title": "Changelog",
"entry": "./__docs__/changelog.md"
}
]
}
}
}
}
}
```

After configuring this option, static documents will be displayed as an additional tab in the local workspace and material platform preview:
<div class="markdown-img-layout-2">
<img src="https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/24c994e1db604eda8e08edbabde60698~tplv-goo7wpa0wc-image.image" />
<img src="https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/bfa25214b9ff4fb58cbd9d6b2908aae8~tplv-goo7wpa0wc-image.image" />
</div>

In addition, in the team configuration of the material platform, you can turn on the option of "aggregating component documents". We will automatically combine all components with the same `title` document, and add a new aggregate document entry in the material menu:
<div class="markdown-img-layout-2">
<img src="https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/65eec8dd46014741b0ed23918e48754a~tplv-goo7wpa0wc-image.image" />
<img src="https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/25d3af85296c4b1ebe2637dd4303388f~tplv-goo7wpa0wc-image.image" />
</div>

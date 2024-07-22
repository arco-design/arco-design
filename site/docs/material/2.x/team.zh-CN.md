`````
Material Market  2.0

# 物料团队

`````
物料团队是组织团队内公共物料的最佳形式，你可以通过[此页面](https://arco.design/material/createGroup/)（ByteDance 内网用户请前往相对应的内网域名）申请你的物料团队，团队名一旦确定不可自行更改，请尽量使用明确的、具有业务指向的团队名。

## 团队 ID
你可以在团队页面的 URL 或者团队概览处查看团队 ID：
![图片](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/54b78460f3264fb2a135aecb52fc2aa7~tplv-goo7wpa0wc-image.image)
通过在 `arco.workspace.jsonc` 中为物料配置 `group` 字段，可以将物料发布至指定团队：
```JSON
{
  "arco.aspect/workspace": {
    "components": {
      "extends": {
        // 指定所有组件的默认团队，也可以在 members 中为每一组件设置不同的团队
        "group": 1
      },
      "members": []
    }
  }
}
```

## 成员管理
团队成员分为两种角色：

* 管理员（Owner）：拥有团队的最高权限，可以管理团队下的所有物料，邀请/删除团队成员；
* 普通成员（Master）：拥有向此团队发布物料的权限，仅可管理作者为自己的物料，不可管理该团队其他成员发布的物料。

团队管理员可以在「团队配置」页面，修改团队的基础信息和管理团队成员：
![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/91694c339e97497582daa7cd1a3cbbb0~tplv-goo7wpa0wc-image.image)

## 团队物料
![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/714370c5b95440b99057960cb2a75f11~tplv-goo7wpa0wc-image.image)

团队所拥有的物料将集中展示在「团队物料」页面。与平台首页的预览方式不同，团队页面采用了更类似于传统文档站的形式进行物料组织和预览。在用户预览某一物料时，菜单右侧将直接显示当前物料的文档页：
![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/9130ca44e5d44ab6bc704552a1968d1f~tplv-goo7wpa0wc-image.image)

### 编辑物料目录
我们支持在线编辑物料分类，点击「概览」菜单右侧的「编辑」图标（仅团队管理员可见）将进入物料分类编辑页面：
![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/d5134f2b3ae94404b9646a30af51bb33~tplv-goo7wpa0wc-image.image)

在此页面，你可以自由组织物料的目录结构和设置物料的默认分组（未明确指定分组的物料将置于默认分组内）。
如果你的团队没有设置物料目录规则，我们将尝试根据物料关键词（物料 `category` 字段）对其进行分组展示，但仅会对只有一个关键词的物料进行分组尝试。因此我们建议通过上述目录编辑功能为你的团队设置物料分组规则。
### 版本日志
目前 Arco 不提供自动化的版本日志生成工具，此处我们仅说明将版本日志一同托管至物料平台的方式。
#### 为所有物料添加单个日志
如果你想要为你的物料库添加一个统一入口的版本日志，只需像新增组件一样创建一个 MDX 文件，并在 `arco.workspace.jsonc` 中将其注册为组件。
例如，在项目中新增 `src/__changelog__/index.mdx`，则对应的 Workspace 配置为：
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

在物料同步时，上述文档将作为一个独立的组件被上传至物料平台。
#### 为每个物料分别添加日志
如果你为每个组件维护独立的版本日志，我们推荐在组件目录下添加日志的 Markdown 文档，然后通过组件的 `entries.extraDocs` 字段，为组件配置除 Demo 预览文件之外的其它静态文件（目前仅支持 Markdown 文件）。
例如，在 Button 组件目录 `src/Button` 中，为其添加版本日志文件 `__docs__/changelog.md`，则其对应的配置为：
```JSON
// arco.workspace.jsonc
{
  "arco.service/workspace": {
    "components": {
      "extends": {
        // 为工作区组件声明默认的版本日志文档
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

配置此选项后，静态文档将在本地工作区和物料平台预览中以额外 Tab 的形式展现：
<div class="markdown-img-layout-2">
  <img src="https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/24c994e1db604eda8e08edbabde60698~tplv-goo7wpa0wc-image.image" />
  <img src="https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/bfa25214b9ff4fb58cbd9d6b2908aae8~tplv-goo7wpa0wc-image.image" />
</div>

此外，在物料平台的团队配置中，你可以打开 “聚合组件文档” 的选项。我们将自动组合所有组件具有相同 `title` 的文档，并在物料菜单中新增聚合文档入口：
<div class="markdown-img-layout-2">
  <img src="https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/65eec8dd46014741b0ed23918e48754a~tplv-goo7wpa0wc-image.image" />
  <img src="https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/25d3af85296c4b1ebe2637dd4303388f~tplv-goo7wpa0wc-image.image" />
</div>



`````
风格配置平台

# 使用全局配置

平台提供了组件全局默认属性的配置功能。
`````

## 在项目中引用

### step1 平台配置

使用风格配置平台进行相应的全局默认属性配置。

![](https://lf3-static.bytednsdoc.com/obj/eden-cn/unpzlK_vjyH/ljhwZthlaukjlkulzlp/DesignLab/20221122-113719.gif
)

### step2 发布主题包

配置完毕后，进行主题包的发布。主题包产物内包含了相关的配置文件。


### step3 产物使用

安装最新版主题包后，从主题包中导入 **componentConfig** 配合 [ConfigProvider](/react/components/config-provider) 进行使用。

```js
import { ConfigProvider } from '@arco-design/web-react';
import { componentConfig } from '@arco-design/theme-line/config'; // 此处需要配置为自己的主题包名

export default () => {
    return <ConfigProvider componentConfig={componentConfig}>
      {...}
    </ConfigProvider>
}
```

## 常见问题

1. #### 配置的样式在风格配置平台中未生效？

组件的全局属性优先级比较低，大部分原因是对应的属性已经被配置平台中的代码所覆盖。
亦或者是当前配置的属性需要搭配组件中的其它属性才能进行使用。（即便平台的样式没有表现出来，主题包的产物依旧会涵盖相关的配置）。
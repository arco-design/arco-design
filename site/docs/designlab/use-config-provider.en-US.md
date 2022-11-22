`````
DesignLab

# Use Config Provider

The platform provides a configuration function for the global default properties of components.
`````
*Auto translate by google.*

## Use in the project

### step1 Configure on the DesignLab

Use the DesignLab to configure the corresponding global default properties.

![](https://lf3-static.bytednsdoc.com/obj/eden-cn/unpzlK_vjyH/ljhwZthlaukjlkulzlp/DesignLab/20221122-113719.gif
)

### step2 Publish theme package

After the configuration is complete, publish the theme package. The relevant configuration files are included in the theme package product.


### step3 Product usage

After installing the latest theme package, import **componentConfig** from the theme package and use it with [ConfigProvider](/react/components/config-provider).

```js
import { ConfigProvider } from '@arco-design/web-react';
import { componentConfig } from '@arco-design/theme-line/config'; // you'r theme package name

export default () => {
    return <ConfigProvider componentConfig={componentConfig}>
      {...}
    </ConfigProvider>
}
```

## FAQ

1. #### The configured style does not take effect in the DesignLab?

The global properties of components have lower priority, mostly because the corresponding properties have been overridden by the code in the configuration platform.
Or the currently configured properties need to be used with other properties in the component. (Even if the DesignLab is not displayed, the product of the theme package will still cover the relevant configuration).
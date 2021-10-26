`````
Component / Feedback

# Skeleton

Use gray blocks to occupy the loading data.
`````

*Auto translate by google.*

## Basic attributes

### Component definition

Before the data is completely loaded, a simple page layout is shown to the user through a placeholder graphic.

### Component composition

The skeleton screen is generally composed of a combination of 3 types of space-occupying graphics in gray or neutral tones, including bar, circle, and square.

1. **Bar-shaped placeholder map:** Used to represent Chinese, English or numbers, and there are multiple sizes.
2. **Circular placeholder image:** Used to represent avatars, logos, circular icons, etc.
3. **Square placeholder image:** Used to represent buttons, square icons, pictures, etc., and the size is not limited.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b709f4b46dc5422bac7de0ab3fb88652~tplv-uwbnlip3yd-image.image)

### Component type

1. **Divided by content type**: Divided into text skeleton screens, skeleton screens with operations, skeleton screens with avatars, and skeleton screens with pictures.

    1. Text skeleton screen

    ![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cfcf1cfe57ef4ec89a42e52483d093ee~tplv-uwbnlip3yd-image.image)

    2. With operation

    ![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/fc6e67da325b478e9b707c30bccbf659~tplv-uwbnlip3yd-image.image)

    3. With avatar

    ![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9325b56c7f9c71c4a6ea1bb752f72eb7.png~tplv-uwbnlip3yd-webp.webp)

    4. With pictures and videos

    ![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b355af68aec02362c364b6add409ed53.png~tplv-uwbnlip3yd-webp.webp)

2. **Divided by color:** Divided into gray/neutral color skeleton screen and colored skeleton screen. Among them are the following scenes with colors:

    1. Colored text and icons

   ![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8cce11a5b02f949815582cb15b7cad0a.png~tplv-uwbnlip3yd-webp.webp)

    2. For pages with pictures as the main content, the colors have been preset or calculated by algorithms.

   ![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/20402c8575c8c12f9266a9ae8a3e961c.png~tplv-uwbnlip3yd-webp.webp)

    3. **With animation** **skeleton screen**

    It is usually a faint gradual sliding effect, which can be changed to a wave animation, which is suitable for general-style monochrome scenes, and strengthens that the page is loading.

    ![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/7b7ed9100d8492425d048bebafe0ddd9.png~tplv-uwbnlip3yd-webp.webp)

## When to use

1. **When the network is slow or the loading content is large:** Use the skeleton screen to provide users with an expectation of the upcoming content, and solve the gap caused by a white screen or interface flickering while waiting for loading, such as:

    1. When entering for the first time (not using it for the first time)
    2. When a new page jumps
    3. Downloading
    4. Searching

2. **When the layout of the content area is fixed:** Use the skeleton screen to show the outline of the content, such as lists, articles, and personal information.

3. **When the module information is temporarily vacant, but it needs to be occupied in advance:** This module can be used for display.

### Usage suggestions

1. **Ordered Loading Sequence**

    The loading of data should ensure certain rules, for example, according to the order of module arrangement, primary and secondary order, etc. Minimize the time difference between loading different elements as much as possible to ensure a good user experience.

    1. Partial loading should ensure a certain primary and secondary order

    ![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6d45aa86fb77b810e84408d84b2fd396.png~tplv-uwbnlip3yd-webp.webp)

    2. The overall loading sequence is consistent

    ![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/822e02487e7ca8b7dde73ab550d7dcaf.png~tplv-uwbnlip3yd-webp.webp)

2. **Random Content**

Used in the scene where the data is loaded for the second time, the webpage remembers the skeleton of the webpage, and the skeleton screen is more suitable when the content is random. It is not recommended to use placeholder graphics for fixed elements that have been cached, such as return, search and other operations, including fixed titles and other text.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c684e536f0814bc8a7d5d162313d6244~tplv-uwbnlip3yd-image.image)

## When not to use

1. **When the content layout and layout are not fixed,** there will be a huge difference between the outline and the content layout. Using a skeleton screen will not only give users a sense of smoothness and expectation, but will cause a gap.
2. **When there are empty pages in the content area,** it is not recommended to use a skeleton screen.
3. **When the loading time is less than 1 second**, it is not recommended to display the loading style; when the loading time is more than 10 seconds, it is recommended to provide user feedback and export of loading failure.

## Associated Components

[Spin](/react/components/spin)

The difference is that in general, the structure of the skeleton screen and the actual content is similar, so the appearance of the content will not be too abrupt. It can be considered that the skeleton screen is an upgraded version of the load.

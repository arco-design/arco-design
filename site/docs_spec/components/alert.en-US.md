`````
Component / Feedback

# Alert

Display warning information to the user. the Alert is used to display the information that needs attention.
`````

*Auto translate by google.*

## Basic attributes

### Component definition

Display information that needs attention, suitable for brief warning prompts.

### Component composition

1. **Icon (optional)**: You can add an icon in front of the warning text to show the current information status;
2. **Prompt text (required)**: The content of the prompt is recommended not to exceed 1 line;
3. **Auxiliary text (optional)**: When the content is relatively long, supplementary prompts can be provided through auxiliary text;
4. **Link (optional)**: You can add a link after the warning text;
5. **Cross (optional)**: Click to close the warning prompt;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5d2671f5d8cc4fd198700e2f92a1b582~tplv-uwbnlip3yd-image.image)

### Component type

There are four styles: normal, success, warning, and error, which can be configured according to different scenarios.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/894d4fcf228c40bc87e48a86de04c655~tplv-uwbnlip3yd-image.image)

## When to use

- When a page needs to display warning information to the user.
- The non-floating static display form is always displayed and will not disappear automatically. The user can click to close.

## When not to use

1. When a normal input item reports an error, use the error report style of the input item itself, or use **global prompt** instead of **warning prompt**.

![](https://lf3-static.bytednsdoc.com/obj/eden-cn/unpzlK_vjyH/ljhwZthlaukjlkulzlp/site/alert.png)

2. It is recommended to use **Card** or **Bubble Card** instead of **Warning Tips** when it is used to present general reminder information.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8eee5fc33b4e4ec0ba4bef155a9d7e02~tplv-uwbnlip3yd-image.image)

## Layout

It can be placed in a variety of containers such as "pages, dialog boxes, drawers", etc., and is generally displayed on the top of the container.

## Associated Components

[Message](/react/components/message)

[Popover](/react/components/popover)

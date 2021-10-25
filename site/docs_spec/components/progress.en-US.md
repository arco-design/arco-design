`````
Component / Feedback

# Progress

Give users feedback on the current running tasks, which is mostly used in scenes that run for a period of time, effectively reducing the anxiety of users in waiting.
`````

*Auto translate by google.*

## Basic attributes

### Component definition

Give users feedback on the running status of tasks in the current system execution, which is mostly used in scenes that run for a period of time, effectively reducing the anxiety of users during waiting.

### Component composition

1. **Current progress (required)**: Real-time display of completed progress, and the color contrasts strongly with the color of the total progress to show the current progress.
2. **Total progress (required)**: Indicates the total progress that needs to be completed. It is recommended that the color does not have a color tendency.
3. **Progress description (recommended)**: A brief description of the current progress, which can be a percentage, an icon or other custom fields.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/7abb96a86dcf46889f193e634c533843~tplv-uwbnlip3yd-image.image)

### Component type

| Type | Description |
| ----- | ------------------------------------------- ----------------------------------- |
| Standard progress bar | Common forms of progress bar, divided into basic progress bar, progress bar with readings, progress bar with icons, etc. |
| Annular progress bar | Divided into basic progress ring, progress ring with readings, progress ring with icons, etc.; compared with the standard progress bar, it occupies more space, but has a stronger visual effect. When you need to display multiple indicators of a project and there is enough space, you can use the circular progress bar |
| Mini progress bar | Mini progress bar occupies less space, but is weaker for the current progress status, and is mostly used for the progress display of less important projects |

1. Standard progress bar

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c6cb46fcfdf446d596ae85e97588a5a8~tplv-uwbnlip3yd-image.image)

2. Circular progress bar

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/fd120464c68946c096a92ddd5bfd9445~tplv-uwbnlip3yd-image.image)

3. Mini progress bar

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/27e07429bdae4b7ea230d54a5e6ecc30~tplv-uwbnlip3yd-image.image)

### Component size

The size of the progress bar is divided into three regular sizes: "small", "medium", and "large", which can be distinguished from parameters such as size and thickness.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/4a7847413c984642a94c54704971a29b~tplv-uwbnlip3yd-image.image)

### Component status

There are 4 different states in the input box, namely: progress state, complete state, loading state, and error state

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/37c49e90a71a415097fbeae59bb7b18d~tplv-uwbnlip3yd-image.image)

## When to use

1. **When displaying project progress directly**: When the user needs to visually display the progress percentage of an operation or project (such as: download/install/upload operations or the current project occupancy status), the progress bar can be used.
2. **When the operation waiting time is long**: When an operation has a long waiting time (more than 2s), you can use the progress bar, which can effectively reduce the user's anxiety during the waiting process.
3. **When comparing progress**: When you need to compare multiple progresses at the same time, you can use the progress bar.

## When not to use

1. **When the waiting time is too short**: When the user's waiting time is less than 2s, it is recommended to use the "loading" component instead of the "progress bar".
2. **Operation progress cannot be quantified**: When the current operation progress cannot be quantified, it is recommended to use the "loading" component instead of the "progress bar".

## Layout

1. Standard progress bar: the progress description, icons, operation and other suggestions are on the right side of the progress bar
2. Circular progress bar: the progress description, icons and other suggestions are in the middle of the circular bar
3. Mini progress bar: When the progress description suggests hovering the progress bar, the text bubble is displayed

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/ee7cb652d5044f1b8838a8cc6edb09f3~tplv-uwbnlip3yd-image.image)

## Five, copywriting guide

1. **Concise:** Data description mostly uses percentage form;
2. **Direct**: directly describe the current data and reduce redundant information;

## Interactive behavior

The progress bar will trigger different states according to different interaction behaviors. For details, please refer to the [Component State] module.

In addition to the default interactive behavior, when the use scene is complex, simple operations can be added to the progress bar as appropriate to improve the user experience, such as deleting, canceling uploading, and re-uploading.

## Associated Components

[Spin](/react/components/spin)

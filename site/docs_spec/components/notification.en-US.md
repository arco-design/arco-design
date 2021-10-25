`````
Component / Feedback

# Notification

Display a notification message globally.
`````

*Auto translate by google.*

## Basic attributes

### Component definition

Used to feed back important warning prompts and notification messages to users.

### Component composition

1. **Title (required)**: Deliver core information and provide users with a quick overview or direct results of the notification.
2. **Notice text (optional)**: Used to describe additional details or actionable steps. The body of the notification can include [Link](/docs/spec/link) , These links can be directed to the next steps.
3. **Action button (optional)**: Allow users to process notifications or navigate them to a page with more detailed information.
4. **Close button (optional)**: Close the notification reminder box.
5. **Icon (optional)**: Assist in explaining notification types, allowing users to understand information more quickly and intuitively
6. **Container (required)**: used to carry the notification reminder box.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/60a7ff7253a14bc1ad612e5046c27cf4~tplv-uwbnlip3yd-image.image)

### Component type

1. **General Information**

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/864dd751201247f4a0cf2aac99b14b1b~tplv-uwbnlip3yd-image.image)

2. **With icon:** It is commonly used to display system messages of "success, error, message, warning", and the icon can also be customized.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0a7e733cdba848be847f245b6e4e7efc~tplv-uwbnlip3yd-image.image)

3. **With action button:** The action button allows users to process notifications or navigate them to a page with more detailed information.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/49bf0f89c48246c7ad3f3e855a05fc1a~tplv-uwbnlip3yd-image.image)

## When to use

Generally used for system-level notifications, scenarios that need to attract user attention but do not force users to process. When a message appears, the user can choose to continue the current operation, or choose to process the current message.

1. **For notification only, no user processing required**

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5ed26e25034e4a5da203357468631209~tplv-uwbnlip3yd-image.image)

The user can choose to close it, or the system can close it automatically after a delay.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b14cee629c1b495989314b2603cf9138~tplv-uwbnlip3yd-image.image)

2. **Requires user processing:** The user needs to click the action button to select and confirm before proceeding. If it is important for the user to read or interact with the notification, it should not include a close button.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b2b3c9d070b14b278f16d621872a44bb~tplv-uwbnlip3yd-image.image)

## When not to use

1. **Important information requires the user's attention and action**: It is recommended to use the dialog box component.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/7ff0a949552246119643a993ae3269fb~tplv-uwbnlip3yd-image.image)

2. **Some frequent and unimportant brief reminders**, it is recommended to use the warning reminder component.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/622ace98d184450a8c0ceac1ab5af4eb~tplv-uwbnlip3yd-image.image)

## Component layout

The notification reminder box generally pops up a message prompt at the edge of the page, and it can pop up from the upper left corner, upper right corner, lower left corner, and lower right corner. Be consistent in the same system.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3a7c202e32dc4265a85bc15e8b24753c~tplv-uwbnlip3yd-image.image)

## Copywriting Guide

The notification reminder box provides limited space for content, so the content must be short and clear. Users should be able to quickly browse through notifications, understand the situation, and know what to do next.

1. **Title**

The title should be short and descriptive, explaining the most important information. If possible, it is recommended to use only the headline to convey the main message. Use periods only when the title is a complete sentence.

2. **Body Content**

Be concise and avoid repeating or rewriting the title. Limit the content to one or two short sentences. Explain how to solve the problem through troubleshooting or next steps, and you can include a link to redirect the user to the next step in the body of the notification.

3. **Behavior Label**

Keep labels concise and clearly indicate actions that users can take. Limit behavior labels to one or two words.

## Interactive behavior

1. **Close**

The notification reminder can be turned off manually, or it can be turned off automatically at a set time. The delayed turn off is generally automatically turned off after 3 seconds when it pops up.

2. **Operate notifications**

The user can click the action button to resolve the notification, such as "reply", "confirm" or enter the jump link.

## Associated Components

[Alert](/react/components/alert)

[Message](/react/components/message)

[Modal](/react/components/modal)

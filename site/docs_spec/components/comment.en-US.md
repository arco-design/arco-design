`````
Component / Data Display

# Comment

Display a comment.
`````

*Auto translate by google.*

## Basic attributes

### Component definition

Feedback, evaluation and discussion of content.

### Component composition

| Components | Description |
| ---------- | --------------------------- |
| 1. Avatar (required) | It can be the system default avatar or a user-defined avatar. |
| 2. Author's name (required) | Generally a user-defined account. |
| 3. Time (required) | Shows the time when the comment was posted. |
| 4. Comment content (required) | The text of the comment content posted by the user. The text usually contains text and emoticons. |
| 5. Operation (optional) | It can include likes, favorites, and replies. |

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/81b448d1761e7ac20dd5631a2f1a1480.png~tplv-uwbnlip3yd-webp.webp)

### Component type

| Type | Description |
| --------- | ----------------------- |
| 1. Basic comment component | A basic comment component with author, avatar, time and operation |
| 2. Nested comments | Comments can be nested, generally used when replying to comments |
| 3. Use with the list | Display the comment list with the list component |
| 4. Use with the reply box | Improve the interactivity with the reply box |

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3381eca24f3d449b132b58c96e6021f8.png~tplv-uwbnlip3yd-webp.webp)

### Interactive behavior

**Hover Trigger** **:** Hover the mouse over the operation button, and a background color will appear at the bottom of the button for feedback;

**Click to trigger:** Click the like and favorite buttons, the linear icon becomes a face icon; click the reply button, the comment appears in the embedded input box;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/838fbf17a57a4f4b8e30c7255a51301c.png~tplv-uwbnlip3yd-webp.webp)

## When to use

The comment component can be used to discuss things, such as pages, blog posts, questions, and so on.

## Associated Components

[List](/react/components/list)

[Input](/react/components/input)

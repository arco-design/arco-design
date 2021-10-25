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

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/03ecfabb9c6946f683c2078a35687784~tplv-uwbnlip3yd-image.image)

### Component type

| Type | Description |
| --------- | ----------------------- |
| 1. Basic comment component | A basic comment component with author, avatar, time and operation |
| 2. Nested comments | Comments can be nested, generally used when replying to comments |
| 3. Use with the list | Display the comment list with the list component |
| 4. Use with the reply box | Improve the interactivity with the reply box |

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e5a38a6e1e86472cafbcc70f6ea6be05~tplv-uwbnlip3yd-image.image)

### Interactive behavior

**Hover Trigger** **:** Hover the mouse over the operation button, and a background color will appear at the bottom of the button for feedback;

**Click to trigger:** Click the like and favorite buttons, the linear icon becomes a face icon; click the reply button, the comment appears in the embedded input box;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b753b2904ea94780bb613b7730c5f9f8~tplv-uwbnlip3yd-image.image)

## When to use

The comment component can be used to discuss things, such as pages, blog posts, questions, and so on.

## Associated Components

[List](/react/components/list)

[Input](/react/components/input)

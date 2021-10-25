`````
Component / Data Entry

# Input

The basic form components have been expanded on the basis of native controls and can be used in combination.
`````

*Auto translate by google.*

## Basic attributes

### Component definition

When the cursor is in the input box, the basic form component that allows the user to enter or edit text content. Can be combined with input box, search box, drop-down box, date picker, etc. flexibly.

### Component composition

1. **Container (required)**: A container carrying text content, which improves the discoverability of the input area by wrapping the text and contrasting the color with the text. The color and thickness change of the container edge is used to indicate the current state of the input box (such as: activation, error, success);
2. **Label text (recommended)**: A short description text on the top or left side of the container, used to explain what needs to be entered, and try not to exceed 6 Chinese characters. It is recommended that the label text is always displayed, and it can be omitted only when the page space is insufficient;
3. **Auxiliary text (recommended)**: The helpful text at the bottom of the container dynamically displays relevant information that can help the user complete the input (such as content recommendation, character limit, error prompt), generally without punctuation Declarative sentence of, it is recommended to have at most one line;
4. **Placeholder text (recommended)**: secondary prompt text in the container, providing prompts or examples related to the input content, generally declarative sentences without punctuation marks, and should not contain important tasks required to complete the task information. When the user starts typing in the input box, the placeholder text disappears. The placeholder color should be obviously different from the actual input text;
5. **Prefix icon (optional)**: used to describe the content and format that can be entered in the input box (such as phone number, date icon);
6. **Suffix icon (optional**): It has various functions according to different scenarios. Common scenarios are as follows: 1. Error prompt, which can be combined with the error prompt in the auxiliary text; 2. Content clear button, click one Key to clear the content entered in the input box; 3. Voice input button, click to trigger the voice input function; 4. Password hide button;
7. **Front and rear tags (optional)**: Preset content added before and after the input box. Common tags include information before and after the URL and counting units;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/2cfa2902790e4044bbe9babb838c5c0a~tplv-uwbnlip3yd-image.image)

### Component type

| Type | Description |
| ----- | ----------------------------------------- |
| Single-line input box | Only one line of text can be input. When the input exceeds the input box, the content is truncated. |
| Multi-line input box | A highly adaptive input box that supports the input of multiple lines of text. When multiple lines of text are input, the input box container expands downward with the content. |
| Text field | A multi-line text input box that can adjust the width and height by dragging the lower right corner adjustment icon |

1. Single line input box:

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b29e6353537c4f1c9ffa0c5264910ad8~tplv-uwbnlip3yd-image.image)

2. Multi-line input box:

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a5a5518bc2fd464682abff5a769f70a1~tplv-uwbnlip3yd-image.image)

3. Text field:

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/588722db8e1f48a3ba7b8cf4c11f0657~tplv-uwbnlip3yd-image.image)

### Component size

1. The input box container generally has the following four default heights: 24px (mini), 28px (small), 32px (medium), 36px (large). It is recommended to use a uniform height within the same business;
2. The length of the container should meet the user's expectations, and it should be guaranteed that the typical characters can be displayed directly;
3. The recommended text is 14px, and the recommended icon is 14px. The size can be increased or decreased as needed (not less than 12px is recommended). A uniform size is recommended for the same business;
4. To ensure that the information outside the container is strongly related to the container, the label text and auxiliary text should be close to the container itself, and the default spacing is 4px;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/4acbe5d3918a4a13bc9bbcec5be29b6c~tplv-uwbnlip3yd-image.image)

### Component status

There are 8 different states in the input box, namely: default state, focus state, selected state, completed state, disabled state, loaded state, successful state, and error state

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/81db9db9732a474cac67656f7c02944f~tplv-uwbnlip3yd-image.image)

## When to use

1. **When the input content has a high degree of freedom**: When the user input content is unpredictable or has a high degree of freedom (such as: collecting user suggestions), it is suitable to use the input box;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5de77e7782584288863aad01eb3d72bf~tplv-uwbnlip3yd-image.image)

2. **When direct input is simpler**: When direct input is more convenient and simple than using other data input components (such as: inputting the user's own birthday), it is suitable to use the input box;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b4b5b8e53d9e4a1fa047c2de2e8c5020~tplv-uwbnlip3yd-image.image)

3. **When the user wants to copy and paste**: When it is more convenient for users to input by copying and pasting (such as: express address information), it is suitable to use the input box;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/81a6a02068e84cf0afb580a4fbe8abac~tplv-uwbnlip3yd-image.image)

## When not to use

1. **When a specific data format needs to be input**: When the user is required to input data in a specific format (such as: date interval, consider using a date picker), the input box should not be used;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b5a1b04495a64c3ab0e2bd30ef9289b1~tplv-uwbnlip3yd-image.image)

2. **When the user has a heavy input burden**: When the user does not know what to input or the input has a heavy burden (such as: airport name, consider using the drop-down menu), the input box should not be used;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/59c99a8b00ea4f379645afb7e9916bb4~tplv-uwbnlip3yd-image.image)

3. **When there are limited options**: When the user needs to choose from the limited options (such as: gender, consider using the radio box), the input box should not be used;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c8133f3baf2e4dd1a3ddd5be23272da4~tplv-uwbnlip3yd-image.image)

## Layout

1. The label text position can be divided into left alignment, right alignment and top alignment depending on the overall page layout. It is recommended to adopt a unified layout within the same business;
2. There needs to be a clear separation space between the input box components to prevent the confusion of the upper and lower prompt information;

## Copywriting Guide

1. **Concise:** The text description should be as short as possible;
2. **Direct**: directly describe the information without adding decorative words;

## Interactive behavior

The input box will trigger different states according to the different interaction behaviors. For the specific state, please refer to the [Component State] module.

In addition to the default interaction behavior, in order to make the input behavior more smooth and efficient, the following interactions can be added as appropriate:

1. Auto-completion: By reducing the amount of typing, auto-completion can reduce the burden of user input and memory, and reduce errors;
2. Grammar Assistant: Through the function of automatically detecting and correcting grammar, it can reduce the occurrence of errors in the input process;
3. Field mask: Use appropriate field mask rules to control the data input format, help users focus on the input itself and find errors more easily (such as when entering a bank card number);
4. Keyboard adaptation (mobile terminal): When using the input box on the mobile terminal, provide an appropriate keyboard format according to the data type;

## Associated Components

[Form](/react/components/form)

[InputNumber](/react/components/input-number)

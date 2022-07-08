`````
Component / Data Display

# Comment

Display a comment.
`````

%%Content%%

## API

### Comment

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|align|Alignment of `datetime` and `actions`\|`"left" \\| "right" \\| { datetime?: "left" \\| "right"; actions?: "left" \\| "right"; }`|\| 'left'\| 'right'\| {datetime?: 'left' \| 'right';actions?: 'left' \| 'right';} |`-`|
|actions|List of action items rendered below the comment content|ReactNode |`-`|
|author|Display as the comment author|ReactNode |`-`|
|avatar|Display as the comment avatar|ReactNode |`-`|
|content|The content of the comment|ReactNode |`-`|
|datetime|Display as the comment datetime|ReactNode |`-`|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|

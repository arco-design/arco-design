`````
Component / Other

# Snake

A classic Snake game component with keyboard arrow key controls and pause support.
`````

%%Content%%

## API

### Snake

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|width|Number of columns|number |`20`|
|height|Number of rows|number |`20`|
|cellSize|Pixel size of each cell|number |`20`|
|speed|Speed of the snake in milliseconds per tick|number |`200`|
|onGameOver|Callback when the game is over|(score: number) => void |`-`|
|onScoreChange|Callback when the score changes|(score: number) => void |`-`|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|

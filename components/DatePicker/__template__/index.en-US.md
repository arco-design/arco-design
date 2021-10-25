---
file: interface
---

`````
Component / Data Entry

# DatePicker

Choose a date. Support year, month, week, day type, support range selection, etc.
`````

%%Content%%

## API

**picker are shared by all types**

%%Props%%

```js
type DisabledTimeProps = {
  disabledHours?: () => number[];
  disabledMinutes?: () => number[];
  disabledSeconds?: () => number[];
};
```

---
file: interface
---

`````
Component / General

# Typography

Used to display titles, paragraphs, and text content.
`````

%%Content%%

## API

%%Props%%

## About exceeding omission

Exceeding and omitting are currently implemented in two ways: **js dichotomy calculation truncation value** and **CSS exceeding and omitting**. The two advantages and disadvantages are as follows:

|Metrics|js Dichotomy|CSS Omit|
|---|---|---|
|Performance|Poor (multiple operations of dom calculation by dichotomy)|Good|
|Function|Good|Poor (string only)|

- By default, **js dichotomy** is used to continuously truncate the calculation to obtain the omitted critical value. At the same time, recalculation will be triggered multiple times when `resize`. Therefore, heavy use has a greater impact on performance, but this method will not insert additional style dom under the typesetting component.

- Enabling `ellipsis.cssEllipsis` will omit the display by **CSS style**, which will significantly improve the performance in a large number of usage scenarios. But because the `text-overflow` style needs to be added, two `<span/>` dom will be added under the `.arco-typography` node

**Note that the `2.36.0` version refactors and optimizes the excess omission, resulting in the main breaking changes as follows:**
- When `ellipsis.cssEllipsis` is enabled, an extra style dom is inserted under the typesetting component in order to add `text-overflow`, causing the dom structure to change.
- `ellipsis.cssEllipsis` supports multi-line elision scenarios, and the default value is changed from `true` to `false` (to avoid DOM structure changes after upgrade).

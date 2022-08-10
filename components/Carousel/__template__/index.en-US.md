---
file: interface
---

`````
Component / Data Display

# Carousel

Carousel is used to display multiple contents such as pictures, videos, or embedded frames on a rotating timer. It supports both automatic playback and manual switching.
`````

%%Content%%

## API

%%Props%%

## Common Problems

### Flashes after the animation ends

If the child element is transparent, there may be a flickering problem caused by browser rendering after the `Carousel` page is completed. At this time, you can try to add a background color to the child element to solve it. Refer to this [ISSUE](https://github.com/arco-design/arco-design/issues/97).

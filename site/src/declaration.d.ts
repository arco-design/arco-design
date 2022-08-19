declare module '*.svg' {
  const ReactComponent: any;

  export default ReactComponent;
}

declare module '*.png' {
  const src: any;

  export default src;
}

declare module '*.jpg' {
  const src: any;

  export default src;
}

declare module '*.less' {
  const classes: { [className: string]: string };
  export default classes;
}

declare module 'parallax-js';

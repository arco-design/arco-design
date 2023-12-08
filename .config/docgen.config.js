module.exports = (config) => {
  config.entry = process.env.DOC_ENTRY || config.entry;
  config.languages = ['zh-CN', 'en-US'];
  config.template = '__template__/index.[language].md';
  config.outputFileName = 'README.[language].md';
  config.tsParseTool = [
    'ts-document',
    {
      strictComment: true,
      linkFormatter: ({ typeName, jsDocTitle, fullPath }) => {
        const toId = (title) => {
          return title.toLowerCase().replace(/\W/g, '');
        };

        const toHyphen = (str) => {
          return str
            .replace(/^\w/, (g) => g.toLowerCase())
            .replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
        };
        if (!jsDocTitle) {
          return `#${toId(typeName)}`;
        }
        const componentName = (fullPath || '').match(/components\/([^/]*)/)?.[1];
        if (componentName) {
          return `${toHyphen(componentName)}#${toId(jsDocTitle)}`;
        }
      },
      propertySorter: ({ type: typeA, name: nameA }, { type: typeB, name: nameB }) => {
        const computeTypeLevel = (type) => {
          let level = 10;

          if (type === 'boolean') {
            level *= 1;
          } else if (type === 'number') {
            level *= 2;
          } else if (type === 'string') {
            level *= 3;
          } else if (/('[^']+'\|?)+/.test(type)) {
            // enum type like ['mini' | 'default' | 'large']
            level *= 4;
          } else if (/(^|\|\s*)(React\.)?ReactNode($|\s*\|)/.test(type)) {
            // type include ReactNode
            level *= 5;
          } else if (/\)\s*=>\s*/.test(type)) {
            // function type
            level *= 7;
          } else {
            level *= 6;
          }

          return level;
        };

        const typeLevelA = computeTypeLevel(typeA);
        const typeLevelB = computeTypeLevel(typeB);

        if (typeLevelA !== typeLevelB) {
          return typeLevelA - typeLevelB;
        }

        return nameA.toLowerCase() > nameB.toLowerCase() ? 1 : -1;
      },
    },
  ];
};

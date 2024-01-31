const area = {
  title: 'Area Chart',
  spec: {
    type: 'area',
    data: {
      values: [
        { type: 'Nail polish', country: 'Africa', value: 4229 },
        { type: 'Nail polish', country: 'EU', value: 4376 },
        { type: 'Nail polish', country: 'China', value: 3054 },
        { type: 'Nail polish', country: 'USA', value: 12814 },
        { type: 'Eyebrow pencil', country: 'Africa', value: 3932 },
        { type: 'Eyebrow pencil', country: 'EU', value: 3987 },
        { type: 'Eyebrow pencil', country: 'China', value: 5067 },
        { type: 'Eyebrow pencil', country: 'USA', value: 13012 },
        { type: 'Rouge', country: 'Africa', value: 5221 },
        { type: 'Rouge', country: 'EU', value: 3574 },
        { type: 'Rouge', country: 'China', value: 7004 },
        { type: 'Rouge', country: 'USA', value: 11624 },
        { type: 'Lipstick', country: 'Africa', value: 9256 },
        { type: 'Lipstick', country: 'EU', value: 4376 },
        { type: 'Lipstick', country: 'China', value: 9054 },
        { type: 'Lipstick', country: 'USA', value: 8814 },
        { type: 'Eyeshadows', country: 'Africa', value: 3308 },
        { type: 'Eyeshadows', country: 'EU', value: 4572 },
        { type: 'Eyeshadows', country: 'China', value: 12043 },
        { type: 'Eyeshadows', country: 'USA', value: 12998 },
        { type: 'Eyeliner', country: 'Africa', value: 5432 },
        { type: 'Eyeliner', country: 'EU', value: 3417 },
        { type: 'Eyeliner', country: 'China', value: 15067 },
        { type: 'Eyeliner', country: 'USA', value: 12321 },
        { type: 'Foundation', country: 'Africa', value: 13701 },
        { type: 'Foundation', country: 'EU', value: 5231 },
        { type: 'Foundation', country: 'China', value: 10119 },
        { type: 'Foundation', country: 'USA', value: 10342 },
        { type: 'Lip gloss', country: 'Africa', value: 4008 },
        { type: 'Lip gloss', country: 'EU', value: 4572 },
        { type: 'Lip gloss', country: 'China', value: 12043 },
        { type: 'Lip gloss', country: 'USA', value: 22998 },
        { type: 'Mascara', country: 'Africa', value: 18712 },
        { type: 'Mascara', country: 'EU', value: 6134 },
        { type: 'Mascara', country: 'China', value: 10419 },
        { type: 'Mascara', country: 'USA', value: 11261 },
      ],
    },
    title: {
      visible: true,
      text: 'Stacked area chart of cosmetic products sales',
      subtext: 'Stacked area chart of cosmetic products sales',
    },
    // stack: true,
    xField: 'type',
    yField: 'value',
    seriesField: 'country',
    legends: [{ visible: true, position: 'middle', orient: 'bottom' }],
    crosshair: {
      xField: { visible: true, label: { visible: true } },
      yField: { visible: true, label: { visible: true } },
    },
    axes: [
      { type: 'band', orient: 'bottom', title: { visible: true } },
      { type: 'linear', orient: 'left', title: { visible: true } },
    ],
  },
};

const column = {
  title: 'Bar Chart (Vertical)',
  spec: {
    type: 'bar',
    data: [
      {
        id: 'barData',
        values: [
          {
            State: 'WY',
            Age: 'Under 5 Years',
            Population: 25635,
          },
          {
            State: 'WY',
            Age: '5 to 13 Years',
            Population: 1890,
          },
          {
            State: 'WY',
            Age: '14 to 17 Years',
            Population: 9314,
          },
          {
            State: 'DC',
            Age: 'Under 5 Years',
            Population: 30352,
          },
          {
            State: 'DC',
            Age: '5 to 13 Years',
            Population: 20439,
          },
          {
            State: 'DC',
            Age: '14 to 17 Years',
            Population: 10225,
          },
          {
            State: 'VT',
            Age: 'Under 5 Years',
            Population: 38253,
          },
          {
            State: 'VT',
            Age: '5 to 13 Years',
            Population: 42538,
          },
          {
            State: 'VT',
            Age: '14 to 17 Years',
            Population: 15757,
          },
          {
            State: 'ND',
            Age: 'Under 5 Years',
            Population: 51896,
          },
          {
            State: 'ND',
            Age: '5 to 13 Years',
            Population: 67358,
          },
          {
            State: 'ND',
            Age: '14 to 17 Years',
            Population: 18794,
          },
          {
            State: 'AK',
            Age: 'Under 5 Years',
            Population: 72083,
          },
          {
            State: 'AK',
            Age: '5 to 13 Years',
            Population: 85640,
          },
          {
            State: 'AK',
            Age: '14 to 17 Years',
            Population: 22153,
          },
        ],
      },
    ],
    xField: 'State',
    yField: 'Population',
    seriesField: 'Age',
    stack: true,
    legends: {
      visible: true,
    },
    dataZoom: {
      orient: 'bottom',
    },
    animationEnter: false,
    animationExit: false,
  },
};

const pie = {
  title: 'Pie Chart',
  spec: {
    type: 'pie',
    data: [
      {
        id: 'id0',
        values: [
          { type: 'oxygen', value: '46.60' },
          { type: 'silicon', value: '27.72' },
          { type: 'aluminum', value: '8.13' },
          { type: 'iron', value: '5' },
          { type: 'calcium', value: '3.63' },
          { type: 'sodium', value: '2.83' },
          { type: 'potassium', value: '2.59' },
          { type: 'others', value: '3.5' },
        ],
      },
    ],
    valueField: 'value',
    categoryField: 'type',
    title: {
      visible: true,
      text: 'Statistics of Surface Element Content',
    },
    legends: {
      visible: true,
      orient: 'bottom',
      title: {
        visible: true,
        text: 'Elements',
      },
    },
    label: {
      visible: true,
    },
  },
};

const bar = {
  title: 'Bar Chart (Horizontal)',
  spec: {
    type: 'bar',
    direction: 'horizontal',
    data: [
      {
        id: 'barData',
        values: [
          { type: 'Autocracies', year: '1930', value: 129 },
          { type: 'Autocracies', year: '1940', value: 133 },
          { type: 'Autocracies', year: '1950', value: 130 },
          { type: 'Autocracies', year: '1960', value: 126 },
          { type: 'Autocracies', year: '1970', value: 117 },
          { type: 'Autocracies', year: '1980', value: 114 },
          { type: 'Autocracies', year: '1990', value: 111 },
          { type: 'Autocracies', year: '2000', value: 89 },
          { type: 'Autocracies', year: '2010', value: 80 },
          { type: 'Autocracies', year: '2018', value: 80 },
          { type: 'Democracies', year: '1930', value: 22 },
          { type: 'Democracies', year: '1940', value: 13 },
          { type: 'Democracies', year: '1950', value: 25 },
          { type: 'Democracies', year: '1960', value: 29 },
          { type: 'Democracies', year: '1970', value: 38 },
          { type: 'Democracies', year: '1980', value: 41 },
          { type: 'Democracies', year: '1990', value: 57 },
          { type: 'Democracies', year: '2000', value: 87 },
          { type: 'Democracies', year: '2010', value: 98 },
          { type: 'Democracies', year: '2018', value: 99 },
        ],
      },
    ],
    yField: ['year', 'type'],
    xField: 'value',
    seriesField: 'type',
    label: {
      visible: true,
    },
    legends: {
      visible: true,
      orient: 'right',
    },
    scrollBar: {
      start: 0,
      end: 0.5,
    },
  },
};

const rose = {
  title: 'Rose Chart',
  spec: {
    type: 'rose',
    data: {
      id: '0',
      values: [
        {
          time: '2:00',
          value: 27,
          type: 'Sales',
        },
        {
          time: '6:00',
          value: 25,
          type: 'Sales',
        },
        {
          time: '10:00',
          value: 18,
          type: 'Sales',
        },
        {
          time: '14:00',
          value: 15,
          type: 'Sales',
        },
        {
          time: '18:00',
          value: 10,
          type: 'Sales',
        },
        {
          time: '22:00',
          value: 5,
          type: 'Sales',
        },
        {
          time: '2:00',
          value: 7,
          type: 'Discount',
        },
        {
          time: '6:00',
          value: 5,
          type: 'Discount',
        },
        {
          time: '10:00',
          value: 38,
          type: 'Discount',
        },
        {
          time: '14:00',
          value: 5,
          type: 'Discount',
        },
        {
          time: '18:00',
          value: 20,
          type: 'Discount',
        },
        {
          time: '22:00',
          value: 15,
          type: 'Discount',
        },
      ],
    },
    categoryField: ['time', 'type'],
    valueField: 'value',
    seriesField: 'type',
    outerRadius: 0.8,
    axes: [
      {
        orient: 'angle',
        domainLine: { visible: true },
        grid: { visible: true },
        label: {
          visible: true,
        },
      },
      {
        orient: 'radius',
        grid: { visible: true, smooth: true },
        label: {
          visible: true,
        },
      },
    ],
    crosshair: {
      categoryField: {
        visible: true,
        line: {
          type: 'rect',
        },
        /*
        label: {
          visible: true
        }
        */
      },
      valueField: {
        visible: true,
        line: {
          type: 'line',
          smooth: true,
        },
        /*
        label: {
          visible: true
        }
        */
      },
    },
    legends: {
      visible: true,
      // orient: 'left',
    },
  },
};

const gauge = {
  title: 'Gauge Chart',
  spec: {
    type: 'gauge',
    data: [
      {
        id: 'pointer',
        values: [
          {
            type: 'A',
            value: 0.6,
          },
        ],
      },
      {
        id: 'segment',
        values: [
          {
            type: 'Level 1',
            value: 0.4,
          },
          {
            type: 'Level 2',
            value: 0.6,
          },
          {
            type: 'Level 3',
            value: 0.8,
          },
        ],
      },
    ],
    gauge: {
      type: 'gauge',
      dataIndex: 1,
      categoryField: 'type',
      valueField: 'value',
      seriesField: 'type',
      label: {
        visible: true,
        position: 'inside-outer',
        offsetRadius: 10,
        style: {
          text: (datum) => datum.type,
        },
      },
    },
    pointer: {
      style: {
        fill: '#666666',
      },
    },
    categoryField: 'type',
    valueField: 'value',
    outerRadius: 0.9,
    innerRadius: 0.6,
    startAngle: -225,
    endAngle: 45,
    axes: [
      {
        type: 'linear',
        orient: 'angle',
        inside: true,
        outerRadius: 0.9,
        innerRadius: 0.6,
        grid: { visible: false },
      },
    ],
    indicator: [
      {
        visible: true,
        offsetY: '65%',
        title: {
          style: {
            text: '60%',
          },
        },
        content: [
          {
            style: {
              text: 'Level 2',
            },
          },
        ],
      },
    ],
  },
};

export default [area, column, pie, bar, rose, gauge];

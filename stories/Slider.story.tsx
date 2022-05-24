import React, { useState } from 'react';
import { Slider, Switch, Form, Typography, SliderProps } from '@self';

const defaultConfig: SliderProps = {
  showTicks: false,
  showInput: false,
  onlyMarkValue: false,
  reverse: false,
};

const marks = {
  0: '0km',
  0.3: '0.3',
  0.8: '0.8',
};

function DemoSlider() {
  const [config, setConfig] = useState<SliderProps>(defaultConfig);

  return (
    <div style={{ width: 600 }}>
      <Form
        style={{ margin: '20px' }}
        layout="inline"
        onValuesChange={(_, values) => {
          setConfig(values);
        }}
      >
        {Object.keys(defaultConfig).map((key) => (
          <Form.Item
            label={key}
            field={key}
            triggerPropName="checked"
            key={key}
            initialValue={config[key as keyof SliderProps]}
          >
            <Switch />
          </Form.Item>
        ))}
      </Form>

      <div style={{ marginBottom: 20 }}>
        <Typography.Text bold>分段区间-滑动输入条</Typography.Text>
        <Slider
          {...config}
          max={1}
          defaultValue={0}
          marks={marks}
          range
          getIntervalConfig={([begin, end]) => {
            const interval = `${begin}~${end}`;
            switch (interval) {
              case `0~10`: {
                return { width: '50%' };
              }
              default:
                return { step: (end - begin) / 5 };
            }
          }}
        />
      </div>
      <Slider max={1} min={0} step={0.1} range marks={marks} showTicks />
      <Slider max={6} min={0} range marks={{ 0: '0', 1.5: '1.5', 3: '3' }} showTicks />
    </div>
  );
}

export const Demo = () => <DemoSlider />;

export default {
  title: 'Slider',
};

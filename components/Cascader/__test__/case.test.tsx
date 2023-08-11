import React from 'react';
import Cascader from '../cascader';
import { fireEvent, render } from '../../../tests/util';
import { Backspace } from '../../_util/keycode';

const options = [
  {
    value: 'shanghai',
    label: '上海',
    children: [
      {
        value: 'shanghaishi',
        label: '上海市',
      },
    ],
  },
];

describe('Cascader basic test', () => {
  // 生命周期
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    // 运行所有定时器
    jest.runAllTimers();
  });

  it('string[] correctly', () => {
    const wrapper = render(
      <Cascader defaultValue={['shanghai', 'shanghaishi']} options={options} mode="multiple" />
    );

    expect(wrapper.querySelector('.arco-tag-content')?.textContent).toBe('');
  });

  it('string[][] correctly', () => {
    const wrapper = render(
      <Cascader
        defaultValue={[['shanghai', 'shanghaishi'], 'xxx']}
        options={options}
        mode="multiple"
      />
    );

    expect(wrapper.querySelectorAll('.arco-tag-content').item(1)?.textContent).toBe('');
  });

  it('checked & unchecked correctly', () => {
    const options = [
      {
        value: 'Beijing',
        label: 'Beijing',
        children: [
          {
            value: 'dongcheng',
            label: 'Dongcheng',
            disabled: true,
            children: [
              {
                value: 'chaoyangmen',
                label: 'Chaoyangmen',
              },
              {
                value: 'jianguo',
                label: 'Jianguomen',
              },
            ],
          },
          {
            value: 'xicheng',
            label: 'Xicheng',
          },
        ],
      },
    ];
    const wrapper = render(<Cascader options={options} mode="multiple" />);

    fireEvent.click(wrapper.find('.arco-cascader')[0]);
    expect(wrapper.find(`.arco-cascader-list-column`)).toHaveLength(1);
    fireEvent.click(wrapper.find('.arco-checkbox')[0]);
    expect(wrapper.find('.arco-checkbox')[0]).toHaveClass('arco-checkbox-indeterminate');
    fireEvent.click(wrapper.find('.arco-checkbox')[0]);
    expect(wrapper.find('.arco-checkbox')[0].className).toBe('arco-checkbox');
  });

  it('halfchecked correctly', () => {
    const options = [
      {
        value: 'beijing',
        label: 'Beijing',
        children: [
          {
            value: 'dongcheng',
            label: 'Dongcheng',
            disabled: true,
            children: [
              {
                value: 'chaoyangmen',
                label: 'Chaoyangmen',
              },
              {
                value: 'jianguo',
                label: 'Jianguomen',
              },
            ],
          },
          {
            value: 'xicheng',
            label: 'Xicheng',
          },
        ],
      },
    ];
    const wrapper = render(
      <Cascader
        defaultValue={[['beijing', 'dongcheng', 'chaoyangmen']]}
        options={options}
        mode="multiple"
      />
    );

    fireEvent.click(wrapper.find('.arco-cascader')[0]);
    expect(wrapper.find('.arco-checkbox')[0]).toHaveClass('arco-checkbox-indeterminate');
    expect(wrapper.find('[title="Dongcheng"] .arco-checkbox')[0]).toHaveClass(
      'arco-checkbox-indeterminate'
    );

    fireEvent.click(wrapper.find('.arco-checkbox')[0]);
    expect(wrapper.find('.arco-checkbox')[0]).toHaveClass('arco-checkbox-indeterminate');
    expect(wrapper.find('[title="Xicheng"] .arco-checkbox')[0]).toHaveClass(
      'arco-checkbox-checked'
    );

    fireEvent.click(wrapper.find('.arco-checkbox')[0]);
    expect(wrapper.find('.arco-checkbox')[0]).toHaveClass('arco-checkbox-indeterminate');
    expect(wrapper.find('[title="Dongcheng"] .arco-checkbox')[0]).toHaveClass(
      'arco-checkbox-indeterminate'
    );
    expect(wrapper.find('[title="Xicheng"] .arco-checkbox')[0].className).toBe('arco-checkbox');
  });

  it('checked & halfchecked correctly', () => {
    const options = [
      {
        value: 'beijing',
        label: 'Beijing',
        children: [
          {
            value: 'dongcheng',
            label: 'Dongcheng',
            disabled: true,
            children: [
              {
                value: 'chaoyangmen',
                label: 'Chaoyangmen',
              },
              {
                value: 'jianguo',
                label: 'Jianguomen',
              },
            ],
          },
          {
            value: 'xicheng',
            label: 'Xicheng',
          },
        ],
      },
    ];
    const wrapper = render(
      <Cascader
        defaultValue={[
          ['beijing', 'dongcheng', 'chaoyangmen'],
          ['beijing', 'dongcheng', 'jianguo'],
        ]}
        options={options}
        mode="multiple"
      />
    );

    fireEvent.click(wrapper.find('.arco-cascader')[0]);
    expect(wrapper.find('.arco-checkbox')[0]).toHaveClass('arco-checkbox-indeterminate');
    expect(wrapper.find('[title="Dongcheng"] .arco-checkbox')[0]).toHaveClass(
      'arco-checkbox-checked'
    );

    fireEvent.click(wrapper.find('.arco-checkbox')[0]);
    expect(wrapper.find('.arco-checkbox')[0]).toHaveClass('arco-checkbox-checked');
    expect(wrapper.find('[title="Xicheng"] .arco-checkbox')[0]).toHaveClass(
      'arco-checkbox-checked'
    );

    fireEvent.click(wrapper.find('.arco-checkbox')[0]);
    expect(wrapper.find('.arco-checkbox')[0]).toHaveClass('arco-checkbox-indeterminate');
    expect(wrapper.find('[title="Dongcheng"] .arco-checkbox')[0]).toHaveClass(
      'arco-checkbox-checked'
    );
    expect(wrapper.find('[title="Xicheng"] .arco-checkbox')[0].className).toBe('arco-checkbox');
  });

  it('changeonselect ', () => {
    const wrapper = render(<Cascader changeOnSelect options={options} mode="multiple" />);

    fireEvent.click(wrapper.find('.arco-cascader')[0]);
    fireEvent.click(wrapper.find('.arco-cascader-list-item-label')[0]);
    expect(wrapper.find('.arco-checkbox')).toHaveLength(2);
    fireEvent.click(wrapper.find('.arco-checkbox')[1]);

    expect(wrapper.find('.arco-tag')).toHaveLength(1);

    fireEvent.click(wrapper.find('.arco-checkbox')[0]);

    expect(wrapper.find('.arco-tag')).toHaveLength(2);
  });

  it('delete by Del ', () => {
    const wrapper = render(
      <Cascader
        options={options}
        defaultValue={[
          ['beijing', 'dongcheng', 'chaoyangmen'],
          ['beijing', 'dongcheng', 'jianguo'],
        ]}
        mode="multiple"
        showSearch
      />
    );

    fireEvent.click(wrapper.find('.arco-cascader')[0]);

    fireEvent.keyDown(wrapper.find('input')[0], {
      keyCode: Backspace.code,
    });

    jest.runAllTimers();

    expect(wrapper.find('.arco-tag')).toHaveLength(1);
  });

  it('dragToSort controlled', () => {
    const defaultValue = [
      ['shanghai', 'shanghai'],
      ['beijing', 'beijing'],
    ];
    let value: string[][] = defaultValue;
    const wrapper = render(
      <Cascader
        dragToSort
        value={value}
        onChange={(v) => (value = v as string[][])}
        options={[
          {
            value: 'shanghai',
            label: 'Shanghai',
            children: [
              {
                value: 'shanghai',
                label: 'Shanghai',
              },
            ],
          },
          {
            value: 'beijing',
            label: 'Beijing',
            children: [
              {
                value: 'beijing',
                label: 'Beijing',
              },
            ],
          },
        ]}
        mode="multiple"
      />
    );

    expect(wrapper.querySelectorAll('.arco-tag')).toHaveLength(2);
    expect(wrapper.querySelector('.arco-tag-content')?.textContent).toBe('Shanghai / Shanghai');

    const tags = wrapper.querySelectorAll('.arco-draggable-item');

    fireEvent.drag(tags[1]);
    fireEvent.dragStart(tags[1]);
    fireEvent.dragOver(tags[0], {
      pageX: 0,
    });

    fireEvent.drop(tags[0]);
    expect(value).toEqual(defaultValue.reverse());
  });

  it('dragToSort uncontrolled', () => {
    let value: string[][] = [];
    const defaultValue = [
      ['shanghai', 'shanghai'],
      ['beijing', 'beijing'],
    ];
    const wrapper = render(
      <Cascader
        dragToSort
        defaultValue={defaultValue}
        onChange={(v) => (value = v as string[][])}
        options={[
          {
            value: 'shanghai',
            label: 'Shanghai',
            children: [
              {
                value: 'shanghai',
                label: 'Shanghai',
              },
            ],
          },
          {
            value: 'beijing',
            label: 'Beijing',
            children: [
              {
                value: 'beijing',
                label: 'Beijing',
              },
            ],
          },
        ]}
        mode="multiple"
      />
    );

    expect(wrapper.querySelectorAll('.arco-tag')).toHaveLength(2);
    const tags = wrapper.querySelectorAll('.arco-draggable-item');

    fireEvent.drag(tags[1]);
    fireEvent.dragStart(tags[1]);
    fireEvent.dragOver(tags[0], {
      pageX: 0,
    });

    fireEvent.drop(tags[0]);
    expect(value).toEqual(defaultValue.reverse());
    expect(wrapper.querySelector('.arco-tag-content')?.textContent).toBe('Beijing / Beijing');
  });
});

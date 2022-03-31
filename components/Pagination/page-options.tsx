import React, { useRef, useContext } from 'react';
import Select from '../Select';
import { ConfigContext } from '../ConfigProvider';
import { SelectProps } from '../Select/interface';

const noop = () => {};
const Option = Select.Option;
const _SizeOptions = [10, 20, 30, 40, 50];

export interface PageOptionProps {
  disabled?: boolean;
  rootPrefixCls?: string;
  sizeCanChange?: boolean;
  sizeOptions?: number[];
  onPageSizeChange?: (value) => void;
  pageSize?: number;
  size?: 'mini' | 'small' | 'default' | 'large';
  selectProps?: Partial<SelectProps>;
}

function PageOption(props: PageOptionProps) {
  const selectRef = useRef();
  const { locale } = useContext(ConfigContext);
  const {
    sizeCanChange = false,
    onPageSizeChange = noop,
    rootPrefixCls,
    sizeOptions = _SizeOptions,
    pageSize = 10,
    size,
    selectProps,
    disabled,
  } = props;

  return (
    sizeCanChange && (
      <div
        ref={selectRef}
        className={`${rootPrefixCls}-option`}
        aria-label={locale.Pagination.pageSize}
      >
        <Select
          value={sizeOptions.indexOf(pageSize) !== -1 ? pageSize : sizeOptions[0]}
          onChange={(value) => {
            onPageSizeChange(value);
          }}
          size={size}
          getPopupContainer={() => selectRef.current}
          disabled={disabled}
          {...selectProps}
        >
          {sizeOptions.map((num) => {
            return (
              <Option key={num} value={num}>
                {`${num} ${locale.Pagination.countPerPage}`}
              </Option>
            );
          })}
        </Select>
      </div>
    )
  );
}

export default PageOption;

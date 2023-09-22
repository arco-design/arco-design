import React, { useContext } from 'react';
import { RefInputType, InputSearchProps } from './interface';
import cs from '../_util/classNames';
import Input, { formatValue } from './input';
import Button from '../Button';
import IconSearch from '../../icon/react-icon/IconSearch';
import omit from '../_util/omit';
import { ConfigContext } from '../ConfigProvider';
import useMergeValue from '../_util/hooks/useMergeValue';
import IconLoading from '../../icon/react-icon/IconLoading';
import { isObject } from '../_util/is';

const Search = React.forwardRef<RefInputType, InputSearchProps>((props: InputSearchProps, ref) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const { className, style, placeholder, disabled, searchButton, loading, defaultValue, ...rest } =
    props;

  const trueMaxLength = isObject(props.maxLength) ? props.maxLength.length : props.maxLength;
  const mergedMaxLength =
    isObject(props.maxLength) && props.maxLength.errorOnly ? undefined : trueMaxLength;

  const [value, setValue] = useMergeValue('', {
    defaultValue:
      'defaultValue' in props ? formatValue(props.defaultValue, mergedMaxLength) : undefined,
    value: 'value' in props ? formatValue(props.value, mergedMaxLength) : undefined,
  });

  const prefixCls = getPrefixCls('input-search');
  const classNames = cs(
    prefixCls,
    {
      [`${prefixCls}-button`]: searchButton,
    },
    className
  );

  const onSearch = () => {
    !disabled && props.onSearch && props.onSearch(value);
  };

  return (
    <Input
      {...omit(rest, ['onSearch'])}
      disabled={disabled}
      className={classNames}
      style={style}
      ref={ref}
      placeholder={placeholder}
      addAfter={
        searchButton ? (
          <Button
            disabled={disabled}
            size={rest.size}
            className={`${prefixCls}-btn`}
            type="primary"
            onClick={onSearch}
            loading={loading}
            loadingFixedWidth
            icon={searchButton === true && !loading && <IconSearch />}
          >
            {searchButton !== true && searchButton}
          </Button>
        ) : null
      }
      suffix={!searchButton && (loading ? <IconLoading /> : <IconSearch onClick={onSearch} />)}
      onChange={(value, e) => {
        setValue(value);
        props.onChange && props.onChange(value, e);
      }}
      defaultValue={defaultValue}
      onPressEnter={(e) => {
        onSearch();
        props.onPressEnter && props.onPressEnter(e);
      }}
    />
  );
});

Search.displayName = 'Search';

export default Search;

export { InputSearchProps };

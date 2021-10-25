import { renderHook, act } from '@testing-library/react-hooks';
import { useState, SetStateAction, Dispatch } from 'react';
import useCheckbox from '../useCheckbox';

const defaultOptions = [...Array(10)].map((_, i) => i);

const Demo = () => {
  const [options, setOptions] = useState(defaultOptions);
  const result = useCheckbox(options, [1, 2]);

  return [result, setOptions];
};

const getCheckbox = (result) => {
  return result.current[0];
};

describe('Checkbox useCheckbox', () => {
  it('defaultSelected', () => {
    const { result } = renderHook(() => Demo());
    expect(getCheckbox(result).selected).toEqual([1, 2]);
  });

  it('setSelected', () => {
    const { result } = renderHook(() => Demo());
    expect(getCheckbox(result).selected).toEqual([1, 2]);
    act(() => getCheckbox(result).setSelected([2, 3, 4, 5]));
    expect(getCheckbox(result).selected).toEqual([2, 3, 4, 5]);
  });

  it('setValueSelected', () => {
    const { result } = renderHook(() => Demo());
    act(() => getCheckbox(result).setValueSelected([2, 3, 7], true));
    expect(getCheckbox(result).selected).toEqual([1, 2, 3, 7]);

    act(() => getCheckbox(result).setValueSelected([2, 9], false));
    expect(getCheckbox(result).selected).toEqual([1, 3, 7]);
  });

  it('selectAll & unSelectAll', () => {
    const { result } = renderHook(() => Demo());
    act(() => getCheckbox(result).selectAll());
    expect(getCheckbox(result).selected).toEqual(defaultOptions);

    act(() => getCheckbox(result).unSelectAll());
    expect(getCheckbox(result).selected).toEqual([]);
  });

  it('isSelected', () => {
    const { result } = renderHook(() => Demo());

    expect(getCheckbox(result).isSelected(1)).toEqual(true);
    expect(getCheckbox(result).isSelected(4)).toEqual(false);
    act(() => getCheckbox(result).setValueSelected([4], true));
    expect(getCheckbox(result).isSelected(4)).toEqual(true);
  });

  it('toggle', () => {
    const { result } = renderHook(() => Demo());

    expect(getCheckbox(result).isSelected(1)).toEqual(true);
    act(() => getCheckbox(result).toggle([4, 1]));
    expect(getCheckbox(result).selected).toEqual([2, 4]);

    act(() => getCheckbox(result).toggle(2));

    expect(getCheckbox(result).selected).toEqual([4]);
    act(() => getCheckbox(result).toggle());
    expect(getCheckbox(result).selected).toEqual(defaultOptions.filter((x) => x !== 4));
  });

  it('isAllSelected & isPartialSelected', () => {
    const { result } = renderHook(() => Demo());

    expect(getCheckbox(result).selected).toEqual([1, 2]);
    expect(getCheckbox(result).isAllSelected()).toBe(false);
    expect(getCheckbox(result).isPartialSelected()).toBe(true);

    act(() => getCheckbox(result).unSelectAll());
    expect(getCheckbox(result).isAllSelected()).toBe(false);
    expect(getCheckbox(result).isPartialSelected()).toBe(false);

    act(() => getCheckbox(result).selectAll());
    expect(getCheckbox(result).isAllSelected()).toBe(true);
    expect(getCheckbox(result).isPartialSelected()).toBe(false);
  });

  it('options change', () => {
    const { result } = renderHook(() => Demo());
    const setOptions = result.current[1] as Dispatch<SetStateAction<number[]>>;

    expect(getCheckbox(result).selected).toEqual([1, 2]);
    act(() => {
      setOptions([3, 4, 5]);
    });

    expect(getCheckbox(result).selected).toEqual([1, 2]);
    act(() => getCheckbox(result).selectAll());
    expect(getCheckbox(result).selected).toEqual([3, 4, 5]);
  });
});

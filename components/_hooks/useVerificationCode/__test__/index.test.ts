import { renderHook } from '@testing-library/react-hooks';
import useVerificationCode from '..';

describe('useVerificationCode', () => {
  it('basic', () => {
    const defaultValue = '123456';
    const data = renderHook(() => {
      return useVerificationCode({ defaultValue });
    });

    expect(data.result.current.filledValue).toEqual(defaultValue.split(''));
  });
});

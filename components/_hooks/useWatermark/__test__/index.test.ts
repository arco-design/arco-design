import { renderHook } from '@testing-library/react-hooks';
import { sleep } from '../../../../tests/util';
import useWatermark from '..';

describe('useWatermark', () => {
  it('basic', async () => {
    renderHook(() => {
      return useWatermark({ content: 'Arco', getContainer: () => document.body });
    });

    await sleep(5);

    expect(document.body.children).toHaveLength(1);
  });
});

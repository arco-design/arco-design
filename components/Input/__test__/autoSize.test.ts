import autoSizeTextAreaHeight from '../autoSizeTextAreaHeight';

describe('Input autoSizeText', () => {
  it('TODO', () => {
    const textarea = document.createElement('textarea');
    const style = autoSizeTextAreaHeight(true, textarea);
    expect(style.height).toBe(2);
  });

  it('TODO', () => {
    const textarea = document.createElement('textarea');
    const style = autoSizeTextAreaHeight(
      {
        minRows: 2,
        maxRows: 4,
      },
      textarea
    );
    expect(style.height).toBe(2);
  });
});

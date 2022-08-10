export function getDateCell(component, panelIndex, cellIndex): Element {
  return component
    .querySelectorAll('.arco-picker-body')
    .item(panelIndex)
    .querySelectorAll('.arco-picker-cell')
    .item(cellIndex);
}

export function getInput(component, index): Element {
  return component.querySelectorAll('.arco-picker-input input').item(index);
}

function getSelectedTime(component, index) {
  return component
    .querySelectorAll('.arco-timepicker-list')
    .item(index)
    .querySelector('.arco-timepicker-cell-selected').textContent;
}

export function checkTime(component, hour, minute, second) {
  expect(getSelectedTime(component, 0)).toBe(hour);
  expect(getSelectedTime(component, 1)).toBe(minute);
  expect(getSelectedTime(component, 2)).toBe(second);
}

function getSelectedRangeTime(component, dateIndex, index) {
  return component
    .querySelectorAll('.arco-panel-date')
    .item(dateIndex)
    .querySelectorAll('.arco-timepicker-list')
    .item(index)
    .querySelector('.arco-timepicker-cell-selected').textContent;
}

export function checkRangeTime(component, dateIndex, hour, minute, second) {
  expect(getSelectedRangeTime(component, dateIndex, 0)).toBe(hour);
  expect(getSelectedRangeTime(component, dateIndex, 1)).toBe(minute);
  expect(getSelectedRangeTime(component, dateIndex, 2)).toBe(second);
}

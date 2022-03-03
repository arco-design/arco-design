export function getDateCell(component, panelIndex, cellIndex) {
  return component.find('.arco-picker-body').at(panelIndex).find('.arco-picker-cell').at(cellIndex);
}

export function getInput(component, index) {
  return component.find('input').at(index);
}

function getSelectedTime(component, index) {
  return component
    .find('.arco-timepicker-list')
    .at(index)
    .find('.arco-timepicker-cell-selected')
    .text();
}

export function checkTime(component, hour, minute, second) {
  expect(getSelectedTime(component, 0)).toBe(hour);
  expect(getSelectedTime(component, 1)).toBe(minute);
  expect(getSelectedTime(component, 2)).toBe(second);
}

function getSelectedRangeTime(component, dateIndex, index) {
  return component
    .find('.arco-panel-date')
    .at(dateIndex)
    .find('.arco-timepicker-list')
    .at(index)
    .find('.arco-timepicker-cell-selected')
    .text();
}

export function checkRangeTime(component, dateIndex, hour, minute, second) {
  expect(getSelectedRangeTime(component, dateIndex, 0)).toBe(hour);
  expect(getSelectedRangeTime(component, dateIndex, 1)).toBe(minute);
  expect(getSelectedRangeTime(component, dateIndex, 2)).toBe(second);
}

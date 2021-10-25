export function getDateCell(component, panelIndex, cellIndex) {
  return component
    .find('.arco-picker-body')
    .at(panelIndex)
    .find('.arco-picker-cell')
    .at(cellIndex);
}

export function getInput(component, index) {
  return component.find('input').at(index);
}

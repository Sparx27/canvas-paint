import { canvasSettings, setLineWidth } from './canvasSettings'
import { $ } from './utilities'

const $inputLineWidth = $('#lineWidth')
$inputLineWidth.value = canvasSettings.lineWidth

function handleChnge(e) {
  let value = Number(e.target.value)
  if (value <= 0 || isNaN(value)) value = 1
  setLineWidth(value)
  e.target.value = value
}
$inputLineWidth.addEventListener('change', handleChnge)

export {
  $inputLineWidth
}

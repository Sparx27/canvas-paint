import { ctx } from './canvas'

const canvasSettings = {
  lineWidth: 1,
  fillStyle: 'black',
  strokeStyle: 'black',
  globalCompositeOperation: 'sourse-over'
}

const setLineWidth = (value) => {
  let toSet = value
  if (toSet <= 0 || isNaN(toSet)) toSet = 1
  ctx.lineWidth = toSet
  canvasSettings.lineWidth = toSet
}

const setFillStyle = (value) => {
  ctx.fillStyle = value
  canvasSettings.fillStyle = value
}

const setStrokeStyle = (value) => {
  ctx.strokeStyle = value
  canvasSettings.strokeStyle = value
}

const setGlobalCompositeOperation = (value) => {
  ctx.globalCompositeOperation = value
  canvasSettings.globalCompositeOperation = value
}

export {
  canvasSettings,
  setLineWidth,
  setFillStyle,
  setStrokeStyle,
  setGlobalCompositeOperation
}

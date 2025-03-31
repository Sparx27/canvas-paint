import { getPrevImageData, refreshPrevImageData } from './canvasStorage'
import { canvasSettings, setFillStyle, setGlobalCompositeOperation, setLineWidth, setStrokeStyle } from './canvasSettings'
import { Drawer } from './Drawer'
import { $ } from './utilities'

// GET CANVAS AN SET SIZE
const $canvas = $('#canvas')
const $parentCanvas = $canvas.parentElement

$canvas.width = $parentCanvas.clientWidth - 30
$canvas.height = $parentCanvas.clientHeight - 30

function reziseCanvas() {
  $canvas.width = $parentCanvas.clientWidth - 30
  $canvas.height = $parentCanvas.clientHeight - 30
}

window.addEventListener('resize', reziseCanvas)

// GET CANVAS CONTEXT AND EVENTS
const ctx = $canvas.getContext('2d', { willReadFrequently: true })
const drawer = new Drawer(ctx)
let isDrawing = false
refreshPrevImageData()

function beginDraw(e) {
  isDrawing = true
  drawer.setLastPosition(e.offsetX, e.offsetY)
  if (drawer.mode === 'erase') {
    ctx.putImageData(getPrevImageData(), 0, 0)
    return
  }
  if (drawer.mode !== 'erase') {
    refreshPrevImageData()
  }
}

function stopDraw() {
  isDrawing = false
  // refreshPrevImageData()
}

function draw(e) {
  if (isDrawing) {
    if (drawer.mode === 'rectangle' || drawer.mode === 'ellipse') {
      ctx.putImageData(getPrevImageData(), 0, 0)
    }
    drawer.draw(e.offsetX, e.offsetY)
  }
}

function drawOne(e) {
  drawer.draw(e.offsetX, e.offsetY)
  refreshPrevImageData()
  drawPreview(e)
}

function handleMouseLeave(e) {
  if (e.buttons === 1) {
    if (drawer.mode !== 'rectangle' && drawer.mode !== 'ellipse') {
      drawer.setLastPosition(e.offsetX, e.offsetY)
      refreshPrevImageData()
    }
  } else {
    ctx.putImageData(getPrevImageData(), 0, 0)
    isDrawing = false
  }
}

function handleMouseEnter(e) {
  if (e.buttons === 1) {
    isDrawing = true
    if (drawer.mode === 'rectangle' || drawer.mode === 'ellipse') {
      ctx.putImageData(getPrevImageData(), 0, 0)
      return
    }

    if (drawer.mode !== 'rectangle' && drawer.mode !== 'ellipse') {
      drawer.setLastPosition(e.offsetX, e.offsetY)
      drawer.draw(e.offsetX, e.offsetY)
    }
  } else {
    refreshPrevImageData()
    isDrawing = false
  }
}

$canvas.addEventListener('mousedown', beginDraw)
$canvas.addEventListener('mouseup', stopDraw)
$canvas.addEventListener('mousemove', draw)
$canvas.addEventListener('click', drawOne)
$canvas.addEventListener('mouseleave', handleMouseLeave)
$canvas.addEventListener('mouseenter', handleMouseEnter)

// GET CANVAS MODES PREVIEW
function drawPreview(e) {
  if (e.buttons === 1) return
  if (drawer.mode === 'rectangle' || drawer.mode === 'ellipse') return
  ctx.putImageData(getPrevImageData(), 0, 0)

  // Prev configrations
  const { lineWidth, fillStyle, strokeStyle, globalCompositeOperation } = canvasSettings

  ctx.globalCompositeOperation = 'source-over'

  if (drawer.mode === 'pencil') {
    ctx.beginPath()
    ctx.arc(e.offsetX, e.offsetY, canvasSettings.lineWidth / 2, 0, Math.PI * 2)
    ctx.fill()
  } else if (drawer.mode === 'erase') {
    ctx.lineWidth = 1
    ctx.fillStyle = 'white'

    ctx.beginPath()
    const cordX = e.offsetX - canvasSettings.lineWidth / 2
    const cordY = e.offsetY - canvasSettings.lineWidth / 2
    ctx.rect(cordX, cordY, canvasSettings.lineWidth, canvasSettings.lineWidth)
    ctx.fill()
    ctx.stroke()
  }

  setFillStyle(fillStyle)
  setStrokeStyle(strokeStyle)
  setLineWidth(lineWidth)
  setGlobalCompositeOperation(globalCompositeOperation)
}

$canvas.addEventListener('mousemove', drawPreview)

export {
  $canvas,
  ctx
}

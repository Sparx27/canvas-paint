import { canvasSettings, setGlobalCompositeOperation } from './canvasSettings'

class Drawer {
  static instance = null

  static #modes = {
    PRENCIL: 'pencil',
    ERASE: 'erase',
    RECTANGLE: 'rectangle',
    ELLIPSE: 'ellipse'
  }

  constructor(ctx) {
    if (this.instance) return this.instance
    if (!ctx || ctx.constructor.name !== 'CanvasRenderingContext2D') throw new Error('Wrong context or missing')

    this.ctx = ctx
    this.mode = Drawer.#modes.PRENCIL
    this.lastX = 0
    this.lastY = 0
    Drawer.instance = this
  }

  static getModes() {
    return this.#modes
  }

  setMode(mode) {
    this.mode = mode

    if (mode === 'pencil' || mode === 'rectangle' || mode === 'ellipse') {
      setGlobalCompositeOperation('source-over')
      return
    }

    if (mode === 'erase') {
      setGlobalCompositeOperation('destination-out')
    }
  }

  setLastPosition(x, y) {
    [this.lastX, this.lastY] = [x, y]
  }

  draw(x, y) {
    switch (this.mode) {
      case 'pencil': {
        this.ctx.beginPath()
        this.ctx.arc(x, y, canvasSettings.lineWidth / 2, 0, Math.PI * 2)
        this.ctx.fill()

        this.ctx.beginPath()
        this.ctx.moveTo(this.lastX, this.lastY)
        this.ctx.lineTo(x, y)
        this.ctx.stroke()

        this.setLastPosition(x, y)
        break
      }

      case 'erase': {
        const cordX = x - (canvasSettings.lineWidth + 2) / 2
        const cordY = y - (canvasSettings.lineWidth + 2) / 2
        this.ctx.clearRect(cordX, cordY, canvasSettings.lineWidth + 2, canvasSettings.lineWidth + 2)
        this.setLastPosition(x, y)
        break
      }

      case 'rectangle': {
        this.ctx.beginPath()
        this.ctx.strokeRect(this.lastX, this.lastY, x - this.lastX, y - this.lastY)
        break
      }

      case 'ellipse': {
        const centerX = (this.lastX + x) / 2
        const centerY = (this.lastY + y) / 2
        const radiusX = Math.abs((this.lastX - x) / 2)
        const radiusY = Math.abs((this.lastY - y) / 2)

        this.ctx.beginPath()
        this.ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2)
        this.ctx.stroke()
        break
      }
    }
  }
}

export {
  Drawer
}

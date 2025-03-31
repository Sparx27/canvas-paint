import { $canvas, ctx } from './canvas'

const prevImagesData = []

const refreshPrevImageData = () => {
  console.log('refresh')
  const imageData = ctx.getImageData(0, 0, $canvas.width, $canvas.height)
  prevImagesData[0] = imageData
}

const getPrevImageData = (erase = false) => {
  if (erase) {
    return prevImagesData.shift()
  }
  return prevImagesData[0]
}

const prevDraws = []

const setPrevDraw = () => {
  const prevDraw = ctx.getImageData(0, 0, $canvas.width, $canvas.height)
  prevDraws.unshift(prevDraw)
}

const getPrevDraw = () => {
  return prevDraws[0]
}

export {
  prevImagesData,
  refreshPrevImageData,
  getPrevImageData,
  prevDraws,
  setPrevDraw,
  getPrevDraw
}

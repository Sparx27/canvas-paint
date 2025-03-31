import { $canvas, ctx } from './canvas'

const prevImagesData = []

const setPrevImageData = () => {
  const imageData = ctx.getImageData(0, 0, $canvas.width, $canvas.height)
  prevImagesData.unshift(imageData)
}

const getPrevImageData = (erase = false) => {
  if (erase) {
    return prevImagesData.shift()
  }
  return prevImagesData[0]
}

export {
  prevImagesData,
  setPrevImageData,
  getPrevImageData
}

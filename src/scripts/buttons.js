import { setLineWidth } from './canvasSettings'
import { Drawer } from './Drawer'
import { $inputLineWidth } from './interface'
import { $ } from './utilities'

// BUTTONS FOR MODES
const $pencil = $('#pencil')
const $erase = $('#erase')
const $rectangle = $('#rectangle')
const $ellipse = $('#ellipse')

function setNewActive(btn) {
  const $active = $('.active')
  $active.classList.remove('active')
  btn.classList.add('active')
}

function setDrawerMode(mode) {
  Drawer.instance.setMode(mode)
}

$pencil.addEventListener('click', () => {
  setNewActive($pencil)
  setDrawerMode(Drawer.getModes().PRENCIL)
})
$erase.addEventListener('click', () => {
  setNewActive($erase)
  setDrawerMode(Drawer.getModes().ERASE)
  setLineWidth(20)
  $inputLineWidth.value = 20
})
$rectangle.addEventListener('click', () => {
  setNewActive($rectangle)
  setDrawerMode(Drawer.getModes().RECTANGLE)
})
$ellipse.addEventListener('click', () => {
  setNewActive($ellipse)
  setDrawerMode(Drawer.getModes().ELLIPSE)
})

// BUTTONS FOR SETTINGS
const $lw1 = $('#btn-lw-1')
const $lw4 = $('#btn-lw-4')
const $lw10 = $('#btn-lw-10')
const $lw15 = $('#btn-lw-15')

function handleClick(value) {
  let toSet = value
  if (toSet <= 0 || isNaN(toSet)) toSet = 1
  setLineWidth(toSet)
  $inputLineWidth.value = toSet
}

$lw1.addEventListener('click', () => handleClick(1))
$lw4.addEventListener('click', () => handleClick(4))
$lw10.addEventListener('click', () => handleClick(10))
$lw15.addEventListener('click', () => handleClick(15))

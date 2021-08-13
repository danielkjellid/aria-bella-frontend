import Vue from 'vue'

const screens = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
}

const sm = (val: number) => val == screens.sm && val <= screens.md
const md = (val: number) => val == screens.md && val <= screens.lg
const lg = (val: number) => val == screens.lg && val <= screens.xl
const xl = (val: number) => val == screens.xl

const getBreakpoint = (w: number) => {
  if (sm(w)) return 'sm'
  else if (md(w)) return 'md'
  else if (lg(w)) return 'lg'
  else if (xl(w)) return 'xl'
  else return 'default'
}
const debounce = function(func: Function, wait: number) {
  let timeout: any

  return () => {
    const later = function() {
      timeout = null
    }
    const callNow = !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func()
  }
}

const breakpoints = {
    w: process.browser ? window.innerWidth : 1536,
    h: process.browser ? window.innerHeight : null,
    is: getBreakpoint(process.browser ? window.innerWidth : 350)
}

Vue.observable(breakpoints)

if (process.browser) {
  window.addEventListener(
    'resize',
    debounce(() => {
      breakpoints.w = window.innerWidth
      breakpoints.h = window.innerHeight
      breakpoints.is = getBreakpoint(window.innerWidth)
    }, 200),
    false
  )
}

export default breakpoints



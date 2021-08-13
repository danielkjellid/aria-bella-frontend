import Vue from 'vue'

Vue.directive('click-outside', {
  bind: function(element: any, binding: any, vnode: any) {
    element.clickOutsideEvent = function(event: Event & { target: Element}) {
      // check if the click was outside the element and its children
      if (!(element == event.target || element.contains(event.target))) {
        // if it is, call method provided in attribute value
         vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', element.clickOutsideEvent)
  },
  unbind: function(element: any) {
    document.body.removeEventListener('click', element.clickOutsideEvent)
  }
})

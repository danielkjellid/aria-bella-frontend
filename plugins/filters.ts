import Vue from 'vue'

Vue.filter('formatPrice', function(value: string) {
    if (!value) return ''

    value = value.toString()
    return value.replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
})

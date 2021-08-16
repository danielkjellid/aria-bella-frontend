import { Context } from '@nuxt/types'

export default (context: Context) => {

  const renderTransparent = context.route.meta?.map((meta: any) => {
    return meta.navbarTransparent
  })

  if (renderTransparent[0] === false) {
    return context.store.dispatch('common/setRenderNavbarTransparent', false)
  }

  return context.store.dispatch('common/setRenderNavbarTransparent', true)
}

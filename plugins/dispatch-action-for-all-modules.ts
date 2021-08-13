import allModules from '../store'
import { Context } from '@nuxt/types'

export default function dispatchActionForAllModules(
  context: Context,
  { modules = allModules, modulePrefix = '', flags = {dispatchGlobal: false} } = {}
) {
    for (const moduleName in modules) {
      const moduleDefinition = (modules as any)[moduleName]
      // if the action is defined on the module
      if (moduleDefinition.actions && moduleDefinition.actions['init']) {
        // dispatch the action if the module is namespaced, if not
        // set a flag to dispatch action globally at the end
        if (moduleDefinition.namespaced) {
          context.store.dispatch(`${modulePrefix}${moduleName}/init`)
        } else {
          flags.dispatchGlobal = true
        }
      }

      // if there are nested submodules
      if (moduleDefinition.modules) {
        // also dispatch action for these sub-modules
        dispatchActionForAllModules(
          context,
          {
            modules: moduleDefinition.modules,
            modulePrefix: modulePrefix + moduleName + '/',
            flags,
        })
      }
    }

    // if this is at the root ant at least one non-namespaced module
    // was found with the action
    if (!modulePrefix && flags.dispatchGlobal) {
      // dispatch action globally
      context.store.dispatch('init')
    }
}

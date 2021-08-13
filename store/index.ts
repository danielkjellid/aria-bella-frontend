// Register each file as a corresponding Vuex module. Module nesting
// will mirror [sub-]directory hierarchy and modules are namespaced
// as the camelCase equivalent of their file name. This is used to
// dispatch init actions automatically on page load

import camelCase from 'lodash/camelCase'

const modulesCache = {}
const storeData = { modules: {} }

;(function updateModules() {
  // Allow us to dynamically require all Vuex module files.
  // https://webpack.js.org/guides/dependency-management/#require-context
  const requireModule = (require as any).context(
    // Search for files in the current directory.
    '.',
    // Search for files in subdirectories.
    true,
    // Include any .js files that are not this file or a unit test.
    /^((?!index|\.unit\.).)*\.ts$/
  )

  // For every Vuex module...
  requireModule.keys().forEach((fileName: string) => {
    const moduleDefinition =
      requireModule(fileName).default || requireModule(fileName)

    // Skip the module during hot reload if it refers to the
    // same module definition as the one we have cached.
    if ((modulesCache as any)[fileName] === moduleDefinition) return

    // Update the module cache, for efficient hot reloading.
    (modulesCache as any)[fileName] = moduleDefinition

    // Get the module path as an array.
    const modulePath = fileName
      // Remove the "./" from the beginning.
      .replace(/^\.\//, '')
      // Remove the file extension from the end.
      .replace(/\.\w+$/, '')
      // Split nested modules into an array path.
      .split(/\//)
      // camelCase all module namespaces and names.
      .map(camelCase)

    // Get the modules object for the current path.
    const { modules } = getNamespace(storeData, modulePath)

    // Add the module to our modules object.
    modules[(modulePath as any).pop()] = {
      // Modules are namespaced by default.
      namespaced: true,
      ...moduleDefinition,
    }
  })

  // If the environment supports hot reloading...
  if ((module as any).hot) {
    // Whenever any Vuex module is updated...
    (module as any).hot.accept(requireModule.id, () => {
      // Update `storeData.modules` with the latest definitions.
      updateModules()
      // Trigger a hot update in the store.
      require('.').default.hotUpdate({ modules: storeData.modules })
    })
  }
})()

interface Subtree {
  [key: string]: any
}

// Recursively get the namespace of a Vuex module, even if nested.
function getNamespace(subtree: Subtree, path: object): Subtree {
  let namespace: string

  if ((path as any).length === 1) {
    return subtree
  } else {
    namespace = (path as any).shift()

    subtree.modules[namespace] = {
      modules: {},
      namespaced: true,
      ...(subtree as any).modules[namespace],
    }
    return getNamespace(subtree.modules[namespace], path)
  }
}

export const strict = process.env.NODE_ENV !== 'production'

export default storeData.modules


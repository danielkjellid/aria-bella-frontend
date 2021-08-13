export const state = () => ({
  navbarCategories: null,
  categories: [],
})

export type State = typeof state

export const mutations = {
  'SET_NAVBAR_CATEGORIES' (state: State, categories: string[]) {
    (state as any).navbarCategories = categories
  },
  'SET_CATEGORIES' (state: State, categories: string[]) {
    (state as any).categories = categories
  }
}

export const actions = {
  init: ({ dispatch }: {dispatch: Function}) => {
    dispatch('fetchCategories')
    dispatch('fetchNavbarCategories')
  },
  fetchNavbarCategories: async function({ commit }: {commit: Function}) {

    const categories = await (this as any).$axios.$get('categories/navigation/')
      .catch((error: string) => {
        console.log(error)
      })

    commit('SET_NAVBAR_CATEGORIES', categories)
  },
  fetchCategories: async function({ state, commit }: {state: State, commit: Function}) {

    if ((state as any).categories.length <= 0) {

      const categories = await (this as any).$axios.$get('categories/')
        .catch((error: string) => {
          console.log(error)
        })

      commit('SET_CATEGORIES', categories)
    }
  }
}

export const getters = {
  getNavbarCategories: (state: State) => {
    if ((state as any).navbarCategories) return (state as any).navbarCategories

    return null
  },
  getCategories: (state: State) => {
    return (state as any).categories
  }
}

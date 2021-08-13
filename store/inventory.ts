export const state = () => ({
  navbarCategories: null,
})

export type State = typeof state

export const mutations = {
  'SET_NAVBAR_CATEGORIES' (state: State, categories: string[]) {
    (state as any).navbarCategories = categories
  },
}

export const actions = {
  init: ({ dispatch }: {dispatch: Function}) => {
    dispatch('fetchNavbarCategories')
  },
  fetchNavbarCategories: async function({ commit }: {commit: Function}) {

    const categories = await (this as any).$axios.$get('categories/navigation/')
      .catch((error: string) => {
        console.log(error)
      })

    commit('SET_NAVBAR_CATEGORIES', categories)
  },
}

export const getters = {
  getNavbarCategories: (state: State) => {
    if ((state as any).navbarCategories) return (state as any).navbarCategories

    return null
  },
}

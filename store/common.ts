export const state = () => ({
  notification: null,
  errorNotification: null,
  renderNavbarTransparent: false,
})

export type State = typeof state

export const mutations = {
  'SET_NOTIFICATION' (state: State, message: string) {
    (state as any).notification = message
  },
  'SET_ERROR_NOTIFICATION' (state: State, message: string) {
    (state as any).errorNotification = message
  },
  'SET_RENDER_NAVBAR_TRANSPARENT' (state: State, val: boolean) {
    (state as any).renderNavbarTransparent = val
  }
}

export const actions = {
  setNotification: async function({commit}: {commit: Function}, message: string) {
    commit('SET_NOTIFICATION', message)
  },
  resetNotification: async function({commit}: {commit: Function}) {
    commit('SET_NOTIFICATION', null)
  },
  setErrorNotification: async function({commit}: {commit: Function}, message: string) {
    commit('SET_ERROR_NOTIFICATION', message)
  },
  resetErrorNotification: async function({commit}: {commit: Function}) {
    commit('SET_ERROR_NOTIFICATION', null)
  },
  setRenderNavbarTransparent: function({commit}: {commit: Function}, val: boolean) {
    commit('SET_RENDER_NAVBAR_TRANSPARENT', val)
  }
}

export const getters = {
  getNotification: (state: State) => {
    return (state as any).notification
  },
  getErrorNotification: (state: State) => {
    return (state as any).errorNotification
  },
  getRenderNavbarTransparent: (state: State) => {
    return (state as any).renderNavbarTransparent
  }
}

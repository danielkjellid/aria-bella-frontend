

export const state = () => ({
  currentUser: null,
  authError: false
})

export type State = typeof state

export const mutations = {
  'UPDATE_ACCESS_TOKEN' (state: State, newToken: string) {
    (state as any).authError = false
    if (process.browser) localStorage.setItem('access_token', newToken)
  },
  'UPDATE_REFRESH_TOKEN' (state: State, newToken: string) {
    (state as any).authError = false
    if (process.browser) localStorage.setItem('refresh_token', newToken)
  },
  'REMOVE_TOKENS' () {
    if (process.browser) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }
  },
  'SET_CURRENT_USER' (state: State, user: object) {
    (state as any).currentUser = user
  },
  'SET_USER_ACCOUNT_CONFIRMED' (state: State, verified: boolean) {
    (state as any).currentUser.has_confirmed_email = verified
  }
}

export const actions = {
  init: ({dispatch}: { dispatch: Function }) => {
    dispatch('fetchCurrentUser')
  },
  obtainToken: async function({ commit, dispatch }: {commit: Function, dispatch: Function}, payload: object): Promise<void> {
    // get new token pair
    const data = await (this as any).$axios.$post('auth/token/obtain/', payload)

    commit('UPDATE_ACCESS_TOKEN', data.access)
    commit('UPDATE_REFRESH_TOKEN', data.refresh)

    // populate the current user state in the users module once tokens is obtained
    dispatch('fetchCurrentUser')
  },
  logOut: async function({ commit }: { commit: Function }): Promise<void> {

    let refreshToken

    // save the refresh token var
    if (process.browser) refreshToken = localStorage.getItem('refresh_token')

    await (this as any).$axios.$post('auth/token/blacklist/', {
      'refresh_token': refreshToken
    }).catch((error: string) => {
      console.log(error)
    })
    // remove token from localstorage
    commit('REMOVE_TOKENS')
    // set auth headers to null
    (this as any).$axios.setHeader('Authorization', null)
    // set current user to null
    commit('SET_CURRENT_USER', null)

  },
  fetchCurrentUser: async function({ commit }: { commit: Function }): Promise<void> {
    if (process.browser) {
      const refreshToken = localStorage.getItem('refresh_token')
      const accessToken = localStorage.getItem('access_token')

      if (refreshToken && accessToken) {

        (this as any).$axios.setHeader('Authorization', `JWT ${accessToken}`)

        await (this as any).$axios.$get('user/')
          .then((userData: object) => {
            commit('SET_CURRENT_USER', userData)
        })
      }
    }
  },
  resendVerificationEmail: async function({commit, state}: {commit: Function, state: State}): Promise<void> {
    await (this as any).$axios.$post('users/verify/', {
      email: (state as any).currentUser.email
    }).catch(() => {
      commit('common/SET_ERROR_NOTIFICATION', 'Det har oppstått en feil. Prøv igjen senere.', { root: true })
    })

    commit('common/SET_NOTIFICATION', 'E-post sendt!', { root: true })

  },
  setUserAccountVerified: ({commit}: {commit: Function}, verified: boolean) => {
    commit('SET_USER_ACCOUNT_CONFIRMED', verified)
  }
}

export const getters = {
  getCurrentUser: (state: State) => {
    if ((state as any).currentUser) return (state as any).currentUser

    return null
  },
  getIsAuthenticated: (state: State) => {
    if ((state as any).currentUser) return (state as any).currentUser.is_authenticated

    return false
  },
  getIsStaff: (state: State) => {
    if ((state as any).currentUser) return (state as any).currentUser.is_staff

    return false
  },
  getIsAccountVerifiedOrAnonymous: (state: State) => {
    if ((state as any).currentUser) {
      if ((state as any).currentUser.has_confirmed_email) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }
}

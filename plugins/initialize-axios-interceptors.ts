import { Context } from '@nuxt/types'

export default function initializeAxiosInterceptors(
  context: Context,
  { redirect }: { redirect: Function }
) {
  let $axios = context.$axios

  // defaults
  if (process.browser) {
    $axios.setHeader('Authorization', `JWT ${localStorage.getItem('access_token')}`)
  }
  $axios.setHeader('Content-Type', 'application/json')
  $axios.setHeader('Accept', 'application/json')
  $axios.defaults.xsrfHeaderName = 'X-CSRFToken'
  $axios.defaults.xsrfCookieName = 'csrftoken'

  $axios.onResponse((response) => {
    return response
  })
  $axios.onError((error) => {
    if (error.response) {
      // save the original request
      const originalRequest = error.config

      // to prevent infinite loops, check status and original request url
      // if response is token_not_valid because of blacklisting, redirect to login
      // obtain a new
      if (
        error.response.status === 401 &&
        error.response.statusText === 'Unauthorized' &&
        error.response.data.code === 'token_not_valid') {

            context.route.meta?.map((meta: object) => {
              if ((meta as any).authRequired || (meta as any).staffRequired) {
                redirect('/account/log-inn/')
              }
            })

          return Promise.reject(error)
      }

      // check if token is valid and request response is unauthorized
      if (error.response.status === 401 && error.response.statusText === 'Unauthorized') {
        const refreshToken = localStorage.getItem('refresh_token');

        // if refresh token is present
        if (refreshToken) {
          const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]))

          // token exp date is expressed in seconds, while now() returns milliseconds,
          // so convert now() to seconds
          const now = Math.ceil(Date.now() / 1000)

          // if token refresh token is valid
          if (tokenParts.exp > now) {

            // fetch new access and refresh token pair
            return $axios
              .post('auth/token/refresh/', {refresh: refreshToken})
              .then(response => {
                  if (response) {
                    // set new keys in localstorrage
                    localStorage.setItem('access_token', response.data.access)
                    localStorage.setItem('refresh_token', response.data.refresh)

                    // update the auth header in both the config as well as in the original requst
                    $axios.setHeader('Authorization', 'JWT ' + response.data.access)
                    originalRequest.headers['Authorization'] = "JWT " + response.data.access

                    if (refreshToken) {
                      // rerun original request
                      return $axios(originalRequest)
                    }
                  }
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            // is refresh token is expired, redirect to login to obtain new pair if route requires auth
            context.route.meta?.map((meta: object) => {
              if ((meta as any).authRequired || (meta as any).staffRequired) {
                redirect('/account/log-in/')
              }
            })

            console.log("Refresh token is expired", tokenParts.exp, now)
          }
        } else {
          // if refresh token is missing, redirect to login to obtain a new pair if route requires auth
          context.route.meta?.map((meta: object) => {
            if ((meta as any).authRequired || (meta as any).staffRequired) {
              redirect('/account/log-in/')
            }
          })

          console.log('Refresh token not available')
        }
      }

      if (error.response.status === 404) {
        redirect('*')
      }
    }
  })
}

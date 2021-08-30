<template>
  <AuthSidebarContent>
    <template #auth-heading>
      <h1 class="text-xl font-semibold text-gray-900">Kom i gang med å handle</h1>
      <div class="flex items-center justify-center mt-1 text-sm text-gray-700">
        Har du allerede en konto? <router-link to="/konto/logg-inn/" class="ml-1 font-semibold text-gray-900 underline">Logg inn her</router-link>
      </div>
    </template>
    <template #auth-content>
      <form @submit.prevent="createAccount">
        <div class="sm:flex sm:items-center sm:justify-between sm:w-full">
          <div class="sm:w-1/2">
            <BaseInput
              id="id_first_name"
              v-model="user.first_name"
              label="Fornavn"
              block
              :error="$errorMsg(errors.first_name)"
              @input="resetErrorMessage"
            />
          </div>
          <div class="sm:w-1/2 sm:ml-5 sm:mt-0 mt-5">
            <BaseInput
              id="id_last_name"
              v-model="user.last_name"
              label="Etternavn"
              block
              :error="$errorMsg(errors.last_name)"
              @input="resetErrorMessage"
            />
          </div>
        </div>
        <div class="flex items-end justify-between w-full mt-5">
          <div class="w-1/4">
            <BaseSelect
              id="id_birth_day"
              v-model="birthDay"
              label="Fødselsdato"
              block
              :error="$errorMsg(errors.birth_date)"
              @input="resetErrorMessage"
            >
              <option
                v-for="i in 31"
                :key="i"
                :value="i"
                :selected="i == 1"
              >
                {{ i }}
              </option>
            </BaseSelect>
          </div>
          <div class="sm:mt-0 w-1/2 mt-5 ml-5">
            <BaseSelect
              id="id_birth_month"
              v-model="birthMonth"
              label="Fødselsmåned"
              hiddenLabel
              block
              :error="$errorMsg(errors.birth_date)"
              @input="resetErrorMessage"
            >
              <option
                v-for="month in months"
                :key="month.val" :value="month.val"
                :selected="month.val == '01'"
              >
                  {{ month.text }}
              </option>
            </BaseSelect>
          </div>
          <div class="sm:mt-0 w-1/4 mt-5 ml-5">
            <BaseSelect
              id="id_birth_year"
              v-model="birthYear"
              label="Fødselsår"
              hiddenLabel
              block
              :error="$errorMsg(errors.birth_date)"
              @input="resetErrorMessage"
            >
              <option
                v-for="year in years"
                :key="year"
                :value="year"
                :selected="year == 2021"
              >
                {{ year }}
              </option>
            </BaseSelect>
          </div>
        </div>
        <div class="mt-5">
          <BaseInput
            id="id_phone_number"
            v-model="user.phone_number"
            label="Mobilnummer"
            type="number"
            block
            :error="$errorMsg(errors.phone_number)"
            @input="resetErrorMessage"
          />
        </div>
        <div class="mt-5">
          <BaseInput
            id="id_email"
            v-model="user.email"
            label="E-post"
            block
            :error="$errorMsg(errors.email)"
            @input="resetErrorMessage"
          />
        </div>
        <div class="mt-5">
          <BaseInput
            id="id_password"
            v-model="user.password"
            label="Passord"
            block
            type="password"
            :error="$errorMsg(errors.password)"
            @input="resetErrorMessage"
          />
        </div>
        <div class="mt-5">
          <BaseInput
            id="id_password2"
            v-model="user.password2"
            label="Gjenta passord"
            block
            type="password"
            :error="$errorMsg(errors.password2)"
            @input="resetErrorMessage"
          />
        </div>
        <div class="mt-5">
          <BaseInput
            id="id_street_address"
            v-model="user.street_address"
            label="Gateadresse"
            block
            :error="$errorMsg(errors.street_address)"
            @input="resetErrorMessage"
          />
        </div>
        <div class="sm:flex sm:items-center sm:justify-between sm:w-full sm:mt-5">
          <div class="sm:w-1/2 sm:mt-0 mt-5">
            <BaseInput
              id="id_zip_code"
              v-model="user.zip_code"
              label="Postkode"
              type="number"
              block
              :error="$errorMsg(errors.zip_code)"
              @input="resetErrorMessage"
            />
          </div>
          <div class="sm:w-1/2 sm:ml-5 sm:mt-0 mt-5">
            <BaseInput
              id="id_zip_place"
              v-model="user.zip_place"
              label="Sted"
              block
              :error="$errorMsg(errors.zip_place)"
              @input="resetErrorMessage"
            />
          </div>
        </div>
        <div class="mt-6">
          <BaseCheckbox
            id="id_subscribed_to_newsletter"
            v-model="user.subscribed_to_newsletter"
            :checked="user.subscribed_to_newsletter"
            label="Jeg ønsker nyheter på e-post"
          />
          <BaseCheckbox
            id="id_allow_personalization"
            v-model="user.allow_personalization"
            :checked="user.allow_personalization"
            label="Jeg ønsker en personalisert handleoppelvelse og kommunikasjon"
            class="mt-5"
          />
          <BaseCheckbox
            id="id_allow_third_party_personalization"
            v-model="user.allow_third_party_personalization"
            :checked="user.allow_third_party_personalization"
            label="Jeg ønsker personlig markedsføring i andre kanaler"
            class="mt-5"
          />
        </div>
        <BaseButton type="submit" class="flex justify-center w-full mt-5">Opprett konto</BaseButton>
      </form>
    </template>
  </AuthSidebarContent>
</template>

<script lang="ts">
import AuthSidebarContent from '~/components/auth-sidebar-content.vue'
import { defineComponent, useStore, computed, ref, useContext, useRouter, reactive, toRefs } from '@nuxtjs/composition-api'
import $catchError from '~/mixins/catch-error'
import $errorMsg from '~/mixins/error-message'

export default defineComponent({
  name: 'Register',
  layout: 'auth',
  head: {
    title: 'Lag konto',
    meta: [
      {
        name: 'description',
        content: 'Lag konto hos oss'
      }
    ]
  },
  components: {
    AuthSidebarContent
  },
  setup() {

    const store = useStore()
    const router = useRouter()
    const { $axios} = useContext()

    interface UserObj {
      first_name: string
      last_name: string
      phone_number: string
      birth_date: string
      email: string
      password: string
      password2: string
      street_address: string
      zip_code: number | string
      zip_place: number | string
      subscribed_to_newsletter: boolean
      allow_personalization: boolean
      allow_third_party_personalization: boolean
    }

    let user = reactive<UserObj>({
      first_name: '',
      last_name: '',
      phone_number: '',
      birth_date: '',
      email: '',
      password: '',
      password2: '',
      street_address: '',
      zip_code: '',
      zip_place: '',
      subscribed_to_newsletter: true,
      allow_personalization: true,
      allow_third_party_personalization: true
    })

    let { birth_date, email, password } = toRefs(user)

    const months = [
      {val: '01', text: 'Januar'},
      {val: '02', text: 'Februar'},
      {val: '03', text: 'Mars'},
      {val: '04', text: 'April'},
      {val: '05', text: 'Mai'},
      {val: '06', text: 'Juni'},
      {val: '07', text: 'Juli'},
      {val: '08', text: 'August'},
      {val: '09', text: 'September'},
      {val: '10', text: 'Oktober'},
      {val: '11', text: 'November'},
      {val: '12', text: 'Desember'},
    ]

    const years = computed(() => {
      const year = new Date().getFullYear()

      return Array.from({length: year - 1900}, (value, index) => 1901 + index).sort((a, b) => b - a)
    })

    let birthDay = ref<string>('1')
    let birthMonth = ref<string>('01')
    let birthYear = ref<string>('2021')

    const createAccount = async () => {
      birth_date.value = `${birthYear.value}-${birthMonth.value}-${birthDay.value}`

      await $axios.$post('users/create/', user)
        .then(() => {
          // if there previously have been errors, reset
          errors.value = ''

          // get tokens and fetch user
          store.dispatch('auth/obtainToken', {username: email.value, password: password.value})
          store.dispatch('auth/fetchCurrentUser')
          store.dispatch('common/setNotification', 'Konto opprettet suksessfullt!')

          // after user is created, send email to verify account
          $axios.$post('users/verify/', {email: email.value})
            .catch(error => {
              errors.value = $catchError(error)
              store.dispatch('common/setErrorNotification', $catchError(error))
            })

          // redirect to home
          router.push('/')
        })
        .catch(error => {
          errors.value = $catchError(error)
          store.dispatch('common/setErrorNotification', $catchError(error))
        })
    }

    let errors = ref<object | string>('')

    const errorMessage = computed(() => {
      return store.getters['common/getErroNotification']
    })

    const resetErrorMessage = () => {
      if (errorMessage.value) {
        store.dispatch('common/resetErrorNoification')
      }

      if (errors.value) {
        errors.value = ''
      }
    }

    return {
      user,
      birthDay,
      birthMonth,
      birthYear,
      months,
      years,
      createAccount,
      errors,
      $errorMsg,
      resetErrorMessage,
    }
  }
})
</script>

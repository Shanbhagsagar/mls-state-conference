<template>
  <section id="login">
    <div class="card-login">
      <div class="row card-wrapper">
        <div class="col login-block">
          <!-- i18n -->
          <!-- <div class="top-left">
           <b-dropdown
            id="dropdown-right"
            text="Select Language"
            variant="light"
            class="m-2 "
          >
            <b-dropdown-item
              href="#"
              @click="changeLanguage('en')"
            >
              English
            </b-dropdown-item>
             <b-dropdown-item
              href="#"
              @click="changeLanguage('mr')"
            >
              मराठी
            </b-dropdown-item>
          </b-dropdown>
          </div> -->
          <!-- i18n -->
          <a href="https://mockexams.mkcl.org/" class="btn btn-back">
            {{$t('login.backToHome')}}
          </a>
          <div class="logo-wrapper">
            <!-- <div class="logo-title"><span>MKCL</span> Mock Exams</div> -->
            <!-- <img class="img-fluid" src="../../public/assets/images/emblem.png" alt="GOI">
            <img class="img-fluid" src="../../public/assets/images/logo.png" alt="Pune ZP">-->
            <!--<h1>MKCL EXAM LIVE</h1>-->
            <img class="img-fluid" src="../../../public/assets/images/DNEXT_logo final-01.png" alt="MKCL Mock Exams">
          </div>
          <!-- <div class="alert-warning">We are updating the portal, the Mock exams will start from Thursday 22nd October 2020 at 10.00 AM</div>
          <br> -->
          <div class="form-wrapper">
            <form @submit.prevent="login()">
              <div
                class="form-group"
                id="loginFormId"
              >
                <label
                  for="email"
                  class="sr-only"
                >{{$t('login.loginId')}}</label>
                <input
                  type="text"
                  v-model="cr.username"
                  class="form-control"
                  :placeholder="$t('login.loginIdPlaceholder')"
                  :class="{
                    'is-invalid': submitted && $v.cr.username.$invalid,
                  }"
                  ref="username"
                >
                <label
                  class="text-danger"
                  v-if="submitted && !$v.cr.username.required"
                >{{$t('login.vLoginId')}}</label>
              </div>
              <div class="form-group">
                <label
                  for="email"
                  class="sr-only"
                >पासवर्ड/Password</label>
                <input
                  type="password"
                  name="password"
                  v-model="cr.password"
                  class="form-control"
                  @focus="showPassInfo = true"
                  id="password"
                  @blur="showPassInfo = false"
                  :placeholder="$t('login.passwordPlaceholder')"
                  :class="{
                    'is-invalid': submitted && $v.cr.password.$invalid,
                  }"
                  ref="password"
                >
                <label
                  class="text-danger"
                  v-if="submitted && !$v.cr.password.required"
                >{{$t('login.vPassword')}}</label>
              </div>
              <div class="form-action-alt">
                <input
                  id="loginBtn"
                  type="submit"
                  name="btnlogin"
                  class="btn btn-page"
                  value="Login"
                >
              </div>
              <div class="form-action-alter mt-3">
                <div class="row">
                  <div class="col-sm">
                    <router-link to="/resetPassword">
                      {{$t('login.forgotPassword')}}
                    </router-link>
                  </div>
                  <div class="col-sm-auto">
                    <router-link to="/studentregistration">
                       {{$t('login.notRegister')}}
                    </router-link>
                  </div>
                </div>
              </div>
            </form>
            <div class="help-wrapper">
              <div class="copyright-holder">
                <img src="../../../public/assets/images/logo_mkcl.svg" class="img-adj" alt="MKCL" />
                <div class="copyright">
                  {{$t('login.poweredBy')}}
                  <a
                    href="https://www.mkcl.org"
                    target="_blank"
                  >{{$t('login.mkcl')}}</a>. (MKCL),
                  {{$t('login.copyright')}}<br>
                  </div>
                <!-- <div><br>Version 6.10.1, Updated On 10-June-2020 08:30 AM</div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import MQL from '@/plugins/mql.js'
import Toasted from 'vue-toasted'
import Response from '@/plugins/response.js'
import { required } from 'vuelidate/lib/validators'
import { loadLanguageAsync } from '@/setup/i18n-setup.js'
export default {
  data () {
    return {
      cr: {
        username: null,
        password: null
      },
      submitted: false
    }
  },
  validations: {
    cr: {
      username: { required },
      password: { required }
    }
  },
  methods: {
    login () {
      const vm = this
      vm.submitted = true
      vm.$v.$touch()
      if (!vm.$v.$invalid) {
        new MQL()
          .setActivity('o.[Login]')
          .setData(vm.cr)
          .fetch()
          .then((rs) => {
            let res = rs.getActivity('Login', true)
            if (rs.isValid('Login')) {
              let token = rs.getHeaders().authorization
              // this.$store.state.roles.push(JSON.parse(atob(token.split('.')[1])).groups[0])
              let role = JSON.parse(atob(token.split('.')[1])).groups[0]
              // console.log("role",role)
              this.$store.commit('SET_ROLE', role)
              if (role === 'student') {
                this.$router.push({ name: 'StudentDetails' })
              }else if(role==='admin'){
                this.$router.push({name:"AdminDashboard"})
              }
              vm.$toasted.success(this.$t('login.loginSuccess'), {
                theme: 'bubble',
                position: 'top-center',
                duration: 3000
              })
            } else {
              rs.showErrorToast('Login')
            }
          })
      } else {
        vm.$toasted.error(this.$t('login.requiredData'), {
          theme: 'bubble',
          position: 'top-center',
          duration: 3000
        })
      }
    },
     changeLanguage (lang) {
      console.log('lang change :', lang)
      this.$i18n.locale = lang
      this.$i18n.fallbackLocale = lang
      loadLanguageAsync(lang).then(() => {
        console.log('Updated')
      })
    },

  },
  mounted () {
    //  sessionStorage.clear()
  }
}
</script>

<style lang="scss"></style>

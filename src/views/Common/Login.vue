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
          <a
            href="https://dnext.mkcl.org/"
            class="btn btn-back"
          >
            {{ $t('login.backToHome') }}
          </a>
          <div class="logo-wrapper">
            <!-- <div class="logo-title"><span>MKCL</span> Mock Exams</div> -->
            <!-- <img class="img-fluid" src="../../public/assets/images/emblem.png" alt="GOI">
            <img class="img-fluid" src="../../public/assets/images/logo.png" alt="Pune ZP">-->
            <!--<h1>MKCL EXAM LIVE</h1>-->
            <img
              class="img-fluid"
              src="../../../public/assets/images/logo_dnext.png"
              alt="MKCL DNExT"
            >
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
                >{{ $t('login.loginId') }}</label>
                <input
                  type="text"
                  v-model.trim="cr.userName"
                  class="form-control"
                  :placeholder="$t('login.loginIdPlaceholder')"
                  :class="{
                    'is-invalid': submitted && $v.cr.userName.$invalid,
                  }"
                  ref="userName"
                >
                <label
                  class="text-danger"
                  v-if="submitted && !$v.cr.userName.required"
                >{{ $t('login.vLoginId') }}</label>
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
                >{{ $t('login.vPassword') }}</label>
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
                    <router-link to="/reset-password">
                      {{ $t('login.forgotPassword') }}
                    </router-link>
                  </div>
                  <div class="col-sm-auto">
                    <router-link to="/registration">
                      {{ $t('login.notRegister') }}
                    </router-link>
                  </div>
                </div>
              </div>
            </form>
            <div class="help-wrapper">
              <div class="copyright-holder">
                <img
                  src="../../../public/assets/images/logo_mkcl.svg"
                  class="img-adj"
                  alt="MKCL"
                >
                <div class="copyright">
                  Powered by
                  <a
                    href="https://www.mkcl.org"
                    target="_blank"
                  >Maharashtra Knowledge Corporation Ltd</a>. (MKCL), Copyright © 2022. All rights reserved.<br>
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
        userName: null,
        password: null
      },
      submitted: false
    }
  },
  validations: {
    cr: {
      userName: { required },
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
          .setActivity('o.[ApplicantLogin]')
          .setData({ userName: this.cr.userName, password: this.cr.password })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity('ApplicantLogin', true)
            if (rs.isValid('ApplicantLogin')) {
              // this.$router.push({ name: 'StudentDetails' })

              this.$router.push('/Profile')
              this.$store.state.userName = this.cr.userName
              // let token = rs.getHeaders().authorization
              // // this.$store.state.roles.push(JSON.parse(atob(token.split('.')[1])).groups[0])
              // let role = JSON.parse(atob(token.split('.')[1])).groups[0]
              // this.$store.commit('SET_ROLE', role)
              // if (role === 'applicant') {
              //   this.$router.push({ name: 'StudentDetails' })
              // } else if (role === 'admin') {
              //   this.$router.push({ name: 'AdminDashboard' })
              // }
              vm.$toasted.success(this.$t('login.loginSuccess'), {
                theme: 'bubble',
                position: 'top-center',
                duration: 3000
              })
            } else {
              rs.showErrorToast('ApplicantLogin')
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
      this.$i18n.locale = lang
      this.$i18n.fallbackLocale = lang
      loadLanguageAsync(lang).then(() => {
      })
    }

  },
  mounted () {
    //  sessionStorage.clear()
  }
}
</script>

<style lang="scss"></style>

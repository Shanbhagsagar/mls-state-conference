<template>
  <section id="login">
    <div class="card-login">
      <div class="row card-wrapper">
        <div class="col login-block">
          <a
            href="http://mls.org.in/AIPOC/"
            class="btn btn-back"
          >
            {{ $t('login.backToHome') }}
          </a>
          <div class="logo-wrapper">
             <img
              class="img-fluid"
              src="../../../public/assets/images/vidhansabha.png"
              alt="Maharashtra Legislature Secretariat"
            >
          </div> 
          <div class="text-center card-header"><b>Maharashtra Legislature Secretariat Conference 2024</b></div>
          <br>
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
                  v-model.trim="cr.username"
                  class="form-control"
                  :placeholder="$t('login.loginIdPlaceholder')"
                  :class="{
                    'is-invalid': submitted && $v.cr.username.$invalid,
                  }"
                  ref="username"
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
                >Password</label>
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
             </form>
            <div class="help-wrapper">
              <div class="copyright-holder">
                <div class="copyright">
                  Powered by
                  <a
                    href="http://mls.org.in/"
                    target="_blank"
                  >Maharashtra Legislature Secretariat</a>, Copyright © {{ new Date().getFullYear() }}. All rights reserved.<br>
                </div>
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
import bcryptjs from 'bcryptjs'
import axios from 'axios'
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
         var plainTextPassword = vm.cr.password;
         var securePassword;
         const salt = bcryptjs.genSaltSync(10); 
         securePassword = bcryptjs.hashSync(plainTextPassword, salt); 
          axios
           .get(
            vm.$store.getters["getIpaddress"]+"auth/getAuth?username=" +
               vm.cr.username +
               "&password=" +
               securePassword
           )
           .then(response => {
             console.log(response);
             if(response.data != null)  {
                 this.$store.state.authData =  response.data
                 if(this.$store.state.authData != null){
                  this.$store.state.userName = vm.cr.username                  
                  this.$router.push({
                     name: 'Profile'
                   })
                 } else {
                  vm.$toasted.error('Username & Password does not match. Please try again.', {
                      theme: 'bubble',
                      position: 'top-center',
                      duration: 3000
                    });
                 }
                               
              } else{
               vm.$toasted.error('Username & Password does not match. Please try again.', {
               theme: 'bubble',
               position: 'top-center',
               duration: 3000
             });
             }
           })
           .catch(error => {
             console.log(error)
              vm.$toasted.error('Username & Password does not match. Please try again.', {
               theme: 'bubble',
               position: 'top-center',
               duration: 3000
             })
             this.errored = true
           })
           .finally(() => this.loading = false)
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

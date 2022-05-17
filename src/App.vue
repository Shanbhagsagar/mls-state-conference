<template>
  <div id="app">
    <div
      id="app-loader"
      v-if="$store.getters.isPageBlocked"
    >
      <img
        src="../public/assets/tail-spin.svg"
        alt="loader"
      >
    </div>

    <div
      class="wrapper"
      :class="{ 'wrapper-lg' : $route.path == '/StudentDetails' || $route.path=='/view-student-details-admin' || $route.path == '/' || $route.path == '/about' || $route.path == '/login' || $route.path == '/StudentDetails' || $route.path=='/logout' ||$route.path=='/registration'|| $route.path=='/termsandconditions'|| $route.path == '/studentregistration' || $route.path == '/recipentRegistration' || $route.path == '/success' || $route.path == '/reset-password' || $route.path== '/applicantDetails' }"
    >
      <!-- <headerbar v-if="$route.path!='/' && $route.path!='/donorRegistration' && $route.path!='/updateDonor' && $route.path!='/updateRecipient' && $route.path!='/recipentRegistration' && $route.path!='/login' && $route.path!='/about' && $route.path!='/success'" /> -->
      <sidebar v-if="$route.path!='/'  && $route.path!=='/termsandconditions' && $route.path !== '/StudentDetails' && $route.path!='/studentregistration' && $route.path!='/updateDonor' && $route.path!='/updateRecipient' && $route.path!='/registration' && $route.path!='/recipentRegistration' && $route.path!='/login' && $route.path!='/logout' && $route.path!='/about' && $route.path!='/success' && $route.path!= '/reset-password' && $route.path!= '/applicantDetails'" />
      <div class="main-content">
        <headerbar v-if="$route.path!='/' && $route.path!=='/termsandconditions' && $route.path!='/studentregistration' && $route.path!='/updateDonor' && $route.path!='/updateRecipient' && $route.path!='/recipentRegistration'&& $route.path!='/registration' && $route.path!='/login' && $route.path!='/logout' && $route.path!='/about' && $route.path!='/success' && $route.path!= '/reset-password'" />
        <div class="content">
          <router-view :key="$route.fullPath" />
        </div>
        <footerbar v-if="$route.path!='/' && $route.path!=='/termsandconditions' && $route.path!='/studentregistration'&& $route.path!='/registration' && $route.path==='/view-student-details-admin' && $route.path!=='/view-all-student-details' && $route.path!=='/view-student-details-marks-admin'  && $route.path!='/updateDonor' && $route.path!='/updateRecipient' && $route.path!='/recipentRegistration' && $route.path!='/login' && $route.path!='/logout' && $route.path!='/about' && $route.path!='/success' && $route.path!= '/reset-password'" />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/common/Sidebar'
import headerbar from './components/common/headerbar'
import footerbar from './components/common/footer'

export default {
  name: 'App',
  components: {
    Sidebar,
    headerbar,
    footerbar
  },
  metaInfo: {
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Test title',
        template: chunk => `${chunk} - FullStack`
      }
    ]
  }
}
</script>

<style lang="scss">
#app-loader {
  position: fixed; top: 0; right: 0; bottom: 0; left: 0; background: rgba(255,255,255,0.8); z-index: 2000; display: flex; align-items: center; justify-content: center;
}
#login {background-image: url("../public/assets/images/bg-image.jpg");}
</style>

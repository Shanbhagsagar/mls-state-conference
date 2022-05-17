<template>
  <div
    id="top"
    class="headerbar"
  >
    <div class="applogo">
      <!-- <div class="logo-title"><span> MKCL </span> DNExt </div> -->
      <span class="logo">
        <img class="img-fluid" src="../../../public/assets/images/logo_dnext.png" alt="MKCL DNExt">
      </span>
    </div>

    <!-- <b class="text-dark">Plasma Donation Project</b> -->
    <!-- <button class="btn btn-side sidebar-open-button" @click="toggleSidebar">
      <i class="mdi mdi-menu" />
    </button>
    <button
      class="btn btn-side sidebar-open-button-mobile"
      @click="toggleSlide"
    >
      <i class="mdi mdi-menu" />
    </button> -->
<!-- 
    <b-dropdown
            id="dropdown-right"
            text="Select Language"
            variant="light"
            class="m-2 text-primary"
          > -->
            <!-- <b-dropdown-item
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
          </b-dropdown> -->


    <ul class="top-right">
      <li class="dropdown link">
        <b-dropdown
          right
          no-caret
          variant="link profilebox"
          class="box-profile"
        >
          <template v-slot:button-content>
            <img
              src="../../../public/assets/images/user.png"
              alt="img"
            >
            <b>{{ username }}</b>
          </template>
          <b-dropdown-item to="/logout">
            <i class="mdi mdi-power" />Logout
          </b-dropdown-item>
        </b-dropdown>
      </li>
    </ul>
  </div>
</template>

<script>
import MQL from '@/plugins/mql.js'
import { loadLanguageAsync } from '@/setup/i18n-setup.js'
export default {
  name: 'Headerbar',
  data () {
    return {
      userDetails: [{
        fullname: ''
      }],
      username: ''
    }
  },
  methods: {
    toggleSidebar () {
      let leftSidebar = document.querySelector('.wrapper')
      leftSidebar.classList.toggle('open')
    },
    toggleSlide () {
      let leftSidebar = document.querySelector('.wrapper')
      leftSidebar.classList.toggle('open-slide')
    },
    getUserDetails () {
      const vm = this
      new MQL()
        .setActivity('r.[query_1hau0sZuZdl0MOZBrO1OaFpTTgI]')
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('query_1hau0sZuZdl0MOZBrO1OaFpTTgI', true)
          if (rs.isValid('query_1hau0sZuZdl0MOZBrO1OaFpTTgI')) {
            // console.log('inside user detals', res)
            vm.userDetails = res
            vm.username = vm.userDetails[0].fullName
            // console.log('inside headerbar', vm.userDetails[0])
          } else {
            rs.showErrorToast('query_1hau0sZuZdl0MOZBrO1OaFpTTgI')
          }
        })
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
    const vm = this

    if (vm.$store.state.roles.some((obj) => obj === 'student')) {
      vm.getUserDetails()
    }else if(vm.$store.state.roles.some((obj) => obj === 'admin')){
      vm.username="admin"
    }
  },
  watch: {
    $route (to, from) {
      let leftSidebar = document.querySelector('.wrapper')
      leftSidebar.classList.remove('open-slide')
    }
  }
}
</script>

<style lang="scss">
#top.headerbar {
  background-image:linear-gradient(-225deg, #ff9544, #f50162 48%, #b3004a);
}
// .btn-noti i {
//   font-size: 25px;
//   color: white;
// }
// .btn-noti {
//   transition: all 0.2s ease-in;
//   width: 50px;
//   padding: 10px;
//   height: 50px;
//   position: relative;
//   border-radius: 50% !important;
// }
// .btn-noti:hover {
//   background: #f0f3ff80;
// }
// .btn-noti.dropdown-toggle::after {
//   display: none;
// }
// .btn-noti .badge {
//   top: -40px !important;
//   right: 0px;
//   width: 20px;
//   display: flex;
//   align-items: center;
//   height: 20px;
//   // background: #444247;
//   background: #ff5722;
//   border-radius: 50%;
// }
// .user-pic {
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
// }

// .notification-wrapper {
//   margin-top: 0;
//   border-bottom: 1px solid #f5f5f5;
// }
// .media {
//   display: flex;
//   -ms-flex-align: start;
//   -webkit-box-align: start;
//   align-items: flex-start;
// }
// .avatar {
//   background-color: #202533;
//   border-radius: 50%;
//   color: #fff;
//   display: inline-block;
//   font-weight: 500;
//   height: 38px;
//   line-height: 38px;
//   margin: 0 10px 0 0;
//   overflow: hidden;
//   text-align: center;
//   text-decoration: none;
//   text-transform: uppercase;
//   vertical-align: middle;
//   width: 38px;
//   position: relative;
//   white-space: nowrap;
// }
// .media-body {
//   -ms-flex: 1;
//   -webkit-box-flex: 1;
//   flex: 1;
// }
// .noti-details {
//   color: #989c9e;
//   margin: 0;
//   font-size: 13px;
// }
// .noti-time {
//   margin: 0;
// }
// .notification-time {
//   font-size: 12px;
//   line-height: 1.35;
//   color: #bdbdbd;
// }
// .dropdown-menu {
//   overflow-y: scroll;
//   min-width: 22rem !important;
//   max-height: 20rem;
// }
</style>

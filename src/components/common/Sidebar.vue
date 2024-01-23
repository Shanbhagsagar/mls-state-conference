<template>
  <div id="sidebar" class="sidebar clearfix">
    <div class="sidebar-holder" v-bar>
      <div class="sidebar-vbar">
        <ul class="sidebar-panel nav">
          <li class="sidetitle">
            Menus
          </li>
          <!-- <li>
            <router-link to="/ViewDelegatesDetails">
              <span class="icon color5"><i class="mdi mdi-human" /></span>
               Dashboard
            </router-link>
          </li> -->
          <li>
            <router-link to="/ViewDelegatesDetails">
              <span class="icon color5"><i class="mdi mdi-human" /></span>
              All Delegates Details
            </router-link>
          </li>
          <li>
            <router-link to="/ViewUserDetails">
              <span class="icon color5"><i class="mdi mdi-human" /></span>
                 Users
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data: function () {
    return {
      // isActive: false
    };
  },
  // methods: {
  //   toggleSideBar () {
  //     this.isActive = !this.isActive
  //   }
  // }
};
</script>

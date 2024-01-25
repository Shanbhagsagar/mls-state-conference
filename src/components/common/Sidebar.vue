<template>
  <div id="sidebar" class="sidebar clearfix">
    <div class="sidebar-holder" v-bar>
      <div class="sidebar-vbar">
        <ul  class="sidebar-panel nav">
          <li class="sidetitle">
            Menus
          </li>
          <li v-if="role == 'Admin' || role == 'LiasionOfficer' || role == 'Hotel' || role == 'Travel' || role == 'Committee_LiasionOfficer' || role == 'Committee2_Hotel' || role == 'Committee3_Travel' || role == 'PrincipalSecretary' || role == 'Other1' || role == 'Other2'">
            <router-link to="/ViewDelegatesDetails">
              <span class="icon color5"><i class="mdi mdi-human" /></span>
              All Delegates Details
            </router-link>
          </li>
          <li v-if="role == 'Admin'">
            <router-link to="/ViewUserDetails">
              <span class="icon color5"><i class="mdi mdi-human" /></span>
                 Users
            </router-link>
          </li>
          <li v-if="role == 'Travel'">
            <router-link to="/DriverDashboard">
              <span class="icon color5"><i class="mdi mdi-human" /></span>
                 Drivers
            </router-link>
          </li>
          <li v-if="role == 'Hotel'">
            <router-link to="/AccommodationDashboard">
              <span class="icon color5"><i class="mdi mdi-human" /></span>
                 Hotels
            </router-link>
          </li>
          <li v-if="role == 'LiasionOfficer'">
            <router-link to="/LiasionOfficerDashboard">
              <span class="icon color5"><i class="mdi mdi-human" /></span>
                 Liasion Officer
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
      role: this.$store.state.authData.role
    };
  },
  // methods: {
  //   toggleSideBar () {
  //     this.isActive = !this.isActive
  //   }
  // }
};
</script>

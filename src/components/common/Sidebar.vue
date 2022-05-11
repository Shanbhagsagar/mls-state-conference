<template>
  <div id="sidebar" class="sidebar clearfix">
    <!-- <div class="sidebar-header">
      <img
        src="../../assets/logo_mkcl_w.svg"
        class="logo"
      >
    </div> -->

    <!-- <div class="custom-menu">
      <button
        type="button"
        id="sidebarCollapse"
        class="btn btn-primary"
        @click="toggleSideBar()"
      >
        <i class="mdi mdi-menu" />
        <span class="sr-only">Toggle Menu</span>
      </button>
    </div> -->

    <div class="sidebar-holder" v-bar>
      <div class="sidebar-vbar">
        <ul
          class="sidebar-panel nav"
          v-if="$store.state.roles.some((obj) => obj === 'student')"
        >
          <li class="sidetitle">
            MAIN
          </li>
          <li>
            <router-link to="/StudentDetails">
              <span class="icon color5"><i class="mdi mdi-human"/></span>

              Student Details
            </router-link>
          </li>
          <!-- <template v-for="(page, i) in this.$router.options.routes">
            <li :key="i">
              <b-link :to="page.path"
                ><i class="sidebar-icon" :class="page.meta.icon"></i>
                {{ page.name }}</b-link
              >
            </li>
          </template> -->
          <!-- <li>
            <router-link to="/donorRegistration">
              <i class="mdi mdi-information-variant sidebar-icon" /> Register as Plasma Donor
            </router-link>
          </li>

          <li>
            <router-link to="/recipentRegistration">
              <i class="mdi mdi-account sidebar-icon" /> Register as Recipient
            </router-link>
          </li> -->
          <!-- <li>
            <router-link to="/ViewDonorByAdmin">
              <span class="icon color5"><i class="mdi mdi-human" /></span>
              View Donor
            </router-link>
          </li>
          <li>
            <router-link to="/ViewRecipientByAdmin">
              <span class="icon color5"><i class="mdi mdi-human" /></span>
              View Recipient
            </router-link>
          </li> -->
        </ul>

        <ul
          class="sidebar-panel nav"
          v-if="$store.state.roles.some((obj) => obj === 'admin')"
        >
          <li class="sidetitle">
            MAIN
          </li>
          <li>
            <router-link to="/admin-dashboard">
              <span class="icon color5">
                <i class="mdi mdi-library-books" />
              </span>
              Admin Dashboard
            </router-link>
            <router-link to="/view-all-student-details">
              <span class="icon color5">
                <i class="mdi mdi-library-books" />
              </span>
              View Student Details
            </router-link>
          </li>
          <li>
            <router-link to="/view-student-details-marks-admin">
              <span class="icon color5">
                <i class="mdi mdi-library-books" />
              </span>
              View Student Marks
            </router-link>
            <router-link to="/mock-exam-paper-configuration">
              <span class="icon color5">
                <i class="mdi mdi-library-books" />
              </span>
              Mock Exam Configuration
            </router-link>
          </li>
        </ul>
        <div class="sidebar-header">
          <img src="../../assets/logo_mkcl_w.svg" alt="MKCL" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data: function() {
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

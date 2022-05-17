<template>
  <div class="wrapper-hp">
    <header class="header">
      <section class="section-welcome">
        <div class="container">
          <div class="row align-items-center justify-content-center">
            <div class="col-12 col-md order-2 order-md-2">
              <div class="welcome-content">
                <h5>Welcome to</h5>
                <h1>MKCL DNExT</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="navigation-bar">
        <b-navbar
          toggleable="lg"
          variant="navmenu"
        >
          <b-navbar-toggle target="nav-collapse" />
          <b-collapse
            id="nav-collapse"
            is-nav
          >
            <b-navbar-nav class="m-auto">
              <b-nav-item to="/">
                Home
              </b-nav-item>
              <b-nav-item to="/about">
                About
              </b-nav-item>
              <!-- <b-nav-item to="/curfew-pass/application">Apply for Curfew Pass</b-nav-item>
              <b-nav-item to="/curfew-pass/view-pass">Check Curfew Pass Status</b-nav-item> -->
              <b-nav-item
                to="/termsandconditions"
              >
                Terms and Conditions
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </header>
    <section class="section-content">
      <div class="container">
        <h2 class="text-center">
          Thank you for registering with us!
        </h2>
      </div>
    </section>
    <footer class="footer-hm">
      <div class="container">
        <div class="row copyright">
          <div class="col-md">
            Powered by <a
              target="_blank"
              href="https://www.mkcl.org/"
            >Maharashtra Knowldege Corporation Ltd</a>. (MKCL), Copyright © 2020. All rights reserved.
          </div>
          <div class="col-md-auto">
            <img
              src="../../../public/assets/images/logo_mkcl.svg"
              alt="MKCL"
            >
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Success',
  data: function () {
    return {
    }
  }
}
</script>

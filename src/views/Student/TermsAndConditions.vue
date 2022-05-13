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
          Terms And Conditions
        </h2>
        <p>I hereby agree,</p>
        <p>1)  I hereby give my consent to receive communications from MKCL.</p>
        <p>2) MKCL may use my contact information for marketing & communication purpose.</p>
        <p>3) These tests are provided only for online examination practice purpose and no other purpose.</p>
        <p>4) These tests are just for giving the practice to Students for attempting the Online Examinations and take the experience about the Online Examination.</p>
        <p>5) We cannot give assurance that, the same questions will be available in your final examination.</p>
        <p>6) We cannot give assurance that, the same user interface will be there in your final examination.</p>
        <p>7) The User can attempt these tests through Mobile/ Laptop/ Desktop / Tablet by using browser. These Tests are not available through Mobile App.</p>
        <p>8)  Applicants are expected to furnish correct email-id and mobile-number in order to receive the various communications/updates from MKCL EXAM LIVE.</p>
        <p>9) Various communications in this process are system generated and are sent to the email id / mobile details provided by the Student. Student is required to ensure necessary settings with email service provider / mobile operator in order to receive these communications. As such, in case the Student doesn’t receive any of these communication on his/her email-id or mobile-number MKCL cannot be held responsible for the same.</p>
        <p>10) Student needs to complete the Practice test as per stipulated schedule and time only. Extension in time beyond stipulated time is not allowed.</p>
        <p>11)  MKCL reserves the right to modify the terms and conditions of this program and complete application process without any prior notice. MKCL shall not be liable to anyone for any such modification/s.</p>
        <p>12) MKCL reserves all rights related to this program.</p>
        <p>13) The jurisdiction of this program is Maharashtra state only.</p>
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
  name: 'TermsAndConditions',
  data: function () {
    return {
    }
  }
}
</script>

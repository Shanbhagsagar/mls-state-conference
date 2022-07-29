<template>
  <section id="login">
    <div class="card-login">
      <div class="row card-wrapper">
        <div class="col login-block">
          <a
            href="https://dnext.mkcl.org/"
            class="btn btn-back"
          >
            {{ $t('login.backToHome') }}
          </a>
          <router-link
            to="/login"
            class="btn btn-back btn-back-alt"
          >
            Back to Login
          </router-link>
          <div class="logo-wrapper logo-wrapper-alt">
            <!-- <div class="logo-title"><span>MKCL</span> Mock Exams</div> -->
            <!-- <img class="img-fluid" src="../../public/assets/images/emblem.png" alt="GOI">
            <img class="img-fluid" src="../../public/assets/images/logo.png" alt="Pune ZP">-->
            <!--<h1>MKCL EXAM LIVE</h1>-->
            <img
              class="img-fluid"
              src="../../../public/assets/images/bba-logo.png"
              alt="BBA @ Work Place"
            >
            <img
              class="img-fluid img-logo-alt"
              src="../../../public/assets/images/wns-logo-black.svg"
              alt="WNS"
            >
          </div>
          <!-- <div class="alert-warning">We are updating the portal, the Mock exams will start from Thursday 22nd October 2020 at 10.00 AM</div>
          <br> -->
          <div class="form-wrapper">
            <div class="welcome-holder">
              <div class="welcome-head">
                Thank You!
              </div>
              <div class="welcome-subhead">
                for registering with us.
              </div>
            </div>
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
export default {
  name: 'Success',
  data: function () {
    return {
    }
  }
}
</script>

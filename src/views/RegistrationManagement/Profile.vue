<template>
  <div class="content-area">
    <div class="title-holder">
      <div class="title-block">
        <h1 class="page-title">Applicant Profile</h1>
      </div>
    </div>
    <div class="content-area-alt">
      <div class="card-sinfo">
        <div class="row no-gutters">
          <div class="col-md-4 card-items">
            <div class="label">Applicant Name:</div>
            <div class="value">
              {{ userData.basic.fullName }}
            </div>
          </div>
          <div class="col-md-4 card-items">
            <div class="label">Gender:</div>
            <div class="value">
              {{ userData.basic.gender }}
            </div>
          </div>
          <div class="col-md-4 card-items">
            <div class="label">Date of Birth:</div>
            <div class="value">
              {{ userData.basic.dateOfBirth.slice(0, 11) }}
            </div>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="col-md-6 card-items">
            <div class="label">Mobile Number:</div>
            <div class="value">
              {{ userData.contact.mobileNumber }}
            </div>
          </div>
          <div class="col-md-6 card-items">
            <div class="label">Email ID:</div>
            <div class="value">
              {{ userData.contact.emailID }}
            </div>
          </div>
        </div>

        <div class="row no-gutters">
          <div class="col-md-4 card-items">
            <div class="label">State:</div>
            <div class="value">
              {{ userData.address.state }}
            </div>
          </div>
          <div class="col-md-4 card-items">
            <div class="label">District:</div>
            <div class="value">
              {{ userData.address.district }}
            </div>
          </div>
          <div class="col-md-4 card-items">
            <div class="label">Pincode:</div>
            <div class="value">
              {{ userData.address.pincode }}
            </div>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="col-md-12 card-items">
            <div class="label">Education Details:</div>
            <div class="value">
              {{ userData.qualification.qualificationName }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- ----------------------------------------------------------------- -->
<!-- ----------------------------------------------------------------- -->
<script>
import MQL from "@/plugins/mql.js";
export default {
  data() {
    return {
      mobileNumber: this.$store.state.userName,
      userData: {},
    };
  },
  async created() {
    const vm = this;
    vm.token = sessionStorage.getItem("user-token");
    await vm.getUserDetails();
  },
  methods: {
    getUserDetails() {
      new MQL()
        .setActivity("o.[query_29FEeTzI2PoubDvgSxG7KZY0T3X]")
        .setData({ userName: this.mobileNumber })
        .fetch()
        .then((rs) => {
          let res = rs.getActivity("query_29FEeTzI2PoubDvgSxG7KZY0T3X", true);
          if (rs.isValid("query_29FEeTzI2PoubDvgSxG7KZY0T3X")) {
            if (res !== null) {
              this.userData = res[0];
            }
          } else {
            rs.showErrorToast("query_29FEeTzI2PoubDvgSxG7KZY0T3X");
          }
        });
    },
  },
};
</script>
<!-- ----------------------------------------------------------------- -->
<!-- ----------------------------------------------------------------- -->
<style>
.isDisabled {
  color: currentColor;
  cursor: not-allowed;
  opacity: 0.5;
  text-decoration: none;
}
</style>
<!-- ----------------------------------------------------------------- -->
<!-- ----------------------------------------------------------------- -->

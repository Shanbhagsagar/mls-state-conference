<template>
  <div>
    <div style="padding: 70px 0px; margin: 30px;">
      <button v-on:click="goBackToLiasionList()" class="btn btn-page">
        <span style="font-size: 20px;">&#8592;</span> Go Back
      </button>
      <br />
      <br />
      <div class="form-group">
        <label class="control-label form-label">
          First Name
        </label>

        <input
          class="form-control"
          minLength="4"
          maxLength="100"
          v-model="laname"
          placeholder="Please Enter Your  Name"
          id="fullName"
        />
      </div>
      <div class="form-group">
        <label class="control-label form-label">
          Mobile Number
        </label>

        <input
          class="form-control"
          minLength="4"
          maxLength="100"
          v-model="mobileNo"
          placeholder="Please Enter Your Mobile No"
          id="MobileNo"
        />
      </div>
      <div class="form-group">
        <label class="control-label form-label">
          Email
        </label>

        <input
          class="form-control"
          minLength="4"
          maxLength="100"
          v-model="email"
          placeholder="Please Enter Your Mobile No"
          id="MobileNo"
        />
      </div>
      <div class="form-group">
        <label class="control-label form-label">
          Designation
        </label>

        <input
          class="form-control"
          minLength="4"
          maxLength="100"
          v-model="designation"
          placeholder="Please Enter Your designation"
          id="designation"
        />
      </div>

      <div class="form-group">
        <label class="control-label form-label">
          Address
        </label>

        <textarea
          class="form-control"
          minLength="4"
          maxLength="100"
          v-model="Address"
          placeholder="Please Enter Your Address"
          id="Address"
        />
      </div>
      <div class="form-group">
        <label class="control-label form-label">
          State
        </label>
        <v-select
          label="name"
          placeholder="Please Enter Your Mode of Travel"
          :options="states"
          v-model="selectedState"
        />
      </div>
      <button style="margin: 5px;" class="btn btn-page" v-on:click="submit()">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      delegateId: this.$route.params.delegateId,
      selectedStateId: this.$route.params.selectedStateId,
      states: [],
      laname: "",
      designation: "",
      Address: "",
      email: "",
      mobileNo: "",
      selectedState: null,
      selectedStateforDB: this.$route.params.selectedState,
      items: null,
      delegateName: this.$route.params.delegateName,
      designationName: this.$route.params.designationName,
    };
  },
  mounted() {
    this.fetchStates();
  },
  async created() {
    const vm = this;
    // await vm.getRegistrationCount();
    // await vm.getTakeExamCount();
    // await vm.getExamEndedCount();
    //  await vm.getAllla();
    // await vm.getExamNotEndedCount();
  },
  methods: {
    submit() {
      let lo = {
        name: this.laname,
        mobileNumber: this.mobileNo,
        designation: this.designation,
        email: this.email,
        delegate: this.delegateId,
        state: this.selectedState.id,
        address: this.Address,
      };

      let filledImpFields = false;

      for (const [key, value] of Object.entries(lo)) {
        console.log(`${key} ${value}`);
        if (value == "" || value == null) {
          filledImpFields = true;
        }
      }

      console.log(filledImpFields);

      if (filledImpFields === false) {
        axios
          .post(
            `${vm.$store.getters["getIpaddress"]}/laisionOfficer/createLaisionofficer`,
            lo
          )
          .then((response) => {
            //console.log(response);
            if (response != null) {
              this.$toasted.success(response.data, {
                theme: "bubble",
                position: "top-center",
                duration: 3000,
              });

              this.key += 1;
            }
          })
          .catch((err) => {
            this.$toasted.error("try again", {
              theme: "bubble",
              position: "top-center",
              duration: 3000,
            });
          });
      } else {
        this.$toasted.error("Fill all fields", {
          theme: "bubble",
          position: "top-center",
          duration: 3000,
        });
      }
    },

    goBackToLiasionList() {
      this.$router.push({
        name: "ViewLiasionOfficerList",
        params: {
          delegateId: this.delegateId,
          selectedStateId: this.selectedStateId,
          selectedState: this.selectedStateforDB,
          delegateName: this.delegateName,
          designationName: this.designationName,
        },
      });
    },
    fetchStates() {
      const vm = this;
      axios
        .get(`${vm.$store.getters["getIpaddress"]}/state/getAllStates`)
        .then((response) => {
          if (response.data != null) {
            vm.states = response.data;
            // console.log(this.states);
          } else {
            vm.$toasted.error(
              "Some error occurred. Kindly contact the administrator.",
              {
                theme: "bubble",
                position: "top-center",
                duration: 3000,
              }
            );
          }
        })
        .catch((error) => {
          console.log(error);
          vm.$toasted.error(error, {
            theme: "bubble",
            position: "top-center",
            duration: 3000,
          });
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style></style>

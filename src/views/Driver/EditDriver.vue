<template>
  <div>
    <div class="content-area">
      <div>
        <button v-on:click="goBackToLiasionList()" class="btn btn-page">
          <span style="font-size: 20px;">&#8592;</span> Go Back
        </button>
        <br />
        <br />
       <div class="form-group">
          <label class="control-label form-label">
            Full Name
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
        <!-- <div class="form-group">
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
        </div> -->

        <div class="form-group">
        <label class="control-label form-label">
          Vehicle Name
        </label>

        <input
          class="form-control"
          minLength="4"
          maxLength="100"
          v-model="vehicleName"
          placeholder="Please Enter Vehicle Name"
          id="vehicleName"
        />
      </div>

        <div class="form-group">
        <label class="control-label form-label">
          Vehicle Number
        </label>

        <input
          class="form-control"
          minLength="4"
          maxLength="100"
          v-model="vehicleNumber"
          placeholder="Please Enter Vehicle Name"
          id="vehicleNumber"
        />
      </div>

      <div class="form-group">
        <label class="control-label form-label">
          Any other Driver Details
        </label>

        <input
          class="form-control"
          minLength="4"
          maxLength="100"
          v-model="extraField"
          placeholder="Please Enter Vehicle Name"
          id="extraField"
        />
      </div>
        <!-- <div class="form-group">
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
        </div> -->

        <!-- <div class="form-group">
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
        </div> -->
        <!-- <div class="form-group">
          <label class="control-label form-label">
            State
          </label>
          <v-select
            label="name"
            placeholder="Please Enter Your Mode of Travel"
            :options="states"
            v-model="selectedState"
          />
        </div> -->
        <button style="margin: 5px;" class="btn btn-page" v-on:click="submit()">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// {{ this.$route.params.data }}
export default {
  data() {
    return {
      delegateId: this.$route.params.delegateId,
      states: [],
      id: this.$route.params.data.id,
      laname: this.$route.params.data.name,
      delegateName: this.$route.params.delegateName,
      designationName: this.$route.params.designationName,
      // designation: this.$route.params.data.designation,
      vehicleName: this.$route.params.data.vehicleName,
      vehicleNumber: this.$route.params.data.vehicleNumber,
      extraField:this.$route.params.data.extraField, 
      // Address: this.$route.params.data.address,
      // email: this.$route.params.data.email,
      mobileNo: this.$route.params.data.mobileNo,
      // selectedState: this.$route.params.data.state,
      selectedStateId: this.$route.params.selectedStateId,
      items: null,
      selectedStateforDB: this.$route.params.selectedState,
    };
  },
  mounted() {
    // this.fetchStates();
  },
  methods: {
    submit() {
      const vm = this
      let lo = {
        name: this.laname,
        mobileNo: this.mobileNo,
        // designation: this.designation,
        vehicleName : this.vehicleName,
        vehicleNumber: this.vehicleNumber,
        delegate: this.delegateId,
        extraField: this.extraField
        // state: this.selectedState.id,
        // address: this.Address,
      };

      console.log(lo);

      let filledImpFields = false;

      for (const [key, value] of Object.entries(lo)) {
        console.log(`${key} ${value}`);
        if (value == "" || value == null) {
          filledImpFields = true;
        }
      }

      // console.log(filledImpFields);

      if (filledImpFields === false) {
        axios
          .post(
            `${vm.$store.getters["getIpaddress"]}chauffer/editChauffer/${this.id}`,
            lo
          )
          .then((response) => {
            console.log(response);
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
      // console.log(this.selectedStateId);
      // console.log(this.selectedStateforDB);
      // console.log(this.delegateName);
      // console.log(this.designationName);
      this.$router.push({
        name: "ViewDriverList",
        params: {
          delegateId: this.delegateId,
          // selectedStateId: this.selectedStateId,
          selectedState: this.selectedStateforDB,
          delegateName: this.delegateName,
          designationName: this.designationName,
        },
      });
    },
    // fetchStates() {
    //   const vm = this;
    //   axios
    //     .get(`${vm.$store.getters["getIpaddress"]}/state/getAllStates`)
    //     .then((response) => {
    //       if (response.data != null) {
    //         vm.states = response.data;
    //         // console.log(this.states);
    //       } else {
    //         vm.$toasted.error(
    //           "Some error occurred. Kindly contact the administrator.",
    //           {
    //             theme: "bubble",
    //             position: "top-center",
    //             duration: 3000,
    //           }
    //         );
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       vm.$toasted.error(error, {
    //         theme: "bubble",
    //         position: "top-center",
    //         duration: 3000,
    //       });
    //       this.errored = true;
    //     })
    //     .finally(() => (this.loading = false));
    // },
    pushToLiasionOfficerPage(delegateId) {
      this.$router.push({
        name: "ViewDriverList",
        params: {
          delegateId: delegateId,
          // selectedStateId: this.selectedStateId,
          selectedState: this.selectedStateforDB,
          delegateName: this.delegateName,
          designationName: this.designationName,
        },
      });
    },
  },
};
</script>

<style></style>

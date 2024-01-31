<template>
  <div>
    <div style="padding: 70px 0px; margin: 30px;">
      <button v-on:click="goBackToList()" class="btn btn-page">
        <span style="font-size: 20px;">&#8592;</span> Go Back
      </button>
      <br />
      <br />
      <div class="form-group">
        <label class="control-label form-label">
          Hotel Name
        </label>

        <input
          class="form-control"
          minLength="4"
          maxLength="100"
          v-model="hotelname"
          placeholder="Please Enter Hotel  Name"
          id="fullName"
        />
      </div>
      <div class="form-group">
        <label class="control-label form-label">
          Room Number
        </label>

        <input
          class="form-control"
          minLength="4"
          maxLength="100"
          v-model="roomNo"
          placeholder="Please Enter Your Room No"
          id="MobileNo"
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
          Description
        </label>

        <textarea
          class="form-control"
          minLength="4"
          maxLength="100"
          v-model="description"
          placeholder="Please Enter Your Description"
          id="description"
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
// {{ this.$route.params.data }}
export default {
  data() {
    return {
      delegateId: this.$route.params.delegateId,
      states: [],
      id: this.$route.params.data.id,
      hotelname: this.$route.params.data.hotelName,
      description: this.$route.params.data.description,
      Address: this.$route.params.data.address,
      roomNo: this.$route.params.data.roomNo,
      selectedState: this.$route.params.data.state,
      selectedStateId: this.$route.params.selectedStateId,
      items: null,
      selectedStateforDB: this.$route.params.selectedState,
    };
  },
  mounted() {
    this.fetchStates();
  },
  methods: {
    submit() {
      const vm = this;
      let lo = {
        hotelName: this.hotelname,
        description: this.description,
        address: this.Address,
        roomNo: this.roomNo,
        delegate: this.delegateId,
      };

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
            `${vm.$store.getters["getIpaddress"]}accommodation/editAccommodation/${this.id}`,
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
    goBackToList() {
      this.$router.push({
        name: "AccommodationList",
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
        .get(`${vm.$store.getters["getIpaddress"]}state/getAllStates`)
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
          // console.log(error);
          vm.$toasted.error(error, {
            theme: "bubble",
            position: "top-center",
            duration: 3000,
          });
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    pushToLiasionOfficerPage(delegateId) {
      this.$router.push({
        name: "AccommodationList",
        params: {
          delegateId: delegateId,
          selectedStateId: this.selectedStateId,
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

<template>
  <div>
    <div class="row card-wrapper">
      <div class="col login-block">
        <div class="card-form">
          <div class="row">
            <div class="d-block text-center">
              <div size="50" class="user">
                <div class="col-md-12 col-lg-4">
                  <div class="form-group">
                    <label class="control-label form-label">
                      First Name
                    </label>

                    <input
                      oninput="this.value=this.value.replace(/[^[a-zA-Z.-.'-'\s]/g,'');"
                      class="form-control"
                      minLength="4"
                      maxLength="100"
                      v-model="firstname"
                      placeholder="Please Enter Your Middle Name"
                      id="fullName"
                    />
                  </div>
                </div>
                <div class="col-md-12 col-lg-4">
                  <div class="form-group">
                    <label class="control-label form-label">
                      last Name
                    </label>

                    <input
                      oninput="this.value=this.value.replace(/[^[a-zA-Z.-.'-'\s]/g,'');"
                      class="form-control"
                      minLength="4"
                      maxLength="100"
                      v-model="lastname"
                      placeholder="Please Enter Your Middle Name"
                      id="fullName"
                    />
                  </div>
                </div>

                <div class="col-md-12 col-lg-4">
                  <div class="form-group">
                    <label class="control-label form-label">
                      username
                    </label>

                    <input
                      oninput="this.value=this.value.replace(/[^[a-zA-Z.-.'-'\s]/g,'');"
                      class="form-control"
                      minLength="4"
                      maxLength="100"
                      v-model="username"
                      placeholder="Please Enter Your Middle Name"
                      id="fullName"
                    />
                  </div>
                </div>
                <div class="col-md-12 col-lg-4">
                  <div class="form-group">
                    <label class="control-label form-label">
                      password
                    </label>

                    <input
                      class="form-control"
                      minLength="4"
                      maxLength="100"
                      v-model="password"
                      placeholder="Please Enter Your Middle Name"
                      id="fullName"
                    />
                  </div>
                </div>

                <div class="col-md-12 col-lg-4">
                  <div class="form-group">
                    <label class="control-label form-label">
                      state
                    </label>

                    <v-select
                      label="name"
                      placeholder="Please Enter Your Mode of Travel"
                      :options="states"
                      v-model="selectedState"
                    />
                  </div>
                  <button
                    type="button"
                    class="btn btn-page"
                    @click="createUser()"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>

            <!-- <img @click="openFileInput" class="profile-user-img img-circle" :src="profilePictureUrl ? profilePictureUrl : '../../../public/assets/images/no-image-icon-23485.png'" alt="User"/> -->
          </div>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Toasted from "vue-toasted";
export default {
  data() {
    return {
      id: "",
      firstname: "",
      lastname: "",
      username: "",
      password: "",

      states: [],
      selectedState: null,
    };
  },
  mounted() {
    this.fetchStates();
  },
  methods: {
    fetchStates() {
      const vm = this;
      axios
        .get(`${vm.$store.getters["getIpaddress"]}state/getAllStates`)
        .then((response) => {
          if (response.data != null) {
            vm.states = response.data;
            console.log(this.states);
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
    createUser() {
      let vm = this;
      let user = {
        username: this.username,
        password: this.password,
        firstName: this.firstname,
        lastName: this.lastname,
        stateId: this.selectedState.id,
      };

      axios
        .post(`${vm.$store.getters["getIpaddress"]}user/createUser`, user)
        .then((response) => {
          if (response.data != null) {
            vm.$toasted.success("Created.", {
              theme: "bubble",
              position: "top-center",
              duration: 3000,
            });
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
        });
    },
  },
  //:options="delegateDesignation"
  //                   :value="delegates[0].designation.name"
};
</script>

<style></style>

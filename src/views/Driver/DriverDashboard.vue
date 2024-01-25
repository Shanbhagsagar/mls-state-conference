<template>
  <div class="content-area">
    <div class="card-form">
      <div class="form-group col-md-4">
        <label class="control-label form-label">
          State
        </label>
        <!-- <b-form-select
          v-model="selected"
          :options="states"
          value-field="id"
          text-field="name"
          v-on:change="getSelectedItem"
        ></b-form-select> -->

        <v-select
          label="name"
          placeholder="Please Select State"
          :options="states"
          v-model="selectedState"
          @input="getSelectedItem"
        />
      </div>

      <a
        href="javascript:void(0)"
        type="button"
        class="btn btn-danger btn-lg form-label"
        @click="getReport(selectedState)"
      >
        Report
      </a>

      <div class="card-header card-header-alt mt-0">
        <h1 class="page-title">Delegates's List:</h1>
      </div>
      <div v-if="delegates.length != 0">
        <div v-for="(delegate, index) in delegates" :key="index">
          <div class="card">
            <div class="card-body">
              <div class="float-child">
                <h4 class="font-weight-bold">
                  Delegate Name: {{ delegates[index].title.name }}
                  {{ delegates[index].firstname }}
                  {{ delegates[index].lastname }}
                </h4>
                <h5 class="font-weight-normal">
                  <b>Delegate's Designation:</b>&nbsp;&nbsp;<span
                    v-if="delegates[index].designation.name != ''"
                    ><span
                      v-if="delegates[index].designation.name == 'Other'"
                      >{{ delegates[index].designationName }}</span
                    ><span v-else>{{
                      delegates[index].designation.name
                    }}</span></span
                  ><span v-else> -</span>
                </h5>
                <h5 class="font-weight-normal">
                  <b>Delegate's State :</b> {{ delegates[index].state.name }}
                </h5>
                <h5 class="font-weight-normal">
                  <b>Email:</b>&nbsp;&nbsp;<span
                    v-if="delegates[index].email != ''"
                    >{{ delegates[index].email }}</span
                  ><span v-else> -</span>&nbsp;&nbsp;&nbsp;<b>Mobile Number:</b
                  >&nbsp;&nbsp;<span v-if="delegates[index].mobileNo != ''">{{
                    delegates[index].mobileNo
                  }}</span
                  ><span v-else> -</span>
                </h5>
                <h5 class="font-weight-normal">
                  <b>Delegate's Spouse Name:</b>&nbsp;&nbsp;<span
                    v-if="delegates[index].family.length != 0"
                    >{{ delegates[index].family[0].name }}</span
                  ><span v-else> -</span>
                </h5>

                <div class="form-action-alt">
                  <button
                    type="button"
                    class="btn btn-page"
                    @click="
                      pushToChauffeursPage(
                        delegate.id,
                        `${delegate.title.name} ${delegate.firstname} ${delegate.lastname}`,
                        delegate.designation.name
                      )
                    "
                  >
                    Add Driver
                  </button>
                </div>
              </div>
              <div class="float-child">
                <div class="blue">
                  <h2>Assigned Driver</h2>
                  <p v-if="delegates[index].chauffeurs.length == 0">
                     No Driver Assigned
                  </p>

                  <ul
                    v-if="
                      delegates[index] != null &&
                      delegates[index].chauffeurs
                    "
                  >
                    <li
                      v-for="lo in delegates[index].chauffeurs"
                      :key="lo.id"
                    >
                      Name - <b>{{ lo.name }} &nbsp;&nbsp;&nbsp;</b> MobileNo -
                      <b>{{ lo.mobileNo }}</b>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
      <div v-else>
        <div class="card-header card-header-alt mt-0">
          No List Available
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      delegates: [],
      states: [],
      selectedState: null,
      selectedStateId: 0,
    };
  },
  mounted() {
    this.fetchStates();
    //this.selectedStateId = this.$route.params.selectedStateId;
  },
  created() {
    this.selectedStateId = this.$route.params.selectedStateId;
    this.selectedState = this.$route.params.selectedState;
    if (this.selectedStateId === undefined || this.selectedState === null) {
      console.log("not fired");
      this.fetchDelegatesList();
      console.log(this.selectedStateId);
    } else {
      console.log("stateFunc fired");
      this.fetchDelegatesByStateId(this.selectedStateId);
    }
  },
  methods: {
    getReport(selectedState) {
      this.$router.push({
        name: "DriverReport",
        params: {
          delegates: this.delegates,
          selectedStateId: this.selectedStateId,
          selectedState: this.selectedState,
        },
      });
    },
    getSelectedItem(e) {
      const vm = this;
      this.selectedStateId = e.id;
      //console.log(e);
      axios
        .get(
          `${vm.$store.getters["getIpaddress"]}delegate/getAllDelegatesByStateId/${this.selectedStateId}`
        )
        .then((response) => {
          this.delegates = response.data;
          this.delegates.forEach((value) => {
            axios
              .get(
                `${vm.$store.getters["getIpaddress"]}chauffer/getLimitedChaufferForDelegate/${value.id}`
              )
              .then((response) => {
                if (response != null) {
                  value.chauffeurs = response.data;
                }
              });
            console.log(value);
          });
        });
    },
    fetchDelegatesByStateId(stateId) {
      const vm = this;
      axios
        .get(
          `${vm.$store.getters["getIpaddress"]}delegate/getAllDelegatesByStateId/${stateId}`
        )
        .then((response) => {
          this.delegates = response.data;
          // console.log("hi");
          // this.delegates.forEach((value) => {
          //   axios
          //     .get(
          //       `${vm.$store.getters["getIpaddress"]}chauffer/getLimitedChaufferForDelegate/${value.id}`
          //     )
          //     .then((response) => {
          //       if (response != null) {
          //         value.chauffeurs = response.data;
          //       }
          //     });
          //   console.log(value);
          // });
        });
    },
    fetchDelegatesList() {
      const vm = this;
      axios
        .get(`${vm.$store.getters["getIpaddress"]}delegate/getAllDelegates`)
        .then((response) => {
          // console.log(response);
          if (response.data != null) {
            vm.delegates = response.data;

            // this.delegates.forEach((value) => {
            //   axios
            //     .get(
            //       `${vm.$store.getters["getIpaddress"]}chauffer/getLimitedChaufferForDelegate/${value.id}`
            //     )
            //     .then((response) => {
            //       if (response != null) {
            //         value.chauffeurs = response.data;
            //       }
            //     });
            //   //console.log(value);
            // });

            // console.log("Data: "+vm.delegates);
          } else {
            this.$toasted.error(
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
          this.$toasted.error(error, {
            theme: "bubble",
            position: "top-center",
            duration: 3000,
          });
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    pushToChauffeursPage(delegateId, delegateName, designationName) {
      console.log(delegateId);
      this.$router.push({
        name: "ViewDriverList",
        params: {
          delegateId: delegateId,
          selectedStateId: this.selectedStateId,
          selectedState: this.selectedState,
          delegateName: delegateName,
          designationName: designationName,
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
//vm.$store.getters["getIpaddress"]
</script>

<style>
.profile-card:hover {
  height: 150px;
  top: -10px;
  transition: 0.5s;
  cursor: pointer;
}

.dashboard {
  margin-left: 0%;
}
.float-container {
  border: 3px solid #fff;
  padding: 20px;
}

.float-child {
  width: 50%;
  float: left;
  padding: 20px;
}
</style>

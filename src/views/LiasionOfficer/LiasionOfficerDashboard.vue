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
          placeholder="Please Enter Your Mode of Travel"
          :options="states"
          v-model="selectedState"
          @input="getSelectedItem"
        />
      </div>

      <div class="card-header card-header-alt mt-0">
        <h1 class="page-title">Delegates's List:</h1>
      </div>
      <div v-if="delegates.length != 0">
        <div v-for="(delegate, index) in delegates" :key="index">
          <div class="card">
            <div class="card-body">
              <h4 class="font-weight-bold">
                Delegate Name: {{ delegates[index].title.name }}
                {{ delegates[index].firstname }} {{ delegates[index].lastname }}
              </h4>
              <h5 class="font-weight-normal">
                <b>Delegate's Designation:</b>&nbsp;&nbsp;<span
                  v-if="delegates[index].designation.name != ''"
                  ><span v-if="delegates[index].designation.name == 'Other'">{{
                    delegates[index].designationName
                  }}</span
                  ><span v-else>{{
                    delegates[index].designation.name
                  }}</span></span
                ><span v-else> -</span>
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
                    pushToLiasionOfficerPage(
                      delegate.id,
                      `${delegate.title.name} ${delegate.firstname} ${delegate.lastname}`,
                      delegate.designation.name
                    )
                  "
                >
                  Add Liasion Officer
                </button>
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
    if (this.selectedStateId == null) {
      this.fetchDelegatesList();
    } else {
      this.fetchDelegatesByStateId(this.selectedStateId);
    }

    this.fetchStates();
    //this.selectedStateId = this.$route.params.selectedStateId;
  },
  created() {
    this.selectedStateId = this.$route.params.selectedStateId;
    this.selectedState = this.$route.params.selectedState;
  },
  methods: {
    getSelectedItem(e) {
      const vm = this;
      this.selectedStateId = e.id;
      console.log(e);
      axios
        .get(
          `http://localhost:6969/delegate/getAllDelegatesByStateId/${this.selectedStateId}`
        )
        .then((response) => {
          this.delegates = response.data;
        });
    },
    fetchDelegatesByStateId(stateId) {
      axios
        .get(
          `http://localhost:6969/delegate/getAllDelegatesByStateId/${stateId}`
        )
        .then((response) => {
          this.delegates = response.data;
        });
    },
    fetchDelegatesList() {
      const vm = this;
      axios
        .get(`http://localhost:6969/delegate/getAllDelegates`)
        .then((response) => {
          // console.log(response);
          if (response.data != null) {
            vm.delegates = response.data;
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
    pushToLiasionOfficerPage(delegateId, delegateName, designationName) {
      console.log(delegateName);
      this.$router.push({
        name: "ViewLiasionOfficerList",
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
        .get(`http://localhost:6969/state/getAllStates`)
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
</style>

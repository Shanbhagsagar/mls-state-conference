<template>
  <div>
    <div style="padding: 70px 0px;">
      <div class="rcorners2" style="padding-bottom: 50px;">
        <span style="padding-right: 20px; font-size: 20px;"
          >Delegate Name - <b>{{ this.$route.params.delegateName }}</b></span
        >
        <span style="padding-right: 20px; font-size: 20px;"
          >Designation - <b>{{ this.$route.params.designationName }}</b></span
        >

        <span
          v-if="this.$route.params.selectedState !== undefined"
          style="padding-right: 20px; font-size: 20px;"
          >State -<b>{{ this.$route.params.selectedState.name }}</b></span
        >
      </div>

      <button
        style="margin-right: 5px;"
        v-on:click="goBackToDashBoard()"
        class="btn btn-page"
      >
        <span style="font-size: 20px;">&#8592;</span> Go Back
      </button>
      <button
        style="margin: 5px;"
        class="btn btn-page"
        v-on:click="createLiasionOfficer()"
      >
        Assign new liasion Officer
      </button>
      <button style="margin: 5px;" v-on:click="editUser()" class="btn btn-page">
        Edit liasion Details
      </button>
      <div class="rcorners3">
        <span style="padding-right: 20px; font-size: 20px; text-align: center;"
          >Liasion List
        </span>
      </div>
      <h1 v-if="items.length == 0">
        <div class="center">
          No List Present
        </div>
      </h1>
      <div>
        <b-table
          id="lotable"
          striped
          bordered
          hover
          :select-mode="selectMode"
          responsive="sm"
          selectable
          :items="items"
          ref="table"
          @row-selected="onRowSelected"
        ></b-table>
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
      liasionOfficer: [],
      delegateId: this.$route.params.delegateId,
      selectedStateId: this.$route.params.selectedStateId,
      selectedStateDB: this.$route.params.selectedState,
      states: [],
      delegateName: this.$route.params.delegateName,
      designationName: this.$route.params.designationName,
      laname: "",
      designation: "",
      Address: "",
      email: "",
      mobileNo: "",
      selectedState: null,
      selectMode: "single",
      items: null,
      selected: null,
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
    await vm.getAllla();
    // await vm.getExamNotEndedCount();
  },
  methods: {
    onRowSelected(items) {
      this.selected = items;
      console.log(this.selected);
    },
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

      //console.log(filledImpFields);

      if (filledImpFields === false) {
        axios
          .post(
            `${vm.$store.getters["getIpaddress"]}laisionOfficer/createLaisionofficer`,
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
    getAllla() {
      let vm = this;
      axios
        .get(
          `${vm.$store.getters["getIpaddress"]}laisionOfficer/getAllLiasionOfficerForThatDelegate/${this.delegateId}`
        )
        .then((response) => {
          //console.log(response);
          if (response != null) {
            for (let item of response.data) {
              item.delegate = `${item.delegate.firstname} ${item.delegate.lastname}`;
              item.state = item.state.name;
            }
            this.items = response.data;
          }
        });
    },
    goBackToDashBoard() {
      this.$router.push({
        name: "LiasionOfficerDashboard",
        params: {
          selectedStateId: this.selectedStateId,
          selectedState: this.selectedStateDB,
          delegateName: this.delegateName,
          designationName: this.designationName,
        },
      });
    },
    createLiasionOfficer() {
      this.$router.push({
        name: "NewLiasionOfficer",
        params: {
          delegateId: this.delegateId,
          selectedStateId: this.selectedStateId,
          selectedState: this.selectedStateDB,
          delegateName: this.delegateName,
          designationName: this.designationName,
        },
      });
    },
    editUser() {
      const vm = this;
      // console.log(this.selected);
      let loId = this.selected[0].id;
      console.log(this.selected[0].id);

      axios
        .get(
          `${vm.$store.getters["getIpaddress"]}laisionOfficer/getLaisionOfficerById/${loId}`
        )
        .then((response) => {
          if (response.data != null) {
            this.$router.push({
              name: "EditLiasionOfficer",
              params: { data: response.data, delegateId:this.delegateId },
            });
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
</script>

<style>
#lotable > thead > tr > th {
  font-size: 30px;
}
#lotable > tbody > tr > td {
  font-size: 20px;
}
.rcorners2 {
  border-radius: 25px;
  border: 2px solid;
  padding: 20px;
  width: auto;
  height: 70px;
  padding-bottom: 20px;
}

.rcorners3 {
  border-radius: 25px;
  border: 2px solid peachpuff;
  padding: 20px;
  width: auto;
  height: 70px;
}

.center {
  margin: auto;
  width: 50%;
  border: 3px solid peachpuff;
  padding: 10px;
}
</style>

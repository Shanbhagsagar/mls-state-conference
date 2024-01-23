<template>
  <div>
    <button v-on:click="createUser()" class="btn btn-page">
      Create User Details
    </button>
    <button v-on:click="editUser()" class="btn btn-page">
      Edit User Details
    </button>
    <br/> <br/>
    <div>
      <b-table
        striped
        hover
        :fields="fields"
        :select-mode="selectMode"
        responsive="sm"
        ref="selectableTable"
        selectable
        @row-selected="onRowSelected"
        :items="items"
      ></b-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Toasted from "vue-toasted";
export default {
  data() {
    return {
      items: null,
      selectMode: "single",
      selected: null,
    };
  },
  methods: {
    getAllDelegates() {
      let vm = this;
      axios
        .get(`${vm.$store.getters["getIpaddress"]}user/getAllUsers`)
        .then((response) => {
          console.log(response);
          if (response != null) {
            for (let item of response.data) {
              delete item.password;
              delete item.stateId;
            }
            this.items = response.data;
          }
        });
    },
    onRowSelected(items) {
      this.selected = items;
      console.log(this.selected);
    },
    editUser() {
      let vm = this;

      let userID = this.selected[0].id;

      axios
        .get(`${vm.$store.getters["getIpaddress"]}user/getUserById/${userID}`)
        .then((response) => {
          console.log(response.data);
          this.$router.push({
            name: "EditUserDetail",
            params: { data: response.data },
          });
        })
        .catch((err) => {
          vm.$toasted.error("Unable to Edit Record", {
            theme: "bubble",
            position: "top-center",
            duration: 3000,
          });
        });
    },
    changeItem(array, index, newValue) {
      return [...array.slice(0, index), newValue, ...array.slice(index + 1)];
    },
    createUser() {
      this.$router.push({
        name: "CreateNewUser",
      });
    },
  },
  async created() {
    const vm = this;
    // await vm.getRegistrationCount();
    // await vm.getTakeExamCount();
    // await vm.getExamEndedCount();
    await vm.getAllDelegates();
    // await vm.getExamNotEndedCount();
  },
};
</script>

<style></style>

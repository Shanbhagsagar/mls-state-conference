<template>
  <div>
    <b-button variant="dark">Button</b-button>
    <button v-on:click="changeMessage()" class="btn btn-outline-dark">
      print Message
    </button>

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
        .get("http://localhost:6969/admin/getAllDelegatesForAdmin")
        .then((response) => {
          console.log(response);
          if (response != null) {
            vm.items = response.data;
          }
        });
    },
    onRowSelected(items) {
      this.selected = items;
      // console.log(this.selected);
    },
    changeMessage() {
      let vm = this;

      let delegateId = this.selected[0].id;
      console.log(delegateId);
      axios
        .get(`http://localhost:6969/delegate/getDelegateData/${delegateId}`)
        .then((response) => {
          console.log(response.data);
          this.$router.push({
            name: "EditDelegateDetail",
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

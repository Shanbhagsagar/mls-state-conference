<template>
  <div class="content-area1">
    <button
      style="margin-right: 5px;"
      v-on:click="goBackToDashboard()"
      class="btn btn-page"
    >
      <span style="font-size: 20px;">&#8592;</span> Go Back
    </button>
    <div class="center">
      <b
        v-if="
          selectedState !== null &&
          selectedState !== undefined &&
          selectedState.name !== null &&
          selectedState.name !== undefined
        "
        >List Of {{ selectedState.name }} Delegates</b
      >
      <b v-else> List Of All Delegates</b>
    </div>
    <p>Created On - {{ currDate }}</p>
    <br />

    <div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th
              class="border border-dark bg-secondary text-center"
              v-for="(header, key) in headers"
              :key="key"
            >
              <b>{{ header.key }}</b>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in delegates">
            <td width="1%" class="border border-dark">
              {{ index + 1 }}
            </td>
            <td width="10%" class="border border-dark">
              <!-- <span
                v-if="
                  item.photo != null &&
                  item.photo != '' &&
                  item.photo != undefined &&
                  item.photo.id != null &&
                  item.photo.id != undefined &&
                  item.photo.id != ''
                "
                ><img
                  :src="
                    `${getIpUrl}` + `photo/downloadFile/` + `${item.photo.id}`
                  "
                  width="85"
                  height="85" /></span
              ><span v-else>-</span> -->
              <p>
                <b> {{ item.designationName }}</b>
              </p>
              <p>
                <b>{{ item.state.name }}</b>
              </p>
              <p>
                <b>
                  {{ item.title.name }} {{ item.firstname }}
                  {{ item.lastname }}</b
                >
              </p>

              <p>
                <b> {{ item.mobileNo }}</b>
              </p>
              <p>
                <b> {{ item.email }}</b>
              </p>
            </td>
            <td width="10%" class="border border-dark">
              <!-- <span
                v-if="
                  item.family.length > 0 &&
                  item.family[0].photo != null &&
                  item.family[0].photo != '' &&
                  item.family[0].photo != undefined &&
                  item.family[0].photo.id != null &&
                  item.family[0].photo.id != undefined &&
                  item.family[0].photo.id != ''
                "
                ><img :src=" `${vm.$store.getters["getIpaddress"]}/` +
                `photo/downloadFile/` + `${item.family[0].photo.id}` "
                width="85" height="85" /></span
              ><span v-else>-</span> -->

              <p
                v-if="
                  item.family.length > 0 &&
                  item.family[0].name != null &&
                  item.family[0].name != '' &&
                  item.family[0].name != undefined &&
                  item.family[0].title.name != null &&
                  item.family[0].title.name != '' &&
                  item.family[0].title.name != undefined
                "
              >
                <b
                  >{{ item.family[0].title.name }} {{ item.family[0].name }}
                </b>
              </p>
              <p v-else>-</p>
              <p
                v-if="
                  item.family.length > 0 &&
                  item.family[0].mobileNo != null &&
                  item.family[0].mobileNo != '' &&
                  item.family[0].mobileNo != undefined
                "
              >
                <b> {{ item.family[0].mobileNo }} </b>
              </p>
              <p v-else>-</p>
              <p
                v-if="
                  item.family.length > 0 &&
                  item.family[0].email != null &&
                  item.family[0].email != '' &&
                  item.family[0].email != undefined
                "
              >
                <b> {{ item.family[0].email }} </b>
              </p>
              <p v-else>-</p>
            </td>
            <td width="10%" class="border border-dark">
              <p v-if="item.accommodation.length == 0">
                No Accommodation Assigned
              </p>
              <ul v-if="item != null && item.accommodation">
                <li v-for="lo in item.accommodation" :key="lo.id">
                  <p>
                    <b>{{ lo.hotelName }} </b>
                  </p>

                  <p>
                    Address -
                    <b>{{ lo.address }}</b>
                  </p>
                  <p>
                    Description -
                    <b>{{ lo.description }}</b>
                  </p>
                  <hr />
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      delegates: this.$route.params.delegates,

      selectedStateId: this.$route.params.selectedStateId,
      selectedState: this.$route.params.selectedState,
      currDate: "",
      headers: [
        { key: "Sr.No" },
        { key: "Delegate" },
        { key: "Spouse" },
        { key: "Liasion Officer" },
      ],
    };
  },
  mounted() {
    this.displayGeneratedDateAndTime();
  },
  methods: {
    goBackToDashboard() {
      this.$router.push({
        name: "AccommodationDashboard",
        params: {
          delegates: this.delegates,
          selectedStateId: this.selectedStateId,
          selectedState: this.selectedState,
        },
      });
    },
    displayGeneratedDateAndTime() {
      let vm = this;

      axios
        .get(
          vm.$store.getters["getIpaddress"] + "utility/getCurrentDateAndTime"
        )
        .then((response) => {
          vm.currDate = response.data;
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
};
</script>

<style>
.content-area1 {
  padding: 70px 50px;
  min-height: 100vh;
}
.center {
  margin: auto;
  width: 50%;
  border: 3px solid peachpuff;
  padding: 10px;
}
</style>

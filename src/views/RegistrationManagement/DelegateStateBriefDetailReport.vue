<template>
    <div class="content-area1">
      <!-- <button
        style="margin-right: 5px;"
        v-on:click="goBackToDashboard()"
        class="btn btn-page"
      >
        <span style="font-size: 20px;">&#8592;</span> Go Back
      </button> -->
      <!-- {{delegates}} -->
      <!-- <v-select
          label="name"
          placeholder="Please Select State"
          :options="states"
          v-model="selectedState"
          @input="getSelectedItem($event,currentPage)"
        /><br/> -->

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
                <!-- {{ item }} -->
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
                  > {{item.photo.id}}
              <img
                    :src="loadImage(
                      `${getIpUrl}` + `photo/downloadFile/` + `${item.photo.id}`
                    )"
                    width="85"
                    height="85" /> 
                    </span
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
                <p v-if="item.liaisonOfficers.length == 0">
                  No Liasion Officer Assigned
                </p>
                <ul v-if="item != null && item.liaisonOfficers">
                  <li v-for="lo in item.liaisonOfficers" :key="lo.id">
                    <p>
                      <b>{{ lo.name }}</b>
                    </p>
  
                    <p>
                      MobileNo -
                      <b>{{ lo.mobileNumber }}</b>
                    </p>
                    <p>
                      Designation Name -
                      <b>{{ lo.designation }}</b>
                    </p>
                    <p>
                      Email -
                      <b>{{ lo.email }}</b>
                    </p>
                    <p>
                      Address -
                      <b>{{ lo.address }}</b>
                    </p>
                    <hr />
                  </li>
                </ul>
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
                  >{{item.family[0].photo.id}}
                  <img :src="
                      `${getIpUrl}` + `photo/downloadFile/` + `${item.family[0].photo.id}`
                    "
                  width="85" height="85" />
                  </span>
                <span v-else>-</span> -->
  
                <!-- <p
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
                <p v-else>-</p> -->
                <!-- <p
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
                <p v-else>-</p> -->
              </td>
              <td width="10%" class="border border-dark">
                <p v-if="item.accommodation.length == 0">
                  No Accomodation Assigned
                </p>
                <ul v-if="item != null && item.accommodation">
                  <li v-for="lo in item.accommodation" :key="lo.id">
                    <p>
                      <b>{{ lo.hotelName }}</b>
                    </p>
  
                    <p>
                      Room No. -
                      <b>{{ lo.roomNo }}</b>
                    </p>
                    <p>
                      Address -
                      <b>{{ lo.address }}</b>
                    </p>
                    <p>
                      Description -
                      <b>{{ lo.description }}</b>
                    </p>
                    <p>
                      Any Other Detail -
                      <b>{{ lo.other }}</b>
                    </p>
                    <hr />
                  </li>
                </ul>
              </td>
              <td width="10%" class="border border-dark">
                <p v-if="item.chauffeurs.length == 0">
                  No Driver Assigned
                </p>
                <ul v-if="item != null && item.chauffeurs">
                  <li v-for="lo in item.chauffeurs" :key="lo.id">
                    <p>
                      <b>{{ lo.name }}</b>
                    </p>
  
                    <p>
                      MobileNo -
                      <b>{{ lo.mobileNo }}</b>
                    </p>
                    <p>
                      Vehicle Name -
                      <b>{{ lo.vehicleName }}</b>
                    </p>
                    <p>
                      Vehicle Number -
                      <b>{{ lo.vehicleNumber }}</b>
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
        delegates: null,
        getIpUrl: this.$store.getters['getIpaddress'],
        selectedStateId: this.$route.params.selectedStateId,
        selectedState: this.$route.params.selectedState,
        currDate: "",
        headers: [
          { key: "Sr.No" },
          { key: "Delegate" },
          { key: "Liasion Officer" },
          { key: "Accomodation" },
          { key: "Driver" },
        ],
      };
    },
    mounted() {
      this.displayGeneratedDateAndTime();
      this.getDelegatesByStateId();
      // this.loadImages();
    },
    // async created(){
    //     const vm = this;
    //     if(this.$store.state.authData.state.id != null && this.$store.state.authData.state.id != '' && this.$store.state.authData.state.id != undefined){
    //             this.selectedStateId = this.$store.state.authData.state.id;
    //             this.selectedState = this.$store.state.authData.state.name;
    //      }
    // },
    methods: {
      // async loadImages() {
      //   try {
      //     for (const delegate of this.delegates) {
      //       await this.loadImage(delegate);
      //     }
      //   } catch (error) {
      //     console.error('Error loading images:', error);
      //   }
      // },
      // async loadImage(delegate) {
      //   try {
      //     const loadedUrl = await this.downloadImage("http://172.1.0.165:6969/photo/downloadFile/226");
      //     this.$set(delegate, 'loadedUrl', loadedUrl);
      //   } catch (error) {
      //     console.error(`Error loading image with id ${imageObject.id}:`, error);
      //   }
      // },
      // async downloadImage(imageSrc) {
      //   const image = await fetch(imageSrc);
      //   const imageBlob = await image.blob();
      //   const imageURL = URL.createObjectURL(imageBlob);
      //   return imageURL;
      // }, 
      goBackToDashboard() {
        console.log(this.selectedStateId);
        console.log(this.selectedState);
        this.$router.push({
          name: "ViewDelegatesDetails",
          params: {
            selectedStateId: this.selectedStateId,
            selectedState: this.selectedState,
          },
        });
      },
      getDelegatesByStateId() {
      let vm = this;
      axios
        .get(vm.getIpUrl+"delegate/getAllDelegatesByStateId/"+this.selectedStateId)
        .then((response) => {
          if (response != null) {
            vm.delegates = response.data;
          }
        })
        .catch(error => {
          console.error('Error fetching data from the API:', error);
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
  
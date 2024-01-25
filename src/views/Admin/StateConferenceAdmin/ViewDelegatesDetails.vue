<template>
  <div>
  <h1>All Delegate's Details</h1>
  <h6> Generated on : {{showGeneratedTime}}</h6> &nbsp;&nbsp;&nbsp;
      <v-select
          label="name"
          placeholder="Please Select State"
          :options="states"
          v-model="selectedState"
          @input="getSelectedItem($event,currentPage)"
        /><br/>
   <p>     
   <h6><b> Liasison Officer/ Hotel/ Accomodation Delegate Detail Report : </b>
    &nbsp;&nbsp;&nbsp;
   <button
        style="margin-right: 5px;"
        v-on:click="goToReport(selectedState)"
        class="btn btn-page"
      >
        <!-- <span style="font-size: 20px;">&#8592;</span> Report -->
        Report 
      </button>
    </h6>        
   </p>
   <br/>
   <table class="table table-bordered">
    <thead>
      <tr>
        <th class="border font-weight-bold border-dark bg-secondary text-center" v-for="(header,key) in headers" :key="key">
          <h3>{{ header.key }}</h3>
        </th>
      </tr>
    </thead>
    <tbody>
     <tr v-for="(item,index) in items" v-bind:key="item.id">
            <td style="font-size: large;" class="border border-dark">{{((currentPage+1)*10)-10 + index+1}}</td>
            <td style="font-size: large;" class="border border-dark">{{ item.state.name }}</td>
            <td style="font-size: large;" class="border border-dark">{{ item.designationName }}</td>
            <td style="font-size: large;" class="border border-dark"><span v-if="item.photo != null && item.photo != '' && item.photo != undefined && item.photo.id != null && item.photo.id != undefined && item.photo.id != ''">
              <!-- <img :src="`${getIpUrl}`+`photo/downloadFile/`+`${item.photo.id}`" width="85" height="85"/></span> -->
              <img src="#"
                 v-bind:id="`photo_${item.photo.id}`"
                 ref="photoEl"
                 :title="`${item.state.name}_${item.firstname}_${item.lastname}`"
                 height="85px" width="85px"/>
                 <span v-if="role == 'Admin' || role == 'PrincipalSecretary' || role == 'Other2'">
                  <i @click="downloadImage(item.photo.id,item.photo.filName)" class="hovereffect bi bi-download"></i>
                 </span>
            </span>
              <span v-else>-</span>
            </td> 
            <td style="font-size: large;" class="border border-dark">{{item.title.name}} {{item.firstname}} {{item.lastname}}</td>
            <td style="font-size: large;" class="border border-dark">{{item.mobileNo}}</td>
            <td style="font-size: large;" class="border border-dark">{{item.email}}</td>
            <td style="font-size: large;" class="border border-dark"><span v-if="item.travelDetail.length > 0 && item.travelDetail[0].arrivalTravelMode.name != null && item.travelDetail[0].arrivalTravelMode.name != '' && item.travelDetail[0].arrivalTravelMode.name != undefined">{{item.travelDetail[0].arrivalTravelMode.name}}</span><span v-else>-</span></td>
            <td style="font-size: large;" class="border border-dark"><span v-if="item.travelDetail.length > 0 && item.travelDetail[0].arrivalVehicleNumber != null && item.travelDetail[0].arrivalVehicleNumber != '' && item.travelDetail[0].arrivalVehicleNumber != undefined">{{item.travelDetail[0].arrivalVehicleNumber}}</span><span v-else>-</span></td>
            <td style="font-size: large;" class="border border-dark"><span v-if="item.travelDetail.length > 0 && item.travelDetail[0].arrivalTo != null && item.travelDetail[0].arrivalTo != '' && item.travelDetail[0].arrivalTo != undefined">{{item.travelDetail[0].arrivalTo}}</span><span v-else>-</span></td> 
            <td style="font-size: large;" class="border border-dark"><span v-if="item.travelDetail.length > 0 && item.travelDetail[0].travelStartDate != null && item.travelDetail[0].travelStartDate != '' && item.travelDetail[0].travelStartDate != undefined">{{item.travelDetail[0].travelStartDate}}</span><span v-else>-</span></td>
            <td style="font-size: large;" class="border border-dark"><span v-if="item.travelDetail.length > 0 && item.travelDetail[0].arrivalStartDate != null && item.travelDetail[0].arrivalStartDate != '' && item.travelDetail[0].arrivalStartDate != undefined">{{item.travelDetail[0].arrivalStartDate}}</span><span v-else>-</span></td>
            <td style="font-size: large;" class="border border-dark"><span v-if="item.travelDetail.length > 0 && item.travelDetail[0].departureTravelMode != null && item.travelDetail[0].departureTravelMode != '' && item.travelDetail[0].departureTravelMode != undefined">{{item.travelDetail[0].departureTravelMode.name}}</span><span v-else>-</span></td>  
            <td style="font-size: large;" class="border border-dark"><span v-if="item.travelDetail.length > 0 && item.travelDetail[0].departureVehicleNumber != null && item.travelDetail[0].departureVehicleNumber != '' && item.travelDetail[0].departureVehicleNumber != undefined">{{item.travelDetail[0].departureVehicleNumber}}</span><span v-else>-</span></td>
            <td style="font-size: large;" class="border border-dark"><span v-if="item.travelDetail.length > 0 && item.travelDetail[0].departureDate != null && item.travelDetail[0].departureDate != '' && item.travelDetail[0].departureDate != undefined">{{item.travelDetail[0].departureDate}}</span><span v-else>-</span></td>
            <td style="font-size: large;" class="border border-dark"><span v-if="item.family.length > 0 && item.family[0].photo != null && item.family[0].photo != '' && item.family[0].photo != undefined && item.family[0].photo.id != null && item.family[0].photo.id != undefined && item.family[0].photo.id != ''">
              <!-- <img :src="`${getIpUrl}`+`photo/downloadFile/`+`${item.family[0].photo.id}`" width="85" height="85"/> -->
              <img src="#"
                 v-bind:id="`photo_${item.family[0].photo.id}`"
                 ref="photoSl"
                 :title="`${item.state.name}_${item.designationName}_Spouse_${item.family[0].name}`"
                 height="85px" width="85px"/>
                 <span v-if="role == 'Admin' || role == 'PrincipalSecretary' || role == 'Other2'">
                 <i @click="downloadImage(item.family[0].photo.id,item.family[0].photo.filName)" class="hovereffect bi bi-download"></i>
                 </span>
                </span><span v-else>-</span></td>   
            <td style="font-size: large;" class="border border-dark"><span v-if="item.family.length > 0 && item.family[0].name != null && item.family[0].name != '' && item.family[0].name != undefined && item.family[0].title.name != null && item.family[0].title.name != '' && item.family[0].title.name != undefined">{{item.family[0].title.name}} {{item.family[0].name}}</span><span v-else>-</span></td>
            <td style="font-size: large;" class="border border-dark"><span v-if="item.family.length > 0 && item.family[0].mobileNo != null && item.family[0].mobileNo != '' && item.family[0].mobileNo != undefined">{{item.family[0].mobileNo}}</span><span v-else>-</span></td>
            <td style="font-size: large;" class="border border-dark"><span v-if="item.family.length > 0 && item.family[0].email != null && item.family[0].email != '' && item.family[0].email != undefined">{{item.family[0].email}}</span><span v-else>-</span></td>
            <td style="font-size: large;" class="border border-dark"><span v-if="item.travelDetail.length > 1 && item.travelDetail[1].arrivalTravelMode.name != null && item.travelDetail[1].arrivalTravelMode.name != '' && item.travelDetail[1].arrivalTravelMode.name != undefined">{{item.travelDetail[1].arrivalTravelMode.name}}</span><span v-else>-</span></td>
            <td style="font-size: large;" class="border border-dark"><span v-if="item.travelDetail.length > 1 && item.travelDetail[1].arrivalVehicleNumber != null && item.travelDetail[1].arrivalVehicleNumber != '' && item.travelDetail[1].arrivalVehicleNumber != undefined">{{item.travelDetail[1].arrivalVehicleNumber}}</span><span v-else>-</span></td>
            <td style="font-size: large;" class="border border-dark"><span v-if="item.travelDetail.length > 1 && item.travelDetail[1].arrivalTo != null && item.travelDetail[1].arrivalTo != '' && item.travelDetail[1].arrivalTo != undefined">{{item.travelDetail[1].arrivalTo}}</span><span v-else>-</span></td> 
            <td style="font-size: large;" class="border border-dark"><span v-if="item.travelDetail.length > 1 && item.travelDetail[1].travelStartDate != null && item.travelDetail[1].travelStartDate != '' && item.travelDetail[1].travelStartDate != undefined">{{item.travelDetail[1].travelStartDate}}</span><span v-else>-</span></td>
            <td style="font-size: large;" class="border border-dark"><span v-if="item.travelDetail.length > 1 && item.travelDetail[1].arrivalStartDate != null && item.travelDetail[1].arrivalStartDate != '' && item.travelDetail[1].arrivalStartDate != undefined">{{item.travelDetail[1].arrivalStartDate}}</span><span v-else>-</span></td>
            <td style="font-size: large;" class="border border-dark"><span v-if="item.travelDetail.length > 1 && item.travelDetail[1].departureTravelMode != null && item.travelDetail[1].departureTravelMode != '' && item.travelDetail[1].departureTravelMode != undefined">{{item.travelDetail[1].departureTravelMode.name}}</span><span v-else>-</span></td>  
            <td style="font-size: large;" class="border border-dark"><span v-if="item.travelDetail.length > 1 && item.travelDetail[1].departureVehicleNumber != null && item.travelDetail[1].departureVehicleNumber != '' && item.travelDetail[1].departureVehicleNumber != undefined">{{item.travelDetail[1].departureVehicleNumber}}</span><span v-else>-</span></td>
            <td style="font-size: large;" class="border border-dark"><span v-if="item.travelDetail.length > 1 && item.travelDetail[1].departureDate != null && item.travelDetail[1].departureDate != '' && item.travelDetail[1].departureDate != undefined">{{item.travelDetail[0].departureDate}}</span><span v-else>-</span></td>
       </tr>
    </tbody>
  </table>
  <br/><br/>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item" :class="{ 'disabled': currentPage === 0 }">
        <a class="page-link" href="#" @click="getAllDelegates(currentPage - 1)" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <!-- <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber" :class="{ 'active': currentPage === pageNumber }">
        <a class="page-link" href="#" @click="getAllDelegates(pageNumber)">{{ pageNumber }}</a>
      </li> -->
      <li class="page-item" :class="{ 'disabled': currentPage === totalPages-1 }">
        <a class="page-link" href="#" @click="getAllDelegates(currentPage + 1)" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
  </div>
</template>

<script>
import axios from "axios";
import Toasted from "vue-toasted";
export default {
  data() {
    return {
      items: null,
      displayedItems: [],
      selectMode: "single",
      selected: null,
       headers: [{key:"Sr.No"},{key:"State"},{key:"Designation"},{key:"Delegate's Pics"},{key:"Delegate's Name"},{key:"Delegate's Mobile Number"},{key:"Delegate's Email"},{key: "Delegate's Arrival Travel Mode"},{key:"Delegate's Vehicle/Flight/Train No."},{key:"Delegate's Arrival To"},{key:"Delegate's Travel Start Date"},{key:"Delegate's Arrival Date"},{key:"Delegate's Departure Mode"},{key:"Delegate's Departure Vehicle/Flight/Train No."},{key:"Delegate's Departure Date"},{key:"Spouse Photo"},{key:"Spouse Name"},{key:"Spouse Mobile Number"},{key:"Spouse Email"},{key:"Spouse Travel Mode"},{key:"Spouse Arrival Vehicle/Flight/Train No."},{key:"Spouse Arrival To"},{key:"Spouse Start Travel Date"},{key:"Spouse Arrival Date"},{key:"Spouse Departure Travel Mode"},{key:"Spouse Departure Vehicle/Flight/Train No."},{key:"Spouse Departure Date"}],
       getIpUrl:this.$store.getters['getIpaddress'],
      showGeneratedTime: '',
      states: [],
      role: this.$store.state.authData.role,
      selectedState: null,
      selectedStateId: 0,
      currentPage: 0,
      totalPages: 1,
      itemsPerPage: 10,
    };
  },
  mounted () {
    this.displayGeneratedDateAndTime();
    this.fetchStates();
    this.getAllDelegates(this.currentPage);
  },
  computed: {
    getOverallIndex(index) {
      return (this.current_page*10)-10 + index + 1
    }
  },
  methods: {
    printData(data){
      if((data != null && data.length > 0) || data !='' || data != undefined){
        alert("Data");
        return data;
      }else{
        return '-';
      }     
    },
    getSelectedItem(e,page) {
      const vm = this;
      vm.selectedStateId = e.id;
      axios
        .get(vm.getIpUrl+"delegate/getDelegatesByState/"+vm.selectedStateId+"/"+page+"/"+vm.itemsPerPage)
        .then((response) => {
          if (response != null) {
            vm.items = response.data.content;
            vm.totalPages = response.data.totalPages;
            vm.currentPage = page;
            vm.populateImageUrlForDelegates();            
          }
        })
        .then(res=>{
                    console.log('Delegate loading completed');
                    vm.loadImage();
                    // vm.loadSpouseImage();
                })
        .catch(error => {
          console.error('Error fetching data from the API:', error);
        });
    },
    getAllDelegates(page) {
      let vm = this;
      axios
        .get(vm.getIpUrl+"delegate/getDelegatesByState/"+this.selectedStateId+"/"+page+"/"+vm.itemsPerPage)
        .then((response) => {
          if (response != null) {
            vm.items = response.data.content;
            vm.totalPages = response.data.totalPages;
            vm.currentPage = page;
            vm.populateImageUrlForDelegates();
          }
        })
        .then(res=>{
                    console.log('Delegate loading completed');
                    vm.loadImage();
                    // vm.loadSpouseImage();
                })
        .catch(error => {
          console.error('Error fetching data from the API:', error);
        });
    },
    loadImage:async function(){
            let vm=this;
            // console.log(vm.$refs);
            let data;
            // console.log(vm.$refs.photoEl);
            // console.log(vm.$refs.photoSl);

            if(vm.$refs !==undefined && vm.$refs!==null 
                    && vm.$refs.photoEl!==undefined
                    && vm.$refs.photoEl!==null){
                      console.log(vm.$refs.photoEl);
                        console.log(vm.$refs.photoSl);
                if(vm.items!=null && vm.items!==undefined 
                                && vm.items.length>0){
                    for(const index in vm.items){
                        let delegate=vm.items[index];
                        if(delegate.photo!==null 
                            && delegate.photo.id!=null 
                            && delegate.photo.id!=''){
                        let el=document.getElementById('photo_'+delegate.photo.id);
                        console.log(el.src);  
                        console.log(delegate.photoUrl);     
                    
                        let response= await fetch(delegate.photoUrl,{method:'GET'});
                        let blob= await response.blob();
                        el.src=URL.createObjectURL(blob);
                    }
                    if(delegate.family.length > 0){
                          if(delegate.family[0].photo!==null 
                                && delegate.family[0].photo.id!=null 
                                && delegate.family[0].photo.id!=''){
                            let sl=document.getElementById('photo_'+delegate.family[0].photo.id);
                            console.log(delegate.sphotoUrl);     
                            let response2= await fetch(delegate.sphotoUrl,{method:'GET'});
                            let blob2= await response2.blob();
                            sl.src=URL.createObjectURL(blob2);
                        }
                    }                   
                }       
                }
            }
            return data;
        }, 
     populateImageUrlForDelegates:function(){
            let vm =this;
            let api=vm.$store.getters["getIpaddress"]+'photo/downloadFile/';
            if(vm.items!==null && vm.items!==undefined && vm.items!==''){
                for(const index in vm.items){
                    let delegate=vm.items[index];
                    if(delegate.photo!==null 
                        && delegate.photo.id!=null && delegate.photo.id!=''){
                        vm.$set(delegate,"photoUrl",api+delegate.photo.id);
                    }
                    if(delegate.family.length > 0){
                          if(delegate.family[0].photo !== null 
                          && delegate.family[0].photo.id !== '' 
                          && delegate.family[0].photo.id !== null){
                            vm.$set(delegate,"sphotoUrl",api+delegate.family[0].photo.id);
                        }
                    }                    
                }
                console.log(vm.items);
            }
     },  
    async downloadImage(imageId,imageName){
      const vm = this;
      let el = document.getElementById(`photo_${imageId}`);
      console.log(el.title);

      // Create a BLob for image 
      const image = await fetch(vm.getIpUrl+'photo/downloadFile/'+imageId);
			const imageBlog = await image.blob();
			const imageURL = URL.createObjectURL(imageBlog);

      // Create a 
      const lastIndexOfDot = imageName.lastIndexOf(".");
			const fileExtension = imageName.substring(lastIndexOfDot+1);
      console.log(fileExtension);
      const fileName = el.title+"."+fileExtension;
      console.log(fileName);

        const link = document.createElement('a');
			  link.href =imageURL;
			  link.download = fileName;
			  document.body.appendChild(link);
			  link.click();
			  document.body.removeChild(link);
    },
    onRowSelected(items) {
      this.selected = items;
      // console.log(this.selected);
    },
    displayGeneratedDateAndTime(){
      let vm = this;
      // alert("hello");
        // let delegateId = this.selected[0].id;
        // console.log(delegateId);
        axios
          .get(vm.$store.getters["getIpaddress"]+'utility/getCurrentDateAndTime')
          .then((response) => {
            // console.log('Generated Date : ');
            // console.log(response);
            vm.showGeneratedTime = response.data;
          })
          .catch((err) => {
            vm.$toasted.error("Unable to Edit Record", {
              theme: "bubble",
              position: "top-center",
              duration: 3000,
            });
          });
    },
    changeMessage() {
      let vm = this;

      let delegateId = this.selected[0].id;
      console.log(delegateId);
      axios
        .get(vm.$store.getters["getIpaddress"]+`delegate/getDelegateData/${delegateId}`)
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
    goToReport(selectedState){
      this.$router.push({
        name: "DelegateBriefDetailReport",
        params: {
          selectedStateId: this.selectedStateId,
          selectedState: this.selectedState,
        },
      });
    }
  },
  async created() {
    const vm = this;
    // await vm.getRegistrationCount();
    // await vm.getTakeExamCount();
    // await vm.getExamEndedCount();
    // await vm.getExamNotEndedCount();
    if(this.$store.state.authData.state.id != null && this.$store.state.authData.state.id != '' && this.$store.state.authData.state.id != undefined){
       this.selectedStateId = this.$store.state.authData.state.id;
       this.selectedState = this.$store.state.authData.state.name;
    }
    // if (this.selectedStateId === undefined || this.selectedState === null) {
    //   console.log("not fired");
    //   this.fetchDelegatesList();
    //   console.log(this.selectedStateId);
    // } else {
    //   console.log("stateFunc fired");
    //   this.fetchDelegatesByStateId(this.selectedStateId);
    // }
  },
 
};
</script>

<style>
.hovereffect:hover{
  cursor: pointer;
}
table {
  border: 2px soli black;
}
</style>

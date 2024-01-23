<template>
  <div class="content-area">
     <div class="title-holder">
      <div class="title-block">
        <h1 class="page-title font-weight-bold">{{this.$store.state.authData.state.name}}'s Delegates Profile:</h1> 
      </div>
    </div>
    <div class="row g-6 mb-6">
                    <div v-if="this.$store.state.authData.state.biCameral == true" class="col-xl-3 col-sm-6 col-12">
                        <div class="card bg-danger shadow profile-card border-0" @click="routeCard('Chairman',designationData.chairman)">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col">
                                        <span class="h5 font-semibold text-white text-m d-block mb-2">Chairman/DeputyChairman</span>
                                        <span class="h3 font-bold text-white mb-0"> {{ this.designationData.chairman }} </span>
                                    </div>
                                    <div class="col-auto">
                                        <div class="icon icon-shape bg-white text-lg rounded-circle">
                                            <i class="bi bi-person-plus-fill text-danger"></i>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-sm-6 col-12">
                        <div class="card profile-card bg-success shadow border-0" @click="routeCard('Speaker',designationData.speaker)">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col">
                                        <span class="h5 font-semibold text-white text-m d-block mb-2">Speaker/DeputySpeaker</span>
                                        <span class="h3 font-bold text-white mb-0">{{ this.designationData.speaker }}</span>
                                    </div>
                                    <div class="col-auto">
                                        <div class="icon icon-shape bg-white text-lg rounded-circle">
                                          <i class="bi bi-person-plus-fill text-success"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-sm-6 col-12">
                        <div class="card profile-card bg-warning shadow border-0" @click="routeCard('Secretary',designationData.secretary)">
                            <div class="card-body">
                              <div class="row">
                                    <div class="col">
                                        <span class="h5 font-semibold text-white text-m d-block mb-2">Secretary</span>
                                        <span class="h3 font-bold text-white mb-0">{{ this.designationData.secretary }}</span>
                                    </div>
                                    <div class="col-auto">
                                        <div class="icon icon-shape bg-white text-white text-lg rounded-circle">
                                          <i class="bi bi-person-plus-fill text-warning"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-sm-6 col-12">
                        <div class="card profile-card bg-info shadow border-0" @click="routeCard('Officials',designationData.official)">
                            <div class="card-body">
                              <div class="row">
                                    <div class="col">
                                        <span class="h5 font-semibold text-white text-m d-block mb-2">Officials</span>
                                        <span class="h3 text-white font-bold mb-0">{{ this.designationData.official }}</span>
                                    </div>
                                    <div class="col-auto">
                                        <div class="icon icon-shape bg-white text-lg rounded-circle">
                                          <i class="bi bi-person-plus-fill text-info"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            <div class="font-italic font-weight-bold text-danger text-center">
               <h3>Note: In case of absence of Spouse / Spouses you may add equal number of officials against them.(Maximum 8 persons allowed)</h3>
             </div>       
         <div class="card-form">
          <div class="card-header card-header-alt mt-0">
            <h1 class="page-title">Delegates's List:</h1>
            </div>
           <div v-if="delegates.length != 0"> 
            <div v-for="(delegate, index) in delegates" :key="index"> 
              <div class="card">
                <div class="card-body">
                   <h4 class="font-weight-bold">Delegate Name: {{ delegates[index].title.name }} {{ delegates[index].firstname }} {{ delegates[index].lastname }}</h4> 
                   <h5 class="font-weight-normal"><b>Delegate's Designation:</b>&nbsp;&nbsp;<span v-if="delegates[index].designation.name != ''"><span v-if="delegates[index].designation.name == 'Other'">{{delegates[index].designationName}}</span><span v-else>{{delegates[index].designation.name}}</span></span><span v-else> -</span></h5>
                   <h5 class="font-weight-normal"><b>Email:</b>&nbsp;&nbsp;<span v-if="delegates[index].email != ''">{{ delegates[index].email }}</span><span v-else> -</span>&nbsp;&nbsp;&nbsp;<b>Mobile Number:</b>&nbsp;&nbsp;<span v-if="delegates[index].mobileNo != ''">{{ delegates[index].mobileNo }}</span><span v-else> -</span></h5>
                   <h5 class="font-weight-normal"><b>Delegate's Spouse Name:</b>&nbsp;&nbsp;<span v-if="delegates[index].family.length != 0">{{delegates[index].family[0].name}}</span><span v-else> -</span></h5>
                  </div>
              </div>
              <br/>
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
import MQL from "@/plugins/mql.js";
import axios from "axios";

export default {
  data() {
    return {
      mobileNumber: this.$store.state.userName,
      userData: {},
      designationData : {},
      delegates:[],
      stateId:this.$store.state.authData.state.id,
      noOfDelegates:null
    };
  },
  async created() {
    const vm = this;
  },
  mounted(){
    this.delegatesCounter(this.$store.state.authData.userId);
    this.fetchDelegatesList(this.$store.state.authData.userId);
    this.fetchExactCountOfDelegates(this.$store.state.authData.state.id);
  },
  methods: {
     routeCard(subtype,numberOfDelegates){
          let noDelegate = this.$store.getters[subtype]
          // console.log("Officials: "+this.designationData.official);
          // console.log("No of Delegates:   "+this.noOfDelegates);
          if(subtype == 'Officials'){
            if((this.designationData.official+this.noOfDelegates)<8){
              this.$router.push({
                  name: 'Registration',
                  query: {subtype}
              })
            } else {
              this.$toasted.error("You cannot add more than 8 persons in state's delegation.", {
                  theme: 'bubble',
                  position: 'top-center',
                  duration: 6000
                })
            }
          } else {
            if(numberOfDelegates < noDelegate){
                this.$router.push({
                  name: 'Registration',
                  query: {subtype}
              })
          } else {
            this.$toasted.error("You cannot add more delegates", {
                  theme: 'bubble',
                  position: 'top-center',
                  duration: 6000
                })
          }
        }
          
    },
    fetchDelegatesList(userId){
      const vm = this
      axios
           .get(
            this.$store.getters["getIpaddress"]+"user/getAllDelegatesForUser/"+userId
           )
           .then(response => {
            //  console.log("Response1" + response);
             if(response.data != null){
                vm.delegates = response.data;
                // console.log("Data: "+vm.delegates);
              } else{
               this.$toasted.error('Some error occurred. Kindly contact the administrator.', {
               theme: 'bubble',
               position: 'top-center',
               duration: 3000
             })
             }
           })
           .catch(error => {
             console.log(error)
              this.$toasted.error(error, {
               theme: 'bubble',
               position: 'top-center',
               duration: 3000
             })
             this.errored = true
           })
           .finally(() => this.loading = false) 
    },
    fetchExactCountOfDelegates(stateId){
      const vm = this
      axios
           .get(
            this.$store.getters["getIpaddress"]+"delegate/getCountofDelegatesAndFamilyforThatState/"+stateId
           )
           .then(response => {
             console.log("Response1" + response);
             if(response.data != null){
                vm.noOfDelegates = response.data;
                // console.log("Data: "+vm.delegates);
              } else{
               this.$toasted.error('Some error occurred. Kindly contact the administrator.', {
               theme: 'bubble',
               position: 'top-center',
               duration: 3000
             })
             }
           })
           .catch(error => {
             console.log(error)
              this.$toasted.error(error, {
               theme: 'bubble',
               position: 'top-center',
               duration: 3000
             })
             this.errored = true
           })
           .finally(() => this.loading = false) 
    },
    delegatesCounter(userId){
       axios
           .get(
            this.$store.getters["getIpaddress"]+"user/getDelegatesCount/"+userId
           )
           .then(response => {
             console.log(response);
             if(response.data != null){
                this.designationData = response.data;
              } else{
               this.$toasted.error('Some error occurred. Kindly contact the administrator.', {
               theme: 'bubble',
               position: 'top-center',
               duration: 3000
             })
             }
           })
           .catch(error => {
             console.log(error)
              vm.$toasted.error(error, {
               theme: 'bubble',
               position: 'top-center',
               duration: 3000
             })
             this.errored = true
           })
           .finally(() => this.loading = false) 
    }
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
.isDisabled {
  color: currentColor;
  cursor: not-allowed;
  opacity: 0.5;
  text-decoration: none;
}
</style>


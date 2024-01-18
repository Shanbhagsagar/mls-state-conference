<template>
  <div class="content-area">
     <div class="title-holder">
      <div class="title-block">
        <h1 class="page-title">Delegates's Profile</h1> 
      </div>
    </div>
    <div class="row g-6 mb-6">
                    <div v-if="this.$store.state.authData.state.biCameral == true" class="col-xl-3 col-sm-6 col-12">
                        <div class="card bg-danger shadow profile-card border-0" @click="routeCard('Chairman',0)">
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
                        <div class="card profile-card bg-success shadow border-0" @click="routeCard('Speaker',0)">
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
                        <div class="card profile-card bg-warning shadow border-0" @click="routeCard('Secretary',0)">
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
                        <div class="card profile-card bg-info shadow border-0" @click="routeCard('Officials',0)">
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
         <div class="card-form">
          <div class="card-header card-header-alt mt-0">
            <h1 class="page-title">Delegates's List:</h1>
            </div>
           <div v-if="delegates != null"> 
            <div v-for="(delegate, index) in delegates" :key="index"> 
              <div class="card">
                <div class="card-body">
                   <h4 class="font-weight-bold">Delegate Name: {{ delegates[index].title.name }} {{ delegates[index].firstname }} {{ delegates[index].lastname }}</h4> 
                   <span><h5 class="font-weight-normal"><b>Email:</b> {{ delegates[index].email }}&nbsp;&nbsp;&nbsp;<b>Mobile Number:</b> {{ delegates[index].mobileNo }} </h5></span> 
                   <h5 class="font-weight-normal"> Delegate's Spouse Name: <span v-if="delegates[index].family.length != 0 ">{{delegates[index].family[0].name}}</span><span v-else>-</span></h5>
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
      delegates:[]
    };
  },
  async created() {
    const vm = this;
  },
  mounted(){
    this.delegatesCounter(this.$store.state.authData.userId);
    this.fetchDelegatesList(this.$store.state.authData.userId);
  },
  methods: {
     routeCard(subtype,numberOfDelegates){
      if(numberOfDelegates == 0){
        this.$router.push({
            name: 'Registration',
            query: {subtype}
        })
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


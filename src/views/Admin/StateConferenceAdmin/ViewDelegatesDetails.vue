<template>
  <div>
  <h1>All Delegate's Details</h1><br/>
   <table class="table table-bordered">
    <thead>
      <tr>
        <th class="border border-dark bg-secondary text-center" scope="col" v-for="(header,key) in headers" :key="key">
          <h3>{{ header.key }}</h3>
        </th>
      </tr>
    </thead>
    <tbody>
     <tr v-for="(item,index) in items">
            <td style="font-size: large;" class="border border-dark">{{index+1}}</td>
            <td style="font-size: large;" class="border border-dark">{{ item.state.name }}</td>
            <td style="font-size: large;" class="border border-dark">{{ item.designationName }}</td>
            <td style="font-size: large;" class="border border-dark"><span v-if="item.photo != null && item.photo != '' && item.photo != undefined && item.photo.id != null && item.photo.id != undefined && item.photo.id != ''"><img :src="`${getIpUrl}`+`photo/downloadFile/`+`${item.photo.id}`" width="85" height="85"/></span><span v-else>-</span></td> 
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
            <td style="font-size: large;" class="border border-dark"><span v-if="item.family.length > 0 && item.family[0].photo != null && item.family[0].photo != '' && item.family[0].photo != undefined && item.family[0].photo.id != null && item.family[0].photo.id != undefined && item.family[0].photo.id != ''"><img :src="`${getIpUrl}`+`photo/downloadFile/`+`${item.family[0].photo.id}`" width="85" height="85"/></span><span v-else>-</span></td>   
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
  </div>
  <!-- <div>
     <button class="btn btn-page">
     Create New
    </button> &nbsp;&nbsp;&nbsp; -->
    <!-- <button  class="btn btn-page">
      Edit Delegate Details
    </button><br/><br/> 
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
        class="delegatesGrid"
      >
       <template v-slot:cell(mergedColumn)="data">
         {{ data.item.title.name }} {{ data.item.firstname }}  {{ data.item.lastname }}
      </template>
      <template v-slot:cell(mergedColumn5)="data">
         {{data.value}} 
        <button @click="printData(data.value)">Here</button> 
        <span v-if="data.item.photo.id != null || data.item.photo.id != undefined || data.item.photo.id != ''"><img :src="`${this.$store.getters['getIpaddress']}photo/downloadFile/${data.item.photo.id}`" width="85" height="85"/></span> 
        <span v-else></span>
      </template>
      <template v-slot:cell(mergedColumn7)="data">
        <span v-if="data.item.travelDetail.length > 0 || data.item.travelDetail[0].arrivalTravelMode != null">{{ data.item.travelDetail[0].arrivalTravelMode.name }}</span>
        <span v-else>-</span>        
      </template>
      <template v-slot:cell(mergedColumn8)="data">
        <span v-if="data.item.travelDetail.length > 0 || data.item.travelDetail[0].arrivalVehicleNumber != null">{{ data.item.travelDetail[0].arrivalVehicleNumber }}</span>
        <span v-else>-</span>        
      </template>
      <template v-slot:cell(mergedColumn9)="data">
        <span v-if="data.item.travelDetail.length > 0 || data.item.travelDetail[0].arrivalTo != null">{{ data.item.travelDetail[0].arrivalTo }}</span>
        <span v-else>-</span>        
      </template>
      <template v-slot:cell(mergedColumn10)="data">
        <span v-if="data.item.travelDetail.length > 0 || data.item.travelDetail[0].travelStartDate != null">{{ data.item.travelDetail[0].travelStartDate }}</span>
        <span v-else>-</span>        
      </template> 
      <template v-slot:cell(mergedColumn11)="data">
        <span v-if="data.item.travelDetail.length > 0 || data.item.travelDetail[0].arrivalStartDate != null">{{ data.item.travelDetail[0].arrivalStartDate }}</span>
        <span v-else>-</span>        
      </template> 
      <template v-slot:cell(mergedColumn12)="data">
        <span v-if="data.item.travelDetail.length > 0 || data.item.travelDetail[0].departureTravelMode != null">{{ data.item.travelDetail[0].departureTravelMode.name }}</span>
        <span v-else>-</span>        
      </template>
      <template v-slot:cell(mergedColumn13)="data">
        <span v-if="data.item.travelDetail.length > 0 || data.item.travelDetail[0].departureVehicleNumber != null">{{ data.item.travelDetail[0].departureVehicleNumber }}</span>
        <span v-else>-</span>        
      </template>
      <template v-slot:cell(mergedColumn14)="data">
        <span v-if="data.item.travelDetail.length > 0 || data.item.travelDetail[0].departureDate != null">{{ data.item.travelDetail[0].departureDate }}</span>
        <span v-else>-</span>        
      </template>
      <template v-slot:cell(mergedColumn15)="data">
        <span v-if="data.item.travelDetail.length > 0 || data.item.travelDetail[1].arrivalTravelMode != null">{{ data.item.travelDetail[0].arrivalTravelMode.name }}</span>
        <span v-else>-</span>        
      </template>
      <template v-slot:cell(mergedColumn16)="data">
        <span v-if="data.item.travelDetail.length > 0 || data.item.travelDetail[1].arrivalVehicleNumber != null">{{ data.item.travelDetail[0].arrivalVehicleNumber }}</span>
        <span v-else>-</span>        
      </template>
      <template v-slot:cell(mergedColumn17)="data">
        <span v-if="data.item.travelDetail.length > 0 || data.item.travelDetail[1].arrivalTo != null">{{ data.item.travelDetail[0].arrivalTo }}</span>
        <span v-else>-</span>        
      </template>
      <template v-slot:cell(mergedColumn18)="data">
        <span v-if="data.item.travelDetail.length > 0 || data.item.travelDetail[1].travelStartDate != null">{{ data.item.travelDetail[0].travelStartDate }}</span>
        <span v-else>-</span>        
      </template> 
      <template v-slot:cell(mergedColumn19)="data">
        <span v-if="data.item.travelDetail.length > 0 || data.item.travelDetail[1].arrivalStartDate != null">{{ data.item.travelDetail[0].arrivalStartDate }}</span>
        <span v-else>-</span>        
      </template> 
      <template v-slot:cell(mergedColumn20)="data">
        <span v-if="data.item.travelDetail.length > 0 || data.item.travelDetail[1].departureTravelMode != null">{{ data.item.travelDetail[0].departureTravelMode.name }}</span>
        <span v-else>-</span>        
      </template>
      <template v-slot:cell(mergedColumn21)="data">
        <span v-if="data.item.travelDetail.length > 0 || data.item.travelDetail[1].departureVehicleNumber != null">{{ data.item.travelDetail[0].departureVehicleNumber }}</span>
        <span v-else>-</span>        
      </template>
      <template v-slot:cell(mergedColumn22)="data">
        <span v-if="data.item.travelDetail.length > 0 || data.item.travelDetail[0].departureDate != null">{{ data.item.travelDetail[0].departureDate }}</span>
        <span v-else>-</span>        
      </template>
      <template v-slot:cell(mergedColumn6)="data">
        <span v-if="data.item.family.length != 0 && data.item.family[0].photo != null && data.item.family[0].photo.id != null "><img :src="`${this.$store.getters['getIpaddress']}photo/downloadFile/${data.item.family[0].photo.id}`"  width="85" height="85"/></span>
        <span v-else></span>        
      </template>
      <template v-slot:cell(mergedColumn2)="data">
        <span v-if="data.item.family.length != 0">{{ data.item.family[0].title.name }}{{ data.item.family[0].name }}</span>
        <span v-else>-</span>        
      </template>
      <template v-slot:cell(mergedColumn3)="data">
        <span v-if="data.item.family.length != 0">{{ data.item.family[0].email }}</span>
        <span v-else>-</span>        
      </template>
      <template v-slot:cell(mergedColumn4)="data">
        <span v-if="data.item.family.length != 0">{{ data.item.family[0].mobileNo }}</span>
        <span v-else>-</span>        
      </template>

    </b-table>
    </div>
  </div> -->
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
       headers: [{key:"Sr.No"},{key:"State"},{key:"Designation"},{key:"Delegate's Pics"},{key:"Delegate's Name"},{key:"Delegate's Mobile Number"},{key:"Delegate's Email"},{key: "Delegate's Arrival Travel Mode"},{key:"Delegate's Vehicle/Flight/Train No."},{key:"Delegate's Arrival To"},{key:"Delegate's Travel Start Date"},{key:"Delegate's Arrival Date"},{key:"Delegate's Departure Mode"},{key:"Delegate's Departure Vehicle/Flight/Train No."},{key:"Delegate's Departure Date"},{key:"Spouse Photo"},{key:"Spouse Name"},{key:"Spouse Mobile Number"},{key:"Spouse Email"},{key:"Spouse Travel Mode"},{key:"Spouse Arrival Vehicle/Flight/Train No."},{key:"Spouse Arrival To"},{key:"Spouse Start Travel Date"},{key:"Spouse Arrival Date"},{key:"Spouse Departure Travel Mode"},{key:"Spouse Departure Vehicle/Flight/Train No."},{key:"Spouse Departure Date"}],
       getIpUrl:this.$store.getters['getIpaddress'],
    
      fields:[
       {
          key: 'state.name',
          label: "State",
          class: 'delegatesGrid',
          thClass: 'font-weight-bold',
          sortable:true
        }, 
        {
          key: 'designationName',
          label: "Designation",
          thClass: 'font-weight-bold',
          sortable:true
        }, 
      {
          key: 'mergedColumn5',
          label: "Delegate's Pics",
          thClass: 'font-weight-bold',
          sortable:false
        },
        {
            key: 'mergedColumn',
          label: "Delegate Name",
          thClass: 'font-weight-bold',
          sortable:true
        },
        {
          key: 'mobileNo',
          label: "Delegate Mobile Number",
          thClass: 'font-weight-bold',
          sortable:true
        },
        {
          key: 'mergedColumn7',
          label: "Delegate Arrival Travel Mode",
          thClass: 'font-weight-bold',
          sortable:true
        },
        {
          key: 'mergedColumn8',
          label: "Delegate Vehicle/Flight/Train No.",
          thClass: 'font-weight-bold',
          sortable:true
        },
        {
          key: 'mergedColumn9',
          label: "Delegate Arrival To",
          thClass: 'font-weight-bold',
          sortable:true
        },
        {
          key: 'mergedColumn10',
          label: "Delegate Travel Start Date",
          thClass: 'font-weight-bold',
          sortable:true
        },
        {
          key: 'mergedColumn11',
          label: "Delegate Arrival Date",
          thClass: 'font-weight-bold',
          sortable:true
        },
        {
          key: 'mergedColumn12',
          label: "Delegate Departure Mode",
          thClass: 'font-weight-bold',
          sortable:true
        },
        {
          key: 'mergedColumn13',
          label: "Delegate Departure Vehicle/Flight/Train No.",
          thClass: 'font-weight-bold',
          sortable:true
        },
        {
          key: 'mergedColumn14',
          label: "Delegate Departure Date",
          thClass: 'font-weight-bold',
          sortable:true
        },
        {
          key: 'mergedColumn6',
          label: "Spouse Photo",
          thClass: 'font-weight-bold',
          sortable:false
        },
        {
          key: 'mergedColumn2',
          label: "Spouse Name",
          thClass: 'font-weight-bold',
          sortable:true
        },
        {
          key: 'mergedColumn3',
          label: "Spouse Mobile Number",
          thClass: 'font-weight-bold',
          sortable:true
        },
        {
          key: 'mergedColumn4',
          label: "Spouse Email",
          thClass: 'font-weight-bold',
          sortable:true
        },
        {
          key: 'mergedColumn15',
          label: "Spouse Travel Mode",
          thClass: 'font-weight-bold',
          sortable:true
        },
        {
          key: 'mergedColumn16',
          label: "Spouse Arrival Vehicle/Flight/Train No.",
          thClass: 'font-weight-bold',
          sortable:true
        },
        {
          key: 'mergedColumn17',
          label: "Spouse Start Travel Date",
          thClass: 'font-weight-bold',
          sortable:true
        },
        {
          key: 'mergedColumn18',
          label: "Spouse Arrival Date",
          thClass: 'font-weight-bold',
          sortable:true
        },
        {
          key: 'mergedColumn19',
          label: "Spouse Departure Travel Mode",
          thClass: 'font-weight-bold',
          sortable:true
        },
        {
          key: 'mergedColumn20',
          label: "Spouse Departure Vehicle/Flight/Train No.",
          thClass: 'font-weight-bold',
          sortable:true
        },
        {
          key: 'mergedColumn21',
          label: "Spouse Departure Date",
          thClass: 'font-weight-bold',
          sortable:true
        },
      ]
    };
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
    getAllDelegates() {
      let vm = this;
      axios
        .get(vm.$store.getters["getIpaddress"]+"delegate/getAllDelegates")
        .then((response) => {
          console.log("Headers");
          console.log(response.headers['Date']);
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

<style>
table {
  border: 2px soli black;
}
</style>

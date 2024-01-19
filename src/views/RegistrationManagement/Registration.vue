<template>
  <section id="login">
    <div class="card-login card-register">
      <div class="row card-wrapper">
        <div class="col login-block">
           <div class="logo-wrapper logo-wrapper-alt logo-wrapper-alt2">
            <h1 class="modal-title">
             {{ this.$route.query.subtype }} Registration 
            </h1>
          </div>
         <div class="card-form">
            <div class="card-header card-header-alt mt-0">
              <div v-if="this.$route.query.subtype == 'Officials'">
                Officer1 Personal Details
                </div>
                <div v-else>
                Personal Details
              </div>
            </div>
            <div class="row">
              <div class="d-block text-center">
              <div size="180" class="user">
              <input @change="handleFileChange" ref="fileInput" type="file" style="display: none">
              <b-avatar size="180" :src="profilePictureUrl ? profilePictureUrl : '../../../public/assets/images/no-image-icon-23485.png'" class="profile-img" badge-variant="info">
              <template #badge><i class="bi bi-pencil-square text-white" @click="openFileInput"></i></template>
            </b-avatar>
            </div>
            </div>
              <!-- <img @click="openFileInput" class="profile-user-img img-circle" :src="profilePictureUrl ? profilePictureUrl : '../../../public/assets/images/no-image-icon-23485.png'" alt="User"/> -->
            </div>
            <br/>
            <div class="font-italic text-danger text-center">
              (*Please Note: This Image will be used to create your Conference Id Card. Kindly upload appropriate image and file size should not be more than 10 MB. )
             </div>
            <br/> 
            <div class="row">
              <div class="col-md-6 col-lg-6">
                <div class="form-group">
                  <label
                    for="designation"
                    class="control-label form-label"
                  >Designation</label>
                  <span class="text-danger">*</span>

                  <v-select
                      v-model="delegates[0].designation"
                      label="name"
                      :hidden="this.$route.query.subtype == 'Officials'"     
                      placeholder="Please Select Your Designation"
                      :options="delegateDesignation"
                      :value="delegates[0].designation.name"
                    />

                  <div v-if="this.$route.query.subtype == 'Officials'">
                      <input
                      type="text"
                      class="form-control"
                      minLength="4"
                      maxLength="100"
                      v-model.trim="designations"
                      placeholder="Please Enter Your Designation"
                      id="designations"
                     >
                  </div>
               
                    
                  <!-- <div
                    class="text-danger"
                    v-if="
                      !$v.delegates.designation.required &&
                        $v.delegates.designation.$error">
                    Please Select Designation
                  </div> -->
                </div>
              </div>
              <div class="col-md-6 col-lg-6">
                <div class="form-group">
                  <label
                    for="title"
                    class="control-label form-label"
                  >
                    Title
                    <span class="text-danger">*</span>
                  </label>

                  <v-select

                    v-model="delegates[0].title"
                    label="name"
                    placeholder="Please Select your title"
                    :options="delegateTitles"
                    :value="delegates[0].title.name"
                  />
                <!-- <div
                    class="text-danger"
                    v-if="
                      !$v.title.name.required &&
                        $v.title.name.$error
                    "
                  >
                    Please Select Title
                  </div> -->
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 col-lg-4">
                <div class="form-group">
                  <label class="control-label form-label">
                    First Name
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    oninput="this.value=this.value.replace(/[^[a-zA-Z.-.'-'\s]/g,'');"
                    class="form-control"
                    minLength="4"
                    maxLength="100"
                    v-model.trim="delegates[0].firstname"
                     placeholder="Please Enter Your First Name"
                    id="firstname"
                    :class="{
                      'is-invalid': submitted && $v.delegates[0].firstname.$invalid
                    }"
                  >
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.delegates[0].firstname.required"
                  >
                    {{ $t('registration.vstudnetName1') }}
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.delegates[0].firstname.isNameValid"
                  >
                    {{ $t('registration.vstudnetName2') }}
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.delegates[0].firstname.maxLength"
                  >
                    {{ $t('registration.vsMaxLength') }} 100 charachters
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.delegates[0].firstname.minLength"
                  >
                    {{ $t('registration.vsMinLength') }} 4 charachters
                  </div>
                </div>
              </div>

              <div class="col-md-12 col-lg-4">
                <div class="form-group">
                  <label class="control-label form-label">
                    Middle Name
                  </label>
                  <input
                    oninput="this.value=this.value.replace(/[^[a-zA-Z.-.'-'\s]/g,'');"
                    class="form-control"
                    minLength="4"
                    maxLength="100"
                    v-model.trim="delegates[0].middlename"
                    placeholder="Please Enter Your Middle Name"
                    id="fullName"
                    :class="{
                      'is-invalid': submitted && $v.delegates[0].middlename.$invalid
                    }"
                  >
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.delegates[0].middlename.isNameValid"
                  >
                    {{ $t('registration.vstudnetName2') }}
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.delegates[0].middlename.maxLength"
                  >
                    {{ $t('registration.vsMaxLength') }} 100 charachters
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.delegates[0].middlename.minLength"
                  >
                    {{ $t('registration.vsMinLength') }} 4 charachters
                  </div>
                </div>
              </div>

              <div class="col-md-12 col-lg-4">
                <div class="form-group">
                  <label class="control-label form-label">
                    Last Name
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    oninput="this.value=this.value.replace(/[^[a-zA-Z.-.'-'\s]/g,'');"
                    class="form-control"
                    minLength="4"
                    maxLength="100"
                    v-model.trim="delegates[0].lastname"
                    placeholder="Please Enter Your Last Name"
                    id="fullName"
                    :class="{
                      'is-invalid': submitted && $v.delegates[0].lastname.$invalid
                    }"
                  >
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.delegates[0].lastname.required"
                  >
                    {{ $t('registration.vstudnetName1') }}
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.delegates[0].lastname.isNameValid"
                  >
                    {{ $t('registration.vstudnetName2') }}
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.delegates[0].lastname.maxLength"
                  >
                    {{ $t('registration.vsMaxLength') }} 100 charachters
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.delegates[0].lastname.minLength"
                  >
                    {{ $t('registration.vsMinLength') }} 4 charachters
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card-form">
            <div class="card-header card-header-alt">
              <div v-if="this.$route.query.subtype == 'Officials'">
                 Officer1 Contact Details
                </div>
                <div v-else>
                  Contact Details
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 col-lg-6">
                    <div class="form-group">
                      <label class="control-label form-label">
                        Mobile Number
                        <span class="text-danger">*</span>
                      </label>
                      <div class="input-group">
                        <input
                          class="form-control"
                          oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                          maxlength="10"
                          minlength="10"
                          v-model.trim="delegates[0].mobileNo"
                          id="mobileNo"
                          :placeholder="$t('registration.mobilePlaceholder')"
                          :class="{
                            'is-invalid':
                              submitted && $v.delegates[0].mobileNo.$invalid
                          }"
                        >
                       </div>
                      <div
                        class="text-danger"
                        v-if="submitted && !$v.delegates[0].mobileNo.required"
                      >
                        {{ $t('registration.vmobile1') }}
                      </div>
                      <div
                        class="text-danger"
                        v-if="submitted && !$v.delegates[0].mobileNo.numeric"
                      >
                        {{ $t('registration.vmobile2') }}
                      </div>
                      <div
                        class="text-danger"
                        v-if="submitted && !$v.delegates[0].mobileNo.isMobileValid"
                      >
                        Invalid Mobile Number
                      </div>
                      <div
                        class="text-danger"
                        v-if="
                          submitted &&
                            (!$v.delegates[0].mobileNo.minLength ||
                            !$v.delegates[0].mobileNo.maxLength)
                        "
                      >
                        {{ $t('registration.vmobile3') }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-6">
                    <div class="form-group">
                      <label
                        class="control-label form-label"
                      >Email ID</label>
                      <span class="text-danger"> *</span>
                      <div class="input-group">
                        <input
                          type="email"
                          class="form-control"
                          v-model.trim="delegates[0].email"
                          :placeholder="$t('registration.emailIdPlaceholder')"
                          id="email"
                          :class="{
                            'is-invalid':
                              submitted && $v.delegates[0].email.$invalid
                          }"
                        >
                      </div>

                      <div
                        class="text-danger"
                        v-if="submitted && !$v.delegates[0].email.required"
                      >
                        Please provide valid email
                      </div>
                    </div>
                  </div>
            </div>
            <!-- <div class="row">
              <div class="col-md-12 col-lg-12">
                <div class="form-group">
                  <label
                    for="states"
                    class="control-label form-label"
                  >State</label>
                  <span class="text-danger">*</span>

                  <v-select
                    v-model="address.state"
                    label="displayName"
                    :placeholder="$t('registration.statePlaceholder')"
                    :options="states"
                    :value="address.state"
                    @input="getDistrictsByStateId()"
                  />
                  <div
                    class="text-danger"
                    v-if="
                      !$v.address.state.required &&
                        $v.address.state.$error
                    "
                  >
                    {{ $t('registration.vstate') }}
                  </div>
                </div>
              </div>
            </div> -->
          </div>
          <div class="card-form">
            <div class="card-header card-header-alt">
            Delegate's Travel Details:
            </div>
          <h5>Arrival Details:-</h5>  
          <div class="row">
               <div class="col-md-4 col-lg-4">
                <div class="form-group">
                  <label
                    for="travel1"
                    class="control-label form-label"
                  >
                    Mode of Travel
                    <span class="text-danger">*</span>
                  </label>

                  <v-select
                    v-model="delegates[0].travelDetail[0].travelModel"
                    label="name"
                    placeholder="Please Select Travel Mode"
                    :options="travelModes"
                    :value="delegates[0].travelDetail[0].travelModel"
                  />
                  <!-- <div
                    class="text-danger"
                    v-if="
                      !$v.travelModel.name.required &&
                        $v.travelModel.name.$error
                    "
                  >
                   
                  </div> -->
                </div>
              </div>
              <div class="col-md-4 col-lg-4">
                <div class="form-group">
                  <label class="control-label form-label">
                    Vehicle/Flight/Train No.
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    minLength="4"
                    maxLength="100"
                    v-model.trim="delegates[0].travelDetail[0].vehicleNumber"
                    placeholder="Please Enter Vehicle/Flight/Train No."
                    id="vehicleNo"
                    :class="{
                      'is-invalid': submitted && $v.travelDetail.vehicleNumber.$invalid
                    }"
                  >
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.travelDetail.vehicleNumber.required"
                  >
                  Please Enter Vehicle/Flight/Train No.
                  </div>
                   <!-- <div
                    class="text-danger"
                    v-if="submitted && !$v.vehicleNumber.maxLength"
                  >
                    {{ $t('registration.vsMaxLength') }} 100 charachters
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.vehicleNumber.minLength"
                  >
                    {{ $t('registration.vsMinLength') }} 4 charachters
                  </div> -->
                </div>
              </div>
              <div class="col-md-4 col-lg-4">
                <div class="form-group" v-if="delegates[0].travelDetail[0].travelModel.name == 'Flight'">
                  <label class="control-label form-label">
                    Arrival To
                    <span class="text-danger">*</span>
                  </label>
                  <v-select
                    v-model="delegates[0].travelDetail[0].arrivalTo"
                    label="name"
                    placeholder="Please Select Travel Mode"
                    :options="airportTerminal"
                    :value="delegates[0].travelDetail[0].arrivalTo.name"
                  />
                </div>
                <div class="form-group" v-if="delegates[0].travelDetail[0].travelModel.name == 'Train'">
                  <label class="control-label form-label">
                    Arrival To
                    <span class="text-danger">*</span>
                  </label>
                  <v-select
                    v-model="delegates[0].travelDetail[0].arrivalTo"
                    label="name"
                    placeholder="Please Select Travel Mode"
                    :options="railwayStation"
                    :value="delegates[0].travelDetail[0].arrivalTo.name"
                  />
                </div>
              </div>
            </div>
            <div class="row" v-if="delegates[0].travelDetail[0].travelModel.name == 'Train' && delegates[0].travelDetail[0].arrivalTo.name == 'Other'">
              <div class="col-md-12 col-lg-12">
                <input
                    oninput="this.value=this.value.replace(/[^[a-zA-Z.-.'-'\s]/g,'');"
                    class="form-control"
                    minLength="4"
                    maxLength="100"
                    v-model.trim="delegates[0].travelDetail[0].other"
                    placeholder="Please Specify"
                    id="specify"
                    :class="{
                      'is-invalid': submitted && $v.delegates[0].travelDetail[0].other.$invalid
                    }"
                  >
              </div>
            </div>
            <div class="row">
               <div class="col-md-6 col-lg-6">
                <div class="form-group">
                  <label
                    for="travel"
                    class="control-label form-label"
                  >
                    Start Travel Date & Time
                    <span class="text-danger">*</span>
                  </label>

                  <div class="fp-holder">
                    <Datepicker 
                    format="YYYY-MM-DD h:i:s" 
                    placeholder="Please Select Travel Date Time"
                    min="2024-01-26"
                    max="2024-01-30"
                    v-model="delegates[0].travelDetail[0].travelDate"
                    id="ddateTime"
                    :input-class="{
                        'form-control': 'form-control',
                      }"/>
                    </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.delegates.travelDetail.travelDate.required"
                  >
                    Please Select Start Travel Date
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6">
                <div class="form-group">
                  <label class="control-label form-label">
                     Arrival Date & Time
                    <span class="text-danger">*</span>
                  </label>
                  <div class="fp-holder">
                    <Datepicker 
                    format="YYYY-MM-DD h:i:s" 
                    placeholder="Please Select Arrival Date Time"
                    min="2024-01-26"
                    max="2024-01-30"
                    v-model="delegates[0].travelDetail[0].arrivalDate"
                    id="dadateTime"
                    :input-class="{
                        'form-control': 'form-control',
                      }"/>
                    </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.delegates.travelDetail.arrivalDate.required"
                  >
                    Please Select Arrival Travel Date
                  </div>
                </div>
              </div>
            </div>
            <h5>Departure Details:-</h5>  
             <div class="row">
               <div class="col-md-4 col-lg-4">
                <div class="form-group">
                  <label
                    for="districts"
                    class="control-label form-label"
                  >
                    Mode of Travel
                    <span class="text-danger">*</span>
                  </label>

                  <v-select

                    v-model="delegates[0].travelDetail[0].dtravelModel"
                    label="name"
                    placeholder="Please Enter Your Mode of Travel"
                    :options="travelModes"
                    :value="delegates[0].travelDetail[0].dtravelModel"
                  />
                  <!-- <div
                    class="text-danger"
                    v-if="
                      !$v.address.district.required &&
                        $v.address.district.$error
                    "
                  >
                    {{ $t('registration.vdistrict') }}
                  </div> -->
                </div>
              </div>
              <div class="col-md-4 col-lg-4">
                <div class="form-group">
                  <label class="control-label form-label">
                    Vehicle/Flight/Train No.
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    minLength="4"
                    maxLength="100"
                    v-model.trim="delegates[0].travelDetail[0].rvehicleNumber"
                    placeholder="Please Specify Vehicle/Flight/Train No."
                    id="vehicleNumber"
                    :class="{
                      'is-invalid': submitted && $v.delegates.travelDetail.rvehicleNumber.$invalid
                    }"
                  >
                  <!-- <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.fullName.required"
                  >
                    {{ $t('registration.vstudnetName1') }}
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.fullName.isNameValid"
                  >
                    {{ $t('registration.vstudnetName2') }}
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.fullName.maxLength"
                  >
                    {{ $t('registration.vsMaxLength') }} 100 charachters
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.fullName.minLength"
                  >
                    {{ $t('registration.vsMinLength') }} 4 charachters
                  </div> -->
                </div>
              </div>
              <div class="col-md-4 col-lg-4">
                <div class="form-group">
                  <label
                    for="districts"
                    class="control-label form-label"
                  >
                    Return Date & Time
                    <span class="text-danger">*</span>
                  </label>

                  <div class="fp-holder">
                    <Datepicker 
                    format="YYYY-MM-DD h:i:s" 
                    placeholder="Please Select Departure Date Time"
                    min="2024-01-26"
                    max="2024-01-30"
                    v-model="delegates[0].travelDetail[0].departureDate"
                    id="dddateTime"
                    :input-class="{
                        'form-control': 'form-control',
                      }"/>
                    </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.delegates.travelDetail.departureDate.required"
                  >
                    Please Select Departure Travel Date
                  </div>
                </div>
              </div>
            </div>
          </div> 

          <div class="card-form">
            <div class="card-header card-header-alt mt-0">
              <div v-if="this.$route.query.subtype == 'Officials'">
                 Officer2 Personal Details
                </div>
                <div v-else>
                  Spouse Details
              </div>              
            </div>
             <div class="row">
              <div class="d-block text-center">
              <div size="180" class="user">
              <input @change="handleFileChange1" ref="fileInput1" type="file" style="display: none">
              <b-avatar size="180" :src="profilePictureUrl1 ? profilePictureUrl1 : '../../../public/assets/images/no-image-icon-23485.png'" class="profile-img" badge-variant="info">
                <template #badge><i class="bi bi-pencil-square text-white" @click="openFileInput1"></i></template>
                </b-avatar>
                </div>
                </div>
             </div>
             <br/> 
             <div class="font-italic text-danger text-center">
              (*Please Note: This Image will be used to create your Conference Id Card. Kindly upload appropriate image and file size should not be more than 10 MB. )
             </div>
            <br/>
            <div class="row">
               <div class="col-md-6 col-lg-6">
                <div class="form-group">
                  <label
                    for="title"
                    class="control-label form-label"
                  >
                    Title
                  
                  </label>

                  <v-select

                    v-model="delegates[0].family[0].title"
                    label="name"
                    placeholder="Please Select title"
                    :options="delegateTitles"
                    :value="delegates[0].family[0].title"
                  />
                  <!-- <div
                    class="text-danger"
                    v-if="
                      !$v.delegates[0].family[0].title.name.required &&
                        $v.delegates[0].family[0].title.name.$error
                    "
                  >
                    Please Select Title
                  </div> -->
                </div>
              </div>
              <div class="col-md-12 col-lg-6">
                <div class="form-group">
                  <label class="control-label form-label">
                    Full Name
                  </label>
                  <input
                    oninput="this.value=this.value.replace(/[^[a-zA-Z.-.'-'\s]/g,'');"
                    class="form-control"
                    minLength="4"
                    maxLength="100"
                    v-model.trim="delegates[0].family[0].name"
                    :placeholder="$t('registration.studentNamePlaceholder')"
                    id="fullName"
                    :class="{
                      'is-invalid': submitted && $v.delegates[0].family[0].name.$invalid
                    }"
                  >
                  <!-- <div
                    class="text-danger"
                    v-if="submitted && !$v.delegates[0].family[0].name.required"
                  >
                    {{ $t('registration.vstudnetName1') }}
                  </div> -->
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.delegates[0].family[0].name.isNameValid"
                  >
                    {{ $t('registration.vstudnetName2') }}
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.delegates[0].family[0].name.maxLength"
                  >
                    {{ $t('registration.vsMaxLength') }} 100 charachters
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.delegates[0].family[0].name.minLength"
                  >
                    {{ $t('registration.vsMinLength') }} 4 charachters
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card-form">
            <div class="card-header card-header-alt">
              <div v-if="this.$route.query.subtype == 'Officials'">
                 Officer2 Contact Details
                </div>
                <div v-else>
                  Spouse Contact Details
              </div>  
            </div>
            <div class="row">
              <div class="col-md-6 col-lg-6">
                    <div class="form-group">
                      <label class="control-label form-label">
                        Mobile Number
                      </label>
                      <div class="input-group">
                        <input
                          class="form-control"
                          oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                          maxlength="10"
                          minlength="10"
                          v-model.trim="delegates[0].family[0].mobileNo"
                          id="mobileNumber"
                          :placeholder="$t('registration.mobilePlaceholder')"
                          :disabled="flag == 1"
                          :class="{
                            'is-invalid':
                              submitted && $v.delegates[0].family[0].mobileNo.$invalid
                          }"
                        >
                       </div>
                       <div
                        class="text-danger"
                        v-if="submitted && !$v.delegates[0].family[0].mobileNo.numeric"
                      >
                        {{ $t('registration.vmobile2') }}
                      </div>
                      <div
                        class="text-danger"
                        v-if="submitted && !$v.delegates[0].family[0].mobileNo.isMobileValid"
                      >
                        Invalid Mobile Number
                      </div>
                      <div
                        class="text-danger"
                        v-if="
                          submitted &&
                            (!$v.delegates[0].family[0].mobileNo.minLength ||
                            !$v.delegates[0].family[0].mobileNo.maxLength)
                        "
                      >
                        {{ $t('registration.vmobile3') }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-6">
                    <div class="form-group">
                      <label
                        class="control-label form-label"
                      >Email ID</label>
                      <div class="input-group">
                        <input
                          type="email"
                          class="form-control"
                          v-model.trim="delegates[0].family[0].email"
                          :placeholder="$t('registration.emailIdPlaceholder')"
                          id="emailID"
                          :class="{
                            'is-invalid':
                              submitted && $v.delegates[0].family[0].email.$invalid
                          }"
                        >
                      </div>
                    </div>
                  </div>
            </div>
           </div>
   
         <div class="card-form">
           <div class="card-header card-header-alt">
            <div v-if="this.$route.query.subtype == 'Officials'">
                 Officer2 Travel Details
                </div>
                <div v-else>
                  Spouse Travel Details: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck4"
                      value="checkbox4text"
                      v-model="checked"
                      @click="copyData"
                    >
                    <label
                      class="custom-control-label"
                      for="customCheck4"
                    >
                      (Check If details are same as above)                  
                    </label>
              </div>  
            </div>
           <h5>Arrival Details:-</h5>  
          <div class="row">
               <div class="col-md-4 col-lg-4">
                <div class="form-group">
                  <label
                    for="districts"
                    class="control-label form-label"
                  >
                    Mode of Travel
                  </label>

                  <v-select

                    v-model="delegates[0].travelDetail[1].travelModel"
                    label="name"
                    placeholder="Please Enter Your Mode of Travel"
                    :options="travelModes"
                    :value="delegates[0].travelDetail[1].travelModel"
                  />
                  <!-- <div
                    class="text-danger"
                    v-if="
                      !$v.address.district.required &&
                        $v.address.district.$error
                    "
                  >
                    {{ $t('registration.vdistrict') }}
                  </div> -->
                </div>
              </div>
              <div class="col-md-4 col-lg-4">
                <div class="form-group">
                  <label class="control-label form-label">
                    Vehicle/Flight/Train No.
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    minLength="4"
                    maxLength="100"
                    v-model.trim="delegates[0].travelDetail[1].vehicleNumber"
                    placeholder="Please Specify Vehicle/Flight/Train No."
                    id="vehicleNumber"
                    :class="{
                      'is-invalid': submitted && $v.delegates.travelDetail.vehicleNumber.$invalid
                    }"
                  >
                  <!-- <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.fullName.required"
                  >
                    {{ $t('registration.vstudnetName1') }}
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.fullName.isNameValid"
                  >
                    {{ $t('registration.vstudnetName2') }}
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.fullName.maxLength"
                  >
                    {{ $t('registration.vsMaxLength') }} 100 charachters
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.fullName.minLength"
                  >
                    {{ $t('registration.vsMinLength') }} 4 charachters
                  </div> -->
                </div>
              </div>
              <div class="col-md-4 col-lg-4">

                <div class="form-group" v-if="delegates[0].travelDetail[1].travelModel.name == 'Flight'">
                  <label class="control-label form-label">
                    Arrival To
                  </label>
                  <v-select
                    v-model="delegates[0].travelDetail[1].arrivalTo"
                    label="name"
                    placeholder="Please Select Travel Mode"
                    :options="airportTerminal"
                    :value="delegates[0].travelDetail[1].arrivalTo.name"
                  />
                </div>
                <div class="form-group" v-if="delegates[0].travelDetail[1].travelModel.name == 'Train'">
                  <label class="control-label form-label">
                    Arrival To
                    <span class="text-danger">*</span>
                  </label>
                  <v-select
                    v-model="delegates[0].travelDetail[1].arrivalTo"
                    label="name"
                    placeholder="Please Select Travel Mode"
                    :options="railwayStation"
                    :value="delegates[0].travelDetail[1].arrivalTo.name"
                  />
                </div>
              </div>
            </div>
            <div class="row" v-if="delegates[0].travelDetail[1].travelModel.name == 'Train' && delegates[0].travelDetail[1].arrivalTo.name == 'Other'">
              <div class="col-md-12 col-lg-12">
                <input
                    oninput="this.value=this.value.replace(/[^[a-zA-Z.-.'-'\s]/g,'');"
                    class="form-control"
                    minLength="4"
                    maxLength="100"
                    v-model.trim="delegates[0].travelDetail[1].other"
                    placeholder="Please Specify"
                    id="specify"
                    :class="{
                      'is-invalid': submitted && $v.delegates[0].travelDetail[1].other.$invalid
                    }"
                  >
              </div>
            </div>
            <div class="row">
               <div class="col-md-6 col-lg-6">
                <div class="form-group">
                  <label
                    for="districts"
                    class="control-label form-label"
                  >
                     Start Travel Date & Time
                   </label>

                  <div class="fp-holder">
                    
                    <Datepicker 
                    format="YYYY-MM-DD h:i:s" 
                    placeholder="Please Select Travel Date Time"
                    min="2024-01-26"
                    max="2024-01-30"
                    v-model="delegates[0].travelDetail[1].travelDate"
                    id="sdateTime"
                    :input-class="{
                        'form-control': 'form-control',
                      }"/>
                    </div>
                  <!-- <div
                    class="text-danger"
                    v-if="submitted && !$v.delegates.travelDetail.travelDate.required"
                  >
                    Please Select Start Travel Date
                  </div> -->
                </div>
              </div>
              <div class="col-md-6 col-lg-6">
                <div class="form-group">
                  <label class="control-label form-label">
                     Arrival Date & Time
                   </label>
                  <div class="fp-holder">
                    <Datepicker 
                    format="YYYY-MM-DD h:i:s" 
                    placeholder="Please Select Arrival Date Time"
                    min="2024-01-26"
                    max="2024-01-30"
                    v-model="delegates[0].travelDetail[1].arrivalDate"
                    id="sadateTime"
                    :input-class="{
                        'form-control': 'form-control',
                      }"/>
                    </div>
                  <!-- <div
                    class="text-danger"
                    v-if="submitted && !$v.delegates.travelDetail.arrivalDate.required"
                  >
                    Please Select Arrival Travel Date
                  </div> -->
                </div>
              </div>
            </div>
            <h5>Departure Details:-</h5>  
             <div class="row">
               <div class="col-md-4 col-lg-4">
                <div class="form-group">
                  <label
                    for="districts"
                    class="control-label form-label"
                  >
                    Mode of Travel
                  </label>
                  <v-select
                    v-model="delegates[0].travelDetail[1].dtravelModel"
                    label="name"
                    placeholder="Please Enter Your Mode of Travel "
                    :options="travelModes"
                    :value="delegates[0].travelDetail[1].dtravelModel.name"
                  />
                  <!-- <div
                    class="text-danger"
                    v-if="
                      !$v.address.district.required &&
                        $v.address.district.$error
                    "
                  >
                    {{ $t('registration.vdistrict') }}
                  </div> -->
                </div>
              </div>
              <div class="col-md-4 col-lg-4">
                <div class="form-group">
                  <label class="control-label form-label">
                    Vehicle/Flight/Train No.
                    </label>
                  <input
                    type="text"
                    class="form-control"
                    minLength="4"
                    maxLength="100"
                    v-model.trim="delegates[0].travelDetail[1].rvehicleNumber"
                    placeholder="Please Specify Vehicle/Flight/Train No."
                    id="vehicleNumber"
                    :class="{
                      'is-invalid': submitted && $v.delegates.travelDetail.rvehicleNumber.$invalid
                    }"  
                  >
                  <!-- <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.fullName.required"
                  >
                    {{ $t('registration.vstudnetName1') }}
                  </div> -->
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.fullName.isNameValid"
                  >
                    {{ $t('registration.vstudnetName2') }}
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.fullName.maxLength"
                  >
                    {{ $t('registration.vsMaxLength') }} 100 charachters
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.fullName.minLength"
                  >
                    {{ $t('registration.vsMinLength') }} 4 charachters
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-lg-4">
                <div class="form-group">
                  <label
                    for="districts"
                    class="control-label form-label"
                  >
                    Return Date & Time
                  </label>

                  <div class="fp-holder">
                    <Datepicker 
                    format="YYYY-MM-DD h:i:s" 
                    placeholder="Please Select Departure Date Time"
                    min="2024-01-26"
                    max="2024-01-30"
                    v-model="delegates[0].travelDetail[1].departureDate"
                    id="sddateTime"
                    :input-class="{
                        'form-control': 'form-control',
                      }"/>
                    </div>
                  <!-- <div
                    class="text-danger"
                    v-if="submitted && !$v.delegates.travelDetail.departureDate.required"
                  >
                    Please Select Departure Travel Date
                  </div> -->
                </div>
              </div>
            </div>
            </div>
          <br/>
          <!-- <div class="card-form">
            <div class="card-header card-header-alt mt-0">
              Others:
            </div>
             <div class="rows">
              <div class="col-md-12 col-lg-12">
                <div class="form-group">
                  <label
                    for="states"
                    class="control-label form-label"
                  >Interested Site Seeing</label>
                  <span class="text-danger">*</span>

                  <v-select
                    v-model="delegates[0].siteSeeing"
                    label="name"
                    placeholder="Please Select Site Seeing"
                    :options="siteSeeing"
                    :value="delegates[0].siteSeeing"
                  />
                   <div
                    class="text-danger"
                    v-if="
                      !$v.delegates.siteSeeing.name.required &&
                        $v.delegates.siteSeeing.name.$error
                    "
                  >
                    {{ $t('registration.vstate') }}
                  </div> 
                </div>
              </div>
             </div>
          </div> -->
          <br/>
          <div class="card-form">
            <div class="form-action-alt">
              <button
                type="button"
                class="btn btn-page"
                @click="applicantRegister()"
              >
                Register
              </button>
            </div>
          </div>
          <br/>
         </div>
       </div>
    </div>
  </section>
</template>

<script>
import { loadLanguageAsync } from '@/setup/i18n-setup.js'
import MQL from '@/plugins/mql.js'
import {
  required,
  numeric,
  minLength,
  maxLength,
  helpers,
  email,
  requiredIf
} from 'vuelidate/lib/validators'
import Swal from 'sweetalert2'
import VueCropper from 'vue-cropperjs'
import Datepicker from 'vuejs-datetimepicker'
import { ref } from 'vue'
import axios from 'axios'
var moment = require('moment')
export default {
  components: { 
    VueCropper,
    Datepicker 
  },
  props: ['image_name'],
  data () {
    const fileInput = ref(null);
    const fileInput1 = ref(null);
    const profilePictureUrl = ref(null);
    const profilePictureUrl1 = ref(null);
    
    const handleFileChange = (event) => {
       const file = event.target.files[0];
       profilePictureUrl.value = URL.createObjectURL(file);
       console.log(profilePictureUrl.value);
       const  formData = new FormData();
        formData.append('file',file);
        
       axios.post(this.$store.getters["getIpaddress"]+'photo/uploadFile',formData)
       .then((response) => {
        console.log(response);
        this.delegates[0].photoPath = response.data;
        this.$toasted.success('Image Uploaded Successfully', {
          theme: 'bubble',
          position: 'top-center',
          duration: 3000
        });
       }); 
    }

    const handleFileChange1 = (event) => {
       const file1 = event.target.files[0];
       profilePictureUrl1.value = URL.createObjectURL(file1);
       console.log(profilePictureUrl1.value);
       const formData1 = new FormData();
        formData1.append('file',file1);
        
       axios.post(this.$store.getters["getIpaddress"]+'photo/uploadFile',formData1)
       .then((response) => {
        console.log(response);
        this.delegates[0].sphotoPath = response.data;
        this.$toasted.success('Image Uploaded Successfully', {
          theme: 'bubble',
          position: 'top-center',
          duration: 3000
        });
       }); 
    }

    return {
      // mime_type: '',
      // cropedImage: '',
      // autoCrop: false,
      // selectedFile: '',
      // image: '',
      // dialog: false,
      // files: '',
      fileInput,
      fileInput1,
      profilePictureUrl,
      profilePictureUrl1,
      handleFileChange,
      handleFileChange1,
      checked: false,
      mainProps: { blank: true, blankColor: '#777', width: 30, height: 30, class: 'm1' },
      file: null,
      imageUrl: null,
      address: {
        district: null,
        pincode: null,
        state: null
      },
      basic: {
        dateOfBirth: '',
        fullName: '',
        gender: '',
        userName: ''
      },
      contact: {
        emailID: '',
        mobileNumber: '',
        votp: '',
        eotp: ''
      },
      qualification: {
        qualificationId: '',
        qualificationName: ''
      },
      other: {
        preference: '',
        reference: {
          referral: ''
        }
      },
      
      timer: 0,
      isAgeValid: null,
       commonDateConfig: {
        dateFormat: 'Y-m-d',
        maxDate: this.maxDate,
        minDate: this.minDate
      },
     
      years: [],
      customDate: null,
      submitted:false,
      delegateFinal:[{
        titleId: null,
        designationId: null,
        stateId: null,
        delegatePhotoId: null,
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        mobileNo: null,
        spouseName: '',
        spouseEmail: '',
        spouseMobileNo: '',
        spouseTitleId: '',
        spousePhotoId: null,
        visitingPlacesIds: '',
        totalTravelDetailSize: null,
        travelDetails: [
            {
                arrivalTravelMode: null,
                arrivalVehicleNumber: null,
                travelStartDate: '',
                arrivalStartDate: '',
                departureTravelMode: null,
                departureDate: '',
                departureVehicleNumber: null,
                isDelegate: false,
			        	arriveTo:''
            },
            {
                arrivalTravelMode: null,
                arrivalVehicleNumber: null,
                travelStartDate: '',
                arrivalStartDate: '',
                departureTravelMode: null,
                departureDate: '',
                departureVehicleNumber: null,
                isDelegate: false,
          			arriveTo:''
          }
        ]
      }],
      delegates:[{
        firstname:'',
        lastname:'',
        middlename:'',     
        email:'',
        mobileNo:'',
        state:{
          name : '',
          code : '',
          id : ''
        },
        photoPath:'',
        sphotoPath:'',
        title: {
          name :'',
          id: null
        },
        designation:{
          name :'',
          type:'',
          id: null
        },
        family: [
          {
              name : '',
              title: {
                name :'',
                id: null
              }, 
              email: '',
              mobileNo: '',   
          }
        ],
         travelDetail: [
          {
            travelModel : {
              type :'',
              id: null
            },
            dtravelModel : {
              type :'',
              id: null
            },
            vehicleNumber : '',
            rvehicleNumber:'',
            arrivalTo : {
              id: null,
              name:''
            },
            travelDate : '',
            arrivalDate : '',
            departureDate : '',
            isDelegate : null,
          },
          {
            travelModel : {
              name :'',
              id: null
            },
            dtravelModel : {
              name :'',
              id: null
            },
            vehicleNumber : '',
            rvehicleNumber:'',
            arrivalTo : {
              id: null,
              name:''
            },
            travelDate : '',
            arrivalDate : '',
            departureDate : '',
            isDelegate : null,
          }
         ],
         siteSeeing: {
          name :'',
          id: null
        }
        }],
         title:{
          name :'',
          id: null
        },
         travelmode:{
          name :'',
          id: null
        },
        returntravelmode:{
          name :'',
          id: null
        },
        stravelmode:{
          name :'',
          id: null
        },
        sreturntravelmode:{
          name :'',
          id: null
        },
        siteSeeing :[],
        delegateDesignation : [],
        designations:'',
        airportTerminal : [
          {
            id : 1,
            name : 'Terminal-1'
          },      
          {
            id : 2,
            name : 'Terminal-2'
          }
        ],
        railwayStation : [
          {
            id : 1,
            name : 'Mumbai Central'
          },      
          {
            id : 2,
            name : 'Bandra Terminus'
          },
          {
            id : 3,
            name : 'Chhatrapati Shivaji Maharaj Terminus'
          },
          {
            id : 4,
            name : 'Other'
          }
        ],
        delegateTitles : [],
        States : [],
        travelModes :[]
    }
  },
  computed: {
    
    pleaseSpecifyInvalid () {
      if (this.other.reference.refferal === 'Other') {
        if (this.pleaseSpecify.length >= 5 && this.pleaseSpecify.length < 200) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    }
  },
  // components: {
  //   Datepicker
  // },
  validations: {
    delegates:{
      $each :{
        firstname:required,
        lastname:required,  
        email:required,
        mobileNo : required,
        state:{
          name : required,
          code : required,
          id : required
        },
        photoPath:required,
        title: {
          name :{
            required
          }
        },
        designation:{required},
        family:{
          $each:{
              name : required,
              title: {
                name :required,
              }, 
               mobileNo: required,   
          }},
         travelDetail:{
          $each:{
            travelModel : {
              name :required,
            },
            dtravelModel : {
              name :required,
            },
            vehicleNumber : {required},
            travelDate : {required},
            arrivalDate : {required},
            arrivalFrom : {required},
            departureDate : {required},
            isDelegate : {required},
          }
         }
        }
      },
    address: {
      pincode: {
        required,
        numeric,
        minLength: minLength(6),
        maxLength: maxLength(6)
      },
      state: {
        required
      },
      district: {
        required
      }
    },
    basic: {
      dateOfBirth: {
        required
      },
      fullName: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(100),
        isNameValid: helpers.regex('isNameValid', /^[a-zA-Z ]*$/)
      },

      gender: {
        required
      }
    },
    contact: {
      emailID: {
        email,
        required
      },
      mobileNumber: {
        required,
        numeric,
        minLength: minLength(10),
        maxLength: maxLength(10),
        isMobileValid: helpers.regex('isMobileValid', /^((?![0-5])[0-9]{10})$/)
      },
      votp: { required },
      eotp: { required }
    },
    qualification: {
      qualificationName: {
        required
      }
    },
    other: {
      preference: { required },
      reference: {
        refferal: { required }
      }
    }
  },
  created () {
    const vm = this
    vm.starter()

    // vm.getEducationLevelDetails()

    // vm.selectTypeOfExam();
    // vm.getAllCountries()
    //   .then(() => {
    //   vm.countryId = '113'
    //   alert('inside')
    //   vm.getStatesByCountryId().then(() => {
    //     vm.stateId = '113'

    //   })
    // })
    // vm.getAllDistricts();
  },
  mounted () {
    this.$nextTick(() => {
      this.fileInput = this.$refs.fileInput;
      // Now fileInput is guaranteed to be available
    });
    this.$nextTick(() => {
      this.fileInput1 = this.$refs.fileInput1;
      // Now fileInput is guaranteed to be available
    });
    var designationSubtype = this.$route.query.subtype;
    this.fetchUserDesignation(designationSubtype.toLowerCase())
    this.fetchUserTitle()
    this.fetchUserVistingPlaces()
    this.fetchUserModeOfTravel()
  },
  methods: {
    changeLanguage (lang) {
      this.$i18n.locale = lang
      this.$i18n.fallbackLocale = lang
      loadLanguageAsync(lang).then(() => {
      })
    },

    fetchUserDesignation(paramDesignation){
      const vm = this
      axios
           .get(
            vm.$store.getters["getIpaddress"]+"designation/getDesignations/"+paramDesignation
           )
           .then(response => {
             console.log(response);
             if(response.data != null){
                 vm.delegateDesignation = response.data;
              } else{
               vm.$toasted.error('Some error occurred. Kindly contact the administrator.', {
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

    },

    fetchUserTitle(){
     const vm = this
      axios
           .get(
            vm.$store.getters["getIpaddress"]+"title/getAllTitles"
           )
           .then(response => {
             console.log(response);
             if(response.data != null){
                 vm.delegateTitles = response.data;
              } else{
               vm.$toasted.error('Some error occurred. Kindly contact the administrator.', {
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
    },

    fetchUserVistingPlaces(){
      const vm = this
      axios
           .get(
            vm.$store.getters["getIpaddress"]+"visitingPlaces/getAllVisitingPlaces"
           )
           .then(response => {
             console.log(response);
             if(response.data != null){
                 vm.siteSeeing = response.data;
              } else{
               vm.$toasted.error('Some error occurred. Kindly contact the administrator.', {
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
    },

    fetchUserModeOfTravel(){
      const vm = this
      axios
           .get(
            vm.$store.getters["getIpaddress"]+"travelMode/getAllTravelModes"
           )
           .then(response => {
             console.log(response);
             if(response.data != null){
                 vm.travelModes = response.data;
              } else{
               vm.$toasted.error('Some error occurred. Kindly contact the administrator.', {
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
    },
    openFileInput() {
      if (this.fileInput) {
        this.fileInput.click();
      }
    },
    openFileInput1() {
      if (this.fileInput1) {
        this.fileInput1.click();
      }
    },
      handleFileChange() {
      // Process the file and save the image URL
      if (this.file) {
        // Perform file upload logic here (e.g., using Axios or other methods)
        // After successful upload, set the imageUrl to the URL of the uploaded image
        // For demonstration purposes, using a FileReader to preview the image locally
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result;
        };
        reader.readAsDataURL(this.file);
      }
    },
    copyData(){
      this.delegates[0].travelDetail[1] = this.delegates[0].travelDetail[0];
    },
    saveImage() {
      const userId = this.$route.params.user_id
      this.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL()
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData()
        formData.append('profile_photo', blob, 'name.jpeg')
        axios
          .post('/api/user/' + userId + '/profile-photo', formData)
          .then((response) => {
          })
          .catch(function (error) {
            console.log(error)
          })
      }, this.mime_type)
    },
    onFileSelect(e) {
      const file = e.target.files[0]
      this.mime_type = file.type
      console.log(this.mime_type)
      if (typeof FileReader === 'function') {
        this.dialog = true
        const reader = new FileReader()
        reader.onload = (event) => {
          this.selectedFile = event.target.result
          this.$refs.cropper.replace(this.selectedFile)
        }
        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },

    validateAge () {
      // this.$store.dispatch('getServerTime').then((res) => {
      // let age = moment(res.result.date).diff(date, 'years', false)

      var dateEntered = this.student.dateOfBirth
      let age = moment(this.currentDateTime).diff(dateEntered, 'years', false)// let age = 20

      if (age < 18 || age >= 58) {
        this.isAgeValid = false
      } else {
        this.isAgeValid = true
      }
      // })
    },
    phonenumber (mobileNumber) {
      var phoneNo = /^((?![0-5])[0-9]{10})$/

      if (!mobileNumber.target.value.match(phoneNo)) {
        this.isMobileValid = false

        return false
      } else {
        this.isMobileValid = true
        return true
      }
    },
    async starter () {
      const vm = this

      // await vm.getAllCountries()

      // vm.countryId = vm.countries.filter(
      //   (country) => country.countryName == 'India'
      // )[0].countryId
      vm.countryId = '001'
      await vm.getStatesByCountryId()
      await vm.getPreferences()
      // vm.stateId = vm.states.filter(
      //   (state) => state.STATE_NAME == 'Maharashtra'
      // )[0].STATE_CODE
      // vm.stateId = '21'
      // await vm.getDistrictsByStateId()

      // await vm.getTalukaByDistrictId();
    },

    getEmailOtp () {
      const vm = this

      this.showEmailOtpField = true
      new MQL()
        .setActivity('o.[SendEmailOTP]')
        .setData({ contact: { emailID: this.contact.emailID } })
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('SendEmailOTP', true)
          if (rs.isValid('SendEmailOTP')) {
            if (res.result.result === undefined) {
              this.$toasted.success('OTP sent to your Email ID', {
                theme: 'bubble',
                position: 'top-center',
                duration: 3000
              })
              this.$toasted.info(
                'Please wait for 30 seconds before resending OTP',
                {
                  theme: 'bubble',
                  position: 'top-center',
                  duration: 3000
                }
              )
              this.sendEmailOtpFlag = true

              vm.timer = setTimeout(function () {
                vm.sendEmailOtpFlag = false
              }, 30000)
            } else {
              this.showEmailOtpField = false
              this.$toasted.error('Email ID already exists', { duration: 3000 })
              rs.showErrorToast('SendEmailOTP')
            }
          }
        })
    },
    getOtp () {
      const vm = this

      this.showOtpField = true
      new MQL()
        .setActivity('o.[SendMobileOTP]')
        .setData({ contact: { mobileNumber: this.contact.mobileNumber } })
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('SendMobileOTP', true)

          if (rs.isValid('SendMobileOTP')) {
            if (res.result.result === undefined) {
              this.$toasted.success('OTP sent to your Mobile Number', {
                theme: 'bubble',
                position: 'top-center',
                duration: 3000
              })
              this.$toasted.info(
                'Please wait for 30 seconds before resending OTP',
                {
                  theme: 'bubble',
                  position: 'top-center',
                  duration: 3000
                }
              )
              this.sendOtpFlag = true

              vm.timer = setTimeout(function () {
                vm.sendOtpFlag = false
              }, 30000)
            } else {
              this.showOtpField = false
              this.$toasted.error('Mobile Number already exists', { duration: 3000 })
              rs.showErrorToast('SendMobileOTP')
            }
          } else {
            rs.showErrorToast('SendMobileOTP')
          }
        })
    },
    verifyEmailOtp () {
      const vm = this
      new MQL()
        .setActivity('o.[VerifyEmailOTP]')
        .setData({ email: this.contact.emailID, verifyOTP: this.contact.eotp })
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('VerifyEmailOTP', true)
          if (rs.isValid('VerifyEmailOTP')) {
            if (res.result.verifyOTP === 'OTPFOUND') {
              this.sendEmailOtpFlag = true
              this.emailflag = 1

              this.emailButton = 'Verified'
              if (vm.timer) {
                clearTimeout(vm.timer)
                vm.timer = 0
              }
              this.$toasted.success('OTP Verified', {
                theme: 'bubble',
                position: 'top-center',
                duration: 3000
              })
            } else if (res.result.verifyOTP === 'OTPNOTFOUND') {
              this.emailflag = 0

              this.$toasted.error('Invalid OTP ', {
                theme: 'bubble',
                position: 'top-center',
                duration: 3000
              })
            } else if (res.result.verifyOTP === 'OTPKEYNOTFOUND') {
              this.emailflag = 0

              this.$toasted.error('OTP Expired ', {
                theme: 'bubble',
                position: 'top-center',
                duration: 3000
              })
            } else {
              this.emailflag = 0

              this.$toasted.error('Invalid OTP', {
                theme: 'bubble',
                position: 'top-center',
                duration: 3000
              })
            }
          } else {
            rs.showErrorToast('VerifyEmailOTP')
          }
        })
    },
    verifyOtp () {
      const vm = this
      new MQL()
        .setActivity('o.[VerifyMobileOTP]')
        .setData({ mobileNumber: this.contact.mobileNumber, verifyOTP: this.contact.votp })
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('VerifyMobileOTP', true)
          if (rs.isValid('VerifyMobileOTP')) {
            if (res.result.verifyOTP === 'OTPFOUND') {
              this.sendOtpFlag = true
              this.flag = 1

              this.button = 'Verified'
              if (vm.timer) {
                clearTimeout(vm.timer)
                vm.timer = 0
              }
              this.$toasted.success('OTP Verified', {
                theme: 'bubble',
                position: 'top-center',
                duration: 3000
              })
            } else if (res.result.verifyOTP === 'OTPNOTFOUND') {
              this.flag = 0

              this.$toasted.error('Invalid OTP ', {
                theme: 'bubble',
                position: 'top-center',
                duration: 3000
              })
            } else if (res.result.verifyOTP === 'OTPKEYNOTFOUND') {
              this.flag = 0

              this.$toasted.error('OTP Expired ', {
                theme: 'bubble',
                position: 'top-center',
                duration: 3000
              })
            } else {
              this.flag = 0

              this.$toasted.error('Invalid OTP', {
                theme: 'bubble',
                position: 'top-center',
                duration: 3000
              })
            }
          } else {
            rs.showErrorToast('VerifyMobileOTP')
          }
        })
    },
    getStatesByCountryId () {
      return new Promise((resolve) => {
        const vm = this

        // vm.countryId = vm.student.selectedCountry.countryId
        vm.countryName = 'India'
        new MQL()
          .setActivity('o.[query_293ccRYOvTADqM5DVvZGDX6ceNb]')
          .setData({ countryName: vm.countryName })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity('query_293ccRYOvTADqM5DVvZGDX6ceNb', true)
            if (rs.isValid('query_293ccRYOvTADqM5DVvZGDX6ceNb')) {
              if (res == null) {
                res = []
              }

              vm.districts = []
              vm.states = res

              //  if (vm.initflag){
              vm.student.selectedState = vm.states.find(
                (state) => state.stateName === 'Maharashtra'
              ).stateId
              resolve()
            } else {
              rs.showErrorToast('query_293ccRYOvTADqM5DVvZGDX6ceNb')
            }
          })
      })
    },

    getDistrictsByStateId () {
      return new Promise((resolve) => {
        const vm = this

        new MQL()
          .setActivity('o.[query_293k2pcHKiS7GMwuDb9e1veS2g4]')
          .setData({ stateName: this.address.state.displayName })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity('query_293k2pcHKiS7GMwuDb9e1veS2g4', true)
            if (rs.isValid('query_293k2pcHKiS7GMwuDb9e1veS2g4')) {
              if (res == null) {
                res = []
              }
              vm.address.district = null
              vm.districts = []
              vm.districts = res
              resolve()
            } else {
              rs.showErrorToast('query_293k2pcHKiS7GMwuDb9e1veS2g4')
            }
          })
      })
    },

    getMaxMinDate () {
      new MQL()
        .setActivity('o.[BirthDateRange]')
        .setData()
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('BirthDateRange', true)
          if (rs.isValid('BirthDateRange')) {
            this.currentDateTime = res.result.now
            this.minDate = res.result.minDate
            this.maxDate = res.result.maxDate
          } else {
            rs.showErrorToast('BirthDateRange')
          }
        })
    },

    getClassDetails () {
      const vm = this
      new MQL()
        .setActivity('o.[query_2942pqjL5MapX6N3RrGZeVmgHql]')
        // .setData(data)
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('query_2942pqjL5MapX6N3RrGZeVmgHql', true)
          if (rs.isValid('query_2942pqjL5MapX6N3RrGZeVmgHql')) {
            if (res !== null) {
              vm.Class = []
              vm.Class = res
              // if (vm.userDetails[0].selectedClass == null) {
              //   vm.userDetails[0].selectedClass = vm.Class[0];
              // }
            }
          } else {
            rs.showErrorToast('query_2942pqjL5MapX6N3RrGZeVmgHql')
          }
        })
    },
    getPreferences () {
      const vm = this
      new MQL()
        .setActivity('o.[query_29KhBLz03rP3i795THixK9jJTfl]')
        // .setData(data)
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('query_29KhBLz03rP3i795THixK9jJTfl', true)
          if (rs.isValid('query_29KhBLz03rP3i795THixK9jJTfl')) {
            if (res !== null) {
              vm.preferenceOptions = []
              vm.preferenceOptions = res
              // if (vm.userDetails[0].selectedClass == null) {
              //   vm.userDetails[0].selectedClass = vm.Class[0];
              // }
            }
          } else {
            rs.showErrorToast('query_2942pqjL5MapX6N3RrGZeVmgHql')
          }
        })
    },
    getReferrals () {
      const vm = this
      new MQL()
        .setActivity('o.[query_29KjCJHLzLgJLlA77DwHNGJ58Ve]')
        // .setData(data)
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('query_29KjCJHLzLgJLlA77DwHNGJ58Ve', true)
          if (rs.isValid('query_29KjCJHLzLgJLlA77DwHNGJ58Ve')) {
            if (res !== null) {
              vm.referralOptions = []
              vm.referralOptions = res
              // if (vm.userDetails[0].selectedClass == null) {
              //   vm.userDetails[0].selectedClass = vm.Class[0];
              // }
            }
          } else {
            rs.showErrorToast('query_2942pqjL5MapX6N3RrGZeVmgHql')
          }
        })
    },
    applicantRegister() {
      const vm = this;
      //console.log( this.$store.getters['getStateId'])
      vm.delegateFinal[0].titleId = vm.delegates[0].title.id;
      if(this.$route.query.subtype == 'Officials'){
        vm.delegateFinal[0].designationId = 11;
      }else{
        vm.delegateFinal[0].designationId = vm.delegates[0].designation.id;
      }
      vm.delegateFinal[0].stateId = vm.$store.getters["getStateId"];
      vm.delegateFinal[0].delegatePhotoId = vm.delegates[0].photoPath;
      vm.delegateFinal[0].firstname = vm.delegates[0].firstname;
      vm.delegateFinal[0].middlename = vm.delegates[0].middlename;
      vm.delegateFinal[0].lastname = vm.delegates[0].lastname;
      vm.delegateFinal[0].email = vm.delegates[0].email;
      vm.delegateFinal[0].mobileNo = vm.delegates[0].mobileNo;
      vm.delegateFinal[0].spouseName = vm.delegates[0].family[0].name;
      vm.delegateFinal[0].spouseEmail = vm.delegates[0].family[0].email;
      vm.delegateFinal[0].spouseMobileNo = vm.delegates[0].family[0].mobileNo;
      vm.delegateFinal[0].spouseTitleId = vm.delegates[0].family[0].title.id;
      vm.delegateFinal[0].spousePhotoId = vm.delegates[0].sphotoPath;
      vm.delegateFinal[0].visitingPlacesIds = vm.delegates[0].siteSeeing.id;
      vm.delegateFinal[0].totalTravelDetailSize = 2;
      vm.delegateFinal[0].travelDetails[0].arrivalTravelMode =
        vm.delegates[0].travelDetail[0].travelModel.id;
      vm.delegateFinal[0].travelDetails[0].arrivalVehicleNumber =
        vm.delegates[0].travelDetail[0].vehicleNumber;
      vm.delegateFinal[0].travelDetails[0].travelStartDate =
        vm.delegates[0].travelDetail[0].travelDate;
      vm.delegateFinal[0].travelDetails[0].arrivalStartDate =
        vm.delegates[0].travelDetail[0].arrivalDate;
      vm.delegateFinal[0].travelDetails[0].departureTravelMode =
        vm.delegates[0].travelDetail[0].dtravelModel.id;
      vm.delegateFinal[0].travelDetails[0].departureDate =
        vm.delegates[0].travelDetail[0].departureDate;
      vm.delegateFinal[0].travelDetails[0].departureVehicleNumber =
        vm.delegates[0].travelDetail[0].rvehicleNumber;
      vm.delegateFinal[0].travelDetails[0].isDelegate = true;
      vm.delegateFinal[0].travelDetails[0].arriveTo =
        vm.delegates[0].travelDetail[0].arrivalTo.id +
        "##" +
        vm.delegates[0].travelDetail[0].arrivalTo.name;
      vm.delegateFinal[0].travelDetails[1].arrivalTravelMode =
        vm.delegates[0].travelDetail[1].travelModel.id;
      vm.delegateFinal[0].travelDetails[1].arrivalVehicleNumber =
        vm.delegates[0].travelDetail[1].vehicleNumber;
      vm.delegateFinal[0].travelDetails[1].travelStartDate =
        vm.delegates[0].travelDetail[1].travelDate;
      vm.delegateFinal[0].travelDetails[1].arrivalStartDate =
        vm.delegates[0].travelDetail[1].arrivalDate;
      vm.delegateFinal[0].travelDetails[1].departureTravelMode =
        vm.delegates[0].travelDetail[1].dtravelModel.id;
      vm.delegateFinal[0].travelDetails[1].departureDate =
        vm.delegates[0].travelDetail[1].departureDate;
      vm.delegateFinal[0].travelDetails[1].departureVehicleNumber =
        vm.delegates[0].travelDetail[1].rvehicleNumber;
      vm.delegateFinal[0].travelDetails[1].isDelegate = false;
      vm.delegateFinal[0].travelDetails[1].arriveTo =
        vm.delegates[0].travelDetail[1].arrivalTo.id +
        "##" +
        vm.delegates[0].travelDetail[1].arrivalTo.name;

      let totalTravelDetailSize = 2;

      const params = new FormData();
      params.append("totalTravelDetailSize", 2);
      for (let i = 0; i < totalTravelDetailSize; i++) {
        params.append(
          "travelDetails[" + i + "][arrivalTravelMode]",
          vm.delegates[0].travelDetail[0].travelModel.id
        );
        params.append(
          "travelDetails[" + i + "][arrivalVehicleNumber]",
          vm.delegates[0].travelDetail[i].vehicleNumber
        );
        params.append(
          "travelDetails[" + i + "][travelStartDate]",
          vm.delegates[0].travelDetail[i].travelDate
        );
        params.append(
          "travelDetails[" + i + "][arrivalStartDate]",
          vm.delegates[0].travelDetail[i].arrivalDate
        );
        params.append(
          "travelDetails[" + i + "][departureTravelMode]",
          vm.delegates[0].travelDetail[i].dtravelModel.id
        );
        params.append(
          "travelDetails[" + i + "][departureDate]",
          vm.delegates[0].travelDetail[i].departureDate
        );
        params.append(
          "travelDetails[" + i + "][departureVehicleNumber]",
          vm.delegates[0].travelDetail[i].rvehicleNumber
        );
        params.append(
          "travelDetails[" + i + "][arriveTo]",
          vm.delegates[0].travelDetail[i].arrivalTo.id +
            "##" +
            vm.delegates[0].travelDetail[i].arrivalTo.name
        );
      }
      params.append("travelDetails[0][isDelegate]", true);
      params.append("travelDetails[1][isDelegate]", false);
      params.append("titleId", vm.delegates[0].title.id);
      if(this.$route.query.subtype == "Officials"){
        params.append("designationId", "11");
      }
      else {
        params.append("designationId", vm.delegates[0].designation.id);
      }
      params.append("stateId", vm.$store.getters["getStateId"]);
      params.append("delegatePhotoId", vm.delegates[0].photoPath);
      params.append("middlename", vm.delegates[0].middlename);
      params.append("visitingPlacesIds", 3);
      params.append("lastname", vm.delegates[0].lastname);
      params.append("firstname", vm.delegates[0].firstname);
      params.append("email", vm.delegates[0].email);
      params.append("mobileNo", vm.delegates[0].mobileNo);
      if(this.$route.query.subtype != "Officials"){
      params.append("spouseName", vm.delegates[0].family[0].name);
      params.append("spouseEmail", vm.delegates[0].family[0].email);
      params.append("spouseMobileNo", vm.delegates[0].family[0].mobileNo);
      params.append("spouseTitleId", vm.delegates[0].family[0].title.id);
      params.append("spousePhotoId", vm.delegates[0].sphotoPath);
      }
      console.log();
      axios
        .post(
          vm.$store.getters["getIpaddress"]+"delegate/userId/" +
            vm.$store.getters["getUserId"] +
            "/addDelegate",
          params,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
          }
        )
        .then((response) => {
          console.log(response);
          // this.delegates[0].photoPath = response.data;
          this.$toasted.success("Submitted Successfully", {
            theme: "bubble",
            position: "top-center",
            duration: 3000,
          });
          this.$router.push({
            name: 'Profile'
        })
        });
    },

  }
}
</script>
<style>
#sdateTime {
  border: 1px solid black;
}
#sadateTime {
  border: 1px solid black;
}
 #sddateTime {
  border: 1px solid black;
}
#ddateTime {
  border: 1px solid black;
}
#dadateTime {
  border: 1px solid black;
}
#dddateTime {
  border: 1px solid black;
}

 /* .user {
  width: 140px;
  height: 120px;
  border-radius: 100%;
  border: 3px solid #2e7d32;
  position: relative;
} */
.profile-img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.icon {
  position: absolute;
  top: 10px;
  right: 0;
  background: #e2e2e2;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  line-height: 30px;
  vertical-align: middle;
  text-align: center;
  color: #0000ff;
  font-size: 8px;
  cursor: pointer;
} 
</style>
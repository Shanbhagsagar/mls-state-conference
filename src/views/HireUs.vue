<template>
  <section id="login">
    <div class="card-login card-register">
      <div class="row card-wrapper">
        <div class="col login-block">
         
         <header class="header">    
              <div class="navigation-bar">
                <b-navbar
                  toggleable="lg"
                    variant="navmenu"
                >
                  <b-navbar-toggle target="nav-collapse" />
                      <b-collapse
                        id="nav-collapse"
                        is-nav
                      >
                          <b-navbar-nav class="m-auto">
                            <b-nav-item to="/">
                                Home
                            </b-nav-item>          
                            <b-nav-item to="/HireUs">
                                  Hire US
                              </b-nav-item>
                            <b-nav-item to="/about">
                              About
                            </b-nav-item>
                            <b-nav-item
                              to="/termsandconditions"
                            >
                              Terms and Conditions
                            </b-nav-item>
                        </b-navbar-nav>
                      </b-collapse>
                    </b-navbar>
               </div>
           </header>

          <div class="d-block text-center">
            <h1 class="modal-title">
              Hire From Us
            </h1>
          </div>


          <div class="card-form">
            <div class="card-header card-header-alt mt-0">
              Organization  Details
            </div>
            <div class="row">
              <div class="col-md-12 col-lg-4">
                <div class="form-group">
                  <label class="control-label form-label">
                    Organization Name
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    oninput="this.value=this.value.replace(/[^[a-zA-Z.-.'-'\s]/g,'');"
                    class="form-control"
                    minLength="4"
                    maxLength="100"
                    v-model.trim="basic.OrganizationName"
                    :placeholder="$t('HireUs.OrganizationNamePlaceHolder')"
                    id="OrganizationName"
                    :class="{
                      'is-invalid': submitted && $v.basic.OrganizationName.$invalid
                    }"
                  >
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.OrganizationName.required"
                  >
                    {{ $t('HireUs.vOrganizationName1') }}
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.OrganizationName.isNameValid"
                  >
                    {{ $t('HireUs.vOrganizationName2') }}
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.OrganizationName.maxLength"
                  >
                    {{ $t('HireUs.vsMaxLength') }} 100 charachters
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.OrganizationName.minLength"
                  >
                    {{ $t('HireUs.vsMinLength') }} 4 charachters
                  </div>
                </div>
              </div>


                  <div class="col-md-6 col-lg-4">
                <div class="form-group">
                  <label
                    for="Sector"
                    class="control-label form-label"
                  >Sector</label>
               
                  <span class="text-danger">*</span>

                    <input
                    oninput="this.value=this.value.replace(/[^[a-zA-Z.-.'-'\s]/g,'');"
                    class="form-control"
                    minLength="4"
                    maxLength="20"
                    v-model.trim="basic.OrganizationSector"
                    :placeholder="$t('HireUs.OrganizationSector')"
                    id="OrganizationSector"
                    :class="{
                      'is-invalid': submitted && $v.basic.OrganizationSector.$invalid
                    }"
                  >
                    <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.OrganizationSector.required"
                  >
                    {{ $t('HireUs.vOrganizationSector') }}
                  </div>
                    
               
                </div>
              </div>



              <div class="col-md-12 col-lg-4">
                <div class="form-group">
                  <label class="control-label form-label">
                    Organization Website
                    <span class="text-danger">*</span>
                  </label>
                  <input
                   
                    class="form-control"
                    minLength="4"
                    maxLength="20"
                    v-model.trim="basic.OrganizationWebsite"
                    :placeholder="$t('HireUs.OrganizationWebsite')"
                    id="OrganizationWebsite"
                    :class="{
                      'is-invalid': submitted && $v.basic.OrganizationName.$invalid
                    }"
                  >
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.OrganizationName.required"
                  >
                    {{ $t('HireUs.vOrganizationWebsite1') }}
                  </div>                           
                </div>
              </div>

                

              
              
            </div>
          </div>

            <div class="card-form">
            <div class="card-header card-header-alt">
              Employer  Details
            </div>
            <div class="row">
              <div class="col-md-12 col-lg-4">
                  <div class="form-group">
                     <label class="control-label form-label">
                        Person Name
                        <span class="text-danger">*</span>
                      </label>
                      <input
                       oninput="this.value=this.value.replace(/[^[a-zA-Z.-.'-'\s]/g,'');"
                        class="form-control"
                        minLength="4"
                        maxLength="15"
                        v-model.trim="employerDetails.contactPersonName"
                        :placeholder="$t('HireUs.contactPersonName')"
                        id="contactPersonName"
                        :class="{
                         'is-invalid': submitted && $v.employerDetails.contactPersonName.$invalid
                        }"
                        >
                        
                          <div
                           class="text-danger"
                           v-if="submitted && !$v.employerDetails.contactPersonName.required"
                          >
                             {{ $t('HireUs.vcontactPersonName') }}
                           </div> 
                            
                             <div
                              class="text-danger"
                               v-if="submitted && !$v.employerDetails.contactPersonName.minLength"
                              >
                                  {{ $t('HireUs.vsMinLength') }} 4 charachters
                            </div> 
                  </div> 
               </div> 

              
              <div class="col-md-12 col-lg-6">
                <div class="form-row">
                  <div class="col-md-6 col-lg-7">
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
                          v-model.trim="contact.mobileNumber"
                          id="mobileNumber"
                          :placeholder="$t('registration.mobilePlaceholder')"
                          :disabled="flag == 1"
                          :class="{
                            'is-invalid':
                              submitted && $v.contact.mobileNumber.$invalid
                          }"
                        >
                        <div class="input-group-append">
                          <button
                            class="btn btn-purple"
                            @click="getOtp()"
                            :disabled="
                              sendOtpFlag || $v.contact.mobileNumber.$invalid
                            "
                          >
                            {{ $t('registration.sendOtp') }}
                          </button>
                        </div>
                      </div>
                      <div
                        class="text-danger"
                        v-if="submitted && !$v.contact.mobileNumber.required"
                      >
                        {{ $t('registration.vmobile1') }}
                      </div>
                      <div
                        class="text-danger"
                        v-if="submitted && !$v.contact.mobileNumber.numeric"
                      >
                        {{ $t('registration.vmobile2') }}
                      </div>
                      <div
                        class="text-danger"
                        v-if="submitted && !$v.contact.mobileNumber.isMobileValid"
                      >
                        Invalid Mobile Number
                      </div>
                      <div
                        class="text-danger"
                        v-if="
                          submitted &&
                            (!$v.contact.mobileNumber.minLength ||
                            !$v.contact.mobileNumber.maxLength)
                        "
                      >
                        {{ $t('registration.vmobile3') }}
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-md-6 col-lg-5"
                    v-if="showOtpField == true"
                  >
                    <div class="form-group">
                      <label
                        class="control-label form-label"
                      >Enter OTP</label>
                      <div class="input-group">
                        <input
                          class="form-control"
                          v-model.trim="contact.votp"
                          :placeholder="$t('registration.enterOtpPlaceholder')"
                          id="votp"
                          :disabled="flag == 1"
                          :class="{
                            'is-invalid':
                              otp_submitted && $v.contact.votp.$invalid
                          }"
                        >
                        <div class="input-group-append">
                          <button
                            type="button"
                            class="btn btn-green"
                            @click="verifyOtp()"
                            :disabled="flag == 1 || contact.votp == ''"
                          >
                            {{ button }}
                          </button>
                        </div>
                      </div>
                      <div
                        class="text-danger"
                        v-if="otp_submitted && !$v.contact.votp.required"
                      >
                        {{ $t('registration.venterOtp') }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12 col-lg-6">
                <div class="form-row">
                  <div class="col-md-6 col-lg-7">
                    <div class="form-group">
                      <label
                        class="control-label form-label"
                      >Email ID</label>
                      <span class="text-danger"> *</span>
                      <div class="input-group">
                        <input
                          type="email"
                          class="form-control"
                          v-model.trim="contact.emailID"
                          :placeholder="$t('registration.emailIdPlaceholder')"
                          id="emailID"
                          :disabled="emailflag == 1"
                          :class="{
                            'is-invalid':
                              submitted && $v.contact.emailID.$invalid
                          }"
                        >
                        <div class="input-group-append">
                          <button
                            class="btn btn-purple"
                            @click="getEmailOtp()"
                            :disabled="
                              sendEmailOtpFlag || $v.contact.emailID.$invalid
                            "
                          >
                            {{ $t('registration.sendOtp') }}
                          </button>
                        </div>
                      </div>

                      <div
                        class="text-danger"
                        v-if="submitted && !$v.contact.emailID.required"
                      >
                        Please provide valid email
                      </div>
                    </div>
                  </div>
                  <div
                    class="col-md-6 col-lg-5"
                    v-if="showEmailOtpField == true"
                  ><table></table>
                    <div class="form-group">
                      <label
                        class="control-label form-label"
                      >Enter OTP</label>
                      <div class="input-group">
                        <input
                          class="form-control"
                          v-model.trim="contact.eotp"
                          :placeholder="$t('registration.enterOtpPlaceholder')"
                          id="votp"
                          :disabled="emailflag == 1"
                          :class="{
                            'is-invalid':
                              emailotp_submitted && $v.contact.eotp.$invalid
                          }"
                        >
                        <div class="input-group-append">
                          <button
                            type="button"
                            class="btn btn-green"
                            @click="verifyEmailOtp()"
                            :disabled="emailflag == 1 || contact.eotp == ''"
                          >
                            {{ emailButton }}
                          </button>
                        </div>
                      </div>
                      <div
                        class="text-danger"
                        v-if="emailotp_submitted && !$v.contact.eotp.required"
                      >
                        {{ $t('registration.venterOtp') }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
              



            </div>
          </div>

          <div class="card-form" v-for="(jobDetail, index) in jobDetails1" :key="index">
            <div class="card-header card-header-alt">
              Job  Details
            </div>

           <div class="row" >
              <div class="col-md-12 col-lg-4">
                 <div class="form-group">

                     <label class="control-label form-label">
                       Job Role
                        <span class="text-danger">*</span>
                      </label>

                      <input
                       oninput="this.value=this.value.replace(/[^[a-zA-Z.-.'-'\s]/g,'');"
                        class="form-control"
                        minLength="4"
                        maxLength="15"
                        v-model.trim="jobDetails1[index].jobeRole1"
                        :placeholder="$t('HireUs.JobRole')"
                        id="jobRole"
                        :class="{
                         'is-invalid': submitted && $v.jobDetails1[index].jobeRole1.$invalid
                        }"
                        >
                        
                         <div
                           class="text-danger"
                           v-if="submitted && !$v.jobDetails1[index].jobeRole1.required"
                          >
                             {{ $t('HireUs.vJobRole') }}
                           </div>
                          
                  </div>
               </div>


            <div class="col-md-12 col-lg-4">
                 <div class="form-group">
                     <label class="control-label form-label">
                       No Of Opening 
                        <span class="text-danger">*</span>
                      </label>
                      <input
                       oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                        class="form-control"
                        minLength="1"
                        maxLength="3"
                        v-model.trim="jobDetails1[index].noOfOpening1"
                        :name="`jobDetails1[${index}][noOfOpening1]`"
                        :placeholder="$t('HireUs.noOfOpening1')"
                        id="noOfOpening1"
                        :class="{
                         'is-invalid': submitted && $v.jobDetails1[index].noOfOpening1.$invalid
                        }"
                        >
                        
                         <div
                           class="text-danger"
                           v-if="submitted && !$v.jobDetails1[index].noOfOpening1.required"
                          >
                             {{ $t('HireUs.vnoOfOpening1') }}
                           </div>
                            
                  </div>
               </div> 



               <div class="col-md-12 col-lg-4">
                <div class="form-group">
                  <label
                    for="tentativeJoiningDate"
                    class="control-label form-label"
                  >
                    {{ $t('HireUs.tentativeJoiningDate') }}
                    <span class="text-danger">*</span>
                  </label>
                  <div class="fp-holder">
                    <b-form-datepicker
                      placeholder="DD/MM/YYYY"
                      format="dd-MM-yyyy"
                      :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                      locale=""
                      :min="min" :max="max"
                      v-model="jobDetails1[index].tentativeJoiningDate1"
                      :name="`jobDetails1[${index}][tentativeJoiningDate1]`"
                      :input-class="{
                        'form-control': 'form-control',
                      }"
                      :class="{
                        'is-invalid':
                          submitted && $v.jobDetails1[index].tentativeJoiningDate1.$invalid,
                      }"
                    />
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.jobDetails1[index].tentativeJoiningDate1.required"
                  >
                    {{ $t('HireUs.vJD') }}
                  </div>
               
                </div>
              </div>
           </div>
               <div class="row">
              <div class="col-md-6 col-lg-4">
                <div class="form-group">
                  <label
                    for="states"
                    class="control-label form-label"
                  >Enter Location For Job</label>
                  <span class="text-danger">*</span>

                  <v-select
                    v-model="jobDetails1[index].state"
                  
                    label="displayName"
                    :placeholder="$t('registration.statePlaceholder')"
                    :options="states"
                    :value="jobDetails1[index].state"
                    @input="getDistrictsByStateId(index)"
                  />

                  <p>{{jobDetails1[index].state}}</p>
                 
                </div>
              </div>
              <div class="col-md-6 col-lg-4">
                <div class="form-group">
                  <label
                    for="districts"
                    class="control-label form-label"
                  >
                    
                    <span class="text-danger"></span>
                  </label>

                  <v-select
                    v-model="jobDetails1[index].district"
                    :name="`jobDetails1[${index}][district]`"
                    label="displayName"
                    :placeholder="$t('registration.districtPlaceholder')"
                    :options="districts"
                    :value="jobDetails1[index].district"
                  />

                <p>{{jobDetails1[index].district}}</p>
                </div>

              </div>
              <div class="col-md-6 col-lg-4">
                <div class="form-group">
                  <label class="control-label form-label">
              
                    <span class="text-danger"></span>
                  </label>
                  <input
                    class="form-control"
                    v-model.trim="jobDetails1[index].pincode"
                    :name="`jobDetails1[${index}][pincode]`"
                    oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                    placeholder="Enter Your Pincode"
                    maxlength="6"
                    minlength="6"
                    id="pincode"
                    :class="{
                      'is-invalid':
                        submitted && $v.jobDetails1[index].pincode.$invalid
                    }"
                  >
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.jobDetails1[index].pincode.required"
                  >
                    {{ $t('registration.pincode') }}
                  </div>
                 
                  
                </div>
              </div>

            <div class="col-md-6 col-lg-3">
                <div class="form-group">
                  <label class="control-label form-label">
                    Salary Range
                    <span class="text-danger">*</span>
                  </label>
                  <div class="input-group">
                  <input
                    oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                    class="form-control"
                    :name="`jobDetails1[${index}][minSalary]`"
                    v-model.trim="jobDetails1[index].minSalary"
                    id="minSalary"
                    :class="{
                      'is-invalid': submitted && $v.jobDetails1[index].minSalary.$invalid
                    }"
                  >
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.jobDetails1[index].minSalary.required"
                  >
                  </div>
                    <div class="input-group-append">
                          <b-button
                            variant="light"
                            disabled size="md"
                              class="btn  font-weight-bold mr-2 ml-2"
                          >
                            to
                          </b-button>
                    </div>

                  <input
                    oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                    class="form-control"
                    minLength="1"
                    maxLength="2"
                    v-model.trim="jobDetails1[index].maxSalary"
                    :name="`jobDetails1[${index}][maxSalary]`"
                    id="maxSalary"
                    :class="{
                      'is-invalid': submitted && $v.jobDetails1[index].maxSalary.$invalid
                    }"
                  >
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.jobDetails1[index].maxSalary.required"
                  > 
                  </div>
                   <div class="input-group-append">
                          <b-button
                            variant="light"
                            disabled size="md"
                            class="btn  font-weight-bold mr-2"
                          >
                            LPA
                          </b-button>
                    </div>
                  </div>
                  
                </div>
              </div>
            



             <div class="col-md-6 col-lg-5">
                <div class="form-group">
                  <label class="control-label form-label">
                    Skills Required 
                    <span class="text-danger">*</span>
                  </label>
                 <div>
                  
                  <b-form-tags class="form-control" 
                   input-id="skillsRequired"
                    v-model="jobDetails1[index].skillsRequired"
                    tag-variant="warning"
                    size="lg"
                    separator=" "
                    placeholder="Enter new skills  separated by space"></b-form-tags>
                  <label for="skillsRequired-basic">Type a new tag and press enter</label>
                  </div> 
                </div>
             </div>
            </div>

            
          </div>
           <div class="form-group">
              <button @click="addJobDetail()" type="button" class="btn btn-secondary">Add </button>
              </div>
            <div class="form-group">
              <button @click="RemoveJobDetail(index)" type="button" class="btn btn-secondary">Remove</button>
              </div>
            

        <hr>

          <div class="card-form">
            <div class="card-header card-header-alt">
            </div>
            <div class="row">
              <div class="col-md-12 d-flex justify-content-center">
                <div class="form-group">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck3"
                      value="checkbox3text"
                      v-model="checked"
                    >
                    <label
                      class="custom-control-label"
                      for="customCheck3"
                    >
                      I agree to
                      <a
                        href="javascript:void(0)"
                        id="show-btn"
                        v-b-modal.modal-lg
                        @click="$bvModal.show('tc-modal')"
                      >Terms and Conditions.</a>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-action-alt">
              <button
                :disabled="checked === false"
                type="button"
                class="btn btn-page"
                @click="applicantRegister()"
              >
                Submit
              </button>
            </div>
          </div>
          <div class="help-wrapper">
            <div class="copyright-holder">
              <img
                
                class="img-adj"
                alt="MKCL"
              >
              <div class="copyright">
                Powered by
                <a
                  href="https://www.mkcl.org"
                  target="_blank"
                >Maharashtra Knowledge Corporation Ltd</a>. (MKCL), Copyright © 2022. All rights reserved.<br>
              </div>
            </div>
          </div>
        </div>
        <b-modal
          size="lg"
          id="tc-modal"
          hide-footer
          hide-header
        >
          <div class="d-block text-center">
            <h3 class="modal-title">
              Terms & Conditions
            </h3>
          </div>
          <div class="modal-content-alt">
            <ol class="mb-2">
              <li>
                {{ $t('registration.term1') }}
              </li>

              <li>
                {{ $t('registration.term2') }}
              </li>
              <li>
                {{ $t('registration.term3') }}
              </li>
              <li>
                {{ $t('registration.term4') }}
              </li>
              <li>
                {{ $t('registration.term5') }}
              </li>
              <li>
                {{ $t('registration.term6') }}
              </li>
              <li>
                {{ $t('registration.term7') }}
              </li>
              <li>
                {{ $t('registration.term71') }}
              </li>
              <li>
                {{ $t('registration.term8') }}
              </li>
              <li>
                {{ $t('registration.term9') }}
              </li>
              <li>
                {{ $t('registration.term10') }}
              </li>
            </ol>
            <span class="terms-info">I HEREBY ACKNOLWEDGE THAT I HAVE READ, UNDERSTOOD AND AGREE TO THE ABOVE TERMS & CONDITIONS RELATING TO USAGE OF MKCL DNExT APPLICATION PROCESS.
            </span>
          </div>
          <div class="modal-button">
            <b-button
              class="btn-page"
              type="submit"
              @click="$bvModal.hide('tc-modal')"
            >
              {{ $t('registration.close') }}
            </b-button>
          </div>
        </b-modal>
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



var moment = require('moment')
export default {

  data () {
    const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      // 15th two months prior
      const minDate = new Date(today)
      minDate.setMonth(minDate.getMonth() )
      minDate.setDate(minDate.getDate())
      // 15th in two months
      const maxDate = new Date(today)
      maxDate.setMonth(maxDate.getMonth() + 2)
      maxDate.setDate(15)

  
    
    return {
       value: '',
        min: minDate,
        max: maxDate,
        dirty: false,
      
      
      basic: {
     
       OrganizationWebsite:'',
        OrganizationName:'',
        OrganizationSector:'',
       
      },

      jobDetails1:[{
        jobeRole1:'',
        noOfOpening1:'',
        locationOfJob1:'',
        minSalary:'',
         maxSalary:'',
        tentativeJoiningDate1:'',
        skillsRequired: [],
        district: null,
        pincode: null,
        state: null
        }
        ]
      

      ,
      employerDetails:{
        contactPersonName:'',
   
      },
      contact: {
        emailID: '',
        mobileNumber: '',
        votp: '',
        eotp: ''
      },
      iconChange: 'mdi mdi-eye',
      iconChangeCnf: 'mdi mdi-eye',
      submitted: false,
      button: 'Verify',
      emailButton: 'Verify',
      checked: false,
      countries: [],
      states: [],
      districts: [],
      talukas: [],
    
   
      countryId: null,

      stateId: null,
      timer: 0,
      districtId: null,
      isEnabled: true,
      otp_submitted: false,
      emailotp_submitted: false,
      sendOtpFlag: false,
      sendEmailOtpFlag: false,
      showOtpField: false,
      showEmailOtpField: false,
      flag: 0,
      emailflag: 0,
      otp_d: {
        mobileNumber: '',
        votp: ''
      },
      pleaseSpecify: '',
      commonDateConfig: {
        dateFormat: 'Y-m-d',
        maxDate: this.maxDate,
        minDate: this.minDate
      },
      years: [],
      customDate: null,
      showGuardianFlag: false
    }
    
  },
  computed: {
   
    
      skillsRequired(newValue, oldValue) {
        // Set the dirty flag on first change to the skillsRequired array
        this.dirty = true
      }
    // ,
    // Tagstate() {
    //     // Overall component validation state
    //     return this.dirty ? (this.skillsRequired.length > 2 && this.skillsRequired.length < 9) : null
    //   }
    }
  ,
   
  // components: {
  //   Datepicker
  // },
  validations: {
   
    basic: {
    
      OrganizationWebsite: {
        required,
      },
      OrganizationName: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(10),
        isNameValid: helpers.regex('isNameValid', /^[a-zA-Z ]*$/)
      }, 
      OrganizationSector: {
        required
      }

    },

    
    jobDetails1:{
      $each: {
      jobeRole1:{
        required
      },
      noOfOpening1:{
        required,
      },
      minSalary:{
        required,
        minLength: minLength(1),
        maxLength: maxLength(2),
      },
       maxSalary:{
        required,
        minLength: minLength(1),
        maxLength: maxLength(2),
      },
     tentativeJoiningDate1:{
        required
      }, 
      skillsRequired:{
          required
      }
      
   
      }
    }
    , 
    employerDetails:{
        contactPersonName:{
          required,
           minLength: minLength(4)
    
        },
        
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
    // this.getDistrictsByStateId()
 
    
  },
  methods: {

 addJobDetail() {
      this.jobDetails1.push({
     jobeRole1:'',
        noOfOpening1:'',
        locationOfJob1:'',
        minSalary:'',
         maxSalary:'',
        tentativeJoiningDate1:'',
        skillsRequired: [],
        district: null,
        pincode: null,
        state: null
      
      })
    }
    ,

    RemoveJobDetail(index){
      this.jobDetails1.splice(index,1);
      
    },
    changeLanguage (lang) {
      this.$i18n.locale = lang
      this.$i18n.fallbackLocale = lang
      loadLanguageAsync(lang).then(() => {
      })
    }, tagValidator(tag) {
        // Individual tag validator function
        return tag === tag.toLowerCase() && tag.length > 2 && tag.length < 6
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
    onAccept () {
      const vm = this
      vm.checked = true
      vm.$bvModal.hide('tc-modal')
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

    getDistrictsByStateId (index) {
      return new Promise((resolve) => {
        const vm = this

        new MQL()
          .setActivity('o.[query_293k2pcHKiS7GMwuDb9e1veS2g4]')
          .setData({ stateName: this.jobDetails1[index].state.displayName })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity('query_293k2pcHKiS7GMwuDb9e1veS2g4', true)
            if (rs.isValid('query_293k2pcHKiS7GMwuDb9e1veS2g4')) {
              if (res == null) {
                res = []
              }
           
              vm.districts = []
              vm.districts = res
              resolve()
            } else {
              rs.showErrorToast('query_293k2pcHKiS7GMwuDb9e1veS2g4')
            }
          })
      })
    },




    applicantRegister () {
      const vm = this
      vm.submitted = true
      vm.$v.$touch()
      if (vm.flag !== 1 || vm.emailflag !== 1) {
        Swal.fire({
          title: 'Please Verify Mobile Number and Email ID',
          icon: 'error'
        })
      } else if (!vm.$v.$invalid) {
        var sendData = {}
        sendData.basic = this.basic
        sendData.address = this.address
        sendData.jobDetails1= this.jobDetails1
        sendData.employerDetails=this.employerDetails
   
        sendData.contact = this.contact


        sendData.roleName = 'Employer'

        new MQL()
          .setActivity('o.[EmployerHD]')
          .setHeader({'Service-Branch':'DNExT_BRANCH'})
          .setData(sendData)
          .fetch()
          .then((rs) => {
            let res = rs.getActivity('EmployerHD', true)
            if (rs.isValid('EmployerHD')) {
              if (res.result.result === 'Success') {
                this.$toasted.success('Registration Successfull', {
                  theme: 'bubble',
                  position: 'top-center',
                  duration: 3000
                })
                this.$router.push({
                  name: 'success'
                })
              } else {
                this.$toasted.error(res.result.result, { duration: 3000 })
              }
            } else {
              rs.showErrorToast('EmployerHD')
            }
          })
      } else {
        Swal.fire({
          title: 'Please fill all the fields properly',
          icon: 'error'
        })
      }
    }

  }
}
</script>

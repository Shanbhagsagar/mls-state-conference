<template>
  <section id="login">
    <div class="card-login card-register">
      <div class="row card-wrapper">
        <div class="col login-block">
          <a
            href="https://dnext.mkcl.org/"
            class="btn btn-back"
          >Back to Home</a>
          <router-link
            to="/login"
            class="btn btn-back btn-back-alt"
          >
            Already a member? Login
          </router-link>
          <div class="logo-wrapper logo-wrapper-alt logo-wrapper-alt2">
            <img
              class="img-fluid"
              src="../../../public/assets/images/logo_dnext.png"
              alt="MKCL Mock Exams"
            >
          </div>
          <div class="d-block text-center">
            <h1 class="modal-title">
              Registration
            </h1>
          </div>

          <div class="card-form">
            <div class="card-header card-header-alt mt-0">
              Personal Details
            </div>
            <div class="row">
              <div class="col-md-12 col-lg-4">
                <div class="form-group">
                  <label class="control-label form-label">
                    Applicant Name
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    oninput="this.value=this.value.replace(/[^[a-zA-Z.-.'-'\s]/g,'');"
                    class="form-control"
                    v-model.trim="basic.fullName"
                    :placeholder="$t('registration.studentNamePlaceholder')"
                    id="fullName"
                    :class="{
                      'is-invalid': submitted && $v.basic.fullName.$invalid
                    }"
                  >
                  <div
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
                </div>
              </div>

              <div class="col-md-12 col-lg-4">
                <div class="form-group">
                  <label
                    for="gender"
                    class="control-label form-label"
                  >
                    Gender
                    <span class="text-danger">*</span>
                  </label>
                  <v-select
                    v-model="basic.gender"
                    :placeholder="$t('registration.genderPlaceholder')"
                    label="value"
                    :options="gender"
                    @input="genderSelected"
                  />
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.gender.required"
                  >
                    {{ $t('registration.vgender') }}
                  </div>
                </div>
              </div>
              <div class="col-md-12 col-lg-4">
                <div class="form-group">
                  <label
                    for="dob"
                    class="control-label form-label"
                  >
                    {{ $t('registration.dob') }}
                    <span class="text-danger">*</span>
                  </label>
                  <div class="fp-holder">
                    <b-form-datepicker
                      placeholder="DD/MM/YYYY"
                      format="dd-MM-yyyy"
                      :disabled-dates="disabledDateOfBirthDates"
                      v-model="basic.dateOfBirth"
                      :max="this.maxDate"
                      :min="this.minDate"
                      @input="validateAge()"
                      :input-class="{
                        'form-control': 'form-control',
                      }"
                      :class="{
                        'is-invalid':
                          submitted && $v.basic.dateOfBirth.$invalid,
                      }"
                    />
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.dateOfBirth.required"
                  >
                    {{ $t('registration.vdob') }}
                  </div>
                  <div
                    class="form-text text-danger"
                    v-if="isAgeValid === false"
                  >
                    <small>
                      Your age should be between 18 to 58 Years .
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card-form">
            <div class="card-header card-header-alt">
              Contacts Details
            </div>

            <div class="row">
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
                  >
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
            <div class="row">
              <div class="col-md-6 col-lg-4">
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
              <div class="col-md-6 col-lg-4">
                <div class="form-group">
                  <label
                    for="districts"
                    class="control-label form-label"
                  >
                    District
                    <span class="text-danger">*</span>
                  </label>

                  <v-select

                    v-model="address.district"
                    label="displayName"
                    :placeholder="$t('registration.districtPlaceholder')"
                    :options="districts"
                    :value="address.district"
                  />
                  <div
                    class="text-danger"
                    v-if="
                      !$v.address.district.required &&
                        $v.address.district.$error
                    "
                  >
                    {{ $t('registration.vdistrict') }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-4">
                <div class="form-group">
                  <label class="control-label form-label">
                    Pincode
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    class="form-control"
                    v-model.trim="address.pincode"
                    oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                    placeholder="Enter Your Pincode"
                    maxlength="6"
                    minlength="6"
                    id="pincode"
                    :class="{
                      'is-invalid':
                        submitted && $v.address.pincode.$invalid
                    }"
                  >
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.address.pincode.required"
                  >
                    {{ $t('registration.pincode') }}
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.address.pincode.numeric"
                  >
                    {{ $t('registration.pincode2') }}
                  </div>
                  <div
                    class="text-danger"
                    v-if="
                      submitted &&
                        (!$v.address.pincode.minLength ||
                        !$v.address.pincode.maxLength)
                    "
                  >
                    {{ $t('registration.pincode3') }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card-form">
            <div class="card-header card-header-alt">
              Educational Details
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label
                        for="exam"
                        class="control-label form-label"
                      >
                        Select Qualification
                        <span class="text-danger">*</span>
                      </label>
                      <v-select
                        v-model="qualification.qualificationName"
                        label="displayName"
                        placeholder="Select Qualification"
                        :options="Class"
                        @input="getClassDetails()"
                      />
                      <div
                        class="text-danger"
                        v-if="
                          !$v.qualification.qualificationName.required &&
                            $v.qualification.qualificationName.$error
                        "
                      >
                        {{ $t('registration.veducationLevel') }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                Register
              </button>
            </div>
          </div>

          <div class="help-wrapper">
            <div class="copyright-holder">
              <img
                src="../../../public/assets/images/logo_mkcl.svg"
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
  email
} from 'vuelidate/lib/validators'
var moment = require('moment')
export default {
  data () {
    return {
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

      student_cred: {},
      isGenderSelected: false,
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
      degree: [],
      universities: [],
      faculties: [],
      courses: [],
      password: '',
      cnfpassword: '',

      countryId: null,
      universityId: null,
      facultyId: null,
      courseId: null,
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
      isAgeValid: null,
      PasswordInputType: 'password',
      PasswordInput: 'password',
      flag: 0,
      emailflag: 0,
      otp_d: {
        mobileNumber: '',
        votp: ''
      },
      commonDateConfig: {
        dateFormat: 'Y-m-d',
        maxDate: this.maxDate,
        minDate: this.minDate
      },
      mode: [
        {
          value: 'Mobile',
          text: 'Mobile'
        },
        {
          value: 'Laptop',
          text: 'Laptop'
        },
        {
          value: 'Desktop',
          text: 'Desktop'
        },
        {
          value: ' MKCL ALC',
          text: ' MKCL ALC'
        }
      ],
      years: [],
      customDate: null,
      gender: [
        { value: 'Male', text: 'Male' },
        { value: 'Female', text: 'Female' },
        { value: 'Transgender', text: 'Transgender' }
      ],
      EducationLevels: [],
      Class: [],

      Options: [
        { text: 'हो/Yes', value: true },
        { text: 'नाही/No', value: false }
      ],
      showGuardianFlag: false
    }
  },
  // components: {
  //   Datepicker
  // },
  validations: {
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
    this.getDistrictsByStateId()
    this.getClassDetails()
    this.getMaxMinDate()
  },
  methods: {
    changeLanguage (lang) {
      console.log('lang change :', lang)
      this.$i18n.locale = lang
      this.$i18n.fallbackLocale = lang
      loadLanguageAsync(lang).then(() => {
        console.log('Updated')
      })
    },

    validateAge () {
      // this.$store.dispatch('getServerTime').then((res) => {
      // let age = moment(res.result.date).diff(date, 'years', false)

      var dateEntered = this.student.dateOfBirth
      let age = moment(this.currentDateTime).diff(dateEntered, 'years', false)// let age = 20
      console.log('age', age)
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
    onAccept () {
      const vm = this
      vm.checked = true
      vm.$bvModal.hide('tc-modal')
    },
    genderSelected () {
      const vm = this
      vm.isGenderSelected = true
    },
    async starter () {
      const vm = this

      // await vm.getAllCountries()

      // vm.countryId = vm.countries.filter(
      //   (country) => country.countryName == 'India'
      // )[0].countryId
      vm.countryId = '001'
      await vm.getStatesByCountryId()
      // vm.stateId = vm.states.filter(
      //   (state) => state.STATE_NAME == 'Maharashtra'
      // )[0].STATE_CODE
      // console.log(vm.stateId)
      vm.stateId = '21'
      await vm.getDistrictsByStateId()

      // await vm.getTalukaByDistrictId();
    },

    getEmailOtp () {
      const vm = this

      this.showEmailOtpField = true
      new MQL()
        .setActivity('o.[SendEmailOTP]')
        .setData({ email: this.contact.emailID })
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('SendEmailOTP', true)
          if (rs.isValid('SendEmailOTP')) {
            if (res.result.result === undefined) {
              this.$toasted.success('OTP sent to your phone number', {
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
              this.$toasted.error('email already exists', { duration: 3000 })
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
        .setData({ mobileNumber: this.contact.mobileNumber })
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('SendMobileOTP', true)
          console.log(res)
          if (rs.isValid('SendMobileOTP')) {
            if (res.result.result === undefined) {
              this.$toasted.success('OTP sent to your phone number', {
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
              this.$toasted.error('mobile number already exists', { duration: 3000 })
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
            }
            if (res.result.verifyOTP === 'OTPNOTFOUND') {
              this.emailflag = 0

              this.$toasted.error('Invalid OTP ', {
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
            }
            if (res.result.verifyOTP === 'OTPNOTFOUND') {
              this.flag = 0

              this.$toasted.error('Invalid OTP ', {
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
              // console.log("res", res);
              vm.address.district = null
              vm.districts = []
              vm.districts = res
              console.log(vm.districts)
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
            console.log(this.minDate)
            console.log(this.maxDate)
            console.log(this.currentDateTime)
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
            // console.log(res);

            if (res !== null) {
              vm.Class = []
              vm.Class = res
              // if (vm.userDetails[0].selectedClass == null) {
              //   vm.userDetails[0].selectedClass = vm.Class[0];
              // }
              // console.log("userdetails", vm.userDetails[0]);
            }
          } else {
            rs.showErrorToast('query_2942pqjL5MapX6N3RrGZeVmgHql')
          }
        })
    },
    applicantRegister () {
      console.log('here')
      const vm = this
      vm.submitted = true
      vm.$v.$touch()
      if (vm.flag === 1) {
        if (!vm.$v.$invalid) {
          this.basic.fullName = this.basic.fullName
          this.basic.gender = this.basic.gender.value
          this.basic.dateOfBirth = this.basic.dateOfBirth + ' 00:00:00'
          this.basic.userName = this.basic.userName

          this.address.state = this.address.state.displayName
          this.address.district = this.address.district.displayName
          this.address.pincode = this.address.pincode

          this.contact.emailID = this.contact.emailID
          this.contact.mobileNumber = this.contact.mobileNumber

          this.qualification.qualificationId = this.qualification.qualificationName.qualificationId
          this.qualification.qualificationName = this.qualification.qualificationName.displayName

          new MQL()
            .setActivity('o.[RegisterUser]')
            .setData({ address: this.address, basic: this.basic, contact: this.contact, qualification: this.qualification, roleName: 'Applicant' })
            .fetch()
            .then((rs) => {
              let res = rs.getActivity('RegisterUser', true)
              if (rs.isValid('RegisterUser')) {
                if (res.result) {
                  console.log(res.result)
                  this.$router.push({
                    name: 'success'
                  })
                }
              } else {
                rs.showErrorToast('RegisterUser')
              }
            })
        }
      }
    }

  }
}
</script>

<template>
  <section id="login">
    <div class="card-login card-register">
      <div class="row card-wrapper">
        <div class="col login-block">
          <a
            href="https://mockexams.mkcl.org/"
            class="btn btn-back"
          >Back to Home</a>
          <router-link
            to="/login"
            class="btn btn-back btn-back-alt"
          >
            Already a member? Login
          </router-link>
          <div class="logo-wrapper logo-wrapper-alt logo-wrapper-alt2">
            <!-- <div class="logo-title"><span>MKCL</span> Mock Exams</div> -->
            <img
              class="img-fluid"
              src="../../../public/assets/images/DNEXT_logo final-01.png"
              alt="MKCL Mock Exams"
            >
          </div>
          <div class="d-block text-center">
            <h1 class="modal-title">
              Registration
            </h1>
          </div>
          <!-- <div class="card-header">Test Readiness For You</div> -->
          <div class="card-header card-header-alt mt-0">
            Personal Details
          </div>
          <!-- <div class="text-info">
            Important: This information will appear on the student's e-score sheet. So please fill in the correct information.
          </div> -->
          <div class="card-form">
            <div class="row">
              <div class="col-md-12 col-lg-6">
                <div class="form-group">
                  <label class="control-label form-label">
                    Student Name
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    class="form-control"
                    v-model="student.fullName"
                    :placeholder="$t('registration.studentNamePlaceholder')"
                    id="fullName"
                    :class="{
                      'is-invalid': submitted && $v.student.fullName.$invalid
                    }"
                  >
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.student.fullName.required"
                  >
                    {{ $t('registration.vstudnetName1') }}
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.student.fullName.isNameValid"
                  >
                    {{ $t('registration.vstudnetName2') }}
                  </div>
                </div>
              </div>

              <div class="col-md-8 col-lg-4">
                <div class="form-group">
                  <label
                    for="gender"
                    class="control-label form-label"
                  >
                    Gender
                    <span class="text-danger">*</span>
                  </label>
                  <!-- <b-form-select
                    v-model="student.gender"
                    id="gender"
                    :options="gender"
                    :class="{
                      'is-invalid': submitted && $v.student.gender.$invalid,
                    }"
                  />-->
                  <v-select
                    v-model="student.gender"
                    :placeholder="$t('registration.genderPlaceholder')"
                    label="value"
                    :options="gender"
                    @input="genderSelected"
                  />
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.student.gender.required"
                  >
                    {{ $t('registration.vgender') }}
                  </div>
                </div>
              </div>
              <!-- <div class="col-md-2"></div> -->
              <div class="col-md-8 col-lg-4">
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
                      v-model="student.dateOfBirth"
                      :max="this.maxDate"
                      :min="this.minDate"
                      @input="validateAge()"
                      :input-class="{
                        'form-control': 'form-control',
                      }"
                      :class="{
                        'is-invalid':
                          submitted && $v.student.dateOfBirth.$invalid,
                      }"
                    />
                    <!-- <i class="mdi mdi-calendar" /> -->
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.student.dateOfBirth.required"
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

                <div
                  class="col-md-12 col-lg-6"
                  v-if="showGuardianFlag"
                >
                  <div class="form-group">
                    <label class="control-label form-label">
                      {{ $t('registration.parentName') }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      class="form-control"
                      v-model="student.parentOrGuardianName"
                      :placeholder="$t('registration.parentNamePlaceholder')"
                      id="parentOrGuardianName"
                      :class="{
                        'is-invalid':
                          submitted && $v.student.parentOrGuardianName.$invalid
                      }"
                    >
                    <div
                      class="text-danger"
                      v-if="
                        submitted && !$v.student.parentOrGuardianName.required
                      "
                    >
                      {{ $t('registration.vparentName1') }}
                    </div>
                    <div
                      class="text-danger"
                      v-if="
                        submitted &&
                          !$v.student.parentOrGuardianName.isParentNameValid
                      "
                    >
                      {{ $t('registration.vparentName2') }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-header card-header-alt">
              Contacts Details
            </div>
            <div class="card-form">
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-6">
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
                            v-model="otp_d.mobileNumber"
                            id="mobileNumber"
                            :placeholder="$t('registration.mobilePlaceholder')"
                            :disabled="flag == 1"
                            :class="{
                              'is-invalid':
                                submitted && $v.otp_d.mobileNumber.$invalid
                            }"
                          >
                          <div class="input-group-append">
                            <!-- <button
                            class="btn btn-purple"
                            @click="getStudentByMobileNumber()"
                            :disabled="
                              sendOtpFlag || $v.otp_d.mobileNumber.$invalid
                            "
                          >
                            {{ $t('registration.sendOtp') }}
                          </button> -->
                            <button
                              class="btn btn-purple"
                              @click="getOtp()"
                              :disabled="
                                sendOtpFlag || $v.otp_d.mobileNumber.$invalid
                              "
                            >
                              {{ $t('registration.sendOtp') }}
                            </button>
                          </div>
                        </div>
                        <div
                          class="text-danger"
                          v-if="submitted && !$v.otp_d.mobileNumber.required"
                        >
                          {{ $t('registration.vmobile1') }}
                        </div>
                        <div
                          class="text-danger"
                          v-if="submitted && !$v.otp_d.mobileNumber.numeric"
                        >
                          {{ $t('registration.vmobile2') }}
                        </div>
                        <div
                          class="text-danger"
                          v-if="
                            submitted &&
                              (!$v.otp_d.mobileNumber.minLength ||
                              !$v.otp_d.mobileNumber.maxLength)
                          "
                        >
                          {{ $t('registration.vmobile3') }}
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-md-6"
                      v-if="showOtpField == true"
                    >
                      <div class="form-group">
                        <label
                          class="control-label form-label"
                        >Enter OTP</label>
                        <div class="input-group">
                          <input
                            class="form-control"
                            v-model="otp_d.votp"
                            :placeholder="$t('registration.enterOtpPlaceholder')"
                            id="votp"
                            :disabled="flag == 1"
                            :class="{
                              'is-invalid':
                                otp_submitted && $v.otp_d.votp.$invalid
                            }"
                          >
                          <div class="input-group-append">
                            <button
                              type="button"
                              class="btn btn-green"
                              @click="verifyOtp()"
                              :disabled="flag == 1 || otp_d.votp == ''"
                            >
                              {{ button }}
                            </button>
                          </div>
                        </div>
                        <div
                          class="text-danger"
                          v-if="otp_submitted && !$v.otp_d.votp.required"
                        >
                          {{ $t('registration.venterOtp') }}
                        </div>
                      </div>
                    </div>
                  <!-- <div class="text-info col-md-12">
                    Note: The mobile number will be the login ID. So fill in the exact number.<br> -->
                  <!-- पालकांसाठी सूचना: एकच मोबाईल नंबर वापरून तुम्हाला एकापेक्षा
                    अधिक पाल्यांना रजिस्टर करता येईल. त्यासाठी पहिल्या पाल्याची
                    नोंदणी केल्यानंतर लॉगीन करावे व दुसऱ्या पाल्याची माहिती
                    भरावी. -->
                  <!-- </div> -->
                  </div>
                </div>
                <div class="col-md-12 col-lg-6">
                  <div class="form-group">
                    <label
                      class="control-label form-label"
                    >Email ID</label>
                    <span class="text-danger"> *</span>
                    <div class="input-group">
                      <input
                        type="email"
                        class="form-control"
                        v-model="student.emailID"
                        :placeholder="$t('registration.emailIdPlaceholder')"
                        id="emailID"
                        :disabled="emailflag == 1"
                        :class="{
                          'is-invalid':
                            submitted && $v.student.emailID.$invalid
                        }"
                      >
                      <div class="input-group-append">
                        <button
                          class="btn btn-purple"
                          @click="getEmailOtp()"
                          :disabled="
                            sendEmailOtpFlag || $v.student.emailID.$invalid
                          "
                        >
                          {{ $t('registration.sendOtp') }}
                        </button>
                      </div>
                    </div>

                    <div
                      class="text-danger"
                      v-if="submitted && !$v.student.emailID.required"
                    >
                      Please provide valid email
                    </div>
                  <!-- <div
                    class="text-danger"
                    v-if="submitted && !$v.student.emailID.required"
                  >
                    Please Provide Email!
                  </div> -->
                  </div>
                </div>
                <div
                  class="col-md-6"
                  v-if="showEmailOtpField == true"
                >
                  <div class="form-group">
                    <label
                      class="control-label form-label"
                    >Enter OTP</label>
                    <div class="input-group">
                      <input
                        class="form-control"
                        v-model="student.votp"
                        :placeholder="$t('registration.enterOtpPlaceholder')"
                        id="votp"
                        :disabled="emailflag == 1"
                        :class="{
                          'is-invalid':
                            emailotp_submitted && $v.student.votp.$invalid
                        }"
                      >
                      <div class="input-group-append">
                        <button
                          type="button"
                          class="btn btn-green"
                          @click="verifyEmailOtp()"
                          :disabled="emailflag == 1 || student.votp == ''"
                        >
                          {{ emailButton }}
                        </button>
                      </div>
                    </div>
                    <div
                      class="text-danger"
                      v-if="emailotp_submitted && !$v.student.votp.required"
                    >
                      {{ $t('registration.venterOtp') }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-8 col-lg-4">
                  <div class="form-group">
                    <label
                      for="states"
                      class="control-label form-label"
                    >State</label>
                    <span class="text-danger">*</span>

                    <v-select
                      v-model="student.selectedState"
                      label="displayName"
                      :placeholder="$t('registration.statePlaceholder')"
                      :options="states"
                      :value="student.selectedState"
                      @input="getDistrictsByStateId()"
                    />
                    <div
                      class="text-danger"
                      v-if="
                        !$v.student.selectedState.required &&
                          $v.student.selectedState.$error
                      "
                    >
                      {{ $t('registration.vstate') }}
                    </div>
                  </div>
                </div>
                <div class="col-md-8 col-lg-4">
                  <div class="form-group">
                    <label
                      for="districts"
                      class="control-label form-label"
                    >
                      District
                      <span class="text-danger">*</span>
                    </label>

                    <v-select

                      v-model="student.selectedDistrict"
                      label="displayName"
                      :placeholder="$t('registration.districtPlaceholder')"
                      :options="districts"
                      :value="student.selectedDistrict"
                    />
                    <div
                      class="text-danger"
                      v-if="
                        !$v.student.selectedDistrict.required &&
                          $v.student.selectedDistrict.$error
                      "
                    >
                      {{ $t('registration.vdistrict') }}
                    </div>
                  </div>
                </div>

                <div class="col-md-8 col-lg-4">
                  <div class="form-group">
                    <label class="control-label form-label">
                      Pincode
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      class="form-control"
                      v-model="student.pincode"
                      oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                      placeholder="Enter Your Pincode"
                      maxlength="6"
                      minlength="6"
                      id="pincode"
                      :class="{
                        'is-invalid':
                          submitted && $v.student.pincode.$invalid
                      }"
                    >
                    <div
                      class="text-danger"
                      v-if="submitted && !$v.student.pincode.required"
                    >
                      {{ $t('registration.pincode') }}
                    </div>
                    <div
                      class="text-danger"
                      v-if="submitted && !$v.student.pincode.numeric"
                    >
                      {{ $t('registration.pincode2') }}
                    </div>
                    <div
                      class="text-danger"
                      v-if="
                        submitted &&
                          (!$v.student.pincode.minLength ||
                          !$v.student.pincode.maxLength)
                      "
                    >
                      {{ $t('registration.pincode3') }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-form">
              <div class="row" />

              <div class="card-header card-header-alt">
                Educational Details
              </div>
              <div class="card-form">
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
                            v-model="student.educationLevel"
                            label="displayName"
                            placeholder="Select Qualification"
                            :options="Class"
                            @input="getClassDetails()"
                          />
                          <div
                            class="text-danger"
                            v-if="
                              !$v.student.educationLevel.required &&
                                $v.student.educationLevel.$error
                            "
                          >
                            {{ $t('registration.veducationLevel') }}
                          </div>
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
                  @click="studentRegister()"
                >
                  Register
                </button>
              </div>
            </div>
            <div class="help-wrapper">
              <div class="copyright-holder">
                <div class="logo-holder">
                  <div
                    class="item"
                    v-if="
                      student.educationLevel &&
                        student.educationLevel.levelName === 'Schooling'
                    "
                  >
                    <img
                      src="../../../public/assets/images/logo_mkclkf.png"
                      alt="MKCL Knowledge Foundation"
                    >
                  </div>
                  <div class="item">
                    <img
                      src="../../../public/assets/images/logo_mkcl.svg"
                      class="img-adj"
                      alt="MKCL"
                    >
                  </div>
                  <div
                    class="item"
                    v-if="
                      student.educationLevel &&
                        student.educationLevel.levelName === 'Schooling'
                    "
                  >
                    <img
                      src="../../../public/assets/images/logo_ebalbharati.png"
                      alt="eBalbharati"
                    >
                  </div>
                </div>
                <div class="copyright">
                  <span
                    v-if="
                      student.educationLevel &&
                        student.educationLevel.levelName === 'Schooling'
                    "
                  >
                    The copyright of eBalbharati duly acknowledged.</span>
                  <br>
                  Powered by
                  <a
                    href="https://www.mkcl.org"
                    target="_blank"
                  >Maharashtra Knowledge Corporation Ltd</a>. (MKCL), Copyright © 2020. All rights reserved.<br>
                </div>
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
            <ol>
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
          </div>
          <strong>I HEREBY ACKNOLWEDGE THAT I HAVE READ, UNDERSTOOD AND AGREE TO THE ABOVE TERMS & CONDITIONS RELATING TO USAGE OF MKCL DNExT APPLICATION PROCESS.
          </strong>
          <div class="modal-button">
            <!-- <b-button  class="btn btn-rounded btn-white" type="submit" @click="onAccept()">Accept</b-button> -->
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
// import Response from '@/plugins/response.js'
import MQL from '@/plugins/mql.js'
// import 'flatpickr/dist/flatpickr.css'
import Datepicker from 'vuejs-datepicker'
// import VueTimepicker from 'vue2-timepicker'
// import 'vue2-timepicker/dist/VueTimepicker.css'
// import Toasted from "vue-toasted";
import {
  required,
  numeric,
  minLength,
  maxLength,
  helpers,
  email,
  requiredIf
} from 'vuelidate/lib/validators'
// import flatPickr from 'vue-flatpickr-component'
var moment = require('moment')
export default {
  data () {
    return {
      student: {
        selectedUniversity: null,
        selectedFaculty: null,
        selectedCourse: null,
        selectedYear: null,
        selectedDistrict: null,
        selectedState: null,
        mockExamCategory: '',
        educationLevel: '',
        class: '',
        medium: '',
        schoolName: '',
        collegeName: '',
        parentOrGuardianName: '',
        votp: '',
        emailID: '',
        dateOfBirth: ''
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
      disabledDateOfBirthDates: {
        from: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        )
      },
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
        // { value: null, text: 'Please select gender' },
        { value: 'Male', text: 'Male' },
        { value: 'Female', text: 'Female' },
        { value: 'Other', text: 'Other' }
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
    password: {
      required,
      goodPassword: (Password) => {
        // a custom validator!
        return (
          Password.length >= 8 &&
          /[a-z]/.test(Password) &&
          /[A-Z]/.test(Password) &&
          /[0-9]/.test(Password)
        )
      }
    },
    cnfpassword: {
      required
    },
    student: {
      emailID: {
        email,
        required
      },
      dateOfBirth: {
        required
      },

      selectedTaluka: {
        required
      },
      selectedDistrict: {
        required
      },
      selectedState: {
        required
      },
      pincode: {
        required,
        numeric,
        minLength: minLength(6),
        maxLength: maxLength(6)
      },
      fullName: {
        required,
        isNameValid: helpers.regex('isNameValid', /^[a-zA-Z ]*$/)
      },

      gender: {
        required
      },

      educationLevel: {
        required
      },

      class: {
        required: requiredIf(function () {
          return this.student.educationLevel.levelName == 'Schooling'
        })
      }

    },
    otp_d: {
      mobileNumber: {
        required,
        numeric,
        minLength: minLength(10),
        maxLength: maxLength(10)
      },
      votp: { required }
    }
  },
  created () {
    const vm = this
    this.$store.dispatch('getServerTime').then((res) => {
      this.currentDate = res.result.dateTime
    })
    vm.starter()
    vm.getAllUniversities()
    vm.getEducationLevelDetails()
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
        .setData({ email: this.student.emailID })
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
        .setData(this.otp_d)
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
        .setData({ email: this.student.emailID, verifyOTP: this.student.votp })
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
        .setData({ mobileNumber: this.otp_d.mobileNumber, verifyOTP: this.otp_d.votp })
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
    getStudentByMobileNumber () {
      const vm = this

      new MQL()
        .setActivity('o.[query_1hXeD5LAD87jShqFLFLkXaXzBYk]')
        .setData({ mobileNumber: vm.otp_d.mobileNumber })
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('query_1hXeD5LAD87jShqFLFLkXaXzBYk', true)
          if (rs.isValid('query_1hXeD5LAD87jShqFLFLkXaXzBYk')) {
            if (res === null) {
              this.getOtp()
            } else {
              this.$toasted.error('Mobile Number already exists', {
                theme: 'bubble',
                position: 'top-center',
                duration: 3000
              })
            }
          } else {
            rs.showErrorToast('query_1hXeD5LAD87jShqFLFLkXaXzBYk')
          }
        })
    },

    getAllCountries () {
      return new Promise((resolve) => {
        const vm = this
        new MQL()
          .setActivity('o.[query_293ccRYOvTADqM5DVvZGDX6ceNb]')
          // .setData(data)
          .fetch()
          .then((rs) => {
            let res = rs.getActivity('query_293ccRYOvTADqM5DVvZGDX6ceNb', true)
            if (rs.isValid('query_293ccRYOvTADqM5DVvZGDX6ceNb')) {
              vm.countries = res
              // console.log(vm.countries)
              //  vm.countries
              // if (vm.initflag){
              // vm.patient.address.selectedCountry = vm.countries[110];
              vm.countries = vm.countries.filter(
                (country) => country.countryName === 'India'
              )
              vm.student.selectedCountry = vm.countries[0]

              // vm.countries.sort(vm.compareCountry);
              // vm.states = []
              // }
              resolve()
            } else {
              rs.showErrorToast('query_1hXN8iXaXhjrTIlptbNbROS9QX4')
            }
          })
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
        // console.log("state code", vm.student.selectedState.STATE_CODE);
        // vm.stateId = vm.student.selectedState.STATE_CODE
        vm.stateName = 'Maharashtra'
        // console.log("state id",vm.stateId)
        new MQL()
          .setActivity('o.[query_293k2pcHKiS7GMwuDb9e1veS2g4]')
          .setData({ stateName: vm.stateName })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity('query_293k2pcHKiS7GMwuDb9e1veS2g4', true)
            if (rs.isValid('query_293k2pcHKiS7GMwuDb9e1veS2g4')) {
              if (res == null) {
                res = []
              }
              // console.log("res", res);
              vm.student.selectedDistrict = null
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

    saveUserCredentials () {
      const vm = this
      // vm.student_cred.username = vm.otp_d.mobileNumber;
      // vm.student_cred.password = password;
      // vm.student_cred.roleName = "student";
      new MQL()
        .setActivity('o.[SaveCredentials]')
        .setData(vm.student_cred)
        .fetch()
        .then((rs) => {
          // let res = rs.getActivity('SaveCredentials', true)
          if (rs.isValid('SaveCredentials')) {
          } else {
            rs.showErrorToast('SaveCredentials')
          }
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

    sendEmail () {
      const vm = this
      if (vm.student.emailID && vm.student.emailID !== '') {
        vm.student.emailID = vm.student.emailID
        new MQL()
          .setActivity('o.[SendEmailToCandidateAfterRegistration]')
          .setData(vm.student)
          .fetch()
          .then((rs) => {
            let res = rs.getActivity(
              'SendEmailToCandidateAfterRegistration',
              true
            )
            if (rs.isValid('SendEmailToCandidateAfterRegistration')) {
            } else {
              rs.showErrorToast('SendEmailToCandidateAfterRegistration')
            }
          })
      } else {
        vm.student.emailID = ''
      }
    },

    studentRegister () {
      const vm = this
      vm.submitted = true
      vm.$v.$touch()
      // vm.student.dateOfBirth = '2000-01-01 00:00:00'

      // console.log('$V:', this.$v)
      if (vm.flag === 1) {
        if (!vm.$v.$invalid) {
          if (vm.password === vm.cnfpassword) {
            if (vm.isGenderSelected) {
              vm.student.gender = vm.student.gender.value
            }

            vm.student.username = vm.otp_d.mobileNumber
            vm.student.mobileNumber = vm.otp_d.mobileNumber
            vm.student.password = vm.password
            vm.student.isEnabled = vm.isEnabled
            vm.student_cred.username = vm.otp_d.mobileNumber
            vm.student_cred.password = vm.password
            vm.student_cred.roleName = 'student'
            vm.customDate = vm.student.dateOfBirth
            vm.student.mockExamCategory = vm.mockExamCategories[0]
            vm.student.dateOfBirth = vm.customDate

            new MQL()
              .setActivity('o.[CandidateRegistration]')
              .setData(vm.student)
              .fetch()
              .then((rs) => {
                if (rs.isValid('CandidateRegistration')) {
                  // vm.$toasted.success(
                  //   'You have been successfully registered on MKCL Mock Exams portal and your login credentials have been sent to registered email id and mobile number.',
                  //   {
                  //     theme: 'bubble',
                  //     position: 'top-center',
                  //     duration: 5000
                  //   }
                  // )

                  vm.sendEmail()

                  if (vm.student.emailID && vm.student.emailID !== '') {
                    vm.$toasted.success(
                      'You have been successfully registered on MKCL Mock Exams portal and your login credentials have been sent to registered email id and mobile number.',
                      {
                        theme: 'bubble',
                        position: 'top-center',
                        duration: 5000
                      }
                    )
                  } else {
                    vm.$toasted.success(
                      'You have been successfully registered on MKCL Mock Exams portal and your login credentials have been sent to registered  mobile number.',
                      {
                        theme: 'bubble',
                        position: 'top-center',
                        duration: 5000
                      }
                    )
                  }
                  vm.saveUserCredentials()
                  this.$router.push({
                    name: 'Login'
                  })
                } else {
                  rs.showErrorToast('Registration Failed')
                }
              })
          } else {
            vm.$toasted.error('Password doesnt match!', {
              theme: 'bubble',
              position: 'top-center',
              duration: 3000
            })
          }
        } else {
          vm.$toasted.error('Please enter all the required data!', {
            theme: 'bubble',
            position: 'top-center',
            duration: 3000
          })
        }
      } else {
        this.$toasted.error('Please verify your Mobile number !', {
          theme: 'bubble',
          position: 'top-center',
          duration: 3000
        })
      }
    }
  }
}
</script>

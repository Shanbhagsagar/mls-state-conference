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

              <!-- <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label form-label">
                    Middle Name
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    class="form-control"
                    v-model="student.middleName"
                    id="middleName"
                    :class="{
                      'is-invalid': submitted && $v.student.middleName.$invalid,
                    }"
                  >
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.student.middleName.required"
                  >
                    Please Provide Your Middle Name !
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.student.middleName.isNameValid"
                  >
                    Name only contain letters. Numbers not allowed !
                  </div>
                </div>
              </div>-->
              <!-- <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label form-label">
                    Last Name
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    class="form-control"
                    v-model="student.lastName"
                    id="lastName"
                    :class="{
                      'is-invalid': submitted && $v.student.lastName.$invalid,
                    }"
                  >
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.student.lastName.required"
                  >
                 Please Provide Your Last Name !
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.student.lastName.isNameValid"
                  >
                    Name only contain letters. Numbers not allowed !
                  </div>
                </div>
              </div>-->
              <div class="col-md-6 col-lg-3">
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
              <div class="col-md-6 col-lg-3">
                <div class="form-group">
                  <label
                    for="dob"
                    class="control-label form-label"
                  >
                    {{ $t('registration.dob') }}
                    <span class="text-danger">*</span>
                  </label>
                  <div class="fp-holder">
                    <datepicker
                      placeholder="DD/MM/YYYY"
                      format="dd-MM-yyyy"
                      :disabled-dates="disabledDateOfBirthDates"
                      v-model="student.dateOfBirth"
                      :input-class="{
                        'form-control': 'form-control',
                      }"
                      :class="{
                        'is-invalid':
                          submitted && $v.student.dateOfBirth.$invalid,
                      }"
                      @input="validateAge(student.dateOfBirth)"
                    />
                    <i class="mdi mdi-calendar" />
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.student.dateOfBirth.required"
                  >
                    {{ $t('registration.vdob') }}
                  </div>
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
                          <button
                            class="btn btn-purple"
                            @click="getStudentByMobileNumber()"
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
                    >
                    <div class="input-group-append">
                      <button
                        class="btn btn-purple"
                        @click="getStudentByMobileNumber()"
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
                    v-if="submitted && !$v.student.emailID.email"
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
              </div>
              
              <div class="row">
              <div class="col-md-8 col-lg-4">
                <div class="form-group">
                  <label
                    for="states"
                    class="control-label form-label"
                  >State</label>
                  <span class="text-danger">*</span>
                  <!-- <select
                    class="form-control"
                    :disabled="true"
                    v-model="student.selectedStates"
                    @change="getDistrictsByStateId()"
                  >
                    <option value>
                      Select States
                    </option>
                    <option
                      v-for="state in states"
                      :value="state"
                    >
                      {{ state.STATE_NAME }}
                    </option>
                  </select>-->
                  <v-select
                    v-model="student.selectedState"
                    label="STATE_NAME"
                    :placeholder="$t('registration.statePlaceholder')"
                    :options="states"
                    :value="student.state"
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
                  <!-- <select
                    class="form-control"
                    :disabled="districts.length == 0"
                    v-model="student.selectedDistrict"
                  >
                    <option value>
                      Select Districts
                    </option>
                    <option
                      v-for="district in districts"
                      :value="district"
                    >
                      {{ district.DISTRICT_NAME }}
                    </option>
                  </select>-->
                  <v-select

                    v-model="student.selectedDistrict"
                    label="DISTRICT_NAME"
                    :placeholder="$t('registration.districtPlaceholder')"
                    :options="districts"
                    :value="student.selectedDistrict"
                    @input="getTalukaByDistrictId()"
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

              <!-- <div class="col-md-6">
                <div class="form-group">
                  <label
                    for="districts"
                    class="control-label form-label"
                  >तालुका/Taluka <span class="text-danger">*</span></label> -->
              <!-- <select
                    class="form-control"
                    :disabled="talukas.length == 0"
                    v-model="student.selectedTaluka"
                  >
                    <option value>
                      Select Districts
                    </option>
                    <option
                      v-for="(taluka,k) in talukas"
                      :key="k"
                      :value="taluka"
                    >
                      {{ taluka.TEHSILNAME }}
                    </option>
                  </select> -->
              <!-- <v-select
                    :disabled="talukas.length == 0"
                    v-model="student.selectedTaluka"
                    label="TEHSILNAME"
                    :placeholder="$t('registration.vtaluka')"
                    :options="talukas"
                    :value="student.selectedTaluka"
                  />
                  <div
                    class="text-danger"
                    v-if="
                      !$v.student.selectedTaluka.required &&
                        $v.student.selectedTaluka.$error
                    "
                  >
                    {{ $t('registration.vtaluka') }}
                  </div>
                </div>
              </div> -->

              <div class="col-md-8 col-lg-4">
                <div class="form-group">
                  <label class="control-label form-label">
                    Pincode
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    class="form-control"
                    v-model="student.villageOrTown"
                    placeholder="Enter Your Pincode"
                    id="villageOrTown"
                    :class="{
                      'is-invalid':
                        submitted && $v.student.villageOrTown.$invalid
                    }"
                  >
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.student.villageOrTown.required"
                  >
                    {{ $t('registration.vvillage1') }}
                  </div>
                  <div
                    class="text-danger"
                    v-if="
                      submitted && !$v.student.villageOrTown.isVillageNameValid
                    "
                  >
                    {{ $t('registration.vvillage2') }}
                  </div>
                </div>
              
              </div>

              <!-- <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label form-label">
                    पासवर्ड/Password
                    <span class="text-danger">*</span>
                  </label>
                  <div class="ic-holder">
                    <b-form-input
                      class="form-control"
                      v-model="password"
                      :placeholder="$t('registration.passwordPlaceholder')"
                      id="password"
                      :type="PasswordInputType"
                      :class="{
                        'is-invalid': submitted && $v.password.$invalid,
                        'is-valid': $v.password.goodPassword
                      }"
                    />
                    <i
                      class="mdi mdi-eye"
                      :class="iconChangeCnf"
                      @click="passwordVisibility"
                    />
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.password.required"
                  >
                    {{ $t('registration.vpassword1') }}
                  </div>
                  <div
                    class="text-info"
                    v-if="!submitted && !$v.password.goodPassword"
                  >
                    {{ $t('registration.vpassword2') }}
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.password.goodPassword"
                  >
                    {{ $t('registration.vpassword2') }}
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label form-label">
                    पासवर्ड पुन्हा टाकून निश्चित करा/Confirm Password
                    <span class="text-danger">*</span>
                  </label>
                  <div class="ic-holder">
                    <b-form-input
                      class="form-control"
                      v-model="cnfpassword"
                      :placeholder="
                        $t('registration.confirmPasswordPlaceholder')
                      "
                      id="cnfpassword"
                      :type="PasswordInput"
                      :class="{
                        'is-invalid': submitted && $v.cnfpassword.$invalid
                      }"
                    />
                    <i
                      class="mdi mdi-eye"
                      :class="iconChangeCnf"
                      @click="passwordVisibilityCnf"
                    />
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.cnfpassword.required"
                  >
                    {{ $t('registration.vconfirmPassword') }}
                  </div>
                </div>
              </div> -->

              <!-- <div class="col-md-6">
                <div class="form-group">
                  <label
                    for="country"
                    class="control-label form-label"
                  >Country</label>
                  <select
                    class="form-control"
                    :disabled="true"
                    v-model="student.selectedCountry"
                    @change="getStatesByCountryId()"
                  >
                    <option value>
                      Select Country
                    </option>
                    <option
                      v-for="country in countries"
                      :value="country"
                    >
                      {{ country.countryName }}
                    </option>
                  </select>
                </div>
              </div>-->

              <!-- <div class="col-md-6">
                <div class="form-group">
                  <label
                    for="districts"
                    class="control-label form-label"
                  >Taluka</label>
                  <select
                    class="form-control"
                    :disabled="talukas.length == 0"
                    v-model="student.selectedTaluka"
                  >
                    <option value>
                      Select Districts
                    </option>
                    <option
                      v-for="taluka in talukas"
                      :value="taluka"
                    >
                      {{ taluka.TEHSILNAME }}
                    </option>
                  </select>
                  <div
                    class="text-danger"
                    v-if="
                      !$v.student.selectedTaluka.required &&
                      $v.student.selectedTaluka.$error
                    "
                  >
                    Please Select Taluka
                  </div>
                </div>
              </div>-->

              <!-- <div class="col-md-6">
                <div class="form-group">
                  <label
                    for="exam"
                    class="control-label form-label"
                  >
                    Which Type of Exam you want to attempt
                    <span class="text-danger">*</span>
                  </label>
                  <b-form-select
                    @change="changeExamFlag"
                    v-model="student.exam"
                    id="exam"
                    :options="exams"
                    :class="{
                      'is-invalid': submitted && $v.student.exam.$invalid,
                    }"
                  />
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.student.exam.required"
                  >
                    Please select exam !
                  </div>
                </div>
              </div>-->
            </div>
          </div>

          <!-- <div class="card-header card-header-alt">
            Educational Details
          </div> -->
          <div class="card-form">
            <div class="row">
              <!-- <div class="col-md-6"> -->
              <!-- <div class="form-group"> -->
              <!-- <label
                    for="exam"
                    class="control-label form-label"
                  >
                    University
                    <span class="text-danger">*</span>
                  </label> -->
              <!-- <select
                    class="form-control"
                    :disabled="universities.length == 0"
                    v-model="student.selectedUniversity"
                    @change="getFacultiesByUniversityId()"
                  >
                    <option value>
                      Select universities
                    </option>
                    <option
                      v-for="university in universities"
                      :value="university"
                    >
                      {{ university.universityName }}
                    </option>
                  </select>-->
              <!-- <v-select
                    v-model="student.selectedUniversity"
                    label="universityName"
                    placeholder="Enter/Select The University"
                    :options="universities"
                    :value="student.selectedUniversity"
                    @input="getFacultiesByUniversityId()"
                  /> -->
              <!-- <div
                    class="text-danger"
                    v-if="submitted && !$v.student.selectedUniversity.required"
                  >
                    Please select University Name !
                  </div> -->
              <!-- </div> -->
              <!-- </div> -->
              <!-- <div class="col-md-6"> -->
              <!-- <div class="form-group"> -->
              <!-- <label
                    for="exam"
                    class="control-label form-label"
                  >
                    Faculty
                    <span class="text-danger">*</span>
                  </label> -->
              <!-- <select
                    class="form-control"
                    :disabled="faculties.length == 0"
                    v-model="student.selectedFaculty"
                    @change="getCoursesByFacultyId()"
                  >
                    <option value>
                      Select Faculty
                    </option>
                    <option
                      v-for="faculty in faculties"
                      :value="faculty"
                    >
                      {{ faculty.facultyName }}
                    </option>
                  </select>-->
              <!-- <v-select
                    :disabled="faculties.length == 0"
                    v-model="student.selectedFaculty"
                    label="facultyName"
                    placeholder="Enter/Select The Faculty"
                    :options="faculties"
                    :value="student.selectedFaculty"
                    @input="getCoursesByFacultyId()"
                  >
                  </v-select> -->
              <!-- <template v-slot:option="option"> -->
              <!-- <span :class="option.icon"></span> -->
              <!-- {{ option.facultyName }} (Faculty Id:{{
                        option.facultyId
                      }})
                    </template> -->

              <!-- <div
                    class="text-danger"
                    v-if="submitted && !$v.student.selectedFaculty.required"
                  >
                    Please select Faculty Name !
                  </div> -->
              <!-- </div> -->
              <!-- </div> -->
              <!-- <div class="col-md-12">
                <div class="form-group">
                  <label
                    for="exam"
                    class="control-label form-label"
                  >
                    Course Name
                    <span class="text-danger">*</span>
                  </label> -->
              <!-- <select
                    class="form-control"
                    :disabled="courses.length == 0"
                    v-model="student.selectedCourse"
                  >
                    <option value>
                      Select Course
                    </option>
                    <option
                      v-for="course in courses"
                      :value="course"
                    >
                      {{ course.courseName }}
                    </option>
                  </select>-->
              <!-- <v-select
                    :disabled="courses.length == 0"
                    v-model="student.selectedCourse"
                    placeholder="Enter/Select The Course"
                    label="courseName"
                    :options="courses"
                    :value="student.selectedCourse"
                  ></v-select> -->
              <!-- <template v-slot:option="option"> -->
              <!-- <span :class="option.icon"></span> -->
              <!-- {{ option.courseName }} (Course Pattern:{{
                        option.coursePattern
                      }})
                    </template> -->

              <!-- <div
                    class="text-danger"
                    v-if="submitted && !$v.student.selectedCourse.required"
                  >
                    Please select Course Name !
                  </div> -->
              <!-- </div> -->
              <!-- </div> -->
              <!-- <div class="col-md-6" v-if="isUniversityExam">
                <div class="form-group">
                  <label for="exam" class="control-label form-label">
                    Year
                    <span class="text-danger">*</span>
                  </label> -->
              <!-- <select
                    class="form-control"
                    :disabled="courses.length == 0"
                    v-model="student.selectedCourse"
                  >
                    <option value>
                      Select Course
                    </option>
                    <option
                      v-for="course in courses"
                      :value="course"
                    >
                      {{ course.courseName }}
                    </option>
                  </select>-->
              <!-- <v-select
                    :disabled="years.length == 0"
                    v-model="student.selectedYear"
                    placeholder="Enter/Select The Year"
                    label="coursePart"
                    :options="years"
                    :value="student.selectedYear"
                  > -->
              <!-- <template v-slot:option="option"> -->
              <!-- <span :class="option.icon"></span> -->
              <!-- {{ option.coursePart }} (Course Part Term:{{
                        option.coursePartTerm
                      }})
                    </template> -->
              <!-- </v-select>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.student.selectedYear.required"
                  >
                    Please select Year !
                  </div>
                </div>
              </div> -->
              <!-- <div class="col-md-6" v-show="isUniversityExam">
                <div class="form-group">
                  <label
                    for="exam"
                    class="control-label form-label"
                  >
                    Select Year
                    <span class="text-danger">*</span>
                  </label>
                  <div class="holder">
                    <div
                      class="custom-control custom-radio custom-control-inline"
                    >
                      <input
                        type="radio"
                        id="customRadioInline1"
                        class="custom-control-input"
                        name="year"
                        value="First Year"
                        v-model="student.selectedYear"
                      >
                      <label
                        class="custom-control-label"
                        for="customRadioInline1"
                      >First Year</label>
                    </div>
                    <div
                      class="custom-control custom-radio custom-control-inline"
                    >
                      <input
                        type="radio"
                        id="customRadioInline2"
                        class="custom-control-input"
                        name="year"
                        value="Second Year"
                        v-model="student.selectedYear"
                      >
                      <label
                        class="custom-control-label"
                        for="customRadioInline2"
                      >Second Year</label>
                    </div>
                    <div
                      class="custom-control custom-radio custom-control-inline"
                    >
                      <input
                        type="radio"
                        id="customRadioInline3"
                        class="custom-control-input"
                        name="year"
                        value="Third Year"
                        v-model="student.selectedYear"
                      >
                      <label
                        class="custom-control-label"
                        for="customRadioInline3"
                      >Third Year</label>
                    </div>
                    <div
                      class="custom-control custom-radio custom-control-inline"
                    >
                      <input
                        type="radio"
                        id="customRadioInline4"
                        class="custom-control-input"
                        name="year"
                        value="Fourth Year"
                        v-model="student.selectedYear"
                      >
                      <label
                        class="custom-control-label"
                        for="customRadioInline4"
                      >Fourth Year</label>
                    </div>
                    <div
                      class="custom-control custom-radio custom-control-inline"
                    >
                      <input
                        type="radio"
                        id="customRadioInline5"
                        class="custom-control-input"
                        name="year"
                        value="Fifth Year"
                        v-model="student.selectedYear"
                      >
                      <label
                        class="custom-control-label"
                        for="customRadioInline5"
                      >Fifth Year</label>
                    </div>
                  </div>
                </div>
              </div>-->
              <!-- <div class="col-md-6">
                <div class="form-group">
                  <label
                    for="exam"
                    class="control-label form-label"
                  >
                    How to attempt the exam
                    <span class="text-danger">*</span>
                  </label>
                  <b-form-select
                    v-model="student.modeOfExam"
                    id="mode"
                    :options="mode"
                    :class="{
                      'is-invalid': submitted && $v.student.modeOfExam.$invalid,
                    }"
                  />
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.student.modeOfExam.required"
                  >
                    Please select Mode Of Exam !
                  </div>
                </div>
              </div>-->
            </div>

            <div class="card-header card-header-alt">
              Educational Details
            </div>
            <div class="card-form">
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <!-- <div class="col-md-6">
                      <div class="form-group">
                        <label for="exam" class="control-label form-label">
                          Mock Exam Category <span class="text-danger">*</span>
                        </label>
                        <v-select
                          v-model="student.mockExamCategory"
                          label="categoryName"
                          :options="mockExamCategories"
                          item-value="text"
                          @input="getEducationLevelDetails()"
                        />
                        <div
                          class="text-danger"
                          v-if="
                            !$v.student.mockExamCategory.required &&
                              $v.student.mockExamCategory.$error
                          "
                        >
                          Please Select Mock Exam Category
                        </div>
                      </div>
                    </div> -->

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
                          :options="EducationLevels"
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

                    <div
                      class="col-md-12 col-lg-6"
                      v-if="
                        student.educationLevel &&
                          student.educationLevel.levelName === 'Schooling'
                      "
                    >
                      <div class="form-group">
                        <label class="control-label form-label">
                          शाळेचे नाव/School Name
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          class="form-control"
                          v-model="student.schoolName"
                          :placeholder="
                            $t('registration.schoolNamePlaceholder')
                          "
                          id="schoolName"
                          :class="{
                            'is-invalid':
                              submitted && $v.student.schoolName.$invalid
                          }"
                        >
                        <div
                          class="text-danger"
                          v-if="submitted && !$v.student.schoolName.required"
                        >
                          {{ $t('registration.vschoolName') }}
                        </div>
                        <!-- <div
                    class="text-danger"
                    v-if="submitted && !$v.student.schoolName.isNameValid"
                  >
                    Name only contain letters. Numbers not allowed !
                  </div> -->
                        <div class="text-info">
                          <!-- महत्वाचे: शाळेचे नाव इ-गुणपत्रिकेवर दिसणार आहे.
                          त्यामुळे संपूर्ण नाव अचूक भरावे. उदा. महात्मा गांधी
                          माध्यमिक विद्यालय, सातारा.<br> -->
                          Important: School Name shall appear on eMarksheet.
                          Please enter full name correctly. E.g. Mahatma Gandhi
                          Secondary School, Satara.
                        </div>
                      </div>
                    </div>

                    <div
                      class="col-md-12 col-lg-6"
                      v-if="
                        student.educationLevel &&
                          student.educationLevel.levelName !== 'Schooling'
                      "
                    >
                      <div class="form-group">
                        <label class="control-label form-label">
                          महाविद्यालयाचे नाव/College Name
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          class="form-control"
                          v-model="student.collegeName"
                          :placeholder="
                            $t('registration.collageNamePlaceholder')
                          "
                          id="collegeName"
                          :class="{
                            'is-invalid':
                              submitted && $v.student.collegeName.$invalid
                          }"
                        >
                        <div
                          class="text-danger"
                          v-if="submitted && !$v.student.collegeName.required"
                        >
                          {{ $t('registration.vcollageName') }}
                        </div>
                        <!-- <div
                    class="text-danger"
                    v-if="submitted && !$v.student.collegeName.isNameValid"
                  >
                    Name only contain letters. Numbers not allowed !
                  </div> -->
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div
                        class="form-group"
                        v-if="
                          student.educationLevel &&
                            student.educationLevel.levelName === 'Schooling'
                        "
                      >
                        <label
                          for="exam"
                          class="control-label form-label"
                        >
                          माध्यम/Medium
                          <span class="text-danger">*</span></label>
                        <v-select
                          v-model="student.medium"
                          label="displayName"
                          :options="Medium"
                          value="Medium"
                        />
                        <div
                          class="text-danger"
                          v-if="
                            !$v.student.medium.required &&
                              $v.student.medium.$error
                          "
                        >
                          {{ $t('registration.vmedium') }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div
                        class="form-group"
                        v-if="
                          student.educationLevel &&
                            student.educationLevel.levelName === 'Schooling'
                        "
                      >
                        <label
                          for="exam"
                          class="control-label form-label"
                        >
                        Standard <span class="text-danger">*</span>
                        </label>
                        <v-select
                          v-model="student.class"
                          label="displayName"
                          :options="Class"
                          :value="Class"
                        />
                        <div
                          class="text-danger"
                          v-if="
                            !$v.student.class.required &&
                              $v.student.class.$error
                          "
                        >
                          {{ $t('registration.vstandard') }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 mt-2">
                      <div
                        class="form-group"
                        v-if="
                          student.educationLevel &&
                            student.educationLevel.levelName === 'Schooling'
                        "
                      >
                        <label
                          for="TiliMili"
                          class="control-label form-label"
                        >तुम्ही टिलीमिली ही दूरदर्शन मालिका पहिली आहे का? Have
                          you watched Tilimili Doordarshan serial? </label><span class="text-danger">*</span>
                        <div class="cc-holder">
                          <b-form-radio-group
                            class="mb-3"
                            v-model="student.istiliMiliSeen"
                            :options="Options"
                            value-field="value"
                            text-field="text"
                          />
                        </div>
                        <div
                          class="text-danger"
                          v-if="
                            submitted && !$v.student.istiliMiliSeen.required
                          "
                        >
                          कृपया पर्याय निवडा/Please Select Option?
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 mt-1">
                      <div
                        class="form-group"
                        v-if="
                          student.educationLevel &&
                            student.educationLevel.levelName === 'Schooling'
                        "
                      >
                        <label
                          for="TiliMili"
                          class="control-label form-label"
                        >तुम्ही टिलीमिली मोबाईल अँप गुगल प्ले स्टोअर वरून
                          डाऊनलोड केले आहे का ? /</label>
                        <label
                          for="TiliMili"
                          class="control-label form-label"
                        >
                          Have you downloaded TiliMili Mobile app from google
                          play store?
                        </label>
                        <span class="text-danger">*</span>
                        <div class="cc-holder">
                          <b-form-radio-group
                            class="mb-3"
                            v-model="student.istiliMiliAppDownloaded"
                            :options="Options"
                            value-field="value"
                            text-field="text"
                          />
                        </div>
                        <div
                          class="text-danger"
                          v-if="
                            submitted &&
                              !$v.student.istiliMiliAppDownloaded.required
                          "
                        >
                          कृपया पर्याय निवडा/Please Select Option?
                        </div>

                        <span v-if="student.istiliMiliAppDownloaded === false">
                          <a
                            target="_blank"
                            href="https://www.mkcl.org/tilimiliapp"
                          >डाउनलोड करण्यासाठी येथे क्लिक करा/Click here to
                            Download</a>
                        </span>
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
            <!-- <li>
              Practice tests made available on the portal
              <a
                href="mockexams.mkcl.org"
                target="_blank"
              >
                <u>mockexams.mkcl.org</u>
              </a>
              {{ $t('registration.term21') }}
            </li> -->
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
        parentOrGuardianName: ''
      },
      student_cred: {},
      isGenderSelected: false,
      iconChange: 'mdi mdi-eye',
      iconChangeCnf: 'mdi mdi-eye',
      submitted: false,
      button: 'Verify',
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
      sendOtpFlag: false,
      showOtpField: false,

      PasswordInputType: 'password',
      PasswordInput: 'password',
      flag: 0,
      otp_d: {
        mobileNumber: '',
        votp: ''
      },
      commonDateConfig: {
        dateFormat: 'Y-m-d',
        maxDate: 'today'
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
      mockExamCategories: [
        { categoryId: 1, categoryName: 'Academic' },
        { categoryId: 2, categoryName: 'Competitive' }
      ],
      Medium: [
        { mediumId: 3, mediumName: 'Marathi', displayName: 'मराठी/Marathi' },
        { mediumId: 1, mediumName: 'English', displayName: 'इंग्रजी/English' },
        {
          mediumId: 2,
          mediumName: 'Semi-English',
          displayName: 'सेमी इंग्रजी/Semi-English'
        }
        // { mediumId: 2, mediumName: 'Hindi' },
      ],
      Options: [
        { text: 'हो/Yes', value: true },
        { text: 'नाही/No', value: false }
      ],
      showGuardianFlag: false
    }
  },
  components: {
    Datepicker
  },
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
        email
        // required,
      },
      // selectedUniversity: {
      //   required
      // },
      // selectedFaculty: {
      //   required
      // },
      // selectedCourse: {
      //   required
      // },
      selectedTaluka: {
        required
      },
      selectedDistrict: {
        required
      },
      selectedState: {
        required
      },
      villageOrTown: {
        required,
        isVillageNameValid: helpers.regex('isVillageNameValid', /^[a-zA-Z ]*$/)
      },
      fullName: {
        required,
        isNameValid: helpers.regex('isNameValid', /^[a-zA-Z ]*$/)
      },

      parentOrGuardianName: {
        required: requiredIf(function () {
          return this.showGuardianFlag == true
        }),
        isParentNameValid: helpers.regex('isParentNameValid', /^[a-zA-Z ]*$/)
      },
      // middleName: {
      //   required,
      //   isNameValid: helpers.regex("isNameValid", /^[a-zA-Z ]*$/),
      // },
      // lastName: {
      //   required,
      //   isNameValid: helpers.regex("isNameValid", /^[a-zA-Z ]*$/),
      // },
      dateOfBirth: {
        required
      },
      gender: {
        required
      },
      // mockExamCategory: {
      //   required,
      // },
      educationLevel: {
        required
      },
      medium: {
        required: requiredIf(function () {
          return this.student.educationLevel.levelName == 'Schooling'
        })
      },
      class: {
        required: requiredIf(function () {
          return this.student.educationLevel.levelName == 'Schooling'
        })
      },
      schoolName: {
        required: requiredIf(function () {
          return this.student.educationLevel.levelName == 'Schooling'
        })
      },
      collegeName: {
        required: requiredIf(function () {
          return this.student.educationLevel.levelName != 'Schooling'
        })
      },

      istiliMiliSeen: {
        required: requiredIf(function () {
          return this.student.educationLevel.levelName == 'Schooling'
        })
      },

      istiliMiliAppDownloaded: {
        required: requiredIf(function () {
          return this.student.educationLevel.levelName == 'Schooling'
        })
      }

      // exam: {
      //   required,
      // },
      // modeOfExam: {
      //   required,
      // },
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

  methods: {
    changeLanguage (lang) {
      console.log('lang change :', lang)
      this.$i18n.locale = lang
      this.$i18n.fallbackLocale = lang
      loadLanguageAsync(lang).then(() => {
        console.log('Updated')
      })
    },
    // selectTypeOfExam() {
    //   const vm = this;
    //   vm.student.exam = vm.exams[0].value;
    //   vm.changeExamFlag();
    //   console.log("student exam", vm.student.exam);
    // },

    validateAge (date) {
      this.$store.dispatch('getServerTime').then((res) => {
        let age = moment(res.result.date).diff(date, 'years', false)
        // let age = 20
        // console.log("age", age);
        if (age < 18) {
          this.showGuardianFlag = true
        } else {
          this.showGuardianFlag = false
        }
      })
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

      await vm.getAllCountries()

      vm.countryId = vm.countries.filter(
        (country) => country.countryName == 'India'
      )[0].countryId
      await vm.getStatesByCountryId()
      vm.stateId = vm.states.filter(
        (state) => state.STATE_NAME == 'Maharashtra'
      )[0].STATE_CODE
      await vm.getDistrictsByStateId()

      // await vm.getTalukaByDistrictId();
    },
    passwordVisibility () {
      this.PasswordInputType =
        this.PasswordInputType === 'password' ? 'text' : 'password'
      this.iconChange =
        this.iconChange === 'mdi mdi-eye-off'
          ? 'mdi mdi-eye-off'
          : 'mdi mdi-eye'
    },
    passwordVisibilityCnf () {
      this.PasswordInput =
        this.PasswordInput === 'password' ? 'text' : 'password'
      this.iconChangeCnf =
        this.iconChangeCnf === 'mdi mdi-eye-off'
          ? 'mdi mdi-eye'
          : 'mdi mdi-eye-off'
    },
    // changeExamFlag() {
    //   const vm = this;
    //   if (vm.student.exam === "University Exam - Practice Test") {
    //     vm.isUniversityExam = true;
    //   } else {
    //     vm.isUniversityExam = false;
    //   }
    // },
    getOtp () {
      const vm = this

      this.showOtpField = true
      new MQL()
        .setActivity('o.[SendOtp]')
        .setData(this.otp_d)
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('SendOtP', true)
          if (rs.isValid('SendOtp')) {
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
            rs.showErrorToast('SendOtp')
          }
        })
    },
    verifyOtp () {
      const vm = this
      new MQL()
        .setActivity('o.[VerifyOtp]')
        .setData(this.otp_d)
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('VerifyOtp', true)
          if (rs.isValid('VerifyOtp')) {
            if (res.result.votp == 'OTPFOUND') {
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
            if (res.result.votp == 'OTPNOTFOUND') {
              this.flag = 0

              this.$toasted.error('Invalid OTP ', {
                theme: 'bubble',
                position: 'top-center',
                duration: 3000
              })
            }
          } else {
            rs.showErrorToast('VerifyOtp')
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
    getAllUniversities () {
      const vm = this
      new MQL()
        .setActivity('o.[query_1hYHKHUKdSeCkvVQ6OOrCX108ux]')
        // .setData(data)
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('query_1hYHKHUKdSeCkvVQ6OOrCX108ux', true)
          if (rs.isValid('query_1hYHKHUKdSeCkvVQ6OOrCX108ux')) {
            vm.universities = res
          } else {
            rs.showErrorToast('query_1hYHKHUKdSeCkvVQ6OOrCX108ux')
          }
        })
    },
    // getFacultiesByUniversityId () {
    //   const vm = this
    //   vm.universityId = vm.student.selectedUniversity.universityId
    //   new MQL()
    //     .setActivity('o.[query_1hYKlg8YbiIPKk2moCQyki6SybH]')
    //     .setData({ universityId: vm.universityId })
    //     .fetch()
    //     .then((rs) => {
    //       let res = rs.getActivity('query_1hYKlg8YbiIPKk2moCQyki6SybH', true)
    //       if (rs.isValid('query_1hYKlg8YbiIPKk2moCQyki6SybH')) {
    //         if (res !== null) {
    //           vm.student.selectedFaculty = null
    //           // console.log("res",res)
    //           vm.student.selectedCourse = null
    //           vm.courses = []
    //           vm.faculties = []
    //           vm.faculties = res
    //         }
    //       } else {
    //         rs.showErrorToast('query_1hYKlg8YbiIPKk2moCQyki6SybH')
    //       }
    //     })
    // },
    // getCoursesByFacultyId () {
    //   const vm = this
    //   vm.facultyId = vm.student.selectedFaculty.facultyId
    //   new MQL()
    //     .setActivity('o.[query_1hYMMO9ccVyucRMQoQGaofS4oP3]')
    //     .setData({ facultyId: vm.facultyId })
    //     .fetch()
    //     .then((rs) => {
    //       let res = rs.getActivity('query_1hYMMO9ccVyucRMQoQGaofS4oP3', true)
    //       if (rs.isValid('query_1hYMMO9ccVyucRMQoQGaofS4oP3')) {
    //         if (res !== null) {
    //           vm.courses = []
    //           vm.student.selectedCourse = null

    //           for (var i = 0; i < res.length; i++) {
    //             // vm.faculties[i].facultyName=res[i].facultyName+'('+res[i].facultyId+')'
    //             // vm.courses.push(res[i].courseId)
    //             // console.log(vm.courses)

    //             vm.courses.push({
    //               courseId: res[i].courseId,
    //               courseName:
    //                 res[i].courseFullName
    //             })
    //             // console.log(vm.courses);
    //           }
    //           // vm.courses = res;
    //         }
    //       } else {
    //         rs.showErrorToast('query_1hYMMO9ccVyucRMQoQGaofS4oP3')
    //       }
    //     })
    // },
    // getYearsByCourseId () {
    //   const vm = this
    //   vm.courseId = vm.student.selectedCourse.courseId
    //   new MQL()
    //     .setActivity('o.[query_1hoKphwNGTUdbgIWnqYqvLmYDc5]')
    //     .setData({ courseId: vm.courseId })
    //     .fetch()
    //     .then((rs) => {
    //       let res = rs.getActivity('query_1hoKphwNGTUdbgIWnqYqvLmYDc5', true)
    //       if (rs.isValid('query_1hoKphwNGTUdbgIWnqYqvLmYDc5')) {
    //         // console.log(res);
    //         if (res !== null) {
    //           vm.years = []
    //           vm.student.selectedYear = null
    //           for (var i = 0; i < res.length; i++) {
    //             // vm.faculties[i].facultyName=res[i].facultyName+'('+res[i].facultyId+')'
    //             // vm.courses.push(res[i].courseId)
    //             // console.log(vm.courses)

    //             vm.years.push({
    //               courseId: res[i].courseId,
    //               coursePart:
    //                 res[i].coursePart + '(' + res[i].coursePattern + ')',
    //               facultyId: res[i].facultyId,
    //               universityId: res[i].universityId,
    //               universityName: res[i].universityName
    //             })
    //             // console.log(vm.years);
    //           }
    //           // vm.years = res;
    //         }
    //       } else {
    //         rs.showErrorToast('query_1hoKphwNGTUdbgIWnqYqvLmYDc5')
    //       }
    //     })
    // },
    getAllCountries () {
      return new Promise((resolve) => {
        const vm = this
        new MQL()
          .setActivity('o.[query_1hXN8iXaXhjrTIlptbNbROS9QX4]')
          // .setData(data)
          .fetch()
          .then((rs) => {
            let res = rs.getActivity('query_1hXN8iXaXhjrTIlptbNbROS9QX4', true)
            if (rs.isValid('query_1hXN8iXaXhjrTIlptbNbROS9QX4')) {
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
              // rs.showErrorToast("query_1hXN8iXaXhjrTIlptbNbROS9QX4")
            }
          })
      })
    },
    getStatesByCountryId () {
      return new Promise((resolve) => {
        const vm = this

        vm.countryId = vm.student.selectedCountry.countryId

        new MQL()
          .setActivity('o.[query_1hXPpl5LCKo5ugXaK2IiK672u7T]')
          .setData({ COUNTRY_ID: vm.countryId })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity('query_1hXPpl5LCKo5ugXaK2IiK672u7T', true)
            if (rs.isValid('query_1hXPpl5LCKo5ugXaK2IiK672u7T')) {
              if (res == null) {
                res = []
              }
              vm.districts = []
              vm.states = res

              //  if (vm.initflag){
              vm.student.selectedState = vm.states.filter(
                (state) => state.STATE_NAME === 'Maharashtra'
              )[0]
              resolve()
            } else {
              rs.showErrorToast('query_1hXPpl5LCKo5ugXaK2IiK672u7T')
            }
          })
      })
    },

    getDistrictsByStateId () {
      return new Promise((resolve) => {
        const vm = this
        // console.log("state code", vm.student.selectedState.STATE_CODE);
        vm.stateId = vm.student.selectedState.STATE_CODE
        // console.log("state id",vm.stateId)
        new MQL()
          .setActivity('o.[query_1hXXvqirnGRWsWCEWt69tl6uqob]')
          .setData({ STATE_ID: vm.stateId })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity('query_1hXXvqirnGRWsWCEWt69tl6uqob', true)
            if (rs.isValid('query_1hXXvqirnGRWsWCEWt69tl6uqob')) {
              if (res == null) {
                res = []
              }
              // console.log("res", res);
              vm.student.selectedDistrict = null
              vm.districts = res
              resolve()
            } else {
              rs.showErrorToast('query_1hXXvqirnGRWsWCEWt69tl6uqob')
            }
          })
      })
    },
    getTalukaByDistrictId () {
      return new Promise((resolve) => {
        const vm = this

        vm.districtId = vm.student.selectedDistrict.DISTRICT_CODE
        // console.log("districtid", vm.districtId);
        new MQL()
          .setActivity('o.[query_1hXrld8qkVavKnU1H1ORYLBLIH2]')
          .setData({ DISTRICTID: vm.districtId })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity('query_1hXrld8qkVavKnU1H1ORYLBLIH2', true)
            if (rs.isValid('query_1hXrld8qkVavKnU1H1ORYLBLIH2')) {
              // console.log("taluka", res);
              vm.talukas = res
            } else {
              rs.showErrorToast('query_1hXrld8qkVavKnU1H1ORYLBLIH2')
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

    getEducationLevelDetails () {
      const vm = this
      new MQL()
        .setActivity('o.[query_1izkwK41LiLPDBuLCsMKiRAX8ww]')
        // .setData(data)
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('query_1izkwK41LiLPDBuLCsMKiRAX8ww', true)
          if (rs.isValid('query_1izkwK41LiLPDBuLCsMKiRAX8ww')) {
            // console.log(res);
            if (res !== null) {
              vm.EducationLevels = []
              vm.EducationLevels = res
              // console.log("education level:",vm.EducationLevels)
              // if (vm.userDetails[0].selectedEducationLevel == null) {
              //   vm.userDetails[0].selectedEducationLevel =
              //     vm.educationLevel[0];
              // }
            }
          } else {
            rs.showErrorToast('query_1izkwK41LiLPDBuLCsMKiRAX8ww')
          }
        })
    },

    getClassDetails () {
      const vm = this
      new MQL()
        .setActivity('o.[query_1izmpnxHPOcMZ21byDZ31RISR5a]')
        // .setData(data)
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('query_1izmpnxHPOcMZ21byDZ31RISR5a', true)
          if (rs.isValid('query_1izmpnxHPOcMZ21byDZ31RISR5a')) {
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
            rs.showErrorToast('query_1izmpnxHPOcMZ21byDZ31RISR5a')
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
      vm.student.dateOfBirth = '2000-01-01 00:00:00'
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

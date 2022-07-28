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
                    minLength="4"
                    maxLength="100"
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
                      :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
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
              <div class="col-md-12 col-lg-4">
                <div class="form-group">
                  <label
                    for="category"
                    class="control-label form-label"
                  >
                    Category
                    <span class="text-danger">*</span>
                  </label>
                  <v-select
                    v-model="basic.category"
                    :placeholder="$t('registration.categoryPlaceholder')"
                    label="displayName"
                    :options="category"
                  />
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.category.required"
                  >
                    {{ $t('registration.vcategory') }}
                  </div>
                </div>
              </div>
              <div class="col-md-12 col-lg-4">
                <div class="form-group">
                  <label
                    for="Mother Tongue"
                    class="control-label form-label"
                  >
                    Mother Tongue
                    <span class="text-danger">*</span>
                  </label>
                  <v-select
                    v-model="basic.motherTongue"
                    :placeholder="$t('registration.motherTonguePlaceholder')"
                    label="displayName"
                    :options="motherTongue"
                  />
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.motherTongue.required"
                  >
                    {{ $t('registration.vmotherTongue') }}
                  </div>
                </div>
              </div>
              <div class="col-md-12 col-lg-4">
                <div class="form-group">
                  <label
                    for="Mother Tongue"
                    class="control-label form-label"
                  >
                    Language Known
                    <span class="text-danger">*</span>
                  </label>
                  <v-select
                    v-model="basic.languageKnown"
                    :placeholder="$t('registration.languageKnownPlaceholder')"
                    label="displayName"
                    :options="motherTongue"
                    multiple
                  />
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.basic.languageKnown.required"
                  >
                    {{ $t('registration.vlanguageKnown') }}
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
          </div>

          <div class="card-form">
            <div class="card-header card-header-alt">
              Address Details
            </div>
            <div class="row">
              <div class="col-md-6 col-lg-4">
                <div class="form-group">
                  <label class="control-label form-label">
                    Address
                    <span class="text-danger">*</span>
                  </label>
                  <textarea
                    class="form-control"
                    v-model.trim="address.address"
                    placeholder="Enter Your Address"
                    id="address"
                    type="textarea"
                    :class="{
                      'is-invalid':
                        submitted && $v.address.address.$invalid
                    }"
                  />
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.address.address.required"
                  >
                    {{ $t('registration.address') }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-4">
                <div class="form-group">
                  <label class="control-label form-label">
                    City/Village/Town
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    class="form-control"
                    v-model.trim="address.city_village_town"
                    placeholder="Enter Your City/Village/Town"
                    id="city_village_town"
                    :class="{
                      'is-invalid':
                        submitted && $v.address.city_village_town.$invalid
                    }"
                  >
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.address.city_village_town.required"
                  >
                    {{ $t('registration.city_village_town') }}
                  </div>
                </div>
              </div>
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
                  <div class="col-md-6 col-lg-4">
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
                  <div class="col-md-6 col-lg-4">
                    <div class="form-group">
                      <label class="control-label form-label">
                        Year Of Passing
                        <span class="text-danger">*</span>
                      </label>
                      <input
                        class="form-control"
                        v-model.trim="qualification.yearOfPassing"
                        oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                        placeholder="Enter Your Year Of Passing"
                        maxlength="4"
                        minlength="4"
                        id="yearOfPassing"
                        :class="{
                          'is-invalid':
                            submitted && $v.qualification.yearOfPassing.$invalid
                        }"
                      >
                      <div
                        class="text-danger"
                        v-if="submitted && !$v.qualification.yearOfPassing.required"
                      >
                        {{ $t('registration.yearOfPassing') }}
                      </div>
                      <div
                        class="text-danger"
                        v-if="submitted && !$v.qualification.yearOfPassing.numeric"
                      >
                        {{ $t('registration.yearOfPassing2') }}
                      </div>
                      <div
                        class="text-danger"
                        v-if="
                          submitted &&
                            (!$v.qualification.yearOfPassing.minLength ||
                            !$v.qualification.yearOfPassing.maxLength)
                        "
                      >
                        {{ $t('registration.yearOfPassing3') }}
                      </div>
                      <div
                        class="text-danger"
                        v-if="
                          submitted &&
                            (!$v.qualification.yearOfPassing.minValue ||
                            !$v.qualification.yearOfPassing.maxValue)
                        "
                      >
                        {{ $t('registration.yearOfPassing4') }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-4">
                    <div class="form-group">
                      <label
                        for="stream"
                        class="control-label form-label"
                      >
                        Stream
                        <span class="text-danger">*</span>
                      </label>
                      <v-select
                        v-model="qualification.stream"
                        label="displayName"
                        placeholder="Select Stream"
                        :options="stream"
                      />
                      <div
                        class="text-danger"
                        v-if="
                          !$v.qualification.stream.required &&
                            $v.qualification.stream.$error
                        "
                      >
                        {{ $t('registration.vstream') }}
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
                Apply
              </button>
            </div>
          </div>
          <!-- <div class="card-form">
            <div class="card-header card-header-alt">
              Other Details
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md">
                    <div class="form-group">
                      <label
                        for="exam"
                        class="control-label form-label"
                      >
                        Select Training Location Preference
                        <span class="text-danger">*</span>
                      </label>
                      <v-select
                        v-model="other.preference"
                        label="location"
                        placeholder="Select Training Location Preference"
                        :options="preferenceOptions"
                      />
                      <div
                        class="text-danger"
                        v-if="
                          !$v.other.preference.required &&
                            $v.other.preference.$error
                        "
                      >
                        {{ $t('registration.vPreferenceError') }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md">
                    <div class="form-group">
                      <label
                        for="exam"
                        class="control-label form-label"
                      >
                        Select Referral
                        <span class="text-danger">*</span>
                      </label>
                      <v-select
                        v-model="other.reference"
                        label="refferal"
                        placeholder="Select Referral"
                        :options="referralOptions"
                      />
                      <div
                        class="text-danger"
                        v-if="
                          !$v.other.reference.required &&
                            $v.other.reference.$error
                        "
                      >
                        {{ $t('registration.vReferralError') }}
                      </div>
                    </div>
                  </div>
                  <div
                    class="col-md"
                    v-show="other.reference.refferal === 'Other'"
                  >
                    <div class="form-group">
                      <label
                        for="exam"
                        class="control-label form-label"
                      >
                        Please Specify
                        <span class="text-danger">*</span>
                      </label>
                      <textarea
                        type="textarea"
                        class="form-control"
                        minLength="5"
                        maxLength="200"
                        v-model.trim="pleaseSpecify"
                        placeholder="Please Specify"
                        ipleaseSpecifyInvalidd="fullName"
                        :class="{
                          'is-invalid': submitted && pleaseSpecifyInvalid
                        }"
                      />
                      <div
                        class="text-danger"
                        v-if="
                          submitted && pleaseSpecifyInvalid
                        "
                      >
                        Text should be between 5 to 200 charachters
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
          </div> -->
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
  minValue,
  maxValue,
  email
} from 'vuelidate/lib/validators'
import Swal from 'sweetalert2'
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
      other: {
        preference: '',
        reference: {
          referral: ''
        }
      },
      maxDate: '',
      minDate: '',
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
      preferenceOptions: [],
      referralOptions: [],
      motherTongue: [],
      category: [],
      stream: [],
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
      pleaseSpecify: '',
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
      address: {
        required
      },
      city_village_town: {
        required
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
      category: {
        required
      },
      fullName: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(100),
        isNameValid: helpers.regex('isNameValid', /^[a-zA-Z ]*$/)
      },
      motherTongue: {
        required
      },
      gender: {
        required
      },
      languageKnown: {
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
      },
      yearOfPassing: {
        required,
        numeric,
        minLength: minLength(4),
        maxLength: maxLength(4),
        minValue: minValue(1990),
        maxValue: maxValue(2022)
      },
      stream: {
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
    // this.getDistrictsByStateId()
    this.getClassDetails()
    this.getPreferences()
    this.getMaxMinDate()
    this.getReferrals()
  },
  methods: {
    changeLanguage (lang) {
      this.$i18n.locale = lang
      this.$i18n.fallbackLocale = lang
      loadLanguageAsync(lang).then(() => {
      })
    },

    validateAge () {
      // this.$store.dispatch('getServerTime').then((res) => {
      // let age = moment(res.result.date).diff(date, 'years', false)

      var dateEntered = this.basic.dateOfBirth
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
      await vm.getPreferences()
      await vm.getCategory()
      await vm.getLanguages()
      await vm.getStream()
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
    getCategory () {
      // Automatically generated
      new MQL()
        .setActivity('o.[query_2CZMBs80F5AGNcbK14MkePeJo8Z]')
        .fetch()
        .then(rs => {
          let res = rs.getActivity('query_2CZMBs80F5AGNcbK14MkePeJo8Z', true)
          if (rs.isValid('query_2CZMBs80F5AGNcbK14MkePeJo8Z')) {
            this.category = res
          } else {
            rs.showErrorToast('query_2CZMBs80F5AGNcbK14MkePeJo8Z')
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
    getStream () {
      // Automatically generated
      new MQL()
        .setActivity('o.[query_2CZU59KPj3t4TvL466OdpGyQvw6]')
        .fetch()
        .then(rs => {
          let res = rs.getActivity('query_2CZU59KPj3t4TvL466OdpGyQvw6', true)
          if (rs.isValid('query_2CZU59KPj3t4TvL466OdpGyQvw6')) {
            this.stream = res
          } else {
            rs.showErrorToast('query_2CZU59KPj3t4TvL466OdpGyQvw6')
          }
        })
    },
    getLanguages () {
      // Automatically generated
      new MQL()
        .setActivity('o.[query_2CZPhRIpGKBepQdkdAzdxAYLMCE]')
        .fetch()
        .then(rs => {
          let res = rs.getActivity('query_2CZPhRIpGKBepQdkdAzdxAYLMCE', true)
          if (rs.isValid('query_2CZPhRIpGKBepQdkdAzdxAYLMCE')) {
            this.motherTongue = res
          } else {
            rs.showErrorToast('query_2CZPhRIpGKBepQdkdAzdxAYLMCE')
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
        sendData.basic.dateOfBirth = this.basic.dateOfBirth
        sendData.basic.motherTongue = this.basic.motherTongue.displayName
        sendData.basic.languageKnown = this.basic.languageKnown.map(el => {
          return el.displayName
        })
        sendData.basic.category = this.basic.category.displayName
        sendData.address = this.address
        sendData.address.district = this.address.district.displayName
        sendData.address.state = this.address.state.displayName
        sendData.basic.gender = this.basic.gender.value
        sendData.basic.category = this.basic.category.displayName
        sendData.qualification = this.qualification
        sendData.qualification.qualificationId = this.qualification.qualificationName.qualificationId
        sendData.qualification.qualificationName = this.qualification.qualificationName.displayName
        sendData.qualification.stream = this.qualification.stream.displayName
        sendData.qualification.yearOfPassing = this.qualification.yearOfPassing
        sendData.contact = this.contact
        sendData.roleName = 'Applicant'
        new MQL()
          .setActivity('o.[RegisterUser]')
          .setData(sendData)
          .fetch()
          .then((rs) => {
            let res = rs.getActivity('RegisterUser', true)
            if (rs.isValid('RegisterUser')) {
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
              rs.showErrorToast('RegisterUser')
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

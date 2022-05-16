<template>
  <section id="login">
    <div class="card-login">
      <div class="row card-wrapper">
        <div class="col login-block">
          <router-link
            to="/login"
            class="btn btn-back"
          >
            Back to Login
          </router-link>
          <div class="logo-wrapper">
            <!-- <div class="logo-title"><span>MKCL</span> Mock Exams</div> -->
            <!-- <img class="img-fluid" src="../../public/assets/images/emblem.png" alt="GOI">
            <img class="img-fluid" src="../../public/assets/images/logo.png" alt="Pune ZP"> -->
            <!-- <h1>MKCL EXAM LIVE</h1> -->
            <img
              class="img-fluid"
              src="../../../public/assets/images/logo_dnext.png"
              alt="MKCL MKCL DNExT"
            >
          </div>
          <div class="card-header">
            Reset Password
          </div>
          <div class="form-wrapper">
            <div class="form-group">
              <label class="sr-only">Mobile Number</label>
              <div class="input-group">
                <input
                  class="form-control"
                  oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                  maxlength="10"
                  minlength="10"
                  placeholder="Enter Your Mobile Number"
                  v-model.trim="$v.otp_d.mobileNumber.$model"
                  id="mobileNumber"
                  :disabled="flag == 1"
                  :class="{
                    'is-invalid':
                      $v.otp_d.mobileNumber.$invalid &&
                      $v.otp_d.mobileNumber.$anyDirty,
                  }"
                >
                <div class="input-group-append">
                  <button
                    class="btn btn-purple"
                    @click="getUsername()"
                    :disabled="sendOtpFlag"
                  >
                    Send OTP
                  </button>
                </div>
              </div>
              <div
                class="text-danger"
                v-if="
                  $v.otp_d.mobileNumber.required &&
                    $v.otp_d.mobileNumber.$anyDirty
                "
              >
                Please Provide Your 10-digits Mobile Number !
              </div>
              <div
                class="text-danger"
                v-if="
                  !$v.otp_d.mobileNumber.numeric &&
                    $v.otp_d.mobileNumber.$anyDirty
                "
              >
                Mobile Number must be numeric !
              </div>
              <div
                class="text-danger"
                v-if="
                  (!$v.otp_d.mobileNumber.minLength ||
                    !$v.otp_d.mobileNumber.maxLength) &&
                    $v.otp_d.mobileNumber.$anyDirty
                "
              >
                Mobile Number must be of 10 digit !
              </div>
            </div>
            <div
              class="form-group"
              v-if="showOtpField == true"
            >
              <label class="sr-only">Enter OTP</label>
              <div class="input-group">
                <input
                  class="form-control"
                  placeholder="Enter OTP"
                  v-model.trim="$v.otp_d.votp.$model"
                  id="votp"
                  :disabled="flag == 1"
                  :class="{
                    'is-invalid': otp_submitted && $v.otp_d.votp.$invalid,
                  }"
                >
                <div class="input-group-append">
                  <button
                    type="button"
                    class="btn btn-success"
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
                OTP is required !
              </div>
            </div>
            <div
              class="box-otp"
              v-if="otp_verified"
            >
              <div class="form-group">
                <label class="sr-only">Password</label>
                <div class="ic-holder">
                  <b-form-input
                    class="form-control"
                    placeholder="Enter New Password"
                    v-model="password"
                    id="password"
                    :type="PasswordInputType"
                    :class="{
                      'is-invalid': submitted && $v.password.$invalid,
                    }"
                  />
                  <i
                    class="mdi mdi-eye"
                    :class="iconChange"
                    @click="passwordVisibility"
                  />
                </div>
                <div
                  class="text-danger"
                  v-if="submitted && !$v.password.required"
                >
                  Please Provide Password!
                </div>
                <div
                  class="text-danger"
                  v-if="submitted && !$v.password.goodPassword"
                >
                  Password Must be at least 8 characters and contain a lowercase
                  character, uppercase character and a number.
                </div>
              </div>
              <div class="form-group">
                <label class="sr-only">Confirm Password</label>
                <div class="ic-holder">
                  <b-form-input
                    class="form-control"
                    placeholder="Confirm New Password"
                    v-model="ConfirmPassword"
                    id="confirmPassword"
                    :type="PasswordInput"
                    :class="{
                      'is-invalid': submitted && $v.ConfirmPassword.$invalid,
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
                  v-if="submitted && !$v.ConfirmPassword.required"
                >
                  Please Provide Confirm Password!
                </div>
              </div>
              <div class="form-group form-action">
                <button
                  class="btn btn-page"
                  :disabled="submitted && $v.ConfirmPassword.$invalid"
                  @click="resetPassword"
                >
                  Reset Password
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
                  >Maharashtra Knowledge Corporation Ltd</a>. (MKCL), Copyright © 2020. All rights reserved.<br>
                  The copyright of eBalbharati duly acknowledged.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Response from '@/plugins/response.js'
import MQL from '@/plugins/mql.js'
import {
  required,
  numeric,
  minLength,
  maxLength,
  sameAs
} from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      otp_d: {
        mobileNumber: ''
      },
      password: '',
      ConfirmPassword: '',
      button: 'Verify OTP',
      flag: 0,
      PasswordInputType: 'password',
      PasswordInput: 'password',
      iconChange: 'mdi mdi-eye',
      iconChangeCnf: 'mdi mdi-eye',
      mobileNumberCopy: 0,
      sendOtpFlag: false,
      showOtpField: false,
      otp_submitted: false,
      otp_verified: false,
      submitted: false
    }
  },
  validations: {
    otp_d: {
      mobileNumber: {
        // required,
        numeric,
        minLength: minLength(10),
        maxLength: maxLength(10)
      },
      votp: { required }
    },

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

    ConfirmPassword: { required, sameAsPassword: sameAs('password') }
  },
  mounted () {
    const vm = this
    if (
      vm.$route.query.for === 'medical-officer' ||
      vm.$route.query.for === 'taluka-health-officer'
    ) {
      vm.otp_verified = true
      vm.mobileNumberCopy = vm.$route.query.userName
      vm.submitted = true
    }
  },
  methods: {
    resetPassword () {
      new MQL()
        .setActivity('o.[ResetPassword]')
        .setData({ userName: this.mobileNumberCopy, password: this.password })
        .fetch()
        .then((rs) => {
          const res = rs.getActivity('ResetPassword', true)
          if (rs.isValid('ResetPassword')) {
            this.$toasted.success('Password reset successfull', {
              theme: 'bubble',
              position: 'top-center',
              duration: 3000
            })
            this.$router.push({ name: 'Login' })
          } else {
            rs.showErrorToast('ResetPassword')
          }
        })
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
    getUsername () {
      this.$v.$touch()
      if (!this.$v.otp_d.mobileNumber.$invalid) {
        const vm = this

        new MQL()
          .setActivity('o.[query_29EhK4BrNROVVe0JbSXDtt1vf2u]')
          .setData({ userName: this.otp_d.mobileNumber })
          .fetch()
          .then((rs) => {
            const res = rs.getActivity(
              'query_29EhK4BrNROVVe0JbSXDtt1vf2u',
              true
            )
            if (rs.isValid('query_29EhK4BrNROVVe0JbSXDtt1vf2u')) {
              if (res != null) {
                vm.getOtp()
              } else {
                this.$toasted.error('Invalid Username', {
                  theme: 'bubble',
                  position: 'top-center',
                  duration: 3000
                })
              }
            } else {
              rs.showErrorToast('query_29EhK4BrNROVVe0JbSXDtt1vf2u')
            }
          })
      }
    },
    getOtp () {
      const vm = this

      new MQL()
        .setActivity('o.[ResetPasswordSendOTP]')
        .setData(this.otp_d)
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('ResetPasswordSendOTP', true)
          if (rs.isValid('ResetPasswordSendOTP')) {
            vm.showOtpField = true
            this.$toasted.success('OTP sent to your phone number', {
              theme: 'bubble',
              position: 'top-center',
              duration: 3000
            })
            this.$toasted.error(
              'Please wait for 30 seconds before resending OTP',
              {
                theme: 'bubble',
                position: 'top-center',
                duration: 3000
              }
            )
            this.sendOtpFlag = true
            setTimeout(function () {
              vm.sendOtpFlag = false
            }, 30000)
          } else {
            rs.showErrorToast('ResetPasswordSendOTP')
          }
        })
    },
    verifyOtp () {
      new MQL()
        .setActivity('o.[ResetPasswordVerifyOTP]')
        .setData({ mobileNumber: this.otp_d.mobileNumber, verifyOTP: this.otp_d.votp })
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('ResetPasswordVerifyOTP', true)
          if (rs.isValid('ResetPasswordVerifyOTP')) {
            if (res.result.verifyOTP === 'OTPFOUND') {
              this.sendOtpFlag = true
              this.submitted = true
              this.flag = 1
              this.otp_verified = true
              this.button = 'Verified'
              this.mobileNumberCopy = this.otp_d.mobileNumber
              setTimeout(function () {
                this.sendOtpFlag = false
              }, 300000)
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
            rs.showErrorToast('ResetPasswordVerifyOTP')
          }
        })
    }
  }
}
</script>

<style lang="scss"></style>

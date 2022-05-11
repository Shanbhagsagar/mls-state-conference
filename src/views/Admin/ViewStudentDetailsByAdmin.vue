<template>
  <section id="login">
    <div class="card-login card-register">
      <div class="row card-wrapper">
          <!-- <div class="col-md-1"></div> -->
        <div class="col login-block">
          <!-- <div class="card-header text-right">
            Update student:{{student.fullName}}
          </div> -->
          
          <div class="card-form">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label class="control-label form-label">
                    Full Name
                    <span class="text-danger">*</span>
                  </label>
                  <input
                  :disabled="true"
                    class="form-control"
                    v-model="student.fullName"
                    id="fullName"
                    :class="{
                      'is-invalid': submitted && $v.student.fullName.$invalid,
                    }"
                  >
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.student.fullName.required"
                  >
                    Please Provide Your Name !
                  </div>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.student.fullName.isNameValid"
                  >
                    Name only contain letters. Numbers not allowed !
                  </div>
                </div>
              </div>
            
                                <div class="col-md-4 ">
                <div class="form-group">
                  <label for="gender" class="control-label form-label">
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
                  :disabled="true"
                    v-model="student.gender"
                    placeholder="Select The Gender"
                    label="value"
                    
                    
                  ></v-select>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.student.gender.required"
                  >Please select Gender !</div>
                </div>
              </div>
                          <div class="col-md-4">
                    <div class="form-group">
                      <label
                        for="dob"
                        class="control-label form-label"
                      >
                        Date Of Birth
                        <span class="text-danger">*</span>
                      </label>
                      <div class="fp-holder">
                        <flat-pickr
                        :disabled="true"
                          placeholder="MM / DD / YYYY"
                          id="dateOfBirth"
                          v-model="student.dateOfBirth"
                          :config="commonDateConfig"
                          class="form-control form-control-sm"
                          name="date"
                          :class="{
                            'is-invalid':
                              submitted && $v.student.dateOfBirth.$invalid,
                          }"
                        />
                        <i class="mdi mdi-calendar" />
                      </div>
                    </div>
                  </div>     
    

             
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="control-label form-label">
                        Mobile Number
                        <span class="text-danger">*</span>
                      </label>
                      <div class="input-group">
                        <input
                        :disabled="true"
                          class="form-control"
                          v-model="student.mobileNumber"
                          id="mobileNumber"
                          :class="{
                            'is-invalid':
                              submitted && $v.student.mobileNumber.$invalid,
                          }"
                        >
                      </div>
                      <div
                        class="text-danger"
                        v-if="submitted && !$v.student.mobileNumber.required"
                      >
                        Please Provide Your 10-digits Mobile Number !
                      </div>
                      <div
                        class="text-danger"
                        v-if="submitted && !$v.student.mobileNumber.numeric"
                      >
                        Mobile Number must be numeric !
                      </div>
                      <div
                        class="text-danger"
                        v-if="
                          submitted &&
                            (!$v.student.mobileNumber.minLength ||
                            !$v.student.mobileNumber.maxLength)
                        "
                      >
                        Mobile Number must be of 10 digit !
                      </div>
                    </div>
                  </div>
    
            
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="control-label form-label">Email ID</label>
                       <span class="text-danger">*</span>
                      <input
                      :disabled="true"
                        type="email"
                        class="form-control"
                        v-model="student.emailID"
                        id="emailID"
                        :class="{
                          'is-invalid': submitted && $v.student.emailID.$invalid,
                        }"
                      >
                      <div
                        class="text-danger"
                        v-if="submitted && !$v.student.emailID.email"
                      >
                        Please provide valid email
                      </div>
                    </div>
                  </div>
          <div class="col-md-6 col-lg-3">
                <div class="form-group">
                  <label for="states" class="control-label form-label">State</label>
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
                  :disabled="true"
                    v-model="student.selectedState"
                    label="STATE_NAME"
                    placeholder="Select The State"
                   
                    :value="student.state"
                  
                  ></v-select>
                  <div
                    class="text-danger"
                    v-if="
                      !$v.student.selectedState.required &&
                        $v.student.selectedState.$error
                    "
                  >Please Select State</div>
                </div>
              </div>
                    <div class="col-md-6 col-lg-3">
                <div class="form-group">
                  <label for="districts" class="control-label form-label">
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
                    :disabled="true"
                    v-model="student.selectedDistrict"
                    label="DISTRICT_NAME"
                    placeholder="Select The District"
                    
                    :value="student.selectedDistrict"
                  ></v-select>
                  <div
                    class="text-danger"
                    v-if="
                      !$v.student.selectedDistrict.required &&
                        $v.student.selectedDistrict.$error
                    "
                  >Please Select District</div>
                </div>
              </div>
                  <div class="col-md-6"></div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="exam" class="control-label form-label">
                    University
                    <span class="text-danger">*</span>
                  </label>
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
                  <v-select
                    v-model="student.selectedUniversity"
                    label="universityName"
                    placeholder="Select The University"
                    :disabled="true"
                    :value="student.selectedUniversity"
                  
                  ></v-select>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.student.selectedUniversity.required"
                  >Please select University Name !</div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="exam" class="control-label form-label">
                    Faculty
                    <span class="text-danger">*</span>
                  </label>
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
                  <v-select
                    :disabled="true"
                    v-model="student.selectedFaculty"
                    label="facultyName"
                    placeholder="Select The Faculty"
                    
                    :value="student.selectedFaculty"
                    
                  ></v-select>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.student.selectedFaculty.required"
                  >Please select Faculty Name !</div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="exam" class="control-label form-label">
                    Course Name
                    <span class="text-danger">*</span>
                  </label>
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
                  <v-select
                    :disabled="true"
                    v-model="student.selectedCourse"
                    placeholder="Select The Course"
                    label="courseFullName"
                  
                    :value="student.selectedCourse"
                  ></v-select>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.student.selectedCourse.required"
                  >Please select Course Name !</div>
                </div>
              </div>
              <!-- <div class="col-md-6">
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
                    :disabled="true"
                    v-model="student.selectedYear"
                    placeholder="Select The Year"
                    label="value"
                    
                    :value="student.selectedYear"
                  ></v-select>
                  <div
                    class="text-danger"
                    v-if="submitted && !$v.student.selectedYear.required"
                  >Please select Year !</div>
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
      
            </div>
            <div class="form-action text-center">
              <button
                type="button"
                class="btn btn-info  mt-2"
                @click="goBack()"
              >
                Go Back
              </button>
            </div>
          </div>
          <div class="help-wrapper">
            <div class="copyright-holder">
              <img src="../../../public/assets/images/logo_mkcl.svg">
              <div class="copyright">
                Powered by
                <a
                  href="https://www.mkcl.org"
                  target="_blank"
                >Maharashtra Knowledge Corporation Ltd</a>. (MKCL) as Knowledge Partner and Solution Architect, Copyright
                © 2020. All rights reserved by MKCL.
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
import 'flatpickr/dist/flatpickr.css'
import Toasted from 'vue-toasted'
import {
  required,
  numeric,
  minLength,
  maxLength,
  helpers,
  email
} from 'vuelidate/lib/validators'
import flatPickr from 'vue-flatpickr-component'
export default {
      components: {
    flatPickr
  },
    data(){
        return{ 
            submitted: false,
                  commonDateConfig: {
        dateFormat: 'd-M-Y'
      },
            student:{mobileNumber:""},
                  gender: [
        // { value: null, text: 'Please select gender' },
        { value: 'Male', text: 'Male' },
        { value: 'Female', text: 'Female' },
        { value: 'Other', text: 'Other' }
      ],
        }
    },
      validations: {
    student: {
        selectedState:{
            required
        },
        selectedDistrict:{
            required
        },
        selectedUniversity:{
            required
        },
        selectedFaculty:{
            required
        },
        selectedCourse:{
            required
        },
        selectedYear:{
            required
        },
      emailID: {
        email,
        required
      },
      locality: {
        required,
        isNameValid: helpers.regex('isNameValid', /^[a-zA-Z ]*$/)
      },
      fullName: {
        required,
        isNameValid: helpers.regex('isNameValid', /^[a-zA-Z ]*$/)
      },

      dateOfBirth: {
        required
      },
      gender: {
        required
      },
 

      mobileNumber: {
        required,
        numeric,
        minLength: minLength(10),
        maxLength: maxLength(10)
      }
    }
  },
    methods:{
        goBack(){
            const vm=this
            vm.$router.push({name:'ViewAllStudentDetails'})
        },
    //     Updatestudent(){
    //   const vm = this
    //   delete vm.student._id
    //   vm.submitted = true
    //    vm.$v.$touch()
    //    if(!vm.$v.$invalid){
    //         new MQL()
    //        .setActivity("o.[Updatestudent]")
    //        .setData(vm.student)
    //        .fetch()
    //         .then(rs => {
    //        let res = rs.getActivity("Updatestudent",true)
    //        if (rs.isValid("Updatestudent")) {
    //                          vm.$toasted.success('student Updated Successfully', {
    //             theme: 'bubble',
    //             position: 'top-center',
    //             duration: 3000
    //           })
    //           vm.$router.push({name:'ViewstudentByAdmin'})
    //           //  console.log(vm.student)
    //           //  console.log('updated')
    //        } else
    //         { 
    //        rs.showErrorToast("Updatestudent")
    //        }
    //        })
    //    }
    //     },
        getStudentByMobileNumber(){
            const vm=this
            
            new MQL()
            .setActivity("o.[query_1hXeD5LAD87jShqFLFLkXaXzBYk]")
            .setData({mobileNumber:vm.student.mobileNumber})
            .fetch()
             .then(rs => {
            let res = rs.getActivity("query_1hXeD5LAD87jShqFLFLkXaXzBYk",true)
            if (rs.isValid("query_1hXeD5LAD87jShqFLFLkXaXzBYk")) {
                // console.log('student',res)
                
                vm.student=res[0]
            } else
             { 
            rs.showErrorToast("query_1hXeD5LAD87jShqFLFLkXaXzBYk")
            }
            })
        }
    },
    mounted(){
        const vm=this
        vm.student.mobileNumber=vm.$route.params.mobileNumber
        // console.log(vm.student)
        vm.getStudentByMobileNumber()
    }
}
</script>
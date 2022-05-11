<template>
  <div>
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col-sm">
          <h3 class="title ml-3"> {{ $t('examConfiguration.heading')}} </h3>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="panel panel-default">
        <div class="panel-body">
          <!-- <div class="panel-header">
            Educational Details
          </div> -->
          <!-- form start -->
          <div class="card-form">
            <div class="row">
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="exam" class="control-label form-label">
                        {{ $t('examConfiguration.selectMockExamCategory')}}  <span class="text-danger">*</span>
                      </label>
                      <v-select
                        v-model="paperConfiguration.mockExamCategory"
                        label="categoryName" 
                        :placeholder=" $t('examConfiguration.selectMockExamCategory') "
                        :options="mockExamCategories"
                        :item-value="mockExamCategories"
                        @input="getEducationLevelDetails()"
                      />
                      <div
                        class="text-danger"
                          v-if="
                          !$v.paperConfiguration.mockExamCategory.required &&
                            $v.paperConfiguration.mockExamCategory.$error
                        "
                      >
                         {{ $t('examConfiguration.validation.mockExam')}}
                      </div>
                    </div>
                  </div>
                  <!-- education level -->
                  <div
                    class="col-md-6"
                    v-if="paperConfiguration && paperConfiguration.mockExamCategory && paperConfiguration.mockExamCategory.categoryName == 'Academic'"
                  >
                    <div class="form-group">
                      <label for="exam" class="control-label form-label">
                        {{$t('examConfiguration.educationLevel')}}
                      </label>
                      <v-select
                        v-model="paperConfiguration.educationLevel"
                        label="levelName"
                        :placeholder=" $t('examConfiguration.educationLevelPlaceholder') "
                        :options="EducationLevels"
                        @input="getClassDetails(); getAllUniversities();"
                        
                      />
                      <div
                        class="text-danger"
                          v-if="
                          !$v.paperConfiguration.educationLevel.required &&
                            $v.paperConfiguration.educationLevel.$error
                        "
                      >
                       {{$t('examConfiguration.validation.educationLevel')}}
                      </div>
                    </div>
                  </div>
                  <!-- education level end -->

                  <!-- medium -->
                  <div class="col-md-6"  v-if="
                    paperConfiguration.educationLevel &&
                      paperConfiguration.educationLevel.levelName === 'Schooling' && paperConfiguration.mockExamCategory.categoryName !== 'Competitive'
                  ">
                    <div class="form-group">
                      <label for="exam" class="control-label form-label">
                        {{$t('examConfiguration.medium')}}</label
                      >
                      <v-select
                        v-model="paperConfiguration.medium"
                        label="mediumName"
                        :placeholder=" $t('examConfiguration.mediumPlaceholder') "
                        :options="medium"
                        value="Medium"
                      />
                      <div
                        class="text-danger"
                          v-if="
                          !$v.paperConfiguration.medium.required &&
                            $v.paperConfiguration.medium.$error
                        "
                      >
                       {{$t('examConfiguration.validation.medium')}}
                      </div>
                    </div>
                    <!-- {{paperConfiguration.medium}} -->
                  </div>
                  <!-- medium end -->

                  <!-- Class Details for School -->
                  <div
                    class="col-md-6"
                    v-if="
                      paperConfiguration.educationLevel &&
                        paperConfiguration.educationLevel.levelName === 'Schooling' && paperConfiguration.mockExamCategory.categoryName !== 'Competitive'
                    "
                  >
                    <div class="form-group">
                      <label for="exam" class="control-label form-label">
                        {{$t('examConfiguration.standard')}}</label
                      >
                      <v-select
                        v-model="paperConfiguration.class"
                        label="className"
                        :placeholder=" $t('examConfiguration.standardPlaceholder') "
                        :options="Class"
                        :value="Class"
                        @input="getSchoolPaperDetails()"
                      />
                      <div
                        class="text-danger"
                          v-if="
                          !$v.paperConfiguration.class.required &&
                            $v.paperConfiguration.class.$error
                        "
                      >
                         {{$t('examConfiguration.validation.standard')}}
                      </div>
                    </div>
                  </div>
                  <!-- {{paperConfiguration}} -->
                  <!-- Class Details end -->

                  <div class="col-md-12" v-if="paperConfiguration && paperConfiguration.mockExamCategory && paperConfiguration.mockExamCategory.categoryName !== 'Competitive'">
                    <div class="row">
                      <!-- unversity -->
                      <div class="col-md-12" v-if="
                        paperConfiguration.educationLevel &&
                          (paperConfiguration.educationLevel.levelName === 'Graduation' ||  paperConfiguration.educationLevel.levelName ==='Under Graduation')
                      ">
                        <div class="form-group">
                          <label for="universityName" class="control-label form-label">
                            {{$t('examConfiguration.universityName')}}</label
                          >
                          <v-select
                            v-model="paperConfiguration.university"
                            label="universityName"
                            :placeholder=" $t('examConfiguration.universityNamePlaceholder') "
                            :options="Universities"
                            :value="Universities"
                            @input="
                              getFacultiesByUniversityId();"
                            
                          />
                          <div
                            class="text-danger"
                              v-if="
                              !$v.paperConfiguration.university.required &&
                                $v.paperConfiguration.university.$error
                            "
                          >
                           {{$t('examConfiguration.validation.universityName')}}
                          </div>
                        </div>
                      </div>
                      <!-- unversity end -->
                    
                      <!-- faculty  -->
                      <div class="col-md-6" v-if="
                        paperConfiguration.educationLevel &&
                        (paperConfiguration.educationLevel.levelName === 'Graduation' ||  paperConfiguration.educationLevel.levelName ==='Under Graduation')
                      ">
                        <div class="form-group">
                          <label for="exam" class="control-label form-label">
                            {{$t('examConfiguration.faculty')}}</label
                          >
                          <v-select
                            v-model="paperConfiguration.faculty"
                            label="facultyName"
                            :placeholder=" $t('examConfiguration.facultyPlaceholder') "
                            :options="Faculties"
                            :value="Faculties"
                            @input="
                              getCoursesByFacultyId();
                              
                            "
                          />
                          <div
                            class="text-danger"
                              v-if="
                              !$v.paperConfiguration.faculty.required &&
                                $v.paperConfiguration.faculty.$error
                            "
                          >
                            {{$t('examConfiguration.validation.faculty')}}
                          </div>
                        </div>
                      </div>
                      <!-- faculty end -->

                      <!-- course -->
                      <div class="col-md-6" v-if="
                        paperConfiguration.educationLevel &&
                        (paperConfiguration.educationLevel.levelName === 'Graduation' ||  paperConfiguration.educationLevel.levelName ==='Under Graduation')
                      ">
                        <div class="form-group">
                          <label for="exam" class="control-label form-label">
                             {{$t('examConfiguration.course')}}</label
                          >
                          <v-select
                            v-model="paperConfiguration.course"
                            label="courseName"
                            :placeholder=" $t('examConfiguration.coursePlaceholder') "
                            :options="Courses"
                            :value="Courses"
                            @input="
                              getPaperDetails();   
                            "
                          />
                          <div
                            class="text-danger"
                              v-if="
                              !$v.paperConfiguration.course.required &&
                                $v.paperConfiguration.course.$error
                            "
                          >
                           {{$t('examConfiguration.validation.course')}}
                          </div>
                        </div>
                      </div>
                      <!--  course end-->
                    </div>
                  <!-- all div for hide competetiv -->
                  </div>

                  <!-- paper -->
                  <div class="col-md-12" >
                    <div class="form-group">
                      <label for="exam" class="control-label form-label">
                       {{$t('examConfiguration.paper')}}</label
                      >
                      <v-select
                        v-model="paperConfiguration.paper"
                        label="paperName"
                        :placeholder=" $t('examConfiguration.paperPlaceholder') "
                        :options="PaperDetails"
                        :value="PaperDetails"
                        
                      />
                      <div
                        class="text-danger"
                          v-if="
                          !$v.paperConfiguration.paper.required &&
                            $v.paperConfiguration.paper.$error
                        "
                      >
                       {{$t('examConfiguration.validation.paper')}}
                      </div>
                    </div>
                  </div>
                  <!-- select paper -->
                  <!-- {{paperConfiguration.paper}} -->
                </div>

                <!-- comman  for all  -->
                <div class="row">
                  <!-- exam venue code  -->
                  <div class="col-md-12">
                    <div class="form-group">
                      <label class="control-label form-label">
                         {{$t('examConfiguration.examVenueCode')}}
                      </label>
                      <b-form-input
                        class="form-control"
                        v-model="paperConfiguration.examVenueCode"
                        :placeholder=" $t('examConfiguration.examVenueCodePlaceholder') "
                      />
                      <div
                        class="text-danger"
                          v-if="
                          !$v.paperConfiguration.examVenueCode.required &&
                            $v.paperConfiguration.examVenueCode.$error
                        "
                      >
                        {{$t('examConfiguration.validation.examVenueCode')}}
                      </div>
                    </div>
                  </div>
                  <!-- exam venue code end -->

                  <!-- exam event id  -->
                  <div class="col-md-4">
                    <div class="form-group">
                      <label class="control-label form-label">
                        {{$t('examConfiguration.examEventId')}}
                      </label>
                      <b-form-input
                        class="form-control"
                        v-model="paperConfiguration.examEventId"
                        :placeholder=" $t('examConfiguration.examEventIdPlaceholder') "
                      />
                      <div
                        class="text-danger"
                          v-if="
                          !$v.paperConfiguration.examEventId.required &&
                            $v.paperConfiguration.examEventId.$error
                        "
                      >
                         {{$t('examConfiguration.validation.examEventId1')}}
                      </div>
                      <div
                        class="text-danger"
                          v-if="
                            !$v.paperConfiguration.examEventId.numeric &&
                            $v.paperConfiguration.examEventId.$error
                        "
                      >
                         {{$t('examConfiguration.validation.examEventId2')}}
                      </div>
                    </div>
                  </div>
                  <!-- exam event id end -->

                  <!-- exam EPIid code  -->
                  <div class="col-md-4">
                    <div class="form-group">
                      <label class="control-label form-label">
                        {{$t('examConfiguration.epiId')}}
                      </label>
                      <b-form-input
                        class="form-control"
                        v-model="paperConfiguration.epID"
                        :placeholder=" $t('examConfiguration.epiIdPlaceholder') "
                      />
                      <div
                        class="text-danger"
                          v-if="
                          !$v.paperConfiguration.epID.required &&
                            $v.paperConfiguration.epID.$error
                        "
                      >
                       {{$t('examConfiguration.validation.epiId1')}}
                      </div>
                      <div
                        class="text-danger"
                          v-if="
                            !$v.paperConfiguration.epID.numeric &&
                            $v.paperConfiguration.epID.$error
                        "
                      >
                           {{$t('examConfiguration.validation.epiId2')}}
                      </div>
                    </div>
                  </div>
                  <!-- exam EPI id code end -->

                  <!-- Pid    -->
                  <div class="col-md-4">
                    <div class="form-group">
                      <label class="control-label form-label">
                       {{$t('examConfiguration.pId')}}
                      </label>
                      <b-form-input
                        class="form-control"
                        v-model="paperConfiguration.pID"
                        :placeholder=" $t('examConfiguration.pIdPlaceholder') "
                      />
                      <div
                        class="text-danger"
                          v-if="
                          !$v.paperConfiguration.pID.required &&
                            $v.paperConfiguration.pID.$error
                        "
                      >
                         {{$t('examConfiguration.validation.pId1')}}
                      </div>
                      <div
                        class="text-danger"
                          v-if="
                            !$v.paperConfiguration.pID.numeric &&
                            $v.paperConfiguration.pID.$error
                        "
                      >
                        {{$t('examConfiguration.validation.pId2')}}
                      </div>
                    </div>
                  </div>
                  <!-- Pid  end -->

                  <!-- Total Marks    -->
                  <div class="col-md-4">
                    <div class="form-group">
                      <label class="control-label form-label">
                        {{$t('examConfiguration.paperTotalMark')}}
                      </label>
                      <b-form-input
                        class="form-control"
                        v-model="paperConfiguration.paperTotalMarks"
                        :placeholder=" $t('examConfiguration.papertotalMarkPlaceholder') "
                      />
                      <div
                        class="text-danger"
                          v-if="
                          !$v.paperConfiguration.paperTotalMarks.required &&
                            $v.paperConfiguration.paperTotalMarks.$error
                        "
                      >
                        {{$t('examConfiguration.validation.paperTotalMark1')}}
                      </div>
                      <div
                        class="text-danger"
                          v-if="
                            !$v.paperConfiguration.paperTotalMarks.numeric &&
                            $v.paperConfiguration.paperTotalMarks.$error
                        "
                      >
                       {{$t('examConfiguration.validation.paperTotalMark2')}}
                      </div>
                    </div>
                  </div>
                  <!-- Total Marks  end -->

                  <!-- Min Marks    -->
                  <div class="col-md-4">
                    <div class="form-group">
                      <label class="control-label form-label">
                           {{$t('examConfiguration.minMark')}}
                      </label>
                      <b-form-input
                        class="form-control"
                        v-model="paperConfiguration.minMarks"
                        :placeholder=" $t('examConfiguration.minMarkPlaceholder') "
                      />
                      <div
                        class="text-danger"
                          v-if="
                          !$v.paperConfiguration.minMarks.required &&
                            $v.paperConfiguration.minMarks.$error
                        "
                      >
                       {{$t('examConfiguration.validation.minMark1')}}
                      </div>
                      <div
                        class="text-danger"
                          v-if="
                            !$v.paperConfiguration.minMarks.numeric &&
                            $v.paperConfiguration.minMarks.$error
                        "
                      >
                       {{$t('examConfiguration.validation.minMark2')}}
                      </div>
                    </div>
                  </div>
                  <!-- Min Marks  end -->

                  <!-- Duration    -->
                  <div class="col-md-4">
                    <div class="form-group">
                      <label class="control-label form-label">
                         {{$t('examConfiguration.paperDuration')}}
                      </label>
                      <b-form-input
                        class="form-control"
                        v-model="paperConfiguration.paperDuration"
                        :placeholder=" $t('examConfiguration.paperDurationPlaceholder') "
                      />  
                      <div
                        class="text-danger"
                          v-if="
                          !$v.paperConfiguration.paperDuration.required &&
                            $v.paperConfiguration.paperDuration.$error
                        "
                      >
                        {{$t('examConfiguration.validation.paperDuration1')}}
                      </div>
                      <div
                        class="text-danger"
                          v-if="
                            !$v.paperConfiguration.paperDuration.numeric &&
                            $v.paperConfiguration.paperDuration.$error
                        "
                      >
                            {{$t('examConfiguration.validation.paperDuration2')}}
                      </div>
                    </div>
                  </div>
                  <!-- Duration  end -->

                  <div class="col-md-12">
                    <div class="row">
                      <!-- isFreeOfCost -->
                      <div class="col-md-6">
                        <div class="form-group">
                          <label class="control-label form-label">
                            {{$t('examConfiguration.paperCost')}}
                          </label>
                          <div class="holder">
                            <div class="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                id="customRadioInline1"
                                class="custom-control-input"
                                name="isFreeOfCostYes"
                                :value="true"
                                v-model="paperConfiguration.isFreeOfCost"
                              >
                              <label
                                class="custom-control-label"
                                for="customRadioInline1"
                              >{{$t('examConfiguration.yes')}}</label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                id="customRadioInline2"
                                class="custom-control-input"
                                name="isFreeOfCostNo"
                                :value="false"
                                v-model="paperConfiguration.isFreeOfCost"
                              >
                              <label
                                class="custom-control-label"
                                for="customRadioInline2"
                              >{{$t('examConfiguration.no')}}</label>
                            </div>
                          </div>
                          <div
                            class="text-danger"
                              v-if="
                              !$v.paperConfiguration.isFreeOfCost.required &&
                                $v.paperConfiguration.isFreeOfCost.$error
                            "
                          >
                           {{$t('examConfiguration.validation.paperCost')}}
                          </div>
                        </div>
                      </div>
                        
                      <!-- free attempt -->
                      <div class="col-md-6" v-if="paperConfiguration.isFreeOfCost === true">
                        <div class="form-group">
                          <label class="control-label form-label">
                            {{$t('examConfiguration.freeAttempt')}}
                          </label>
                          <b-form-input
                            class="form-control"
                            v-model="paperConfiguration.freeAttempt"
                            :placeholder=" $t('examConfiguration.freeAttemptPlaceholder') "
                          />
                          <div
                            class="text-danger"
                              v-if="
                              !$v.paperConfiguration.freeAttempt.required &&
                                $v.paperConfiguration.freeAttempt.$error
                            "
                          >
                           {{$t('examConfiguration.validation.freeAttempt1')}}
                          </div>
                          <div
                            class="text-danger"
                              v-if="
                                !$v.paperConfiguration.freeAttempt.numeric &&
                                $v.paperConfiguration.freeAttempt.$error
                            "
                          >
                             {{$t('examConfiguration.validation.freeAttempt2')}}
                          </div>
                        </div>
                      </div>
                      <!-- free attempt end -->
                      
                      <!--total amunt -->
                      <div class="col-md-6" v-if="paperConfiguration.isFreeOfCost === false">
                        <div class="form-group">
                          <label class="control-label form-label">
                            {{$t('examConfiguration.perAttemptAmount')}}
                          </label>
                          <b-form-input
                            class="form-control"
                            v-model="paperConfiguration.perAttemptAmount"
                             :placeholder=" $t('examConfiguration.perAttemptAmountPlaceholder') "
                          />  
                          <div
                            class="text-danger"
                              v-if="
                              !$v.paperConfiguration.perAttemptAmount.required &&
                                $v.paperConfiguration.perAttemptAmount.$error
                            "
                          >
                           {{$t('examConfiguration.validation.perAttemptAmount1')}}
                          </div>
                          <div
                            class="text-danger"
                              v-if="
                                !$v.paperConfiguration.perAttemptAmount.numeric &&
                                $v.paperConfiguration.perAttemptAmount.$error
                            "
                          >
                             {{$t('examConfiguration.validation.perAttemptAmount2')}}
                          </div>
                        </div>
                      </div>
                      <!--total amunt end -->

                    </div>
                  </div>

                  <!-- from date -->
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="control-label form-label">
                        {{$t('examConfiguration.fromDate')}} :
                      </label>
                      <div class="fp-holder">
                        <date-picker
                          :input-class="{
                            'form-control': 'form-control',
                          }"
                          v-model="paperConfiguration.fromDate"
                          type="datetime"
                          value-type="YYYY-MM-DD hh:mm:ss a"
                          format="YYYY-MM-DD hh:mm:ss a"
                          :disabled-date="notBeforeToday"
                        />
                      </div>
                      <!-- {{paperConfiguration.fromDate}} -->
                      <div
                        class="text-danger"
                          v-if="
                          !$v.paperConfiguration.fromDate.required &&
                            $v.paperConfiguration.fromDate.$error
                        "
                      >
                        {{$t('examConfiguration.validation.fromDate')}}
                      </div>
                    </div>
                  </div>
                  <!-- from date end -->

                  <!-- to date -->
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="control-label form-label">
                        {{$t('examConfiguration.toDate')}}:
                      </label>
                      <div class="fp-holder">
                        <date-picker
                          v-model="paperConfiguration.toDate"
                          type="datetime"
                          value-type="YYYY-MM-DD hh:mm:ss a"
                          format="YYYY-MM-DD hh:mm:ss a"
                          :input-class="{
                            'form-control': 'form-control',
                          }"
                          :disabled-date="notBeforeFromDate"
                        />
                      </div>
                      <div
                        class="text-danger"
                          v-if="
                          !$v.paperConfiguration.toDate.required &&
                            $v.paperConfiguration.toDate.$error
                        "
                      >
                         {{$t('examConfiguration.validation.toDate')}}
                      </div>
                    </div>
                  </div>
                  <!-- to date end -->

                  <!-- is enable -->
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="control-label form-label">
                        {{$t('examConfiguration.isEnable')}}
                      </label>
                      <div class="holder">
                        <div class="custom-control custom-radio custom-control-inline">
                          <input
                            type="radio"
                            id="isEnabledYes"
                            class="custom-control-input"
                            name="isEnabledYes"
                            :value="true"
                            v-model="paperConfiguration.isEnabled"
                          >
                          <label
                            class="custom-control-label"
                            for="isEnabledYes"
                          >{{$t('examConfiguration.yes')}}</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                          <input
                            type="radio"
                            id="isEnabledNo"
                            class="custom-control-input"
                            name="isEnabledNo"
                            :value="false"
                            v-model="paperConfiguration.isEnabled"
                          >
                          <label
                            class="custom-control-label"
                            for="isEnabledNo"
                          >{{$t('examConfiguration.no')}}</label>
                        </div>
                      </div>
                      <div
                        class="text-danger"
                          v-if="
                          !$v.paperConfiguration.isEnabled.required &&
                            $v.paperConfiguration.isEnabled.$error
                        "
                      >
                       {{$t('examConfiguration.validation.isEnable')}}
                      </div>
                    </div>
                  </div>
                  <!-- is enamble end  -->
                </div>
                
              </div>
            </div>
          </div>
          <!-- form end -->
          <!-- submit button -->
          <div class="form-action">
            <button class="btn btn-purple"
              @click="submit()"
            >
              {{$t('examConfiguration.submit')}}
            </button>
          </div>
          <!-- submit button end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Response from "@/plugins/response.js";
import MQL from "@/plugins/mql.js";
import "flatpickr/dist/flatpickr.css";
// import Datepicker from "vuejs-datepicker";
// import VueTimepicker from "vue2-timepicker";
// import "vue2-timepicker/dist/VueTimepicker.css";
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import Toasted from "vue-toasted";
import {
  required,
  numeric,
  minLength,
  maxLength,
  helpers,
  email,
  requiredIf
} from "vuelidate/lib/validators";
import flatPickr from "vue-flatpickr-component";
export default {
  data() {
    return {
      disabledBefore:"",
     paperConfiguration:{},
     EducationLevels:[],
     Class:[],
     Universities: [],
     Faculties:[],
     Courses:[],
     PaperDetails:[],
     defaultPaper: [
        {
          _id: "5f62022e7daab01ef9a1128b",
          paperName: "Online Mock Exam",
          totalItems: "25",
          paperTotalMarks: "20",
          minimumPassingMarks: "",
          paperDuration: "30 min",
          paperId: "1478",
          paperCode: "OnlineMock Exam",
          paperAbbreviation: "OnlineMock Exam",
          isEnabled: true,
          candidateExamDetails: {
            mockExamDetails: {
              ptm: "",
              m: "",
            },
            isOESMockExamDataReceived: false,
          },
        },
      ],
    mockExamCategories: [
       {"categoryId" : 1, 
       "categoryName" : "Academic",
       },
       {"categoryId" : 2, 
       "categoryName" : "Competitive",
       }
      ],
      medium:[
           {"mediumId":1,
        "mediumName":"English"},
        {"mediumId":2,
        "mediumName":"Hindi"},
        {"mediumId":3,
        "mediumName":"Marathi"}
      ],
      fetchPaperForSchool:{},
      getPaperForGrduation:{}
    };
  },
  components: {
    DatePicker
  },
  validations: {
   paperConfiguration:{
     mockExamCategory:{
       required,
     },
     medium:{
         required: requiredIf(function() {
          // alert("medium")
          return this.paperConfiguration.educationLevel && this.paperConfiguration.educationLevel.levelName === 'Schooling'
        }),
     },
     educationLevel:{
        required: requiredIf(function() {
          // alert("educationLevel")
          return this.paperConfiguration.mockExamCategory && this.paperConfiguration.mockExamCategory.categoryName == 'Academic';
        }),
     },
     class:{
       required: requiredIf(function() {
          // alert("Class")
          return  this.paperConfiguration.educationLevel && this.paperConfiguration.educationLevel.levelName === 'Schooling'
        }),
     },
     university:{
       required: requiredIf(function() {
          // alert("university")
          return this.paperConfiguration.educationLevel && (this.paperConfiguration.educationLevel.levelName === 'Graduation' ||  this.paperConfiguration.educationLevel.levelName ==='Under Graduation')
        }),
     },
      faculty:{
       required: requiredIf(function() {
          // alert("university")
          return this.paperConfiguration.educationLevel && (this.paperConfiguration.educationLevel.levelName === 'Graduation' ||  this.paperConfiguration.educationLevel.levelName ==='Under Graduation')
        }),
     },
      course:{
       required: requiredIf(function() {
          // alert("university")
          return this.paperConfiguration.educationLevel && (this.paperConfiguration.educationLevel.levelName === 'Graduation' ||  this.paperConfiguration.educationLevel.levelName ==='Under Graduation')
        }),
     },
      paper:{
      
       required,
     },
     examVenueCode:{
       required
     },
     examEventId:{
       
        numeric,
         required,
     },
      epID:{
       
        numeric,
         required,
     },
     pID:{
       numeric,
         required,
     },
      pID:{
       numeric,
         required,
     },
     paperTotalMarks:{
       numeric,
         required,
     },
     minMarks:{
        numeric,
         required,
     },
     paperDuration:{
       numeric,
         required,
     },
     isFreeOfCost:{
       required
     },
     freeAttempt:{
       required: requiredIf(function() {
          // alert("university")
          return this.paperConfiguration.isFreeOfCost === true
        }),
        numeric
        
     },
     perAttemptAmount:{
        required: requiredIf(function() {
          // alert("university")
          return this.paperConfiguration.isFreeOfCost === false
        }),
        numeric
     },
     fromDate:{
       required
     },
     toDate:{
       required
     },
     isEnabled:{
       required

     }
     }
  },
  created() {
 
  },
  methods: {
    submit(){
        const vm = this;
        vm.$v.$touch();
        if (!vm.$v.$invalid) {
          // alert("submit")
          console.log(this.paperConfiguration)
          new MQL()
          .setActivity("r.[AddMockPaperConfiguration]")
          .setData(this.paperConfiguration)
          .fetch()
           .then(rs => {
          let res = rs.getActivity("AddMockPaperConfiguration",true)
          if (rs.isValid("AddMockPaperConfiguration")) {
            console.log("res",res)
            if(res.result === "SUCCESS"){
             this.$toasted.success(
                this.$t('examConfiguration.success'),
                {
                  theme: 'bubble',
                  position: 'top-right',
                  duration: 3000
                }
              )
               
              // this.paperConfiguration= ""
              // this.$router.push("/admin-dashboard");
              this.$router.go()
              // this.$toasted.success(false);
              
            }
          } else
           { 
          rs.showErrorToast("AddMockPaperConfiguration")
          }
          })
        }
        
    },
    notBeforeToday (date) {
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      
     

      return date < yesterday
    },
    notBeforeFromDate (date) {
      this.paperConfiguration.fromDate

      const fromDate =  this.paperConfiguration && this.paperConfiguration.fromDate && this.paperConfiguration.fromDate ? new Date(this.paperConfiguration.fromDate): new Date()
      const oneDayBefore = new Date(fromDate)
      oneDayBefore.setDate(oneDayBefore.getDate() - 1)
      
     

      return date < oneDayBefore
    },
    notBeforeFromDate1 () {
    
    if(!this.checkDates(this.paperConfiguration.fromDate,this.paperConfiguration.toDate)){
      this.paperConfiguration.toDate =''
    }
  //  this.disabledBefore = new Date(this.paperConfiguration.fromDate).getFullYear
    // 
      // var date = new Date(this.paperConfiguration.fromDate);
      // // console.log("from date", date)
      // let year = date.getFullYear()
      // let month  = 1 +date.getMonth()
      // let day = date.getUTCDate()
      // console.log("year", year,"\nmonth", month,"\nDay",day)
      
      // this.disabledBefore = new Date(year,month,day)
      // console.log("this.disabledBefore", this.disabledBefore)
      // this.disabledBefore = new Date(this.paperConfiguration.fromDate).getFullYear && new Date(this.paperConfiguration.fromDate).getMonth
      // console.log("disabledBefore",this.disabledBefore)
      
      // 
       
    
    },
    //  notBeforeCurrentTime (date) {
    //   if (date.getDate() === new Date().getDate()) {
    //     let getPostMeidiem = null
    //     if (new Date().getHours() > 12) {
    //       getPostMeidiem = Math.abs(12 - new Date().getHours())
    //       return date.getHours() < getPostMeidiem
    //     }
    //     return date.getHours() < new Date().getHours()
    //   }
    // },
     getEducationLevelDetails() {
      const vm = this;
      new MQL()
        .setActivity("o.[query_1izkwK41LiLPDBuLCsMKiRAX8ww]")
        // .setData(data)
        .fetch()
        .then((rs) => {
          let res = rs.getActivity("query_1izkwK41LiLPDBuLCsMKiRAX8ww", true);
          if (rs.isValid("query_1izkwK41LiLPDBuLCsMKiRAX8ww")) {
            // console.log(res);
            if (res !== null) {
              vm.EducationLevels = [];
              vm.EducationLevels = res;
              console.log("vm.Education:", vm.EducationLevels)
              // console.log("education level:",vm.EducationLevels)
              // if (vm.userDetails[0].selectedEducationLevel == null) {
              //   vm.userDetails[0].selectedEducationLevel =
              //     vm.educationLevel[0];
              // }
            }
          } else {
            rs.showErrorToast("query_1izkwK41LiLPDBuLCsMKiRAX8ww");
          }
        });
    },
      getClassDetails() {
      const vm = this;
      new MQL()
        .setActivity("o.[query_1izmpnxHPOcMZ21byDZ31RISR5a]")
        // .setData(data)
        .fetch()
        .then((rs) => {
          let res = rs.getActivity("query_1izmpnxHPOcMZ21byDZ31RISR5a", true);
          if (rs.isValid("query_1izmpnxHPOcMZ21byDZ31RISR5a")) {
            // console.log(res);

            if (res !== null) {
              vm.Class = [];
              vm.Class = res;
              // if (vm.userDetails[0].selectedClass == null) {
              //   vm.userDetails[0].selectedClass = vm.Class[0];
              // }
              console.log("vm.Class", vm.Class);
            }
          } else {
            rs.showErrorToast("query_1izmpnxHPOcMZ21byDZ31RISR5a");
          }
        });
    },
    getAllUniversities() {
      
        const vm = this;
        // console.log('inside universities')
        new MQL()
          .setActivity("o.[query_1hYHKHUKdSeCkvVQ6OOrCX108ux]")
          // .setData(data)
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("query_1hYHKHUKdSeCkvVQ6OOrCX108ux", true);
            if (rs.isValid("query_1hYHKHUKdSeCkvVQ6OOrCX108ux")) {
              vm.Universities = res;
              console.log('vm.universities', vm.Universities)
            //   if (vm.userDetails[0].selectedUniversity == null) {
            //     vm.userDetails[0].selectedUniversity = vm.universities[0];
            //   }
             
            } else {
              rs.showErrorToast("query_1hYHKHUKdSeCkvVQ6OOrCX108ux");
            }
          });
    
    },

        getFacultiesByUniversityId() {
      
        // console.log('inside faculties')
        const vm = this;
        vm.universityId = vm.paperConfiguration.university.universityId;
        new MQL()
          .setActivity("o.[query_1hYKlg8YbiIPKk2moCQyki6SybH]")
          .setData({ universityId: vm.universityId })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("query_1hYKlg8YbiIPKk2moCQyki6SybH", true);
            if (rs.isValid("query_1hYKlg8YbiIPKk2moCQyki6SybH")) {
              // vm.userDetails[0].selectedFaculty=null
              vm.Faculties = res;
             console.log("Faculties", vm.Faculties)

            //   vm.getCoursesByFacultyId();
            //   vm.courseId = vm.userDetails[0].selectedFaculty.courseId;
              
            } else {
              rs.showErrorToast("query_1hYKlg8YbiIPKk2moCQyki6SybH");
            }
          });
     
    },

getCoursesByFacultyId() {
      
        // console.log('inside courses')
        const vm = this;
        vm.facultyId =vm.paperConfiguration.faculty.facultyId;
        new MQL()
          .setActivity("o.[query_1hYMMO9ccVyucRMQoQGaofS4oP3]")
          .setData({ facultyId: vm.facultyId })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("query_1hYMMO9ccVyucRMQoQGaofS4oP3", true);
            if (rs.isValid("query_1hYMMO9ccVyucRMQoQGaofS4oP3")) {
              if (res !== null) {
                vm.Courses = [];
                // vm.userDetails[0].selectedCourse = null;

                for (var i = 0; i < res.length; i++) {
                  vm.Courses.push({
                    courseId: res[i].courseId,
                    courseName: res[i].courseFullName,
                  });
                  
                }
                console.log(vm.Courses);
                
                // vm.getPaperDetails();
                // vm.courses = res;
              }
              
            } else {
              rs.showErrorToast("query_1hYMMO9ccVyucRMQoQGaofS4oP3");
            }
          });
      
    },

    getPaperDetails() {
    
        // console.log("inside papers")
        const vm = this;
        vm.getPaperForGrduation.universityId = vm.paperConfiguration.university.universityId
        vm.getPaperForGrduation.facultyId = vm.paperConfiguration.faculty.facultyId
        vm.getPaperForGrduation.courseId = vm.paperConfiguration.course.courseId
     
        console.log("vm.getPaperForGrduation", vm.getPaperForGrduation)
        
        new MQL()
          .setActivity("o.[query_1j882CJdisPGzlyO88gzcCPymK1]")
          .setData({ data: vm.getPaperForGrduation })
          .fetch()
          .then((rs) => {
            
            let res = rs.getActivity("query_1j882CJdisPGzlyO88gzcCPymK1", true);
            if (rs.isValid("query_1j882CJdisPGzlyO88gzcCPymK1")) {
              // vm.paperDetails = res;
              vm.PaperDetails = [];
              vm.PaperDetails = [...vm.defaultPaper];

              if (res !== null) {
                for (var i = 0; i < res.length; i++) {
                  vm.PaperDetails.push(res[i]);
                }
              }
              console.log("vm.PaperDetails",vm.PaperDetails)

            } else {
              rs.showErrorToast("query_1j882CJdisPGzlyO88gzcCPymK1");
            }
          });
      
    },

    getSchoolPaperDetails() {
    // alert("class id")
        // console.log("inside papers")
        const vm = this;
        vm.clasId = vm.paperConfiguration.class.clasId;
        vm.fetchPaperForSchool.mediumId  = vm.paperConfiguration.medium.mediumId 
        vm.fetchPaperForSchool.clasId =  vm.paperConfiguration.class.clasId
        console.log("fetchPaperForSchool",vm.fetchPaperForSchool)
        
        new MQL()
          .setActivity("o.[query_1j5oKV5zRjz0l9yTYLZJHrXa8Bj]")
          .setData({ data: vm.fetchPaperForSchool })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("query_1j5oKV5zRjz0l9yTYLZJHrXa8Bj", true);
            if (rs.isValid("query_1j5oKV5zRjz0l9yTYLZJHrXa8Bj")) {
              // vm.paperDetails = res;
              vm.PaperDetails = [];
              vm.PaperDetails = [...vm.defaultPaper];

              if (res !== null) {
                for (var i = 0; i < res.length; i++) {
                  vm.PaperDetails.push(res[i]);
                }
              }
              console.log("vm.PaperDetails",vm.PaperDetails)

            } else {
              rs.showErrorToast("query_1j5oKV5zRjz0l9yTYLZJHrXa8Bj");
            }
          });
      
    },


  },
};
</script>

<style>
</style>
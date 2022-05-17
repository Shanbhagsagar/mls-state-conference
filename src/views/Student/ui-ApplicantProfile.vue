<template>
  <div class="content-area">
    <div class="title-holder">
      <div class="title-block">
        <h1 class="page-title">वैयक्तिक माहिती/Personal Details</h1>
      </div>
    </div>
    <div class="content-area-alt">
      <!-- university,faculty,course starts -->
      <div class="card-sinfo">
        <div class="row no-gutters">
          <div class="col-md-4 card-items">
            <div class="label">Applicant Name:</div>
            <div class="value">
              Applicant Name
            </div>
          </div>
          <div class="col-md-4 card-items">
            <div class="label">Gender:</div>
            <div class="value">
              Gender
            </div>
          </div>
          <div class="col-md-4 card-items">
            <div class="label">Date of Birth:</div>
            <div class="value">
              00-00-0000
            </div>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="col-md-6 card-items">
            <div class="label">मोबाईल क्रमांक/Mobile Number:</div>
            <div class="value">
              99999 99999
            </div>
          </div>
          <div class="col-md-6 card-items">
            <div class="label">ई-मेल आयडी/Email ID:</div>
            <div class="value">
              emailid@mkcl.org
            </div>
          </div>
        </div>
      </div>
      <div class="filter-holder form-group-wrapper">
        <div class="row">
          <div
            class="col-md-6"
            v-if="
              userDetails &&
              userDetails[0].mockExamCategory !== undefined &&
              userDetails[0].mockExamCategory.categoryName === 'Academic'
            "
          >
          </div>

          <div
            class="col-md-6"
            v-if="
              (userDetails[0].educationLevel &&
                userDetails[0].educationLevel.levelName === 'Graduation') ||
              userDetails[0].educationLevel.levelName === 'Under Graduation' ||
              userDetails[0].educationLevel.levelName === 'Mock Exam'
            "
          >
          </div>

          <div
            class="col-md-6"
            v-if="
              (userDetails[0].educationLevel &&
                userDetails[0].educationLevel.levelName === 'Graduation') ||
              userDetails[0].educationLevel.levelName === 'Under Graduation'
            "
          >
            <div class="form-group">
              <label for="exam" class="control-label form-label">
                शाखा/Faculty</label
              >
              <v-select
                v-model="userDetails[0].selectedFaculty"
                label="facultyName"
                :options="faculties"
                :value="userDetails[0].selectedFaculty"
                @input="
                  getCoursesByFacultyId();
                  makeNullAfterFaculty();
                "
              />
            </div>
          </div>

          <div class="col-md-6">
            <div
              class="form-group"
              v-if="
                userDetails[0].educationLevel &&
                userDetails[0].educationLevel.levelName === 'Schooling'
              "
            >
              <label for="exam" class="control-label form-label">
                माध्यम/Medium
              </label>

              <v-select
                v-model="userDetails[0].medium"
                label="displayName"
                :options="Medium"
                value="Medium"
                @input="
                  getClassDetails();
                  makeNullAfterMedium();
                "
              />
            </div>
          </div>
          <!-- v-if="educationLevelFlag" -->
          <div
            class="col-md-6"
            v-if="
              userDetails[0].educationLevel &&
              userDetails[0].educationLevel.levelName === 'Schooling'
            "
          >
            <div class="form-group">
              <label for="exam" class="control-label form-label">
                इयत्ता/Standard</label
              >
              <v-select
                v-model="userDetails[0].class"
                label="displayName"
                :options="classes"
                :value="classes"
                @input="
                  getPapers();
                  makeNullAfterClass();
                "
              />
            </div>
          </div>

          <div
            class="col-md-6"
            v-if="
              (userDetails[0].educationLevel &&
                userDetails[0].educationLevel.levelName === 'Graduation') ||
              userDetails[0].educationLevel.levelName === 'Under Graduation'
            "
          >
            <div class="form-group">
              <label for="exam" class="control-label form-label">
                कोर्सचे नाव
              </label>
              <v-select
                v-model="userDetails[0].selectedCourse"
                label="courseName"
                :options="courses"
                :value="userDetails[0].selectedCourse"
                @input="
                  getPapers();
                  getPaperDetails();
                  makeNullAfterCourse();
                  getEducationLevelDetails();
                "
              />
            </div>
          </div>

          <!-- <div class="col-md-6">
            <div class="form-group">
              <label for="exam" class="control-label form-label">
                Select Paper</label
              >
              :getOptionLabel="pap=>pap.paper.paperName" 
              <v-select
                v-model="userDetails[0].selectedPaper"
                label="paperName"
                :options="Papers"
                :value="userDetails[0].selectedPaper"
              />
            </div>
          </div> -->

          <!-- <div class="col">
            <div class="form-group ">
              <label for="exam" class="control-label form-label">
                Select Year</label
              >
              <v-select
                v-model="userDetails[0].selectedYear"
                label="coursePart"
                :options="years"
                :value="userDetails[0].selectedYear"
              ></v-select>
            </div>
          </div> -->
        </div>

        <div class="row">
          <div class="col-auto">
            <div class="form-group">
              <label for="exam" class="control-label form-label">
                {{ $t("studentDetail.tableHeading") }}
              </label>
              <div class="btn-holder">
                <div
                  class="filter-toggle"
                  :class="{
                    's-card': layout === 'Card',
                    's-table': layout === 'Table',
                  }"
                >
                  <button class="btn btn-card" @click="switchLayout('Card')">
                    {{ $t("studentDetail.card") }}
                  </button>
                  <button class="btn btn-table" @click="switchLayout('Table')">
                    {{ $t("studentDetail.table") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- university,faculty,course ends -->
      <!-- Main table element starts-->
      <div class="table-holder" :class="{ 'type-cards': layout === 'Card' }">
        <div class="card m-3" style="width: 18rem" v-if="buttonFlag">
          <div class="card-body">
            <h5 class="card-title td-data">
              {{ $t("studentDetail.comingSoon") }}
            </h5>
          </div>
        </div>

        <div class="table-responsive" v-else>
          <b-table show-empty :items="Papers" :fields="fields1">
            <!-- :filter="filter"
                  @filtered="onFiltered" -->
            <template s v-slot:cell(paper.displayName)="data">
              <div data-text="विषयाचे नाव/Paper Name:" class="td-data" />
              {{ data.value }}
            </template>
            <!-- <template s v-slot:cell(paperCode)="data">
              <div data-text="Paper Code" class="td-data"></div>
              {{ data.value }}
            </template> -->
            <!-- <template
              s
              v-slot:cell(candidateExamDetails.mockExamDetails.ptm)="data"
            >
              <div data-text="Paper Total Marks:" class="td-data" />
              {{ data.value }}
            </template>
            <template
              s
              v-slot:cell(candidateExamDetails.mockExamDetails.m)="data"
            >
              <div data-text="Obtained Marks:" class="td-data" />
              {{ data.value }}
            </template>-->
            <!-- <template s v-slot:cell(paperAbbreviation)="data">
              <div data-text="Paper Abbrevation" class="td-data"></div>
              {{ data.value }}
            </template> -->
            <!--
            <template s v-slot:cell(totalItems)="data">
              <div data-text="Total Items" class="td-data"></div>
              {{ data.value }}
            </template> -->

            <!-- <template s v-slot:cell(minimumPassingMarks)="data">
              <div data-text="Minimum Passing Marks" class="td-data"></div>
              {{ data.value }}
            </template> -->

            <!-- <template s v-slot:cell(paperDuration)="data">
              <div data-text="Paper Duration:" class="td-data" />
              {{ data.value }}
            </template> -->
            <!-- <template s v-slot:cell(certificationLink)="data">
                 <div
                disabled
                data-text="Certification Link :"
                class="td-data mt-1"
              />
              <span v-if="data.value != null">
                <a
                  class="isDisabled"
                  href="/"
                  onclick="return false"
                  disabled
                  >{{ $t("studentDetail.certficate") }}</a
                >
              </span>
              <span v-else>
                {{ "No Link Available" }}
              </span>
            </template> -->

            <template v-slot:cell(Exam)="data">
              <form
                :id="'myform' + data.item.epID"
                method="POST"
                action="https://mkcl.examlive.org/gateway/exam"
              >
                <!-- <input type="hidden" name="epID" value="409" /> -->
                <!-- <template
                  v-if="
                    userDetails[0].educationLevel.levelName === 'Graduation'
                  "
                > -->
                <!-- <template
                  v-if="
                    userDetails[0].educationLevel.levelName === 'Graduation'||
                    data.item.epID ===409
                  "
                >
                 
                  <input type="hidden" name="epID" value="409" />
                </template>
                <template v-else>
                  <input type="hidden" name="epID" :value="data.item.epID" />
                </template> -->
                <input type="hidden" name="epID" :value="data.item.epID" />
                <input
                  type="hidden"
                  name="ccode"
                  :value="userDetails[0].username"
                />
                <input type="hidden" name="pID" value="4" />
                <input type="hidden" name="token" :value="token" />
                <input
                  type="hidden"
                  name="rUrl"
                  value="https://mockexams.mkcl.org/examResponseServer"
                />
              </form>
              <button
                :disabled="!data.item.isEnabled"
                type="submit"
                name="submit2"
                class="btn btn-secondary btn-sm"
                @click="sendTakeExamDetails(data.item)"
              >
                <i class="mdi mdi-image-edit-outline" />परीक्षा दया/Take Exam
              </button>
            </template>
            <hr />
            <template s v-slot:cell(marksObtained)="data">
              <div
                data-text="प्राप्त गुण/Marks Obtained:"
                class="td-data mt-4"
              />
              <span
                v-if="data.value != null && data.value.length > 0"
                class="mt-4"
              >
                {{ data.value }}
              </span>
              <span v-else>
                {{ "---" }}
              </span>
            </template>
          </b-table>
        </div>
      </div>

      <!-- <div class="row" v-if="showTable">
        <div class="card col-md-12">
          <div class="card-body">
            <h4>{{ $t('studentDetail.previousAttempt')}}</h4>
            <div class="table-responsive">
              <b-table
                show-empty
                :items="attemptDetails"
                :fields="fields2"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
              >
                <!-- :filter="filter"
                  @filtered="onFiltered" -->
      <!-- <template v-slot:cell(paperId)="data">
                  {{ data.value }}
                </template>
                <template s v-slot:cell(paperCode)="data">
                  {{ data.value }}
                </template>
                <template s v-slot:cell(paperAbbreviation)="data">
                  {{ data.value }}
                </template> 

                <template s v-slot:cell(paperName)="data">
                  {{ data.value }}
                </template>
                <template s v-slot:cell(ed)="data">
                  {{ data.value }}
                </template>
                <template s v-slot:cell(pd)="data">
                  {{ data.value }}
                </template>
                <template s v-slot:cell(an)="data">
                  {{ data.value }}
                </template>
                <template s v-slot:cell(ptm)="data">
                  {{ data.value }}
                </template>
                <template s v-slot:cell(m)="data">
                  {{ data.value }}
                </template>
              </b-table>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <!-- Main table element ends-->
    <!-- <footer class="footer-hm">
      <div class="container">
        <div class="row copyright">
          <div class="col-md">
            Powered by
            <a target="_blank" href="https://www.mkcl.org/"
              >Maharashtra Knowldege Corporation Ltd. (MKCL)</a
            >
            as Knowledge Partner and Solution Architect<br />
            Copyright © 2020. All rights reserved by MKCL.
          </div>
          <div class="col-md-auto">
            <img src="../../public/assets/images/logo_mkcl.svg" alt="MKCL" />
          </div>
        </div>
      </div>
    </footer> -->
  </div>
</template>

<script>
import Response from "@/plugins/response.js";
import MQL from "@/plugins/mql.js";
import moment from "moment";
import Vue from "vue";
// import { delete } from "vue/types/umd";
export default {
  data() {
    return {
      layout: "Card",
      examUrl: "https://mkcl.examlive.org/gateway/exam",
      paperDetails: [],
      paper_details: null,
      test: false,
      loginUserPassword: null,
      userDetails: [
        {
          selectedUniversity: {},
          selectedFaculty: {},
          selectedCourse: {},
          selectedYear: {},
          educationLevel: {},
          class: {},
          selectedPaper: {},
          selectedPaperDetails: { candidateExamDetails: {} },
        },
      ],
      username: "",
      universities: [],
      faculties: [],
      isSuccessfulEntryInOES: false,
      loginCanidateAttemptedPapers: null,
      loginCanidateAttemptedPapersCountByPaperId: null,
      isSuccessfulResponse: null,
      attemptDetails: [],
      defaultSchool: {
        paper: {
          paperName: "Coming Soon!!!!",
          displayName: "Coming Soon!!!!",
        },
      },
      defaultPaper1: {
        _id: "5f62022e7daab01ef9a1128b",
        paper: {
          paperName: "KKSU_Paper_1_Mock",
          displayName: "KKSU Paper-1 Mock",
        },
        totalItems: "25",
        paperTotalMarks: "20",
        minimumPassingMarks: "",
        paperDuration: "30 min",
        paperId: "45671",
        paperCode: "KKSU_Paper_1_Mock",
        paperAbbreviation: "KKSU_Paper_1_Mock",
        isEnabled: true,
        epID: 45645,
        examEventId: 6,
        examVenueCode: "vvmkcl",
        candidateExamDetails: {
          mockExamDetails: {
            ptm: "",
            m: "",
          },
          totalItems: "25",
          paperTotalMarks: "20",
          minimumPassingMarks: "",
          paperDuration: "30 min",
          paperId: "45671",
          examEventId: 6,
          examVenueCode: "vvmkcl",
          paperCode: "KKSU_Paper_1_Mock",
          paperAbbreviation: "KKSU_Paper_1_Mock",
          epID: 45645,
        },
      },
      defaultPaper2: {
        _id: "5f62022e7daab01ef9a1128b",
        paper: {
          paperName: "KKSU_Yoga_Mock",
          displayName: "KKSU Yoga Mock",
        },
        totalItems: "25",
        paperTotalMarks: "20",
        minimumPassingMarks: "",
        paperDuration: "30 min",
        paperId: "45672",
        paperCode: "KKSU_Yoga_Mock",
        paperAbbreviation: "KKSU_Yoga_Mock",
        isEnabled: true,
        epID: 45644,
        examEventId: 6,
        examVenueCode: "vvmkcl",
        candidateExamDetails: {
          mockExamDetails: {
            ptm: "",
            m: "",
          },
          totalItems: "25",
          paperTotalMarks: "20",
          minimumPassingMarks: "",
          paperDuration: "30 min",
          paperId: "45671",
          examEventId: 6,
          examVenueCode: "vvmkcl",
          paperCode: "KKSU_Yoga_Mock",
          paperAbbreviation: "KKSU_Yoga_Mock",
          epID: 45644,
        },
      },

      defaultPaper3: {
        _id: "5f62022e7daab01ef9a1128b",
        paper: {
          paperName: "KKSU_Sanskrit_Mock_Final",
          displayName: "KKSU Sanskrit Mock-Final",
        },
        totalItems: "25",
        paperTotalMarks: "20",
        minimumPassingMarks: "",
        paperDuration: "30 min",
        paperId: "45673",
        paperCode: "KKSU_Sanskrit_Mock_Final",
        paperAbbreviation: "KKSU_Sanskrit_Mock_Final",
        isEnabled: true,
        epID: 45643,
        examEventId: 6,
        examVenueCode: "vvmkcl",
        candidateExamDetails: {
          mockExamDetails: {
            ptm: "",
            m: "",
          },
          totalItems: "25",
          paperTotalMarks: "20",
          minimumPassingMarks: "",
          paperDuration: "30 min",
          paperId: "45673",
          examEventId: 6,
          examVenueCode: "vvmkcl",
          paperCode: "KKSU_Sanskrit_Mock_Final",
          paperAbbreviation: "KKSU_Sanskrit_Mock_Final",
          epID: 45643,
        },
      },
      //   epID: "207",
      //   paperDuration: "30 min",
      //   totalItems: "25",
      //   paperTotalMarks: "20",
      //   minimumPassingMarks: "",
      //   isEnabled: true,
      //   epID:56,
      //   examEventId:6,
      //   examVenueCode:"vvmkcl",
      //   candidateExamDetails: {
      //     mockExamDetails: {
      //       ptm: "",
      //       m: "",
      //     },
      //   },
      // },
      buttonFlag: false,
      courses: [],
      showTable: false,
      universityId: "",
      facultyId: "",
      courseId: "",
      paperId: "",
      paperName: "",
      categoryName: "",
      educationLevel: [],
      classes: [],
      educationLevelFlag: false,
      attemptDate: "",
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      years: [
        {
          coursePart: "",
        },
      ],
      mockExamCategories: [
        { categoryId: 1, categoryName: "Academic" },
        { categoryId: 2, categoryName: "Competitive" },
      ],
      Medium: [
        { mediumId: 3, mediumName: "Marathi", displayName: "मराठी/Marathi" },
        { mediumId: 1, mediumName: "English", displayName: "इंग्रजी/English" },
        {
          mediumId: 2,
          mediumName: "Semi-English",
          displayName: "सेमी इंग्रजी/Semi-English",
        },
        // { mediumId: 2, mediumName: "Hindi" },
      ],
      showGuardianFlag: false,
      Papers: [],
      fields1: [
        {
          key: "paper.displayName",
          label: this.$t("studentDetail.paperName"),
        },

        // {
        //   key: "paperCode",
        //   label: "Paper Code",
        // },
        // {
        //   key: "paperAbbreviation",
        //   label: "Paper Abbreviation",
        // },

        // {
        //   key: "totalItems",
        //   label: "Total Items",
        // },
        // {
        //   key: "candidateExamDetails.mockExamDetails.ptm",
        //   label: "Paper Total Marks",
        // },
        // {
        //   key: "candidateExamDetails.mockExamDetails.m",
        //   label: "Obtained Marks",
        // },
        // {
        //   key: "paperDuration",
        //   label: "Paper Duration",
        // },
        // {
        //   key: "minimumPassingMarks",
        //   label: "Minimum Passing Marks",
        // },

        {
          key: "Exam",
          label: this.$t("studentDetail.exam"),
          class: "td-action",
        },
        {
          key: "marksObtained",
          label: this.$t("studentDetail.markObtained"),
        },
        {
          key: "certificationLink",
          label: this.$t("studentDetail.certificationLink"),
        },
      ],
      fields2: [
        "SrNo",
        {
          key: "paper.paperName",
          label: "Paper Name",
        },
        {
          key: "ed",
          label: "Attempt Date",
        },
        {
          key: "pd",
          label: "Paper Duration",
        },
        {
          key: "an",
          label: "Attempt Number",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "ptm",
          label: "Total Marks",
        },
        {
          key: "m",
          label: "Obtained Marks",
        },
      ],
    };
  },
  async created() {
    const vm = this;

    vm.token = sessionStorage.getItem("user-token");
    // await vm.getPaperDetails();
    await vm.getUserDetails();
    // vm.getAllUniversities();

    vm.starter();
    // vm.$store.state.username=vm.userDetails[0].mobileNumber;
  },
  methods: {
    async starter() {
      const vm = this;

      await vm.getAllUniversities();
      vm.universityId = vm.userDetails[0].selectedUniversity.universityId;
      await vm.getFacultiesByUniversityId();
      vm.facultyId = vm.userDetails[0].selectedFaculty.facultyId;
      await vm.getAttemptDetails();
      // console.log("das", vm.attemptDetails.length);
      if (vm.attemptDetails.length > 0) {
        for (var i = 0; i < vm.attemptDetails.length; i++) {
          vm.attemptDetails[i].SrNo = i + 1;
          vm.attemptDate = new Date(vm.attemptDetails[i].ed);
          vm.attemptDetails[i].ed =
            vm.attemptDate.getMonth() +
            1 +
            "/" +
            vm.attemptDate.getDate() +
            "/" +
            vm.attemptDate.getFullYear();
          vm.attemptDetails[i].pd = vm.attemptDetails[i].pd / 60 + " " + "min";
          await vm.getPaperNameUsingPaperId(vm.attemptDetails[i].epid);
          vm.attemptDetails[i].paperName = vm.paperName;
        }
        vm.showTable = false;
      }
      await vm.getEducationLevelDetails();
      await vm.getClassDetails();
      // await vm.getCoursesByFacultyId()
      // vm.courseId = vm.userDetails[0].selectedFaculty.courseId
      // await vm.getYearsByCourseId();
      // await vm.getPaperDetails()
      // await vm.getTalukaByDistrictId();
      // vm.candidateMarks = await vm.getCandidateMarks()
      // if (vm.candidateMarks.isOESMockExamDataReceived) {
      //   vm.paperDetails[0].candidateExamDetails = vm.candidateMarks
      //   vm.userDetails[0].selectedPaperDetails = vm.paperDetails[0]
      //   vm.userDetails[0].selectedPaperDetails.isEnabled = false
      //   vm.userDetails[0].isAttempted = true
      //   delete vm.userDetails[0]._id
      //   // console.log(vm.paperDetails);
      //   new MQL()
      //     .setActivity('o.[UpdateStudentPaperDetails]')
      //     .setData(vm.userDetails[0])
      //     .fetch()
      //     .then((rs) => {
      //       let res = rs.getActivity('UpdateStudentPaperDetails', true)
      //       if (rs.isValid('UpdateStudentPaperDetails')) {
      //       } else {
      //         rs.showErrorToast('UpdateStudentPaperDetails')
      //       }
      //     })
      // }
    },
    switchLayout(layout) {
      this.layout = layout;
    },
    educationLevelSelected() {
      const vm = this;
      // console.log(vm.userDetails[0]);
      vm.Papers = [];
      vm.userDetails[0].selectedPaper = {};
      if (vm.userDetails[0].educationLevel.levelName === "Schooling") {
        vm.educationLevelFlag = true;
      } else {
        vm.educationLevelFlag = false;
      }
    },
    getEducationLevelDetails() {
      return new Promise((resolve) => {
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
                vm.educationLevel = [];
                vm.educationLevel = res;
                // if (vm.userDetails[0].educationLevel == null) {
                //   vm.userDetails[0].educationLevel =
                //     vm.educationLevel[0];
                // }
              }
              resolve();
            } else {
              rs.showErrorToast("query_1izkwK41LiLPDBuLCsMKiRAX8ww");
            }
          });
      });
    },
    getClassDetails() {
      const vm = this;
      return new Promise((resolve) => {
        new MQL()
          .setActivity("o.[query_1izmpnxHPOcMZ21byDZ31RISR5a]")
          // .setData(data)
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("query_1izmpnxHPOcMZ21byDZ31RISR5a", true);
            if (rs.isValid("query_1izmpnxHPOcMZ21byDZ31RISR5a")) {
              // console.log(res);

              if (res !== null) {
                vm.classes = [];
                vm.classes = res;
                // if (vm.userDetails[0].class == null) {
                //   vm.userDetails[0].class = vm.classes[0];
                // }
                // console.log("classes:", res);
                // console.log("userdetails", vm.userDetails[0]);
              }

              vm.getPapers();
              resolve();
            } else {
              rs.showErrorToast("query_1izmpnxHPOcMZ21byDZ31RISR5a");
            }
          });
      });
    },

    getAllUniversities() {
      return new Promise((resolve) => {
        const vm = this;
        // console.log('inside universities')
        new MQL()
          .setActivity("o.[query_1hYHKHUKdSeCkvVQ6OOrCX108ux]")
          // .setData(data)
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("query_1hYHKHUKdSeCkvVQ6OOrCX108ux", true);
            if (rs.isValid("query_1hYHKHUKdSeCkvVQ6OOrCX108ux")) {
              vm.universities = res;
              // console.log('vm.universities', vm.universities)
              if (vm.userDetails[0].selectedUniversity == null) {
                vm.userDetails[0].selectedUniversity = vm.universities[6];
              }
              resolve();
            } else {
              rs.showErrorToast("query_1hYHKHUKdSeCkvVQ6OOrCX108ux");
            }
          });
      });
    },
    getFacultiesByUniversityId() {
      return new Promise((resolve) => {
        // console.log('inside faculties')
        const vm = this;
        vm.universityId = vm.userDetails[0].selectedUniversity.universityId;
        new MQL()
          .setActivity("o.[query_1hYKlg8YbiIPKk2moCQyki6SybH]")
          .setData({ universityId: vm.universityId })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("query_1hYKlg8YbiIPKk2moCQyki6SybH", true);
            if (rs.isValid("query_1hYKlg8YbiIPKk2moCQyki6SybH")) {
              // vm.userDetails[0].selectedFaculty=null
              vm.faculties = res;
              if (vm.userDetails[0].selectedFaculty == null) {
                vm.userDetails[0].selectedFaculty = vm.faculties[0];
              }
              vm.getCoursesByFacultyId();
              vm.courseId = vm.userDetails[0].selectedFaculty.courseId;
              resolve();
            } else {
              rs.showErrorToast("query_1hYKlg8YbiIPKk2moCQyki6SybH");
            }
          });
      });
    },
    getCoursesByFacultyId() {
      return new Promise((resolve) => {
        // console.log('inside courses')
        const vm = this;
        vm.facultyId = vm.userDetails[0].selectedFaculty.facultyId;
        new MQL()
          .setActivity("o.[query_1hYMMO9ccVyucRMQoQGaofS4oP3]")
          .setData({ facultyId: vm.facultyId })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("query_1hYMMO9ccVyucRMQoQGaofS4oP3", true);
            if (rs.isValid("query_1hYMMO9ccVyucRMQoQGaofS4oP3")) {
              if (res !== null) {
                vm.courses = [];
                // vm.userDetails[0].selectedCourse = null;

                for (var i = 0; i < res.length; i++) {
                  // vm.faculties[i].facultyName=res[i].facultyName+'('+res[i].facultyId+')'
                  // vm.courses.push(res[i].courseId)
                  // console.log(vm.courses)

                  vm.courses.push({
                    courseId: res[i].courseId,
                    courseName: res[i].courseFullName,
                  });
                  // console.log(vm.courses);
                }
                if (vm.userDetails[0].selectedCourse == null) {
                  vm.userDetails[0].selectedCourse = vm.courses[0];
                }
                vm.getPaperDetails();
                vm.getPapers();
              }
              resolve();
            } else {
              rs.showErrorToast("query_1hYMMO9ccVyucRMQoQGaofS4oP3");
            }
          });
      });
    },
    getYearsByCourseId() {
      return new Promise((resolve) => {
        // console.log("inside years")
        const vm = this;
        vm.courseId = vm.userDetails[0].selectedCourse.courseId;
        new MQL()
          .setActivity("o.[query_1hoKphwNGTUdbgIWnqYqvLmYDc5]")
          .setData({ courseId: vm.courseId })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("query_1hoKphwNGTUdbgIWnqYqvLmYDc5", true);
            if (rs.isValid("query_1hoKphwNGTUdbgIWnqYqvLmYDc5")) {
              // console.log(res);
              if (res !== null) {
                vm.years = [];
                // vm.userDetails[0].selectedYear = null;
                for (var i = 0; i < res.length; i++) {
                  // vm.faculties[i].facultyName=res[i].facultyName+'('+res[i].facultyId+')'
                  // vm.courses.push(res[i].courseId)
                  // console.log(vm.courses)

                  vm.years.push({
                    courseId: res[i].courseId,
                    coursePart:
                      res[i].coursePart + "(" + res[i].coursePattern + ")",
                    facultyId: res[i].facultyId,
                    universityId: res[i].universityId,
                    universityName: res[i].universityName,
                  });
                  // console.log(vm.years);
                }
                // vm.years = res;
                resolve();
              }
            } else {
              rs.showErrorToast("query_1hoKphwNGTUdbgIWnqYqvLmYDc5");
            }
          });
      });
    },
    getPaperDetails() {
      return new Promise((resolve) => {
        // console.log("inside papers")
        const vm = this;
        vm.courseId = vm.userDetails[0].selectedCourse.courseId;
        // console.log(vm.courseId)
        new MQL()
          .setActivity("o.[query_1hrRjVGzQTPRQ5DMmDpYqGBc6Gz]")
          .setData({ courseId: vm.courseId })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("query_1hrRjVGzQTPRQ5DMmDpYqGBc6Gz", true);
            if (rs.isValid("query_1hrRjVGzQTPRQ5DMmDpYqGBc6Gz")) {
              // vm.paperDetails = res;
              vm.paperDetails = [];
              // vm.paperDetails = [...vm.defaultPaper];

              if (res !== null) {
                for (var i = 0; i < res.length; i++) {
                  vm.paperDetails.push(res[i]);
                }
              }

              //vm.getCandidateMarks();

              resolve();
            } else {
              rs.showErrorToast("query_1hrRjVGzQTPRQ5DMmDpYqGBc6Gz");
            }
          });
      });
    },
    getUserDetails() {
      return new Promise((resolve) => {
        const vm = this;
        new MQL()
          .setActivity("r.[query_1hau0sZuZdl0MOZBrO1OaFpTTgI]")
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("query_1hau0sZuZdl0MOZBrO1OaFpTTgI", true);
            if (rs.isValid("query_1hau0sZuZdl0MOZBrO1OaFpTTgI")) {
              vm.userDetails = res;

              if (
                vm.userDetails &&
                vm.userDetails[0].parentOrGuardianName &&
                vm.userDetails[0].parentOrGuardianName !== ""
              ) {
                vm.showGuardianFlag = true;
              }
              // console.log("user details", vm.userDetails);

              // vm.userDetails[0].dateOfBirth =
              //   vm.userDetails[0].dateOfBirth + " " + "00:00:00";
              resolve();
            } else {
              rs.showErrorToast("query_1hau0sZuZdl0MOZBrO1OaFpTTgI");
            }
          });
      });
    },
    getAttemptDetails() {
      return new Promise((resolve) => {
        const vm = this;
        new MQL()
          .setActivity("o.[query_1iUibeUXUoLEdOE0xjeWO2PZkwE]")
          .setData({ lc: vm.userDetails[0].mobileNumber })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("query_1iUibeUXUoLEdOE0xjeWO2PZkwE", true);
            if (rs.isValid("query_1iUibeUXUoLEdOE0xjeWO2PZkwE")) {
              if (res !== null) {
                vm.attemptDetails = res;
                // console.log("attempt", vm.attemptDetails[0].epid);
              }
            } else {
              rs.showErrorToast("query_1iUibeUXUoLEdOE0xjeWO2PZkwE");
            }
            resolve();
          });
      });
    },
    getPaperNameUsingPaperId() {
      return new Promise((resolve) => {
        const vm = this;
        vm.paperName = "Mock Exam";
        // vm.paperId = epid;
        // new MQL()
        //   .setActivity("o.[query_1iUkbBnjOO5IRHlmLTWOQlyV3xt]")
        //   .setData({ paperId: vm.paperId })
        //   .fetch()
        //   .then((rs) => {
        //     let res = rs.getActivity("query_1iUkbBnjOO5IRHlmLTWOQlyV3xt", true);
        //     if (rs.isValid("query_1iUkbBnjOO5IRHlmLTWOQlyV3xt")) {
        //       if (res !== null) {
        //         // console.log(res);

        //         vm.paperName = res[0].paperName;
        //         // console.log("paperName", vm.paperName);
        //       }
        //     } else {
        //       rs.showErrorToast("query_1iUkbBnjOO5IRHlmLTWOQlyV3xt");
        //     }

        //   });
        resolve();
      });
    },
    getMarks() {
      const vm = this;
      new MQL()
        .setActivity("o.[TakeExamOnOesTest]")
        .setData(vm.student)
        .fetch()
        .then((rs) => {
          let res = rs.getActivity("TakeExamOnOesTest", true);
          if (rs.isValid("TakeExamOnOesTest")) {
            // console.log(res);
          } else {
            rs.showErrorToast("Registration Failed");
          }
        });
    },
    GetPaperDetailsOfLoginStudent() {
      return new Promise((resolve) => {
        const vm = this;
        vm.filterDate();
        var paperId;
        if (vm.userDetails[0].selectedPaperDetails.paperId != null) {
          paperId = vm.userDetails[0].selectedPaperDetails.paperId;
        } else {
          paperId = vm.userDetails[0].selectedPaperDetails.paper.paperId;
        }

        // paperId = parseInt(paperId)

        new MQL()
          .setActivity("r.[GetStudentPaperDetails]")
          .setData({
            username: vm.userDetails[0].username,
            paperId: paperId,
          })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("GetStudentPaperDetails", true);
            if (rs.isValid("GetStudentPaperDetails")) {
              if (res.result != null) {
                // console.log("res.result", res.result);
                vm.loginCanidateAttemptedPapers = res.result.papers;
                vm.loginCanidateAttemptedPapersCountByPaperId =
                  res.result.selectedpaperCount;
                if (res.result.papers != null) {
                  for (var i = 0; i < res.result.papers.length; i++)
                    if (res.result.papers[i].isSuccessful == true) {
                      vm.isSuccessfulResponse =
                        res.result.papers[i].isSuccessful;
                      break;
                    }
                }

                // console.log(vm.loginCanidateAttemptedPapersCountByPaperId);
              } else {
                vm.loginCanidateAttemptedPapers = null;
                vm.loginCanidateAttemptedPapersCountByPaperId = null;
              }
              resolve();
            } else {
              rs.showErrorToast("GetStudentPaperDetails");
            }
          });
      });
    },
    async sendTakeExamDetails(paper) {
      const vm = this;
      await this.GetLoginUserPassword();

      if (!vm.educationLevelFlag) {
        vm.classes = [];
        vm.userDetails[0].selectedClass = null;
      }

      vm.userDetails[0].selectedPaperDetails = paper;
      vm.userDetails[0].isAttempted = false;
      vm.userDetails[0].isSuccessful = false;

      await this.GetPaperDetailsOfLoginStudent();
      new MQL()
        .setActivity("o.[AddStudentPaperDetails]")
        .setData(vm.userDetails[0])
        .fetch()
        .then((rs) => {
          let res = rs.getActivity("AddStudentPaperDetails", true);
          if (rs.isValid("AddStudentPaperDetails")) {
            // console.log("User details", vm.userDetails);
            // console.log("paper details", res.result);
            vm.paper_details = res.result;
            if (
              vm.loginCanidateAttemptedPapersCountByPaperId &&
              vm.isSuccessfulResponse == true &&
              vm.paper_details.selectedPaperDetails.paper.paperId ==
                vm.loginCanidateAttemptedPapersCountByPaperId._id &&
              vm.loginCanidateAttemptedPapersCountByPaperId.count >= 1
            ) {
              // vm.test = true
              // alert("Already Registered with OES");
              // vm.RegisterLearnerFirstTimeToMKCLOESAndTakeTest(paper);
              document.getElementById("myform" + paper.epID).submit();
              // vm.isSuccessfulEntryInOES = true
              // vm.UpdatePaperDetails();
            } else if (
              (res.result && vm.userDetails[0].isSuccessful == false) ||
              (vm.paper_details &&
                vm.paper_details.selectedPaperDetails.paper.paperId !=
                  vm.loginCanidateAttemptedPapersCountByPaperId._id)
            ) {
              vm.RegisterLearnerFirstTimeToMKCLOESAndTakeTest(paper);
            }
          } else {
            rs.showErrorToast("AddStudentPaperDetails");
          }
        });
    },

    RegisterLearnerFirstTimeToMKCLOESAndTakeTest(paper) {
      const vm = this;
      var paperId;
      if (vm.userDetails[0].selectedPaperDetails.paperId != null) {
        paperId = vm.userDetails[0].selectedPaperDetails.paperId;
      } else {
        paperId = vm.userDetails[0].selectedPaperDetails.paper.paperId;
      }
      vm.userDetails[0].password = vm.loginUserPassword;
      vm.userDetails[0].paperId = paperId;
      if (
        vm.userDetails[0].examEventId == null &&
        vm.userDetails[0].selectedPaper.examEventId == null
      ) {
        vm.userDetails[0].examEventId = "6";
        vm.userDetails[0].examVenueCode = "vvmkcl";
      } else {
        vm.userDetails[0].examEventId =
          vm.userDetails[0].selectedPaperDetails.examEventId;
        vm.userDetails[0].examVenueCode =
          vm.userDetails[0].selectedPaperDetails.examVenueCode;
      }

      // vm.userDetails[0].examEventId = "351"
      // vm.userDetails[0].examVenueCode = "vvmkcl"

      new MQL()
        .setActivity("o.[RegisterStudentToOESAndTakeTest]")
        .setData(vm.userDetails[0])
        .fetch()
        .then((rs) => {
          let res = rs.getActivity("RegisterStudentToOESAndTakeTest", true);
          if (rs.isValid("RegisterStudentToOESAndTakeTest")) {
            // console.log("res.result", res.result);
            vm.isSuccessfulEntryInOES = res.result.isSuccessful;
            vm.UpdatePaperDetails(paper);
          } else {
            rs.showErrorToast("RegisterStudentToOESAndTakeTest");
          }
        });
    },
    UpdatePaperDetails(updatedPaper) {
      const vm = this;
      var paperId;
      if (vm.userDetails[0].selectedPaperDetails.paperId != null) {
        paperId = vm.userDetails[0].selectedPaperDetails.paperId;
        new MQL()
          .setActivity("r.[UpdatePaperDetailsService]")
          .setData({
            username: vm.userDetails[0].username,
            paperId: paperId,
            isSuccessful: vm.isSuccessfulEntryInOES,
          })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("UpdatePaperDetailsService", true);
            if (rs.isValid("UpdatePaperDetailsService")) {
              // console.log("Update paper details", res.result.isSuccessful);
              if (vm.isSuccessfulEntryInOES == true) {
                document.getElementById("myform" + updatedPaper.epID).submit();
              }
            } else {
              rs.showErrorToast("UpdatePaperDetailsService");
            }
          });
      } else {
        paperId = vm.userDetails[0].selectedPaperDetails.paper.paperId;
        new MQL()
          .setActivity("r.[UpdatePaperDetailsByDateService]")
          .setData({
            username: vm.userDetails[0].username,
            paperId: paperId,
            isSuccessful: vm.isSuccessfulEntryInOES,
          })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("UpdatePaperDetailsByDateService", true);
            if (rs.isValid("UpdatePaperDetailsByDateService")) {
              // console.log("Update paper details", res.result.isSuccessful);
              if (vm.isSuccessfulEntryInOES == true) {
                document.getElementById("myform" + updatedPaper.epID).submit();
              }
            } else {
              rs.showErrorToast("UpdatePaperDetailsByDateService");
            }
          });
      }
    },

    filterDate() {
      const vm = this;
      var date = vm.userDetails[0].dateOfBirth;
      vm.userDetails[0].dateOfBirth = moment(String(new Date(date))).format(
        "YYYY-MM-DD hh:mm:ss"
      );
    },

    GetLoginUserPassword() {
      return new Promise((resolve) => {
        const vm = this;
        new MQL()
          .setActivity("r.[query_1j8YbP1SrP6ZmEw9UoHFGFik3ON]")
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("query_1j8YbP1SrP6ZmEw9UoHFGFik3ON", true);
            if (rs.isValid("query_1j8YbP1SrP6ZmEw9UoHFGFik3ON")) {
              if (res !== null) {
                vm.loginUserPassword = res[0].password;
              }
              resolve();
            } else {
              rs.showErrorToast("query_1j8YbP1SrP6ZmEw9UoHFGFik3ON");
            }
          });
      });
    },

    UpdatePaperDetailsByCreatedDate() {},
    makeNullAfterUniversity() {
      const vm = this;
      if (vm.userDetails[0].selectedUniversity) {
        vm.faculties = [];
        vm.courses = [];
        vm.paperDetails = [];
        vm.years = [];
        vm.Papers = [];
        // vm.educationLevel = [];
        // vm.classes = [];
        vm.userDetails[0].selectedFaculty = null;
        vm.userDetails[0].selectedCourse = null;
        vm.userDetails[0].selectedYear = null;
        vm.userDetails[0].selectedPaper = null;
        // vm.userDetails[0].educationLevel = null;
        // vm.userDetails[0].class = null;
      }
    },
    makeNullAfterFaculty() {
      const vm = this;
      if (vm.userDetails[0].selectedFaculty) {
        vm.courses = [];
        vm.years = [];
        vm.paperDetails = [];
        vm.Papers = [];
        // vm.educationLevel = [];
        // vm.classes = [];
        vm.userDetails[0].selectedCourse = null;
        vm.userDetails[0].selectedYear = null;
        vm.userDetails[0].selectedPaper = null;
        // vm.userDetails[0].educationLevel = null;
        // vm.userDetails[0].class = null;
      }
    },
    makeNullAfterCourse() {
      const vm = this;
      if (vm.userDetails[0].selectedCourse) {
        vm.years = [];
        vm.paperDetails = [];
        vm.Papers = [];
        // vm.educationLevel = [];
        // vm.classes = [];
        vm.userDetails[0].selectedYear = null;
        vm.userDetails[0].selectedPaper = null;
        // vm.userDetails[0].educationLevel = null;
        // vm.userDetails[0].class = null;
      }
    },
    makeNullAfterMedium() {
      const vm = this;
      if (vm.userDetails[0].selectedCourse) {
        vm.years = [];
        vm.paperDetails = [];
        vm.classes = [];
        vm.Papers = [];
        vm.userDetails[0].selectedYear = null;
        vm.userDetails[0].selectedClass = null;
        vm.userDetails[0].selectedPaper = null;
      }
    },

    makeNullAfterClass() {
      const vm = this;
      if (vm.userDetails[0].selectedCourse) {
        vm.years = [];
        vm.paperDetails = [];
        vm.Papers = [];
        vm.userDetails[0].selectedYear = null;
        vm.userDetails[0].selectedPaper = null;
      }
    },

    makeNullAfterPaper() {
      const vm = this;
      if (vm.userDetails[0].selectedPaper) {
        vm.years = [];
        vm.paperDetails = [];
        vm.userDetails[0].selectedYear = null;
      }
    },
    getCandidateMarks() {
      let vm = this;
      return new Promise((resolve) => {
        new MQL()
          .setActivity("r.[TakeExamOnOesTest]")
          // .setData(data)
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("TakeExamOnOesTest", true);
            if (rs.isValid("TakeExamOnOesTest")) {
              if (res.result !== null) {
                // console.log('inside getCandidateMarks', res.result)
                vm.candidateMarks = res.result;
                // console.log("candidate marks",vm.candidateMarks)
                if (vm.candidateMarks.isOESMockExamDataReceived) {
                  vm.paperDetails[0].candidateExamDetails.mockExamDetails.ptm =
                    vm.candidateMarks.mockExamTotalMark;
                  vm.paperDetails[0].candidateExamDetails.mockExamDetails.m =
                    vm.candidateMarks.mockExamObtainedMark;
                  // console.log('vm.candidateMarks', vm.candidateMarks.mockExamTotalMark)
                  vm.userDetails[0].selectedPaperDetails = vm.paperDetails[0];
                  vm.userDetails[0].selectedPaperDetails.isEnabled = true; // for disabling the TAKE EXAM BUTTON FLAG
                  vm.userDetails[0].isAttempted = true;
                  delete vm.userDetails[0]._id;
                  // console.log(vm.paperDetails);
                  new MQL()
                    .setActivity("o.[UpdateStudentPaperDetails]")
                    .setData(vm.userDetails[0])
                    .fetch()
                    .then((rs) => {
                      let res = rs.getActivity(
                        "UpdateStudentPaperDetails",
                        true
                      );
                      if (rs.isValid("UpdateStudentPaperDetails")) {
                      } else {
                        rs.showErrorToast("UpdateStudentPaperDetails");
                      }
                    });
                }
                resolve(res.result);
              }
            } else {
              rs.showErrorToast("TakeExamOnOesTest");
            }
          });
      });
    },

    getPapers() {
      const vm = this;
      //console.log("hi papers");
      let data = {};
      if (vm.userDetails[0].educationLevel.levelName === "Schooling") {
        data = {
          courseId: 0,
          mediumId: vm.userDetails[0].medium.mediumId,
          clasId: vm.userDetails[0].class.clasId,
          levelName: vm.userDetails[0].educationLevel.levelName,
        };
      } else {
        data = {
          levelName: vm.userDetails[0].educationLevel.levelName,
          courseId: vm.userDetails[0].selectedCourse.courseId,
          mediumId: 0,
          clasId: 0,
        };
      }

      return new Promise((resolve) => {
        new MQL()
          .setActivity("r.[GetPaperConfigurationDetails]")
          .setData(data)
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("GetPaperConfigurationDetails", true);
            if (rs.isValid("GetPaperConfigurationDetails")) {
              if (res.result !== null) {
                // vm.Papers = [];
                // vm.Papers = res.result
                // console.log("res.result.universityPaper.length:",res.result.universityPaper.length)

                if (
                  res.result.universityPaper &&
                  res.result.universityPaper.length
                ) {
                  vm.Papers = [];

                  vm.Papers = res.result.universityPaper;
                  vm.Papers.unshift(vm.defaultPaper);
                  this.buttonFlag = false;

                  // for (var i = 0; i < res.result.universityPaper.length; i++) {
                  //   vm.Papers.push(res.result.universityPaper[i]);
                  //   vm.Papers[i].paperName = vmPapers[i].paper.paperName;
                  //     this.buttonFlag = false
                  //   console.log("Paper  University:", vm.Papers);
                  // }
                } else if (
                  res.result.schoolPaper &&
                  res.result.schoolPaper.length
                ) {
                  vm.Papers = [];
                  vm.Papers = res.result.schoolPaper;
                  this.buttonFlag = false;

                  // for (var i = 0; i < res.result.schoolPaper.length; i++) {
                  //   vm.Papers.push(res.result.schoolPaper[i]);
                  //   vm.Papers[i].paperName =
                  //     res.result.schoolPaper[i].paper.paperName;
                  //      this.buttonFlag = false
                  //   // console.log("Paper  schol:", vm.Papers);
                  // }
                } else {
                  if (
                    vm.userDetails[0].educationLevel.levelName ===
                      "Schooling" &&
                    res.result &&
                    !res.result.schoolPaper
                  ) {
                    vm.Papers = [];
                    vm.Papers.unshift(vm.defaultSchool);
                    this.buttonFlag = true;
                  } else {
                    vm.Papers = [];
                    vm.Papers.unshift(vm.defaultPaper1);
                    vm.Papers.unshift(vm.defaultPaper2);
                    vm.Papers.unshift(vm.defaultPaper3);
                    this.buttonFlag = false;
                  }
                }

                // console.log("Paper  Final:", vm.Papers);
                if (vm.userDetails[0].selectedPaper == null) {
                  vm.userDetails[0].selectedPaper = vm.Papers[0];
                }
              }
              vm.getObtainedMarks();
              resolve();
            } else {
              rs.showErrorToast("GetPaperConfigurationDetails");
            }
          });
      });
    },

    getObtainedMarks() {
      const vm = this;
      let id = [];

      if (vm.Papers.length) {
        for (let i = 0; i < vm.Papers.length; i++) {
          id.push(vm.Papers[i].epID);
        }
        // console.log("IDS:", id);

        new MQL()
          .setActivity("r.[GetObtainedMarksFromResult]")
          .setData({ epid: id })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("GetObtainedMarksFromResult", true);
            if (rs.isValid("GetObtainedMarksFromResult")) {
              // console.log("Marks:", res);
              let result = res.result;

              if (result.length && vm.Papers.length) {
                for (let j = 0; j < vm.Papers.length; j++) {
                  for (let i = 0; i < result.length; i++) {
                    if (vm.Papers[j].epID === result[i].epid) {
                      let data = [];
                      data.push(result[i]);
                      // console.log("Data:",data)
                      const sortedActivities = data
                        .slice()
                        .sort((a, b) => b.an - a.an);
                      // console.log("Date:", sortedActivities);
                      Vue.set(
                        vm.Papers[j],
                        "marksObtained",
                        sortedActivities[sortedActivities.length - 1].m
                      );
                      // vm.Papers[j].marksObtained = sortedActivities[sortedActivities.length - 1].m;
                      // console.log("sortedActivities[sortedActivities.length - 1].m;:",sortedActivities[sortedActivities.length - 1])
                    }
                  }
                }
              }
            } else {
              rs.showErrorToast("GetObtainedMarksFromResult");
            }
          });
      }
    },
  },
};
</script>

<style>
.isDisabled {
  color: currentColor;
  cursor: not-allowed;
  opacity: 0.5;
  text-decoration: none;
}
</style>

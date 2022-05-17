<template>
  <div class="content-area">
    <div class="title-holder">
      <div class="title-block">
        <h1 class="page-title">
          Applicant Details
        </h1>
      </div>
    </div>
    <div class="content-area-alt">
      <!-- university,faculty,course starts -->
      <div class="card-sinfo">
        <div class="row no-gutters">
          <div class="col-md-4 card-items">
            <div class="label">
              Applicant Name:
            </div>
            <div class="value">
              Name
            </div>
          </div>
          <div class="col-md-4 card-items">
            <div class="label">
              Gender:
            </div>
            <div class="value">
              Gender
            </div>
          </div>
          <div class="col-md-4 card-items">
            <div class="label">
              Date of Birth:
            </div>
            <div class="value">
              00-00-0000
            </div>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="col-md-6 card-items">
            <div class="label">
              Mobile Number:
            </div>
            <div class="value">
              99999 99999
            </div>
          </div>
          <div class="col-md-6 card-items">
            <div class="label">
              Email ID:
            </div>
            <div class="value">
              dnext@mkcl.org
            </div>
          </div>
        </div>
        
        <div class="row no-gutters">
          <div class="col-md-4 card-items">
            <div class="label">
              State:
            </div>
            <div class="value">
              Maharashtra
            </div>
          </div>
          <div class="col-md-4 card-items">
            <div class="label">
              District:
            </div>
            <div class="value">
              Thane
            </div>
          </div>
          <div class="col-md-4 card-items">
            <div class="label">
              Pincode:
            </div>
            <div class="value">
              400 000
            </div>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="col-md-12 card-items">
            <div class="label">
              Education Details:
            </div>
            <div class="value">
              B.E/ B.Tech 1st Year
            </div>
          </div>
        </div>
      </div>

      <!-- university,faculty,course ends -->
      <!-- Main table element starts-->
      <div
        class="table-holder"
        :class="{ 'type-cards': layout === 'Card' }"
      >
        <div
          class="card m-3"
          style="width: 18rem"
          v-if="buttonFlag"
        >
          <div class="card-body">
            <h5 class="card-title td-data">
              {{ $t("studentDetail.comingSoon") }}
            </h5>
          </div>
        </div>

        <div
          class="table-responsive"
          v-else
        >
          <b-table
            show-empty
            :items="Papers"
            :fields="fields1"
          >
            <!-- :filter="filter"
                  @filtered="onFiltered" -->
            <template
              s
              v-slot:cell(paper.displayName)="data"
            >
              <div
                data-text="विषयाचे नाव/Paper Name:"
                class="td-data"
              />
              {{ data.value }}
            </template>

            <template v-slot:cell(Exam)="data">
              <form
                :id="'myform' + data.item.epID"
                method="POST"
                action="https://mkcl.examlive.org/gateway/exam"
              >
                <input
                  type="hidden"
                  name="epID"
                  :value="data.item.epID"
                >
                <input
                  type="hidden"
                  name="ccode"
                  :value="userDetails[0].userName"
                >
                <input
                  type="hidden"
                  name="pID"
                  value="4"
                >
                <input
                  type="hidden"
                  name="token"
                  :value="token"
                >
                <input
                  type="hidden"
                  name="rUrl"
                  value="https://mockexams.mkcl.org/examResponseServer"
                >
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
            <hr>
            <template
              s
              v-slot:cell(marksObtained)="data"
            >
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
    </div>
  </div>
</template>

<script>
import Response from '@/plugins/response.js'
import MQL from '@/plugins/mql.js'
import moment from 'moment'
import Vue from 'vue'
// import { delete } from "vue/types/umd";
export default {
  data () {
    return {
      layout: 'Card',
      examUrl: 'https://mkcl.examlive.org/gateway/exam',
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
          selectedPaperDetails: { candidateExamDetails: {} }
        }
      ],
      userName: '',
      universities: [],
      faculties: [],
      isSuccessfulEntryInOES: false,
      loginCanidateAttemptedPapers: null,
      loginCanidateAttemptedPapersCountByPaperId: null,
      isSuccessfulResponse: null,
      attemptDetails: [],
      defaultSchool: {
        paper: {
          paperName: 'Coming Soon!!!!',
          displayName: 'Coming Soon!!!!'
        }
      },
      defaultPaper1: {
        _id: '5f62022e7daab01ef9a1128b',
        paper: {
          paperName: 'KKSU_Paper_1_Mock',
          displayName: 'KKSU Paper-1 Mock'
        },
        totalItems: '25',
        paperTotalMarks: '20',
        minimumPassingMarks: '',
        paperDuration: '30 min',
        paperId: '45671',
        paperCode: 'KKSU_Paper_1_Mock',
        paperAbbreviation: 'KKSU_Paper_1_Mock',
        isEnabled: true,
        epID: 45645,
        examEventId: 6,
        examVenueCode: 'vvmkcl',
        candidateExamDetails: {
          mockExamDetails: {
            ptm: '',
            m: ''
          },
          totalItems: '25',
          paperTotalMarks: '20',
          minimumPassingMarks: '',
          paperDuration: '30 min',
          paperId: '45671',
          examEventId: 6,
          examVenueCode: 'vvmkcl',
          paperCode: 'KKSU_Paper_1_Mock',
          paperAbbreviation: 'KKSU_Paper_1_Mock',
          epID: 45645
        }
      },
      defaultPaper2: {
        _id: '5f62022e7daab01ef9a1128b',
        paper: {
          paperName: 'KKSU_Yoga_Mock',
          displayName: 'KKSU Yoga Mock'
        },
        totalItems: '25',
        paperTotalMarks: '20',
        minimumPassingMarks: '',
        paperDuration: '30 min',
        paperId: '45672',
        paperCode: 'KKSU_Yoga_Mock',
        paperAbbreviation: 'KKSU_Yoga_Mock',
        isEnabled: true,
        epID: 45644,
        examEventId: 6,
        examVenueCode: 'vvmkcl',
        candidateExamDetails: {
          mockExamDetails: {
            ptm: '',
            m: ''
          },
          totalItems: '25',
          paperTotalMarks: '20',
          minimumPassingMarks: '',
          paperDuration: '30 min',
          paperId: '45671',
          examEventId: 6,
          examVenueCode: 'vvmkcl',
          paperCode: 'KKSU_Yoga_Mock',
          paperAbbreviation: 'KKSU_Yoga_Mock',
          epID: 45644
        }
      },

      defaultPaper3: {
        _id: '5f62022e7daab01ef9a1128b',
        paper: {
          paperName: 'KKSU_Sanskrit_Mock_Final',
          displayName: 'KKSU Sanskrit Mock-Final'
        },
        totalItems: '25',
        paperTotalMarks: '20',
        minimumPassingMarks: '',
        paperDuration: '30 min',
        paperId: '45673',
        paperCode: 'KKSU_Sanskrit_Mock_Final',
        paperAbbreviation: 'KKSU_Sanskrit_Mock_Final',
        isEnabled: true,
        epID: 45643,
        examEventId: 6,
        examVenueCode: 'vvmkcl',
        candidateExamDetails: {
          mockExamDetails: {
            ptm: '',
            m: ''
          },
          totalItems: '25',
          paperTotalMarks: '20',
          minimumPassingMarks: '',
          paperDuration: '30 min',
          paperId: '45673',
          examEventId: 6,
          examVenueCode: 'vvmkcl',
          paperCode: 'KKSU_Sanskrit_Mock_Final',
          paperAbbreviation: 'KKSU_Sanskrit_Mock_Final',
          epID: 45643
        }
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
      mobileNumber: '',
      buttonFlag: false,
      courses: [],
      showTable: false,
      universityId: '',
      facultyId: '',
      courseId: '',
      paperId: '',
      paperName: '',
      categoryName: '',
      educationLevel: [],
      classes: [],
      educationLevelFlag: false,
      attemptDate: '',
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      years: [
        {
          coursePart: ''
        }
      ],
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
        // { mediumId: 2, mediumName: "Hindi" },
      ],
      showGuardianFlag: false,
      Papers: [],
      fields1: [
        {
          key: 'paper.displayName',
          label: this.$t('studentDetail.paperName')
        },

        {
          key: 'Exam',
          label: this.$t('studentDetail.exam'),
          class: 'td-action'
        },
        {
          key: 'marksObtained',
          label: this.$t('studentDetail.markObtained')
        },
        {
          key: 'certificationLink',
          label: this.$t('studentDetail.certificationLink')
        }
      ],
      fields2: [
        'SrNo',
        {
          key: 'paper.paperName',
          label: 'Paper Name'
        },
        {
          key: 'ed',
          label: 'Attempt Date'
        },
        {
          key: 'pd',
          label: 'Paper Duration'
        },
        {
          key: 'an',
          label: 'Attempt Number',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'ptm',
          label: 'Total Marks'
        },
        {
          key: 'm',
          label: 'Obtained Marks'
        }
      ]
    }
  },
  async created () {
    const vm = this

    vm.token = sessionStorage.getItem('user-token')
    // await vm.getPaperDetails();
    await vm.getUserDetails()
  },
  methods: {

    getUserDetails () {
      // return new Promise((resolve) => {
      // const vm = this
      this.mobileNumber = '9993860140'
      // new MQL()
      //   .setActivity('o.[query_29FEeTzI2PoubDvgSxG7KZY0T3X]')
      //   .fetch()
      //   .setData({ userName: this.mobileNumber })
      //   .then((rs) => {
      //     let res = rs.getActivity('query_29FEeTzI2PoubDvgSxG7KZY0T3X', true)
      //     if (rs.isValid('query_29FEeTzI2PoubDvgSxG7KZY0T3X')) {
      //       vm.userDetails = res

      //       console.log('user details', vm.userDetails)

      // vm.userDetails[0].dateOfBirth =
      //   vm.userDetails[0].dateOfBirth + " " + "00:00:00";
      // resolve()
      //   } else {
      //     rs.showErrorToast('query_29FEeTzI2PoubDvgSxG7KZY0T3X')
      //   }
      // })
      // })
      new MQL()
        .setActivity('o.[query_29FEeTzI2PoubDvgSxG7KZY0T3X]')
        .setData({ userName: this.mobileNumber })
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('query_29FEeTzI2PoubDvgSxG7KZY0T3X', true)
          if (rs.isValid('query_29FEeTzI2PoubDvgSxG7KZY0T3X')) {
            if (res.result) {
              console.log(res.result)
              this.$router.push({
                name: 'success'
              })
            }
          } else {
            rs.showErrorToast('query_29FEeTzI2PoubDvgSxG7KZY0T3X')
          }
        })
    }

  }
}
</script>

<style>
.isDisabled {
  color: currentColor;
  cursor: not-allowed;
  opacity: 0.5;
  text-decoration: none;
}
</style>

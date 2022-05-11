<template>
  <div>
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col-sm">
          <h3 class="title ml-3">View Students</h3>
        </div>
        <div class="col-sm-auto page-action">
          <!-- <router-link
            to="/newcase"
            class="btn btn-primary"
          >
            <i class="mdi mdi-plus" /> Add New Case
          </router-link> -->
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="panel panel-default">
            <div class="panel-body text-left">
             
              <h4 class="text-primary">Exams Attempted:{{ count }}</h4>  
              
              <!-- User Interface controls -->
              <b-row class="filter-holder">
                <b-col md="4" class="pr-0">
                  <div class="form-group form-fsearch">
                    <b-form-input
                      v-model="filter"
                      placeholder="Type to Search"
                    />
                    <b-button
                      :disabled="!filter"
                      @click="
                        filter = '';
                        getAllStudentMarksByAdmin();
                      "
                      variant="close"
                      size="sm"
                    >
                      <i class="mdi mdi-close" />
                    </b-button>
                  </div>
                </b-col>
                <b-col md="2">
                  <button
                    type="button"
                    class="btn mr-2 btn-primary"
                    @click="
                      filter.trim() == '' || filter == null
                        ? searchError()
                        : getAllStudentMarksByAdmin()
                    "
                  >
                    search
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="reloadPage()"
                  >
                    Reset search
                  </button>
                </b-col>
                <b-col md="4">
                  <div class="form-group form-row align-items-center">
                    <div class="col-auto">
                      Filter By
                    </div>
                    <div class="col">
                      <b-form-select
                        v-model="filterBy"
                        :options="filterOptions"
                        @change="(currentPage = 1), getFilterByData()"
                      />
                    </div>
                  </div>
                </b-col>
                <b-col md="2">
                  <div class="form-group form-row align-items-center">
                    <div class="col-auto">
                      Per Page
                    </div>
                    <div class="col">
                      <b-form-select
                        v-model="perPage"
                        :options="pageOptions"
                        @change="
                          currentPage =
                            perPage > totalRows
                              ? (currentPage = 1)
                              : currentPage;
                          getAllStudentMarksByAdmin();
                        "
                      />
                    </div>
                  </div>
                </b-col>
              </b-row>
              <!-- Main table element -->

              <div class="table-responsive">
                <b-table
                  show-empty
                  stacked="md"
                  :items="allStudents"
                  :fields="fields"
                  :per-page="perPage"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  :sort-direction="sortDirection"
                >
                  <template s v-slot:cell(fullName)="data">
                    {{ data.value }}
                  </template>
                  <template s v-slot:cell(selectedUniversity)="data">
                    {{ data.value }}
                  </template>

                  <template s v-slot:cell(selectedFaculty)="data">
                    {{ data.value }}
                  </template>

                  <template s v-slot:cell(selectedCourse)="data">
                    {{ data.value }}
                  </template>
                  <!-- <template s v-slot:cell(selectedYear)="data">
                    {{ data.value }}
                  </template> -->
                  <template s v-slot:cell(selectedPaperDetails.paperName)="data">
                    {{ data.value }}
                  </template>
                  <template
                    s
                    v-slot:cell(selectedPaperDetails.candidateExamDetails.mockExamDetails.m)="
                      data
                    "
                  >
                    {{ data.value }}
                  </template>
                  <template
                    s
                    v-slot:cell(selectedPaperDetails.candidateExamDetails.mockExamDetails.ptm)="
                      data
                    "
                  >
                    {{ data.value }}
                  </template>
                </b-table>
              </div>
              <div class="pagination-holder">
                <b-pagination
                  v-if="totalRows > perPage"
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  @input="getAllStudentMarksByAdmin()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import JsonCSV from 'vue-json-csv'
// import CloneDeep from "clone-deep";
// import JsonExcel from 'vue-json-excel'
import MQL from "@/plugins/mql.js";
// import { delete } from 'vue/types/umd';
// import { delete } from 'vue/types/umd';
export default {
  data() {
    return {
      docPhoneNoforCSV: "",
      json_data: [],
      allStudents: [
        {
          fullName: "",
          selectedUniversity: "",
          selectedFaculty: "",
          selectedCourse: "",
          selectedYear: "",
          selectedPaper: "",
        },
      ],
      resultFound: true,
      filterBy: "",
      filterOptions: [],
      student: {},
      search: "",
      fields: [
        "SrNo",
        {
          key: "fullName",
          label: "Full Name",
          sortable: true,
          class: "text-center",
          sortDirection: "desc",
        },
        {
          key: "selectedUniversity",
          label: "University",
          sortable: true,
          class: "text-center",
          sortDirection: "desc",
        },
        {
          key: "selectedFaculty",
          label: "Faculty",
          sortable: true,
          class: "text-center",
          sortDirection: "desc",
        },
        {
          key: "selectedCourse",
          label: "Course",
          sortable: true,
          class: "text-center",
          sortDirection: "desc",
        },
        // {
        //   key: "selectedYear",
        //   label: "Year",
        //   sortable: true,
        //   class: "text-center",
        //   sortDirection: "desc",
        // },
        {
          key: "selectedPaperDetails.paperName",
          label: "Paper",
          sortable: true,
          class: "text-center",
          sortDirection: "desc",
        },
        {
          key: "selectedPaperDetails.candidateExamDetails.mockExamDetails.m",
          label: "Obtained Marks",
          sortable: true,
          class: "text-center",
          sortDirection: "desc",
        },
        {
          key: "selectedPaperDetails.candidateExamDetails.mockExamDetails.ptm",
          label: "Total Marks",
          sortable: true,
          class: "text-center",
          sortDirection: "desc",
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20],
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: "",
      count: 0,
    };
  },
  methods: {
    searchError() {
      this.$toasted.error(
        "Search text cannot be empty! Please enter a valid search text.",
        {
          theme: "bubble",
          position: "top-center",
          duration: 3000,
        }
      );
    },
    reloadPage() {
      window.location.reload();
    },
    getAllStudentMarksByAdmin() {
      const vm = this;
      if (!vm.filterBy) {
        new MQL()
          .setActivity("o.[query_1hzgWHyzvPujgdBMSoVqqVRkRwy]")
          .setData({
            filterSearch: vm.filter,
            skip: (vm.currentPage - 1) * vm.perPage,
            limit: vm.perPage,
          })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("query_1hzgWHyzvPujgdBMSoVqqVRkRwy", true);
            if (rs.isValid("query_1hzgWHyzvPujgdBMSoVqqVRkRwy")) {
              vm.allStudents = res;
              // console.log("all", vm.allStudents);
              // vm.totalRows = res.length;
              for (var i = 0; i < vm.allStudents.length; i++) {
                vm.allStudents[i].SrNo =
                  (vm.currentPage - 1) * vm.perPage + i + 1;
                vm.allStudents[i].selectedUniversity =
                  vm.allStudents[i].selectedUniversity.universityName;
                vm.allStudents[i].selectedFaculty =
                  vm.allStudents[i].selectedFaculty.facultyName;
                vm.allStudents[i].selectedCourse =
                  vm.allStudents[i].selectedCourse.courseName;
                //  if(vm.allStudents[i].selectedYear!==null){
                //          vm.allStudents[i].selectedYear =
                //     vm.allStudents[i].selectedYear.coursePart;
                //     }
              }

              new MQL()
                .setActivity("o.[query_1hzh4M0x8ukMg1Yebgcn1CBzS3A]")
                .setData({ filterSearch: vm.filter })
                .fetch()
                .then((rs) => {
                  let res = rs.getActivity(
                    "query_1hzh4M0x8ukMg1Yebgcn1CBzS3A",
                    true
                  );
                  if (rs.isValid("query_1hzh4M0x8ukMg1Yebgcn1CBzS3A")) {
                    // console.log("rs count", res[0].count);
                    vm.totalRows = res[0].count;
                    vm.count = res[0].count;
                  } else {
                    rs.showErrorToast("query_1hzh4M0x8ukMg1Yebgcn1CBzS3A");
                  }
                });
            } else {
              rs.showErrorToast("query_1hzgWHyzvPujgdBMSoVqqVRkRwy");
            }
          });
      } else {
        vm.getFilterByData();
      }
    },
    getPaperDetails() {
      const vm = this;
      new MQL()
        .setActivity("o.[query_1haonsxllTD5dvmkR0wANPzxxSN]")
        .fetch()
        .then((rs) => {
          let res = rs.getActivity("query_1haonsxllTD5dvmkR0wANPzxxSN", true);
          if (rs.isValid("query_1haonsxllTD5dvmkR0wANPzxxSN")) {
            // console.log(res);
            if (res != null) {
              for (var i = 0; i < res.length; i++) {
                vm.allStudents[i].selectedPaper = res[i].paperName;
              }
              // console.log('all',vm.allStudents)
            }
          } else {
            rs.showErrorToast("query_1haonsxllTD5dvmkR0wANPzxxSN");
          }
        });
    },
    getFilterByData() {
      const vm = this;
      if (!vm.filterBy) {
        vm.getAllStudentMarksByAdmin();
      } else {
        // console.log("filterby", vm.filterBy);
        new MQL()
          .setActivity("o.[query_1hzfTRhpAJAHqA7uVDihyLfqkiO]")
          .setData({
            filterSearch: vm.filter.trim(),
            filterBy: vm.filterBy,
            skip: (vm.currentPage - 1) * vm.perPage,
            limit: vm.perPage,
          })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("query_1hzfTRhpAJAHqA7uVDihyLfqkiO", true);
            if (rs.isValid("query_1hzfTRhpAJAHqA7uVDihyLfqkiO")) {
              // console.log("res", res);
              if (res != null) {
                vm.allStudents = res;
                // console.log("console", vm.allStudents);
                for (var i = 0; i < vm.allStudents.length; i++) {
                  vm.allStudents[i].SrNo =
                    (vm.currentPage - 1) * vm.perPage + i + 1;
                  vm.allStudents[i].selectedUniversity =
                    vm.allStudents[i].selectedUniversity.universityName;
                  vm.allStudents[i].selectedFaculty =
                    vm.allStudents[i].selectedFaculty.facultyName;
                  vm.allStudents[i].selectedCourse =
                    vm.allStudents[i].selectedCourse.courseFullName;
                  // if(vm.allStudents[i].selectedYear!==null){
                  //      vm.allStudents[i].selectedYear =
                  // vm.allStudents[i].selectedYear.coursePart;
                  // }
                }
              }
              new MQL()
                .setActivity("o.[query_1hzgowtNALJNlckZe6XIFU4fpmm]")
                .setData({ filterSearch: vm.filter, filterBy: vm.filterBy })
                .fetch()
                .then((rs) => {
                  let res = rs.getActivity(
                    "query_1hzgowtNALJNlckZe6XIFU4fpmm",
                    true
                  );
                  if (rs.isValid("query_1hzgowtNALJNlckZe6XIFU4fpmm")) {
                    // console.log("res cnt", res);
                    if (res != null) {
                      vm.totalRows = res[0].count;
                      vm.count = res[0].count;
                    }
                  } else {
                    rs.showErrorToast("query_1hzgowtNALJNlckZe6XIFU4fpmm");
                  }
                });
            } else {
              rs.showErrorToast("query_1hzfTRhpAJAHqA7uVDihyLfqkiO");
            }
          });
      }
    },
    getAllUniversities() {
      const vm = this;
      new MQL()
        .setActivity("o.[query_1hYHKHUKdSeCkvVQ6OOrCX108ux]")
        // .setData(data)
        .fetch()
        .then((rs) => {
          let res = rs.getActivity("query_1hYHKHUKdSeCkvVQ6OOrCX108ux", true);
          if (rs.isValid("query_1hYHKHUKdSeCkvVQ6OOrCX108ux")) {
            for (var i = 0; i < res.length; i++) {
              vm.filterOptions.push(res[i].universityName);
            }
          } else {
            rs.showErrorToast("query_1hYHKHUKdSeCkvVQ6OOrCX108ux");
          }
        });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      // console.log("filteredItems", filteredItems);
      this.totalRows = filteredItems.length;
      if (this.allStudents.length === filteredItems.length) {
        this.totalRows = this.count;
      }
      this.currentPage = 1;
    },
  },
  mounted() {
    const vm = this;
    vm.getAllStudentMarksByAdmin();
    vm.getAllUniversities();
    vm.getPaperDetails();
  },
  computed: {
    filteredList() {
      // const vm = this;
      // if (vm.search === "") {
      //   vm.resultFound = true;
      //   return vm.allStudents;
      // } else {
      //   if (vm.allStudents) {
      //     const searchedUpdates = vm.allStudents.filter((patient) => {
      //       if (!(patient.mobileNumber === undefined)) {
      //         return patient.mobileNumber.includes(vm.search);
      //       }
      //     });
      //     vm.resultFound = !!searchedUpdates.length;
      //     return searchedUpdates;
      //   }
      // }
    },
  },
};
</script>

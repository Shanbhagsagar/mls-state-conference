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
            <div class="panel-body">
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
                        getAllStudents();
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
                        : getAllStudents()
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
                          getAllStudents();
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
                  <template s v-slot:cell(selectedPaper)="data">
                    {{ data.value }}
                  </template>
                  <template v-slot:cell(Action)="data">
                    <button
                      v-show="!data.item.isEnabled"
                      type="submit"
                      class="btn btn-success btn-sm"
                      @click="towardsChangeFlag(data.item)"
                    >
                      <i class="mdi mdi-image-edit-outline" />Enable
                    </button>

                    <button
                      v-show="data.item.isEnabled"
                      type="submit"
                      class="btn btn-danger btn-sm"
                      @click="towardsChangeFlag(data.item)"
                    >
                      <i class="mdi mdi-image-edit-outline" />Disable
                    </button>
                  </template>
                  <template v-slot:cell(ViewDetails)="data">
                    <button
                      type="submit"
                      class="btn btn-info btn-sm"
                      @click="towardsViewDetails(data.item)"
                    >
                      <i class="mdi mdi-image-edit-outline" />View Details
                    </button>
                  </template>
                </b-table>
              </div>
              <div class="pagination-holder">
                <b-pagination
                  v-if="totalRows > perPage"
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  @input="getAllStudents()"
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
          key: "selectedPaper",
          label: "Paper",
          sortable: true,
          class: "text-center",
          sortDirection: "desc",
        },
        { key: "Action", label: "Action", class: "td-action" },
        { key: "ViewDetails", label: "View Details", class: "td-action" },
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
    getAllStudents() {
      const vm = this;
      if (!vm.filterBy) {
        new MQL()
          .setActivity("o.[query_1hg58QgxTWyEOjh9HTvFLhsT4u7]")
          .setData({
            filterSearch: vm.filter,
            skip: (vm.currentPage - 1) * vm.perPage,
            limit: vm.perPage,
          })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("query_1hg58QgxTWyEOjh9HTvFLhsT4u7", true);
            if (rs.isValid("query_1hg58QgxTWyEOjh9HTvFLhsT4u7")) {
              vm.allStudents = res;
              // console.log("all", vm.allStudents);
              // vm.totalRows = res.length;
              for (var i = 0; i < vm.allStudents.length; i++) {
                vm.allStudents[i].SrNo =
                  (vm.currentPage - 1) * vm.perPage + i + 1;
                if (
                  vm.allStudents[i].selectedUniversity !== null &&
                  vm.allStudents[i].selectedFaculty !== null &&
                  vm.allStudents[i].selectedCourse !== null
                ) {
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
                } else {
                  vm.allStudents[i].selectedUniversity = "N/A";
                  vm.allStudents[i].selectedFaculty = "N/A";
                  vm.allStudents[i].selectedCourse = "N/A";
                }
              }

              new MQL()
                .setActivity("o.[query_1hgFHAXEFvGmPG3T07itP83zzcS]")
                .setData({ filterSearch: vm.filter })
                .fetch()
                .then((rs) => {
                  let res = rs.getActivity(
                    "query_1hgFHAXEFvGmPG3T07itP83zzcS",
                    true
                  );
                  if (rs.isValid("query_1hgFHAXEFvGmPG3T07itP83zzcS")) {
                    // console.log("rs count", res[0].count);
                    vm.totalRows = res[0].count;
                    vm.count = res[0].count;
                  } else {
                    rs.showErrorToast("query_1hgFHAXEFvGmPG3T07itP83zzcS");
                  }
                });
            } else {
              rs.showErrorToast("query_1hg58QgxTWyEOjh9HTvFLhsT4u7");
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
        vm.getAllStudents();
      } else {
        // console.log("filterby", vm.filterBy);
        new MQL()
          .setActivity("o.[query_1hgGLyJQ7XoBg3onEHJJiymH2Ae]")
          .setData({
            filterSearch: vm.filter.trim(),
            filterBy: vm.filterBy,
            skip: (vm.currentPage - 1) * vm.perPage,
            limit: vm.perPage,
          })
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("query_1hgGLyJQ7XoBg3onEHJJiymH2Ae", true);
            if (rs.isValid("query_1hgGLyJQ7XoBg3onEHJJiymH2Ae")) {
              // console.log("res", res);
              if (res != null) {
                vm.allStudents = res;
                // console.log("console", vm.allStudents);
                for (var i = 0; i < vm.allStudents.length; i++) {
                  vm.allStudents[i].SrNo =
                    (vm.currentPage - 1) * vm.perPage + i + 1;
                  if (
                    vm.allStudents[i].selectedUniversity !== null &&
                    vm.allStudents[i].selectedFaculty !== null &&
                    vm.allStudents[i].selectedCourse !== null
                  ) {
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
                  } else {
                    vm.allStudents[i].selectedUniversity = "N/A";
                    vm.allStudents[i].selectedFaculty = "N/A";
                    vm.allStudents[i].selectedCourse = "N/A";
                  }
                }
              }
              new MQL()
                .setActivity("o.[query_1hgGoZBNMR0FqtixF2atLSvFoEv]")
                .setData({ filterSearch: vm.filter, filterBy: vm.filterBy })
                .fetch()
                .then((rs) => {
                  let res = rs.getActivity(
                    "query_1hgGoZBNMR0FqtixF2atLSvFoEv",
                    true
                  );
                  if (rs.isValid("query_1hgGoZBNMR0FqtixF2atLSvFoEv")) {
                    // console.log("res cnt", res);
                    if (res != null) {
                      vm.totalRows = res[0].count;
                      vm.count = res[0].count;
                    }
                  } else {
                    rs.showErrorToast("query_1hgGoZBNMR0FqtixF2atLSvFoEv");
                  }
                });
            } else {
              rs.showErrorToast("query_1hgGLyJQ7XoBg3onEHJJiymH2Ae");
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
    // toUpdateDonor(donor) {
    //   const vm = this;
    //   // console.log(donor);
    //   vm.$router.push({
    //     name: "updateDonor",
    //     params: { mobileNumber: donor.mobileNumber },
    //   });
    // },
    towardsChangeFlag(student) {
      const vm = this;
      // console.log(student)
      if (student.isEnabled) {
        student.isEnabled = false;
      } else {
        student.isEnabled = true;
      }
      let SrNo = student.SrNo;
      delete student.SrNo;
      delete student._id;
      new MQL()
        .setActivity("o.[UpdateIsEnabledFlag]")
        .setData({ username: student.username, isEnabled: student.isEnabled })
        .fetch()
        .then((rs) => {
          let res = rs.getActivity("UpdateIsEnabledFlag", true);
          if (rs.isValid("UpdateIsEnabledFlag")) {
            vm.getAllStudents();
          } else {
            rs.showErrorToast("UpdateIsEnabledFlag");
          }
        });
    },
    towardsViewDetails(student) {
      const vm = this;
      vm.$router.push({
        name: "ViewStudentDetailsByAdmin",
        params: { mobileNumber: student.mobileNumber },
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
    vm.getAllStudents();
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

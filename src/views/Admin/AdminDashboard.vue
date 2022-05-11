<template>
  <div>
    <div class="page-header">
      <h1 class="title">
        Welcome to your Dashboard
      </h1>
    </div>
    <div class="container-fluid">
      <div class="row stat-count">
        <div class="col-md-1" />
        <div class="col-md-3 col-xl-5">
          <div
            class="cards card-purple collapsed"
            v-b-toggle.showstats-2
          >
            <div class="card-stat-holder">
              <div class="card-count">
                {{ studentCount }}
              </div>
              <div class="card-text">
                Total Registrations
              </div>
              <i class="mdi mdi-human" />
            </div>
          </div>
        </div>

        <div class="col-md-3 col-xl-5">
          <div
            class="cards card-blue collapsed"
            v-b-toggle.showstats-2
          >
            <div class="card-stat-holder">
              <div class="card-count">
                {{ takeExamCount }}
              </div>
              <div class="card-text">
                Take Exam
              </div>
              <i class="mdi mdi-human" />
            </div>
          </div>
        </div>
      </div>
      <div class="row stat-count">
        <div class="col-md-1" />
        <div class="col-md-3 col-xl-5">
          <div
            class="cards card-green collapsed"
            v-b-toggle.showstats-2
          >
            <div class="card-stat-holder">
              <div class="card-count">
                {{ examEndedCount }}
              </div>
              <div class="card-text">
                Exam Ended
              </div>
              <i class="mdi mdi-human" />
            </div>
          </div>
        </div>
        <div class="col-md-3 col-xl-5">
          <div
            class="cards card-red collapsed"
            v-b-toggle.showstats-2
          >
            <div class="card-stat-holder">
              <div class="card-count">
                {{ examNotEndedCount }}
              </div>
              <div class="card-text">
                Exam Not Ended
              </div>
              <i class="mdi mdi-human" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import Response from '@/plugins/response.js'
import MQL from '@/plugins/mql.js'
export default {
  data () {
    return {
      studentCount: null,
      takeExamCount: null,
      examEndedCount: null,
      examNotEndedCount: null
    }
  },
  methods: {
    getRegistrationCount () {
      return new Promise((resolve) => {
        const vm = this
        new MQL()
          .setActivity('o.[getAllRegisteredStudetnsCount]')
          //   .setData(data)
          .fetch()
          .then((rs) => {
            let res = rs.getActivity('getAllRegisteredStudetnsCount', true)
            if (rs.isValid('getAllRegisteredStudetnsCount')) {
            //   console.log(res);
              if (res !== null) {
                vm.studentCount = res.result[0].count
              }
            } else {
              rs.showErrorToast('getAllRegisteredStudetnsCount')
            }
            resolve()
          })
      })
    },
    getTakeExamCount () {
      return new Promise((resolve) => {
        const vm = this
        new MQL()
          .setActivity('o.[getTakeExamCount]')
          // .setData(data)
          .fetch()
          .then((rs) => {
            let res = rs.getActivity('getTakeExamCount', true)
            if (rs.isValid('getTakeExamCount')) {
            //   console.log("take exam", res);
              if (res !== null) {
                vm.takeExamCount = res.result.length
              }
            } else {
              rs.showErrorToast('getTakeExamCount')
            }
            resolve()
          })
      })
    },
    getExamEndedCount () {
      return new Promise((resolve) => {
        const vm = this
        new MQL()
          .setActivity('o.[getExamEndedCount]')
          //   .setData(data)
          .fetch()
          .then((rs) => {
            let res = rs.getActivity('getExamEndedCount', true)
            if (rs.isValid('getExamEndedCount')) {
            //   console.log("exam ended", res);
              if (res !== null) {
                vm.examEndedCount = res.result[0].count
              }
            } else {
              rs.showErrorToast('getExamEndedCount')
            }
            resolve()
          })
      })
    },
    getExamNotEndedCount () {
      return new Promise((resolve) => {
        const vm = this
        new MQL()
          .setActivity('o.[getExamNotEndedCount]')
          //    .setData(data)
          .fetch()
          .then((rs) => {
            let res = rs.getActivity('getExamNotEndedCount', true)
            if (rs.isValid('getExamNotEndedCount')) {
            //   console.log(res);
              if (res !== null) {
                vm.examNotEndedCount = res.result[0].count
              }
            } else {
              rs.showErrorToast('getExamNotEndedCount')
            }
            resolve()
          })
      })
    }
  },
  async created () {
    const vm = this
    await vm.getRegistrationCount()
    await vm.getTakeExamCount()
    await vm.getExamEndedCount()
    await vm.getExamNotEndedCount()
  }
}
</script>

import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store"

Vue.use(Router)

function loadView(view) {
  return () => import( /* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

function loadApplicantView(view) {
  return () => import( /* webpackChunkName: "view-[request]" */ `@/views/RegistrationManagement/${view}.vue`)
}

function loadStudentView(view) {
  return () => import( /* webpackChunkName: "view-[request]" */ `@/views/Student/${view}.vue`)
}

function loadAdminView(view) {
  return () => import( /* webpackChunkName: "view-[request]" */ `@/views/Admin/${view}.vue`)
}

function loadCommonView(view) {
  return () => import( /* webpackChunkName: "view-[request]" */ `@/views/Common/${view}.vue`)
}

const router = new Router({
  routes: [{
      path: '/studentregistration',
      name: 'StudentRegistration',
      component: loadStudentView('StudentRegistration'),
      meta: {
        title: 'Registration | MKCL DNExT',
        icon: 'mdi mdi-information-variant',
      },
    },
    // {
    //   path: '/registration',
    //   name: 'Registration',
    //   component: loadApplicantView('Registration'),
    //   meta: {
    //     title: 'Delegate Registration',
    //     icon: 'mdi mdi-information-variant',
    //   },
    // },
    {
      path: '/applicantDetails',
      name: 'ApplicantDetails',
      component: loadView('Applicant/ApplicantDetails'),
      meta: {
        title: 'ApplicantDetails | MKCL DNExT',
        icon: 'mdi mdi-information-variant',
        requiresAuth: true
      },
    },
    {
      path: '/registration',
      name: 'Registration',
      component: loadApplicantView('Registration'),
      meta: {
        title: 'Delegate Registration',
        icon: 'mdi mdi-information-variant',
      },
    },
    {
      path: '/updateregistration',
      name: 'Update Registration',
      component: loadApplicantView('UpdateRegistration'),
      meta: {
        title: ' Update Registration',
        icon: 'mdi mdi-information-variant',
      },
    },
    {
      path: '/',
      name: 'Login',
      component: loadCommonView('Login'),
      meta: {
        title: 'Maharashtra Legislature Secretariat',
        icon: 'mdi mdi-information-variant',
      },
      beforeEnter(routeTo, routeFrom, next) {
        store.dispatch('AUTH_LOGOUT').then(() => {
          next()
        })
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: loadCommonView('Login'),
      meta: {
        title: 'Login | MKCL DNExT',
        icon: 'mdi mdi-information-variant',
      },
    },
    {
      path: '*', redirect: '/',
      name: 'Login',
      component: loadCommonView('Login'),
      meta: {
        title: 'Login',
        icon: 'mdi mdi-information-variant',
      },
      beforeEnter(routeTo, routeFrom, next) {
        store.dispatch('AUTH_LOGOUT').then(() => {
          next()
        })
      },
    },
    {
      path: '/logout',
      name: 'logout',
      component: loadCommonView('Login'),
      meta: {
        title: 'Logout',
        icon: 'mdi mdi-information-variant',
      },
      beforeEnter(routeTo, routeFrom, next) {
        store.dispatch('AUTH_LOGOUT').then(() => {
          next()
        })
      },
    },

    {
      path: '/about',
      name: 'About',
      component: loadView('About'),
      meta: {
        title: 'About',
        icon: 'mdi mdi-information-variant',
      },
    },
    {
      path: '/HireUs',
      name: 'HireUs',
      component: loadView('HireUs'),
      meta: {
        title: 'HireUs',
        icon: 'mdi mdi-information-variant',
      },
    },
    {
      path: '/success',
      name: 'success',
      component: loadApplicantView('success'),
      meta: {
        title: 'Success | MKCL DNExT',
        icon: 'mdi mdi-information-variant',
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: loadApplicantView('Profile'),
      meta: {
        title: 'Profile',
        icon: 'mdi mdi-information-variant',
      },
    },
    {
      path: '/StudentDetails',
      name: 'StudentDetails',
      component: loadStudentView('StudentDetails'),
      meta: {
        title: 'StudentDetails',
        icon: 'mdi mdi-information-variant',
      },
    },
    {
      path: '/CdnUpload',
      name: 'CdnUpload',
      component: loadView('CdnUpload'),
      meta: {
        title: 'CdnUpload',
        icon: 'mdi mdi-information-variant',
      },
    },
    {
      path: '/termsandconditions',
      name: 'TermsAndConditions',
      component: loadStudentView('TermsAndConditions'),
      meta: {
        title: 'Terms And Conditions',
        icon: 'mdi mdi-information-variant',
      },
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: loadCommonView('ResetPassword'),
      meta: {
        title: 'Reset Password | MKCL DNExT',
        icon: 'mdi mdi-home-outline',
      },
    },
    {
      path: '/view-all-student-details',
      name: 'ViewAllStudentDetails',
      component: loadAdminView('ViewAllStudentDetails'),
      meta: {
        title: 'View All Student Details | MKCL DNExT',
        icon: 'mdi mdi-home-outline',
      },
    },
    {
      path: '/view-student-details-admin/:mobileNumber?',
      name: 'ViewStudentDetailsByAdmin',
      component: loadAdminView('ViewStudentDetailsByAdmin'),
      meta: {
        title: 'View Student Details By Admin | MKCL DNExT',
        icon: 'mdi mdi-home-outline',
      },
    },
    {
      path: '/view-student-details-marks-admin',
      name: 'ViewStudentMarksByAdmin',
      component: loadAdminView('ViewStudentMarksByAdmin'),
      meta: {
        title: 'View Student Details Marks By Admin | MKCL DNExT',
        icon: 'mdi mdi-home-outline',
      },
    },
    {
      path: '/admin-dashboard',
      name: 'AdminDashboard',
      component: loadAdminView('AdminDashboard'),
      meta: {
        title: 'Admin Dashboard | MKCL DNExT',
        icon: 'mdi mdi-home-outline',
      },
    },
    {
      path: '/mock-exam-paper-configuration',
      name: 'MockExamPaperConfig',
      component: loadAdminView('MockExamPaperConfig'),
      meta: {
        title: 'Admin Dashboard | MKCL DNExT',
        icon: 'mdi mdi-home-outline',
      },
    },
    
  ],
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (sessionStorage.getItem('user-token') == null) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

// router.beforeEach((to, from, next) => {
//   if (
//     store.state.roles.some((obj) => obj === "student") &&
//     (to.name === "StudentDetails"
//     )
//   ) {
//     next();
//   }else if(
//     store.state.roles.some((obj) => obj === "admin") &&
//     (
//     to.name === "AdminDashboard" ||  
//     to.name === "ViewAllStudentDetails" ||
//     to.name === "ViewStudentDetailsByAdmin" ||
//     to.name === "ViewStudentMarksByAdmin" ||
//     to.name === "MockExamPaperConfig"

//   )
//   ){
//     next();
//   }
//    else if (
//           to.name === "Registration" ||
//            to.name === 'ThankyouPageAfterRegistration' ||
//            to.name === 'About' ||
//            to.name === 'MKCLTRYHomePage' ||
//            to.name === 'RecipentRegistration' ||
//            to.name === 'StudentRegistration' ||
//            to.name === 'Login' ||
//            to.name === 'logout' ||
//            to.name === 'CdnUpload' ||
//            to.name === 'TermsAndConditions' ||
//            to.name === 'ResetPassword'||
//            to.name === "StudentDetails"
//          ) {
//            next()
//          } else {
//            next({
//              name: 'Login',
//            })
//          }
// });

export default router;
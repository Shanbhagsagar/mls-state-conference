
const mutations = {
  'app/MUTATE_PAGE_BLOCKER': (state, show) => {
    state.pageBlocker = show
  },
  'SET_ROLE': (state, role) => {
    state.roles.push(role)
  }
}

export default mutations

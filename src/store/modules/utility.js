import MQL from '@/plugins/mql.js'

export const actions = {
  getServerTime ({ commit }) {
    return new Promise(resolve => {
      new MQL()
        .setActivity('o.[GetCurrentDateAndTimeFromServer]')
      // .setData(data)
        .fetch()
        .then(rs => {
          let res = rs.getActivity('GetCurrentDateAndTimeFromServer', true)
          if (rs.isValid('GetCurrentDateAndTimeFromServer')) {
            resolve(res)
          } else {
            rs.showErrorToast('GetCurrentDateAndTimeFromServer')
          }
        })
    })
  }
}

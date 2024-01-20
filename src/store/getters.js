const getters = {
  getStateId: state => state.authData.state.id,
  getUserId: state => state.authData.userId,
  getIpaddress: state => 'http://103.209.36.58:9292/',
  Chairman: state => 1,
  Speaker: state => 1,
  Secretary: state => 1,
  Officials: state => 2
}


export default getters

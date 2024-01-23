const getters = {
  getStateId: state => state.authData.state.id,
  getUserId: state => state.authData.userId,
  getIpaddress: state => 'http://103.209.36.58:9292/',
  Chairman: state => 2,
  Speaker: state => 2,
  Secretary: state => 2,
  Officials: state => 2
}


export default getters

const getters = {
  getStateId: state => state.authData.state.id,
  getUserId: state => state.authData.userId,
  getIpaddress: state => 'http://103.209.36.58:9292/'
}


export default getters

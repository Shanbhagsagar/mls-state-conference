const getters = {
  getStateId: state => state.authData.state.id,
  getUserId: state => state.authData.userId,
  getIpaddress: state => 'http://172.1.0.81:9292/'
}


export default getters

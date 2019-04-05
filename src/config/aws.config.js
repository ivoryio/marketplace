import Amplify from 'aws-amplify'

const auth = require('./auth.config.json')
const apiEndpoints = require('./api.config.json')

export default Amplify.configure({
  Auth: auth,
  API: {
    endpoints: apiEndpoints.map(endpoint => ({
      ...endpoint
    }))
  }
})

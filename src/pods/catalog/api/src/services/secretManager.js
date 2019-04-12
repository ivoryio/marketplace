const AWS = require('aws-sdk')

function SecretManager () {
  let cachedHostname = null

  return {
    retrieve
  }

  async function retrieve (secretId) {
    const client = new AWS.SecretsManager({ region: 'us-east-1'})
    try {
      if( cachedHostname) {
        return cachedHostname
      }
      const response = await client.getSecretValue({ SecretId: secretId }).promise()
      
      if ('SecretString' in response) {
        cachedHostname = response.SecretString
        return cachedHostname
      } else {
        throw new Error('SecretString not found')
      }
    } catch (err) {
      throw err
    }
  }
}

module.exports = new SecretManager()

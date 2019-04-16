const AWS = require('aws-sdk')

let cachedHostname = null

module.exports = async (secretId) => {
  const client = new AWS.SecretsManager({ region: process.env.REGION })

  if (cachedHostname) {
    return cachedHostname
  }

  const response = await client.getSecretValue({ SecretId: secretId }).promise()
  if ('SecretString' in response) {
    cachedHostname = response.SecretString
    return cachedHostname
  } else {
    throw new Error(`SecretString with ${secretId} not found`)
  }
}
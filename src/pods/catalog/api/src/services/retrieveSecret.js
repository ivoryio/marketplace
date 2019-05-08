const SecretsManager = require('aws-sdk/clients/secretsmanager')

let cachedHostname = null

module.exports = async (secretId) => {
  const region = process.env.REGION
  const client = new SecretsManager({ region })

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
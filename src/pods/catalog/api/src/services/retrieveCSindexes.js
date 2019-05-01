const AWS = require('aws-sdk')

module.exports = async () => {
  const cloudsearch = new AWS.CloudSearch({ region: process.env.REGION })

  const params = { DomainName: process.env.CS_DOMAIN_NAME }

  const indexes = await cloudsearch.describeIndexFields(params).promise()
  const result = indexes.IndexFields.map(index => index.Options.IndexFieldName)
  
  return result
}
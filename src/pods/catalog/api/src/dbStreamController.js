const AWS = require('aws-sdk')

const retrieveSecret = require('./services/retrieveSecret')
const normalizeFields = require('./services/search/normalizeFields')
const { unmarshall } = AWS.DynamoDB.Converter




exports.handler = async (event, context) => {
  const endpoints = await retrieveSecret(process.env.SEARCH_HOSTNAME_SECRET)
  const { docService } = JSON.parse(endpoints)

  const cloudSearchDomain = new AWS.CloudSearchDomain({ endpoint: docService })

  if (event.Records[0].eventName === 'INSERT') {
    const item = unmarshall(event.Records[0].dynamodb.NewImage)

    const fieldsToInsert = normalizeFields(item)

    const documentToInsert = [{
      type: 'add',
      id: fieldsToInsert.id,
      fields: { ...fieldsToInsert }
    }]

    const insertParams = {
      contentType: 'application/json',
      documents: JSON.stringify(documentToInsert)
    }

    await cloudSearchDomain.uploadDocuments(insertParams).promise()
  }
}

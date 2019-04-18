const AWS = require('aws-sdk')

const retrieveSecret = require('../src/services/retrieveSecret')
const normalizeFields = require('../src/services/search/normalizeFields')
const { unmarshall } = AWS.DynamoDB.Converter




exports.handler = async (event, context) => {
  const endpoints = await retrieveSecret(process.env.SEARCH_HOSTNAME_SECRET)
  const { docService } = JSON.parse(endpoints)

  const cloudSearch = new AWS.CloudSearch()
  new AWS.CloudSearchDomain({ endpoint: docService })

  if (event.Records[0].eventName === 'INSERT') {
    const item = unmarshall(event.Records[0].dynamodb.NewImage)

    const indexParams = { DomainName: 'catalog-search' }
    const indexes = await cloudSearch.describeIndexFields(indexParams).promise()
    const indexNames = indexes.IndexFields.map(index => index.Options.IndexFieldName)

    normalizeFields(item, indexNames)

  }
}

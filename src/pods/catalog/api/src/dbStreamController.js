const AWS = require('aws-sdk')

// const retrieveSecret = require('../src/services/retrieveSecret')

// const { unmarshall } = AWS.DynamoDB.Converter

exports.handler = async (event, context) => {

  const cloudSearch = new AWS.CloudSearch()


  if (event.Records[0].eventName === 'INSERT') {
    // const item = unmarshall(event.Records[0].dynamodb.NewImage)

    const indexParams = { DomainName: 'catalog-search' }
    const indexes = await cloudSearch.describeIndexFields(indexParams).promise()
    const indexNames = indexes.IndexFields.map(index => index.Options.IndexFieldName)

    return indexNames



  }
}

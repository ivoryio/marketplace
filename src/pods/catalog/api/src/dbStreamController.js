const DynamoDB = require('aws-sdk/clients/dynamodb')
const CloudSearchDomain = require('aws-sdk/clients/cloudsearchdomain')

const retrieveSecret = require('./services/retrieveSecret')
const normalize = require('./services/search/normalizeFields')

exports.handler = async (event, contex) => {
  const endpoints = await retrieveSecret(process.env.SEARCH_HOSTNAME_SECRET)
  const { docService } = JSON.parse(endpoints)
  const cloudSearchDomain = new CloudSearchDomain({ endpoint: docService })
  
  for(let value of event.Records) {
    let params = {}
    const { eventName } = value
    const { NewImage, OldImage } = value.dynamodb
    
    switch (eventName) {
      case 'INSERT':
        params = await updateDocument(NewImage)
        break
  
      case 'REMOVE':
        params = await removeDocument(OldImage)
        break
      
      case 'MODIFY':
        params = await updateDocument(NewImage)
        break
    }
      await cloudSearchDomain.uploadDocuments(params).promise()
  }
  
}

const updateDocument = async NewImage => {
  try {
    const fieldsToInsert = normalize(DynamoDB.Converter.unmarshall(NewImage))

    const document = [
      {
        type: 'add',
        id: fieldsToInsert.id,
        fields: { ...fieldsToInsert }
      }
    ]

    const params = {
      contentType: 'application/json',
      documents: JSON.stringify(document)
    }

    return params
  } catch (err) {
    process.stderr.write(err)
  }
}

const removeDocument = async OldImage => {
  const { id } = DynamoDB.Converter.unmarshall(OldImage)

  const document = [
    {
      type: 'delete',
      id
    }
  ]

  const params = {
    contentType: 'application/json',
    documents: JSON.stringify(document)
  }

  return params
}

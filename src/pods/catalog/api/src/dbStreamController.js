const AWS = require('aws-sdk')

const retrieveSecret = require('./services/retrieveSecret')
const normalize = require('./services/search/normalizeFields')

const { unmarshall } = AWS.DynamoDB.Converter

exports.handler = async (event, contex) => {
  let params = {}
  const { eventName } = event.Records[0]
  const { NewImage, OldImage } = event.Records[0].dynamodb
  // console.log({eventName})
  // console.log({NewImage})
  // console.log({OldImage})
  
  const endpoints = await retrieveSecret(process.env.SEARCH_HOSTNAME_SECRET)
  const { docService } = JSON.parse(endpoints)
  const cloudSearchDomain = new AWS.CloudSearchDomain({ endpoint: docService })

  switch (eventName) {
    case 'INSERT':
      params = await insertDocument(NewImage)
      break

    case 'REMOVE':
      params = await removeDocument(OldImage)
      break
    
    case 'MODIFY':
      params = await updateDocument(NewImage)
      break
  }
  // console.log(params)
  await cloudSearchDomain.uploadDocuments(params).promise()
  // console.log(result)
}

const insertDocument = async NewImage => {
  try {
    const fieldsToInsert = normalize(unmarshall(NewImage))

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
  const { id } = unmarshall(OldImage)

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

const updateDocument = async NewImage => {
  try {
    const fieldsToInsert = normalize(unmarshall(NewImage))

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
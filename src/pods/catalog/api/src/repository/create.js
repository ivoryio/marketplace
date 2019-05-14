const DynamoDB = require('aws-sdk/clients/dynamodb')

module.exports = async (product) => {
  const region = process.env.REGION
  const TableName = process.env.TABLE_NAME
  const documentClient = new DynamoDB.DocumentClient({ region })

  const params = {
    TableName,
    Item: {
      ...product
    }
  }

  await documentClient.put(params).promise()
  return product
}
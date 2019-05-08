const DynamoDB = require('aws-sdk/clients/dynamodb')

module.exports = async (id) => {
  const region = process.env.REGION
  const TableName = process.env.TABLE_NAME
  const documentClient = new DynamoDB.DocumentClient({ region })
  const params = {
    TableName,
    Key: { id }
  }

  const result = await documentClient.get(params).promise()
  return result.Item
}


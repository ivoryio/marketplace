const AWS = require('aws-sdk')

function Product () {
  const dynamo = new AWS.DynamoDB.DocumentClient({ region: process.env.REGION })
  const TableName = process.env.TABLE_NAME

  return {
    retrieveById
  }

  async function retrieveById (id) {
    const params = {
      TableName,
      Key: { id }
    }

  const result = await dynamo.get(params).promise()
  
  return result.Item
  }
}

module.exports = new Product()

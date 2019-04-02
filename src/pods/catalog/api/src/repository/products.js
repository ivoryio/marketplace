const AWS = require('aws-sdk')

function Product () {
  const dynamo = new AWS.DynamoDB.DocumentClient()
  const TableName = process.env.TABLE_NAME

  const searchByNewest = async () => {
    const params = {
      TableName
    }

    try {
      let result = await dynamo.scan(params).promise()
      return result.Items
    } catch (err) {
      throw err
    }
  }
  return {
    searchByNewest
  }
}

module.exports = new Product()

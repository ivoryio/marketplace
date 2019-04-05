const AWS = require('aws-sdk')

function Product () {
  const dynamo = new AWS.DynamoDB.DocumentClient()
  const TableName = process.env.TABLE_NAME
  const SearchIndex = process.env.CATEGORY_INDEX_NAME
  const FilterIndex = process.env.FILTER_INDEX_NAME

  const searchByBrandAndModel = async (brand, model) => {
    const params = {
      TableName,
      IndexName: SearchIndex,
      KeyConditions: {
        'brand': {
          ComparisonOperator: 'EQ',
          AttributeValueList: [brand]
        },
        model: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [model]
        }
      }
    }

    try {
      const result = await dynamo.query(params).promise()

      return result.Items
    } catch (err) {
      throw err
    }
  }

  const filterNewest = async () => {
    const params = {
      TableName
    }

    try {
      const result = await dynamo.scan(params).promise()

      return result.Items
    } catch (err) {
      throw err
    }
  }

  const filterSpotlight = async () => {
    const params = {
      TableName,
      IndexName: FilterIndex,
      KeyConditionExpression: 'isSpotlight = :spotlight',
      ExpressionAttributeValues: {
        ':spotlight': 'true'
      }
    }

    try {
      const result = await dynamo.query(params).promise()

      return result.Items
    } catch (err) {
      throw err
    }
  }

  const queryByIds = async ids => {
    let params = {
      TableName,
      ScanFilter: {
        'id': {
          ComparisonOperator: 'IN',
          AttributeValueList: ids
        }
      }
    }
    try {
      let result = await dynamo.scan(params).promise()
      return result.Items
    } catch (err) {
      throw err
    }
  }

  return {
    filterNewest,
    filterSpotlight,
    searchByBrandAndModel,
    queryByIds
  }
}

module.exports = new Product()

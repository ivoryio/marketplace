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
    let params = { RequestItems : {} }
    let batches = spareInBatches(ids)
    try {
      let tasks = batches.map(async batch => {
        params.RequestItems[`${TableName}`] = { 
          Keys: batch 
        }

        let result = await dynamo.batchGet(params).promise()
        return result
      })

      let results = await Promise.all(tasks)
      return results[0].Responses[`${TableName}`]
    } catch (err) {
      throw err
    }
  }

  const spareInBatches = ids => {
    const batchSize = 100
    const numberOfBatches = Math.ceil(ids.length/batchSize)
    let startPosition = 0
    let batch = []
    let batches = []

    for(let i = 0;  i < numberOfBatches; i+=1) {
      let itemForBatch = ids.slice(startPosition, startPosition + batchSize)
      batch = itemForBatch.map(id => ({ id } ))
      batches.push(batch)
      startPosition += batchSize
    }

    return batches
  }

  return {
    filterNewest,
    filterSpotlight,
    searchByBrandAndModel,
    queryByIds
  }
}

module.exports = new Product()

const AWS = require('aws-sdk')
const { assert } = require('chai')

const retrieveById = require('../../src/repository/retrieveById')
const retrieveProduct = require('../../src/usecases/retrieveProduct')

describe('Retrieve product', () => {
  beforeEach(() => {
    const credentials = new AWS.SharedIniFileCredentials({profile: 'marketplace'})
    AWS.config.credentials = credentials
  })

  it('should retrieve an item from dynamodb by id', async () => {
    const id = '49e1e781-6f71-11e9-9bcc-5762fcf185da'

    const expectedItem = await retrieveProduct(retrieveById)(id)

    assert.isNotEmpty(expectedItem)
  })
})
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
    const id = '4d892582-724e-11e9-9ed5-658de3b853f5'

    const expectedItem = await retrieveProduct(retrieveById)(id)
    
    assert.isNotEmpty(expectedItem)
  })
  it('should throw an error when the id id not the right format', async () => {
    const id = '4d892582-724e-11e9-9ed5-658de3b853f'

    try {
      await retrieveProduct(retrieveById)(id)
    } catch (err) {
      assert.equal(err.name, 'ValidationError')
    }
  })
  it(`should throw an error when the product doesn't exists`, async () => {
    const id = '4d892582-724e-11e9-9ed5-658de3b853f6'

    try {
      await retrieveProduct(retrieveById)(id)
    } catch (err) {
      assert.exists(err.message)
      assert.equal(err.name, 'ReferenceError')
    }
  })
})
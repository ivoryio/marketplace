const { assert } = require('chai')

const retrieveCSindexes = require('../../src/services/retrieveCSindexes')

describe('Retrive cs indexes', () => {
  it('should return an array with the indexes from cs', async () => {
    const actualItem = [ 'brand', 'createdat','description','gender','id','imgsrc','isspotlight','model','price' ]

    const expectedItem = await retrieveCSindexes()

    assert.deepEqual(actualItem, expectedItem)
  })
})
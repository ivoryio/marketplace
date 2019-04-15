const AWS = require('aws-sdk')
const assert = require('assert')
const SearchService = require('../src/services/searchService')

const searchService = new SearchService()

const csd = new AWS.CloudSearchDomain({ 
    endpoint: 'search-catalog-search-jrxzovqvu6v6al7zuptwh27tiy.us-east-1.cloudsearch.amazonaws.com',
    region: 'us-east-1'
})


describe('Translate query for CloudSearch', () => {
    it('should return 5 items when the search text is rolex',  async () => {
        const queryString = {q: 'rolex'}
        const params = searchService.translate(queryString)
        const result = await csd.search(params).promise()

        assert.equal(result.hits.hit.length, 5)
    })
    it('should return one item when the search text is rolex and it is filtered by model datejust', async () => {
        const queryString = {q: 'rolex' , model: 'datejust'}
        const params = searchService.translate(queryString)
        const result = await csd.search(params).promise()

        assert.equal(result.hits.hit.length, 1)
    })
    it('should return one item when the search text is rolex, the limit is 3 and the start position is 4', async () => {
        const queryString = {q: 'rolex' , limit: 3, start:4}
        const params = searchService.translate(queryString)
        const result = await csd.search(params).promise()

        assert.equal(result.hits.hit.length, 1)
    })
})
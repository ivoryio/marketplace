const assert = require('assert')
const translate = require('../../src/services/search/queryTranslate')

describe('translate()', () => {
    it('should return default params for null query string',() => {
        const queryString = null

        const result = translate(queryString)

        assert.equal(result.query, 'ivory|-ivory')
        assert.equal(result.size, 10)
        assert.equal(result.sort, 'createdat desc')
        assert.equal(result.start, 0)
        assert.equal(result.filterQuery, null)
    })
    it('should return params for search text', () => {
        const queryString = { q: 'rolex men' }

        const result = translate(queryString)

        assert.equal(result.query, 'rolex men')
        assert.equal(result.size, 10)
        assert.equal(result.sort, 'createdat desc')
        assert.equal(result.start, 0)
        assert.equal(result.filterQuery, null)
    })
    it('should return params for search text and sorted by price asc', () => {
        const queryString = { 
            q: 'rolex men',
            sortBy: 'price.asc'
        }

        const result = translate(queryString)

        assert.equal(result.query, 'rolex men')
        assert.equal(result.size, 10)
        assert.equal(result.sort, 'price asc')
        assert.equal(result.start, 0)
        assert.equal(result.filterQuery, null)
    })
    it('should return params for search text and filter by model', () => {
        const queryString = {
            q: 'rolex men',
            model: 'daytona'
        }

        const result = translate(queryString)

        assert.equal(result.query, 'rolex men')
        assert.equal(result.size, 10)
        assert.equal(result.sort, 'createdat desc')
        assert.equal(result.start, 0)
        assert.equal(result.filterQuery, `(and field='model' 'daytona')`)
    })
    it('should return params for search text and filter by model and gender', () => {
        const queryString = {
            q: 'rolex men',
            model: 'daytona',
            gender: 'men'
        }

        const result = translate(queryString)

        assert.equal(result.query, 'rolex men')
        assert.equal(result.size, 10)
        assert.equal(result.sort, 'createdat desc')
        assert.equal(result.start, 0)
        assert.equal(result.filterQuery, `(and(and field='model' 'daytona')(and field='gender' 'men'))`)
    })
    it('should return params for search text at a certain page', () => {
        const queryString = {
            q: 'rolex men',
            start: 50
        }

        const result = translate(queryString)

        assert.equal(result.query, 'rolex men')
        assert.equal(result.size, 10)
        assert.equal(result.sort, 'createdat desc')
        assert.equal(result.start, 50)
        assert.equal(result.filterQuery, null)
    })
    it('should return params for search text and different number of resources on the page', () => {
        const queryString = {
            q: 'rolex men',
            limit: 25
        }

        const result = translate(queryString)

        assert.equal(result.query, 'rolex men')
        assert.equal(result.size, 25)
        assert.equal(result.sort, 'createdat desc')
        assert.equal(result.start, 0)
        assert.equal(result.filterQuery, null)
    })
    it('should return params filtered by brand', () => {
        const queryString = {
            brand: 'seiko'
        }

        const result = translate(queryString)

        assert.equal(result.query, 'ivory|-ivory')
        assert.equal(result.size, 10)
        assert.equal(result.sort, 'createdat desc')
        assert.equal(result.start, 0)
        assert.equal(result.filterQuery, `(and field='brand' 'seiko')`)
    })
    it('should return params for page 4 and 20 resources per page', () => {
        const queryString = {
            start: 40,
            limit: 20
        }

        const result = translate(queryString)

        assert.equal(result.query, 'ivory|-ivory')
        assert.equal(result.size, 20)
        assert.equal(result.sort, 'createdat desc')
        assert.equal(result.start, 40)
        assert.equal(result.filterQuery, null)
    })
    it('should return params for search text and sorted by oldest', () => {
        const queryString = { 
            q: 'rolex men',
            sortBy: 'createdat.asc'
        }

        const result = translate(queryString)

        assert.equal(result.query, 'rolex men')
        assert.equal(result.size, 10)
        assert.equal(result.sort, 'createdat asc')
        assert.equal(result.start, 0)
        assert.equal(result.filterQuery, null)
    })
    it('should return params for search text, filtered by brand, model, spotlight and gender, sorted by oldest, at page 3, with 5 resources on the page', () => {
        const queryString = { 
            q: 'rolex men',
            sortBy: 'createdat.asc',
            brand: 'rolex',
            model: 'submariner',
            gender: 'men',
            limit: 5,
            start: 15,
            isspotlight: 'true'
        }

        const result = translate(queryString)

        assert.equal(result.query, 'rolex men')
        assert.equal(result.size, 5)
        assert.equal(result.sort, 'createdat asc')
        assert.equal(result.start, 15)
        assert.equal(result.filterQuery, `(and(and field='model' 'submariner')(and field='brand' 'rolex')(and field='gender' 'men')(and field='isspotlight' 'true'))`)
    })
    it('should return params filtered by spotlight', () => {
        const queryString = { 
            isspotlight: 'true'
        }

        const result = translate(queryString)

        assert.equal(result.query, 'ivory|-ivory')
        assert.equal(result.size, 10)
        assert.equal(result.sort, 'createdat desc')
        assert.equal(result.start, 0)
        assert.equal(result.filterQuery, `(and field='isspotlight' 'true')`)
    })
})
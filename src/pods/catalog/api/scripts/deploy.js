const AWS = require('aws-sdk')

let cloudsearch = new AWS.CloudSearch({
  region: 'us-east-1'
})

const { Observable, merge } = require('rxjs')
const { concatMap } = require('rxjs/operators')

let DomainName = 'catalog-search'
let indexNames = ['id', 'brand', 'model', 'description', 'imgsrc', 'price', 'isspotlight', 'gender', 'createdat']

const intIndex = IndexFieldName => ({
  DomainName,
  IndexField: {
    IndexFieldName,
    IndexFieldType: 'int',
    IntOptions: {
      FacetEnabled: true,
      ReturnEnabled: true,
      SearchEnabled: true,
      SortEnabled: true
    }
  }
})

const dateIndex = IndexFieldName => ({
  DomainName,
  IndexField: {
    IndexFieldName,
    IndexFieldType: 'date',
    DateOptions: {
      FacetEnabled: true,
      ReturnEnabled: true,
      SearchEnabled: true,
      SortEnabled: true
    }
  }
})

const textIndex = IndexFieldName => ({
  DomainName,
  IndexField: {
    IndexFieldName,
    IndexFieldType: 'text',
    TextOptions: {
      HighlightEnabled: true,
      ReturnEnabled: true,
      SortEnabled: true
    }
  }
})

module.exports = () => checkIfExist().pipe(
  concatMap(() => createDomain()),
  concatMap(() => defineIndex()),
  concatMap(() => updateIndex())
)

const checkIfExist = () => Observable.create(observer => {
  let params = {
    DomainNames: [DomainName]
  }

  try {
    cloudsearch.describeDomains(params, (err, data) => {
      if (err) observer.error(err)
      if (data.DomainStatusList.length === 0) {
        observer.next()
        observer.complete()
      } else {
        observer.complete()
      }
    })
  } catch (err) {
    observer.error(err)
  }
})

const createDomain = () => Observable.create(observer => {
  let params = {
    DomainName
  }
  try {
    cloudsearch.createDomain(params, (err, data) => {
      if (err) observer.error(err)
      observer.next()
      observer.complete()
    })
  } catch (err) {
    observer.error(err)
  }
})

const defineIndex = () => Observable.create(observer => {
  let indexTasks = indexNames.map(indexName => Observable.create(observer => {
    let params = indexName === 'createdat' 
      ? dateIndex(indexName) 
      : indexName === 'price'
        ? intIndex(indexName) : textIndex(indexName)
      
    cloudsearch.defineIndexField(params, (err, data) => {
      if (err) observer.error(err)
      observer.complete()
    })
  }))

  merge(...indexTasks).subscribe({
    next: () => {},
    complete: () => {
      observer.next()
      observer.complete()
    },
    error: (err) => observer.error(err)
  })
})

const updateIndex = () => Observable.create(observer => {
  let params = {
    DomainName
  }

  try {
    cloudsearch.indexDocuments(params, (err, data) => {
      if (err) observer.error(err)
      observer.next()
      observer.complete()
    })
  } catch (err) {
    observer.error(err)
  }
})

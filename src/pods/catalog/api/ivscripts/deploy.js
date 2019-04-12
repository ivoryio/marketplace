const AWS = require('aws-sdk')

const cloudsearch = new AWS.CloudSearch({
  region: 'us-east-1'
})
const secretsmanager = new AWS.SecretsManager({
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
  concatMap(createDomain),
  concatMap(defineIndex),
  concatMap(updateIndex),
  concatMap(checkAvailability),
  concatMap(getCloudSearchEndpoints),
  concatMap(createSecretManager)
)

const checkIfExist = () => Observable.create(observer => {
  getCloudSearchEndpoints().subscribe({
    next: endpoints => {
      if(!endpoints) {
        observer.next()
        observer.complete()
      } else {
        observer.complete()
      }
     },
    error: err => observer.error(err)
  })
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
  const indexTasks = indexNames.map(indexName => Observable.create(observer => {
    const params = indexName === 'createdat' 
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
  const params = {
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

const checkAvailability = () => Observable.create(observer => {
  const interval = setInterval(() => {
    const params = { DomainName }

    cloudsearch.describeAvailabilityOptions(params, (err, data) => {
      if (err) observer.error(err)
      if (data.AvailabilityOptions.Status.State === 'Active') {
        observer.next()
        clearInterval(interval)
        observer.complete()
      }
    })
  }, 300000)
})

const getCloudSearchEndpoints = () => Observable.create(observer => {
  const params = {
    DomainNames: [DomainName]
  }

  cloudsearch.describeDomains(params, (err, data) => {
    if (err) observer.error(err)
    if (data.DomainStatusList.length !== 0) {
      const endpoints = {
        searchEndpoint: data.DomainStatusList[0].SearchService.Endpoint,
        docService: data.DomainStatusList[0].DocService.Endpoint
      }
      observer.next(endpoints)
      observer.complete()
    } else {
      observer.next()
      observer.complete()
    }
  })
})

const createSecretManager = endpoints => Observable.create(observer => {
  if(endpoints) {
    const params = {
      Name: 'CloudSearch/Hostname',
      Description: 'The CloudSearch hostname',
      SecretString: JSON.stringify(endpoints)
    }
    secretsmanager.createSecret(params, (err, data) => {
      if(err) observer.error(err)
      observer.next()
      observer.complete()
    })
  } else {
    observer.complete()
  }
})

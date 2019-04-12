const AWS = require('aws-sdk')
const { Observable, merge, iif, empty } = require('rxjs')
const { concatMap } = require('rxjs/operators')

module.exports = () => getCloudSearchEndpoints().pipe(
  concatMap(decideWthatToDo)
)

const cloudsearch = new AWS.CloudSearch({
  region: 'us-east-1'
})
const secretsmanager = new AWS.SecretsManager({
  region: 'us-east-1'
})

const DomainName = 'catalog-search'

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

const decideWthatToDo = endpoints => iif(
  () => !endpoints,
  createCSDomain(),
  abort()
)

const createCSDomain = () => createDomain().pipe(
  concatMap(defineIndex),
  concatMap(updateIndex),
  concatMap(checkAvailability),
  concatMap(getCloudSearchEndpoints),
  concatMap(createSecretManager)
)

const abort = () => empty()

const createDomain = () => Observable.create(observer => {
  let params = {
    DomainName
  }
  cloudsearch.createDomain(params, (err, data) => {
      if (err) observer.error(err)
      observer.next()
      observer.complete()
    })
})

const defineIndex = () => Observable.create(observer => {
  const indexNames = ['id', 'brand', 'model', 'description', 'imgsrc', 'price', 'isspotlight', 'gender', 'createdat']

  const indexTasks = indexNames.map(indexName => Observable.create(observer => {
    const params = getIndex(indexName)
      
    cloudsearch.defineIndexField(params, (err, data) => {
      if (err) observer.error(err)
      observer.complete()
    })
  }))

  const getIndex = indexName => {
    switch (indexName) {
      case 'price': return intIndex(indexName)
      case 'date': return dateIndex(indexName)
      default: return textIndex(indexName)
    }
  }

  function intIndex (IndexFieldName) {
    return {
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
    }
  }
  
  function dateIndex (IndexFieldName) {
    return {
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
    }
  }
  
  function textIndex (IndexFieldName) {
    return {
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
    }
  }
  
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

  cloudsearch.indexDocuments(params, (err, data) => {
    if (err) observer.error(err)
    observer.next()
    observer.complete()
  })
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

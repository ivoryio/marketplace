const { Observable } = require('rxjs')

module.exports = Observable.create((observer) => {
  observer.next(1)
  observer.complete()
})

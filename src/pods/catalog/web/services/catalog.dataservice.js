import { API } from 'aws-amplify'

const getNewestProducts = () =>
  API.get('catalog', '/products?sortBy=createdat.desc&limit=12', {
    response: true
  })

const getSearchResults = searchTerm =>
  API.get('catalog', `/products?q=${searchTerm}`, { response: true })

const getSpotlightWatches = () =>
  API.get('catalog', 'products?isspotlight=true&sortBy=createdat.desc&limit=9', {
    response: true
  })

export default {
  getNewestProducts,
  getSearchResults,
  getSpotlightWatches
}

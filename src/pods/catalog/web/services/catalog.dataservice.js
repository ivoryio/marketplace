import { API } from 'aws-amplify'

const getNewestProducts = () =>
  API.get('catalog', '/products?sortBy=createdat.desc&limit=12', {
    response: true
  })

const getSearchResults = searchTerm =>
  API.get('catalog', `/products?q=${searchTerm}`, { response: true })

const getFewSpotlightWatches = () =>
  API.get('catalog', 'products?isspotlight=true&sortBy=createdat.desc&limit=9', {
    response: true
  })
const getAllSpotlightWatches = searchTerm =>
  API.get('catalog', `products?isspotlight=true${searchTerm}`, {
    response: true
  })
const getWatchDetails = id =>
  API.get('catalog', `products/${id}`, {
    response: true
  })

export default {
  getNewestProducts,
  getSearchResults,
  getFewSpotlightWatches,
  getAllSpotlightWatches,
  getWatchDetails
}

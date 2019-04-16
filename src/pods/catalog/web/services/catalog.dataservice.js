import { API } from 'aws-amplify'

const getNewestProducts = () =>
  API.get('catalog', '/products?sortBy=createdAt.desc', {
    response: true
  })

const getSearchResults = searchTerm =>
  API.get('catalog', `/products?q=${searchTerm}`, { response: true })

const getSpotlightWatches = () =>
  API.get('catalog', 'products?isspotlight=true', {
    response: true
  })

export default {
  getNewestProducts,
  getSearchResults,
  getSpotlightWatches
}

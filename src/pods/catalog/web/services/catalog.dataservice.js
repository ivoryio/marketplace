import { API } from 'aws-amplify'

const getNewestProducts = () =>
  API.get('catalog', '/products?filter=newest', {
    response: true
  })

const getSearchResults = searchTerm =>
  API.get('catalog', `/products?query=${searchTerm}`, { response: true })

const getSpotlightWatches = () =>
  API.get('catalog', 'products?filter=spotlight', {
    response: true
  })
export default {
  getNewestProducts,
  getSearchResults,
  getSpotlightWatches
}

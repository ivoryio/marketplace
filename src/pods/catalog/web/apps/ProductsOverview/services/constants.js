export const sortOptions = [
  {
    id: 'price-asc',
    name: 'Price Low - High'
  },
  {
    id: 'price-desc',
    name: 'Price High - Low'
  },
  {
    id: 'newest',
    name: 'Newest'
  },
  {
    id: 'oldest',
    name: 'Oldest'
  }
]

export const itemsPerPageOptions = [
  {
    id: 'max_25',
    name: '25'
  },
  {
    id: 'max_50',
    name: '50'
  },
  {
    id: 'max_100',
    name: '100'
  }
]

export const initialActiveFilters = {
  query: '',
  brands: [],
  models: [],
  genders: []
}

export const initialSearchResults = {
  data: {
    items: [],
    itemsCount: 0,
    filters: []
  },
  isFetching: false,
  error: null
}
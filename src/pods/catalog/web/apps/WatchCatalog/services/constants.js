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
    itemsCount: null
  },
  isFetching: false,
  error: null
}

export const filters = {
  brands: ['Rolex', 'Cartier', 'Omega'],
  models: [
    'Day-Date',
    'Datejust',
    'Constellation',
    'Speedmaster',
    'Planet Ocean'
  ],
  genders: ['Men', 'Women', 'Unisex']
}

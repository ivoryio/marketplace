export const categoryFilters = [
  {
    name: "Brand",
    options: [
      { title: "Rolex", numberOfProducts: 13 },
      { title: "Tissot", numberOfProducts: 8 }
    ]
  },
  {
    name: "Model",
    options: [
      { title: "SkyWalker", numberOfProducts: 3 },
      { title: "Day-Time", numberOfProducts: 6 }
    ]
  },
  {
    name: "Gender",
    options: [
      { title: "Male", numberOfProducts: 7 },
      { title: "Female", numberOfProducts: 10 }
    ]
  }
]

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

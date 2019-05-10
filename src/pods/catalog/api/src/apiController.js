const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpress = require('aws-serverless-express')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const create = require('./repository/create')
const retrieveById = require('./repository/retrieveById')
const createProduct = require('./usecases/createProduct')
const retrieveSecret = require('./services/retrieveSecret')
const browseProducts = require('./usecases/browseProducts')
const retrieveProduct = require('./usecases/retrieveProduct')
const groupFilters = require('./services/search/groupFilters')
const queryTranslate = require('./services/search/queryTranslate')

const app = express()
const router = express.Router()

router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(awsServerlessExpressMiddleware.eventContext())

router.get('/products', async (req, res) => {
  try {
    const searchQuery = queryTranslate(req.query)
    const products = await browseProducts(retrieveSecret)(searchQuery)
    const filters = groupFilters(products.items)

    res.status(200).json({
      ...products,
      filters
    })
  } catch (err) {
    res.status(500).json({
      type: '', 
      message: ''
    })
  }
})

router.post('/products', async (req, res) => {
  const product = req.body

  try {
    const result = await createProduct(create)(product)

    res.status(201).json(result)
  } catch (err) {
    if(err.name === 'ValidationError') {
      res.status(400).json({
        type: err.name, 
        message: err.details[0].message
      })
      return
    }
    res.status(500).json({
      type: '',
      message: ''
    })
  }
})

router.get('/products/:id', async (req, res) => {
  const { id } = req.params

  try {
    const result = await retrieveProduct(retrieveById)(id)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({
      type: '',
      message: ''
    })
  }
})

app.use('/', router)

const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context)

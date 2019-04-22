const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpress = require('aws-serverless-express')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const retrieveSecret = require('./services/retrieveSecret')
const browseProducts = require('./usecases/browseProducts')
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
    const items = await browseProducts(retrieveSecret)(searchQuery)
    const filters = groupFilters(items)

    res.status(200).json({
      items,
      filters
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

app.use('/', router)

const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context)

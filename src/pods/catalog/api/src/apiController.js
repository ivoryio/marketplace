const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpress = require('aws-serverless-express')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const secretService = require('./services/secretManager')
const SearchService = require('./services/searchService')

const browseProducts = require('./usecases/browseProducts')

const app = express()
const router = express.Router()

router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(awsServerlessExpressMiddleware.eventContext())

router.get('/products', async (req, res) => {
  try {
    const searchText = req.query.query
    const filter = req.query.filter
    const searchOptions = {
      size: req.query.size,
      start: req.query.start
    }
    const searchService = new SearchService(secretService)
    const result = await browseProducts(searchService, secretService)(searchText, filter, searchOptions)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

app.use('/', router)

const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context)

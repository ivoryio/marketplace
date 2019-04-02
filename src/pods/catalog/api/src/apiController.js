const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpress = require('aws-serverless-express')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const productRepo = require('./repository/product')

const searchProducts = require('./usecases/browseProducts')

const app = express()
const router = express.Router()

router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(awsServerlessExpressMiddleware.eventContext())

router.get('/products', async (req, res) => {
  try {
    let searchParams = req.query
    const result = await searchProducts(productRepo)(searchParams)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

app.use('/', router)

const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context)

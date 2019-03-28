import { render } from 'frint-react'
import Amplify from 'aws-amplify'

import RootApp from './config/app.init'
import awsConfig from './config/aws.config'
import * as serviceWorker from './config/serviceWorker'

Amplify.configure(awsConfig)
render(RootApp, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

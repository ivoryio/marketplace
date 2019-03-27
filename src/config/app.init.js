import Root from '../app'

const apps = window.app || []
const rootApp = (window.app = new Root())
rootApp.push = options => rootApp.registerApp(...options)
apps.forEach(rootApp.push)

export default rootApp

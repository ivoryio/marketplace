import Root from '../app'

const apps = window.app || []
const RootApp = (window.app = new Root())
RootApp.push = options => RootApp.registerApp(...options)
apps.forEach(RootApp.push)

export default RootApp

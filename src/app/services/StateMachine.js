import { Observable } from 'rxjs'
import StateMachine from 'javascript-state-machine'
import StateMachineHistory from 'javascript-state-machine/lib/history'

StateMachine.prototype.listen = function () {
  return Observable.create(function (observer) {
    window.addEventListener('authed', handleEvent)
    window.addEventListener('signout', handleEvent)

    function handleEvent (ev) {
      const currentState = fsm.state
      switch (currentState) {
        case 'unauthed':
          if (ev.type === 'authed') {
            fsm.auth(ev.detail.user)
          }
          break
        case 'authed':
          if (ev.type === 'signout') {
            fsm.signout()
          }
          break
        default:
          break
      }
      observer.next({ currentState: fsm.state, user: fsm.user })
    }
  })
}

const fsm = new StateMachine({
  init: 'unauthed',
  data: {
    user: {}
  },
  transitions: [
    { name: 'auth', from: 'unauthed', to: 'authed' },
    { name: 'signout', from: 'authed', to: 'unauthed' }
  ],
  plugins: [
    new StateMachineHistory({ max: 100 }) //  <-- plugin enabled here
  ],
  methods: {
    onTransition: function (lifecycle, data) {
      if (lifecycle.to === 'authed') {
        this.user = data
      }

      if (lifecycle.to === 'unauthed') {
        this.user = {}
      }
    }
  }
})

export default fsm

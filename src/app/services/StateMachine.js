import { Observable } from 'rxjs'
import StateMachine from 'javascript-state-machine'
import StateMachineHistory from 'javascript-state-machine/lib/history'

StateMachine.prototype.listen = function () {
  return Observable.create(function (observer) {
    // #region add event listeners
    window.addEventListener('transition', handleEvent)
    // #endregion

    // #region handle events
    function handleEvent (ev) {
      const { user } = fsm
      const { targetState } = ev.detail
      if (ev.type === 'transition') {
        fsm[targetState]()
      }
      observer.next({ currentState: fsm.state, user })
    }
    // #endregion
  })
}

const fsm = new StateMachine({
  init: 'landing',
  data: {
    user: null
  },
  transitions: [
    {
      name: 'landing',
      from: ['landing', 'cart', 'profile'],
      to: 'landing'
    },
    {
      name: 'cart',
      from: ['cart', 'landing', 'profile'],
      to: 'cart'
    },
    {
      name: 'profile',
      from: ['profile', 'landing', 'cart'],
      to: 'profile'
    },
    {
      name: 'signout',
      from: ['landing', 'cart', 'profile'],
      to: 'landing'
    }
  ], // Pattern: { name: '', from: '', to: '' }
  plugins: [
    new StateMachineHistory({ max: 100 }) //  <-- plugin enabled here
  ],
  methods: {
    onTransition: function (lifecycle, data) {}
  }
})

export default fsm

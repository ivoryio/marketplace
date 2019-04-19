import { Observable } from 'rxjs'
import { Hub } from '@aws-amplify/core'
import StateMachine from 'javascript-state-machine'
import StateMachineHistory from 'javascript-state-machine/lib/history'

StateMachine.prototype.listen = function () {
  return Observable.create(function (observer) {
    // #region add event channels
    Hub.listen('TransitionChannel', transitionListener)
    // #endregion

    // #region handle events
    function transitionListener (ev) {
      const { event, data } = ev.payload
      switch (event) {
        case 'transition':
          fsm.transitionTo(data.destination)
          break
        case 'escape':
          fsm.escape()
          break
        case 'goBack':
          fsm.goBack()
          break
        default:
          break
      }
      observer.next({
        currentState: fsm.state,
        payload: { ...fsm.data, ...data }
      })
    }
    // #endregion
  })
}

const fsm = new StateMachine({
  init: 'landing',
  data: {
    data: {
      user: {}
    }
  },
  transitions: [
    {
      name: 'escape',
      from: '*',
      to: 'landing'
    },
    {
      name: 'transitionTo',
      from: '*',
      to: function (nextState) {
        return nextState
      }
    },
    {
      name: 'goBack',
      from: '*',
      to: function () {
        if (fsm.canHistoryBack) {
          fsm.historyBack()
          return fsm.history.slice(-1)[0]
        }
        return fsm.state
      }
    }
  ],
  plugins: [
    new StateMachineHistory({ max: 100 }) //  <-- plugin enabled here
  ],
  methods: {
    onAuth: function (lifecycle, data) {
      this.data.user = data
    },
    onSignOut: function () {
      this.data.user = {}
      fsm.clearHistory()
    },
    onInvalidTransition: function (transition, from, to) {
      console.error(`Invalid transition ${transition} from ${from} to ${to}`)
    }
  }
})

export default fsm

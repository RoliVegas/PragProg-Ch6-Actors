import { dispatch } from "nact";

const pieCaseActor = {
    'get slice': (msg, context, state) => {
      if (state.slices.length == 0) {
        dispatch(msg.waiter,
                 { type: 'error', msg: "no pie left", customer: msg.customer })
        return state
      }
      else {
        var slice = state.slices.shift() + " pie slice";
        dispatch(msg.customer,
                 { type: 'put on table', food: slice });
        dispatch(msg.waiter,
                 { type: 'add to order', food: slice, customer: msg.customer });
        return state;
      }
    },
  
    'get slice a la mode': (msg, context, state) => {
      if (state.slices.length == 0) {
        dispatch(msg.waiter,
                 { type: 'error', msg: "no pie left", customer: msg.customer })
        return state
      }
      else {
        var slice = state.slices.shift() + " pie slice";
        dispatch(state.iceCreamStand,
                 { type: 'get pie a la mode', food: slice, customer: msg.customer, waiter: msg.waiter });
        return state;
      }
    }
  
  }

export default pieCaseActor;
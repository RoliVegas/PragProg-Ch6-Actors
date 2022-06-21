import { dispatch } from "nact";

const iceCreamStandActor = {
    'get pie a la mode': (msg, context, state) => {
      if (state.scoops == 0) {
        dispatch(msg.waiter,
                 { type: 'error', msg: "no ice-cream left", customer: msg.customer })
        return state;
      }
      else {
        state.scoops--;
        dispatch(msg.customer,
                 { type: 'put on table', food: msg.food + " a la mode" });
        dispatch(msg.waiter,
                 { type: 'add to order', food: msg.food + " a la mode", customer: msg.customer });
        return state;
      }
    }
  }

  export default iceCreamStandActor;
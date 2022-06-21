import { dispatch } from "nact";

const waiterActor = {
    "order": (msg, ctx, state) => {
      if (msg.wants == "pie") {
        dispatch(state.pieCase,
                 { type: "get slice", customer: msg.customer, waiter: ctx.self })
      } else if (msg.wants == "pie a la mode") {
          dispatch(state.pieCase,
              { type: "get slice a la mode", customer: msg.customer, waiter: ctx.self })
      } else {
        console.dir(`Don't know how to order ${msg.wants}`);
      }
    },
  
    "add to order": (msg, ctx) =>
      console.log(`Waiter adds ${msg.food} to ${msg.customer.name}'s order`),
  
    "error": (msg, ctx) => {
      dispatch(msg.customer, { type: 'no pie left', msg: msg.msg });
      console.log(`\nThe waiter apologizes to ${msg.customer.name}: ${msg.msg}`)
    }
  
  };

export default waiterActor;
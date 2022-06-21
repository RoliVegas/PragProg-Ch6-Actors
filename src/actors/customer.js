import { dispatch } from "nact"

const customerActor = {
    'hungry for pie': (msg, ctx, state) => {
      return dispatch(state.waiter,
                      { type: "order", customer: ctx.self, wants: 'pie' })
    },
  
    'hungry for pie a la mode': (msg, ctx, state) => {
      return dispatch(state.waiter,
                      { type: "order", customer: ctx.self, wants: 'pie a la mode' })
    },
  
    'put on table': (msg, ctx, _state) =>
      console.log(`${ctx.self.name} sees "${msg.food}" appear on the table`),
  
    'no pie left': (_msg, ctx, _state) =>
      console.log(`${ctx.self.name} sulks...`)
};

export default customerActor;
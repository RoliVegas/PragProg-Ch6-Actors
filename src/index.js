/***
 * Excerpted from "The Pragmatic Programmer, 20th Anniversary Edition",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/tpp20 for more book information.
***/

import { start, dispatch, stop, spawn } from 'nact';
import iceCreamStandActor from './actors/icecream.js';
import pieCaseActor from './actors/pieCase.js';
import waiterActor from './actors/waiter.js';
import customerActor from './actors/customer.js';

const router = (module, state, msg, context) => {
  let action = module[msg.type];
  if (action && typeof (action) == "function") {
    const nextState = action(msg, context, state);
    return nextState !== undefined ? nextState : state;
  }
  else {
    console.log(`${context.name} customer ignores unknown message:`, msg);
    return state;
  }
}

const start_actor = (actors, name, module, initial_state={}) => {
    return spawn(actors,
                 (state, msg, context) => {
                   return router(module, state, msg, context)
                 },
                 name,
                 { initialState: initial_state }
    );
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/////////////////////////////////////////////////////////////////////////////////

const actorSystem = start();

let iceCreamStand = start_actor(
    actorSystem,
    'iceCreamStand',
    iceCreamStandActor,
    { scoops: 1 });

let pieCase = start_actor(
  actorSystem,
  'pie-case',
  pieCaseActor,
  { slices: ["apple", "peach", "cherry"],
    iceCreamStand: iceCreamStand });

let waiter = start_actor(
  actorSystem,
  'waiter',
  waiterActor,
  { pieCase: pieCase });

let c1 = start_actor(actorSystem,   'customer1',
                     customerActor, { waiter: waiter });
let c2 = start_actor(actorSystem,   'customer2',
                     customerActor, { waiter: waiter });

dispatch(c1, { type: 'hungry for pie a la mode', waiter: waiter });
dispatch(c2, { type: 'hungry for pie', waiter: waiter });

sleep(500)
  .then(() => {
    stop(actorSystem);
  })